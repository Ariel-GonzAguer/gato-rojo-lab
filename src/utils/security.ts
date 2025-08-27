/**
 * Utilidades de seguridad para validación y sanitización
 */

// Límites de caracteres para campos del formulario
export const FIELD_LIMITS = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254, // RFC 5321 límite estándar
  MESSAGE_MAX_LENGTH: 2000,
};

/**
 * Sanitiza texto básico removiendo scripts y caracteres peligrosos
 */
export function sanitizeText(text: string): string {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover scripts
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remover iframes
    .replace(/javascript:/gi, '') // Remover javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remover event handlers (onclick, onload, etc.)
    .slice(0, FIELD_LIMITS.MESSAGE_MAX_LENGTH); // Limitar longitud
}

/**
 * Valida formato de email básico
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  // Verificar que no tenga puntos consecutivos
  if (email.includes('..')) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= FIELD_LIMITS.EMAIL_MAX_LENGTH;
}

/**
 * Valida nombre (solo letras, espacios y algunos caracteres especiales básicos)
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== 'string') return false;
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-.']+$/;
  return nameRegex.test(name) && 
         name.length >= 2 && 
         name.length <= FIELD_LIMITS.NAME_MAX_LENGTH;
}

/**
 * Valida longitud del mensaje
 */
export function isValidMessage(message: string): boolean {
  if (!message || typeof message !== 'string') return false;
  
  return message.trim().length >= 10 && 
         message.length <= FIELD_LIMITS.MESSAGE_MAX_LENGTH;
}

/**
 * Rate limiting simple basado en localStorage (lado cliente)
 * No es seguridad real pero ayuda contra spam básico
 */
export function checkRateLimit(): boolean {
  const RATE_LIMIT_KEY = 'last_email_sent';
  const RATE_LIMIT_MINUTES = 5; // 5 minutos entre envíos
  
  try {
    const lastSent = localStorage.getItem(RATE_LIMIT_KEY);
    if (lastSent) {
      const timeDiff = Date.now() - parseInt(lastSent);
      const minutesPassed = timeDiff / (1000 * 60);
      
      if (minutesPassed < RATE_LIMIT_MINUTES) {
        return false; // Aún en período de espera
      }
    }
    
    localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
    return true;
  } catch (error) {
    // Si localStorage no está disponible, permitir el envío
    return true;
  }
}