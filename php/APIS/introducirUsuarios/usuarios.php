<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir los métodos POST desde cualquier origen
header("Access-Control-Allow-Methods: POST");
// Permitir el contenido de la solicitud en el cuerpo (incluido el correo electrónico)
header("Access-Control-Allow-Headers: Content-Type");
// Conexión a la base de datos (código del paso anterior)
include('../conexion/conexionBDD.php');
// Verifica si se han enviado datos mediante POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibe los datos del formulario como JSON
    $datos = json_decode(file_get_contents("php://input"), true);

    // Define un array para almacenar los valores a insertar
    $valores = [];

    // Define un array con los nombres de los campos en la tabla Usuarios
    $campos = ['id_Usuario', 'genero', 'orientacionSexual', 'nombreUsuario', 'contraseña', 'edad', 'correoElectronico', 'telefono', 'tipoCuenta', 'fechaNacimiento', 'localizacion', 'preferencias', 'intereses', 'descripcion', 'likes', 'rutaFotos'];

    // Itera sobre cada campo y verifica si está presente en los datos recibidos
    foreach ($campos as $campo) {
        // Si el campo está presente en los datos y tiene un valor definido, lo añade al array de valores
        if (isset($datos[$campo])) {
            $valores[$campo] = $datos[$campo];
        } else {
            // Si el campo no está presente o no tiene un valor definido, lo establece como NULL
            $valores[$campo] = null;
        }
    }

    // Prepara la consulta SQL para insertar un nuevo usuario
    $consulta = "INSERT INTO Usuarios (id_Usuario, genero, orientacionSexual, nombreUsuario, contraseña, edad, correoElectronico, telefono, tipoCuenta, fechaNacimiento, localizacion, preferencias, intereses, descripcion, likes, rutaFotos) VALUES (:idUsuario, :genero, :orientacionSexual, :nombreUsuario, :contraseña, :edad, :correoElectronico, :telefono, :tipoCuenta, :fechaNacimiento, :localizacion, :preferencias, :intereses, :descripcion, :likes, :rutaFotos)";

    // Prepara la sentencia SQL
    $stmt = $pdo->prepare($consulta);

    // Ejecuta la sentencia SQL con los valores proporcionados
    $stmt->execute($valores);

    // Retorna una respuesta (puedes modificarla según tus necesidades)
    echo json_encode(['mensaje' => 'Usuario insertado correctamente']);
} else {
    // Si no se reciben datos mediante POST, retorna un error
    http_response_code(400);
    echo json_encode(['error' => 'No se han proporcionado datos']);
}
