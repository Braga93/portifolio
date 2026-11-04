# Portfólio · Eduardo Braga

Portfólio de desenvolvedor full-stack com tema inspirado em Matrix: a página tem duas "realidades", a **pílula vermelha** e a **pílula azul**, e o visitante alterna entre elas no topo da página.

Feito com **React** e **Vite**, organizado em **atomic design**, com um **Terminal da Matrix** que consome ao vivo a API pública do GitHub.

## Como rodar

```bash
git clone https://github.com/Braga93/portifolio.git
cd portifolio
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`).

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento, atualiza ao salvar |
| `npm run build` | gera a versão final na pasta `dist/` |
| `npm run preview` | abre a versão final localmente |

## Estrutura (atomic design)

A interface é montada de baixo para cima: peças pequenas formam peças maiores.

```text
src/
├── components/
│   ├── atoms/        peças mínimas: Button, Heading, Eyebrow, Icon, Cube, Stars, PillDot...
│   ├── molecules/    combinações de átomos: Logo, NavMenu, PillToggle, ServiceCard, TestimonialCard...
│   ├── organisms/    seções completas: Header, Hero, Services, About, Testimonials, Contact, Footer
│   ├── templates/    estrutura da página: MainLayout e Section (a casca de cada seção)
│   └── pages/        a página montada: Home
├── context/          ThemeContext, o estado da pílula vermelha/azul
├── hooks/            hooks próprios: useTerminal, useTypewriter, useActiveSection, usePrefersReducedMotion
├── services/         consumo de API: github.js e os comandos do terminal
├── utils/            formatação (datas relativas, porcentagens, barras em texto)
├── data/             todo o conteúdo do site (textos, serviços, depoimentos, contatos)
├── styles/           tokens.css (cores, espaçamentos, telas) e global.css (base)
└── assets/           imagens
```

Cada componente fica em sua própria pasta, com o `.jsx` e o `.module.css` (CSS Modules: os estilos de um componente não vazam para os outros).

### Conteúdo separado do código

Todo texto e imagem fica em `src/data/`. Para trocar um serviço ou um depoimento, basta editar esses arquivos, sem mexer nos componentes. É essa camada que, no futuro, vai receber dados de uma API.

### Terminal da Matrix (consumo de API)

A seção **Terminal** é um terminal de verdade: o visitante digita comandos e recebe respostas com dados ao vivo da [API REST do GitHub](https://docs.github.com/rest).

| Comando | O que faz |
|---|---|
| `ajuda` | lista os comandos |
| `whoami` | perfil do GitHub (API) |
| `projetos` | repositórios públicos (API) |
| `projeto <nome>` | detalhes e linguagens de um projeto (API) |
| `linguagens` | linguagens somadas de todos os projetos (API) |
| `atividade` | atividade recente no GitHub (API) |
| `contato` | canais de contato |
| `pilula <vermelha\|azul>` | troca o tema do site |
| `limpar` | limpa a tela |

Detalhes técnicos:

- `fetch` com `AbortController`: se outro comando começar, a busca anterior é cancelada
- Cache de 10 minutos em memória e `sessionStorage`, porque a API sem login permite 60 consultas por hora
- Erros de rede e de limite da API viram mensagens legíveis no próprio terminal
- `Promise.all` para buscar as linguagens de todos os repositórios em paralelo
- Histórico com ↑ e ↓, autocompletar com Tab e atalhos clicáveis para quem está no celular
- Efeito de digitação, que leitores de tela recebem como texto completo

### Hooks e DOM

- `useTerminal`: estado do terminal, histórico, autocompletar e cancelamento de buscas
- `useTypewriter`: efeito de digitação, desligado para quem pede menos movimento
- `useActiveSection`: usa `IntersectionObserver` para destacar no menu a seção visível
- `usePrefersReducedMotion`: acompanha a preferência do sistema com `matchMedia`
- No terminal, um `MutationObserver` mantém a saída rolada até o fim e uma `ref` foca o campo ao clicar na janela

### Temas

As cores ficam em `src/styles/tokens.css`. O alternador muda o atributo `data-theme` do `<html>` entre `red` e `blue`, e todas as cores trocam juntas. A escolha fica salva no navegador.

## Responsividade

O layout se adapta de celulares (a partir de 320px) até monitores ultrawide (3440px). Em telas largas o conteúdo cresce até um limite e a fonte base aumenta um pouco, para não ficar perdida no meio da tela.

## Acessibilidade

- HTML semântico: um único `h1`, seções com rótulo, listas, `figure`/`blockquote` nos depoimentos, `address` no contato
- Link "Pular para o conteúdo" para quem navega pelo teclado
- O alternador de tema é um `switch` acessível
- Links que abrem em nova aba avisam isso aos leitores de tela
- Quem ativa "reduzir movimento" no sistema recebe o site sem animações

## Publicação

A cada push na `main`, o GitHub Actions gera o build e publica no GitHub Pages (`.github/workflows/deploy.yml`).

## Autor

**Eduardo Braga**, desenvolvedor full-stack em Fortaleza, CE.
[LinkedIn](https://www.linkedin.com/in/eduardo-braga-6131b9253/) · [GitHub](https://github.com/Braga93)
