<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos GET desde cualquier origen
header("Access-Control-Allow-Methods: GET");
// Permitir el contenido de la solicitud en el cuerpo
header("Access-Control-Allow-Headers: Content-Type");

// Incluir el archivo de conexión a la base de datos
//include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

 include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

// Verificar si se ha enviado una solicitud GET y si los campos 'max_id' y 'genero' están presentes
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['max_id']) && isset($_GET['genero'])) {
    $max_id = $_GET['max_id'];
    $genero = $_GET['genero'];

    // Crear la consulta SELECT para obtener usuarios con id mayor al proporcionado y con el genero especificado
    $consulta = $conexion->prepare("SELECT * FROM Usuarios WHERE genero = ? AND id_Usuario > ?");
    //id_Usuario, tipoCuenta, preferencias, likes
    $consulta->bind_param("si", $genero, $max_id);

    if ($consulta->execute()) {
        $resultado = $consulta->get_result();
        if ($resultado->num_rows > 0) {
            $fila = $resultado->fetch_assoc();
            
            // Incluir la imagen en base64 en la respuesta
            if (!empty($fila['rutaFotos'])) {
                $fila['imagenBase64'] = $fila['rutaFotos'];
            } else {
                $fila['imagenBase64'] = null;
            }

            echo json_encode($fila);
        } else {
            echo json_encode(["error" => "No se encontraron usuarios con el ID y género especificados"]);
        }
    } else {
        echo json_encode(["error" => "Error al ejecutar la consulta: " . $consulta->error]);
    }

    // Cerrar la declaración
    $consulta->close();
} else {
    // Si la solicitud no es GET o no se proporcionaron los campos max_id y genero, devuelve un mensaje de error
    echo json_encode(["error" => "Se esperaba una solicitud GET con los campos 'max_id' y 'genero'"]);
}