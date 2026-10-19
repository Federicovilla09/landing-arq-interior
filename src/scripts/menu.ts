/**
 * Menú mobile
 * Abre y cierra el <dialog id="menu">. El navegador se encarga del foco y de Esc.
 */
export function initMenu(): void {
  // 1. El botón ☰ y el menú
  const openButton = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  const menu = document.querySelector<HTMLDialogElement>("#menu");
  if (!openButton || !menu) return;

  // 2. Abrir: como modal, para que el navegador atrape el foco
  openButton.addEventListener("click", () => {
    menu.showModal();
    openButton.setAttribute("aria-expanded", "true");
  });

  // 3. Cerrar con la X
  const closeButton = menu.querySelector<HTMLButtonElement>("[data-menu-close]");
  closeButton?.addEventListener("click", () => {
    menu.close();
  });

  // 4. Al tocar un ancla o el CTA: cerrar (el link hace el desplazamiento)
  const links = menu.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  for (const link of links) {
    link.addEventListener("click", () => {
      menu.close();
    });
  }

  // 5. Cada vez que se cierra (X, Esc o ancla), avisar que está cerrado
  menu.addEventListener("close", () => {
    openButton.setAttribute("aria-expanded", "false");
  });

  // 6. Si la pantalla pasa a desktop con el menú abierto, cerrarlo
  const desktop = window.matchMedia("(min-width: 1024px)");
  desktop.addEventListener("change", () => {
    if (desktop.matches && menu.open) menu.close();
  });
}