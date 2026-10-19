/**
 * Scroll-spy
 * Marca con aria-current="true" el ancla de la sección que se está viendo.
 */
export function initScrollSpy(): void {
  // 1. Todos los links del menú que apuntan a una sección (href que empieza con #)
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-nav] a[href^="#"]'),
  );
  if (links.length === 0) return;

  // 2. La sección de cada link: "#servicios" → el elemento con id="servicios"
  const sections: HTMLElement[] = [];
  for (const link of links) {
    const section = document.getElementById(link.hash.slice(1));
    if (section) sections.push(section);
  }

  // 3. Las secciones que están cruzando la franja de lectura
  const visibles = new Set<HTMLElement>();

  // 4. Marcar el link activo
  function update(): void {
    // De las visibles, la última en el orden de la página
    const inView = sections.filter((section) => visibles.has(section));
    const active = inView[inView.length - 1];

    for (const link of links) {
      if (active && link.hash === `#${active.id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  // 5. El observador: avisa cuando una sección entra o sale de la franja
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const section = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          visibles.add(section);
        } else {
          visibles.delete(section);
        }
      }
      update();
    },
    { rootMargin: "-35% 0px -60% 0px" },
  );

  // 6. Observar cada sección
  for (const section of sections) {
    observer.observe(section);
  }
}