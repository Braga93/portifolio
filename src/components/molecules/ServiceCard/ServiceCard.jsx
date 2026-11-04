import { Button, Heading } from '../../atoms';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ titulo, descricao, imagem, alt, href }) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <img src={imagem} alt={alt} className={styles.img} loading="lazy" decoding="async" />
      </div>
      <div className={styles.content}>
        <Heading level={3} size="card" className={styles.title}>
          {titulo}
        </Heading>
        <p className={styles.text}>{descricao}</p>
        <Button href={href} variant="text" external className={styles.link}>
          Saiba mais _
        </Button>
      </div>
    </article>
  );
}
