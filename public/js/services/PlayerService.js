angular.module('PlayerService', []).factory('Player', ['$http', function($http) {

return {
  get : function() {
      return $http.get('/api/players');
  },

  create : function(playerData) {
      return $http.post('/api/players', playerData);
  },

  delete : function(id) {
      return $http.delete('/api/players/' + id);
  }
}       

}]);
