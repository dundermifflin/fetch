// allows user to sign in and out
//triggers auth factory
angular.module('fetch.authorization', [])


//  ADDED authorizationController: FILL ME IN!!!
.controller('AuthorizationController', ['$scope', '$state', 'AuthorizationFactory', function($scope, $state, AuthorizationFactory) {

    $scope.user = {};

    $scope.userRedirect = function() {
      $state.go('login');
    }

    $scope.shelterRedirect = function() {
      $state.go('shelterLogin');
    }

    $scope.logIn = function() {
      $state.go('selection');
    }

    $scope.register = function(user) {
      console.log('trying to register');

      AuthorizationFactory.register(user);
    }

}]);