
angular.module('starter.services', ['firebase'])

	.factory('Items', ['$firebaseArray', function($firebaseArray) {
	  var itemsRef = new Firebase('https://projekt1-eafbc.firebaseio.com/items');
	  return $firebaseArray(itemsRef);
	}])


