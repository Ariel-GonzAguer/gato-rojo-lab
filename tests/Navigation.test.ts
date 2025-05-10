import { describe, it, expect } from 'vitest';
import Navigation from '../src/componentes/Navigation.astro';

describe('Componente Navegacion.astro', () => {
  it('debe estar definido', () => {
    expect(Navigation).toBeDefined();
  });

  it('debe ser un componente funcional', () => {
    expect(typeof Navigation).toBe('function');
  });
});
