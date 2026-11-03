"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultTheme, themes, type ThemeId } from "@/content/themes";

interface PreviewState {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  hero: number;
  setHero: (i: number) => void;
}

const Ctx = createContext<PreviewState>({ theme: defaultTheme, setTheme: () => {}, hero: 0, setHero: () => {} });
export const usePreview = () => useContext(Ctx);

const KEY_THEME = "mbr-theme";
const KEY_HERO = "mbr-hero";

/** Holds the visitor's palette/hero choice (per-browser, localStorage) and applies data-theme to <html>. */
export function PreviewProvider({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme);
  const [hero, setHeroState] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    try {
      const t = localStorage.getItem(KEY_THEME) as ThemeId | null;
      if (t && themes.some((x) => x.id === t)) setThemeState(t);
      const h = Number(localStorage.getItem(KEY_HERO));
      if (Number.isInteger(h) && h > 0) setHeroState(h);
    } catch {
      /* storage unavailable — keep defaults */
    }
  }, [enabled]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((t: ThemeId) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY_THEME, t);
    } catch {
      /* ignore */
    }
  }, []);
  const setHero = useCallback((i: number) => {
    setHeroState(i);
    try {
      localStorage.setItem(KEY_HERO, String(i));
    } catch {
      /* ignore */
    }
  }, []);

  return <Ctx.Provider value={{ theme, setTheme, hero, setHero }}>{children}</Ctx.Provider>;
}

/** Inline script: apply a saved palette before first paint to avoid a colour flash. */
export const themeBootScript = `try{var t=localStorage.getItem("${KEY_THEME}");if(t)document.documentElement.dataset.theme=t}catch(e){}`;
