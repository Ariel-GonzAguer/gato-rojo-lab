document.addEventListener('DOMContentLoaded', () => {
  if ('startViewTransition' in document) {
    console.log('✅ View Transitions nativas activas');
  } else {
    console.log('⚠️ View Transitions nativas no soportadas en este navegador');
  }
});
