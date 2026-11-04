import styles from './Button.module.css';

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
