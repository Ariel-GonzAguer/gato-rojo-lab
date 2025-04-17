// data
import descripciónEstilos from "../data/descripciónEstilos";

// store
import useStore from "../store/useStore";

// estilos
import styles from "../styles/ContenedorBotonesEstilos.module.css";

// hooks
import { useState } from "react";

export default function DescripciónEstilosP() {
  const { diseñoInStore } = useStore();
  const [aliens, setAliens] = useState(["👾", "👾", "👾"]);

  // handlers
  const handleJoystickClick = () => {
    if (diseñoInStore === "gamer" && aliens.length > 0) {
      setAliens((prevAliens) => {
        const updatedAliens = [...prevAliens];
        const indexToChange = updatedAliens.findIndex((alien) => alien === "👾");
        if (indexToChange !== -1) {
          updatedAliens[indexToChange] = "💥";
        }
        return updatedAliens;
      });
    }
  };

  function handleRestart() {
    if (diseñoInStore === "gamer") {
      setAliens(["👾", "👾", "👾"]);
    }
  }


  return (
    <section
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
            {
              aliens.some(alien => alien === "👾") && (
                aliens.map((alien, index) => (
                  <span key={index} style={{ fontSize: "2.5rem" }}>
                    {alien}
                  </span>
                ))
              )
            }
            {
              aliens.every(alien => alien === "💥") && (
                <span style={{ fontSize: "2rem", color: "white" }} className="youWin">You win!</span>
              )
            }
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
            <span style={{ fontSize: "2.5rem" }} onClick={handleJoystickClick}>🕹️</span> < br />
            {
              aliens.every(alien => alien === "💥") ? (
                <p style={{ fontSize: "2rem", color: "white" }} onClick={handleRestart}>Restart</p>
              ) : <p style={{ fontSize: "1.6rem", color: "white" }}>Click to play!</p>
            }
          </>
        )
      }
    </section>
  );
}
