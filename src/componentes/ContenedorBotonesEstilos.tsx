// store
import useStore from "../store/useStore";

//
import { Diseño } from "../types/types";

export default function ContenedorBotonesEstilos() {
  const { cambiarDiseño } = useStore();

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
    <section className="contenedorEstilos">
      <button onClick={() => handleDiseño(Diseño.dark)}>Dark</button>
      <button onClick={() => handleDiseño(Diseño.light)}>Light</button>
      <button onClick={() => handleDiseño(Diseño.neumorphism)}>
        Neumorphism
      </button>
      <button onClick={() => handleDiseño(Diseño.neubrutalism)}>
        Neubrutalism
      </button>
      <button onClick={() => handleDiseño(Diseño.gamer)}>Gamer</button>
    </section>
  );
}
