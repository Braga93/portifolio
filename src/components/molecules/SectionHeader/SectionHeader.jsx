import { Eyebrow, Heading } from '../../atoms';
import styles from './SectionHeader.module.css';

/** Cabeçalho de seção: rótulo, título (h2) e subtítulo opcionais. */
export default function SectionHeader({ id, eyebrow, titulo, subtitulo, align = 'center', className = '' }) {
  return (
    <div className={`${styles.header} ${styles[align]} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading level={2} size="section" id={id}>
        {titulo}
      </Heading>
      {subtitulo && <p className={styles.subtitle}>{subtitulo}</p>}
    </div>
  );
}
