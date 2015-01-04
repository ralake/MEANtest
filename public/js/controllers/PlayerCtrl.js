angular.module('PlayerCtrl', []).controller('PlayerController', function($scope, $http) {

    $http.get('/api/players').success(function(data) {
      $scope.playerList = data;
    });

});