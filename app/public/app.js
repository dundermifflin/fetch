//use $routeProvider or $uiRoute to navigate templates

angular.module('fetch', ['fetch.authorization', 'fetch.confirmation', 'fetch.selection','fetch.services', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider

    .state('login', {
    url: '/login',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/login.html'
  })

  .state('logout', {
    url: '/login',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/login.html'
  })

  .state('selection', {
    url: '/selection',
    controller: 'SelectionController',
    templateUrl: 'selection/selectionView.html'
  })

  .state('confirmation', {
      url: '/confirmation', //if this doesn't work, remove url line
      params:['dog'], 
      controller: 'ConfirmationController',
      templateUrl: 'confirmation/confirmationView.html'
    });
  
}]);