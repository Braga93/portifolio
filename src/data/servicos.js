import imgMobile from '../assets/servico-mobile.jpg';
import imgConsultoria from '../assets/servico-consultoria.jpg';
import imgSites from '../assets/servico-sites.jpg';

export const servicos = [
  {
    id: 'mobile',
    titulo: 'Desenvolvimento de Aplicativos Móveis para Android e iOS.',
    descricao: 'Transformo suas ideias em aplicativos funcionais e intuitivos.',
    imagem: imgMobile,
    alt: 'Corredor digital em verde e vermelho, no estilo da chuva de código da Matrix',
  },
  {
    id: 'consultoria',
    titulo: 'Consultoria em Tecnologia da Informação para otimização de processos.',
    descricao: 'Ajudo sua empresa a adotar as melhores práticas tecnológicas.',
    imagem: imgConsultoria,
    alt: 'Homem ao telefone em um ambiente escuro',
  },
  {
    id: 'sites',
    titulo: 'Criação de Sites Responsivos com Design Moderno e Atraente.',
    descricao: 'Desenvolvo sites que se adaptam a qualquer dispositivo, melhorando a experiência do usuário.',
    imagem: imgSites,
    alt: 'Monitores e equipamentos antigos empilhados',
  },
];
