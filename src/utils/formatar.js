/** Funções pequenas de formatação, sem dependência de React. */

const relativo = new Intl.RelativeTimeFormat('pt-BR', { numeric: 'auto' });
const unidades = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
];

/** "há 3 dias", "ontem", "há 2 meses"... */
export function tempoRelativo(data) {
  const segundos = (new Date(data).getTime() - Date.now()) / 1000;
  for (const [unidade, tamanho] of unidades) {
    if (Math.abs(segundos) >= tamanho) {
      return relativo.format(Math.round(segundos / tamanho), unidade);
    }
  }
  return 'agora mesmo';
}

/** "jan. de 2023" */
export function mesAno(data) {
  return new Date(data).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
}

/** Barra em texto: ██████░░░░ */
export function barra(fracao, largura = 20) {
  const cheios = Math.round(Math.max(0, Math.min(1, fracao)) * largura);
  return '█'.repeat(cheios) + '░'.repeat(largura - cheios);
}

/** Converte {linguagem: bytes} em lista ordenada com porcentagens. */
export function porcentagens(linguagens) {
  const total = Object.values(linguagens).reduce((soma, n) => soma + n, 0);
  if (!total) return [];
  return Object.entries(linguagens)
    .map(([nome, bytes]) => ({ nome, fracao: bytes / total }))
    .sort((a, b) => b.fracao - a.fracao);
}
