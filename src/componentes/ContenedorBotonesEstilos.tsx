// store
import useStore from "../store/useStore";

// estilos
import styles from "../styles/ContenedorBotonesEstilos.module.css";

// tipos
import { Diseño } from "../types/types";

// hooks
import { useEffect, useRef } from "react";

// componentes
import toast, { Toaster } from 'react-hot-toast';

export default function ContenedorBotonesEstilos() {
  const { cambiarDiseño, diseñoInStore } = useStore();
  const botonesRef = useRef<HTMLButtonElement[]>([]);

  // Efecto para actualizar la clase selected cuando cambia el diseño
  useEffect(() => {
    // Limpiar la clase selected de todos los botones
    botonesRef.current.forEach(btn => {
      if (btn) btn.classList.remove(styles.selected);
    });

    // Encontrar el botón que corresponde al diseño actual y añadirle la clase
    const botonActivo = botonesRef.current.find(btn =>
      btn && btn.textContent?.toLowerCase() === diseñoInStore.toLowerCase()
    );

    if (botonActivo) {
      botonActivo.classList.add(styles.selected);
    }
  }, [diseñoInStore]);

  // handle cambio de estilos
  function handleDiseño(estilo: Diseño) {

    const body = document.body;
    body.classList.add("blur");

    cambiarDiseño(estilo);

    toast(`Ha elegido el diseño ${estilo}. Todas las páginas tendrán este diseño. Para cambiarlo, solo regrese al Inicio y seleccione otro.`,
      {
        className: `${styles[`${estilo}`]}`,
        duration: 5500,
      }
    )

    setTimeout(() => {
      body.classList.remove("blur");
    }, 900);
  }

  // Función para añadir botones a la referencia
  function addButtonRef(el: HTMLButtonElement | null, index: number) {
    if (el) {
      botonesRef.current[index] = el;
    }
  };

  return (
    <section className={styles.contenedorEstilos}>
      <Toaster position="bottom-center" />
      <button
        ref={(el) => addButtonRef(el, 0)}
        className={`${styles[`${diseñoInStore}`]} ${diseñoInStore === Diseño.neumorphism ? styles.selected : ''}`}
        onClick={() => handleDiseño(Diseño.neumorphism)}
      >
        Neumorphism
      </button>

      <button
        ref={(el) => addButtonRef(el, 1)}
        className={`${styles[`${diseñoInStore}`]} ${diseñoInStore === Diseño.dark ? styles.selected : ''}`}
        onClick={() => handleDiseño(Diseño.dark)}
      >
        Dark
      </button>

      <button
        ref={(el) => addButtonRef(el, 2)}
        className={`${styles[`${diseñoInStore}`]} ${diseñoInStore === Diseño.gamer ? styles.selected : ''}`}
        onClick={() => handleDiseño(Diseño.gamer)}
      >
        Gamer
      </button>

      <button
        ref={(el) => addButtonRef(el, 3)}
        className={`${styles[`${diseñoInStore}`]} ${diseñoInStore === Diseño.light ? styles.selected : ''}`}
        onClick={() => handleDiseño(Diseño.light)}
      >
        Light
      </button>

      <button
        ref={(el) => addButtonRef(el, 4)}
        className={`${styles[`${diseñoInStore}`]} ${diseñoInStore === Diseño.neubrutalism ? styles.selected : ''}`}
        onClick={() => handleDiseño(Diseño.neubrutalism)}
      >
        Neubrutalism
      </button>
    </section>
  );
}
