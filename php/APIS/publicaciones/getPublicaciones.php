<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos POST desde cualquier origen
header("Access-Control-Allow-Methods: GET");
// Permitir el contenido de la solicitud en el cuerpo
header("Access-Control-Allow-Headers: Content-Type");

// Incluir el archivo de conexión a la base de datos
// include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

// Verificar si se ha enviado una solicitud GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener el ID del usuario de la solicitud
    $idUsuario = $_GET['id'] ?? null;

    // Verificar si se proporcionó un ID de usuario válido
    if ($idUsuario !== null) {
        // Crear la consulta SQL para obtener las publicaciones del usuario
        $consulta = "SELECT rutaFoto AS Foto, descripcion, id_Publicacion FROM Publicaciones WHERE id_Usuario = ?";

        // Preparar la consulta
        $stmt = $conexion->prepare($consulta);

        // Enlazar el parámetro ID del usuario
        $stmt->bind_param("i", $idUsuario);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            // Obtener el resultado de la consulta
            $resultados = $stmt->get_result();

            // Crear un array para almacenar las publicaciones del usuario
            $publicaciones = [];

            // Iterar sobre los resultados y agregarlos al array de publicaciones
            while ($fila = $resultados->fetch_assoc()) {
                $publicaciones[] = $fila;
            }

            // Devolver las publicaciones como JSON
            echo json_encode($publicaciones);
        } else {
            // Si la consulta no se ejecuta correctamente, devolver un error
            http_response_code(500);
            echo json_encode(["error" => "Error al ejecutar la consulta: " . $stmt->error]);
        }

        // Cerrar la consulta y la conexión a la base de datos
        $stmt->close();
        $conexion->close();
    } else {
        // Si no se proporciona un ID de usuario válido, devolver un error
        http_response_code(400);
        echo json_encode(["error" => "ID de usuario no válido."]);
    }
} else {
    // Si la solicitud no es GET, devolver un error
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido. Se esperaba una solicitud GET."]);
}
