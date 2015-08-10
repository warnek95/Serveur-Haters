var myApp = angular.module('MainModule', []);

myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  }
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

myApp.controller('UserCtrl', function ($scope, $http, $window) {
  $scope.submit = function () {
    $http
      .post('/session/logIn', {Email: $scope.user.username, Password: $scope.user.password})
      .success(function (data, status, headers, config) {
        console.log(data);
        $window.sessionStorage.token = data.token;
        $scope.message = 'Welcome';
        $scope.isAuthenticated = true;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.message = 'Error: Invalid user or password';
      });
  };
  $scope.pp = function () {
    console.log($window.sessionStorage.token);

    $http.get('/post/findLast', {
       
    })
    .success(function (data, status, headers, config) {
      console.log(data); // Should log 'foo'
    });
}
});