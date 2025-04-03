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
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>


        {
          isOpen && (
            <div className={isOpen ? 'menu-open' : 'menu-closed'}>
              <a href="/" onClick={() => setIsOpen(false)}>Inicio</a>
              <a href="/proyectos" onClick={() => setIsOpen(false)}>Proyectos</a>
              <a href="/servicios" onClick={() => setIsOpen(false)}>Servicios</a>
              <a href="/acerca-de" onClick={() => setIsOpen(false)}>Acerca-de</a>
              <a href="/contacto" onClick={() => setIsOpen(false)}>Contacto</a>
            </div>
          )
        }
      </div>
    </>
  );
};
