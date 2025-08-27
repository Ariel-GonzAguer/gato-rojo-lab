# Documentación de Seguridad

Este documento describe las medidas de seguridad implementadas en el proyecto Gato Rojo Lab para proteger contra vulnerabilidades comunes.

## 🔒 Medidas de Seguridad Implementadas

### 1. Protección del Formulario de Contacto

#### Validación y Sanitización
- **Sanitización de inputs**: Remoción automática de scripts, iframes y event handlers maliciosos
- **Validación de email**: Verificación de formato válido y límite de caracteres (254 max)
- **Validación de nombre**: Solo letras, espacios y caracteres especiales básicos (2-100 caracteres)
- **Validación de mensaje**: Longitud mínima 10 caracteres, máxima 2000 caracteres

#### Rate Limiting
- Límite de 5 minutos entre envíos de formularios por usuario
- Implementado del lado del cliente como medida básica anti-spam

#### Configuración Segura de EmailJS
- Variables de entorno para configuración sensible
- Fallback a valores por defecto si las variables no están disponibles
- Archivo `.env.example` para guiar la configuración

### 2. Headers de Seguridad HTTP

Configurados en `vercel.json`:

```json
{
  "Content-Security-Policy": "...",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "..."
}
```

#### Content Security Policy (CSP)
- `default-src 'self'`: Solo contenido del mismo origen por defecto
- `script-src`: Scripts permitidos solo del dominio y CDNs confiables
- `connect-src`: Conexiones limitadas a APIs necesarias (EmailJS, Analytics)
- `frame-src 'none'`: Sin iframes para prevenir clickjacking
- `object-src 'none'`: Sin objetos Flash/Java

#### Otros Headers
- `X-Frame-Options: DENY`: Previene clickjacking
- `X-Content-Type-Options: nosniff`: Previene MIME sniffing
- `Referrer-Policy`: Control de información del referrer
- `Permissions-Policy`: Deniega acceso a APIs sensibles del navegador

### 3. Configuración de Dominios de Imágenes

- Removido `localhost` de dominios permitidos en producción
- Solo `gatorojolab.com` permitido para imágenes externas

### 4. Protecciones Contra XSS

#### Sanitización de Texto
```typescript
export function sanitizeText(text: string): string {
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}
```

#### Validación de Inputs HTML
- Atributos `maxLength` en campos del formulario
- Patrones de validación con `pattern`
- Validación tanto del lado cliente como servidor

## 🧪 Testing de Seguridad

### Tests Automatizados
Archivo: `tests/security.test.ts`

- **Sanitización**: Verifica remoción de scripts, iframes, y event handlers
- **Validación**: Comprueba formatos válidos e inválidos para todos los campos
- **Límites**: Asegura que los límites de caracteres funcionen correctamente

### Ejecución de Tests
```bash
npm test
```

## ⚠️ Limitaciones y Consideraciones

### Limitaciones del Rate Limiting
- Implementado del lado cliente (localStorage)
- No es una protección real contra ataques automatizados
- Para protección completa se necesitaría rate limiting del servidor

### Variables de Entorno
- Configurar `.env` con valores reales:
```env
EMAILJS_SERVICE_ID=tu_service_id_real
EMAILJS_TEMPLATE_ID=tu_template_id_real
EMAILJS_PUBLIC_KEY=tu_public_key_real
```

### CSP y EmailJS
- EmailJS requiere `'unsafe-inline'` para scripts
- Esto es una limitación conocida del servicio
- Se mantiene solo para dominios específicos necesarios

## 🔄 Mejoras Futuras Recomendadas

1. **Rate Limiting del Servidor**: Implementar en el backend o edge functions
2. **CAPTCHA**: Agregar Google reCAPTCHA o similar
3. **Logging de Seguridad**: Monitoreo de intentos maliciosos
4. **Validación del Servidor**: Verificación adicional en el backend
5. **Honeypot Fields**: Campos ocultos para detectar bots

## 📋 Checklist de Verificación

- [x] Sanitización de inputs implementada
- [x] Validación de formatos implementada  
- [x] Rate limiting básico implementado
- [x] Headers de seguridad configurados
- [x] CSP configurado apropiadamente
- [x] Variables de entorno para configuración sensible
- [x] Tests de seguridad automatizados
- [x] Documentación de seguridad completa

## 🛡️ Cumplimiento con Mejores Prácticas

Este proyecto ahora cumple con:
- **OWASP Top 10**: Protecciones contra XSS, Injection, y configuraciones inseguras
- **CSP Level 2**: Content Security Policy implementado
- **RFC 7034**: X-Frame-Options configurado
- **RFC 7233**: X-Content-Type-Options configurado