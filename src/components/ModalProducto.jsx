import { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";

export default function ModalProducto({ producto, cerrar }) {
  const [activa, setActiva] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [agregadoAviso, setAgregadoAviso] = useState(false); // Estado para el aviso informativo

  const { agregarProducto } = useCarrito();

  useEffect(() => {
    if (producto) {
      setActiva(producto.imgs[0]);
      setCantidad(1);
      setAgregadoAviso(false);
    }
  }, [producto]);

  if (!producto) return null;

  // =============================
  // CALCULO DE PRECIO
  // =============================
  const precioNumerico = parseInt(producto.precio.replace(/[^0-9]/g, "")) || 0;

  const total = (precioNumerico * cantidad).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  // =============================
  // MENSAJES POR CATEGORIA (TAL CUAL LOS TENÍAS)
  // =============================
  const mensajesPorCategoria = {
    Comedores: {
      intro: "🍽️ Estoy interesado en un comedor para mi hogar.",
      cierre: "¿Se puede fabricar a medida y elegir acabados?",
    },
    Salas: {
      intro: "🛋️ Busco una sala elegante para mi espacio.",
      cierre: "¿Qué opciones de personalización manejan?",
    },
    Dormitorio: {
      intro: "🛏️ Me interesa un mueble para dormitorio.",
      cierre: "¿Incluye opciones de color o medidas?",
    },
    Oficina: {
      intro: "🖥️ Estoy cotizando mobiliario para oficina.",
      cierre: "¿Manejan descuentos por cantidad?",
    },
    Almacenamiento: {
      intro: "📦 Busco un mueble de almacenamiento.",
      cierre: "¿Se puede adaptar a mi espacio?",
    },
  };

  const catMsg = mensajesPorCategoria[producto.cat] || {
    intro: "✨ Estoy interesado en el siguiente producto.",
    cierre: "¿Me podrían confirmar disponibilidad?",
  };

  // =============================
  // WHATSAPP (MANTENIENDO TU LÓGICA ORIGINAL)
  // =============================
  const generarMensaje = () => {
    const numero = "573124733733";

    const lineas = [
      "👋 Hola, buen día.",
      "",
      catMsg.intro,
      "",
      `🪑 *Producto:* ${producto.nombre}`,
      `📦 *Cantidad:* ${cantidad} unidad(es)`,
      `💰 *Precio unitario:* ${producto.precio}`,
      `✅ *Total estimado:* ${total}`,
      "",
      `🖼️ *Referencia:* ${activa}`,
      "",
      `🤝 ${catMsg.cierre}`,
      "¡Gracias!",
    ];

    const mensaje = lineas.join("\n");

    return `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(
      mensaje
    )}`;
  };

  // =============================
  // CARRITO CON AVISO INFORMATIVO
  // =============================
  const handleAgregarAlCarrito = () => {
    agregarProducto({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      precioNumerico,
      img: activa,
      cat: producto.cat,
      cantidad,
    });

    // Activar el mensaje informativo
    setAgregadoAviso(true);
    
    // Quitar el mensaje después de 2.5 segundos
    setTimeout(() => {
      setAgregadoAviso(false);
    }, 2500);
  };

  return (
    <div id="modal" onClick={cerrar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={cerrar}>
          &times;
        </span>

        {/* IMAGENES */}
        <div className="modal-img-container">
          <img src={activa} alt={producto.nombre} className="main-img" />

          <div className="thumbs">
            {producto.imgs.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Vista ${i}`}
                className={activa === img ? "active" : ""}
                onClick={() => setActiva(img)}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="modal-info">
          <span className="cat">{producto.cat}</span>
          <h2>{producto.nombre}</h2>
          <p>{producto.desc}</p>

          <div
            className="detalles-container"
            dangerouslySetInnerHTML={{ __html: producto.detalles }}
          />

          <div className="price">{producto.precio}</div>

          {/* CANTIDAD */}
          <div className="cantidad-selector">
            <label>Cantidad:</label>
            <div className="counter">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>
                -
              </button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)}>+</button>
            </div>
          </div>

          {/* CONTENEDOR DE BOTONES MEJORADO */}
          <div className="modal-actions-container">
            {/* BOTON CARRITO CON FEEDBACK */}
            <button 
              className={`btn-add-cart-moderno ${agregadoAviso ? 'success' : ''}`} 
              onClick={handleAgregarAlCarrito}
              disabled={agregadoAviso}
            >
              {agregadoAviso ? (
                <span>✅ ¡Añadido al carrito!</span>
              ) : (
                <span>🛒 Agregar {cantidad} al carrito</span>
              )}
            </button>

            {/* BOTON WHATSAPP */}
            <a
              className="btn-wa"
              href={generarMensaje()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cotizar {cantidad} {cantidad > 1 ? "unidades" : "unidad"} por WhatsApp
            </a>

             {/* MENSAJE INFORMATIVO FLOTANTE INTERNO */}
            {agregadoAviso && (
                <div className="aviso-toast-interno">
                Se ha enviado "{producto.nombre}" a tu cotización.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}