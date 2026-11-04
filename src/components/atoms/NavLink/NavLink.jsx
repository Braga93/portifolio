import styles from './NavLink.module.css';

export default function NavLink({ href, ativo = false, children }) {
  return (
    <a href={href} className={`${styles.link} ${ativo ? styles.active : ''}`} aria-current={ativo ? 'true' : undefined}>
      {children}
    </a>
  );
}
