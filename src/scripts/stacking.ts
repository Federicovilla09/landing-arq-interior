/**
 * Paneles apilados (desktop)
 * El efecto es CSS (behaviors.css). Este script:
 *  1. Mide el alto de cada sección (--panel-h) y del footer (--footer-h).
 *  2. Evita que el foco del teclado quede tapado por otra sección.
 */
import { headerHeight, pagePosition } from "./page-position";

export function initStacking(): void {
  const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-panel]"));
  if (panels.length === 0) return;

  // ---------- 1. Medir el alto de cada sección y del footer ----------
  const footer = document.querySelector<HTMLElement>(".site-footer");

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (element === footer) {
        document.documentElement.style.setProperty("--footer-h", `${element.offsetHeight}px`);
      } else {
        element.style.setProperty("--panel-h", `${element.offsetHeight}px`);
      }
    }
  });

  for (const panel of panels) resizeObserver.observe(panel);
  if (footer) resizeObserver.observe(footer);

  // ---------- 2. Que el foco nunca quede tapado ----------
  const stacking = window.matchMedia(
    "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
  );

  document.addEventListener("focusin", (event) => {
    if (!stacking.matches) return;

    const target = event.target as HTMLElement;
    const panel = target.closest<HTMLElement>("[data-panel]");
    if (!panel) return;

    // ¿Alguna sección posterior está tapando el elemento enfocado?
    const rect = target.getBoundingClientRect();
    const laterPanels = panels.slice(panels.indexOf(panel) + 1);
    const isCovered = laterPanels.some((later) => {
      const r = later.getBoundingClientRect();
      return r.top < rect.bottom && r.bottom > rect.top;
    });
    if (!isCovered) return;

    // Llevar la página a la posición real del elemento
    window.scrollTo({
      top: pagePosition(target) - headerHeight() - 24,
      behavior: "instant",
    });
  });
}