import styles from './TextLink.module.css';

/** Link de texto sublinhado (e-mail, telefone). */
export default function TextLink({ href, external = false, children }) {
  const externo = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={styles.link} {...externo}>
      {children}
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
