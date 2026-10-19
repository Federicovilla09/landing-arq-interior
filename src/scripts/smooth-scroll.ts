/**
 * Desplazamiento suave a las anclas (#seccion)
 *
 * 1. Calcula la posición real de la sección en la página, incluso si está
 *    fija detrás de otras (paneles apilados en desktop).
 * 2. Desplaza con una curva ease-in-out: arranca suave y desacelera al final.
 * 3. Con movimiento reducido, salta directo, sin animación.
 */

// La misma condición que usa el CSS para la preferencia de movimiento
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// ---------- 1. Dónde está realmente un elemento en la página ----------
function pagePosition(target: HTMLElement): number {
  const main = document.querySelector<HTMLElement>("main");
  const panel = target.closest<HTMLElement>("[data-panel]");

  // Fuera de las secciones apiladas, la posición en pantalla es confiable
  if (!main || !panel) {
    return target.getBoundingClientRect().top + window.scrollY;
  }

  // Dentro: sumar el alto de todas las secciones anteriores
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

// ---------- 2. La curva: arranca suave, acelera y frena al final ----------
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ---------- 3. Animar el scroll hasta una posición ----------
let animation = 0;

function scrollToPosition(to: number, onEnd: () => void): void {
  const from = window.scrollY;
  const distance = to - from;

  // Movimiento reducido o distancia mínima: ir directo
  if (reducedMotion.matches || Math.abs(distance) < 2) {
    window.scrollTo({ top: to, behavior: "instant" });
    onEnd();
    return;
  }

  // Duración según la distancia: entre 0,5 y 1,2 segundos
  const duration = Math.min(1200, Math.max(500, Math.abs(distance) * 0.4));
  const start = performance.now();
  cancelAnimationFrame(animation);

  function frame(now: number): void {
    const progress = Math.min(1, (now - start) / duration);   // de 0 a 1
    const y = from + distance * easeInOutCubic(progress);
    window.scrollTo({ top: y, behavior: "instant" });

    if (progress < 1) {
      animation = requestAnimationFrame(frame);
    } else {
      onEnd();
    }
  }
  animation = requestAnimationFrame(frame);
}

// Si la persona hace scroll por su cuenta durante la animación, se la deja
function cancelOnUserScroll(): void {
  cancelAnimationFrame(animation);
}

// ---------- 4. Escuchar los clics en todas las anclas ----------
export function initSmoothScroll(): void {
  window.addEventListener("wheel", cancelOnUserScroll, { passive: true });
  window.addEventListener("touchstart", cancelOnUserScroll, { passive: true });

  document.addEventListener("click", (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link || link.hash.length < 2) return;

    const target = document.getElementById(link.hash.slice(1));
    if (!target) return;

    event.preventDefault();   // en lugar del salto del navegador, el nuestro

    const header = document.querySelector<HTMLElement>(".site-header");
    const headerHeight = header ? header.offsetHeight : 0;
    const to = Math.max(0, pagePosition(target) - headerHeight);

    scrollToPosition(to, () => {
      // Al llegar: actualizar la URL y llevar el foco a la sección
      history.pushState(null, "", link.hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}