miAplicacion.controller('controlInicio',function($scope){
});

miAplicacion.controller('controlLogin',function($scope, $auth, $state){

  $scope.dato={};

  $scope.Login=function(){

    $auth.login(
            {
              usuario:$scope.dato.usuario,
              nombre: $scope.dato.nombre,
              clave:$scope.dato.clave
            })

        .then( function(response){
          if($auth.isAuthenticated())
          {
            console.log("Logueado");
            console.info("Info login: ", $auth.getPayload());
            $state.go('persona.menu');
          }
          else
          {
            console.log("No logueado");
            console.info("Info login:",$auth.getPayload());
          }

        }, function(response){
           console.log(response);
        })
  }

  $scope.Administrador=function(){
    $scope.dato.usuario="admin@admin.com";
    $scope.dato.nombre="admin";
    $scope.dato.clave="321";
  }

  $scope.Vendedor=function(){
    $scope.dato.usuario="vend@vend.com";
    $scope.dato.nombre="vend";
    $scope.dato.clave="321";
  }

  $scope.Comprador=function(){
    $scope.dato.usuario="comp@comp.com";
    $scope.dato.nombre="comprador";
    $scope.dato.clave="123";
  }

});

// PERSONAS

miAplicacion.controller('controlPersona',function($scope, $auth, $state){
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

    $scope.Logout=function(){
      $auth.logout();
      $state.go('inicio');
    }
});

miAplicacion.controller('controlPersonaMenu',function($scope, $state, $auth){

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

  $scope.IrAltaUsuario=function(){
    $state.go('persona.alta');
  }

  $scope.IrGrillaUsuario=function(){
    $state.go('persona.grilla');
  }

  $scope.IrAltaProducto=function(){
    $state.go('persona.prodAlta');
  }

  $scope.IrGrillaProducto=function(){
    $state.go('persona.prodGrilla');
  }

});

miAplicacion.controller('controlPersonaAlta',function($scope, FileUploader, $http, $state, cargadorDeFoto, $auth, fPersonas){

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

      $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
      $scope.uploader.queueLimit = 1;
      $scope.persona={};
      $scope.persona.nombre= "Natalia Natalia" ;
      $scope.persona.perfil= "" ;
      $scope.persona.email= "natalia@natalia.com" ;
      $scope.persona.password= "123456" ;
      $scope.persona.foto="pordefecto.png";
      $scope.persona.dni=12345678;
       
      cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

      $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

        $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

        $scope.uploader.onCompleteAll = function() {
            var dato=JSON.stringify($scope.persona);
            fPersonas.Agregar(dato)
            .then(function(respuesta) {             
                 console.log("Se agregó al usuario correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log( response);           
            });
        };

});

miAplicacion.controller('controlPersonaGrilla',function($scope, $http, $state, $auth, fPersonas){
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

    fPersonas.traerTodo()
    .then(function(respuesta) {       
         $scope.ListadoPersonas = respuesta;
    },function errorCallback(response) {
         $scope.ListadoPersonas = [];
        console.log(response);     
    });

  $scope.Borrar=function(persona){
    var dato=JSON.stringify(persona);
    fPersonas.Borrar(dato)
         .then(function(respuesta) {              
                 console.log("Usuario borrado");
                  fPersonas.traerTodo()
                  .then(function(respuesta) {       
                       $scope.ListadoPersonas = respuesta;
                  },function errorCallback(response) {
                       $scope.ListadoPersonas = [];
                      console.log(response);     
                  });
          },function errorCallback(response) {        
              console.log(response);           
      });
  }

  $scope.Modificar = function(persona){
    console.log( JSON.stringify(persona));
    var dato=JSON.stringify(persona);
    $state.go('persona.modificar', {persona:dato});
  }

  $scope.Informar = function(persona){
    console.log( JSON.stringify(persona));
    var dato=JSON.stringify(persona);
    $state.go('persona.detallar', {persona:dato});
  }

});

miAplicacion.controller('controlPersonaModificar',function($scope, $http, $state, $stateParams, FileUploader, cargadorDeFoto, fPersonas){
  $scope.uploader = new FileUploader({url: 'servidor/upload.php'});
  $scope.uploader.queueLimit = 1;
  var dato=JSON.parse($stateParams.persona);
  $scope.persona={};
  $scope.persona.idPersona=dato.idPersona;
  $scope.persona.nombre=dato.nombre;
  $scope.persona.perfil=dato.perfil;
  $scope.persona.email=dato.email;
  $scope.persona.password=dato.password;
  $scope.persona.foto=dato.foto;
  $scope.persona.dni=parseInt(dato.dni);

  cargadorDeFoto.CargarFoto($scope.persona.foto,$scope.uploader);

    $scope.Guardar = function(){
          if($scope.uploader.queue[0].file.name!='pordefecto.png')
          {
            var nombreFoto = $scope.uploader.queue[0].file.name;
            $scope.persona.foto=nombreFoto;
          }

          $scope.uploader.uploadAll();
      }

    $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };

    $scope.uploader.onCompleteAll = function() {
            var dato=JSON.stringify($scope.persona);
            
            fPersonas.Modificar(dato)
            .then(function(respuesta) {             
                 console.log("Usuario modificado correctamente");
                 $state.go("persona.menu");
            },function errorCallback(response) {        
                 console.log( response);           
            });
        }

});

miAplicacion.controller('controlPersonaDetallar',function($scope, $http, $state, $stateParams, fPersonas){
  var dato=JSON.parse($stateParams.persona);
  $scope.usuario={};

  fPersonas.Detallar(dato.idPersona)
  .then(function(respuesta) {             
      $scope.usuario = respuesta;
  },function errorCallback(response) {        
      console.log( response);           
  });

});


