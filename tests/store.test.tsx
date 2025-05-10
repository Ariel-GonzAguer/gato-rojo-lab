import { describe, it, expect } from 'vitest';
import useStore from '../src/store/useStore';

describe('useStore', () => {
  it('should initialize with default values', () => {
    const store = useStore.getState();
    expect(store).toBeDefined();
  });
});
