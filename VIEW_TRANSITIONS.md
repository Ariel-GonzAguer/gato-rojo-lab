# Guía Completa: View Transitions API Nativa

Una **guía paso a paso** para implementar View Transitions nativas del navegador, basada en un proyecto real de Astro.

## 📖 Qué aprenderás

- ✅ Implementar View Transitions nativas desde cero
- ✅ Configurar animaciones personalizadas
- ✅ Crear transiciones para elementos específicos
- ✅ Manejar la compatibilidad de navegadores
- ✅ Debugging y testing efectivo
- ✅ Mejores prácticas y optimización

## 🚀 Paso 1: Configuración básica

### 1.1 Meta tag requerido

Primero, agrega el meta tag en el `<head>` de tu HTML:

```html
<!-- BaseLayout.astro o tu layout principal -->
<meta name="view-transition" content="same-origin" />
```

**¿Por qué es necesario?** Este meta tag le dice al navegador que habilite View Transitions para navegación same-origin.

### 1.2 Crear el archivo CSS

Crea `src/styles/view-transition.css`:

```css
/* Activación automática de View Transitions nativas */
@view-transition {
  navigation: auto;
}
```

### 1.3 Importar en tu layout

```astro
---
// BaseLayout.astro
import "../styles/view-transition.css";
---
```

🎉 **Felicidades!** Ya tienes View Transitions básicas funcionando en navegadores compatibles. PERO... hace falta un poco más para que se vea bien

## 🎨 Paso 2: Añadir animaciones personalizadas

### 2.1 Configurar fade global

Agrega estas reglas a tu CSS para una transición fade suave:

```css
/* view-transition.css */
@media (prefers-reduced-motion: no-preference) {
  /* Transición para toda la página */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  ::view-transition-old(root) {
    animation-name: fade-out;
  }

  ::view-transition-new(root) {
    animation-name: fade-in;
  }

  /* Keyframes personalizados */
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
```

**Puntos clave:**

- `@media (prefers-reduced-motion: no-preference)` respeta las preferencias de accesibilidad
- `::view-transition-old/new(root)` afecta toda la página
- `animation-timing-function: ease-in-out` crea transiciones naturales, suaves

### 2.2 Configurar transiciones para elementos específicos

```css
/* Fade para cualquier elemento con view-transition-name */
::view-transition-old(*),
::view-transition-new(*) {
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
}
```

## 🎯 Paso 3: Transiciones de elementos específicos

### 3.1 Asignar nombres únicos

En tu HTML/JSX, asigna `view-transition-name` a elementos que quieres animar individualmente:

```astro
<!-- Header.astro -->
<header style="view-transition-name: header;">
  <nav>
    <!-- contenido del header -->
  </nav>
</header>
```

```tsx
// ProyectoCard.tsx
<li style={{ viewTransitionName: `card-${name.replace(/\s+/g, '-').toLowerCase()}` }}>
  <h3>{name}</h3>
  <!-- contenido de la card -->
</li>
```

**⚠️ Importante:** Cada `view-transition-name` debe ser único en la página.

### 3.2 Animaciones específicas por elemento

```css
/* Animación específica para el header */
::view-transition-old(header),
::view-transition-new(header) {
  animation-duration: 0.6s; /* Más rápido que el fade global */
}

/* Animación para cards de proyectos */
::view-transition-old(card-*),
::view-transition-new(card-*) {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🔧 Paso 4: Debugging y detección

### 4.1 Script de detección de soporte

Agrega este script en tu `<head>` para verificar el soporte:

```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    if ("startViewTransition" in document) {
      console.log("✅ View Transitions nativas activas");
    } else {
      console.log(
        "⚠️ View Transitions nativas no soportadas en este navegador"
      );
    }
  });
</script>
```

### 4.2 Verificación manual

Abre la consola del navegador y ejecuta:

```javascript
// Verificar soporte nativo
console.log("startViewTransition" in document);
// true = soporte disponible, false = no disponible

