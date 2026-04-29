# MT v14.5 FINAL — Cambios aplicados

Última actualización: 29 abril 2026 — tras rediseño Fergo-style

## Resumen ejecutivo

Esta versión completa la transformación visual de la web MT Valves UAE
hacia un patrón B2B profesional, inspirado en Fergo.shop. Los cambios
clave de esta iteración:

  - 224 fichas de producto rediseñadas con layout 3 columnas
    (gallery + info + side panel sticky)
  - Listing extendido con header "X items · Sort by"
  - Selector de idioma EN | AR más prominente
  - 8 páginas faltantes recuperadas y actualizadas con datos JLT
  - Banner DRAFT en las 15 páginas AR (señal pre-publicación)


## Cambios aplicados en esta sesión

### 1. Rediseño completo de las 224 fichas product/*.html

Reemplazado el layout antiguo (foto cuadrada 50/50 + info) por un layout
3 columnas tipo Fergo:

  - **Columna izquierda**: thumbs verticales + foto grande con badge
    "Made in Spain" (bandera) y flechas de navegación
  - **Columna centro**: título / Product Number con botón Copy / price
    block con AED + EUR + VAT / Delivery time + Available en grid 2 cols
    con dot verde / qty stepper + datasheet btn / botón azul MT
    "Add to shopping cart" / botón outline "Add to Offer" / botones
    secundarios (Specs, Datasheet)
  - **Columna derecha (sticky)**: panel "Contact" con teléfono/email/
    WhatsApp + Payment Methods (Card, Invoice B2B, Tabby teal, Tamara
    naranja) + Shipping Methods (DHL Express amarillo, UAE Same-day,
    Dubai Pickup)

Las secciones inferiores (`About this product`, `Quality & Compliance`,
`Delivery & Logistics`, `Related Products`) se mantienen intactas.

CSS añadido al final de `assets/styles.css` (clase `.fergo-pdp` y
descendientes, ~280 líneas).

### 2. Listing tipo Fergo con header de resultados

Añadido en `MT_Listing_Extended.html`:

  - Header "19 items of 19 · Sort by ▾" con dropdown de ordenación
    (Availability, Price asc/desc, Nominal width, Newest)
  - Las 19 cards horizontales (foto izq + specs medio + panel acción
    der) ya estaban implementadas — solo se ha añadido el header arriba

### 3. Selector EN | AR más grande

Aumentado el tamaño de las letras del selector de idioma en el topbar:

  - Font-size: 0.78rem → 0.95rem
  - Font-weight: 600 → 700
  - Letter-spacing: 0.1em → 0.12em

Aplicado a las dos clases (`.topbar-right` y `.mts-topbar-right`).

### 4. Datos contacto JLT en TODAS las páginas (279 archivos)

Aplicado fix masivo:
  - `+971 50 000 0000` → `+971 4 453 4693`
  - `tel:+971500000000` → `tel:+97144534693`
  - `wa.me/971500000000` → `wa.me/971586125781`
  - `dubai@mt-valves.ae` → `sales@mtmiddleeast.com`
  - `Dubai Industrial City` → `Jumeirah Lakes Towers` (incluido SVG mapa)

### 5. Páginas faltantes recuperadas (8)

Recuperadas desde la web pública anterior con todas las correcciones:

  - `catalogue.html`, `about.html`, `contact.html`, `news.html`
  - `resources.html`, `projects.html`, `glossary.html`, `where-to-buy.html`

Y sus 8 versiones AR correspondientes en `/ar/`.

### 6. Stubs de redirect

  - `MT_Home.html`    → redirige a `index.html`
  - `MT_Listing.html` → redirige a `MT_Listing_Extended.html`

### 7. Favicon MT en todas las páginas (275 archivos)

Set MT extraído del logo oficial:
  - `assets/favicon.svg` (vectorial)
  - `assets/favicon.ico` (multi-resolución)
  - `assets/apple-touch-icon.png` (180×180)
  - `assets/icon-512.png` (PWA)

### 8. Selector EN | AR en topbar de TODAS las páginas

Reemplazado `EN | ES` por `EN | AR` en todas las páginas (incluidas
las 224 fichas de producto). Los `href` apuntan a la versión equivalente.

### 9. Carpeta `/ar/` con 17 archivos en árabe

  - 15 páginas traducidas
  - 2 stubs de redirect

