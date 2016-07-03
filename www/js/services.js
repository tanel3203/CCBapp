
angular.module('starter.services', ['firebase', 'ngStorage'])

	.factory('Chats', ['$firebaseArray', function($firebaseArray) {
	  
	  var chatsFac = {};

	  chatsFac.updateChatInChats = function(chatId, messages) {
	  		console.log(chatId);
	  		var msgs = angular.toJson(messages);
	  		console.log(msgs);
		    firebase.database().ref('dialogues/' + chatId).update({
		    messages: msgs
		  });
	  };
	  chatsFac.getChatFromChats = function(chatId) {
	  	var chatsRef = new Firebase('https://projekt1-eafbc.firebaseio.com/dialogues/' + chatId + '/messages');
	  	var chatsArr = $firebaseArray(chatsRef);
console.log("FACTORY -------");
console.log('https://projekt1-eafbc.firebaseio.com/dialogues/' + chatId + '/messages');

chatsArr.$loaded().then(function() {
	console.log(chatsArr);

chatsArr = angular.fromJson(chatsArr);
console.log(chatsArr);
});



/*
chatsArr.$loaded().then(function() {


delete chatsArr.$add;
delete chatsArr.$save;
delete chatsArr.$indexFor;
delete chatsArr.$keyAt;
delete chatsArr.$loaded;
delete chatsArr.$ref;
delete chatsArr.$remove;
delete chatsArr.$save;
delete chatsArr.$watch;
delete chatsArr.$destroy;
delete chatsArr.$$error;
delete chatsArr.$$added;
delete chatsArr.$$notify;
delete chatsArr.$$process;
delete chatsArr.$getRecord;
delete chatsArr.$$updated;
delete chatsArr.$$moved;
delete chatsArr.$$getKey;
delete chatsArr.$$removed;

			for (var obj in chatsArr) {
				delete chatsArr[obj].$id;
				delete chatsArr[obj].$priority;
			}



}).then(function() {
	console.log(chatsArr);

});
*/
console.log("--------- FACTORY");
	  	return chatsArr;
	  };

	  
	  return chatsFac;
    
	}])

	.factory('Dialogues', ['$firebaseArray', function($firebaseArray) {
	  var dialoguesRef = new Firebase('https://projekt1-eafbc.firebaseio.com/dialogues');
	  
	  return $firebaseArray(dialoguesRef);
    
	}])

	.factory('Users', ['$firebaseArray', function($firebaseArray) {
	  var usersRef = new Firebase('https://projekt1-eafbc.firebaseio.com/users');
	  return $firebaseArray(usersRef);
	}])

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