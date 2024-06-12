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

    if (isset($datos->id_Usuario1) && isset($datos->id_Usuario2)) {
        $id_Usuario1 = intval($datos->id_Usuario1);
        $id_Usuario2 = intval($datos->id_Usuario2);

        // Crear la consulta SELECT para obtener los mensajes entre los dos usuarios
        $consulta = "SELECT * FROM Mensajes 
                     WHERE (id_UsuarioRemitente = ? AND id_UsuarioRecibe = ?) 
                     OR (id_UsuarioRemitente = ? AND id_UsuarioRecibe = ?)
                     ORDER BY fecha ASC";

        if ($stmt = $conexion->prepare($consulta)) {
            // Enlazar los parámetros
            $stmt->bind_param("iiii", $id_Usuario1, $id_Usuario2, $id_Usuario2, $id_Usuario1);

            // Ejecutar la consulta
            $stmt->execute();

            // Obtener el resultado
            $resultado = $stmt->get_result();

            if ($resultado->num_rows > 0) {
                $mensajes = [];
                while ($fila = $resultado->fetch_assoc()) {
                    $mensajes[] = $fila;
                }
                echo json_encode(["success" => true, "mensajes" => $mensajes]);
            } else {
                echo json_encode(["success" => false, "error" => "No se encontraron mensajes entre los usuarios."]);
            }

            // Cerrar la declaración
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta: " . $conexion->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Los parámetros id_Usuario1 e id_Usuario2 son requeridos."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Se esperaba una solicitud POST."]);
}

// Cerrar la conexión a la base de datos
$conexion->close();