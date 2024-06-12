<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $datos = json_decode(file_get_contents('php://input'));

    if (isset($datos->idUsuarioRemitente) && isset($datos->idUsuarioRecibe) && isset($datos->mensaje)) {
        $idUsuarioRemitente = intval($datos->idUsuarioRemitente);
        $idUsuarioRecibe = intval($datos->idUsuarioRecibe);
        $mensaje = $conexion->real_escape_string($datos->mensaje);

        $consulta = "INSERT INTO Mensajes (id_UsuarioRemitente, id_UsuarioRecibe, contenido, fecha) VALUES (?, ?, ?, NOW())";

        if ($stmt = $conexion->prepare($consulta)) {
            $stmt->bind_param("iis", $idUsuarioRemitente, $idUsuarioRecibe, $mensaje);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Mensaje enviado correctamente"]);
            } else {
                echo json_encode(["success" => false, "error" => "Error al enviar el mensaje: " . $stmt->error]);
            }

            $stmt->close();
        } else {
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta: " . $conexion->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Faltan datos en la solicitud"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Se esperaba una solicitud POST"]);
}

$conexion->close();