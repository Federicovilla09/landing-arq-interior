/**
 * Utilidades de posición, compartidas por stacking.ts y smooth-scroll.ts.
 */

/** Alto actual del header fijo. */
export function headerHeight(): number {
  const header = document.querySelector<HTMLElement>(".site-header");
  return header ? header.offsetHeight : 0;
}

/**
 * Posición real de un elemento en la página, aunque su sección esté fija
 * detrás de otras (paneles apilados): suma el alto de las secciones anteriores.
 */
export function pagePosition(target: HTMLElement): number {
  const main = document.querySelector<HTMLElement>("main");
  const panel = target.closest<HTMLElement>("[data-panel]");

  // Fuera de las secciones apiladas, la posición en pantalla es confiable
  if (!main || !panel) {
    return target.getBoundingClientRect().top + window.scrollY;
  }

  let top = main.getBoundingClientRect().top + window.scrollY;
  top += parseFloat(getComputedStyle(main).paddingTop);

  const panels = Array.from(main.querySelectorAll<HTMLElement>(":scope > [data-panel]"));
  for (const p of panels) {
    if (p === panel) break;
    top += p.offsetHeight;
  }

  // Si el destino está adentro de la sección, sumar su distancia al borde de arriba
  const offsetInPanel = target.getBoundingClientRect().top - panel.getBoundingClientRect().top;
  return top + offsetInPanel;
}