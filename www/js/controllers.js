
angular.module('starter.controllers', ['firebase', 'ngStorage'])
.controller('AppCtrl', function($scope, $state, StorageService, $localStorage, $sessionStorage) {

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
/* SIGNOUT, not updating after first round of signin and out
          document.getElementById('firebaseui-auth-container').textContent = "Sign Out";
         document.getElementById('firebaseui-auth-container').addEventListener("click", function() {
              firebase.auth().signOut().then(function() {
                console.log("Sign-out successful.");
              }, function(error) {
                console.log("An error happened.");
              });
            })
*/        

        } else {
          console.log("User logged out");
 
          // FirebaseUI config.
          var uiConfig = {
            'signInSuccessUrl': '#/app/main',
            'signInOptions': [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.FacebookAuthProvider.PROVIDER_ID
            ],
            siteName: "projekt1-eafbc",
            'callbacks': {
              'signInSuccess': function(currentUser, credential, redirectUrl) {
                  console.log("LOGGING IN");
                  console.log(credential);
                  console.log(currentUser);
                  $rootScope.user = currentUser.displayName;
                  $rootScope.userId = currentUser.uid;
                  $rootScope.userEmail = currentUser.email;
                  $rootScope.userPhoto = currentUser.photoURL;
                  $rootScope.provider = credential.provider;
                  $rootScope.accessToken = credential;

                  console.log("PROVIDER: " + $rootScope.provider);
                  console.log("users " + $rootScope.users);

                  function userExistsInUsers(user) {
                    return user.userId === $rootScope.userId;
                  };

                  if (!$rootScope.users.find(userExistsInUsers) ) {
                    $rootScope.users.$add({
                      'user': $rootScope.user,
                      'userId':$rootScope.userId,
                      'userEmail':$rootScope.userEmail,
                      'userPhoto':$rootScope.userPhoto,
                      'userProvider':$rootScope.provider
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
.controller('MainCtrl', function($scope, $location, $rootScope, Matches, Users) {
  $scope.matchesObj = Matches;
  $rootScope.users = Users;
  console.log("Users: ");
  console.log($rootScope.users);
  console.log($location);





})
.controller('BrowseCtrl', function($scope, $rootScope) {
    console.log("Browse page");
    console.log("USER: " + $rootScope.user);

})
.controller('MessagesCtrl', function($scope, $rootScope, $stateParams, $timeout, $ionicScrollDelegate, Dialogues) {

  $scope.partnerId = $stateParams.dialoguePartnerUserId;
  $scope.activeUserId = $rootScope.user.uid;
  console.log("Partner's ID: " + $scope.partnerId + ", my ID: " + $scope.activeUserId);

  // ----------------------------------------
  
      
  $scope.dialogues = Dialogues; 
  console.log("EXisting dialogues");
  console.log($scope.dialogues);
  console.log("----------------------------------");
  function findDialogue(dialogue) {
    console.log("Begin findDialogue");
    console.log(dialogue);
    console.log("Dialogue user1: " + dialogue.user1 + ", scope partnerId: " + $scope.partnerId);
    console.log("Dialogue user2: " + dialogue.user2 + ", scope myId: " + $scope.activeUserId);
    return (((dialogue.user1 === $scope.partnerId) && (dialogue.user2 === $scope.activeUserId) ) || ((dialogue.user2 === $scope.partnerId) && (dialogue.user1 === $scope.activeUserId)));
  };

  $scope.dialogues.$loaded()
    .then(function() {

          var dialogueExists = $scope.dialogues.find(findDialogue);
          console.log("dialogueExists " + dialogueExists);
          console.log(dialogueExists);
          console.log("..................");
          if (!dialogueExists) {
            $scope.dialogues.$add({
              'user1': $scope.partnerId,
              'user2': $scope.activeUserId
            });
            console.log("New dialogue added!");
          } else {
            console.log("Dialogue already exists");
          }
    }).catch(function(error) {
      console.log(error);
    });

  // -------------------------------- 
  $scope.showTime = true; 

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
  d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

})
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  }
})