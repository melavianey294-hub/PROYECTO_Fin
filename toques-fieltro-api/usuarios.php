<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/conexion.php";

$metodo = $_SERVER["REQUEST_METHOD"];

try {

    /*
    =====================================================
    MÉTODO GET: CONSULTAR USUARIOS
    =====================================================
    */

    if ($metodo === "GET") {

        $consulta = "
            SELECT
                u.id,
                u.nombre,
                u.correo,
                r.nombre AS rol,
                CASE
                    WHEN u.activo = 1 THEN 'Activo'
                    ELSE 'Inactivo'
                END AS estado,
                u.fecha_registro
            FROM usuarios u
            INNER JOIN roles r ON u.rol_id = r.id
            ORDER BY u.id DESC
        ";

        $resultado = $conn->query($consulta);

        if (!$resultado) {
            throw new Exception(
                "Error al consultar usuarios: " . $conn->error
            );
        }

        $usuarios = [];

        while ($fila = $resultado->fetch_assoc()) {
            $usuarios[] = $fila;
        }

        echo json_encode([
            "ok" => true,
            "usuarios" => $usuarios
        ]);

        exit;
    }

    /*
    =====================================================
    LEER DATOS JSON PARA POST Y PUT
    =====================================================
    */

    $contenido = file_get_contents("php://input");
    $datos = json_decode($contenido, true);

    if (!is_array($datos)) {
        http_response_code(400);

        echo json_encode([
            "ok" => false,
            "mensaje" => "Los datos enviados no son válidos."
        ]);

        exit;
    }

    /*
    =====================================================
    MÉTODO POST: REGISTRAR USUARIO
    =====================================================
    */

    if ($metodo === "POST") {

        $nombre = trim($datos["nombre"] ?? "");
        $correo = trim($datos["correo"] ?? "");
        $password = $datos["password"] ?? "";
        $rol = trim($datos["rol"] ?? "Cliente");

        if ($nombre === "" || $correo === "" || $password === "") {
            http_response_code(400);

            echo json_encode([
                "ok" => false,
                "mensaje" => "El nombre, correo y contraseña son obligatorios."
            ]);

            exit;
        }

        $verificar = $conn->prepare(
            "SELECT id FROM usuarios WHERE correo = ?"
        );

        if (!$verificar) {
            throw new Exception("No se pudo verificar el correo.");
        }

        $verificar->bind_param("s", $correo);
        $verificar->execute();

        $resultadoCorreo = $verificar->get_result();

        if ($resultadoCorreo->num_rows > 0) {
            http_response_code(409);

            echo json_encode([
                "ok" => false,
                "mensaje" => "El correo electrónico ya está registrado."
            ]);

            exit;
        }

        $buscarRol = $conn->prepare(
            "SELECT id FROM roles WHERE nombre = ?"
        );

        if (!$buscarRol) {
            throw new Exception("No se pudo consultar el rol.");
        }

        $buscarRol->bind_param("s", $rol);
        $buscarRol->execute();

        $resultadoRol = $buscarRol->get_result();

        if ($resultadoRol->num_rows === 0) {
            http_response_code(400);

            echo json_encode([
                "ok" => false,
                "mensaje" => "El rol seleccionado no existe."
            ]);

            exit;
        }

        $filaRol = $resultadoRol->fetch_assoc();
        $rol_id = (int) $filaRol["id"];

        $passwordHash = password_hash(
            $password,
            PASSWORD_DEFAULT
        );

        $insertar = $conn->prepare(
            "INSERT INTO usuarios
            (nombre, correo, password, rol_id, activo)
            VALUES (?, ?, ?, ?, 1)"
        );

        if (!$insertar) {
            throw new Exception("No se pudo preparar el registro.");
        }

        $insertar->bind_param(
            "sssi",
            $nombre,
            $correo,
            $passwordHash,
            $rol_id
        );

        if (!$insertar->execute()) {
            throw new Exception(
                "No se pudo registrar el usuario: " . $insertar->error
            );
        }

        echo json_encode([
            "ok" => true,
            "mensaje" => "Usuario registrado correctamente.",
            "id" => $conn->insert_id
        ]);

        exit;
    }

    /*
    =====================================================
    MÉTODO PUT: CAMBIAR ESTADO
    =====================================================
    */

    if ($metodo === "PUT") {

        $id = (int) ($datos["id"] ?? 0);
        $estado = trim($datos["estado"] ?? "");

        if ($id <= 0 || !in_array($estado, ["Activo", "Inactivo"])) {
            http_response_code(400);

            echo json_encode([
                "ok" => false,
                "mensaje" => "El ID o el estado enviado no son válidos."
            ]);

            exit;
        }

        $activo = $estado === "Activo" ? 1 : 0;

        $actualizar = $conn->prepare(
            "UPDATE usuarios SET activo = ? WHERE id = ?"
        );

        if (!$actualizar) {
            throw new Exception(
                "No se pudo preparar la actualización."
            );
        }

        $actualizar->bind_param("ii", $activo, $id);

        if (!$actualizar->execute()) {
            throw new Exception(
                "No se pudo actualizar el estado: " .
                $actualizar->error
            );
        }

        echo json_encode([
            "ok" => true,
            "mensaje" => "Estado actualizado correctamente."
        ]);

        exit;
    }

    /*
    =====================================================
    MÉTODO NO PERMITIDO
    =====================================================
    */

    http_response_code(405);

    echo json_encode([
        "ok" => false,
        "mensaje" => "Método no permitido."
    ]);

} catch (Exception $error) {

    http_response_code(500);

    echo json_encode([
        "ok" => false,
        "mensaje" => "Error interno del servidor.",
        "detalle" => $error->getMessage()
    ]);
}

$conn->close();

?>