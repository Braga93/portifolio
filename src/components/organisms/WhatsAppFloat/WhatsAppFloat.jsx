import { Icon } from '../../atoms';
import { whatsappUrl } from '../../../data/contato.js';
import styles from './WhatsAppFloat.module.css';

/** Botão flutuante do WhatsApp, no canto da tela, nas cores do tema. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      className={styles.float}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp (abre em nova aba)"
    >
      <Icon name="whatsapp" className={styles.icon} />
    </a>
  );
}
