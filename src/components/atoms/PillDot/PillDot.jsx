import styles from './PillDot.module.css';

export default function PillDot({ color, active = false }) {
  return <span className={`${styles.dot} ${styles[color]} ${active ? styles.active : ''}`} aria-hidden="true" />;
}
