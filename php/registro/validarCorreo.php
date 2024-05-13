<?php

// Destinatario
$para = "destinatario@example.com";

// Asunto
$asunto = "Correo de prueba";

// Mensaje
$mensaje = "Hola, este es un correo de prueba.";

// Cabeceras
$cabeceras = "From: remitente@example.com" . "\r\n" .
             "Reply-To: remitente@example.com" . "\r\n" .
             "X-Mailer: PHP/" . phpversion();

// Envío del correo
if (mail($para, $asunto, $mensaje, $cabeceras)) {
    echo "Correo enviado correctamente.";
} else {
    echo "Error al enviar el correo.";
}
