export interface Props {
  pageTitle: string;
}

export enum Diseño {
  neumorphism = "neumorphism",
  dark = "dark",
  light = "light",
  neubrutalism = "neubrutalism",
  gamer = "gamer",
}

export interface StoreState {
  diseñoInStore: Diseño;
  cambiarDiseño: (estilo: Diseño) => void;
}
