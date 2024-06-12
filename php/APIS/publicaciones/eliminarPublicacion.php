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

    // Verificar si se ha enviado el id_Publicacion
    if (isset($datos->id_Publicacion)) {
        $id_Publicacion = $datos->id_Publicacion;

        // Crear la consulta DELETE con el id_Publicacion recibido
        $consulta = "DELETE FROM Publicaciones WHERE id_Publicacion = ?";

        if ($stmt = $conexion->prepare($consulta)) {
            // Enlazar los parámetros
            $stmt->bind_param("i", $id_Publicacion);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Si la eliminación fue exitosa, devuelve un mensaje de éxito
                echo json_encode(["success" => "Publicación eliminada correctamente."]);
            } else {
                // Si hubo un error en la eliminación, devuelve el mensaje de error de la base de datos
                echo json_encode(["error" => "Error al eliminar la publicación: " . $stmt->error]);
            }

            // Cerrar la declaración
            $stmt->close();
        } else {
            echo json_encode(["error" => "Error al preparar la consulta: " . $conexion->error]);
        }
    } else {
        echo json_encode(["error" => "ID de publicación no proporcionado."]);
    }
} else {
    // Si la solicitud no es POST, devuelve un mensaje de error
    echo json_encode(["error" => "Se esperaba una solicitud POST."]);
}
?>
