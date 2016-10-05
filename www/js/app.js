
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 
                            'firebase', 
                            'ngStorage', 
                            'starter.controllers', 
                            'starter.services',
                            'starter.directives',
                            'nvd3'
                            ])

  .config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('app', {
    	url: '/app',
    	abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
  })

  .state('app.login_fb', {
    url: '/login_fb',
    views: {
      'mainContent': {
        templateUrl: 'templates/login_fb.html',
        controller: 'LoginSocialCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'ListCtrl'
      }
    }
  })

  .state('app.main', { 
    url: '/main',
    views: {
      'mainContent': {
        templateUrl: 'templates/main.html',
        controller: 'MainCtrl'
      }
    }
  })
  .state('app.graphs', { 
    url: '/graphs',
    views: {
      'mainContent': {
        templateUrl: 'templates/graphs.html',
        controller: 'GraphsCtrl'
      }
    }
  })
  .state('app.charts', { 
    url: '/charts',
    views: {
      'mainContent': {
        templateUrl: 'templates/charts.html',
        controller: 'ChartsCtrl'
      }
    }
  })
  .state('app.progress', { 
    url: '/progress',
    views: {
      'mainContent': {
        templateUrl: 'templates/progress.html',
        controller: 'ProgressCtrl'
      }
    }
  })
  .state('app.chat', {
    url: '/chat',
    views: {
      'mainContent': {
        templateUrl: 'templates/chat.html',
        controller: 'MessagesCtrl'
      }
    }
  })
  .state('app.chatDialogue', {
    url: '/chat/:dialoguePartnerUserId',
    views: {
      'mainContent': {
        templateUrl: 'templates/chat.html',
        controller: 'MessagesCtrl' /*,
        resolve: {
          dialogues: ['Dialogues', function(Dialogues){
            return Dialogues.query();
          }]
        }*/
      }
    }
  })
  .state('app.browse', {
    url: '/browse',
    views: {
      'mainContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowseCtrl'
      }
    }
  })
 
    $urlRouterProvider.otherwise("/app/login_fb");


  });