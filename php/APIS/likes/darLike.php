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
    $datos = json_decode(file_get_contents('php://input'));

    if (isset($datos->id_Usuario1) && isset($datos->id_Usuario2)) {
        $id_Usuario1 = $datos->id_Usuario1;
        $id_Usuario2 = $datos->id_Usuario2;

        $consulta = "SELECT likes FROM Usuarios WHERE id_Usuario = ?";
        if ($stmt = $conexion->prepare($consulta)) {
            $stmt->bind_param("i", $id_Usuario1);
            $stmt->execute();
            $stmt->bind_result($likes);
            $stmt->fetch();
            $stmt->close();

            // Verificar ID está en el campo 'likes'
            if (empty($likes)) {
                $likesArray = [];
            } else {
                $likesArray = explode(',', $likes);
            }

            if (!in_array($id_Usuario2, $likesArray)) {
                // Agregar ID al campo 'likes'
                $likesArray[] = $id_Usuario2;
                $newLikes = implode(',', $likesArray);

                // Actualizar la base de datos con el nuevo campo 'likes'
                $updateQuery = "UPDATE Usuarios SET likes = ? WHERE id_Usuario = ?";
                if ($updateStmt = $conexion->prepare($updateQuery)) {
                    $updateStmt->bind_param("si", $newLikes, $id_Usuario1);
                    if ($updateStmt->execute()) {
                        echo json_encode(["success" => "Like agregado correctamente."]);
                    } else {
                        echo json_encode(["error" => "Error al actualizar los likes: " . $updateStmt->error]);
                    }
                    $updateStmt->close();
                } else {
                    echo json_encode(["error" => "Error al preparar la consulta de actualización: " . $conexion->error]);
                }
            } else {
                echo json_encode(["message" => "El usuario ya está en la lista de likes."]);
            }
        } else {
            echo json_encode(["error" => "Error al preparar la consulta de selección: " . $conexion->error]);
        }
    } else {
        echo json_encode(["error" => "Datos incompletos."]);
    }
} else {
    echo json_encode(["error" => "Se esperaba una solicitud POST."]);
}
