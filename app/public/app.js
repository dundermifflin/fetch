//use $routeProvider or $uiRoute to navigate templates

angular.module('fetch', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider

    .state('/login', {
        url: '/login',
        templateUrl: 'login.html'
      })

    .state('/logout', {
        url: '/login',
        templateUrl: 'login.html'
      })

    .state('/selection', {
      url: '/selection',
      templateUrl: 'selection.html'
    })

    .state('/confirmation', {
      url: '/confirmation',
      templateUrl: 'confirmation.html'
    });

});