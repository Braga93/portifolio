/**
 * Comandos do Terminal da Matrix.
 *
 * Cada comando recebe (argumentos, contexto) e devolve uma lista de linhas:
 *   { texto, tipo, href? }
 * tipo: 'texto' | 'destaque' | 'suave' | 'sucesso' | 'erro' | 'link'
 *
 * Os comandos marcados com (API) buscam dados ao vivo no GitHub.
 */
import * as github from '../github.js';
import { contatos } from '../../data/contato.js';
import { barra, mesAno, porcentagens, tempoRelativo } from '../../utils/formatar.js';

const linha = (texto = '', tipo = 'texto', extra = {}) => ({ texto, tipo, ...extra });
const vazia = () => linha('');

function barrasDeLinguagens(linguagens, limite = 6) {
  const lista = porcentagens(linguagens).slice(0, limite);
  if (!lista.length) return [linha('  nenhuma linguagem detectada', 'suave')];
  const maior = Math.max(...lista.map((l) => l.nome.length));
  return lista.map((l) =>
    linha(`  ${l.nome.padEnd(maior)}  ${barra(l.fracao, 18)}  ${(l.fracao * 100).toFixed(1).padStart(5)}%`),
  );
}

function resumoDoEvento(evento) {
  const repo = evento.repo.name.replace(`${github.USUARIO}/`, '');
  const p = evento.payload ?? {};
  switch (evento.type) {
    case 'PushEvent': {
      const commits = p.commits ?? [];
      const msg = commits.length ? `: ${commits[commits.length - 1].message.split('\n')[0]}` : '';
      return `↑ push em ${repo}${msg}`;
    }
    case 'CreateEvent':
      return p.ref_type === 'repository' ? `+ criou o repositório ${repo}` : `+ criou ${p.ref_type} ${p.ref ?? ''} em ${repo}`;
    case 'PublicEvent':
      return `◉ tornou público ${repo}`;
    case 'WatchEvent':
      return `★ favoritou ${repo}`;
    case 'PullRequestEvent':
      return `⇄ pull request ${p.action ?? ''} em ${repo}`;
    case 'IssuesEvent':
      return `! issue ${p.action ?? ''} em ${repo}`;
    case 'ForkEvent':
      return `⑂ fez fork de ${repo}`;
    default:
      return `• ${evento.type.replace('Event', '')} em ${repo}`;
  }
}

