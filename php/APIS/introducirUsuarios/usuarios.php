<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('../../conexion/conexionBDD.php');

if ($conexion->connect_error) {
    echo json_encode(["error" => "Error de conexión a MySQL: " . $conexion->connect_error]);
    exit();
}

$conexion->select_db("newcoup");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'));

$query = "INSERT INTO Usuarios (genero, orientacionSexual, nombreUsuario, contraseña, edad, correoElectronico, telefono, tipoCuenta, fechaNacimiento, localizacion, preferencias, descripcion, likes, rutaFotos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conexion->prepare($query)) {
        $stmt->bind_param("ssssisssssssss", $data->genero, $data->orientacionSexual, $data->userName, password_hash($data->password, PASSWORD_DEFAULT), $data->edad, $data->correo, $data->telefono, $data->tipoCuenta, $data->fechaNacimiento, $data->localizacion, $data->preferencias, $data->descripcion, $data->likes, $data->rutaFotos);


        $checkEmailQuery = $conexion->prepare("SELECT * FROM Usuarios WHERE correoElectronico = ?");
        $checkEmailQuery->bind_param("s", $data->correo);
        $checkEmailQuery->execute();
        $resultEmail = $checkEmailQuery->get_result();

        if ($resultEmail->num_rows > 0) {
            echo json_encode(["error" => "El correo electrónico ya está registrado."]);
        } else {
            $checkPhoneQuery = $conexion->prepare("SELECT * FROM Usuarios WHERE telefono = ?");
            $checkPhoneQuery->bind_param("s", $data->telefono);
            $checkPhoneQuery->execute();
            $resultPhone = $checkPhoneQuery->get_result();

            if ($resultPhone->num_rows > 0) {
                echo json_encode(["error" => "El teléfono ya está registrado."]);
                exit;
            } else {
                if ($stmt->execute()) {
                    echo json_encode([
                        "success" => "Datos insertados correctamente.",
                        "rutaFotos" => $data->rutaFotos
                    ]);
                } else {
                    echo json_encode(["error" => "Error al insertar datos en la base de datos: " . $stmt->error]);
                }

                $stmt->close();
            }
        }
        $checkEmailQuery->close();
    } else {
        echo json_encode(["error" => "Error al preparar la consulta: " . $conexion->error]);
    }
} else {
    echo json_encode(["error" => "Se esperaba una solicitud POST."]);
}

$conexion->close();
?>
