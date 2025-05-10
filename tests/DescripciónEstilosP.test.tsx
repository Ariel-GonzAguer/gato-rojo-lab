import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DescripciónEstilosP from '../src/componentes/DescripciónEstilosP';
import useStore from '../src/store/useStore';
import { Diseño } from '../src/types/types';
import { act } from 'react';


describe("Componente DescripciónEstilosP.tsx", () => {
  it("renderiza la descripción de diseño Gamer", () => {
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });

    render(<DescripciónEstilosP />);

    expect(screen.getByText("Dinámico y retro, con colores neón, efectos de iluminación y tipografía angular, evocando la estética de los videojuegos y la cultura digital.")).toBeInTheDocument();
  });

  it("renderiza alienígenas cuando diseñoInStore es 'gamer'", () => {
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });

    render(<DescripciónEstilosP />);

    const alienígenas = screen.getAllByText("👾");
    expect(alienígenas).toHaveLength(3);
  });

  it("actualiza un '👾' a '💥' cuando se hace clic en el botón del joystick", () => {
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });

    render(<DescripciónEstilosP />);

    const botónJoystick = screen.getByText("🕹️");
    fireEvent.click(botónJoystick);

    const alienígenasActualizados = screen.getAllByText("💥");
    expect(alienígenasActualizados).toHaveLength(1);
  });

  it("muestra 'You win!' cuando todos los alienígenas son '💥'", () => {
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });

    render(<DescripciónEstilosP />);

    const botónJoystick = screen.getByText("🕹️");
    fireEvent.click(botónJoystick);
    fireEvent.click(botónJoystick);
    fireEvent.click(botónJoystick);

    const mensajeGanaste = screen.getByText("You win!");
    expect(mensajeGanaste).toBeInTheDocument();
  });

  it("reinicia los alienígenas a '👾' cuando se hace clic en el botón de reinicio", () => {
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });

    render(<DescripciónEstilosP />);

    const botónJoystick = screen.getByText("🕹️");
    fireEvent.click(botónJoystick);
    fireEvent.click(botónJoystick);
    fireEvent.click(botónJoystick);

    expect(screen.getByText("Restart")).toBeInTheDocument();
    const botónReinicio = screen.getByText("Restart");
    fireEvent.click(botónReinicio);

    const alienígenasReiniciados = screen.getAllByText("👾");
    expect(alienígenasReiniciados).toHaveLength(3);
  });

  it("muestra la descripción de diseño 'dark'", () => {
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.dark });
    });

    render(<DescripciónEstilosP />);

    expect(screen.getByText("Elegante y moderno con colores oscuros que reducen la fatiga visual y resaltan los elementos clave mediante contrastes sutiles y efectos luminosos.")).toBeInTheDocument();
  });
});
