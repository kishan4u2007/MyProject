angular.module('cart', ['ngRoute','ngStorage'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
    .when('/cart' , {
		templateUrl : 'public/cart/cart.html',
		Controller: 'CartCtrl'
	})
  
}])


.controller('CartCtrl', ['$scope','$http','CommonProp', '$rootScope', '$localStorage', function($scope, $http, CommonProp, $rootScope, $localStorage) {
	
	var self = this;
	// $scope.cart = []; 
    if($localStorage.shoppingCart === undefined)  {  
        $localStorage.shoppingCart=[];     
         $scope.count  = 0;
    }else {
         $scope.count =  $localStorage.shoppingCart.length;
    }
	//All Selection gone when we clicked on customize button we will fix that
	//we'll check the commonProp service to check any exiting items and use it to populate the Cartpage..
	$scope.shopData = CommonProp.getItems();
	if(!$scope.shopData) {
		$http.get('http://staging.discernliving.com/discern/product/products?page=0&field_product_categories_tid[]=2265&sort_by=commerce_price_amount&sort_order=ASC').then(function(response){
		$scope.shopData = response.data;
		console.log(response.data)
	});
	}

  // add Item to Cart
     $scope.addItemToCart = function(name, price, id, img) {
        var found = false;
        for (var i in $localStorage.shoppingCart) {
            if ($localStorage.shoppingCart[i]["id"] === id) {
                $localStorage.shoppingCart[i].count ++; 
                found = true;
               // $scope.saveCart();
                // console.log($scope.cart);             
                return;
            }
        } 
        if (!found) {            
            $localStorage.shoppingCart.push({"name":name, "price": price, "id": id, "count":1, "img": img});
            
            $scope.count = $localStorage.shoppingCart.length;   
            //$scope.saveCart();
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
		},
		getTotal: function() {
			return Total;
		},
		setTotal: function(value) {
			Total = value;
		}
	}
})