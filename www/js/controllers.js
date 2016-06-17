// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter.controllers', [])


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