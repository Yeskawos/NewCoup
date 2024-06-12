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

// Verificar si se ha enviado una solicitud GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Verificar si se ha enviado el parámetro 'tabla' en la URL
    if(isset($_GET['tabla'])) {
        // Obtener el nombre de la tabla desde la URL
        $tabla = $_GET['tabla'];

        // Consulta para obtener los nombres de los campos de la tabla especificada
        $consulta = "DESCRIBE $tabla";

        // Ejecutar la consulta
        $resultado = $conexion->query($consulta);

        if ($resultado) {
            // Array para almacenar los nombres de los campos
            $campos = array();

            // Recorrer el resultado y guardar los nombres de los campos en el array
            while ($fila = $resultado->fetch_assoc()) {
                $campos[] = $fila['Field'];
            }

            // Devolver la lista de campos como respuesta
            echo json_encode($campos);
        } else {
            // Si la consulta no se ejecuta correctamente, devolver un mensaje de error
            echo json_encode(["error" => "Error al obtener los campos de la tabla: " . $conexion->error]);
        }
    } else {
        // Si no se proporciona el parámetro 'tabla', devolver un mensaje de error
        echo json_encode(["error" => "Debe proporcionar el nombre de la tabla como parámetro 'tabla' en la URL."]);
    }
} else {
    // Si la solicitud no es GET, devolver un mensaje de error
    echo json_encode(["error" => "Se esperaba una solicitud GET."]);
}
?>