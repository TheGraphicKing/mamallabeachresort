/** Selectable colour palettes. Colours live in globals.css under [data-theme="…"]; "palm" is the @theme default. */
export const themes = [
  { id: "palm", name: "Palm & Sandstone", swatches: ["#17302a", "#f5f1ea", "#e6d4b2"] },
  { id: "midnight", name: "Midnight Ocean", swatches: ["#0b1e33", "#f4f2ee", "#e8d3a2"] },
  { id: "noir", name: "Noir & Gold", swatches: ["#121212", "#f2eee7", "#dcc08a"] },
  { id: "laterite", name: "Laterite Sunset", swatches: ["#3b1e14", "#f6efe6", "#f0c9a0"] },
  { id: "azure", name: "Coastal Azure", swatches: ["#08394f", "#f3f6f6", "#f3d9a6"] },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

/** Default palette for the live site. Change this (or set NEXT_PUBLIC_THEME) once a palette is chosen. */
export const defaultTheme: ThemeId = (process.env.NEXT_PUBLIC_THEME as ThemeId) || "palm";

/** Show the "Preview" panel (palette + hero picker). Set NEXT_PUBLIC_PREVIEW_PANEL=off to hide it for launch. */
export const showPreviewPanel = process.env.NEXT_PUBLIC_PREVIEW_PANEL !== "off";
