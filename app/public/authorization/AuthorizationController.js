// allows user to sign in and out
//triggers auth factory
angular.module('fetch.authorization', [])


//  ADDED authorizationController: FILL ME IN!!!
.controller('AuthorizationController', ['$scope', '$state', function($scope, $state) {
  //$scope.user = {};

  $scope.userRedirect = function() {
    $state.go('login');
  }

  $scope.shelterRedirect = function() {
    $state.go('shelterLogin')
  }

  $scope.signIn = function() {
    $state.go('selection')
  }


  //     AuthorizationFactory.signin()
  //       .then(function(token) {

  //       })
  //       .catch(function(error) {
  //         console.error(error);
  //       });
  //   };

  //   $scope.signup = function() {
  //     AuthorizationFactory.signup()
  //       .then(function(token) {

  //       })
  //       .catch(function(error) {
  //         console.error(error);
  //       });
  //   };

}]);