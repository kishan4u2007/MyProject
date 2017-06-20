var app = angular.module("HangmanApp", []);
app.controller("GameController", ['$scope','$timeout', function($scope, $timeout){
	//Intilize Globle variable
	var words=["Altassian","Remember","Mountain","Pokemon"];
	$scope.incorrectWordChossen = [];
	$scope.correctWordChossen = [];
	$scope.guesses = 6;
	$scope.displayWord = '';
	$scope.input = {
		letter : ''
	};

	//from this function we will get random number
	var selectRandomNumber = function() {
		var index = Math.round(Math.random() * words.length);
		return words[index]
	}
	//starting the game
	var newGame = function() {
		$scope.incorrectWordChossen = [];
		$scope.correctWordChossen = [];
		$scope.guesses = 6;
		$scope.displayWord = '';
		selectedWord = selectRandomNumber();
		console.log(selectedWord)
		var tempDisplayWord = '';
		for (var i = 0; i < selectedWord.length; i++) {
			tempDisplayWord += '*';
		}

		$scope.displayWord =  tempDisplayWord;
	}
	// Check if $scope.input.letter is a single letter and an alphabet and not an already chosen letter.
	// Check if its correct.
	$scope.letterChossen = function() {

		for (var i = 0; i < $scope.correctWordChossen.length; i++) {
			if($scope.correctWordChossen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		for (var i = 0; i < $scope.incorrectWordChossen.length; i++) {
			if($scope.incorrectWordChossen[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.input.letter = "";
				return;
			}
		}

		var correct = false;
		for (var i = 0; i < selectedWord.length; i++) {
			if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()) {
				$scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i+1).toLowerCase();
				correct = true;
			}
		}

		if(correct) {
			var objhand = $(".correct-icon");
			objhand.animate({height: '-100px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '200px', opacity: '0.8'}, "fast");
	        objhand.animate({height: '100px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '100px', opacity: '0.8'}, "fast");
			$scope.correctWordChossen.push($scope.input.letter.toLowerCase());
			
		}else {
			var objhand = $(".incorrect-icon");
			objhand.animate({height: '200px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '-200px', opacity: '0.8'}, "fast");
	        objhand.animate({height: '100px', opacity: '0.4'}, "fast");
	        objhand.animate({width: '100px', opacity: '0.8'}, "fast");
			$scope.guesses --;
			$scope.incorrectWordChossen.push($scope.input.letter.toLowerCase());
		}

		$scope.input.letter = "";

		if($scope.guesses == 0) {
			$timeout(function() {
				newGame();
				$timeout(function() {
				$('.dial').trigger('change');
			},500);
			},500)
		}
		if($scope.displayWord.indexOf("*")== -1) {
			alert("You won Yeeh !")
			$timeout(function() {
				newGame();
				$timeout(function() {
				$('.dial').trigger('change');
			},500);
			}, 500);
		}

	}

	newGame();

	

}])