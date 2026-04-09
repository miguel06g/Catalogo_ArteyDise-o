import { useState, useEffect } from "react";
import { productos } from "../data/productos";
import ModalProducto from "./ModalProducto";

export default function Catalogo() {
  const [seleccionado, setSeleccionado] = useState(null);
  const [categoria, setCategoria] = useState("Todos");
  
  // --- NUEVOS ESTADOS PARA BUSCADOR Y PAGINACIÓN ---
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 16; // Mostramos 16 para un grid simétrico

  const categorias = ["Todos", ...new Set(productos.map(p => p.cat))];

  // --- LÓGICA DE FILTRADO COMBINADA ---
  // Primero filtramos por categoría y LUEGO por lo que escriba el usuario
  const filtrados = productos.filter(p => {
    const cumpleCategoria = categoria === "Todos" || p.cat === categoria;
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  // --- LÓGICA DE PAGINACIÓN ---
  const ultimoIndice = paginaActual * productosPorPagina;
  const primerIndice = ultimoIndice - productosPorPagina;
  const productosVisibles = filtrados.slice(primerIndice, ultimoIndice);
  const totalPaginas = Math.ceil(filtrados.length / productosPorPagina);

  // Resetear página al filtrar o buscar
  useEffect(() => {
    setPaginaActual(1);
  }, [categoria, busqueda]);

  // EFECTO PARA RE-ACTIVAR ANIMACIONES (Modificado para productosVisibles)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => {
      el.classList.remove("active"); 
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [productosVisibles]); // Se activa cuando cambia la página o el filtro

  return (
    <section id="catalogo">
      <h2 className="section-title reveal">
        Nuestros <span>Productos</span>
      </h2>

      {/* --- NUEVO BUSCADOR --- */}
      <div className="search-container reveal">
        <input 
          type="text" 
          placeholder="¿Qué mueble buscas? (ej: Arista, Dubai...)" 
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      <div className="filtros reveal">
        {categorias.map(cat => {
          const totalPorCat = cat === "Todos" 
            ? productos.length 
            : productos.filter(p => p.cat === cat).length;

          return (
            <button
              key={cat}
              className={categoria === cat ? "activo" : ""}
              onClick={() => setCategoria(cat)}
            >
              {cat} <span className="count-badge">({totalPorCat})</span>
            </button>
          );
        })}
      </div>

      <div className="container">
        {/* USAMOS productosVisibles EN LUGAR DE filtrados */}
        {productosVisibles.map((p, i) => (
          <div 
            className={`card reveal delay-${(i % 4) + 1}`} 
            key={`${categoria}-${p.id || i}`} 
            onClick={() => setSeleccionado(p)}
          >
            <div className="card-img-wrapper">
              <img 
                src={p.imgs[0]} 
                alt={p.nombre} 
                onMouseEnter={(e) => p.imgs[1] && (e.currentTarget.src = p.imgs[1])}
                onMouseLeave={(e) => (e.currentTarget.src = p.imgs[0])}
              />
            </div>
            <div className="card-body">
              <h3>{p.nombre}</h3>
              <span>{p.precio}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- NUEVA PAGINACIÓN NUMÉRICA --- */}
      {totalPaginas > 1 && (
        <div className="pagination reveal">
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button 
              key={i + 1} 
              className={paginaActual === i + 1 ? "active" : ""}
              onClick={() => {
                setPaginaActual(i + 1);
                window.scrollTo({ top: 500, behavior: 'smooth' }); // Sube al inicio del catálogo
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <ModalProducto
        producto={seleccionado}
        cerrar={() => setSeleccionado(null)}
      />
    </section>
  );
}