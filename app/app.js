var app = angular.module("repApp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/home.html',
      controller: 'repositoryCtrl'
    })
    .when('/repositories', {
      templateUrl: 'app/bookmarkedReps.html',
      controller: 'bookmarkedCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
})

