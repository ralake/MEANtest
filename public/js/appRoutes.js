angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider

    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })

    .when('/players', {
      templateUrl: 'views/player.html',
      controller: 'PlayerController'
    });

  $locationProvider.html5Mode(true);

}]);