Cada página AR con:
  - `<html lang="ar" dir="rtl">`
  - Fuente Cairo (Google Fonts)
  - `assets/rtl.css` enlazado
  - Banner amarillo "DRAFT — pendiente revisión nativa"
  - Selector EN | AR con AR active
  - Cadenas traducidas al MSA (Modern Standard Arabic)
  - Datos LTR forzados (códigos, precios, teléfono, email)

### 10. `assets/rtl.css` (8.2 KB) y hreflang

Hoja de estilos RTL completa + alternates `hreflang` en las 30 páginas
bilingües para SEO.


## Resultados de la auditoría final (TODO ✓)

  - 0 links rotos en las 30 páginas bilingües
  - 0 errores de consola JavaScript
  - Cart funcional en EN y AR
  - Selector EN ↔ AR navega correctamente
  - Banner DRAFT solo en páginas AR (15), 0 en EN
  - 256 URLs en sitemap
  - Hreflang completo en 30 páginas
  - Datos contacto correctos en 279 archivos HTML
  - 224 fichas de producto migradas al template Fergo


## Lo que queda para v14.6

  - Revisión nativa AR (luego quitar banner DRAFT amarillo)
  - Traducir descripciones técnicas de 224 productos al AR
  - Refactor `assets/styles.css` (151KB → modular)
  - Inyectar 232 SKUs reales del Excel (precios, stock, imágenes)
  - Compliance & certifications cards en cada ficha
  - Galería con imágenes reales (vista lateral, sección, detalle)


## Flujo de despliegue

1. Descomprimir ZIP en una carpeta separada (NO encima de tu repo)
2. Servidor local: `python3 -m http.server 8080`
3. Verificar visualmente las páginas clave
4. Si OK → copiar al repo real → commit → push
5. La web pública se actualiza en GitHub Pages en ~2 min


## Fixes adicionales (auditoría pre-push)

### 11. Selector EN|ES residual en catalogue/ + news/ (15 páginas)

Las 8 categorías de `catalogue/` y las 7 noticias en `news/` aún tenían
`EN | ES` en el topbar. Reemplazado por `EN | AR` con href apuntando a
`../ar/index.html` (paliativo hasta v14.6 cuando tengan versión AR).

### 12. Carácter de control \x01 corrupto en 12 páginas

Detectado un caracter binario \x01 en lugar del nombre de clase
`topbar-right` en 12 páginas (las 6 raíz EN: index, MT_*, certifications
+ las 6 raíz AR equivalentes). Esto se introdujo accidentalmente durante
la migración bilingüe y rompía el styling del selector de idioma en el
home y demás páginas. Reemplazado `<div class="\x01">` por
`<div class="topbar-right">`. Con esto el selector EN | AR ahora se ve
correctamente grande (15.2px computed) en todas las páginas.

## Resultado final de la auditoría (TODO ✓)

  - 0 links rotos en 279 páginas HTML
  - 0 datos de contacto viejos en cualquier página
  - 0 selectores con ES residual
  - 0 caracteres corruptos \x01
  - 224/224 fichas migradas al template Fergo
  - 256 URLs en sitemap, todas apuntando a archivos existentes
  - Banner DRAFT: 15 AR / 0 EN (correcto)
  - Selector EN | AR consistente y grande en todas las páginas
  - Tests funcionales OK (cart qty, PDP qty, copy SKU, etc.)


## Fergo-inspired enhancements (sesión adicional)

### 13. Botones "3D Model" + "Data sheet" prominentes en las 224 fichas

Reemplazado los 2 botones aux pequeños (Specs / Datasheet) por dos
botones grandes con el styling Fergo:

  - "3D Model" con icono cuadrado azul gradient
  - "Data sheet" con icono de documento

CSS: padding aumentado a 14px, font-weight 600, border 1.5px,
hover state con border azul MT y fondo blanco.

### 14. KPIs UAE-específicos en el home

Reemplazados los 4 KPIs genéricos (€80M / 30y / 48h / 1994) por unos
con foco UAE que cuentan una historia de stock + velocidad +
credenciales + respaldo:

  - 2,500+ References in Dubai stock
  - 48h UAE express dispatch
  - 12 European certifications
  - €80M Group stock backing

Aplicado en EN e index AR (con traducciones árabes y dir="ltr"
forzado en las cifras).

### 15. Bloques técnicos Fergo-style en las 8 categorías catalogue/

