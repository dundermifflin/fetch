angular.module('fetch.shelter', [])

.controller('ShelterController', ['$scope', '$state', 'ShelterFactory', function($scope, $state, ShelterFactory) {
  $scope.formData = {
    name: null,
    blurb: null,
    photoUrl: null,
    breed: null,
    activity: null,
    isMale: true //will be a boolean value 
  }


  $scope.addDog = function(dog) {
    console.log("ng-submit dog: ", dog);
    return ShelterFactory.addDog(dog)
  }
}]);
