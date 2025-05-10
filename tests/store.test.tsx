import { describe, it, expect } from 'vitest';
import useStore from '../src/store/useStore';
import { act } from 'react';
import { Diseño } from '../src/types/types';

describe('useStore', () => {
  it('debe inicializarse correctamente', () => {
    const store = useStore.getState();
    expect(store).toBeDefined();
  });

  it('debe actualizar el estado correctamente', () => {
    const estadoInicial = useStore.getState();
    expect(estadoInicial.diseñoInStore).toBe(Diseño.dark);

    act(() => {
      useStore.setState({ diseñoInStore: Diseño.gamer });
    });

    const estadoActual = useStore.getState();
    expect(estadoActual).not.toBe(estadoInicial);
  });
});
