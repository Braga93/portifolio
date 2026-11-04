import styles from './Cube.module.css';

export default function Cube() {
  return (
    <span className={styles.cube} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}
