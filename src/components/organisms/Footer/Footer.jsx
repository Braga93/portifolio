import { Container } from '../../atoms';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p className={styles.logo}>FULLSTACK</p>
        <hr className={styles.divider} />
        <p className={styles.copy}>© {new Date().getFullYear()} Eduardo Braga. Todos os direitos reservados.</p>
      </Container>
    </footer>
  );
}
