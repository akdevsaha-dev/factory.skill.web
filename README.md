# Factory Skills website

A monochrome Next.js website for [Factory Skills](https://github.com/akdevsaha-dev/factory-skills), featuring a searchable skill collection, accessible detail dialogs, an installation configurator, light and dark themes, the upstream animated demo, and a contribution guide.

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
