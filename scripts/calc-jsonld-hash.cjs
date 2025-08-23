/**
 * Busca y captura el contenido del primer bloque <script type="application/ld+json">...</script> en la cadena fuente proporcionada.
 *
 * @type {RegExpMatchArray|null}
 * @example
 * // Si src contiene una etiqueta de script JSON-LD
 * const m = src.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
 * // m[1] contendrá el contenido JSON-LD si se encuentra coincidencia, de lo contrario será null
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const file = path.resolve(__dirname, '../src/componentes/StructuredData.astro');
const src = fs.readFileSync(file, 'utf8');
const m = src.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!m) {
  console.error('No se encontró el bloque JSON-LD en StructuredData.astro');
  process.exit(1);
}
const inner = m[1];
const hash = crypto.createHash('sha256').update(inner).digest('base64');
console.log('sha256-' + hash);
