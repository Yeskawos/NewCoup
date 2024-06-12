<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
    $dbhost="localhost";
    $dbuser="root";
    $dbpass="1234";

    // $dbhost="localhost:3306";
    // $dbuser="Cordoba";
    // $dbpass="^G9i1n6s4";

        // Crear conexión
        $conexion = new mysqli($dbhost, $dbuser, $dbpass);

        // Verificar conexión
        if ($conexion->connect_error) {
            die("Error de conexión a MySQL: " . $conexion->connect_error);
        }
    
        echo "Conexión exitosa";
