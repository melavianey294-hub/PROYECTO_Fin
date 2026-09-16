
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioLogueado");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      setUsuario(null);
    }
  }, [location]);

  const abrirCatalogo = () => {
    if (usuario) {
      navigate("/catalogo");
    } else {
      navigate("/login");
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioLogueado");
    setUsuario(null);
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">✿</div>

        <div>
          <strong>Toques en Fieltro</strong>
          <span>y Algo Más</span>
        </div>
      </Link>

      <nav className="navbar-links">
        <Link to="/">Inicio</Link>

        <button type="button" onClick={abrirCatalogo}>
          Catálogo
        </button>

        {usuario?.rol === "admin" && (
          <Link to="/panel-admin">Panel administrativo</Link>
        )}

        {usuario ? (
          <button type="button" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        ) : (
          <Link to="/login" className="login-link">
            Iniciar sesión
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;