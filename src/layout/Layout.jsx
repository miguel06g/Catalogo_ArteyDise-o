import { useState } from "react"; // Importante
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carrito from "../components/Carrito"; 
import useScrollProgress from "../hooks/useScrollProgress";
import useReveal from "../hooks/useReveal";

export default function Layout({ children }) {
  useScrollProgress();
  useReveal();

  const [carritoVisible, setCarritoVisible] = useState(false);

  return (
    <>
      {/* Pasamos la función al Header */}
      <Header abrirCarrito={() => setCarritoVisible(true)} />

      <div className="progress-container">
        <div className="progress-bar" id="progreso-oro"></div>
      </div>

      <main>{children}</main>

      <Footer />

      {/* El carrito solo existe si carritoVisible es true */}
      {carritoVisible && (
        <Carrito cerrar={() => setCarritoVisible(false)} />
      )}

      <a href="https://wa.me/573124733733" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-whatsapp"></i>
        <span className="tooltip-wa">Cotizar ahora</span>
      </a>
    </>
  );
}