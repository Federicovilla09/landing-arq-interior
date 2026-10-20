# Landing para arquitecta · demo

Propuesta de sitio web de una sola página. Base cerrada en un 80 %: si la propuesta avanza, se cambian **textos, imágenes y datos**, no la estructura.

- **Stack:** Vite + TypeScript, sin framework. HTML, CSS y unos pocos módulos de TypeScript.
- **Diseño:** archivo de Figma (páginas *UI Design*, *Prototype*, *Resources* y *Handoff*).
- **Estado:** propuesta privada. No indexada en buscadores (ver "Pasar a sitio oficial").

## Comandos

| Comando | Para qué |
|---|---|
| `npm install` | Instalar dependencias (la primera vez, o después de clonar) |
| `npm run dev` | Trabajar en local: `http://localhost:5173` |
| `npm run dev -- --host` | Igual, pero accesible desde el celular en la misma red Wi-Fi |
| `npx tsc --noEmit` | Revisar errores de TypeScript sin generar archivos |
| `npm run build` | Generar la versión final en `dist/` |
| `npm run preview` | Ver la versión final: `http://localhost:4173` |

## Estructura

```
index.html               Todo el contenido de la página
public/
├─ images/               Imágenes (WebP)
├─ favicon.svg
├─ apple-touch-icon.png
└─ robots.txt
src/
├─ main.ts               Importa fuentes, estilos y scripts
├─ styles/               (se cargan en este orden)
│  ├─ tokens.css         Colores, espacios, radios, fuentes, sombras
│  ├─ base.css           Reset, foco, estilos de texto
│  ├─ layout.css         Secciones, header y footer
│  ├─ components.css     Componentes (equivalen a Componentes · v1 de Figma)
│  ├─ sections.css       Layout propio de cada sección
│  └─ behaviors.css      CSS que trabaja con los scripts
└─ scripts/
   ├─ show-after-hero.ts CTA del header y "volver arriba"
   ├─ scroll-spy.ts      Ancla activa en el menú
   ├─ menu.ts            Menú mobile (<dialog>)
   ├─ stacking.ts        Paneles apilados (medidas y foco)
   ├─ smooth-scroll.ts   Scroll suave a las anclas
   └─ page-position.ts   Utilidades compartidas
```

## Guía para adaptar la demo al sitio real

Todo lo de esta sección se cambia **sin tocar la lógica**.

### Textos

Todo el texto está en `index.html`, organizado por secciones con comentarios (`<!-- 03 · Proyectos -->`). Para cada sección:

- Cambiar el contenido **dentro** de las etiquetas, sin cambiar las etiquetas ni las clases.
- Mantener la jerarquía: un solo `<h1>` (hero), un `<h2>` por sección, `<h3>`/`<h4>` adentro.
- Revisar también el `<title>` y la `description` del `<head>`.

### Imágenes

1. Exportar en JPG 2x–3x y convertir a **WebP** (calidad ~75) con squoosh.app.
2. Ancho recomendado: hero y proyectos horizontales **1600**; proyectos verticales y retrato **1000**.
3. Guardar en `public/images/` con nombres en minúscula, sin espacios ni tildes.
4. En `index.html`, actualizar en cada `<img>`: `src`, `alt` (qué se ve en la foto), y `width` / `height` con las medidas reales del archivo.
5. Si las fotos son reales (no ilustrativas), quitar los `<figcaption class="media-label">Imagen ilustrativa</figcaption>` y el aviso del footer.
6. Si una imagen se recorta mal, ajustar el encuadre con `object-position` en `sections.css`.

### Proyectos y pasos

- **Proyectos:** la grilla está pensada para **4** (grande–chico / chico–grande). Para cambiar la cantidad, ajustar las reglas `nth-child` de `.project-grid` en `sections.css`.
- **Cómo trabajo:** cada paso es un `<li class="process-row">`. Para agregar o quitar "Recibís", sumar o borrar el `<p class="process-row__receive">`.

### Contacto

- Instagram: buscar `instagram.com/` y `ig.me/m/` en `index.html` (perfil y chat directo).
- Mail u otros canales: en el footer, dentro de `<address>`, un `<li>` por canal con la clase `contact-item`.

### Identidad visual (si ella ya tiene una)

- **Colores:** cambiar solo las **primitivas** de `tokens.css` (`--terracotta-500`, `--linen-50`…). Los roles (`--color-action-primary`…) se actualizan solos. Revisar contrastes después.
- **Tipografías:** instalar las nuevas con Fontsource, cambiar los imports de `main.ts` y los tokens `--font-display` / `--font-body`.
- **Favicon:** reemplazar `public/favicon.svg` y `public/apple-touch-icon.png` (PNG 180 × 180).

### Pasar a sitio oficial

1. Quitar `<meta name="robots" content="noindex, nofollow" />` de `index.html`.
2. En `public/robots.txt`, cambiar `Disallow: /` por `Allow: /`.
3. Quitar el aviso "Propuesta conceptual de sitio web" del footer.
4. Correr Lighthouse (Mobile y Desktop) y completar lo que sugiera para SEO.

## Antes de publicar cualquier cambio

- [ ] `npx tsc --noEmit` sin errores
- [ ] `npm run build` y `npm run preview` funcionan igual que `dev`
- [ ] Revisión en 1440, 1024, 768 y 390, y en un celular real
- [ ] Recorrido completo solo con teclado
- [ ] Lighthouse: Performance ≥ 90, Accessibility y Best Practices ≥ 95