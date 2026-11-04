import styles from './PillDot.module.css';

/** Bolinha colorida de uma pílula. color: 'red' | 'blue' */
export default function PillDot({ color, active = false }) {
  return <span className={`${styles.dot} ${styles[color]} ${active ? styles.active : ''}`} aria-hidden="true" />;
}
