angular.module('fetch.services', [])

.factory('DogFactory', function() {
  var fb = new Firebase('http://fetchadog.firebaseIO.com');

  var findDog = function(input) {
    var result = $firebase(fb.orderByValue('type').equalTo(input)).$asArray();

    var dogArray = result.$loaded().then(function() {
      result.forEach(function(val) {
        if (val.avail === true) {
          return val;
        }
      });
      return false;
    });
  }

  var toggleAvail= function(){
/
  }

  return { findDog: findDog };
});