import styles from './Accent.module.css';

/** Destaca uma palavra na cor do tema. */
export default function Accent({ italic = false, block = false, children }) {
  const classes = [styles.accent, italic && styles.italic, block && styles.block]
    .filter(Boolean)
    .join(' ');
  return <span className={classes}>{children}</span>;
}
