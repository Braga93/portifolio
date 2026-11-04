import { Heading, Icon, TextLink } from '../../atoms';
import styles from './ContactCard.module.css';

export default function ContactCard({ icone, titulo, descricao, rotulo, href, externo = false }) {
  return (
    <div className={styles.card}>
      <Icon name={icone} className={styles.icon} />
      <Heading level={3} size="card">
        {titulo}
      </Heading>
      <p className={styles.text}>{descricao}</p>
      <TextLink href={href} external={externo}>
        {rotulo}
      </TextLink>
    </div>
  );
}
