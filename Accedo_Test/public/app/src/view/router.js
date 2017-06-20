 var app = angular.module("vod", ["ngRoute"]);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when("/", {
        templateUrl : "index.html"
    })   
}]);