import { Container } from '../../atoms';
import styles from './Section.module.css';

/**
 * Casca de toda seção da página: <section> com âncora, rótulo acessível
 * e um "tom" de fundo próprio, para marcar a passagem de uma seção a outra.
 * tone: 'hero' | 'deep' | 'raised' | 'glow'
 */
export default function Section({ id, labelledBy, tone = 'deep', className = '', containerClassName = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${styles.section} ${styles[tone]} ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
