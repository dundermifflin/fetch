angular.module('fetch.confirmation', [])

.controller('ConfirmationController', ['$scope', '$state', 'uiGmapGoogleMapApi', function($scope, $state, uiGmapGoogleMapApi) {

  uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = { center: { latitude: 37.8, longitude: -122.4 }, zoom: 13 };
  });

  $scope.marker = {
    id: 0,
    coords: {
      // SPCA Outreach
      latitude: 37.8,
      longitude: 122.4
    }
  };

  // check to see what data is getting passed from SelectionController
  console.log('State params', $state.params);

  // should be 'dog' object. if so, set to $scope.dog
  $scope.dog = JSON.parse($state.params.dog);
  console.log('Male', $scope.dog.isMale)
  if ($scope.dog.isMale === true ) {
    $scope.dog.gender = 'his'
  } else {
    $scope.dog.gender = 'her'
  }
  // this will allow us to access dog object and its properties in confirmationView

}]);