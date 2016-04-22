// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'starter.controllers',
  'starter.services'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins &&
      window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('page', {
    url: '/page',
    abstract: true,
    templateUrl: 'templates/pages.html'
  })

  // Each tab has its own nav history stack:

  .state('page.dash', {
    url: '/dash',
    views: {
      'page-dash': {
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('page.newinspection', {
    url: '/newinspection',
    views: {
      'page-newinspection': {
        templateUrl: 'templates/newinspection.html',
        controller: 'NewInspectionCtrl'
      }
    }
  })
  .state('page.newinspection-detail', {
    url: '/newinspection/:chatId',
    views: {
      'page-newinspection': {
        templateUrl: 'templates/newinspection-detail.html',
        controller: 'NewInspectionDetailCtrl'
      }
    }
  })

  .state('page.pdfviewer', {
    url: '/pdfviewer',
    views: {
      'page-pdfviewer': {
        templateUrl: 'templates/pdfviewer.html',
        controller: 'PdfCtrl'
      }
    }
  })

/*
  .state('page.addviolation', {
    url: '/addviolation',
    views: {
      'page-addviolation': {
        templateUrl: 'templates/addviolation.html',
        controller: 'AddViolationCtrl'
      }
    }
  })
*/


  .state('page.settings', {
    url: '/settings',
    views: {
      'page-settings': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page/dash');

});
