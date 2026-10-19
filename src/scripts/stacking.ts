/**
 * Paneles apilados (desktop)
 * El efecto es CSS (behaviors.css). Este script:
 *  1. Mide el alto de cada sección y lo guarda en --panel-h.
 *  2. Evita que el foco del teclado quede tapado por otra sección.
 */
export function initStacking(): void {
  const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-panel]"));
  if (panels.length === 0) return;

  // ---------- 1. Medir el alto de cada sección ----------
  // ResizeObserver avisa cada vez que un elemento cambia de tamaño
  // (al cargar, al cambiar el ancho de la ventana, si cambia el texto…).
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const panel = entry.target as HTMLElement;
      panel.style.setProperty("--panel-h", `${panel.offsetHeight}px`);
    }
  });
  for (const panel of panels) {
    resizeObserver.observe(panel);
  }

  // ---------- 2. Que el foco nunca quede tapado ----------
  // La misma condición que la media query del CSS
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

    // Llevar la página a la posición real de esa sección (sumando las anteriores)
    const main = panels[0].parentElement as HTMLElement;
    let top = main.getBoundingClientRect().top + window.scrollY + main.offsetTop * 0;
    top += parseFloat(getComputedStyle(main).paddingTop);
    for (const p of panels) {
      if (p === panel) break;
      top += p.offsetHeight;
    }
    const offsetInPanel = rect.top - panel.getBoundingClientRect().top;
    window.scrollTo({ top: top + offsetInPanel - 120 });
  });
}