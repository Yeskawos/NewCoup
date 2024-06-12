<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
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

        // Comprobar si ya existe una coincidencia
        $consultaCheck = "SELECT COUNT(*) as count FROM Coincidencias WHERE (id_Usuario1 = ? AND id_Usuario2 = ?) OR (id_Usuario1 = ? AND id_Usuario2 = ?)";
        if ($stmtCheck = $conexion->prepare($consultaCheck)) {
            // Enlazar los parámetros
            $stmtCheck->bind_param("iiii", $id_Usuario1, $id_Usuario2, $id_Usuario2, $id_Usuario1);

            // Ejecutar la consulta
            $stmtCheck->execute();

            // Obtener el resultado
            $resultadoCheck = $stmtCheck->get_result();
            $rowCheck = $resultadoCheck->fetch_assoc();

            if ($rowCheck['count'] > 0) {
                // Si ya existe la coincidencia, devuelve un mensaje indicando que ya existe
                echo json_encode(["success" => false, "error" => "La coincidencia ya existe."]);
            } else {
                // Crear la consulta INSERT para insertar la coincidencia
                $consultaInsert = "INSERT INTO Coincidencias (id_Usuario1, id_Usuario2, fecha) VALUES (?, ?, NOW())";

                if ($stmtInsert = $conexion->prepare($consultaInsert)) {
                    // Enlazar los parámetros
                    $stmtInsert->bind_param("ii", $id_Usuario1, $id_Usuario2);

                    // Ejecutar la consulta
                    if ($stmtInsert->execute()) {
                        // Si la inserción fue exitosa, devuelve un mensaje de éxito
                        echo json_encode(["success" => true, "message" => "Coincidencia creada correctamente."]);
                    } else {
                        // Si hubo un error en la inserción, devuelve el mensaje de error de la base de datos
                        echo json_encode(["success" => false, "error" => "Error al insertar datos en la base de datos: " . $stmtInsert->error]);
                    }

                    // Cerrar la declaración
                    $stmtInsert->close();
                } else {
                    echo json_encode(["success" => false, "error" => "Error al preparar la consulta: " . $conexion->error]);
                }
            }

            // Cerrar la declaración
            $stmtCheck->close();
        } else {
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta de verificación: " . $conexion->error]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Los parámetros id_Usuario1 e id_Usuario2 son requeridos."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Se esperaba una solicitud POST."]);
}

// Cerrar la conexión a la base de datos
$conexion->close();