
import { Link } from "react-router-dom";
import "./Comunicaciones.css";

function Comunicaciones() {
  return (
    <main className="comunicaciones">
      <section className="comunicaciones-encabezado">
        <p className="comunicaciones-etiqueta">PORTAL EMPRESARIAL</p>

        <h1>Comunicaciones</h1>

        <p>
          Consulta los comunicados y avisos importantes de Toques en Fieltro
          y Algo Más.
        </p>

        <Link to="/admin" className="boton-volver">
          Volver al panel
        </Link>
      </section>

      <section className="comunicaciones-tarjeta">
        <h2>Comunicados recientes</h2>

        <article className="comunicado">
          <span className="comunicado-icono">📢</span>

          <div>
            <h3>Bienvenida al portal empresarial</h3>
            <p>
              Revisa las novedades, actividades y avisos importantes de la
              empresa.
            </p>
            <small>Publicado recientemente</small>
          </div>
        </article>

        <article className="comunicado">
          <span className="comunicado-icono">🧵</span>

          <div>
            <h3>Nuevos productos disponibles</h3>
            <p>
              El catálogo cuenta con nuevos artículos elaborados en fieltro.
            </p>
            <small>Publicado recientemente</small>
          </div>
        </article>

        <article className="comunicado">
          <span className="comunicado-icono">💌</span>

          <div>
            <h3>Información para los usuarios</h3>
            <p>
              Mantén actualizados tus datos y revisa periódicamente las
              comunicaciones del portal.
            </p>
            <small>Publicado recientemente</small>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Comunicaciones;