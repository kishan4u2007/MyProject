
app.factory('DataService', [ '$http', function( $http ) {
	return {

		videos: function(){
			return $http.get( CONFIG.MOVIES_API + '/movies');
		},
		saveLog: function( log ){
			return $http.post( CONFIG.SERVICE_API + '/activities', log );
		},
		videosViewHistory: function( params, options ){
			return $http.post( CONFIG.SERVICE_API + '/activities/find', { params: params, options: options });
		}
	}
}]);

app.directive('flexslider', function ($timeout) {
  return {
    link: function (scope, element, attrs) {
       setTimeout(function(){       	
        element.flexslider({
          animation: "slide",         
          animationLoop: false
          
        });  
      },500);
    }
  }
});



