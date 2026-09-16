
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cliente() {
  return (
    <div className="portal">
      <Navbar />

      <main className="cliente-page">
        <section className="cliente-hero">
          <div>
            <span className="eyebrow">PORTAL EMPRESARIAL</span>

            <h1>¡Bienvenida a Toques en Fieltro!</h1>

            <p>
              Descubre productos artesanales, novedades y las
              funcionalidades de nuestro portal.
            </p>

            <Link to="/catalogo" className="btn-primary">
              Explorar catálogo
            </Link>
          </div>

          <div className="cliente-hero-icon">
            🧵
          </div>
        </section>

        <section className="cliente-section">
          <div className="section-heading">
            <span className="eyebrow">ACCESOS RÁPIDOS</span>
            <h2>¿Qué deseas hacer?</h2>
          </div>

          <div className="cliente-grid">
            <Link to="/catalogo" className="cliente-card">
              <span className="cliente-card-icon">🛍️</span>
              <h3>Ver productos</h3>
              <p>Explora nuestro catálogo de artículos artesanales.</p>
              <span className="card-link">Explorar →</span>
            </Link>

            <Link to="/comunicacion" className="cliente-card">
              <span className="cliente-card-icon">💬</span>
              <h3>Comunicación</h3>
              <p>Consulta comunicados y novedades del portal.</p>
              <span className="card-link">Ver mensajes →</span>
            </Link>

            <Link to="/perfil" className="cliente-card">
              <span className="cliente-card-icon">👤</span>
              <h3>Mi perfil</h3>
              <p>Consulta y administra tu información personal.</p>
              <span className="card-link">Ver perfil →</span>
            </Link>
          </div>
        </section>

        <section className="cliente-info">
          <div>
            <span className="eyebrow">NUESTRA ESENCIA</span>
            <h2>Creatividad hecha a mano</h2>
            <p>
              En Toques en Fieltro y Algo Más elaboramos detalles
              artesanales con dedicación, creatividad y amor por
              los pequeños detalles.
            </p>
          </div>

          <div className="cliente-info-badge">
            <span>✿</span>
            <strong>Hecho con amor</strong>
            <small>Artesanía y creatividad</small>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>Toques en Fieltro y Algo Más</strong>
        <p>Artesanía que transforma momentos.</p>
      </footer>
    </div>
  );
}

export default Cliente;