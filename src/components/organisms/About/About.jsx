import { Accent, Button, Eyebrow, Heading } from '../../atoms';
import { FeatureItem } from '../../molecules';
import Section from '../../templates/Section/Section.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { diferenciais, imagemSobre } from '../../../data/sobre.js';
import { whatsappUrl } from '../../../data/contato.js';
import styles from './About.module.css';

export default function About() {
  const { tema } = useTheme();
  const imagem = imagemSobre[tema];

  return (
    <Section id="sobre" labelledBy="sobre-titulo" tone="raised" containerClassName={styles.grid}>
      <div className={styles.texts}>
        <Eyebrow className={styles.eyebrow}>02 // Sobre</Eyebrow>
        <Heading level={2} size="section" id="sobre-titulo" className={styles.title}>
          Por que escolher um
          <br />
          profissional de
          <br />
          <Accent>programação?</Accent>
        </Heading>

        <p className={styles.description}>
          Contratar um profissional de programação traz segurança e eficiência ao seu projeto. Com anos de
          experiência, você terá resultados que superam suas expectativas.
        </p>

        <ul className={styles.features}>
          {diferenciais.map((item) => (
            <li key={item.id}>
              <FeatureItem titulo={item.titulo} descricao={item.descricao} />
            </li>
          ))}
        </ul>

        <Button href={whatsappUrl} variant="outline" external>
          Saiba_mais //
        </Button>
      </div>

      <figure className={styles.media}>
        <img key={tema} src={imagem.src} alt={imagem.alt} className={styles.img} loading="lazy" decoding="async" />
        <span className={styles.overlay} aria-hidden="true" />
      </figure>
    </Section>
  );
}
