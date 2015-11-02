angular.module('fetch.shelterDogs', [])

.controller('DogsController', ['$scope', 'ShelterFactory','$confirm', function($scope, ShelterFactory, $confirm) {

  $scope.data = [];

  $scope.loadDogs = function() {
    ShelterFactory.loadDogs().then(function(result) {
      $scope.data = result;
      console.log('dogresult', result)
    })
  }

  $scope.checkAvail= function(dogAvail){
   if(dogAvail=== 116){
    return "Currently Available"
   } else{
    return "Currently Fetched"
   }
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