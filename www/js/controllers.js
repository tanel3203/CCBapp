
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

.controller('LoginSocialCtrl', function($scope, $rootScope, Users) {


 
    console.log("Work started");
      var app = firebase.initializeApp(config);
      var auth = app.auth();
      $rootScope.users = Users;


        auth.onAuthStateChanged(function(user) {
        if (user) {
          $rootScope.userId = user.uid;
          $rootScope.user = user;
          console.log("User signed in! ");
          console.log(user);

        } else {
          console.log("User logged out");

          // FirebaseUI config.
          var uiConfig = {
            'signInSuccessUrl': '#/app/main',
            'signInOptions': [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            ],
            'callbacks': {
              'signInSuccess': function(currentUser, credential, redirectUrl) {
                  console.log("LOGGING IN");
                  console.log(credential);
                  console.log(currentUser);
                  $rootScope.user = currentUser.displayName;
                  $rootScope.userId = currentUser.uid;
                  $rootScope.userEmail = currentUser.email;
                  $rootScope.userPhoto = currentUser.photoURL;
                  $rootScope.accessToken = credential;

                  console.log("users " + $rootScope.users);

                  function userExistsInUsers(user) {
                    return user.userId === $rootScope.userId;
                  };

                  if (!$rootScope.users.find(userExistsInUsers) ) {
                    $rootScope.users.$add({
                      'user': $rootScope.user,
                      'userId':$rootScope.userId,
                      'userEmail':$rootScope.userEmail,
                      'userPhoto':$rootScope.userPhoto
                    });   
                    console.log("New user added to the database!");                   
                  } else {
                    console.log("User is already in database");
                  }
         
                return true;
              }
            }
          };
          var ui = new firebaseui.auth.AuthUI(auth);
          // The start method will wait until the DOM is loaded.
          ui.start('#firebaseui-auth-container', uiConfig);

        }
      });




    console.log("Work finished");


})
.controller('LoginUserCtrl', function($scope, $rootScope, $ionicModal) {

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
          $rootScope.user = success.email;
          console.log("username: " + $rootScope.user);
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
.controller('ListCtrl', function($scope, $rootScope, $ionicListDelegate, Items) {
  console.log($rootScope.user);
  $scope.items = Items;

  $scope.addItem = function() {
    if ($rootScope.user) {
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
.controller('MainCtrl', function($scope, $rootScope, Matches, Users) {
  $scope.matchesObj = Matches;
  $rootScope.users = Users;
  console.log($scope.matchesObj)



})
.controller('BrowseCtrl', function($scope, $rootScope) {
    console.log("Browse page");
    console.log("USER: " + $rootScope.user);

});