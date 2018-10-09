app.factory("repositoryService", function ($http, $log, $q) {

    var repositories = [];

    function Repository(repId, repImg, repName) {
        this.repId = repId;
        this.repImg = repImg,
            this.repName = repName;
    }

    function getAll(repApiUrl) {
        var reps = [];
        var async = $q.defer();
        $http.get(repApiUrl).then(function (response) {
            var repList = response.data.items;
            repList.sort();
            repList.forEach(function (rep) {
                var repObj = new Repository(rep.id, rep.owner.avatar_url, rep.name);
                reps.push(repObj);
            });
            async.resolve(reps);
        }, function (error) {
            $log.error(error);
            async.reject("failed to get the requested repository");
        });

        return async.promise;
    }




    function storeRepToSession(result) {
        var repApiUrl = "https://api.github.com/repositories/" + result;
        var async = $q.defer();
        $http.get(repApiUrl).then(function (response) {
            var repForSession = response.data;
            if (repositories.length > 0) {
                //empty the old items in the storage to prevent overriding. then, store the old items + new item
                var retrievedData = window.sessionStorage.getItem("repositories");
                var sessionObjects = JSON.parse(retrievedData);
                var repos = sessionObjects;
                repos.push(repForSession);
                window.sessionStorage.setItem("repositories", JSON.stringify(repos));
            }
            else {
                repositories.push(repForSession);
                window.sessionStorage.setItem("repositories", JSON.stringify(repositories));
            }
            async.resolve(repositories);

        }, function (error) {
            console.error(error);
            async.reject("failed to store the selected repository");
        });
        return async.promise;
    }





    return {

        getAll: getAll,
        storeRepToSession: storeRepToSession

    }

});