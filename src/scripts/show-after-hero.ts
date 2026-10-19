/**
 * Elementos que aparecen después del hero
 * (el CTA del header y el botón "volver arriba").
 *
 * Se muestran cuando el botón del hero deja de verse: porque salió de la
 * pantalla (mobile y tablet) o porque otra sección lo tapó (desktop con
 * paneles apilados). IntersectionObserver no detecta lo segundo: mide
 * posiciones, pero no sabe qué elemento está encima de cuál.
 */
export function initShowAfterHero(): void {
  const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
  const header = document.querySelector<HTMLElement>(".site-header");
  const elements = document.querySelectorAll<HTMLElement>("[data-show-after-hero]");
  if (!heroCta || !header || elements.length === 0) return;

  // La sección que viene después del hero (la que lo tapa al apilarse)
  const hero = heroCta.closest<HTMLElement>("[data-panel]");
  const nextSection = hero?.nextElementSibling as HTMLElement | null;

  // ¿El botón del hero se ve realmente?
  function isHeroCtaVisible(): boolean {
    const cta = heroCta!.getBoundingClientRect();
    const headerBottom = header!.getBoundingClientRect().bottom;

    // 1. ¿Está dentro de la pantalla, debajo del header?
    const insideScreen = cta.bottom > headerBottom && cta.top < window.innerHeight;

    // 2. ¿La sección siguiente ya le pasó por encima?
    const covered = nextSection ? nextSection.getBoundingClientRect().top < cta.bottom : false;

    return insideScreen && !covered;
  }

  // Mostrar u ocultar los elementos según el resultado
  function update(): void {
    const show = !isHeroCtaVisible();
    for (const element of elements) {
      element.toggleAttribute("data-visible", show);
    }
    waiting = false;
  }

  // Revisar en cada scroll, como máximo una vez por cuadro de animación
  let waiting = false;
  window.addEventListener(
    "scroll",
    () => {
      if (waiting) return;
      waiting = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );

  window.addEventListener("resize", update);
  update(); // estado inicial, por si la página se abre a mitad de camino
}