angular.module('fetch.services', [])

.factory('DogFactory', function() {
  var fb = new Firebase('http://fetchadog.firebaseIO.com');

  var findDog = function(input) {
    var result = $firebase(url.orderByValue('type').equalTo(input)).$asArray();

    var dogArray = result.$loaded().then(function() {
      result.forEach(function(val) {
        if (val.avail === true) {
          return val;
        }
      });
      return false;
    });
  }

  return { findDog: findDog };
});