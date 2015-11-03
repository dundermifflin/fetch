angular.module('fetch.confirmation', [])

.controller('ConfirmationController', ['$scope', '$state', 'uiGmapGoogleMapApi', 'DogFactory', function($scope, $state, uiGmapGoogleMapApi, DogFactory) {

  uiGmapGoogleMapApi.then(function(maps) {

    $scope.map = {
      center: {
        latitude: 37.772,
        longitude: -122.423
      },
      zoom: 13
    };
  });

  $scope.marker = {
    idKey: 0,
    coords: {
      // SF SPCA Mission Adoption Center
      latitude: 37.772,
      longitude: -122.423
    }
  };

  navigator.geolocation.getCurrentPosition(function(pos) {
    $scope.location = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    }
    console.log('location', $scope.location)
    $scope.$apply()
    $scope.estimatedTime = DogFactory.estimatedTime($scope.location.latitude, $scope.location.longitude)
  })




  // check to see what data is getting passed from SelectionController
  console.log('State params', $state.params);

  // should be 'dog' object. if so, set to $scope.dog
  $scope.dog = JSON.parse($state.params.dog);
  if (($scope.dog.isMale === null) || ($scope.dog.isMale.data[0] === 116)) {
    $scope.dog.gender = 'his'
  } else {
    $scope.dog.gender = 'her'
  }
  // this will allow us to access dog object and its properties in confirmationView

}]);