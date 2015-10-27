angular.module('fetch.selection', [])

.controller('SelectionController', ['$scope', '$state', 'DogFactory', function($scope, $state, DogFactory) {
  $scope.data = {};

  $scope.processSelection = function(typeSelected) {
    console.log('in process selection hurray')
      //send type selected to DogFactory to process query in server

    $scope.hover = function(activity) {
      console.log('hoveringgggg')
      this.hoverEdit = true;
      return $scope.activity.show === true;
    }

    $scope.hoverIn = function() {
      this.hoverEdit = true;
    }

    $scope.hoverOut = function() {
      this.hoverEdit = false;
    }

    $scope.data = DogFactory.processSelection(typeSelected).then(function(response) {
      console.log('selection response', response.data)
      $state.go('confirmation', {
        dog: JSON.stringify(response.data)
      }, {
        location: false
      });
    });

  }
}]);
