angular.module('fetch.selection', [])

.controller('SelectionController', ['$scope', '$state', 'DogFactory', '$modal', '$confirm', function($scope, $state, DogFactory, $modal, $confirm) {
  $scope.data = {};

  $scope.processSelection = function(typeSelected) {
    console.log('in process selection hurray')
      //send type selected to DogFactory to process query in server

    $scope.hover = function(activity) {
      return $scope.activity.show === true;
    }
    $confirm({
        title: "Please confirm your Dog",
        text: 'You selected a ' + typeSelected + ' dog'
      })
      .then(function() {
        $scope.deletedConfirm = 'Deleted';
        $scope.data = DogFactory.processSelection(typeSelected).then(function(response) {
          console.log('selection response', response.data)
          if (response.data == 'notAvailable') {
            $confirm({
              title:"No " + typeSelected + " dogs are available please select another dog",
              text:"Try one of our other dogs" 
            })
          } else {
            $state.go('confirmation', {
              dog: JSON.stringify(response.data)
            }, {
              location: false
            });
          }
        });
      });

  }
}]);
