import { it, expect, describe } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import MarqueeTecnologias from "../src/componentes/MarqueeTecnologias.astro";

describe("MarqueeTecnologias", () => {
  it("debería ser un componente definido", () => {
    expect(MarqueeTecnologias).toBeDefined();
  });

  it("debería ser una función (componente Astro)", () => {
    expect(typeof MarqueeTecnologias).toBe("function");
  });

  it("debería contener la lista correcta de tecnologías", async () => {
    const expectedTechnologies = [
      "Astro",
      "React",
      "TypeScript",
      "CSS",
      "JavaScript",
      "Git",
      "GitHub",
      "Firebase",
      "Cloudinary",
      "Netlify",
      "Vercel",
      "Vite",
      "Vitest",
      "React Router",
      "Redux",
      "Tailwind",
      "Zustand",
    ];

    const container = await AstroContainer.create();
    const result = await container.renderToString(MarqueeTecnologias);

    // Verificar que cada tecnología está presente en el HTML renderizado
    expectedTechnologies.forEach((tech) => {
      expect(result).toContain(tech);
    });
  });

  it("debería tener la estructura correcta de HTML", async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(MarqueeTecnologias);

    // Verificar elementos estructurales
    expect(result).toContain('class="marquee-section"');
    expect(result).toContain('class="marquee-container"');
    expect(result).toContain('class="marquee"');
    expect(result).toContain('class="tech-item"');
  });
});
