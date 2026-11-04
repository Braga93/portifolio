import { Diamond, Heading } from '../../atoms';
import styles from './FeatureItem.module.css';

export default function FeatureItem({ titulo, descricao }) {
  return (
    <div className={styles.item}>
      <Diamond />
      <Heading level={3} size="item" className={styles.title}>
        {titulo}
      </Heading>
      <p className={styles.text}>{descricao}</p>
    </div>
  );
}
