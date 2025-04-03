// store
import useStore from "../store/useStore";

// estilos
import styles from "../styles/ContenedorBotonesEstilos.module.css";

// tipos
import { Diseño } from "../types/types";

export default function ContenedorBotonesEstilos() {
  const { cambiarDiseño, diseñoInStore } = useStore();

  // handle cambio de estilos
  function handleDiseño(estilo: Diseño) {
    const body = document.body;
    body.classList.add("blur");

    cambiarDiseño(estilo);

    setTimeout(() => {
      body.classList.remove("blur");
    }, 900);
  }

  return (
    <section className={styles.contenedorEstilos}>
      <button
        className={styles[`${diseñoInStore}`]}
        onClick={() => handleDiseño(Diseño.neumorphism)}
      >
        Neumorphism
      </button>

      <button
        className={styles[`${diseñoInStore}`]}
        onClick={() => handleDiseño(Diseño.dark)}
      >
        Dark
      </button>

      <button
        className={styles[`${diseñoInStore}`]}
        onClick={() => handleDiseño(Diseño.gamer)}
      >
        Gamer
      </button>

      <button
        className={styles[`${diseñoInStore}`]}
        onClick={() => handleDiseño(Diseño.light)}
      >
        Light
      </button>

      <button
        className={styles[`${diseñoInStore}`]}
        onClick={() => handleDiseño(Diseño.neubrutalism)}
      >
        Neubrutalism
      </button>
    </section>
  );
}
