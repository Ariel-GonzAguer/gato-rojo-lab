// hooks
import { useRef } from "react";

// componentes/librerías
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "./Toast";

// seguridad
import { 
  sanitizeText, 
  isValidEmail, 
  isValidName, 
  isValidMessage, 
  checkRateLimit,
  FIELD_LIMITS 
} from "../utils/security";

// estilos
import styles from "../styles/Contact.module.css";

// store
import useStore from "../store/useStore";

export default function ContactFormEmailJS() {
  const form = useRef();
  const { diseñoInStore } = useStore();

  async function sendEmail(e) {
    e.preventDefault();

    // Verificar rate limiting
    if (!checkRateLimit()) {
      toast.error(
        "Debe esperar 5 minutos entre envíos. Esto ayuda a prevenir spam."
      );
      return;
    }

    const formData = new FormData(e.target);
    const name = sanitizeText(formData.get("user_name"));
    const email = formData.get("user_email");
    const message = sanitizeText(formData.get("message"));

    // Validaciones de seguridad
    if (!isValidName(name)) {
      toast.error(
        "Por favor, ingrese un nombre válido (2-100 caracteres, solo letras y espacios)."
      );
      return;
    }

    if (!isValidEmail(email)) {
      toast.error(
        "Por favor, ingrese un email válido."
      );
      return;
    }

    if (!isValidMessage(message)) {
      toast.error(
        "El mensaje debe tener entre 10 y 2000 caracteres."
      );
      return;
    }

    try {
      // Usar variables de entorno si están disponibles
      const serviceId = import.meta.env.EMAILJS_SERVICE_ID || "portafolioService";
      const templateId = import.meta.env.EMAILJS_TEMPLATE_ID || "portafolio_template_1";
      const publicKey = import.meta.env.EMAILJS_PUBLIC_KEY || "_NRDta8MNg0agxoFR";

      await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        {
          publicKey: publicKey,
        }
      );

      toast.success(
        "Su mensaje ha sido enviado exitosamente. Le contactaré lo antes posible."
      );
      e.target.reset();
    } catch (error) {
      console.error("Error al enviar email:", error);
      toast.error(
        "¡Oh no! Algo salió mal. Por favor, intente de nuevo más tarde."
      );
    }
  }

  return (
    <form ref={form} onSubmit={sendEmail} className={styles.form}>
  <Toaster />

      <label htmlFor="user_name">Nombre</label>
      <input
        type="text"
        name="user_name"
        id="user_name"
        aria-required="true"
        aria-label="Nombre completo"
        maxLength={FIELD_LIMITS.NAME_MAX_LENGTH}
        pattern="[a-zA-ZÀ-ÿ\s\-.']{2,100}"
        title="Solo letras, espacios y algunos caracteres especiales (2-100 caracteres)"
        required
      />

      <label htmlFor="user_email">Email</label>
      <input
        type="email"
        name="user_email"
        id="user_email"
        aria-required="true"
        aria-label="Su dirección de correo electrónico"
        maxLength={FIELD_LIMITS.EMAIL_MAX_LENGTH}
        required
      />

      <label htmlFor="message">Mensaje</label>
      <textarea
        name="message"
        rows="10"
        cols="32"
        id="message"
        aria-required="true"
        aria-label="Su mensaje"
        maxLength={FIELD_LIMITS.MESSAGE_MAX_LENGTH}
        minLength="10"
        placeholder="Escriba su mensaje aquí (mínimo 10 caracteres)..."
        required
      />

      <input
        type="submit"
        value="ENVIAR MENSAJE"
        aria-label="Enviar su mensaje"
        className={styles[diseñoInStore]}
        style={{ cursor: "pointer" }}
      />
    </form>
  );
}
