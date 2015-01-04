angular.module('PlayerCtrl', []).controller('PlayerController', function($scope, $http) {

    $scope.tagline = 'Nothing beats a pocket protector!';
    $http.get('/api/players').success(function(data) {
      $scope.playerList = data;
    });

});