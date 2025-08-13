import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import ProyectoCard from '../src/componentes/ProyectoCard';

// Asegúrate de que el mock esté correctamente configurado
vi.mock("../src/lib/toast", () => {
  return {
    toast: {
      success: vi.fn(),
      error: vi.fn(),
      dismiss: vi.fn(),
      custom: vi.fn(),
    },
    Toaster: () => <div data-testid="mock-toaster" />
  };
});

describe('Componente ProyectoCard', () => {

  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    vi.clearAllMocks();
  });

  const mockProps = {
    key: '1',
    name: 'Test Project',
    tags: ['React', 'TypeScript'],
    description: 'Test description',
    emoji: '🚀',
    link: 'https://test.com'
  };

  it('renderiza correctamente con las props proporcionadas', () => {
    const { getByText, getByTitle } = render(<ProyectoCard {...mockProps} />);

    expect(getByText('Test Project')).toBeInTheDocument();
    expect(getByText('React, TypeScript')).toBeInTheDocument();
    expect(getByText('🚀')).toBeInTheDocument();
    expect(getByText('Ver Proyecto')).toBeInTheDocument();
    expect(getByTitle('Click para ver descripción completa')).toBeInTheDocument();
  });

  it('el enlace tiene los atributos correctos', () => {
    const { getByText } = render(<ProyectoCard {...mockProps} />);
    const link = getByText('Ver Proyecto');

    expect(link).toHaveAttribute('href', 'https://test.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
})
