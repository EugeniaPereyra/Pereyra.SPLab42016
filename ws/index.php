<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';
require_once '../servidor/clases/Usuario.php';
require_once '../servidor/clases/Producto.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/*
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
 */

//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- USUARIOS ------

// TRAE TODOS
$app->get('/usuarios[/]', function ($request, $response, $args) {
    $respuesta['listado']=Usuario::TraerTodosLosUsuarios();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/usuario/{id}', function ($request, $response, $args) {
    $respuesta=Usuario::TraerUnUsuarioPorId($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/usuario/{usuario}', function ($request, $response, $args) {
    $persona=json_decode($args["usuario"]);
    if($persona->foto!="pordefecto.png")
    {
        $rutaVieja="../fotos/".$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotos/".$rutaNueva);
        unlink($rutaVieja);
        $persona->foto=$rutaNueva;
    }
    $response->write(Usuario::Agregar($persona));
    return $response;
});

// MODIFICA UNO
$app->put('/usuario/{usuario}', function ($request, $response, $args) {
    $persona=json_decode($args["usuario"]);
    if($persona->foto!="pordefecto.png")
    {
        $rutaVieja="../fotos/".$persona->foto;
        $rutaNueva=$persona->dni.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotos/".$rutaNueva);
        unlink($rutaVieja);
        $persona->foto=$rutaNueva;
    }
    $response->write(Usuario::Modificar($persona));
    return $response;
});

// BORRA UNO
$app->delete('/usuario/{usuario}', function ($request, $response, $args) {
    $persona=json_decode($args["usuario"]);
    if($persona->foto!="pordefecto.png")
    {
        unlink("../fotos/".$persona->foto);
    }
    $response->write(Usuario::Eliminar($persona->idPersona));
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------

//---- PRODUCTOS ------

// TRAE TODOS
$app->get('/productos[/]', function ($request, $response, $args) {
    $respuesta['listado']=Producto::TraerTodosLosProductos();
    $response->write(json_encode($respuesta));
    return $response;
});


// TRAE UNO
$app->get('/producto/{id}', function ($request, $response, $args) {
    $respuesta=Producto::TraerUnProducto($args["id"]);
    $response->write(json_encode($respuesta));
    return $response;
});


// ALTA
$app->post('/producto/{producto}', function ($request, $response, $args){
    $producto=json_decode($args["producto"]);
    if($producto->foto!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto;
        $rutaNueva=$producto->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto=$rutaNueva;
    }
    $response->write(Producto::Insertar($producto));
    return $response;
});

// MODIFICA UNO
$app->put('/producto/{producto}', function ($request, $response, $args) {
    $producto=json_decode($args["producto"]);
    if($producto->foto!="default.jpg")
    {
        $rutaVieja="../fotosProd/".$producto->foto;
        $rutaNueva=$producto->descripcion.".".PATHINFO($rutaVieja, PATHINFO_EXTENSION);
        copy($rutaVieja, "../fotosProd/".$rutaNueva);
        unlink($rutaVieja);
        $producto->foto=$rutaNueva;
    }
    $response->write(Producto::Modificar($producto));
    return $response;
});

// BORRA UNO
$app->delete('/producto/{producto}', function ($request, $response, $args) {
    $producto=json_decode($args["producto"]);
    if($producto->foto!="default.jpg")
    {
        unlink("../fotosProd/".$producto->foto);
    }
    $response->write(Producto::Borrar($producto->idProducto));
    return $response;
});


//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------
//---------------------------------------------------------------------


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
