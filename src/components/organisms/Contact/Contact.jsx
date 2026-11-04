import { ContactCard, SectionHeader } from '../../molecules';
import Section from '../../templates/Section/Section.jsx';
import { contatos } from '../../../data/contato.js';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <Section id="contato" labelledBy="contato-titulo" tone="glow">
      <SectionHeader
        id="contato-titulo"
        eyebrow="05 // Contato"
        titulo="Entre em contato"
        subtitulo="Tem um projeto em mente ou alguma dúvida? Escolha um dos canais abaixo."
      />
      <address className={styles.address}>
        <ul className={styles.grid}>
          {contatos.map(({ id, ...contato }) => (
            <li key={id}>
              <ContactCard {...contato} />
            </li>
          ))}
        </ul>
      </address>
    </Section>
  );
}
