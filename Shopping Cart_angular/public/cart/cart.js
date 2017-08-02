angular.module('cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/cart' , {
		templateUrl : 'public/cart/cart.html',
		Controller: 'CartCtrl'
	});
}])


.controller('CartCtrl', ['$scope','$http','CommonProp', function($scope, $http, CommonProp) {

	//All Selection gone when we clicked on customize button we will fix that
	//we'll check the commonProp service to check any exiting items and use it to populate the Cartpage..
	$scope.shopData = CommonProp.getItems();
	if(!$scope.shopData) {
		$http.get('public/list.json').then(function(response){
		$scope.shopData = response.data;
	});
	}

	$scope.totalPrice = function() {
		var total = 0;
		for(var k in $scope.shopData) {		
			console.log($scope.shopData[k])
			total += parseInt($scope.shopData[k].selected);
		}
		CommonProp.setTotal(total);
		return CommonProp.getTotal(); 
		//return total;

	}

	//Watch changes in the shopData and update service accordingly
	$scope.$watch('shopData', function(){
		CommonProp.setItems($scope.shopData);
	})
	
}])


.directive('checkList', function(){
	return {
		restrict: 'E',
		scope: {
			option: '=',
			name:'=',
			selected: '='
		},
		template: function(ele, attr) {
			return '<div class="panel-body">' +
						'<div class="radio" ng-repeat="i in option">' +
							'<label><input type="radio" name="{{name}}" ng-value="{{i.price}}" ng-model="$parent.selected">{{i.size}},{{i.price}}</label>' +
						'</div>' +						
					'</div>'
		}
	};
})

.service('CommonProp',  function(){
	var items = '';
	var Total = 0;
	return {
		getItems : function() {
			return items
		},
		setItems:function(value) {
			items = value
		},
		getTotal: function() {
			return Total;
		},
		setTotal: function(value) {
			Total = value;
		}
	}
})