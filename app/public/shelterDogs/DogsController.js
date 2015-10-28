angular.module('fetch.shelterDogs', [])

.controller('DogsController', ['$scope', 'ShelterFactory', function($scope, ShelterFactory) {

  $scope.data = [];

  $scope.loadDogs = function() {
    ShelterFactory.loadDogs().then(function(result) {
      $scope.data = result;
      console.log('dogresult', result)
    })
  }

  $scope.confirmReturn= function(dogID){
  	ShelterFactory.confirmReturn(dogID)
  }

  $scope.loadDogs();
}])