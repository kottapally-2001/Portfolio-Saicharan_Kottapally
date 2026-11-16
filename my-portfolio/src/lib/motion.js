import { useEffect } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const hasFinePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Page-wide motion wiring:
 *  - [data-reveal] elements animate in when they enter the viewport
 *  - .spot elements get a cursor-following glow (--mx / --my)
 *  - .magnetic elements drift toward the cursor
 */
export function useMotionEffects() {
  useEffect(() => {
    const reduce = prefersReducedMotion();

    /* Scroll reveal */
    const revealEls = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));

    /* Cursor spotlight (delegated) */
    const onPointerMove = (e) => {
      const card = e.target.closest?.(".spot");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });

    /* Magnetic buttons */
    const cleanups = [];
    if (!reduce && hasFinePointer()) {
      document.querySelectorAll(".magnetic").forEach((el) => {
        const strength = parseFloat(el.dataset.strength || "0.25");
        const move = (e) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - (r.left + r.width / 2);
          const y = e.clientY - (r.top + r.height / 2);
          el.style.translate = `${x * strength}px ${y * strength}px`;
        };
        const leave = () => {
          el.style.translate = "0px 0px";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      cleanups.forEach((fn) => fn());
    };
  }, []);
}
