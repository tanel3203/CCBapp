
angular.module('starter.services', ['firebase', 'ngStorage'])

	.factory('Items', ['$firebaseArray', function($firebaseArray) {
	  var itemsRef = new Firebase('https://projekt1-eafbc.firebaseio.com/items');
	  return $firebaseArray(itemsRef);
	}])

	.factory('Matches', function() {
	  var matchesObj = [
	  	{
	  		name: "John Smith",
	  		image: "imageURL"
	  	},
	  	{
	  		name: "Jane Smith",
	  		image: "imageURL"
	  	}
	  ];


	  
	  return matchesObj;
	})

	.factory ('StorageService', function ($localStorage, $sessionStorage) {

	$localStorage = $localStorage.$default({
  		things: []
	});

	var _getAll = function () {
	  return $localStorage.things;
	};
	var _add = function (thing) {
	  $localStorage.things.push(thing);
	}
	var _remove = function (thing) {
	  $localStorage.things.splice($localStorage.things.indexOf(thing), 1);
	}
	return {
	    getAll: _getAll,
	    add: _add,
	    remove: _remove
	  };
	})