import styles from './MatrixRain.module.css';

// posição (%), atraso (s) e duração (s) de cada coluna da chuva de código
const colunas = [
  [5, -2.5, 4.5], [10, -3.2, 6.0], [15, -1.8, 3.8], [20, -2.9, 5.2], [25, -1.5, 4.5],
  [30, -3.8, 6.8], [35, -2.1, 4.2], [40, -2.7, 4.8], [45, -3.4, 5.8], [50, -1.9, 4.0],
  [55, -3.6, 6.2], [60, -2.3, 4.6], [65, -3.1, 5.4], [70, -2.6, 4.4], [75, -3.7, 6.0],
  [80, -2.8, 5.0], [85, -3.3, 5.5], [90, -2.2, 3.9], [95, -3.9, 6.5], [98, -2.4, 5.1],
];

/** Chuva de caracteres ao fundo da página. Puramente decorativa. */
export default function MatrixRain() {
  return (
    <div className={styles.rain} aria-hidden="true">
      {colunas.map(([left, delay, duration]) => (
        <span
          key={left}
          className={styles.column}
          style={{ left: `${left}%`, animationDelay: `${delay}s`, animationDuration: `${duration}s` }}
        />
      ))}
    </div>
  );
}
