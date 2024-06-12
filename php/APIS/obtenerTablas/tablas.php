<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos POST y GET desde cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Permitir el contenido de la solicitud en el cuerpo
header("Access-Control-Allow-Headers: Content-Type");

// Asegurarse de que el tipo de contenido es JSON
header('Content-Type: application/json');

// Manejar las solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Incluir el archivo de conexión a la base de datos
include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

// Obtener la lista de tablas en la base de datos
$resultado = $conexion->query("SHOW TABLES");

// Crear un array para almacenar el nombre de las tablas
$tablas = array();

// Verificar si se obtuvo un resultado válido
if ($resultado !== false && $resultado->num_rows > 0) {
    // Iterar sobre el resultado y almacenar los nombres de las tablas en el array
    while ($fila = $resultado->fetch_row()) {
        $tablas[] = $fila[0];
    }
    // Devolver el array de nombres de tablas como respuesta JSON a Angular
    echo json_encode(["tablas" => $tablas]);
} else {
    // En caso de error, devolver un mensaje de error como respuesta JSON
    echo json_encode(["error" => "Error al obtener la lista de tablas"]);
}

// Cerrar la conexión a la base de datos
$conexion->close();
?>
