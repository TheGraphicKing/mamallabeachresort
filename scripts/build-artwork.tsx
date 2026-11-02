/**
 * Renders each illustration scene to a static SVG in public/art/.
 * Runs automatically before `dev` and `build` (see package.json).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// tsx compiles JSX with the classic runtime here; expose React for React.createElement.
(globalThis as unknown as { React: typeof React }).React = React;

async function main() {
  const { Artwork, artworkScenes } = await import("../src/components/media/Artwork");
  const outDir = join(process.cwd(), "public", "art");
  mkdirSync(outDir, { recursive: true });
  for (const scene of artworkScenes) {
    const svg = renderToStaticMarkup(React.createElement(Artwork, { scene, standalone: true }));
    writeFileSync(join(outDir, `${scene}.svg`), `<?xml version="1.0" encoding="UTF-8"?>\n${svg}\n`);
  }
  console.log(`artwork: wrote ${artworkScenes.length} SVGs to public/art/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
