import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/usuarios.css";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [actualizando, setActualizando] = useState(null);

  const API_URL = "http://localhost/toques-fieltro-api/usuarios.php";

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.ok) {
        throw new Error(
          datos.mensaje || "No se pudieron cargar los usuarios."
        );
      }

      setUsuarios(datos.usuarios || []);
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo conectar con PHP. Verifica que Apache y MySQL estén activos."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cambiarEstado = async (usuario) => {
    const nuevoEstado =
      usuario.estado === "Activo" ? "Inactivo" : "Activo";

    const confirmar = window.confirm(
      `¿Deseas cambiar el estado de ${usuario.nombre} a ${nuevoEstado}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setActualizando(usuario.id);
      setError("");
      setMensaje("");

      const respuesta = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: usuario.id,
          estado: nuevoEstado,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.ok) {
        throw new Error(
          datos.mensaje || "No se pudo actualizar el estado."
        );
      }

      setMensaje("Estado del usuario actualizado correctamente.");
      await cargarUsuarios();
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Ocurrió un error al actualizar el usuario."
      );
    } finally {
      setActualizando(null);
    }
  };

  return (
    <main className="usuarios-page">
      <section className="usuarios-header">
        <span className="usuarios-label">ADMINISTRACIÓN</span>

        <h1>Gestión de usuarios</h1>

        <p>
          Administra las cuentas y los roles de acceso del portal empresarial.
        </p>

        <Link to="/panel-admin" className="usuarios-volver">
          ← Volver al panel
        </Link>
      </section>

      <section className="usuarios-card">
        <div className="usuarios-card-header">
          <div>
            <h2>Usuarios registrados</h2>
            <p>Total de usuarios: {usuarios.length}</p>
          </div>

          <button
            type="button"
            className="usuarios-recargar"
            onClick={cargarUsuarios}
            disabled={cargando}
          >
            ↻ Actualizar
          </button>
        </div>

        {cargando && (
          <p className="usuarios-mensaje">Cargando usuarios...</p>
        )}

        {error && <p className="usuarios-error">{error}</p>}

        {mensaje && <p className="usuarios-exito">{mensaje}</p>}

        {!cargando && !error && usuarios.length === 0 && (
          <p className="usuarios-mensaje">
            No existen usuarios registrados.
          </p>
        )}

        {!cargando && !error && usuarios.length > 0 && (
          <div className="usuarios-tabla-contenedor">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>

                    <td>
                      <span className="rol-badge">{usuario.rol}</span>
                    </td>

                    <td>
                      <span
                        className={
                          usuario.estado === "Activo"
                            ? "estado activo"
                            : "estado inactivo"
                        }
                      >
                        {usuario.estado}
                      </span>
                    </td>

                    <td>
                      {usuario.fecha_registro || "No disponible"}
                    </td>

                    <td>
                      <button
                        type="button"
                        className={
                          usuario.estado === "Activo"
                            ? "accion-button desactivar"
                            : "accion-button activar"
                        }
                        onClick={() => cambiarEstado(usuario)}
                        disabled={actualizando === usuario.id}
                      >
                        {actualizando === usuario.id
                          ? "Procesando..."
                          : usuario.estado === "Activo"
                          ? "Desactivar"
                          : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Usuarios;