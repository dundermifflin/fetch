// allows user to sign in and out
//triggers auth factory
angular.module('fetch.authorization', [])


//  ADDED authorizationController: FILL ME IN!!!
.controller('AuthorizationController', ['$scope', '$state', '$location','$anchorScroll','AuthorizationFactory', function($scope, $state, $location, $anchorScroll, AuthorizationFactory) {

  $scope.user = {};

  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  }

  $scope.userRedirect = function() {
    $state.go('login');
  }

  $scope.shelterRedirect = function() {
    $state.go('shelterLogin');
  }

  $scope.login = function(user) {
    AuthorizationFactory.login(user);
  }

  $scope.register = function(user) {
    AuthorizationFactory.register(user);
  }

  $scope.shelterLogin = function(shelter) {
    AuthorizationFactory.shelterLogin(shelter);
  }

  $scope.shelterRegister = function(shelter) {
    AuthorizationFactory.shelterRegister(shelter);
  }

}]);