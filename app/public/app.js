//use $routeProvider or $uiRoute to navigate templates

angular.module('fetch', ['fetch.auth', 'fetch.confirmation', 'fetch.selection','fetch.services', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/signin');

  $stateProvider

    .state('signin', {
    url: '/signin',
    controller: 'AuthController',
    templateUrl: 'authorization/signin.html'
  })

  .state('logout', {
    url: '/signin',
    controller: 'AuthController',
    templateUrl: 'authorization/signin.html'
  })

  .state('selection', {
    url: '/selection',
    controller: 'SelectionController',
    templateUrl: 'selection/selection.html'
  })

  .state('confirmation', {
      url: '/confirmation',
      controller: 'ConfirmationController',
      templateUrl: 'confirmation/confirmation.html'
    });
  
}]);