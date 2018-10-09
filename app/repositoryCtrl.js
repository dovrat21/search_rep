app.controller("repositoryCtrl", function ($scope, $http, $location, repositoryService) {

    $scope.searchText = "";
    
    //search requested repository

    $scope.searchRepository = function () {
        $scope.repositories = [];
        var searchUrl = "https://api.github.com/search/repositories?q=" + encodeURIComponent($scope.searchText);
        repositoryService.getAll(searchUrl).then(function (repsList) {
            $scope.repositories = repsList;
        }, function (error) {
            $log.error(error);
        });
    }

//save the entire bookmarked repository data to session storage
    $scope.saveBookmarkedRep = function (repId) {
        repositoryService.storeRepToSession(repId).then(function (storedRep) {
            if (storedRep.length > 0) {
                alert("The bookmarked repository has been stored to the user's session.")
            }
        }, function (error) {
            $log.error(error);
        });
    };


});