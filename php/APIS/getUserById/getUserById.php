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

    if (isset($datos->ids)) {
        $ids = $datos->ids;
        $ids = implode(',', array_map('intval', $ids)); // Asegurarse de que los IDs sean enteros

        // Crear la consulta SELECT para obtener la información de los usuarios
        $consulta = "SELECT id_Usuario, nombreUsuario, genero, edad, descripcion, rutaFotos FROM Usuarios WHERE id_Usuario IN ($ids)";
        $resultado = $conexion->query($consulta);

        if ($resultado->num_rows > 0) {
            $usuarios = [];
            while ($fila = $resultado->fetch_assoc()) {
                $usuarios[] = $fila;
            }
            echo json_encode(["success" => true, "usuarios" => $usuarios]);
        } else {
            echo json_encode(["success" => false, "error" => "No se encontraron usuarios con los IDs proporcionados"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "IDs de usuarios no proporcionados"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Se esperaba una solicitud POST"]);
}

// Cerrar la conexión a la base de datos
$conexion->close();
