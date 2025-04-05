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

export interface DescripciónEstilo {
  nombre: Diseño;
  descripción: string;
}

export interface PropsCard {
  name: string;
  tags: string[];
  description: string;
  emoji: string;
  link: string;
}