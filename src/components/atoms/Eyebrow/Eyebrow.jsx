import styles from './Eyebrow.module.css';

/** Pequeno rótulo acima de um título, entre dois traços. */
export default function Eyebrow({ className = '', children }) {
  return <p className={`${styles.eyebrow} ${className}`}>{children}</p>;
}
