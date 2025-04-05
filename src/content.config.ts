// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// Define a `loader` and `schema` for each collection
const proyectos = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: "./src/data/projects-collection",
  }),
  schema: z.object({
    // definir el esquema/forma de los datos/posts/blogs que se van a cargar
    name: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    emoji: z.string(),
    link: z.string(),
  }),
});
// Export a single `collections` object to register your collection(s)
export const collections = { proyectos };
