
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


	  graphsFac.dataset = function() { 

			var data = [  
                
						{x: '2015-05-14',  z: 1, a:1, b: 663},
						{x: '2015-05-15',  z: 2, a:1, b: -1360},
						{x: '2015-05-16', y: 95, z: 3, a:1, b: 190},
						{x: '2015-05-17', y: 94.9, z: 4, a:1, b: 429},
						{x: '2015-05-18', y: 94.9, z: 5, a:1, b: -466},
						{x: '2015-05-19', y: 95, z: 6, a:1, b: 667},
						{x: '2015-05-20', y: 94.1, z: 7, a:1, b: 219},
						{x: '2015-05-21', y: 94, z: 8, a:1, b: 313},
						{x: '2015-05-22', y: 94.9, z: 9, a:1, b: 9},
						{x: '2015-05-23', y: 93.5, z: 10, a:1, b: 2},
						{x: '2015-05-24', y: 93.5, z: 11, a:1, b: 20},
						{x: '2015-05-25', y: 94.3, z: 12, a:1, b: -930},
						{x: '2015-05-26', z: 13, a:1, b: -744},
						{x: '2015-05-27', z: 14, a:1, b: 625},
						{x: '2015-05-28', z: 15, a:1, b: -428},
						{x: '2015-05-29', y: 94.4, z: 16, a:1, b: -491},
						{x: '2015-05-30', z: 17, a:1, b: -182},
						{x: '2015-05-31', z: 18, a:1, b: -336},
						{x: '2015-06-01', y: 95.3, z: 19, a:1, b: 689},
						{x: '2015-06-02', y: 94.1, z: 20, a:1, b: 288}
                   
			];

		return data;
		};
	  graphsFac.dataset2 = function() { 

			var data = [  
                
						{x: '2015-05-14', z: 1, a:1},
						{x: '2015-05-15', z: 2, a:1},
						{x: '2015-05-16', z: 3, a:1},
						{x: '2015-05-17', z: 4, a:1},
						{x: '2015-05-18', z: 5, a:1},
						{x: '2015-05-19', z: 6, a:1},
						{x: '2015-05-20', z: 7, a:1},
						{x: '2015-05-21', z: 8, a:1},
						{x: '2015-05-22', z: 9, a:1},
						{x: '2015-05-23', z: 10, a:1},
						{x: '2015-05-24', z: 11, a:1},
						{x: '2015-05-25', z: 12, a:1},
						{x: '2015-05-26', z: 13, a:1},
						{x: '2015-05-27', z: 14, a:1},
						{x: '2015-05-28', z: 15, a:1},
						{x: '2015-05-29', z: 16, a:1},
						{x: '2015-05-30', z: 17, a:1},
						{x: '2015-05-31', z: 18, a:1},
						{x: '2015-06-01', z: 19, a:1},
						{x: '2015-06-02', z: 20, a:1}
                   
			];

		return data;
		};
	  graphsFac.data = function() { 

			var data = [  
                {
                    values: [
						{x: '2015-05-14', y: 0},
						{x: '2015-05-15', y: 0},
						{x: '2015-05-16', y: 95},
						{x: '2015-05-17', y: 94.9},
						{x: '2015-05-18', y: 94.9},
						{x: '2015-05-19', y: 95},
						{x: '2015-05-20', y: 94.1},
						{x: '2015-05-21', y: 94},
						{x: '2015-05-22', y: 94.9},
						{x: '2015-05-23', y: 93.5},
						{x: '2015-05-24', y: 93.5},
						{x: '2015-05-25', y: 94.3},
						{x: '2015-05-26', y: 0},
						{x: '2015-05-27', y: 0},
						{x: '2015-05-28', y: 0},
						{x: '2015-05-29', y: 94.4},
						{x: '2015-05-30', y: 0},
						{x: '2015-05-31', y: 0},
						{x: '2015-06-01', y: 95.3},
						{x: '2015-06-02', y: 94.1}
                    ],      //values - represents the array of {x,y} data points
                    key: 'Weight', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: [
						{x: '2015-05-14', y: 663},
						{x: '2015-05-15', y: -1360},
						{x: '2015-05-16', y: 190},
						{x: '2015-05-17', y: 429},
						{x: '2015-05-18', y: -466},
						{x: '2015-05-19', y: 667},
						{x: '2015-05-20', y: 219},
						{x: '2015-05-21', y: 9},
						{x: '2015-05-22', y: 313},
						{x: '2015-05-23', y: 2},
						{x: '2015-05-24', y: 20},
						{x: '2015-05-25', y: -930},
						{x: '2015-05-26', y: -744},
						{x: '2015-05-27', y: 625},
						{x: '2015-05-28', y: -428},
						{x: '2015-05-29', y: -491},
						{x: '2015-05-30', y: -182},
						{x: '2015-05-31', y: -336},
						{x: '2015-06-01', y: 689},
						{x: '2015-06-02', y: 288}
                    ],
                    key: 'Calories',
                    color: '#2ca02c'
                }
			];

			data2 = [{key:"DataContainer", y:data}];
		return data;
		}

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
	.factory('UserData', ['$firebaseArray', function($firebaseArray) {
	  var userDataRef = new Firebase('https://projekt1-eafbc.firebaseio.com/userData');
	  return $firebaseArray(userDataRef);
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