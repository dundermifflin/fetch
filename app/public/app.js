//use $routeProvider or $uiRoute to navigate templates

angular.module('fetch', ['fetch.authorization', 'fetch.confirmation', 'fetch.selection','fetch.services', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/chooseLogin');

  $stateProvider

  .state('chooseLogin',{
    url:'/chooseLogin',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/chooseLogin.html'
  })

    .state('login', {
    url: '/login',
    controller: 'AuthorizationController',
    templateUrl: 'authorization/login.html'
  })

    .state('shelterLogin',{
      url: '/shelterLogin',
      controller: 'AuthorizationController',
      templateUrl:'authorization/shelterLogin.html'
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
      url: '/confirmation/:dog', //if this doesn't work, remove url line or check out /confirmation/:dog
      // params:['dog'], 
      controller: 'ConfirmationController',
      templateUrl: 'confirmation/confirmationView.html'
    });
  
}]);