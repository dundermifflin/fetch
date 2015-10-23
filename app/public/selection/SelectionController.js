angular.module('fetch.selection', [])

.controller('SelectionController', ['$scope', '$state', 'DogFactory', function($scope, $state, DogFactory) {
  $scope.data = {};

  $scope.processSelection = function(typeSelected) {
  	console.log('in process selection hurray')
    //send type selected to DogFactory to process query in server
    DogFactory.processSelection(typeSelected).then(function(err, response) {
      if (err) {
        console.log('Error:', err);
      }
      //set data to be the dog that is sent back
      $scope.data = response;
      //redirect to the confirmation page, include data as a parameter
      $state.go('confirmation', {
        dog: $scope.data
      });
    })
  };

}]);