export const comandos = {
  ajuda: {
    descricao: 'lista os comandos',
    executar: () => [
      linha('Comandos disponíveis:', 'destaque'),
      ...Object.entries(comandos)
        .filter(([, c]) => !c.oculto)
        .map(([nome, c]) => linha(`  ${`${nome}${c.uso ? ` ${c.uso}` : ''}`.padEnd(20)} ${c.descricao}`)),
      vazia(),
      linha('Tab completa o comando · ↑ e ↓ navegam no histórico', 'suave'),
    ],
  },

  whoami: {
    descricao: 'quem está do outro lado (API)',
    executar: async (_, { signal }) => {
      const p = await github.buscarPerfil({ signal });
      return [
        linha(`${p.name ?? p.login} (@${p.login})`, 'destaque'),
        p.bio && linha(p.bio),
        vazia(),
        p.location && linha(`  local ............ ${p.location}`),
        linha(`  repositórios ..... ${p.public_repos} públicos`),
        linha(`  seguidores ....... ${p.followers}`),
        linha(`  na Matrix desde .. ${mesAno(p.created_at)}`),
        vazia(),
        linha(p.html_url.replace('https://', ''), 'link', { href: p.html_url }),
      ].filter(Boolean);
    },
  },

  projetos: {
    descricao: 'lista os repositórios públicos (API)',
    executar: async (_, { signal }) => {
      const repos = await github.buscarRepositorios({ signal });
      const linhas = repos.flatMap((r) => [
        linha(r.name, 'link', { href: r.html_url }),
        linha(`  ${r.language ?? '—'} · ★ ${r.stargazers_count} · atualizado ${tempoRelativo(r.pushed_at)}`, 'suave'),
        r.description && linha(`  ${r.description}`),
      ]);
      return [
        ...linhas.filter(Boolean),
        vazia(),
        linha(`${repos.length} repositórios. Digite "projeto <nome>" para ver os detalhes.`, 'suave'),
      ];
    },
  },

  projeto: {
    uso: '<nome>',
    descricao: 'detalhes e linguagens de um projeto (API)',
    executar: async ([nome], { signal }) => {
      if (!nome) return [linha('uso: projeto <nome>', 'erro'), linha('veja os nomes com "projetos"', 'suave')];
      const repos = await github.buscarRepositorios({ signal });
      const busca = nome.toLowerCase();
      const repo =
        repos.find((r) => r.name.toLowerCase() === busca) ?? repos.find((r) => r.name.toLowerCase().includes(busca));
      if (!repo) {
        return [
          linha(`projeto não encontrado: ${nome}`, 'erro'),
          linha(`disponíveis: ${repos.map((r) => r.name).join(', ')}`, 'suave'),
        ];
      }
      const linguagens = await github.buscarLinguagens(repo.name, { signal });
      return [
        linha(repo.name, 'destaque'),
        repo.description && linha(repo.description),
        vazia(),
        linha('  linguagens:', 'suave'),
        ...barrasDeLinguagens(linguagens),
        vazia(),
        linha(`  criado em ........ ${mesAno(repo.created_at)}`),
        linha(`  último push ...... ${tempoRelativo(repo.pushed_at)}`),
        linha(`  estrelas ......... ${repo.stargazers_count}`),
        repo.topics?.length && linha(`  tópicos .......... ${repo.topics.join(', ')}`),
        vazia(),
        linha(repo.html_url.replace('https://', ''), 'link', { href: repo.html_url }),
        repo.homepage && linha(repo.homepage.replace(/^https?:\/\//, ''), 'link', { href: repo.homepage }),
      ].filter(Boolean);
    },
  },

  linguagens: {
    descricao: 'linguagens somadas de todos os projetos (API)',
    executar: async (_, { signal }) => {
      const total = await github.buscarLinguagensGerais({ signal });
      return [linha('Linguagens em todos os repositórios públicos:', 'destaque'), vazia(), ...barrasDeLinguagens(total, 8)];
    },
  },

  atividade: {
    descricao: 'o que aconteceu recentemente no GitHub (API)',
    executar: async (_, { signal }) => {
      const eventos = (await github.buscarAtividade({ signal })).slice(0, 8);
      if (!eventos.length) return [linha('Nenhuma atividade pública recente.', 'suave')];
      return [
        linha('Atividade recente:', 'destaque'),
        ...eventos.map((e) => linha(`  ${resumoDoEvento(e)}  ·  ${tempoRelativo(e.created_at)}`)),
      ];
    },
  },

  contato: {
    descricao: 'canais para falar comigo',
    executar: () => [
      linha('Fale comigo:', 'destaque'),
      ...contatos.map((c) => linha(`${c.titulo}: ${c.rotulo}`, 'link', { href: c.href })),
    ],
  },

  pilula: {
    uso: '<vermelha|azul>',
    descricao: 'escolha a sua realidade',
    executar: ([cor], { tema, definirTema }) => {
      const escolha = cor?.toLowerCase();
      if (escolha === 'vermelha') {
        definirTema('red');
        return [linha('Você escolheu a verdade. Até onde vai a toca do coelho?', 'sucesso')];
      }
      if (escolha === 'azul') {
        definirTema('blue');
        return [linha('A história acaba. Você acorda e acredita no que quiser.', 'sucesso')];
      }
      return [
        linha(`realidade atual: pílula ${tema === 'blue' ? 'azul' : 'vermelha'}`),
        linha('uso: pilula vermelha  |  pilula azul', 'suave'),
      ];
    },
  },

  limpar: {
    descricao: 'limpa a tela',
    executar: () => [], // tratado pelo hook useTerminal
  },

  sudo: {
    oculto: true,
    executar: () => [linha('Permissão negada: só o Escolhido tem acesso root.', 'erro')],
  },
};

const apelidos = { help: 'ajuda', ls: 'projetos', clear: 'limpar', cls: 'limpar', pílula: 'pilula' };

export function resolverNome(nome) {
  const n = nome.toLowerCase();
  return comandos[n] ? n : apelidos[n] ?? null;
}

export const nomesVisiveis = Object.keys(comandos).filter((n) => !comandos[n].oculto);

/** Executa um comando e devolve as linhas. Erros da API viram mensagens legíveis. */
export async function executar(nome, args, contexto) {
  const chave = resolverNome(nome);
  if (!chave) {
    return [linha(`comando não encontrado: ${nome}`, 'erro'), linha('digite "ajuda" para ver os comandos', 'suave')];
  }
  try {
    return await comandos[chave].executar(args, contexto);
  } catch (erro) {
    if (erro.name === 'AbortError') throw erro;
    return mensagemDeErro(erro);
  }
}

function mensagemDeErro(erro) {
  if (erro instanceof github.GithubError) {
    if (erro.tipo === 'limite') {
      const quando = erro.detalhe.reset
        ? `às ${new Date(erro.detalhe.reset).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`
        : 'em alguns minutos';
      return [linha('A API do GitHub atingiu o limite de consultas deste endereço.', 'erro'), linha(`Tente de novo ${quando}.`, 'suave')];
    }
    if (erro.tipo === 'rede') return [linha('Sem sinal da Matrix: falha de conexão com a API.', 'erro')];
    if (erro.tipo === 'nao-encontrado') return [linha('Nada encontrado na API.', 'erro')];
  }
  return [linha('Algo deu errado ao consultar a API. Tente novamente.', 'erro')];
}
