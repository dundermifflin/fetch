angular.module('fetch.shelterDogs', [])

.controller('DogsController', ['$scope', 'ShelterFactory', function($scope, ShelterFactory) {

  $scope.data = [];

  $scope.loadDogs = function() {
    ShelterFactory.loadDogs().then(function(result) {
      $scope.data = result;
      console.log('dogresult', result)
    })
  }

  // $scope.data.availability= function(dog){
  // 	if(dog.isAvail===true){
  // 		return "Dog is available"
  // 	}
  // 	else{
  // 		return "Dog is currently fetched!"
  // 	}
  // }

  $scope.confirmReturn= function(dogID){
  	ShelterFactory.confirmReturn(dogID)
  }

  $scope.loadDogs();
}])