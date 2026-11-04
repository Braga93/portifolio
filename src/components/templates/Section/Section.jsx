import { Container } from '../../atoms';
import styles from './Section.module.css';

export default function Section({ id, labelledBy, tone = 'deep', className = '', containerClassName = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${styles.section} ${styles[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
