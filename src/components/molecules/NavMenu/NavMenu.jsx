import { NavLink } from '../../atoms';
import styles from './NavMenu.module.css';

/** Menu principal: lista de links para as seções. */
export default function NavMenu({ itens, className = '' }) {
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Navegação principal">
      <ul className={styles.list}>
        {itens.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href}>{item.rotulo}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
