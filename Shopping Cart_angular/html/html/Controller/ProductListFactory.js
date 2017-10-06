
AssesmentModule.factory('ProductListFactory', ['$http', '$q', function ($http, $q) {

       
        var data = {};

 
        data.getProductlists = function () {
            // defer promise
            var defer = $q.defer();

            $http({
                method: "GET",
                url: "http://staging.discernliving.com/discern/product/products?page=0&field_product_categories_tid[]=2265&sort_by=commerce_price_amount&sort_order=ASC"
                
            })
                .then(function success(response) {
                    defer.resolve(response);

                }, function error(response) {
                    defer.reject(response);

                });
            return defer.promise;
        };

        // return factory data
        return data;

    }]);


