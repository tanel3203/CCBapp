
angular.module('starter.services', ['firebase', 'ngStorage'])
	.factory('d3Service', ['$document', '$q', '$rootScope',
	    function($document, $q, $rootScope) {
	      var d = $q.defer();
	      function onScriptLoad() {
	        // Load client in the browser
	        $rootScope.$apply(function() { d.resolve(window.d3); });
	      }
	      // Create a script tag with d3 as the source
	      // and call our onScriptLoad callback when it
	      // has been loaded
	      var scriptTag = $document[0].createElement('script');
	      scriptTag.type = 'text/javascript'; 
	      scriptTag.async = true;
	      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
	      scriptTag.onreadystatechange = function () {
	        if (this.readyState == 'complete') onScriptLoad();
	      }
	      scriptTag.onload = onScriptLoad;
	 
	      var s = $document[0].getElementsByTagName('body')[0];
	      s.appendChild(scriptTag);
	 
	      return {
	        d3: function() { return d.promise; }
	      };
	}])
	.factory('Chats', ['$firebaseArray', function Chats($firebaseArray) {
	  
	  var chatsFac = {};

	  function stripFunctions(chatsArr) {
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
			return chatsArr;
	  };

	  chatsFac.updateChatInChats = function(chatId, messages) {
	  		console.log(chatId);
	  		var msgs = stripFunctions(messages);
	  		console.log(msgs);
		    firebase.database().ref('dialogues/' + chatId).update({
		    messages: msgs
		  });
	  };
	  chatsFac.getChatFromChats = function(chatId) {

	  var ref = new Firebase('https://projekt1-eafbc.firebaseio.com/dialogues/' + chatId + '/messages');
	  return $firebaseArray(ref);

console.log("--------- FACTORY");
	  };

	  
	  return chatsFac;
    
	}])

	.factory('PieChart', [function() {
		var graphsFac = {};

	  graphsFac.options = function() {
			var options = {  
				  "chart": {
				    "type": "lineChart",
				    "x": function(d) {
				    	return new Date(d.x);
				    },
				    "height": 450,
				    "margin": {
				      "top": 20,
				      "right": 20,
				      "bottom": 40,
				      "left": 55
				    },
				    "xScale": d3.time.scale(),
				    "xAxis": {
						ticks: d3.time.days, 
						axisLabel: '', 
						tickFormat: function(d) { 
							console.log(d3.time.format('%Y-%m-%d')(new Date(d)));

							return d3.time.format('%Y-%m-%d')(new Date(d));
						},
				    	showMaxMin: true
				    },
				    "yAxis1": {
				      "axisLabel": "Voltage (v)",
				      "axisLabelDistance": -10
				    },
				    "yAxis2": {
				      "axisLabel": "Voltage (v)",
				      "axisLabelDistance": -10
				    }
				  }
					  };
	
		return options;
	};

		return graphsFac;
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
	.factory('UserData', ['$firebaseArray', '$rootScope', function($firebaseArray, $rootScope) {
	  var userDataRef = new Firebase('https://projekt1-eafbc.firebaseio.com/userData');
	  var ref = $firebaseArray(userDataRef);
	  console.log(ref);



	  return ref;
	}])

	// Logic factory for filling Targets table
	.factory('TargetsData', ['$firebaseArray', function($firebaseArray) {
	  var userDataRef = new Firebase('https://projekt1-eafbc.firebaseio.com/userData');
	  var refArray = $firebaseArray(userDataRef);
	  var targetsFac = {};
	  var targetsData = [];
	targetsFac.returnTargetsData = function () {


		  // Sum all nth values in an array of objects
		  function sumAll(array, indexRef) {
		  	var total = 0;
		  	for (var val in array) {
		  		if (val.startsWith('$')) {
		  		} else {
		  			total += parseInt(array[val][indexRef]);
		  		}
		  	}
		  	return total;
		  }

		  // Get the nearest 10k value below the current value
		  function nearestFloor10K(value) {
		  	var flooredValue = Math.floor(value/10000)*10000;
		  	return flooredValue;
		  };

		  // Returns newest Date
		  function newestDateAndWeight(array) {

		  	for (var i = 1; i < array.length; i++) {
		  		var currentDate = array[i].date;
		  		var highestIndex = 0;
		  		var highestDate = array[highestIndex].date;
		  		if (new Date(currentDate) > new Date(highestDate)) {
		  			highestIndex = i;
		  			highestDate = array[highestIndex].date;
		  		}
		  	}
		  	var dateAndWeight = {'Weight': array[highestIndex].weight, 'date': highestDate}
		  	return dateAndWeight;
		  };

		  // Push key-value pairs to array
		  function pushToArray(array,key1,value1,key2,value2,key3,value3,key4,value4,key5,value5,key6,value6) {
		  	array.push({
		  		'Weight': value1,
		  		'Target': value2,
		  		'weeklyLoss': value3,
		  		'CCB': value4,
		  		'Weeks': value5,
		  		'TargetDates': value6

		  	})
		  	return array;
		  }

		  // OLS model 
		  function olsModel(intercept, beta1, calories) {
		  	var weight = intercept+(beta1*calories);
		  	return weight;
		  }

		  // Add weeks in mm-dd-yyyy format
		  function addWeeks(current, weeksToAdd) {
		  	var currentDate = new Date(current);
		  	currentDate.setDate(currentDate.getDate()+(7*weeksToAdd));
		  	var mm = currentDate.getMonth()+1;
		  	var dd = currentDate.getDate();
		  	var y = currentDate.getFullYear();
		  	
		  	var newDate = (currentDate.getMonth()+1)+"-"+currentDate.getDate()+"-"+currentDate.getFullYear();
		  	return newDate;
		  	
		  }

		  refArray.$loaded().then(function() {
		  	var cumulativeCalorieBalance = sumAll(refArray,"calories");

		  	// Fill arrays that are entered into the targets data object
			var target1 = nearestFloor10K(cumulativeCalorieBalance);
			var dateAndWeight1 = newestDateAndWeight(refArray);
			var weight1 = dateAndWeight1.Weight;
			var date1 = dateAndWeight1.date;
			var weeklyLoss = (250*7);
		  	var targets = [];
		  	var ccbs = [];
		  	var weeks = [];
		  	var weights = [];
		  	var targetDates = [];
			for (var i = 1; i<=3;i++){
				if (i === 1) {
					targets.push(target1);
					ccbs.push(target1-cumulativeCalorieBalance);
					weeks.push(ccbs[0]/weeklyLoss);
					weights.push(weight1);
					targetDates.push(addWeeks(date1,(-weeks[0]))); 
				} else {
					var current_target = target1-((i-1)*10000);
					var current_ccb = current_target-cumulativeCalorieBalance;
					targets.push(current_target);
					ccbs.push(current_ccb);
					weeks.push(current_ccb/weeklyLoss);
					weights.push(olsModel(93.61322993,0.00007988293642,current_target));
					targetDates.push(addWeeks(date1,(-weeks[i-1])));
				}
			};
			// arrays are filled.
		  	
		  	// Push data to data object
		  	for (var i = 1; i <= 3; i++) {
		  		pushToArray(targetsData, 
		  			'Weight', Math.round(weights[i-1]).toFixed(1), 
		  			'Target', targets[i-1], 
		  			'weeklyLoss', weeklyLoss, 
		  			'CCB', ccbs[i-1], 
		  			'Weeks',Math.round(weeks[i-1]).toFixed(1),
		  			'TargetDates', targetDates[i-1])
		  	}
		  
			
		  });

		  	return targetsData;
		
		  
	};

	  return targetsFac;
	}])
	.factory('BrowseTemp', ['$firebaseArray', function($firebaseArray) {

   		var ref = firebase.database().ref("dialogues/" + chatId + "/messages");

	    ref.on('value',function(snapshot) {
	      console.log(snapshot.val());
	    });

	  return $firebaseArray(ref);
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