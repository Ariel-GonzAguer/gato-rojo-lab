import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock para componentes Astro
vi.mock('astro:content', () => ({
  getCollection: vi.fn(),
}));

vi.mock('astro', () => ({
  Astro: {
    props: {},
    slots: {},
    self: {},
  },
}));

// Setup para componentes Astro
vi.mock('*.astro', () => {
  return {
    default: vi.fn().mockImplementation((props) => {
      return {
        props,
        render: vi.fn().mockResolvedValue({
          html: '<div>Mocked Astro Component</div>'
        }),
        toString: () => 'Mocked Astro Component String',
      };
    }),
  };
});
