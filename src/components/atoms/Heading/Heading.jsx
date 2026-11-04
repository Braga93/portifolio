import styles from './Heading.module.css';

export default function Heading({ level = 2, size = 'section', id, className = '', children }) {
  const Tag = `h${level}`;
  return (
    <Tag id={id} className={`${styles.heading} ${styles[size]} ${className}`}>
      {children}
    </Tag>
  );
}
