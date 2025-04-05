// hooks
import { useRef } from "react";

// componentes/librerías
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "sonner";

// estilos
import styles from "../styles/Contact.module.css";

// store
import useStore from "../store/useStore";

export default function ContactFormEmailJS() {
  const form = useRef();
  const { diseñoInStore } = useStore();

  async function sendEmail(e) {
    e.preventDefault();

    try {
      await emailjs.sendForm(
        "portafolioService",
        "portafolio_template_1",
        form.current,
        {
          publicKey: "_NRDta8MNg0agxoFR",
        }
      );

      toast.success(
        "Su mensaje ha sido enviado exitosamente. Le contactaré lo antes posible."
      );
      e.target.reset();
    } catch (error) {
      toast.error(
        "¡Oh no! Algo salió mal. Por favor, intente de nuevo más tarde."
      );
    }
  }

  return (
    <form ref={form} onSubmit={sendEmail} className={styles.form}>
      <Toaster richColors position="bottom-center" closeButton />

      <label htmlFor="user_name">Nombre</label>
      <input
        type="text"
        name="user_name"
        id="user_name"
        aria-required="true"
        aria-label="Nombre completo"
        required
      />

      <label htmlFor="user_email">Email</label>
      <input
        type="email"
        name="user_email"
        id="user_email"
        aria-required="true"
        aria-label="Su dirección de correo electrónico"
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
