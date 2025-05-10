import React, { useState } from 'react';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prevState) => {
      const newState = !prevState;
      console.log(newState); // Esto mostrará el estado actualizado
      return newState;
    });
  }

  return (
    <>
      <div className="hamburger-menu" onClick={toggleMenu} aria-label="Menú de navegación" aria-expanded={isOpen} role="button">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>

        {isOpen && (
          <div className={isOpen ? 'menu-open' : 'menu-closed'} aria-label="Opciones del menú">
            <a href="/" onClick={() => setIsOpen(false)} aria-label="Ir a Inicio" data-testid="inicio">Inicio</a>
            <a href="/servicios" onClick={() => setIsOpen(false)} aria-label="Ir a Servicios" data-testid="servicios">Servicios</a>
            <a href="/proyectos" onClick={() => setIsOpen(false)} aria-label="Ir a Proyectos" data-testid="proyectos">Proyectos</a>
            <a href="/acerca-de" onClick={() => setIsOpen(false)} aria-label="Ir a Acerca de" data-testid="acerca-de">Acerca-de</a>
            <a href="/contacto" onClick={() => setIsOpen(false)} aria-label="Ir a Contacto" data-testid="contacto">Contacto</a>
          </div>
        )}
      </div>
    </>
  );
};
