angular.module('fetch.services', [])

.factory('DogFactory', function($http) {
  var processSelection = function(input) {
    console.log('in dog factory processSelection')
    return $http({
      method: 'POST',
      url: '/processSelection',
      data: {
        type: input
      }
    }).then(function(response) {
      console.log('dogfactoryresponse', response);
      return response;
    });
  };


  var toggleAvail = function() {

  };

  return {
    processSelection: processSelection
  };
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