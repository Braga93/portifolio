import { SectionHeader, ServiceCard } from '../../molecules';
import Section from '../../templates/Section/Section.jsx';
import { servicos } from '../../../data/servicos.js';
import { whatsappUrl } from '../../../data/contato.js';
import styles from './Services.module.css';

export default function Services() {
  return (
    <Section id="servicos" labelledBy="servicos-titulo" tone="deep">
      <SectionHeader
        id="servicos-titulo"
        eyebrow="01 // Serviços"
        titulo="Descubra os principais serviços que ofereço como desenvolvedor de software"
      />
      <ul className={styles.grid}>
        {servicos.map((servico) => (
          <li key={servico.id}>
            <ServiceCard {...servico} href={whatsappUrl} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
