

AssesmentModule.controller('ProductList', ['$scope', '$rootScope', '$http', '$localStorage', 'ProductListFactory', function ($scope, $rootScope, $http, $localStorage, ProductListFactory) {

    $scope.CartTotal = function () {
        $rootScope.cartcount = $localStorage.items.length;

    };
    if ($localStorage.items === undefined) {
        $localStorage.items = [];
        $rootScope.cartcount = "0";
    }
    else {
        $scope.CartTotal();
    }
  
    $scope.Productlists = [];
    $scope.PopupData = function () {

        ProductListFactory.getProductlists()
            .then(function success(response) {
                $scope.Productlists = angular.fromJson(response.data);

            }, function error(response) {
                console.log(response);
            });

    };
    
    $scope.addToCart = function (id, title, price,imgurl) {
  
        var found = false;
        angular.forEach($localStorage.items, function (items) {
            if (items.id === id) {
                (items.quantity++);
                found = true;
            }
        });
        if (!found) {

            $localStorage.items.push(angular.extend({
                id: id,
                title: title,
                quantity: 1,
                price: price,
                imgurl: imgurl
            }, id))
            $scope.CartTotal();
        }
    };

   
   
}]);

