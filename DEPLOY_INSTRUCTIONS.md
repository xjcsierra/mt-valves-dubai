# 🚀 Deploy v18.4 + Imágenes Nuevas — Instrucciones

**Fecha:** 1 mayo 2026 (madrugada)
**Demo:** lunes 4 mayo (Christian/Salvador, MT España HQ)

---

## 📦 Lo que contiene este ZIP

Solo los archivos **modificados/nuevos**:

```
assets/
├── hero-home.jpg                    ← NUEVA imagen para hero home
├── styles.css                       ← MODIFICADO (.hero usa imagen local)
└── industries/
    ├── industry-oil-gas.jpg         ← REEMPLAZADA (era SVG, ahora foto)
    ├── industry-hvac.jpg            ← REEMPLAZADA
    ├── industry-plumbing.jpg        ← REEMPLAZADA
    ├── industry-drinking-water.jpg  ← REEMPLAZADA
    └── industry-industrial-process.jpg ← REEMPLAZADA
```

---

## 🔧 Cómo deployarlo

### Paso 1 — Descomprime el ZIP
```bash
unzip mt-valves-dubai-IMAGES-DEPLOY.zip
```

### Paso 2 — Copia los archivos sobre tu proyecto
Arrastra la carpeta `assets/` resultante **encima** de la `assets/` de tu proyecto en `/Users/juansierra/Desktop/mt-valves-dubai/`. macOS te preguntará si quieres reemplazar — **dile que sí**.

Esto reemplaza:
- ✅ `assets/styles.css` (con el cambio del .hero)
- ✅ Las 5 imágenes en `assets/industries/`
- ✅ Añade `assets/hero-home.jpg`

### Paso 3 — Verificación local rápida
Antes de pushear:

1. Abre `index.html` en navegador (doble click desde Finder)
2. Verifica que el hero muestra la nueva imagen del producto editorial con skyline
3. Abre `industries/oil-gas.html` en navegador
4. Repite con las otras 4 industries

**Si algo no se ve bien**, no pushees todavía y avísame.

### Paso 4 — Commit y push
GitHub Desktop debería detectar 7 archivos modificados:
- `assets/styles.css`
- `assets/hero-home.jpg` (nuevo)
- `assets/industries/industry-*.jpg` (5 archivos)

**Mensaje de commit sugerido:**
```
feat: replace SVG industry heroes + home hero with photographic Artiphoria editorial images

- Hero home: editorial product photograph (premium ball valve + ME industrial skyline)
- 5 Industry landings: cinematic 21:9 photographs replacing previous generative SVGs
- All images optimized to <310KB JPG q70-82 progressive
- Updated .hero CSS overlay (90deg diagonal gradient) for legibility on left-aligned text
```

→ Click "Commit to main" → "Push origin"

### Paso 5 — Verifica online (1-2 min después del push)
- https://xjcsierra.github.io/mt-valves-dubai/ → hero home
- https://xjcsierra.github.io/mt-valves-dubai/industries/oil-gas.html → industry hero
- (repetir con las otras 4 industries)

---

## 🎨 Cambios técnicos detallados

### `assets/styles.css` — solo cambia `.hero`

**ANTES** (Unsplash externa, overlay denso 78%-85% top-bottom):
```css
.hero {
  background: linear-gradient(rgba(15,47,92,0.78), rgba(10,31,61,0.85)),
              url('https://images.unsplash.com/photo-1504917595217...?w=1800&q=80')
              center / cover;
}
```

**DESPUÉS** (imagen local, overlay diagonal left→right más sutil):
```css
.hero {
  background: linear-gradient(90deg,
                rgba(10,31,61,0.78) 0%,    /* izquierda — donde va el texto */
                rgba(10,31,61,0.55) 45%,
                rgba(15,47,92,0.25) 100%   /* derecha — donde está la válvula visible */
              ),
              url('hero-home.jpg')
              center / cover;
}
```

**¿Por qué el overlay diagonal?** La nueva imagen tiene la válvula a la derecha y skyline + aire negativo a la izquierda. El gradient horizontal:
- Oscurece la izquierda (78%) → texto blanco "VALVES & FITTINGS" legible sobre el skyline
- Deja la derecha (25%) → la válvula brilla y se ve nítida

### `.page-hero` (páginas internas) — SIN CAMBIOS

Sigue usando la imagen de Unsplash con overlay denso 85-92%. Decisión consciente para no romper otras páginas (about, catalogue, contact, etc.). Si más adelante quieres cambiarla, podemos hacerlo en una segunda iteración.

---

## 📊 Imágenes nuevas — Specs

| Archivo | Resolución | Peso | Quality |
|---------|:----------:|:----:|:-------:|
| `hero-home.jpg` | 2400×1350 (16:9) | 285 KB | 82 |
| `industry-oil-gas.jpg` | 2400×1000 (21:9) | 291 KB | 70 |
| `industry-hvac.jpg` | 2400×1000 (21:9) | 294 KB | 70 |
| `industry-plumbing.jpg` | 2400×1000 (21:9) | 257 KB | 80 |
| `industry-drinking-water.jpg` | 2400×1000 (21:9) | 302 KB | 65 |
| `industry-industrial-process.jpg` | 2400×1000 (21:9) | 236 KB | 80 |

**Total peso:** 1.7 MB (las 6 imágenes)
**Cumple spec del proyecto** según `assets/industries/README.txt`: 21:9, JPG, ~300 KB cada una

---

## ⚠️ Si algo no se ve bien después del deploy

### Problema: el hero home se ve demasiado oscuro
→ El overlay puede estar excedido. Edita en `styles.css` el bloque `.hero` y reduce los valores alpha del gradient. Por ejemplo, cambia `0.78` por `0.65`.

### Problema: el texto del hero home no se lee bien sobre el skyline
→ Aumenta el primer valor del gradient. Cambia `0.78` por `0.85` o `0.90`.

### Problema: una industry no muestra la imagen
→ Verifica que el archivo JPG está en `assets/industries/` con el nombre exacto (en minúsculas, con guiones, no underscores).

### Problema: las páginas about/catalogue se ven raras
→ Solo cambié `.hero` (home), no `.page-hero` (páginas internas). Esas siguen usando Unsplash. No deberían haber cambiado.

---

## 🎯 Tareas pendientes para el demo del lunes

Las imágenes ya están — pero según handoff aún quedaba:

- [ ] **Verificar Knowledge Hub**: tiene 11 artículos en `/knowledge/` (5 nuevos + 6 anteriores). Comprueba que el index del hub los lista correctamente
- [ ] **Verificar datasheet PDF EN/AR**: el sistema existe (`assets/datasheet-generator.js` + fuente árabe + bundle imágenes). Comprueba en una PDP que el botón funciona
- [ ] **Comparador de productos**: existe `configurator.html` (208 KB). Comprueba que está enlazado correctamente desde el menú principal
- [ ] **Test final mobile**: las imágenes en hero pueden verse muy "pequeñas" en mobile (el background-image se centra). Si lo ves raro, podemos crear versiones móviles más cuadradas

Si alguno de estos puntos falla, avísame y lo resolvemos antes del lunes.

---

**¡Vamos a por ello, JC! 🚀**
