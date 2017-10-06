

AssesmentModule.controller('CartController', ['$scope', '$rootScope', '$http', '$localStorage', function ($scope, $rootScope, $http, $localStorage) {

   
    $scope.Cartlists = [];
    $scope.totalAmount = "";
    $scope.quantity = "";
    $scope.PopupCartlists= function () {
        $scope.Cartlists = $localStorage.items;
        console.log($localStorage.items);
        $scope.CalAmount();
        
    };

    $scope.addQty = function (id,qty) {

      
        angular.forEach($localStorage.items, function (items) {
            if (items.id === id) {
                items.quantity = qty;
                $scope.CalAmount();
            }
        });
      
    };


    $scope.CalAmount = function () {
        var totalAmount = 0;
        angular.forEach($localStorage.items, function (items) {
            totalAmount += items.quantity * items.price;
        })
        $scope.totalAmount=totalAmount;
        //return totalAmount;
    };
    $scope.kill = function (id) {

        //$localStorage.items.splice(id, 1);
       
        var index = $localStorage.items.indexOf(id);
        $localStorage.items.splice(index, 1);
        $rootScope.cartcount = $localStorage.items.length;
        $scope.CalAmount();
        //$window.localStorage.removeItem($window.localStorage.key(product));
       
    };
    $scope.deleteAllCartItem = function () {
        delete $localStorage.items;
        $localStorage.items = [];
        
    };
   
}]);

