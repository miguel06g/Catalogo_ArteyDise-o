export default function Footer() {
  return (
    <footer className="footer-premium">
      <div className="footer-container">
        {/* Sección de Marca */}
        <div className="footer-box">
          <h2 className="footer-logo">Arte y Diseño<span> S.A.S</span></h2>
          <p className="footer-text">
            Expertos en mobiliario de alta gama. Diseños exclusivos que transforman tu hogar.
          </p>
        </div>

        {/* Sección de Enlaces */}
        <div className="footer-box">
          <h3 className="footer-title">Explorar</h3>
          <ul className="footer-links">
            <li><a href="#header">Inicio</a></li>
            <li><a href="#catalogo">Colección</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        {/* Sección de Contacto */}
        <div className="footer-box">
          <h3 className="footer-title">Contacto</h3>
          <p className="footer-text">📍 Bogota, Colombia</p>
          <p className="footer-text">📞 +57 312 4733 733</p>
          <p className="footer-text">✉️ info@arteydiseno.com</p>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2026 Arte y Diseño S.A.S - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}