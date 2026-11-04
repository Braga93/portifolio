import icone from '../../../assets/whatsapp.png';
import { whatsappUrl } from '../../../data/contato.js';
import styles from './WhatsAppFloat.module.css';

/** Botão flutuante do WhatsApp, sempre no canto da tela. */
export default function WhatsAppFloat() {
  return (
    <a href={whatsappUrl} className={styles.float} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp (abre em nova aba)">
      <img src={icone} alt="" className={styles.img} width="60" height="60" />
    </a>
  );
}
