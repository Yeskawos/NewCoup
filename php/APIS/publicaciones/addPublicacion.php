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

    // Crear la consulta INSERT con los datos recibidos
    $consulta = "INSERT INTO Publicaciones (id_Usuario, rutaFoto, descripcion, fecha) VALUES (?, ?, ?, NOW())";

    if ($stmt = $conexion->prepare($consulta)) {
        $id_Usuario = $datos->id_Usuario ?? '';
        $descripcion = $datos->descripcion ?? '';
        $rutaFotos = $datos->rutaFotos ?? '';

        // Enlazar los parámetros
        $stmt->bind_param("iss", $id_Usuario, $rutaFotos, $descripcion);

                // Ejecutar la consulta
                if ($stmt->execute()) {
                    // Si la inserción fue exitosa, devuelve un mensaje de éxito y la cadena Base64 de la imagen
                    echo json_encode([
                        "success" => "Datos insertados correctamente.",
                        "rutaFotos" => $rutaFotos
                    ]);
                } else {
                    // Si hubo un error en la inserción, devuelve el mensaje de error de la base de datos
                    echo json_encode(["error" => "Error al insertar datos en la base de datos: " . $stmt->error]);
                }

                // Cerrar la declaración
                $stmt->close();
    } else {
        echo json_encode(["error" => "Error al preparar la consulta: " . $conexion->error]);
    }
} else {
    // Si la solicitud no es POST, devuelve un mensaje de error
    echo json_encode(["error" => "Se esperaba una solicitud POST."]);
}
