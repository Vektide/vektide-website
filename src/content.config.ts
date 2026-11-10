// Content collections. `legal` holds the privacy policy and terms as Markdown, so the
// wording can change without touching the page layout (src/components/legal/LegalPage.astro).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    /** Page heading, e.g. "Privacy policy". */
    title: z.string(),
    /** <title> tag. */
    metaTitle: z.string(),
    /** Meta description. */
    description: z.string(),
    /** One plain sentence under the heading. */
    lead: z.string(),
    updated: z.coerce.date(),
    version: z.string(),
    /** "The short version": a few plain points shown before the full text. */
    summary: z.array(z.string()).min(1),
  }),
});

export const collections = { legal };
