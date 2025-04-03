// data
import descripciónEstilos from "../data/descripciónEstilos";

// store
import useStore from "../store/useStore";

// estilos
import styles from "../styles/ContenedorBotonesEstilos.module.css";

export default function DescripciónEstilosP() {
  const { diseñoInStore } = useStore();

  return (
    <p
      className={styles[`${diseñoInStore}`]}
      style={{
        margin: diseñoInStore === "neubrutalism" ? "1.5rem auto" : "4rem auto 2rem",
        // paddingBottom: "2rem",
        textAlign: "center",
        width: "80%",
        fontSize: diseñoInStore === "neubrutalism" ? "1.6rem" : "2rem",
        color: diseñoInStore === "light" ? "black" : undefined,
        fontWeight: "bolder",
        backdropFilter: diseñoInStore === "light" ? "blur(5px)" : "none",
      }}
    >
      {
        descripciónEstilos.find((estilo) => estilo.nombre === diseñoInStore)
          ?.descripción
      }
    </p>
  );
}
