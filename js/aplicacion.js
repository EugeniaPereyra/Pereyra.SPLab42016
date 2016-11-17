var miAplicacion = angular.module('angularABM',['ui.router', 'angularFileUpload', 'satellizer']);

miAplicacion.config(function($stateProvider,$urlRouterProvider, $authProvider){

$authProvider.loginUrl='labor/servidor/php/auth.php';
$authProvider.tokenName='miToken';
$authProvider.tokenPrefix='angularABM';
$authProvider.authHearder='data';
// $authProvider.github({
//     clientId: 'e6ff35c81000243ceb47',
//     responseType: 'token'
//     });

  $stateProvider

        .state(
          'inicio',{
          url:'/inicio',
          templateUrl:'templates/inicio.html',
          controller:"controlInicio"
        })

        .state(
          'login',{
          url:'/login',
          templateUrl:'templates/login.html',
          controller:"controlLogin"
        })


        // PERSONAS

        .state(
          'persona',{
          url:'/persona',
          abstract:true,
          templateUrl:'templates/persona/personaAbstracta.html',
          controller:'controlPersona'
        })

        .state(
          'persona.menu',{
          url:'/personaMenu',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaMenu.html',
              controller:'controlPersonaMenu'
            }
          }
        })

        .state(
          'persona.alta',{
          url:'/personaAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaAlta.html',
              controller:'controlPersonaAlta'
            }
          }
        })

        .state(
          'persona.grilla',{
          url:'/personaGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaGrilla.html',
              controller:'controlPersonaGrilla'
            }
          }
        })

        .state(
          'persona.modificar',{
          url:'/personaModificar/:persona',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaAlta.html',
              controller:'controlPersonaModificar'
            }
          }
        })

        .state(
          'persona.detallar',{
          url:'/personaDetallar/:persona',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/persona/personaPerfil.html',
              controller:'controlPersonaDetallar'
            }
          }
        })



        // PRODUCTOS

        .state(
          'persona.prodAlta',{
          url:'/productoAlta',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoAlta.html',
              controller:'controlProductoAlta'
            }
          }
        })

        .state(
          'persona.prodGrilla',{
          url:'/productoGrilla',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoGrilla.html',
              controller:'controlProductoGrilla'
            }
          }
        })

        .state(
          'persona.prodModificar',{
          url:'/productoModificar/:producto',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoAlta.html',
              controller:'controlProductoModificar'
            }
          }
        })

        .state(
          'persona.prodDetallar',{
          url:'/productoDetallar/:producto',
          views:
          {
            'contenido':
            {
              templateUrl:'templates/producto/productoPerfil.html',
              controller:'controlProductoDetallar'
            }
          }
        })


  $urlRouterProvider.otherwise('/inicio');

});
