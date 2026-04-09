import { useCarrito } from "../context/CarritoContext";

export default function Header({ abrirCarrito }) { // Recibimos la función aquí
  const ir = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const { carrito } = useCarrito();
  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);

  return (
    <header className="header">
      {/* LOGO Y MARCA */}
      <div className="brand-logo" onClick={() => ir("inicio")}>
        <i className="fas fa-couch brand-icon"></i>
        <div className="brand-text">
          <span className="brand-main">Arte y Diseño</span>
          <span className="brand-sub">CC S.A.S</span>
        </div>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="nav-links">
        <a className="nav-link" onClick={() => ir("catalogo")}>
          Catálogo
        </a>
      </nav>

      {/* CARRITO - Ahora usa abrirCarrito */}
      <button className="btn-carrito-moderno" onClick={abrirCarrito}>
        <div className="icon-wrapper">
          <i className="fas fa-shopping-bag"></i>
          {totalItems > 0 && (
            <span className="carrito-count-badge animate-pop">
              {totalItems}
            </span>
          )}
        </div>
      </button>
    </header>
  );
}