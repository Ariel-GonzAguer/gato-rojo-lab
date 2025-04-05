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
        margin: diseñoInStore === "neubrutalism" || "gamer" ? "1rem auto" : "4rem auto 2rem",
        textAlign: "center",
        width: "80%",
        fontSize: diseñoInStore === "neubrutalism" ? "1.6rem" : diseñoInStore === "gamer" ? "1.5rem" : "2rem",
        color: diseñoInStore === "light" ? "black" : undefined,
        fontWeight: "bolder",
        backdropFilter: diseñoInStore === "light" ? "blur(5px)" : "none",
      }}
    >
      {
        diseñoInStore === "gamer" && (
          <>
            <div className="vibrate1" style={{lineHeight: "0.5"}}>
              <span style={{ fontSize: "2rem" }}>👾</span>
              <span style={{ fontSize: "3rem" }}>👾</span>
              <span style={{ fontSize: "2rem" }}>👾</span>
            </div>
            < br />
          </>
        )
      }
      {
        descripciónEstilos.find((estilo) => estilo.nombre === diseñoInStore)
          ?.descripción
      }
      <br />
      {
        diseñoInStore === "gamer" && (
          <>
            <span style={{ fontSize: "2.5rem" }}>🕹️</span> < br />
          </>
        )
      }
    </p>
  );
}
