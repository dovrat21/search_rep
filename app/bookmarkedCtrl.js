app.controller('bookmarkedCtrl', function ($scope, $routeParams) {
  
  // retrieve data from session and populate the relevant $scope.

  var retrievedData = window.sessionStorage.getItem("repositories");
  var repObjects = JSON.parse(retrievedData);
  $scope.bookmarkedReps = repObjects;

})



