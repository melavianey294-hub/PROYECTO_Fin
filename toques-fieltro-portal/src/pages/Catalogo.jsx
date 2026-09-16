import { useEffect, useState } from "react";
import "../styles/productos.css";
import { useNavigate } from "react-router-dom";

const productos = [
  {
    id: 1,
    nombre: "Girasol decorativo",
    categoria: "Flores",
    precio: 8,
    imagen: "/productos/Girasol.jpeg",
    descripcion: "Hermoso girasol elaborado artesanalmente en fieltro."
  },
  {
    id: 2,
    nombre: "Ramo de rosas",
    categoria: "Flores",
    precio: 12,
    imagen: "/productos/Rosas.jpeg",
    descripcion: "Ramo de rosas de fieltro ideal para regalar."
  },
  {
    id: 3,
    nombre: "Pikachu de fieltro",
    categoria: "Personajes",
    precio: 10,
    imagen: "/productos/Pikachu.jpeg",
    descripcion: "Figura artesanal de Pikachu hecha con materiales suaves."
  },
  {
    id: 4,
    nombre: "Conejita mochila",
    categoria: "Accesorios",
    precio: 18,
    imagen: "/productos/Coneja mochila.jpeg",
    descripcion: "Tierna conejita decorativa elaborada en fieltro."
  },
  {
    id: 5,
    nombre: "Brujita de fieltro",
    categoria: "Personajes",
    precio: 15,
    imagen: "/productos/Brujita.jpeg",
    descripcion: "Brujita artesanal para decorar espacios especiales."
  },
  {
    id: 6,
    nombre: "Brujita Alison",
    categoria: "Personajes",
    precio: 15,
    imagen: "/productos/Brujita Alison.jpeg",
    descripcion: "Hermosa figura artesanal de Brujita Alison."
  },
  {
    id: 7,
    nombre: "Hello Kitty y Snoopy",
    categoria: "Personajes",
    precio: 16,
    imagen: "/productos/Hello kitty y Snoopy.jpeg",
    descripcion: "Decoración artesanal inspirada en personajes populares."
  },
  {
    id: 8,
    nombre: "Snoopy y Pollito",
    categoria: "Personajes",
    precio: 16,
    imagen: "/productos/Snoopy y Pollito.jpeg",
    descripcion: "Adorable decoración artesanal de Snoopy y Pollito."
  },
  {
    id: 9,
    nombre: "Pepe pollo",
    categoria: "Animales",
    precio: 9,
    imagen: "/productos/Pepe pollo.jpeg",
    descripcion: "Figura de pollo elaborada completamente a mano."
  },
  {
    id: 10,
    nombre: "Osos de fieltro",
    categoria: "Animales",
    precio: 14,
    imagen: "/productos/Osos de Fieltro.jpg",
    descripcion: "Ositos decorativos hechos con mucho detalle."
  },
  {
    id: 11,
    nombre: "Muñecos artesanales",
    categoria: "Muñecos",
    precio: 20,
    imagen: "/productos/Muñecos Artesanales.jpg",
    descripcion: "Muñecos personalizados para ocasiones especiales."
  },
  {
    id: 12,
    nombre: "Muñecos navideños",
    categoria: "Navidad",
    precio: 18,
    imagen: "/productos/Muñecos Navideños.jpg",
    descripcion: "Adornos navideños elaborados artesanalmente."
  },
  {
    id: 13,
    nombre: "Reno navideño",
    categoria: "Navidad",
    precio: 13,
    imagen: "/productos/Reno Navideño.jpg",
    descripcion: "Reno decorativo ideal para la temporada navideña."
  },
  {
    id: 14,
    nombre: "Bota navideña",
    categoria: "Navidad",
    precio: 16,
    imagen: "/productos/Bota Navideña.jpg",
    descripcion: "Bota navideña decorativa para el hogar."
  },
  {
    id: 15,
    nombre: "Letras navideñas",
    categoria: "Navidad",
    precio: 15,
    imagen: "/productos/Letras Navideñas.jpg",
    descripcion: "Letras decorativas para complementar tu decoración."
  },
  {
    id: 16,
    nombre: "Duendecitos navideños",
    categoria: "Navidad",
    precio: 28,
    imagen: "/productos/Duendecitos Navideños.jpg",
    descripcion: "Duendecitos decorativos para la temporada navideña."
  },
  {
    id: 17,
    nombre: "Virgencita artesanal",
    categoria: "Religioso",
    precio: 25,
    imagen: "/productos/Virgencita Artesanal.jpg",
    descripcion: "Figura religiosa elaborada cuidadosamente a mano."
  },
  {
    id: 18,
    nombre: "Lirios de campo",
    categoria: "Flores",
    precio: 13,
    imagen: "/productos/Lirios de campo.jpeg",
    descripcion: "Lirios decorativos elaborados artesanalmente en fieltro."
  },
  {
    id: 19,
    nombre: "Llaveritos artesanales",
    categoria: "Accesorios",
    precio: 1,
    imagen: "/productos/Llaveritos.jpeg",
    descripcion: "Llaveritos personalizados y elaborados a mano."
  },
  {
    id: 20,
    nombre: "Macetas decorativas",
    categoria: "Decoración",
    precio: 10,
    imagen: "/productos/Macetas.jpeg",
    descripcion: "Macetas decorativas ideales para embellecer tus espacios."
  },
  {
    id: 21,
    nombre: "Conejita tejida",
    categoria: "Muñecos",
    precio: 18,
    imagen: "/productos/Coneja tejida con lana chenill.jpeg",
    descripcion: "Conejita tejida con lana chenill y detalles artesanales."
  },
  {
    id: 22,
    nombre: "Flores y Lirios tejidos",
    categoria: "Decoración",
    precio: 10,
    imagen: "/productos/Portada.jpeg",
    descripcion: "Flores y Lirios tejidos en fieltro."
  }
];

