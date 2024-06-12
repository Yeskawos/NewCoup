<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos POST y GET desde cualquier origen
header("Access-Control-Allow-Methods: POST, GET");
// Permitir el contenido de la solicitud en el cuerpo
header("Access-Control-Allow-Headers: Content-Type");

// Incluir el archivo de conexión a la base de datos
// include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

include('../../conexion/conexionBDD.php');

$conexion->select_db("newcoup");

// Verificar si se ha enviado una solicitud GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Leer los datos enviados desde Angular
    $id_Usuario = isset($_GET['id_Usuario']) ? intval($_GET['id_Usuario']) : null;

    if ($id_Usuario !== null) {
        // Crear la consulta SELECT para obtener las coincidencias
        $consulta = "SELECT id_Coincidencia, id_Usuario2 FROM Coincidencias WHERE id_Usuario1 = ? UNION SELECT id_Coincidencia, id_Usuario1 FROM Coincidencias WHERE id_Usuario2 = ?";
        
        if ($stmt = $conexion->prepare($consulta)) {
            // Enlazar los parámetros
            $stmt->bind_param("ii", $id_Usuario, $id_Usuario);

            // Ejecutar la consulta
            $stmt->execute();
            
            // Obtener los resultados
            $resultado = $stmt->get_result();

            if ($resultado->num_rows > 0) {
                $coincidencias = [];
                while ($fila = $resultado->fetch_assoc()) {
                    $coincidencias[] = array(
                        "id_Coincidencia" => $fila['id_Coincidencia'],
                        "id_Usuario2" => $fila['id_Usuario2']
                    );
                }
                echo json_encode(["success" => true, "coincidencias" => $coincidencias]);
            } else {
                echo json_encode(["success" => false, "error" => "No se encontraron coincidencias para el id_Usuario proporcionado"]);
            }

            // Cerrar la declaración
            $stmt->close();
        } else {
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta: " . $conexion->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "El parámetro id_Usuario es requerido"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Se esperaba una solicitud GET"]);
}

// Cerrar la conexión a la base de datos
$conexion->close();
