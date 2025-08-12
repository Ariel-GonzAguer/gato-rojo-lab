export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  // El reporte CSP puede venir en req.body o como texto plano
  let report = req.body;
  if (typeof report === 'string') {
    try {
      report = JSON.parse(report);
    } catch (e) {
      // Si no es JSON válido, lo dejamos como string
    }
  }

  // Imprime el reporte en consola (puedes guardar en archivo si lo prefieres)
  console.log('CSP Report:', report);

  // Opcional: guardar en archivo (solo en desarrollo/local)
  // const fs = require('fs');
  // fs.appendFileSync('csp-reports.log', JSON.stringify(report) + '\n');

  res.status(204).end(); // Sin contenido
}
