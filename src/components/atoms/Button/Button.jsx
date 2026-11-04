import styles from './Button.module.css';

/**
 * Link com aparência de botão (todos levam a outro lugar, por isso são <a>).
 * variant: 'cyber' (chamada principal) | 'outline' | 'text'
 * external: abre em nova aba e avisa leitores de tela.
 */
export default function Button({ href, variant = 'outline', external = false, className = '', children }) {
  const externo = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <a href={href} className={`${styles.button} ${styles[variant]} ${className}`} {...externo}>
      <span className={styles.label}>{children}</span>
      {variant === 'cyber' && (
        <>
          <span className={styles.scanline} aria-hidden="true" />
          <span className={styles.corners} aria-hidden="true" />
        </>
      )}
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
