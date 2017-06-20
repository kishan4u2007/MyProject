angular.module('vod', [
    'ngRoute'
])
CONFIG = {

	MOVIES_API: 'https://demo2697834.mockable.io',
	SERVICE_API: 'https://still-escarpment-8617.herokuapp.com/api',
	//SERVICE_API: 'http://localhost:3000/api', 
	DEFAULT_VIDEO_TILE:'http://lorempixel.com/214/317/?t=26'
};
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'videoController'
            });
    }
]);
