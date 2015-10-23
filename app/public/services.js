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
  };

  var toggleAvail = function() {

  };

  return { findDog: findDog };
})

//  ADDED AuthFactory:  FILL ME IN!!!
.factory('AuthorizationFactory', ['$http',function ($http) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '',
      data: user
    })
    .then(function (resp) {
      
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '',
      data: user
    })
    .then(function (resp) {

    });
  };

  var signout = function () {
   
  };


  return {
    signin: signin,
    signup: signup,
    signout: signout
  };

}]);