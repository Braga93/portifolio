import { Accent, Button, Eyebrow, Heading } from '../../atoms';
import Section from '../../templates/Section/Section.jsx';
import { whatsappUrl } from '../../../data/contato.js';
import styles from './Hero.module.css';

/** Abertura da página, com o único h1. */
export default function Hero() {
  return (
    <Section id="inicio" labelledBy="inicio-titulo" tone="hero" className={styles.hero} containerClassName={styles.inner}>
      <Eyebrow className={styles.eyebrow}>Condenado à perfeição</Eyebrow>
      <Heading level={1} size="display" id="inicio-titulo" className={styles.title}>
        Desenvolvimento
        <br />
        de
        <Accent italic block>
          Software
        </Accent>
      </Heading>
      <Button href={whatsappUrl} variant="cyber" external>
        Entre em contato //
      </Button>
    </Section>
  );
}
