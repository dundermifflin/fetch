// allows user to sign in and out
	//triggers auth factory
angular.module('fetch.login')


  //  ADDED authorizationController: FILL ME IN!!!
  .controller('AuthorizationController', ['$scope', function($scope) {
    //$scope.user = {};

  $scope.signin = function () {
    AuthorizationFactory.signin()
      .then(function (token) {
        
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    AuthorizationFactory.signup()
      .then(function (token) {
        
      })
      .catch(function (error) {
        console.error(error);
      });
  };

}]);