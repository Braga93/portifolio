import styles from './Cube.module.css';

/** Cubo 3D girando, usado no logo. Puramente decorativo. */
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
