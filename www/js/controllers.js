
angular.module('starter.controllers', ['firebase', 'ngStorage'])
.controller('AppCtrl', function($scope, StorageService, $localStorage, $sessionStorage) {

    $scope.things = StorageService.getAll();
    $scope.add = function (newThing) {
      StorageService.add(newThing);
    };
    $scope.remove = function (thing) {
      StorageService.remove(thing);
    };

})

.controller('LoginSocialCtrl', function($scope, $rootScope) {


 
    console.log("Work started");
 

      // FirebaseUI config.
      var uiConfig = {
        'signInSuccessUrl': '#/app/main',
        'signInOptions': [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        'callbacks': {
          'signInSuccess': function(currentUser, credential, redirectUrl) {
              console.log(credential);
              $rootScope.user = currentUser;
              $rootScope.accessToken = credential;
            return true;
          }
        }
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var app = firebase.initializeApp(config);
      var auth = app.auth();
      var ui = new firebaseui.auth.AuthUI(auth);
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
    console.log("Work finished");


})
.controller('LoginUserCtrl', function($scope, $ionicModal) {

  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login_user.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
 // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);



    var username = $scope.loginData.username;
    var password = $scope.loginData.password;
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(function(success) {
          console.log("Success!");
          console.log(success);
          $scope.user = success.email;
          console.log("username: " + $scope.user);
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message; 
      console.log("ERROR code: " + errorCode);
      console.log("ERROR msg: " + errorMessage);
      // ...
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  }; 

})
.controller('ListCtrl', function($scope, $ionicListDelegate, Items) {

  $scope.items = Items;

  $scope.addItem = function() {
    if ($scope.user) {
      var name = prompt('What do you need to buy?');
    } else {
      console.log("You are not logged in!");
    }
    
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
})
.controller('MainCtrl', function($scope, Matches) {
  $scope.matchesObj = Matches;
  console.log($scope.matchesObj)
})
.controller('BrowseCtrl', function($scope, $rootScope) {
    console.log("Browse page");
    console.log("USER: " + $rootScope.user);

});