# Factory Skills website

A monochrome Next.js website for [Factory Skills](https://github.com/akdevsaha-dev/factory-skills), featuring a searchable skill collection, dedicated skill guides, an installation configurator, a six-lesson Learn guide, light and dark themes, the upstream animated demo, and a contribution guide.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
```

The site exports to `out/` and can be served by any static host. `npm run typecheck` checks TypeScript. Update the origin in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` when using a custom domain.

## Content

Skill descriptions and commands live in `lib/skills.ts`. The six primary workflows and five companion skills reflect the upstream README at implementation time. Recheck upstream when changing installation or contribution instructions.

`public/demo.svg` is the upstream repository’s animated demo; `public/demo-static.svg` provides a reduced-motion equivalent. Both are shown in grayscale to match the site. The original asset is MIT licensed; its license is preserved in `public/UPSTREAM-LICENSE`.

## Design

Geist and Geist Mono, neutral color tokens, restrained borders and shadows, 7px control radii and 10px panel radii. Themes follow the system preference until a visitor chooses a theme. The preference persists locally. The site uses CSS transitions and honors reduced motion and reduced transparency.

## Guides and lessons

`lib/skill-guides.ts` contains the 11 skill guides and 56 example prompts. `lib/lessons.ts` contains the six ordered lessons. Both feed statically generated pages under `/skills/` and `/learn/`. Add a data entry to generate a new route and include it in navigation and the sitemap. Commands marked Terminal run in a shell; prompts marked Send to your agent are requests for the coding agent. Examples are illustrative, not execution records.
