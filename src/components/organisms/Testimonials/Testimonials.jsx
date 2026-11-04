import { SectionHeader, TestimonialCard } from '../../molecules';
import Section from '../../templates/Section/Section.jsx';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { depoimentos } from '../../../data/depoimentos.js';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const { tema } = useTheme();
  // Morpheus aparece na pílula vermelha; Agente Smith, na azul
  const visiveis = depoimentos.filter((d) => !d.tema || d.tema === tema);

  return (
    <Section id="depoimentos" labelledBy="depoimentos-titulo" tone="deep">
      <SectionHeader
        id="depoimentos-titulo"
        eyebrow="03 // Depoimentos"
        titulo="Depoimentos de Clientes"
        subtitulo="Veja o que nossos clientes têm a dizer!"
      />
      <ul className={styles.grid}>
        {visiveis.map((d) => (
          <li key={d.id}>
            <TestimonialCard texto={d.texto} autor={d.autor} papel={d.papel} matrix={d.matrix} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
