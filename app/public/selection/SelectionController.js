
angular.module('fetch.selection', [])
  .controller('SelectionController', ['$scope', '$state', function($scope, $state ) {

    $scope.changeView = function(typeSelected) {
      // Send the user to the confirmation page along with the kind of dog they selected.
      $state.go('fetch.confirmation', {
        type: typeSelected
      });
    };

  }]);