function Catalogo() {
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (!usuarioLogueado) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria))
  ];

  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoria === "Todas" || producto.categoria === categoria;

    return coincideBusqueda && coincideCategoria;
  });

  const consultarProducto = (producto) => {
    const mensaje = `Hola, deseo consultar información sobre el producto: ${producto.nombre}. Precio referencial: $${producto.precio.toFixed(
      2
    )}.`;

    const enlace = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

    window.open(enlace, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="catalogo-contenedor">
      <section className="catalogo-encabezado">
        <span className="catalogo-etiqueta">Hecho con amor</span>

        <h1>Catálogo de productos</h1>

        <p>
          Descubre nuestros productos artesanales elaborados en fieltro,
          perfectos para regalar y decorar tus espacios.
        </p>
      </section>

      <section className="catalogo-controles">
        <div className="buscador-contenedor">
          <label htmlFor="buscador">Buscar producto</label>

          <input
            id="buscador"
            type="text"
            placeholder="Escribe el nombre de un producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="filtro-contenedor">
          <label htmlFor="categoria">Filtrar por categoría</label>

          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((nombreCategoria) => (
              <option key={nombreCategoria} value={nombreCategoria}>
                {nombreCategoria}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="catalogo-resumen">
        <p>
          Productos encontrados: <strong>{productosFiltrados.length}</strong>
        </p>
      </div>

      {productosFiltrados.length > 0 ? (
        <section className="productos-grid">
          {productosFiltrados.map((producto) => (
            <article className="producto-card" key={producto.id}>
              <div className="producto-imagen-contenedor">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-imagen"
                />

                <span className="producto-categoria">
                  {producto.categoria}
                </span>
              </div>

              <div className="producto-informacion">
                <h2>{producto.nombre}</h2>

                <p className="producto-descripcion">
                  {producto.descripcion}
                </p>

                <div className="producto-pie">
                  <span className="producto-precio">
                    ${producto.precio.toFixed(2)}
                  </span>

                  <button
                    className="boton-consultar"
                    onClick={() => consultarProducto(producto)}
                  >
                    Consultar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="sin-resultados">
          <h2>No se encontraron productos</h2>
          <p>Prueba con otro nombre o selecciona una categoría diferente.</p>

          <button
            className="boton-limpiar"
            onClick={() => {
              setBusqueda("");
              setCategoria("Todas");
            }}
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </main>
  );
}

export default Catalogo;