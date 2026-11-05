# Generador de oferta HVAC – Multifrío

Herramienta web (HTML + CSS + JavaScript, sin frameworks) para armar ofertas y generar el Word (español e inglés).

## Cómo usarla
Abra `index.html` en el navegador (doble clic). En VS Code puede usar la extensión "Live Server".
Necesita internet solo para SweetAlert2 (ventanas de validación); JSZip va incluido en `js/`.
Sin internet funciona igual, pero los avisos de "Falta información" salen como texto junto al botón.

## Estructura
```
GeneradorOferta
├── index.html              Estructura del formulario (HTML)
├── styles.css              Estilos (CSS)
├── js
│   ├── jszip.min.js        Librería para crear el .docx (v3.10.1)
│   ├── 01-catalogo.js      Catálogo: equipos, opciones, descripciones (ES/EN), vendedores
│   ├── 02-formulario.js    Estado, campos, validaciones, lista de ítems, eventos
│   ├── 03-plantillas.js    Plantillas Word (ES y EN) en base64
│   ├── 04-notas.js         Notas Sí/No de "Alcance y condiciones" (ES y EN)
│   ├── 05-word.js          Generación del .docx (reemplaza marcadores)
│   └── 06-inicio.js        Botón "Limpiar todo" y arranque
└── plantillas
    ├── Plantilla-ES.docx   Copia de referencia
    └── Plantilla-EN.docx   Copia de referencia
```

## Notas
- Los archivos JS no son módulos: comparten variables globales y deben cargarse en el orden numerado.
- La herramienta usa las plantillas en base64 de `03-plantillas.js`; los `.docx` de `plantillas/` son solo de referencia.
- Marcadores de la plantilla: `[[CLIENTE]]`, `[[EQ]]`, `[[VEN]]`, `[[PUE]]`, `[[TEL]]`, `[[N:Grúa]]`, `[[TN]]`, `[[VE_S]]`/`[[VE_E]]`, etc.
- Equipos: `cats` en `01-catalogo.js`. Vendedores: `VEND` en el mismo archivo.
- Datos guardados en el navegador (`localStorage`, clave `oferta_hvac_v1`).
