import React, { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../lib/motion";

/** Counts up to a value like "25+" once it scrolls into view. */
export function Counter({ value, duration = 1800 }) {
  const ref = useRef(null);
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const isNumeric = Boolean(match);

  const [current, setCurrent] = useState(() =>
    prefersReducedMotion() ? target : 0
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric || prefersReducedMotion()) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          setCurrent(Math.round(eased * target));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, isNumeric]);

  if (!isNumeric) return <span>{value}</span>;

  return (
    <span ref={ref} className="counter">
      <span aria-hidden="true">
        {current}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}

/** Cycles through words with a soft slide + blur transition. */
export function WordRotator({ words, interval = 2400 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval]);

  const prev = (index - 1 + words.length) % words.length;

  return (
    <span className="rotator" aria-label={words.join(", ")}>
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden="true"
          className={
            "rotator-word" +
            (i === index ? " is-current" : i === prev ? " is-prev" : "")
          }
        >
          {word}
        </span>
      ))}
    </span>
  );
}
