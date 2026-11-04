import { Stars } from '../../atoms';
import styles from './TestimonialCard.module.css';

/** Depoimento: estrelas, citação e autor (figure + blockquote + figcaption). */
export default function TestimonialCard({ texto, autor, papel, matrix = false }) {
  return (
    <figure className={`${styles.card} ${matrix ? styles.matrix : ''}`}>
      <Stars className={styles.stars} />
      <blockquote className={styles.quote}>
        <p>“{texto}”</p>
      </blockquote>
      <figcaption className={styles.author}>
        <cite className={styles.name}>{autor}</cite>
        <span className={styles.role}>{papel}</span>
      </figcaption>
    </figure>
  );
}
