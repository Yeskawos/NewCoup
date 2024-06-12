<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos POST desde cualquier origen
header("Access-Control-Allow-Methods: POST");
// Permitir el contenido de la solicitud en el cuerpo
header("Access-Control-Allow-Headers: Content-Type");

// Incluir el archivo de conexión a la base de datos
// include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

// Verificar si se ha enviado una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer los datos enviados desde Angular
    $datos = json_decode(file_get_contents('php://input'));

    if (isset($datos->idUsuario)) {
        $idUsuario = $datos->idUsuario;

        // Crear la consulta SELECT para obtener el campo likes
        $consulta = $conexion->prepare("SELECT likes FROM Usuarios WHERE id_Usuario = ?");
        $consulta->bind_param("i", $idUsuario);

        if ($consulta->execute()) {
            $resultado = $consulta->get_result();
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                echo json_encode(["success" => true, "likes" => $fila['likes']]);
            } else {
                echo json_encode(["success" => false, "error" => "Usuario no encontrado"]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Error al ejecutar la consulta: " . $consulta->error]);
        }
        $consulta->close();
    } else {
        echo json_encode(["success" => false, "error" => "ID de usuario no proporcionado"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Se esperaba una solicitud POST"]);
}

// Cerrar la conexión a la base de datos
$conexion->close();