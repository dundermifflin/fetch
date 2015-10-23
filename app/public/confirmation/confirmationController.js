//triggers factory function and pulls return value. Displays the values on the page. 
angular.module('fetch.confirmation')
  .controller('confirmationController', ['$scope', 'DogFactory', function($scope, DogFactory) {  
    $scope.dog = DogFactory.findDog();	// what is arg?
  }]);