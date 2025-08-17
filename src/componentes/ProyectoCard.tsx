import type { PropsCard } from "../types/types";
import toast from './Toast';
import styles from "../styles/ProyectoCard.module.css";

export default function ProyectoCard({key, name, tags, description, emoji, link }: PropsCard) {
  function handleDescriptionClick() {
    toast.dismiss(); // Cerrar cualquier toast existente antes de mostrar uno nuevo
    toast((t) => (
      <div data-testid="toasterDescripcion" className={styles.toastContent}>
        <p>{description}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className={styles.closeButton}
          aria-label="Cerrar notificación"
          data-testid="cerrarToast"
        >
          ✕
        </button>
      </div>
    ), {
      id: `toast-${name}`,
      duration: 20000,
      position: 'top-center',
      className: styles.toastContent,
    });
  };

  return (
    <li className={styles.card} key={key} >
      <h3 data-testid="proyectoH3" className={`proyectoH3 ${styles.title}`} translate="no">{name}</h3>
      <p
        data-testid="proyectoP"
        className={styles.descripcion}
        onClick={handleDescriptionClick}
        title="Click para ver descripción completa"
      >
        Click para ver descripción
      </p>
      <p className={styles.emoji}>{emoji}</p>
      <p className={styles.tags}>{tags.join(", ")}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Ver Proyecto
      </a>
    </li>
  );
}