Inyectado un bloque `<section class="cat-tech-intro">` antes de los
filtros de cada categoría con:

  - Título técnico específico ("Engineered for water, gas and demanding
    industrial service" para ball valves, etc.)
  - 3 párrafos con jerga industrial real: PN-25/PN-30, ISO 228,
    ISO 7-1/EN 10226-1, ATEX, DN8 to DN150, EN 558-1 series 20
    (API 609), GGG40, 1.4408 (AISI 316), CW617N, PTFE+15% GF, FKM/Viton,
    DVGW W375, EN 14901, EN 1456, ISO 5211, etc.
  - 4 cards de features por categoría: Body materials, Seal options,
    Connections, Certifications

Las 8 categorías tienen contenido único:

  - ball-valves: brass + stainless steel, PN-25/PN-30
  - butterfly-valves: wafer/lug GGG40, EN 558-1, ISO 5211
  - check-valves: spring/swing/dual-plate
  - gate-valves: resilient EPDM, DVGW W375, FM Approved
  - angle-valves: ceramic disc, WRAS, ACS
  - strainers: Y-pattern, screen mesh 0.4-1.5mm
  - bibcocks: chrome plated CW617N, EN 200
  - expansion-joints: EN 13480, DIN 4809

CSS: nuevo bloque .cat-tech-intro con grid 1.4fr/1fr, pills monospace
para términos técnicos, cards de features con label uppercase + values
en pills.

Impacto SEO: cada categoría ahora tiene 200+ palabras de contenido
técnico denso con keywords relevantes para B2B (UAE specifiers buscan
exactamente estos términos: DVGW, ATEX, PED, ISO 5211, etc.).


## Traducción exhaustiva al árabe (sesión final)

### 16. KPI ajustado: 48h → 24/48h

Refleja con más precisión la realidad logística:
  - 24h dentro de Dubai
  - 48h al resto de los Emiratos
Aplicado en EN y AR.

### 17. Traducción masiva del home AR

Aplicadas más de 80 traducciones al árabe en `ar/index.html` cubriendo:
  - Topbar (Jumeirah Lakes Towers → أبراج بحيرات جميرا)
  - Banner Grand Opening → الافتتاح الكبير
  - Hero h1 (VALVES & FITTINGS → صمامات وتجهيزات)
  - Search placeholder (SEARCH → بحث)
  - 6 slides Best Sellers (eyebrows, h2 títulos, descripciones, specs, labels)
  - Sección Catalogue completa
  - 8 cards de categorías con descripciones técnicas
  - Sectores (Marine & Naval, Industrial Process, etc.)
  - Sección Why MT (4 cards completas)
  - Where to buy (3 canales de venta)
  - Certifications section
  - News section (3 noticias)
  - Newsletter
  - Footer completo
  - Cookie banner
  - Tags numéricos (X References → X مرجع)

### 18. Traducción de las 14 páginas AR adicionales

Aplicadas 360+ traducciones distribuidas en:
  - MT_Cart_Quote.html (formulario, sub-nav, footer)
  - MT_Catalogue.html (descripciones de productos)
  - MT_Listing_Extended.html (filtros, sort, specs)
  - MT_PDP_Mockup.html (specs técnicos, payment/shipping methods)
  - about.html (Our Approach, Our Numbers Today)
  - catalogue.html (Browse by Family, Online Catalogue)
  - certifications.html (países, descripciones)
  - contact.html (FAQ, payment methods)
  - glossary.html (términos técnicos, descripciones)
  - knowledge.html (categorías de noticias)
  - news.html (titulares, newsletter)
  - projects.html (Trade Show, Coming soon, etc.)
  - resources.html (descripciones de archivos)
  - where-to-buy.html (3 canales completos)

Se mantienen en inglés intencionalmente:
  - Marca "MT Valves & Fittings"
  - Email sales@mtmiddleeast.com (estándar internacional)
  - Códigos técnicos (DN15, PN-25, F-F, BSP, EPDM, ISO 9001, etc.)
  - Nombres de certificaciones (DVGW, WRAS, ACS, WaterMark, SINTEF, etc.)
  - HVAC, B2B, BIM, CAD (términos estándar usados también en árabe técnico)
  - Nombres de productos (referencias técnicas tipo "F-F Long Neck Ball Valve PN-30")
  - Monedas (AED, €)
