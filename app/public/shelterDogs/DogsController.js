angular.module('fetch.shelterDogs', [])

.controller('DogsController', ['$scope', 'ShelterFactory', function($scope, ShelterFactory) {
  $scope.loadDogs = function(shelterID) {
    ShelterFactory.loadDogs(shelterID);
  }

}])