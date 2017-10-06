AssesmentModule.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            views: {
               
                'templateview': {
                    templateUrl: 'productlist.tpl.html',
                   // controller: 'ProductList'
                }
                
            }
        })

        .state('cart',
        {
            url: '/cart',
            views:
            {
                'templateview': {
                    templateUrl: 'cart.tpl.html',
                    controller: 'CartController'

                }


            }
        });
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});
});