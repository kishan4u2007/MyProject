angular.module('cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/cart' , {
		templateUrl : 'public/cart/cart.html',
		Controller: 'CartCtrl'
	});
}])
.controller('CartCtrl', ['$scope','$http','CommonProp', function($scope, $http, CommonProp) {
	$scope.qty = 0;
	//All Selection gone when we clicked on customize button we will fix that
	//we'll check the commonProp service to check any exiting items and use it to populate the Cartpage..
	$scope.shopData = CommonProp.getItems();
	if(!$scope.shopData) {
		$http.get('http://staging.discernliving.com/discern/product/products?page=0&field_product_categories_tid[]=2265&sort_by=commerce_price_amount&sort_order=ASC').then(function(response){
		$scope.shopData = response.data;
		console.log(response.data)
	});
	}
	 $scope.addToCart = function(item) {
        var items = $scope.shopData;
        var qty = 0; 
        for(var i=0; items.length; i++){         		           	
            if(items[i].product_id === item.product_id){            
                items[i].qty += 1;                
        }
            return qty;
           
        }
    };

	//Watch changes in the shopData and update service accordingly
	$scope.$watch('shopData', function(){
		CommonProp.setItems($scope.shopData);
	})
	
}])
.service('CommonProp',  function(){
	var items = '';
	var Total = 0;
	return {
		getItems : function() {
			return items
		},
		setItems:function(value) {
			items = value
		}
	}
})