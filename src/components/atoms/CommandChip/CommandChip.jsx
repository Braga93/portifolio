import styles from './CommandChip.module.css';

/** Botão de atalho que roda um comando no terminal (útil no celular). */
export default function CommandChip({ comando, onRun, disabled = false }) {
  return (
    <button type="button" className={styles.chip} onClick={() => onRun(comando)} disabled={disabled}>
      <span className={styles.prefix} aria-hidden="true">&gt;</span> {comando}
    </button>
  );
}
