import { createContext, useContext, useState, useEffect } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  // 1. Iniciamos el estado intentando leer de localStorage
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito_arte_diseno");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // 2. Cada vez que el carrito cambie, guardamos en localStorage
  useEffect(() => {
    localStorage.setItem("carrito_arte_diseno", JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + producto.cantidad }
            : p
        );
      }
      return [...prev, producto];
    });
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => useContext(CarritoContext);