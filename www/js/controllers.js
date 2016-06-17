
angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {

})

.controller('ListCtrl', function($scope, $ionicListDelegate, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    var name = prompt('What do you need to buy?');
    if (name) {
      $scope.items.$add({
        'name': name
      });
    }
  };

  $scope.purchaseItem = function(item) {
    var itemRef = new Firebase('https://projekt1-eafbc.firebaseio.com/items/' + item.$id);
    itemRef.child('status').set('purchased');
    $ionicListDelegate.closeOptionButtons();
  };
});