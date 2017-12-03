/* global app */


app.controller('kategoriController', ['$scope', function ($scope) {
    $scope.readKategori = function(){
        $http.get(api_url+"kategori/get").then(function successCallback(response){
            $scope.kategori = response.data;         
            console.log(response)       ;
        },
        function errorCallback(response){
            $scope.showToast("Unable to read record.");
        });
    };

}]);