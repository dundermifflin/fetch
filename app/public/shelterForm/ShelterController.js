angular.module('fetch.shelter',[])

.controller('ShelterController', ['$scope','ShelterFactory'], function($scope, ShelterFactory){

	$scope.addDog=function(dog){
		return ShelterFactory.addDog(dog);
	}
})