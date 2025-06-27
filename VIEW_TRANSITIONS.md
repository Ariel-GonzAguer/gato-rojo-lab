# View Transitions - Solo Nativas

Este proyecto usa **View Transitions nativas** del navegador para transiciones suaves entre páginas.

## ✅ Estado Actual: IMPLEMENTADO CON SOLO NATIVAS

El sistema está **completamente implementado** usando únicamente:

- **View Transitions nativas** del navegador (Chrome/Edge 111+, Firefox 129+)
- **Detección automática** del soporte nativo con logging
- **Graceful degradation** para navegadores sin soporte (navegación normal)
- **Accesibilidad preservada** con el route announcer oculto

### ¿Cómo funciona?

1. **Navegadores con soporte nativo (Chrome 111+, Edge 111+, Firefox 129+)**:
   - View Transitions nativas se activan automáticamente con `@view-transition { navigation: auto; }`
   - Hardware accelerated, performance óptima
2. **Navegadores sin soporte (Safari, versiones antiguas)**:
   - Navegación normal del navegador sin transiciones
   - No hay JavaScript adicional ni fallbacks
3. **JavaScript de detección**:
   - Solo para logging/debugging, no interfiere con las transiciones

### Beneficios de este enfoque:

- **Performance máxima**: Hardware acceleration cuando está disponible
- **Simplicidad**: Una sola implementación, sin fallbacks complejos
- **Peso mínimo**: Solo CSS nativo, sin JavaScript de transiciones
- **Futuro-proof**: Más navegadores adoptarán el estándar nativo

## Implementación técnica actual

### 1. BaseLayout.astro - Configuración principal:

```astro
<!-- View Transitions nativas -->
<meta name="view-transition" content="same-origin" />

<!-- Detección y debugging (solo logging) -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    if ('startViewTransition' in document) {
      console.log('✅ View Transitions nativas activas');
    } else {
      console.log('⚠️ View Transitions nativas no soportadas en este navegador');
    }
  });
</script>
```

### 2. CSS (src/styles/view-transition.css):

```css
/* View Transitions nativas únicamente */
@view-transition {
  navigation: auto; /* Activación automática */
}

/* Animación fade suave (0.9s) */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.9s;
  animation-timing-function: ease-in-out;
}

/* Ocultar visualmente el route announcer */
.astro-route-announcer {
  position: absolute !important;
  left: -10000px !important;
  /* ...más reglas de ocultación visual */
}
```

## Cómo verificar que funciona

### Verificación en consola del navegador:

1. **Abrir DevTools**
2. **Ir a la pestaña Console**
3. **Navegar entre páginas** y verificar mensajes:
   - **Con soporte**: `✅ View Transitions nativas activas`
   - **Sin soporte**: `⚠️ View Transitions nativas no soportadas en este navegador`

### Verificación manual del soporte:

```javascript
// Pegar en console para verificar soporte
console.log("startViewTransition" in document);
// true = nativas disponibles, false = navegación normal
```

### Verificación visual:

- **Con soporte**: Transiciones suaves y fluidas (hardware accelerated)
- **Sin soporte**: Navegación normal inmediata del navegador

### CSS automático aplicado:

Todos los elementos con nombres de transición usan automáticamente la misma animación:

```css
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: 0.9s;
  animation-timing-function: ease-in-out;
}
```

### Personalización (si necesaria):

Para cambiar la duración de un elemento específico:

```css
::view-transition-old(mi-elemento),
::view-transition-new(mi-elemento) {
  animation-duration: 0.4s; /* Duración personalizada */
}
```

## Deshabilitar transiciones

### En un enlace específico:

```html
<a href="/pagina" data-no-transition>Sin transición</a>
```

### Para usuarios con preferencias de movimiento reducido:

Las transiciones se deshabilitan automáticamente con:

```css
@media (prefers-reduced-motion: no-preference) {
  /* Transiciones solo activas si el usuario no prefiere movimiento reducido */
}
```

## Compatibilidad y soporte

- ✅ **Chrome 111+**: View Transitions nativas (óptimo)
- ✅ **Edge 111+**: View Transitions nativas (óptimo)
- ⚠️ **Firefox 129+**: Navegación normal (sin transiciones)
- ⚠️ **Safari**: Navegación normal (sin transiciones)
- ⚠️ **Navegadores antiguos**: Navegación normal (sin transiciones)
