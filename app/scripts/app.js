/*global angular*/
angular.module('gitApp', [])
    .controller('connectController', ['$scope', '$http', ($scope, $http) => {
        //Variables for the Controller
        $scope.templates = [{ name: 'user name', url: 'views/name.html'}];
        $scope.search = '';
        $scope.error = false;
        $scope.val = {};
        $scope.repos = {};
        
        //Template function
        $scope.template = () => $scope.templates[0].url
        
        //Function to query the API
        $scope.nameSearch = parameter => {
            $http.get(`https://api.github.com/users/${parameter}`).success(data => {
                    $scope.val = data;
                    console.log(data);
                    $scope.error = false;
                    $http.get(`https://api.github.com/users/${parameter}/repos`).success(data => {
                        $scope.repos = data;
                        $scope.show = true;
                    });
                }).error(data => {
                    console.log(data);
                    $scope.val = {};
                    $scope.repos = {};
                    $scope.error = true;
                });
        };
       
        //Submit function for the query
        $scope.submit = () => {
            if ($scope.search.length > 1) {
                console.log("Valid request");
                $scope.nameSearch($scope.search);
                $scope.search='';
                document.getElementById("search").value = '';
              }
            };
        
        //Reset to default values
        $scope.reset = () => {
            $scope.val = {};
            $scope.repos = {};
            document.getElementById("search").value = '';
            }
        
    }]);