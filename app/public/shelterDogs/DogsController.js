angular.module('fetch.shelterDogs', [])

.controller('DogsController', ['$scope', 'ShelterFactory','$confirm', function($scope, ShelterFactory, $confirm) {

  $scope.data = [];

  $scope.loadDogs = function() {
    ShelterFactory.loadDogs().then(function(result) {
      $scope.data = result;
      console.log('dogresult', result)
    })
  }

  $scope.checkAvail= function(dogID){
    ShelterFactory.checkAvail(dogID).then(function(result){
      console.log(result)
      return result;
    })
  }

  $scope.confirmReturn= function(dogID){
  	ShelterFactory.confirmReturn(dogID);
    $confirm({
              title:"Thank you!",
              text:"Your dog is now available to be fetched again!" 
            })
  }

  $scope.loadDogs();
}])