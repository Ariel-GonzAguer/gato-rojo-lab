export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido' });
    return;
  }

  try {
    // Leer cuerpo raw para cubrir content-types como application/csp-report o application/reports+json
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8');

    let payload = null;
    try {
      payload = raw ? JSON.parse(raw) : req.body ?? null;
    } catch (e) {
      // Puede venir como texto plano
      payload = raw || req.body || null;
    }

    // Estándares posibles:
    // - application/csp-report => { "csp-report": { ... } }
    // - application/reports+json => { "type": "csp-violation", ... }
    const report = payload?.["csp-report"] ?? payload ?? null;

    console.log('CSP Report:', report);
  } catch (err) {
    console.error('Error procesando CSP report:', err);
  }

  res.status(204).end(); // No Content
}
