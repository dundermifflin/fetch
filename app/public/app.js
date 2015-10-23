//use $routeProvider or $uiRoute to navigate templates

angular.module('fetch', ['ui.router', 'fetch.login', 'fetch.selection', 'fetch.services', 'fetch.confirmation'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider

    .state('/login', {
        url: '/login',
        controller:'authController',
        templateUrl: 'login.html'
      })

    .state('/logout', {
        url: '/login',
        controller:'authController',
        templateUrl: 'login.html'
      })

    .state('/selection', {
      url: '/selection',
      controller:'selectionController',
      templateUrl: 'selection.html'
    })

    .state('/confirmation', {
      url: '/confirmation',
      controller:'confirmationController',
      templateUrl: 'confirmation.html'
    })
    .otherwise({
      url:'/login',
      controller:'authController',
      templateUrl:'login.html'

    });

});