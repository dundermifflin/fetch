angular.module('fetch.shelter', [])

.controller('ShelterController', ['$scope', 'ShelterFactory'], function($scope, ShelterFactory) {
  $scope.formData = {
    name:null,
    bio: null,
    picUrl: null,
    breed: null
  }

  $scope.submit = function(){
    
  }
  $scope.addDog = function(dog) {
    return ShelterFactory.addDog(dog);
  }
})