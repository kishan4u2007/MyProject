angular.module('Checkout', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/checkout', {
		templateUrl : 'public/checkout/checkout.html',
		Controller: 'CheckoutCtrl'
	});
}])

.controller('CheckoutCtrl', ['$scope','CommonProp', '$localStorage', function ($scope, CommonProp, $localStorage) {
	
	//Getting Item for Localstorage
	$scope.selectedItems = $localStorage.shoppingCart;

	$scope.checkoutTotal = CommonProp.getTotal();

	//Shipping Charge Cart
	$scope.shippingCharge = 50

	//Increament Quentitity
	$scope.increamntQty = function(id, qty) {
		  angular.forEach($localStorage.shoppingCart, function (items) {
            if (items.id === id) {
                items.count = qty;
                 $scope.totalCartAmount();
            }
        });
	}
	//Total Cart Amount
	$scope.totalCartAmount = function () {
        var totalAmount = 0;
        angular.forEach($localStorage.shoppingCart, function (items) {
            totalAmount += items.count * items.price;
        })
        if(totalAmount === 0) {
        	$scope.shippingCharge = 0;
        	$scope.totalAmount= totalAmount;
        }
        $scope.totalAmount = totalAmount;
        //return totalAmount;
    };

    //Delete Single Item From Cart
    $scope.deleteCartItem = function (id) {              
        var index = $localStorage.shoppingCart.indexOf(id);
        $localStorage.shoppingCart.splice(index, 1);        
        $scope.totalCartAmount();
      
       
    };
    
    //Delete All Item From Cart
    $scope.deleteAllCartItem = function () {
        delete $localStorage.shoppingCart;
        $localStorage.shoppingCart = [];
        
    };


}])

