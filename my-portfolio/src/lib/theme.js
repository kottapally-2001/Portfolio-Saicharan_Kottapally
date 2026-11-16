import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { prefersReducedMotion } from "./motion";

const STORAGE_KEY = "theme";
const META_COLORS = { dark: "#0c0a12", light: "#fbf7f2" };

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

const writeStored = (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
};

/* The inline script in index.html sets data-theme before first paint */
const currentTheme = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", META_COLORS[theme]);
};

export function useTheme() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  /* Follow the OS setting until the visitor picks a theme themselves */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => {
      if (!readStored()) setTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggleTheme = useCallback(
    (event) => {
      const next = theme === "dark" ? "light" : "dark";
      writeStored(next);

      const commit = () => {
        applyTheme(next);
        setTheme(next);
      };

      if (!document.startViewTransition || prefersReducedMotion()) {
        commit();
        return;
      }

      /* Circular reveal expanding from the toggle button */
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(() => {
        flushSync(commit);
      });

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 800,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    },
    [theme]
  );

  return { theme, toggleTheme };
}
