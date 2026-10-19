/**
 * CTA del header
 * Aparece cuando el botón del hero deja de verse en pantalla.
 */
export function initHeaderCta(): void {
  // 1. Buscar los elementos en la página (en el DOM)
  const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
  const headerCta = document.querySelector<HTMLElement>("[data-header-cta]");
  const header = document.querySelector<HTMLElement>(".site-header");

  // 2. Si alguno no existe, no hacer nada (así el código nunca se rompe)
  if (!heroCta || !headerCta || !header) return;

  // 3. Crear un "observador": avisa cuando un elemento entra o sale de la pantalla
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      // Si el botón del hero NO se ve, mostrar el del header (y al revés)
      headerCta.toggleAttribute("data-visible", !entry.isIntersecting);
    },
    {
      // No contar la franja que tapa el header fijo
      rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
    },
  );

  // 4. Empezar a observar el botón del hero
  observer.observe(heroCta);
}