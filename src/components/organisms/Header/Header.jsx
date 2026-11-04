import { Logo, NavMenu, PillToggle } from '../../molecules';
import { navegacao } from '../../../data/navegacao.js';
import styles from './Header.module.css';

/** Cabeçalho fixo: logo à esquerda, menu no centro, alternador à direita. */
export default function Header() {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <NavMenu itens={navegacao} className={styles.nav} />
      <PillToggle className={styles.toggle} />
    </header>
  );
}
