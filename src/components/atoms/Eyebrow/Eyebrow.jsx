import styles from './Eyebrow.module.css';

export default function Eyebrow({ className = '', children }) {
  return <p className={`${styles.eyebrow} ${className}`}>{children}</p>;
}
