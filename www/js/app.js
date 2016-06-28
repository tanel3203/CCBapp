
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.services'])

  .config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('app', {
    	url: '/app',
    	abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
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

  .state('app.browse', {
    url: '/browse',
    views: {
      'mainContent': {
        templateUrl: 'templates/browse.html',
        controller: 'BrowseCtrl'
      }
    }
  })
    $urlRouterProvider.otherwise("/app/home");


  });