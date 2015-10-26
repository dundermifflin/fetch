angular.module('fetch.services', [])

.factory('DogFactory', function($http) {
  var processSelection = function(input) {
    console.log('in dog factory processSelection')
    return $http({
      method: 'POST',
      url: '/processSelection',
      params: {
        activity: input
      }
    }).then(function(response) {
      toggleAvail(response);
      console.log('dogfactoryresponse', response);
      return response;
    });
  };


  var toggleAvail = function(response) {

  };

  return {
    processSelection: processSelection
  };
})

.factory('ShelterFactory',function(){

var addDog= function(){

}



  return {
    addDog: addDog
  }
})

//  ADDED AuthFactory:  FILL ME IN!!!
.factory('AuthorizationFactory', ['$http', function($http) {
  var signin = function(user) {
    return $http({
        method: 'POST',
        url: '',
        data: user
      })
      .then(function(resp) {

      });
  };

  var signup = function(user) {
    return $http({
        method: 'POST',
        url: '',
        data: user
      })
      .then(function(resp) {

      });
  };

  var signout = function() {

  };


  return {
    signin: signin,
    signup: signup,
    signout: signout
  };

}]);