<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos POST desde cualquier origen
header("Access-Control-Allow-Methods: POST");
// Permitir el contenido de la solicitud en el cuerpo
header("Access-Control-Allow-Headers: Content-Type");

// Incluir el archivo de conexión a la base de datos
include('C:/Apache24/htdocs/TFG/conexion/conexionBDD.php');

$conexion->select_db("NewCoup");

// Verificar si se ha enviado una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer los datos enviados desde Angular
    $datos = json_decode(file_get_contents('php://input'));

    // Crear la consulta INSERT con los datos recibidos
    $consulta = "INSERT INTO Usuarios (genero, orientacionSexual, nombreUsuario, contraseña, edad, correoElectronico, telefono, tipoCuenta, fechaNacimiento, localizacion, preferencias, intereses, descripcion, likes, rutaFotos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conexion->prepare($consulta)) {
        $genero = $datos->genero ?? '';
        $orientacionSexual = $datos->orientacionSexual ?? '';
        $nombreUsuario = $datos->userName ?? '';
        $contraseña = password_hash($datos->password, PASSWORD_DEFAULT);
        $edad = $datos->edad ?? '';
        $correoElectronico = $datos->correo ?? '';
        $telefono = $datos->telefono ?? '';
        $tipoCuenta = $datos->tipoCuenta ?? 'user';
        $fechaNacimiento = $datos->fechaNacimiento ?? '';
        $localizacion = $datos->localizacion ?? '';
        $preferencias = $datos->preferencias ?? '';
        $intereses = $datos->intereses ?? '';
        $descripcion = $datos->descripcion ?? '';
        $likes = $datos->likes ?? '';
        $rutaFotos = $datos->rutaFotos ?? '';

        // Enlazar los parámetros
        $stmt->bind_param("ssssissssssssss", $genero, $orientacionSexual, $nombreUsuario, $contraseña, $edad, $correoElectronico, $telefono, $tipoCuenta, $fechaNacimiento, $localizacion, $preferencias, $intereses, $descripcion, $likes, $rutaFotos);

        $consultaCorreo = $conexion->prepare("SELECT * FROM Usuarios WHERE correoElectronico = ?");
        $consultaCorreo->bind_param("s", $correoElectronico);
        $consultaCorreo->execute();
        $resultadoCorreo = $consultaCorreo->get_result();

        if ($resultadoCorreo->num_rows > 0) {
            // Si el correo electrónico ya existe, devuelve un mensaje de error
            echo json_encode(["error" => "El correo electrónico ya está registrado."]);
        } else {
            $consultaTelefono = $conexion->prepare("SELECT * FROM Usuarios WHERE telefono = ?");
            $consultaTelefono->bind_param("s", $telefono);
            $consultaTelefono->execute();
            $resultadoTelefono = $consultaTelefono->get_result();

            if ($resultadoTelefono->num_rows > 0) {
                // Si el teléfono ya existe, devuelve un mensaje de error
                echo json_encode(["error" => "El teléfono ya está registrado."]);
                exit; // Termina la ejecución de la API
            }else{
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
            }
        }
    } else {
        echo json_encode(["error" => "Error al preparar la consulta: " . $conexion->error]);
    }
} else {
    // Si la solicitud no es POST, devuelve un mensaje de error
    echo json_encode(["error" => "Se esperaba una solicitud POST."]);
}
