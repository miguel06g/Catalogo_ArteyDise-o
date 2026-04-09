import React from 'react';

export default function Preloader() {
  return (
    <div className="preloader">
      <div className="preloader-content">
        {/* El Logo Circular */}
        <img 
          src="/logo-luxury.png" 
          alt="Logo Arte y Diseño" 
          className="img-preloader"
        />
        
        {/* El Texto de la Marca */}
        <h1 className="logo-preloader">ARTE & DISEÑO</h1>
        
        {/* La Barra de Carga */}
        <div className="preloader-bar">
          <div className="preloader-progress"></div>
        </div>
      </div>
    </div>
  );
}