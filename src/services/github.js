const API = 'https://api.github.com';
export const USUARIO = 'Braga93';
const VALIDADE = 10 * 60 * 1000;
const memoria = new Map();

export class GithubError extends Error {
  constructor(tipo, detalhe = {}) {
    super(tipo);
    this.name = 'GithubError';
    this.tipo = tipo;
    this.detalhe = detalhe;
  }
}

function lerCache(chave) {
  const agora = Date.now();
  const salvo = memoria.get(chave);
  if (salvo && agora - salvo.em < VALIDADE) return salvo.dados;
  try {
    const bruto = sessionStorage.getItem(`gh:${chave}`);
    if (bruto) {
      const item = JSON.parse(bruto);
      if (agora - item.em < VALIDADE) {
        memoria.set(chave, item);
        return item.dados;
      }
    }
  } catch {}
  return null;
}

function gravarCache(chave, dados) {
  const item = { em: Date.now(), dados };
  memoria.set(chave, item);
  try {
    sessionStorage.setItem(`gh:${chave}`, JSON.stringify(item));
  } catch {}
}

async function getJSON(caminho, { signal } = {}) {
  const emCache = lerCache(caminho);
  if (emCache) return emCache;

  let resposta;
  try {
    resposta = await fetch(`${API}${caminho}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal,
    });
  } catch (erro) {
    if (erro.name === 'AbortError') throw erro;
    throw new GithubError('rede');
  }

  if (!resposta.ok) {
    const restantes = resposta.headers.get('x-ratelimit-remaining');
    const mensagem = await resposta.text().catch(() => '');
    if (resposta.status === 429 || (resposta.status === 403 && (restantes === '0' || /rate limit/i.test(mensagem)))) {
      const reset = Number(resposta.headers.get('x-ratelimit-reset')) * 1000;
      throw new GithubError('limite', { reset: reset || null });
    }
    if (resposta.status === 404) throw new GithubError('nao-encontrado');
    throw new GithubError('falha', { status: resposta.status });
  }

  const dados = await resposta.json();
  gravarCache(caminho, dados);
  return dados;
}

export function buscarPerfil(opcoes) {
  return getJSON(`/users/${USUARIO}`, opcoes);
}

export async function buscarRepositorios(opcoes) {
  const repos = await getJSON(`/users/${USUARIO}/repos?per_page=100&sort=pushed`, opcoes);
  return repos
    .filter((r) => !r.fork && r.name.toLowerCase() !== USUARIO.toLowerCase())
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
}

export function buscarLinguagens(repo, opcoes) {
  return getJSON(`/repos/${USUARIO}/${repo}/languages`, opcoes);
}

export async function buscarLinguagensGerais(opcoes) {
  const repos = await buscarRepositorios(opcoes);
  const porRepo = await Promise.all(repos.map((r) => buscarLinguagens(r.name, opcoes)));
  const total = {};
  for (const linguagens of porRepo) {
    for (const [nome, bytes] of Object.entries(linguagens)) {
      total[nome] = (total[nome] ?? 0) + bytes;
    }
  }
  return total;
}

export function buscarAtividade(opcoes) {
  return getJSON(`/users/${USUARIO}/events/public?per_page=30`, opcoes);
}

export function nomesEmCache() {
  const repos = lerCache(`/users/${USUARIO}/repos?per_page=100&sort=pushed`);
  return repos ? repos.filter((r) => !r.fork).map((r) => r.name) : [];
}
