<?
include('../conexion/conexionBDD.php');  // conecta a la base de datos

$conexion->query("CREATE DATABASE IF NOT EXISTS NewCoup");

//Llamada a las funciones
crearTablaUsuarios( $conexion );
crearTablaPublicacion($conexion);
crearTablaHashtag($conexion);
crearTablaHashtag_Usuario($conexion);
crearTablaPublicacion_Hashtag($conexion);
crearTablaMensajes($conexion);
crearTablaCoincidencias($conexion);
crearTablaRelacion_Esporadica($conexion);


function crearTablaUsuarios( $conexion ) {

    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Usuarios");
    if($resultado !== false && $resultado->num_rows > 0){
        
    }else{
        $consulta = "CREATE TABLE Usuarios(
            id_Usuario INT AUTO_INCREMENT PRIMARY KEY,
            genero VARCHAR(255),
            orientacionSexual VARCHAR(255),
            nombreUsuario VARCHAR(20),
            contraseña VARCHAR(255),
            edad INT,
            correoElectronico VARCHAR(100), 
            telefono INT(9),
            tipoCuenta ENUM('user', 'admin'), 
            fechaNacimiento Date,
            localizacion Varchar(20),
            preferencias Varchar(255),
            intereses Varchar(255),
            descripcion Varchar(255),
            likes Varchar(255),
            rutaFotos VARCHAR(255)
        )";
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Usuarios creada exitosamente.";
        } else {
            echo "Error al crear la tabla Usuarios: " . $conexion->error;
        }
    }

}

function crearTablaPublicacion($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Publicaciones");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Publicaciones (
            id_Publicacion INT AUTO_INCREMENT PRIMARY KEY,
            descripcion VARCHAR(255),
            fecha DATE,
            rutaFoto VARCHAR(255),
            id_Usuario INT,
            FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario) 
        )";
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Publicaciones creada exitosamente.";
        } else {
            echo "Error al crear la tabla Publicaciones: " . $conexion->error;
        }
    }
}

function crearTablaHashtag($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Hashtags");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Hashtags (
            id_Hashtag INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(20) NOT NULL
        )";
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Hashtags creada exitosamente.";
        } else {
            echo "Error al crear la tabla Hashtags: " . $conexion->error;
        }
    }
}

function crearTablaHashtag_Usuario($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Usuario_Hashtags");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Usuario_Hashtags (
            id_Hashtag INT,
            id_Usuario INT,
            PRIMARY KEY (id_Hashtag, id_Usuario),
            FOREIGN KEY (id_Hashtag) REFERENCES Hashtags(id_Hashtag),
            FOREIGN KEY (id_Usuario) REFERENCES Usuarios(id_Usuario)
        )";        
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Usuario_Hashtags creada exitosamente.";
        } else {
            echo "Error al crear la tabla Usuario_Hashtags: " . $conexion->error;
        }
    }
}

function crearTablaPublicacion_Hashtag($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Publicacion_Hashtag");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Publicacion_Hashtag (
            id_Publicacion INT,
            id_Hashtag INT,
            PRIMARY KEY (id_Hashtag, id_Publicacion),
            FOREIGN KEY (id_Hashtag) REFERENCES Hashtags(id_Hashtag),
            FOREIGN KEY (id_Publicacion) REFERENCES Publicaciones(id_Publicacion)
        )";        
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Publicacion_Hashtag creada exitosamente.";
        } else {
            echo "Error al crear la tabla Publicacion_Hashtag: " . $conexion->error;
        }
    }
}


function crearTablaMensajes($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Mensajes");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Mensajes (
            id_UsuarioRemitente INT,
            id_UsuarioRecibe INT,
            id_Mensaje INT,
            contenido VARCHAR(255),
            fecha Date,
            PRIMARY KEY (id_UsuarioRemitente, id_UsuarioRecibe, id_Mensaje),
            FOREIGN KEY (id_UsuarioRemitente) REFERENCES Usuarios(id_Usuario),
            FOREIGN KEY (id_UsuarioRecibe) REFERENCES Usuarios(id_Usuario)
        )";        
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Mensajes creada exitosamente.";
        } else {
            echo "Error al crear la tabla Mensajes: " . $conexion->error;
        }
    }
}


function crearTablaCoincidencias($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Coincidencias");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Coincidencias (
            id_Coincidencia INT AUTO_INCREMENT,
            id_Usuario1 INT,
            id_Usuario2 INT,
            fecha DATE,
            PRIMARY KEY (id_Coincidencia, id_Usuario1, id_Usuario2),
            FOREIGN KEY (id_Usuario1) REFERENCES Usuarios(id_Usuario),
            FOREIGN KEY (id_Usuario2) REFERENCES Usuarios(id_Usuario)
        )";       
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Coincidencias creada exitosamente.";
        } else {
            echo "Error al crear la tabla Coincidencias: " . $conexion->error;
        }
    }
}


function crearTablaRelacion_Esporadica($conexion) {
    $conexion->select_db("NewCoup");

    $resultado = $conexion->query("SELECT * FROM Relacion_Esporadica");
    if ($resultado !== false && $resultado->num_rows > 0) {
        // La tabla ya existe, no es necesario hacer nada
    } else {
        $consulta = "CREATE TABLE Relacion_Esporadica (
            id_Relacion INT AUTO_INCREMENT,
            id_Usuario1 INT,
            id_Usuario2 INT,
            fecha Date,
            tipo VARCHAR(20),
            PRIMARY KEY (id_Relacion, id_Usuario1, id_Usuario2),
            FOREIGN KEY (id_Usuario1) REFERENCES Usuarios(id_Usuario),
            FOREIGN KEY (id_Usuario2) REFERENCES Usuarios(id_Usuario)
        )";        
        if ($conexion->query($consulta) === TRUE) {
            echo "Tabla Relacion_Esporadica creada exitosamente.";
        } else {
            echo "Error al crear la tabla Relacion_Esporadica: " . $conexion->error;
        }
    }
}



// MARCOS CÓRDOBA HARO 2024