
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("admin@toques.com");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = (e) => {
    e.preventDefault();
    setMensaje("");

    if (!correo || !password) {
      setMensaje("Completa el correo electrónico y la contraseña.");
      return;
    }

    if (correo === "admin@toques.com" && password === "123456") {
      localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify({
          nombre: "Administrador",
          correo: correo,
          rol: "admin",
        })
      );

      navigate("/panel-admin");
    } else {
      setMensaje(
        "Datos de acceso incorrectos. Verifica tu correo y contraseña."
      );
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-icon">✿</div>

        <h1>Iniciar sesión</h1>

        <p className="login-description">
          Ingresa a tu cuenta de Toques en Fieltro y Algo Más.
        </p>

        <form onSubmit={iniciarSesion} className="login-form">
          <label htmlFor="correo">Correo electrónico</label>

          <input
            id="correo"
            type="email"
            placeholder="admin@toques.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {mensaje && <div className="login-message">{mensaje}</div>}

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        <p className="register-text">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro">Regístrate aquí</Link>
        </p>

        <Link to="/" className="back-home">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default Login;