import { useCarrito } from '../context/CarritoContext';

export default function Carrito({ cerrar }) {
  const { carrito, eliminarProducto } = useCarrito();

  const calcularTotal = () => {
    const total = carrito.reduce((acc, item) => {
      const precioNum = parseInt(item.precio.replace(/[^0-9]/g, "")) || 0;
      return acc + (precioNum * item.cantidad);
    }, 0);

    return total.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    });
  };

const enviarWhatsApp = () => {
  const numero = "573124733733";

  const lineas = [
    "👋 *¡Hola! Arte y Diseño CC S.A.S*",
    "Me gustaría recibir una cotización de estos productos:",
    ""
  ];

  carrito.forEach((prod, i) => {
    lineas.push(`${i + 1}. 🪑 *${prod.nombre}*`);
    lineas.push(`   📦 Cantidad: ${prod.cantidad}`);
    lineas.push(`   💰 Precio: ${prod.precio}`);
    lineas.push("");
  });

  lineas.push("-----------------------");
  lineas.push(`💰 *TOTAL ESTIMADO:* ${calcularTotal()}`);
  lineas.push("-----------------------");
  lineas.push("");
  lineas.push("📋 ¿Me podrían confirmar disponibilidad y tiempo de entrega?");
  lineas.push("¡Muchas gracias!");

  const mensaje = lineas.join("\n");

  window.open(
    `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(
      mensaje
    )}`,
    "_blank"
  );
};


  return (
    <div className="carrito-overlay" onClick={cerrar}>
      <div className="carrito-content" onClick={(e) => e.stopPropagation()}>
        <div className="carrito-header">
          <h3>Mi Cotización</h3>
          <button className="close-cart-btn" onClick={cerrar}>
            &times;
          </button>
        </div>

        <div className="carrito-lista">
          {carrito.length === 0 ? (
            <p className="empty-msg">El carrito está vacío</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="carrito-item-card">
                <div className="item-details">
                  <span className="item-name">{item.nombre}</span>
                  <span className="item-price">
                    Cant: {item.cantidad} - {item.precio}
                  </span>
                </div>
                <button
                  onClick={() => eliminarProducto(item.id)}
                  className="delete-item"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && (
          <div className="carrito-footer">
            <div className="total-box">
              <span>Total:</span>
              <span>{calcularTotal()}</span>
            </div>
            <button className="btn-finalizar-wa" onClick={enviarWhatsApp}>
              Finalizar vía WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
