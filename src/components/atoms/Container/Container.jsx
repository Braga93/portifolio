import styles from './Container.module.css';

/** Centraliza o conteúdo e limita a largura (cresce no ultrawide). */
export default function Container({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`${styles.container} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
