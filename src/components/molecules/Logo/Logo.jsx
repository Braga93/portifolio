import { Cube } from '../../atoms';
import styles from './Logo.module.css';

/** Cubo + nome. Leva de volta ao início da página. */
export default function Logo({ href = '#inicio', className = '' }) {
  return (
    <a href={href} className={`${styles.logo} ${className}`} aria-label="FULLSTACK, voltar ao início">
      <Cube />
      <span className={styles.text} aria-hidden="true">FULLSTACK</span>
    </a>
  );
}
