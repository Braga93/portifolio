import styles from './Diamond.module.css';

/** Losango brilhante usado como marcador. Decorativo. */
export default function Diamond() {
  return <span className={styles.diamond} aria-hidden="true" />;
}
