import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import type { StoreState } from "../types/types";
import { Diseño } from "../types/types";

const useStore = create<StoreState>()(
  persist(
    immer((set) => ({
      // Estados
      diseñoInStore: Diseño.dark,

      // Acciones
      cambiarDiseño: (estilo: Diseño) =>
        set((state) => {
          state.diseñoInStore = estilo;
          // console.log("cambiarDiseño", estilo);
        }),
    })),
    {
      name: "zustand-store", // Nombre de la clave en el local storage
    }
  )
);

export default useStore;
