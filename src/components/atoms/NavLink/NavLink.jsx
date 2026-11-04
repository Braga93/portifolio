import styles from './NavLink.module.css';

/** Link do menu, com sublinhado que cresce a partir do centro. */
export default function NavLink({ href, children }) {
  return (
    <a href={href} className={styles.link}>
      {children}
    </a>
  );
}
