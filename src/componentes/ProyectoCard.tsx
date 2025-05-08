import type { PropsCard } from "../types/types";
import toast from 'react-hot-toast';
import styles from "../styles/ProyectoCard.module.css";

export default function ProyectoCard({ name, tags, description, emoji, link }: PropsCard) {
  function handleDescriptionClick() {
    toast.dismiss(); // Cerrar cualquier toast existente antes de mostrar uno nuevo
    toast((t) => (
      <div className={styles.toastContent}>
        <p>{description}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className={styles.closeButton}
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    ), {
      id: `toast-${name}`,
      duration: 10000,
      position: 'top-center',
      style: {
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        backdropFilter: 'blur(10px)',
        maxWidth: '500px',
        fontSize: '1rem',
        padding: '1rem',
        lineHeight: '2rem',
      },
    });
  };

  return (
    <li className={styles.card}>
      <h3 className={`proyectoH3 ${styles.title}`} translate="no">{name}</h3>
      <p
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