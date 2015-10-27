angular.module('fetch.confirmation', [])

.controller('ConfirmationController', ['$scope', '$state', function($scope, $state) {

  // check to see what data is getting passed from SelectionController
  console.log('State params', $state.params);

  // should be 'dog' object. if so, set to $scope.dog
  $scope.dog = JSON.parse($state.params.dog);
  console.log('Male', $scope.dog.isMale)
  if ($scope.dog.isMale === true ) {
    $scope.dog.gender = 'his'
  } else {
    $scope.dog.gender = 'her'
  }
  // this will allow us to access dog object and its properties in confirmationView

}])