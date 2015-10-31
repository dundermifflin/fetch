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
    })
  };




  return {
    processSelection: processSelection
  };
})

.factory('ShelterFactory', ['$http', '$state', function($http, $state) {

  var addDog = function(dog) {
    return $http({
        method: 'POST',
        url: '/addDog',
        params: {
          dog: dog
        }
      })
      .then(function(resp) {
        $state.go('shelterDogs');
        console.log('dog communicated to server');
      })
  }

  var checkAvail = function(dogID) {
    console.log('in checkAvail')
    return $http({
        method: 'POST',
        url: '/checkAvail',
        params: {
          id: dogID
        }
      })
      .then(function(resp) {
        console.log('AVAILresp:', resp.data)
        return resp.data
      })
  }
  var confirmReturn = function(dogID) {
    return $http({
      method: 'POST',
      url: '/confirmReturn',
      params: {
        id: dogID
      }
    })
  }

  var loadDogs = function() {
    return $http({
        method: 'POST',
        url: '/loadDogs',
      })
      .then(function(resp) {
        console.log('resp:', resp.data)
        return resp.data;
      })
  }

  return {
    checkAvail: checkAvail,
    addDog: addDog,
    confirmReturn: confirmReturn,
    loadDogs: loadDogs
  }

}])

.factory('AuthorizationFactory', ['$http', '$state', function($http, $state) {

  var login = function(user) {
    return $http({
        method: 'POST',
        url: '/login',
        params: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password
        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var register = function(user) {
    return $http({
        method: 'POST',
        url: '/register',
        params: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password
        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var shelterLogin = function(shelter) {
    return $http({
        method: 'POST',
        url: '/shelterLogin',
        params: {
          email: shelter.email,
          displayName: shelter.displayName,
          password: shelter.password
        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var shelterRegister = function(shelter) {
    return $http({
        method: 'POST',
        url: '/shelterRegister',
        params: {
          email: shelter.email,
          displayName: shelter.displayName,
          password: shelter.password
        }
      })
      .success(function(response) {
        $state.go(response);
      });
  };

  var logout = function() {

  };

  return {
    login: login,
    register: register,
    shelterLogin: shelterLogin,
    shelterRegister: shelterRegister,
    logout: logout

  };


}]);