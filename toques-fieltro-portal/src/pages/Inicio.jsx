
import { Link } from "react-router-dom";
import "../styles/inicio.css";

function Inicio() {
  return (
    <main className="inicio">
      <section className="inicio-hero">
        <div className="inicio-contenido">
          <span className="inicio-etiqueta">Artesanía hecha con amor</span>

          <h1>
            Toques en Fieltro
            <span>y Algo Más</span>
          </h1>

          <p>
            Creamos detalles únicos, coloridos y personalizados elaborados
            cuidadosamente a mano para regalar, decorar y sorprender.
          </p>

          <div className="inicio-botones">
            <Link to="/catalogo" className="boton-principal">
              Ver catálogo
            </Link>

            <Link to="/registro" className="boton-secundario">
              Crear cuenta
            </Link>
          </div>
        </div>

        <div className="inicio-imagen-contenedor">
          <img
            src="/productos/Portada.jpeg"
            alt="Productos artesanales de Toques en Fieltro"
            className="inicio-imagen"
          />
        </div>
      </section>

      <section className="inicio-beneficios">
        <article className="beneficio-card">
          <span className="beneficio-icono">🌸</span>
          <h2>Hecho a mano</h2>
          <p>
            Cada producto es elaborado con dedicación y atención a los
            detalles.
          </p>
        </article>

        <article className="beneficio-card">
          <span className="beneficio-icono">🎁</span>
          <h2>Detalles especiales</h2>
          <p>
            Diseños ideales para regalos, celebraciones y decoración.
          </p>
        </article>

        <article className="beneficio-card">
          <span className="beneficio-icono">💗</span>
          <h2>Atención personalizada</h2>
          <p>
            Te ayudamos a encontrar el producto perfecto para cada ocasión.
          </p>
        </article>
      </section>

      <section className="inicio-final">
        <h2>Encuentra algo especial para ti</h2>
        <p>
          Explora nuestra colección de productos artesanales y descubre
          creaciones llenas de color y creatividad.
        </p>

        <Link to="/catalogo" className="boton-principal">
          Explorar productos
        </Link>
      </section>
    </main>
  );
}

export default Inicio;