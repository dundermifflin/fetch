angular.module('fetch.confirmation', [])

.controller('ConfirmationController', ['$scope', function($scope) {

  // check to see what data is getting passed from SelectionController
  console.log($state.params);

  // should be 'dog' object. if so, set to $scope.dog
  $scope.dog = $state.params;

  // this will allow us to access dog object and its properties in confirmationView

}])
