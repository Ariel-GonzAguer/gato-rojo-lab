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
            <a href="/" onClick={() => setIsOpen(false)} aria-label="Ir a Inicio">Inicio</a>
            <a href="/servicios" onClick={() => setIsOpen(false)} aria-label="Ir a Servicios">Servicios</a>
            <a href="/proyectos" onClick={() => setIsOpen(false)} aria-label="Ir a Proyectos">Proyectos</a>
            <a href="/acerca-de" onClick={() => setIsOpen(false)} aria-label="Ir a Acerca de">Acerca-de</a>
            <a href="/contacto" onClick={() => setIsOpen(false)} aria-label="Ir a Contacto">Contacto</a>
          </div>
        )}
      </div>
    </>
  );
};
