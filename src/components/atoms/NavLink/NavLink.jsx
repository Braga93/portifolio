import styles from './NavLink.module.css';

/** Link do menu, com sublinhado que cresce a partir do centro. */
export default function NavLink({ href, ativo = false, children }) {
  return (
    <a href={href} className={`${styles.link} ${ativo ? styles.active : ''}`} aria-current={ativo ? 'true' : undefined}>
      {children}
    </a>
  );
}
