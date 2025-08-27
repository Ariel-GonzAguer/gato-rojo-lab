import { describe, it, expect } from 'vitest';
import { 
  sanitizeText, 
  isValidEmail, 
  isValidName, 
  isValidMessage,
  FIELD_LIMITS 
} from '../src/utils/security';

describe('Utilidades de Seguridad', () => {
  describe('sanitizeText', () => {
    it('debe remover scripts maliciosos', () => {
      const maliciousInput = '<script>alert("XSS")</script>Texto normal';
      const result = sanitizeText(maliciousInput);
      expect(result).toBe('Texto normal');
      expect(result).not.toContain('<script>');
    });

    it('debe remover iframes', () => {
      const maliciousInput = '<iframe src="http://evil.com"></iframe>Texto seguro';
      const result = sanitizeText(maliciousInput);
      expect(result).toBe('Texto seguro');
      expect(result).not.toContain('<iframe>');
    });

    it('debe remover enlaces javascript:', () => {
      const maliciousInput = 'javascript:alert("XSS") Texto normal';
      const result = sanitizeText(maliciousInput);
      expect(result).toBe('alert("XSS") Texto normal');
      expect(result).not.toContain('javascript:');
    });

    it('debe remover event handlers', () => {
      const maliciousInput = 'onclick=alert("XSS") Texto normal';
      const result = sanitizeText(maliciousInput);
      expect(result).toBe('alert("XSS") Texto normal');
      expect(result).not.toContain('onclick=');
    });

    it('debe limitar la longitud del texto', () => {
      const longText = 'a'.repeat(FIELD_LIMITS.MESSAGE_MAX_LENGTH + 100);
      const result = sanitizeText(longText);
      expect(result.length).toBe(FIELD_LIMITS.MESSAGE_MAX_LENGTH);
    });

    it('debe manejar inputs vacíos o inválidos', () => {
      expect(sanitizeText('')).toBe('');
      expect(sanitizeText(null as any)).toBe('');
      expect(sanitizeText(undefined as any)).toBe('');
      expect(sanitizeText(123 as any)).toBe('');
    });
  });

  describe('isValidEmail', () => {
    it('debe validar emails correctos', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.org')).toBe(true);
      expect(isValidEmail('test+tag@example.co.uk')).toBe(true);
    });

    it('debe rechazar emails inválidos', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
      expect(isValidEmail('user..name@domain.com')).toBe(false);
    });

    it('debe rechazar emails demasiado largos', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(isValidEmail(longEmail)).toBe(false);
    });

    it('debe manejar inputs inválidos', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail(null as any)).toBe(false);
      expect(isValidEmail(undefined as any)).toBe(false);
    });
  });

  describe('isValidName', () => {
    it('debe validar nombres correctos', () => {
      expect(isValidName('Juan Pérez')).toBe(true);
      expect(isValidName('María José')).toBe(true);
      expect(isValidName("O'Connor")).toBe(true);
      expect(isValidName('Jean-Claude')).toBe(true);
    });

    it('debe rechazar nombres inválidos', () => {
      expect(isValidName('a')).toBe(false); // Muy corto
      expect(isValidName('Juan123')).toBe(false); // Contiene números
      expect(isValidName('Juan@Pérez')).toBe(false); // Caracteres especiales inválidos
      expect(isValidName('<script>alert</script>')).toBe(false); // Scripts
    });

    it('debe rechazar nombres demasiado largos', () => {
      const longName = 'a'.repeat(FIELD_LIMITS.NAME_MAX_LENGTH + 1);
      expect(isValidName(longName)).toBe(false);
    });

    it('debe manejar inputs inválidos', () => {
      expect(isValidName('')).toBe(false);
      expect(isValidName(null as any)).toBe(false);
      expect(isValidName(undefined as any)).toBe(false);
    });
  });

  describe('isValidMessage', () => {
    it('debe validar mensajes correctos', () => {
      expect(isValidMessage('Este es un mensaje de prueba válido')).toBe(true);
      expect(isValidMessage('Mensaje corto pero válido')).toBe(true);
    });

    it('debe rechazar mensajes demasiado cortos', () => {
      expect(isValidMessage('Corto')).toBe(false);
      expect(isValidMessage('123456789')).toBe(false); // 9 caracteres
    });

    it('debe rechazar mensajes demasiado largos', () => {
      const longMessage = 'a'.repeat(FIELD_LIMITS.MESSAGE_MAX_LENGTH + 1);
      expect(isValidMessage(longMessage)).toBe(false);
    });

    it('debe manejar inputs inválidos', () => {
      expect(isValidMessage('')).toBe(false);
      expect(isValidMessage('   ')).toBe(false); // Solo espacios
      expect(isValidMessage(null as any)).toBe(false);
      expect(isValidMessage(undefined as any)).toBe(false);
    });
  });

  describe('FIELD_LIMITS', () => {
    it('debe tener límites razonables', () => {
      expect(FIELD_LIMITS.NAME_MAX_LENGTH).toBe(100);
      expect(FIELD_LIMITS.EMAIL_MAX_LENGTH).toBe(254);
      expect(FIELD_LIMITS.MESSAGE_MAX_LENGTH).toBe(2000);
    });
  });
});