// Ver el estado actual
console.log(document.documentElement.style.viewTransitionName);
```

### 4.3 Chrome DevTools para debugging

1. **Abre DevTools**
2. **Haz click en los 3 puntos que aparecen al lado de ⚙️**
3. **Ahí busca "Animations"**
   

## 🚫 Paso 5: Deshabilitar transiciones (opcional)

### 5.1 Para enlaces específicos

```html
<a href="/pagina" data-no-transition>Sin transición</a>
```

### 5.2 Para usuarios con preferencias de movimiento reducido

Tus transiciones ya están envueltas en `@media (prefers-reduced-motion: no-preference)`, así que se deshabilitan automáticamente.

## ⚠️ Paso 6: Consideraciones importantes

### 6.1 Ocultar elementos de accesibilidad

Si usas Astro, es posible que veas un "footer" extraño. Ocúltalo visualmente:

```css
/* Ocultar el route announcer de Astro */
.astro-route-announcer {
  position: absolute !important;
  left: -10000px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  white-space: nowrap !important;
}
```

### 6.2 Compatibilidad de navegadores

- ✅ **Chrome 111+**: Soporte completo
- ✅ **Edge 111+**: Soporte completo
- ⚠️ **Firefox 129+**: Soporte parcial
- ❌ **Safari**: Sin soporte (navegación normal)

### 6.3 Mejores prácticas

- **Nombres únicos**: Cada `view-transition-name` debe ser único
- **Same-origin**: Solo funciona entre páginas del mismo dominio
- **Performance**: Las transiciones nativas usan hardware acceleration
- **Fallback**: Los navegadores sin soporte usan navegación normal automáticamente

## 📋 Paso 7: Código completo del ejemplo

### 7.1 Estructura de archivos

```
src/
├── layouts/
│   └── BaseLayout.astro        # Layout principal con meta tags
├── styles/
│   └── view-transition.css     # Todas las animaciones CSS
├── componentes/
│   ├── Header.astro           # Header con view-transition-name
│   └── ProyectoCard.tsx       # Cards con nombres dinámicos
└── pages/
    ├── index.astro            # Páginas que usan BaseLayout
    ├── proyectos.astro
    └── contacto.astro
```

### 7.2 BaseLayout.astro completo

```astro
---
import "../styles/view-transition.css";
// otros imports...
---

<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="view-transition" content="same-origin" />
    <!-- otros meta tags... -->

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        if ('startViewTransition' in document) {
          console.log('✅ View Transitions nativas activas');
        } else {
          console.log('⚠️ View Transitions nativas no soportadas');
        }
      });
    </script>
  </head>
  <body>
    <Header />
    <slot />
  </body>
</html>
```

### 7.3 view-transition.css completo

```css
/* Activación automática */
@view-transition {
  navigation: auto;
}

/* Solo si el usuario no prefiere movimiento reducido */
@media (prefers-reduced-motion: no-preference) {
  /* Transición global de página */
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  ::view-transition-old(root) {
    animation-name: fade-out;
  }

  ::view-transition-new(root) {
    animation-name: fade-in;
  }

  /* Transiciones para elementos específicos */
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
  }

  /* Keyframes */
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

/* Ocultar elementos de accesibilidad (Astro) */
.astro-route-announcer {
  position: absolute !important;
  left: -10000px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  clip: rect(1px, 1px, 1px, 1px) !important;
  white-space: nowrap !important;
}
```

## 🎯 Resultado final

### ✅ Lo que conseguirás:

- **Transiciones suaves** en navegadores que lo soporten (Chrome/Edge)
- **Navegación normal** en Safari/Firefox y navegadores antiguos
- **Accesibilidad respetada** (prefers-reduced-motion)
- **Código limpio** y mantenible
- **Performance óptima** sin JavaScript de transiciones

### 🚀 Beneficios clave:

- **Peso mínimo**: Solo CSS nativo (~2KB)
- **Simplicidad**: Una configuración, funciona en todos lados
- **Future-proof**: Más navegadores adoptarán este estándar
- **Sin dependencias**: No necesitas librerías externas
- **SEO friendly**: No afecta indexación ni carga de contenido

### 📈 Casos de uso recomendados:

- ✅ **Portfolios y landing pages**
- ✅ **Blogs y sitios de contenido**
- ✅ **Aplicaciones web simples**
- ✅ **Sitios con navegación frecuente**

¡Ahora tienes todo lo necesario para implementar View Transitions nativas en tu proyecto! 🎉
