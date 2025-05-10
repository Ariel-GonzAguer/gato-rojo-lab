import { describe, it, expect } from 'vitest';
import Header from '../src/componentes/Header.astro';

describe('Componente Header.astro', () => {
  it('renderiza el componente Header', async () => {
    const component = Header;
    expect(component).toBeDefined();
    // Verificamos que el componente sea una función (los componentes Astro son funciones)
    expect(typeof component).toBe('function');
  });
});
