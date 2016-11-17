// PRODUCTOS


miAplicacion.controller('controlProductoAlta',function($scope, FileUploader, $http, $state, cargadorDeFotoProd, fProductos){

      $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
      $scope.uploader.queueLimit = 1;

      $scope.producto={};
      $scope.producto.descripcion= "producto" ;
      $scope.producto.precio=0 ;
      $scope.producto.foto="default.jpg";

      cargadorDeFotoProd.CargarFoto($scope.producto.foto,$scope.uploader);
      
      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.producto);

          fProductos.Agregar(dato)
          .then(function(respuesta) {             
               console.log("Se agrego el id "+respuesta);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoGrilla',function($scope, $http, $state, $auth, fProductos){
  $scope.UsuarioLogueado={};
  
  if($auth.isAuthenticated()){
    console.log("Sesión iniciada!");
    $scope.UsuarioLogueado= $auth.getPayload();
    console.info($scope.UsuarioLogueado);
  }
  else{
    console.log("No hay sesión!");
    $state.go('login');
  }

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };


    fProductos.traerTodo()
    .then(function(respuesta) {       
         $scope.ListadoProductos = respuesta;
    },function errorCallback(response) {
         $scope.ListadoProductos = [];
        console.log(response);     
    });

  $scope.Borrar=function(producto){
    var dato=JSON.stringify(producto);
    fProductos.Borrar(dato)
         .then(function(respuesta) {              
                 console.log("Producto borrado");
                  fProductos.traerTodo()
                  .then(function(respuesta) {       
                       $scope.ListadoProductos = respuesta;
                  },function errorCallback(response) {
                       $scope.ListadoProductos = [];
                      console.log( response);     
                  });
          },function errorCallback(response) {        
              console.log(response);           
      });
  }

  $scope.Modificar = function(producto){
    console.log( JSON.stringify(producto));
    var dato=JSON.stringify(producto);
    $state.go('persona.prodModificar', {producto:dato});
  }

  $scope.Informar = function(producto){
    console.log( JSON.stringify(producto));
    var dato=JSON.stringify(producto);
    $state.go('persona.prodDetallar', {producto:dato});
  }
});

miAplicacion.controller('controlProductoModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFotoProd, fProductos){
  $scope.uploader = new FileUploader({url: 'servidor/uploadProd.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};
  $scope.producto.idProducto=dato.idProducto;
  $scope.producto.descripcion=dato.descripcion;
  $scope.producto.precio=dato.precio;
  $scope.producto.foto=dato.foto;

  cargadorDeFotoProd.CargarFoto($scope.producto.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='default.jpg')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.producto.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

      $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
           console.info('onErrorItem', fileItem, response, status, headers);
      };

      $scope.uploader.onCompleteAll = function() {
          var dato=JSON.stringify($scope.producto);

          fProductos.Modificar(dato)
          .then(function(respuesta) {             
               console.log(respuesta);
               $state.go("persona.menu");
          },function errorCallback(response) {        
               console.log( response);           
          });
      };

});

miAplicacion.controller('controlProductoDetallar',function($scope, $http, $state, $stateParams, fProductos){
  var dato=JSON.parse($stateParams.producto);
  $scope.producto={};

  fProductos.Detallar(dato.idProducto)
  .then(function(respuesta) {             
      $scope.producto = respuesta;
  },function errorCallback(response) {        
      console.log( response);           
  });

});