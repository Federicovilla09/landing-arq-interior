# Landing para arquitecta · demo

Demo conceptual. Stack: Vite + TypeScript, sin framework. Referencia de diseño: archivo de Figma, páginas **UI Design**, **Prototype** y **Handoff**.

## Puesta en marcha

```bash
npm create vite@latest landing-arquitecta -- --template vanilla-ts
cd landing-arquitecta
npm i @fontsource/alexandria @fontsource/manrope
```

Después:

1. Borrar `src/counter.ts`, `src/style.css` y `src/typescript.svg` de la plantilla.
2. Copiar `src/main.ts`, `src/styles/` y `src/scripts/` de este paquete.
3. En `index.html`, dejar `<script type="module" src="/src/main.ts"></script>` y armar las secciones.
4. `npm run dev`

## Archivos

| Archivo | Qué tiene |
|---|---|
| `styles/tokens.css` | Variables de Figma (modo Marca), spacing, radius, fuentes, elevación y layout |
| `styles/base.css` | Reset, foco visible, skip link y los estilos de texto como clases `.t-*` |
| `styles/behaviors.css` | CSS del que dependen los scripts: CTA del header, menú y paneles apilados |
| `scripts/header-cta.ts` | Muestra el CTA del header cuando el del hero sale de la pantalla |
| `scripts/scroll-spy.ts` | `aria-current` en el ancla de la sección visible |
| `scripts/menu.ts` | Menú mobile con `<dialog>` modal |
| `scripts/stacking.ts` | `--panel-h` para "sticky al final" y corrección de foco tapado |

Faltan `components.css` y `sections.css`: se escriben siguiendo los tableros 05 y 06 del handoff.

## Contrato de atributos

| Atributo | Dónde | Lo usa |
|---|---|---|
| `data-hero-cta` | CTA principal del hero | header-cta |
| `data-header-cta` | CTA del header (desktop y mobile) | header-cta |
| `data-nav` | `<nav>` del header con anclas `href="#id"` | scroll-spy |
| `data-menu-open` + `aria-controls="menu"` | Botón de menú | menu |
| `<dialog id="menu" class="menu">` + `data-menu-close` | Menú mobile | menu |
| `data-panel` / `data-panel="tall"` | Cada `<section>` dentro de `<main>`, en orden; `tall` solo en Proyectos | stacking |

## Reglas a respetar

- Las secciones con `data-panel` necesitan fondo opaco (`--color-bg-page` o `--color-bg-subtle`).
- El header va fuera de `<main>`, `position: fixed`, con `z-index` por encima de las secciones.
- Clases con el nombre del componente de Figma: `.button--primary`, `.nav-item`, `.card-need`, `.step--highlighted`.
- Completar los placeholders del tablero 10 antes de mostrar la demo.