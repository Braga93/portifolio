import styles from './Heading.module.css';

/**
 * Título. O nível (h1 a h6) define a semântica; o tamanho visual é separado,
 * para que a hierarquia do HTML fique correta sem mudar o visual.
 * size: 'display' | 'section' | 'card' | 'item'
 */
export default function Heading({ level = 2, size = 'section', id, className = '', children }) {
  const Tag = `h${level}`;
  return (
    <Tag id={id} className={`${styles.heading} ${styles[size]} ${className}`}>
      {children}
    </Tag>
  );
}
