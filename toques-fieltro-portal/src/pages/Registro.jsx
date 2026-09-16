
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/registro.css";

function Registro() {
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMensaje("");
    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost/toques-fieltro-api/registro.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formulario),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || !resultado.success) {
        throw new Error(
          resultado.message || "No se pudo completar el registro."
        );
      }

      setMensaje(resultado.message);

      setFormulario({
        nombre: "",
        correo: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.message ||
          "No se pudo conectar con el servidor. Verifica que XAMPP esté activo."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">🧵</div>

        <span className="eyebrow">ÚNETE A NOSOTROS</span>

        <h1>Crear una cuenta</h1>

        <p className="auth-description">
          Regístrate para acceder a las funcionalidades del portal.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre completo</label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre completo"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="correo-registro">
            Correo electrónico
          </label>

          <input
            id="correo-registro"
            name="correo"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formulario.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="password-registro">
            Contraseña
          </label>

          <input
            id="password-registro"
            name="password"
            type="password"
            placeholder="Crea una contraseña"
            value={formulario.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          {mensaje && (
            <p
              role="status"
              style={{ color: "#218739", fontWeight: "600" }}
            >
              {mensaje}
            </p>
          )}

          {error && (
            <p
              role="alert"
              style={{ color: "#c0392b", fontWeight: "600" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={cargando}
          >
            {cargando ? "Registrando..." : "Registrarme"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">Inicia sesión</Link>
        </p>

        <Link to="/" className="back-home">
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default Registro;