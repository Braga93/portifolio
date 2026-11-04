import styles from './Stars.module.css';

export default function Stars({ total = 5, className = '' }) {
  return (
    <p className={`${styles.stars} ${className}`} role="img" aria-label={`Avaliação: ${total} de 5`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </p>
  );
}
