<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['correoElectronico']) && isset($data['contrasenya'])) {
        $correoElectronico = $data['correoElectronico'];
        $contrasenya = $data['contrasenya'];

        $consulta = $conexion->prepare("SELECT * FROM Usuarios WHERE correoElectronico = ?");
        $consulta->bind_param("s", $correoElectronico);

        if ($consulta->execute()) {
            $resultado = $consulta->get_result();
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                if (password_verify($contrasenya, $fila['contraseña'])) {
                    echo json_encode(["success" => "Inicio de sesión exitoso", "user" => $fila]);
                } else {
                    echo json_encode(["error" => "Contraseña incorrecta"]);
                }
            } else {
                echo json_encode(["error" => "Correo electrónico no encontrado"]);
            }
        } else {
            echo json_encode(["error" => "Error al ejecutar la consulta: " . $consulta->error]);
        }
        $consulta->close();
    } else {
        echo json_encode(["error" => "Faltan campos obligatorios"]);
    }
} else {
    echo json_encode(["error" => "Se esperaba una solicitud POST"]);
}