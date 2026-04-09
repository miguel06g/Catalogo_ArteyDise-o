import { useState } from "react"; //
import Catalogo from "./components/Catalogo";
import Layout from "./layout/Layout";
import Preloader from "./components/Preloader";
import usePreloader from "./hooks/usePreloader";
import Carrito from "./components/Carrito"; // Importamos el carrito

export default function App() {
  const loading = usePreloader(2000);
  // 1. Creamos el estado para controlar la visibilidad
  const [mostrarCarrito, setMostrarCarrito] = useState(false); 

  if (loading) return <Preloader />;

  return (
    // 2. Pasamos la función para abrir el carrito al Layout (que tiene el Header)
    <Layout abrirCarrito={() => setMostrarCarrito(true)}>
      <Catalogo />
      
      {/* 3. El carrito SOLO se renderiza si mostrarCarrito es true */}
      {mostrarCarrito && <Carrito cerrar={() => setMostrarCarrito(false)} />}
    </Layout>
  );
}