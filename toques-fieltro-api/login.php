
<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "ok" => false,
        "mensaje" => "Método no permitido."
    ]);

    exit;
}

try {
    $datos = json_decode(
        file_get_contents("php://input"),
        true
    );

    $correo = trim($datos["correo"] ?? "");
    $password = $datos["password"] ?? "";

    if ($correo === "" || $password === "") {
        http_response_code(400);

        echo json_encode([
            "ok" => false,
            "mensaje" => "El correo y la contraseña son obligatorios."
        ]);

        exit;
    }

    $consulta = $conn->prepare(
        "SELECT
            u.id,
            u.nombre,
            u.correo,
            u.password,
            u.activo,
            r.nombre AS rol
        FROM usuarios u
        INNER JOIN roles r ON u.rol_id = r.id
        WHERE u.correo = ?
        LIMIT 1"
    );

    $consulta->bind_param("s", $correo);
    $consulta->execute();

    $resultado = $consulta->get_result();

    if ($resultado->num_rows === 0) {
        http_response_code(401);

        echo json_encode([
            "ok" => false,
            "mensaje" => "El correo o la contraseña son incorrectos."
        ]);

        exit;
    }

    $usuario = $resultado->fetch_assoc();

    if ((int) $usuario["activo"] !== 1) {
        http_response_code(403);

        echo json_encode([
            "ok" => false,
            "mensaje" => "Esta cuenta se encuentra inactiva."
        ]);

        exit;
    }

    if (!password_verify($password, $usuario["password"])) {
        http_response_code(401);

        echo json_encode([
            "ok" => false,
            "mensaje" => "El correo o la contraseña son incorrectos."
        ]);

        exit;
    }

    unset($usuario["password"]);

    echo json_encode([
        "ok" => true,
        "mensaje" => "Inicio de sesión exitoso.",
        "usuario" => $usuario
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