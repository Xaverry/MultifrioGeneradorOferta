# Generador de oferta HVAC – Multifrío

Herramienta web (HTML + CSS + JavaScript, sin frameworks) para armar ofertas y generar el Word.

## Cómo usarla
Abra `index.html` en el navegador (doble clic). No necesita instalar nada ni internet.
En VS Code puede usar la extensión "Live Server" si prefiere servirlo localmente.

## Estructura
```
GeneradorOferta
├── index.html              Estructura del formulario (HTML)
├── styles.css              Estilos (CSS)
├── js
│   ├── jszip.min.js        Librería externa para crear el .docx (v3.10.1)
│   ├── 01-catalogo.js      Catálogo: equipos, opciones, textos de descripción (ES/EN)
│   ├── 02-formulario.js    Estado, dibujo de campos, validaciones, lista de ítems, eventos
│   ├── 03-plantillas.js    Plantillas Word (ES y EN) incrustadas en base64
│   ├── 04-notas.js         Notas Sí/No de "Alcance y condiciones" (ES y EN)
│   ├── 05-word.js          Generación del .docx (reemplaza marcadores en la plantilla)
│   └── 06-inicio.js        Botón "Limpiar todo" y arranque de la página
└── plantillas
    ├── Plantilla-ES.docx   Copia de referencia de la plantilla en español
    └── Plantilla-EN.docx   Copia de referencia de la plantilla en inglés
```

## Notas para entender el código
- Los archivos JS NO son módulos: se cargan en el orden numerado y comparten variables globales.
  Por eso el orden de las etiquetas `<script>` en `index.html` importa.
- `plantillas/*.docx` son solo de referencia. La herramienta usa las copias en base64 de
  `js/03-plantillas.js` (así funciona abriendo el archivo directamente, sin servidor).
  Si edita un .docx, hay que volver a convertirlo a base64 y pegarlo en ese archivo.
- La plantilla usa marcadores como `[[CLIENTE]]`, `[[EQ]]`, `[[N:Grúa]]`, `[[TN]]`, `[[VE_S]]`/`[[VE_E]]`
  que `05-word.js` reemplaza al generar.
- Para agregar o cambiar equipos: `cats` en `01-catalogo.js`. Cada categoría define
  `fields` (campos), `base`/`items` (opciones) y cómo se arma la descripción (`lead`, `rest`, `gen`).
- Los datos se guardan en el navegador (`localStorage`, clave `oferta_hvac_v1`).
- Las descripciones en inglés usan la variable global `EN` (se activa solo al generar la oferta en inglés).
