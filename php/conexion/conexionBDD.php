<?
    $dbhost="localhost";
    $dbuser="root";
    $dbpass="1234";

    $conexion = new mysqli($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . $conexion->error.'<br>');

    $contraDefault = password_hash('1234', PASSWORD_DEFAULT);