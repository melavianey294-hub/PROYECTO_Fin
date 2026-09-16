import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Catalogo from "./pages/Catalogo";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import PanelAdmin from "./pages/PanelAdmin";
import Usuarios from "./pages/Usuarios";

function RutaProtegida({ children, soloAdmin = false }) {
  const usuarioGuardado = localStorage.getItem("usuarioLogueado");

  let usuario = null;

  try {
    usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  } catch {
    usuario = null;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (soloAdmin && usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/catalogo"
          element={
            <RutaProtegida>
              <Catalogo />
            </RutaProtegida>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route
          path="/panel-admin"
          element={
            <RutaProtegida soloAdmin={true}>
              <PanelAdmin />
            </RutaProtegida>
          }
        />

        <Route
          path="/usuarios"
          element={
            <RutaProtegida soloAdmin={true}>
              <Usuarios />
            </RutaProtegida>
          }
        />

        {/* Ruta alternativa */}
        <Route
          path="/admin"
          element={<Navigate to="/panel-admin" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;