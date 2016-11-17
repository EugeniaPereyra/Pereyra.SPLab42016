

miAplicacion.directive('utnProducto', function(){

  return{
    restrict: "EACM",
    replace: true,
    scope: {
      miProducto: '=productoDinamico'},
    templateUrl: "templates/producto/productoGrilla.html"
  }

})