
<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once "conexion.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);
    exit;
}

$datos = json_decode(file_get_contents("php://input"), true);

$nombre = trim($datos["nombre"] ?? "");
$correo = trim($datos["correo"] ?? "");
$password = $datos["password"] ?? "";

if ($nombre === "" || $correo === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Todos los campos son obligatorios."
    ]);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "El correo electrónico no es válido."
    ]);
    exit;
}

if (strlen($password) < 8) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "La contraseña debe tener al menos 8 caracteres."
    ]);
    exit;
}

$rol_id = 3;

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, correo, password, rol_id)
        VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error al preparar la consulta."
    ]);
    exit;
}

$stmt->bind_param("sssi", $nombre, $correo, $password_hash, $rol_id);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Usuario registrado correctamente."
    ]);
} else {
    if ($stmt->errno === 1062) {
        http_response_code(409);
        echo json_encode([
            "success" => false,
            "message" => "El correo electrónico ya está registrado."
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "No se pudo registrar el usuario."
        ]);
    }
}

$stmt->close();
$conn->close();

?>