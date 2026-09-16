import { Link, useNavigate } from "react-router-dom";
import "../styles/PanelAdmin.css";

function PanelAdmin() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    navigate("/");
  };

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <span className="admin-hero-label">ADMINISTRACIÓN</span>

        <h1>Panel administrativo</h1>

        <p>
          Gestiona los usuarios y consulta las opciones principales del portal.
        </p>
      </section>

      <section className="admin-cards">
        <article className="admin-card">
          <div className="admin-card-icon">👥</div>

          <h2>Usuarios</h2>

          <p>
            Consulta, modifica y administra los usuarios registrados en el
            sistema.
          </p>

          <Link to="/usuarios" className="admin-button">
            Administrar usuarios
          </Link>
        </article>

        <article className="admin-card">
          <div className="admin-card-icon">🧵</div>

          <h2>Catálogo</h2>

          <p>
            Visualiza los productos artesanales disponibles en el portal.
          </p>

          <Link to="/catalogo" className="admin-button">
            Ver catálogo
          </Link>
        </article>

        <article className="admin-card">
          <div className="admin-card-icon">🏠</div>

          <h2>Página principal</h2>

          <p>Regresa a la página de inicio del emprendimiento.</p>

          <Link to="/" className="admin-button">
            Ir al inicio
          </Link>
        </article>
      </section>

      <div className="admin-logout-container">
        <button className="admin-logout" onClick={cerrarSesion}>
          <span>↪</span>
          Cerrar sesión
        </button>
      </div>
    </main>
  );
}

export default PanelAdmin;