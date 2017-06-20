

app.controller('videoPlayerController', ['$scope','DataService', 
	function( $scope, DataService ){
		$scope.startTime = null;
		$scope.params = {
			video:null
		};

		$scope.init = function(){
			//close video modal when video is finished.
			$('#video-player-modal video').bind('ended', function() {
   				$('#video-player-modal').modal('hide');
			});

			$('#video-player-modal').on('hidden.bs.modal', function () {					
    			$scope.saveLog( );
			});

			$('#video-player-modal').on('hidden.bs.modal', function () {

    			 $(this).find('video')[0].pause();
			});
		}

		$scope.saveLog = function(){
			GLOBAL.onFingerprint( function( key ){
				var log = {
					videoId: $scope.params.video.id,
					fingerPrint: key,
					type:'play_video',
					from: $scope.startTime,
					to: moment().toISOString()
				};

				DataService.saveLog( log ).then( function( response ){
					
				});
			});
		}

		$scope.loadVideo = function( video ){
			$scope.params.video = video;
		     $('#video-player-modal video').attr('src', video.url );			
			$('#video-player-modal').modal('show');
			$scope.startTime = moment().toISOString();
		}

}]);


