import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HamburgerMenu from '../src/componentes/HamburgerMenu';

describe('HamburgerMenu', () => {
  it('debería renderizar el botón del menú hamburguesa', () => {
    render(<HamburgerMenu />);
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.querySelectorAll('.line')).toHaveLength(3);
  });
  it('debería alternar el menú al hacer clic', async () => {
    render(<HamburgerMenu />);
    const menuButton = screen.getByRole('button');

    // Inicialmente cerrado
    expect(screen.queryByTestId('servicios')).not.toBeInTheDocument();

    // Abrir menú
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByTestId('servicios')).toBeInTheDocument();
    });

    // Cerrar menú
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.queryByTestId('servicios')).not.toBeInTheDocument();
    });
  });

  it('debería mostrar y ocultar enlaces correctamente', () => {
    render(<HamburgerMenu />);
    const menuButton = screen.getByRole('button');

    // Verificar que los enlaces no son visibles inicialmente
    expect(screen.queryByTestId('inicio')).not.toBeInTheDocument();

    // Abrir menú
    fireEvent.click(menuButton);

    // Verificar que todos los enlaces están presentes
    const enlaces = ['inicio', 'servicios', 'proyectos', 'acerca-de', 'contacto'];
    enlaces.forEach(id => {
      expect(screen.getByTestId(id)).toBeInTheDocument();
    });
  });
});