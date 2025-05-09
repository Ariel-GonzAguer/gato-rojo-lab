import { Diseño } from "../types/types";
import type { DescripciónEstilo } from "../types/types";

const descripciónEstilos: DescripciónEstilo[] = [
  {
    nombre: Diseño.dark,
    descripción:
      "Elegante y moderno con colores oscuros que reducen la fatiga visual y resaltan los elementos clave mediante contrastes sutiles y efectos luminosos.",
  },
  {
    nombre: Diseño.light,
    descripción:
      "Un enfoque limpio y minimalista con fondos claros y tipografía bien definida, ideal para mejorar la legibilidad y transmitir una sensación de frescura y amplitud.",
  },
  {
    nombre: Diseño.neumorphism,
    descripción:
      "Suave y realista, combina luces y sombras para crear elementos con apariencia tridimensional, logrando una estética moderna y suave.",
  },
  {
    nombre: Diseño.neubrutalism,
    descripción:
      "Audaz y llamativo con colores vibrantes, tipografía gruesa y bordes marcados, inspirado en el brutalismo pero con un toque contemporáneo y accesible.",
  },
  {
    nombre: Diseño.gamer,
    descripción:
      "Dinámico y retro, con colores neón, efectos de iluminación y tipografía angular, evocando la estética de los videojuegos y la cultura digital.",
  },
];

export default descripciónEstilos;
