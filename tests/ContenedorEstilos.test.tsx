import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ContenedorEstilos from '../src/layouts/ContenedorEstilos';
import useStore from '../src/store/useStore';
import { Diseño } from '../src/types/types';
import { act } from 'react';

describe('Componente ContenedorEstilos.tsx', () => {
  it('renderiza los hijos correctamente', () => {
    const testText = 'Test Content';
    const { getByText } = render(
      <ContenedorEstilos>
        <div>{testText}</div>
      </ContenedorEstilos>
    );

    expect(getByText(testText)).toBeInTheDocument();
  });
  it('se aplica estilo dark por default', () => {
    const { container } = render(
      <ContenedorEstilos>
        <div>Content</div>
      </ContenedorEstilos>
    );
    const mainElement = container.firstChild;
    expect(mainElement).toHaveStyle({
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto'
    });
  });

  it('aplica estilo por default dark a los hijos', () => {
    const { container } = render(
      <ContenedorEstilos>
        <div>Content</div>
      </ContenedorEstilos>
    );

    // Por defecto, el store inicia con 'dark' como diseño
    expect(container.firstChild).toHaveClass('dark');
  });

  it('cambia de estilos correctamente', () => {
    const { container } = render(
      <ContenedorEstilos>
        <div>Content</div>
      </ContenedorEstilos>
    );

    // Simulamos un cambio en el store a 'light'
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.light });
    });
    // Verificamos que el contenedor tenga la clase 'light'
    expect(container.firstChild).toHaveClass('light');
    // Simulamos un cambio en el store a 'neumorphism'
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.neumorphism });
    });
    // Verificamos que el contenedor tenga la clase 'neumorphism'
    expect(container.firstChild).toHaveClass('neumorphism');
    // Simulamos un cambio en el store a 'neubrutalism'
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.neubrutalism });
    });
    // Verificamos que el contenedor tenga la clase 'neubrutalism'
    expect(container.firstChild).toHaveClass('neubrutalism');
    // Simulamos un cambio en el store a 'gamer'
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });
    // Verificamos que el contenedor tenga la clase 'gamer'
    expect(container.firstChild).toHaveClass('gamer');
    // Simulamos un cambio en el store a 'dark'
    act(() => {
      useStore.setState({ diseñoInStore: Diseño.dark });
    });
    // Verificamos que el contenedor tenga la clase 'dark'
    expect(container.firstChild).toHaveClass('dark');


  });
});
