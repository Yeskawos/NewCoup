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

    $nombre = $datos->userName;

    // Crear la consulta INSERT con los datos recibidos
    $consulta = "INSERT INTO Usuarios (genero, orientacionSexual, nombreUsuario, contraseña, edad, correoElectronico, telefono, tipoCuenta, fechaNacimiento, localizacion, preferencias, intereses, descripcion, likes, rutaFotos) VALUES ";


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

        $rutaFotosBase64 = $datos->rutaFotos ?? '';

         // Decodificar la cadena Base64
        $rutaFotos = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $rutaFotosBase64));

        // Agregar los valores de cada usuario a la consulta
        $consulta .= "('$genero', '$orientacionSexual', '$nombreUsuario', '$contraseña', '$edad', '$correoElectronico', '$telefono', '$tipoCuenta', '$fechaNacimiento', '$localizacion', '$preferencias', '$intereses', '$descripcion', '$likes', '$rutaFotos'),";
    // Eliminar la coma sobrante al final de la consulta
    $consulta = rtrim($consulta, ',');

    // Devolver la consulta como respuesta
    // echo json_encode(["consulta" => $consulta]);



    // Ejecutar la consulta en la base de datos
    if ($conexion->query($consulta) === TRUE) {
        // Si la inserción fue exitosa, devuelve un mensaje de éxito
        echo json_encode(["success" => "Datos insertados correctamente."]);
    } else {
        // Si hubo un error en la inserción, devuelve el mensaje de error de la base de datos
        echo json_encode(["error" => "Error al insertar datos en la base de datos: " . $conexion->error]);
    }
} else {
    // Si la solicitud no es POST, devuelve un mensaje de error
    echo json_encode(["error" => "Se esperaba una solicitud POST."]);
}


