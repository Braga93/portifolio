import { Logo, NavMenu, PillToggle } from '../../molecules';
import useActiveSection from '../../../hooks/useActiveSection.js';
import { navegacao } from '../../../data/navegacao.js';
import styles from './Header.module.css';

const ids = navegacao.map((item) => item.href.slice(1));

/** Cabeçalho fixo: logo à esquerda, menu no centro, alternador à direita. */
export default function Header() {
  const ativa = useActiveSection(ids);
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <NavMenu itens={navegacao} ativa={ativa} className={styles.nav} />
      <PillToggle className={styles.toggle} />
    </header>
  );
}
