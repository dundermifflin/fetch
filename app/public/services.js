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
      return response;
    });
  };


  var toggleAvail = function(response) {

  };

  return {
    processSelection: processSelection
  };
})

.factory('ShelterFactory', ['$http', function($http) {

  var addDog = function(dog) {
    return $http({
        method: 'POST',
        url: '/addDog',
        params: {
        }
      })
      .then(function(resp) {

      })
  }



  return {
    addDog: addDog
  }
}])

//  ADDED AuthFactory:  FILL ME IN!!!
.factory('AuthorizationFactory', ['$http', '$state', function($http, $state) {
  var login = function(user) {
    return $http({
        method: 'POST',
        url: '/login',
        params: {
          username: user.name,
          password: user.password
        }
      })
      .then(function(response) {

      });
  };

  var register = function(user) {
    return $http({
        method: 'POST',
        url: '/register',
        params: {
          name: user.name,
          password: user.password
        }
      })
      .success(function(response) {
        console.log('auth factory register response: ', response);
        $state.go('selection');
      });
  };

  var logout = function() {

  };


  return {
    login: login,
    register: register,
    logout: logout
  };


}]);