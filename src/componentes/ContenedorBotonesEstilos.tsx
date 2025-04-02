// store
import useStore from "../store/useStore";

//
import { Diseño } from "../types/types";

export default function ContenedorBotonesEstilos() {
  const { diseñoInStore, cambiarDiseño } = useStore();

  return (
    <section className="contenedorEstilos">
      <button onClick={() => cambiarDiseño(Diseño.dark)}>Dark</button>
      <button onClick={() => cambiarDiseño(Diseño.light)}>Light</button>
      <button onClick={() => cambiarDiseño(Diseño.neumorphism)}>
        Neumorphism
      </button>
      <button onClick={() => cambiarDiseño(Diseño.neubrutalism)}>
        Neubrutalism
      </button>
      <button onClick={() => cambiarDiseño(Diseño.gamer)}>Gamer</button>
    </section>
  );
}
