import { PillDot } from '../../atoms';
import { useTheme } from '../../../context/ThemeContext.jsx';
import styles from './PillToggle.module.css';

export default function PillToggle({ className = '' }) {
  const { tema, alternarTema } = useTheme();
  const azul = tema === 'blue';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={azul}
      aria-label="Pílula azul"
      title="Trocar de realidade"
      onClick={alternarTema}
      className={`${styles.toggle} ${azul ? styles.isBlue : ''} ${className}`}
    >
      <span className={styles.slider} aria-hidden="true" />
      <span className={`${styles.option} ${!azul ? styles.active : ''}`} aria-hidden="true">
        <PillDot color="red" active={!azul} />
        <span className={styles.caption}>Vermelha</span>
      </span>
      <span className={`${styles.option} ${azul ? styles.active : ''}`} aria-hidden="true">
        <PillDot color="blue" active={azul} />
        <span className={styles.caption}>Azul</span>
      </span>
    </button>
  );
}
