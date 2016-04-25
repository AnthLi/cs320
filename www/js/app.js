var app = angular.module('inspectorGadget', [
  'ionic',
  'inspectorGadget.controllers',
  'inspectorGadget.services'
]);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar
    // above the keyboard for form inputs)
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
});

// Place the nav-bar on the bottom of the screen for Android
app.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
}]);

// Ionic uses AngularUI Router which uses the concept of states
// Learn more here: https://github.com/angular-ui/ui-router
// Set up the various states which the app can be in.
// Each state's controller can be found in controllers.js
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('page', {
    url: '/page',
    abstract: true,
    templateUrl: 'templates/pages.html'
  })

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

  .state('page.addviolation', {
    url: '/addviolation',
    views: {
      'page-addviolation': {
        templateUrl: 'templates/addviolation.html',
        controller: 'AddViolationCtrl'
      }
    }
  })

  .state('page.forms', {
    url: '/forms',
    views: {
      'page-forms': {
        templateUrl: 'templates/forms.html',
        controller: 'FormsCtrl'
      }
    }
  })

  .state('page.formviewer', {
    url: '/forms/:formName',
    views: {
      'page-forms': {
        templateUrl: 'templates/formviewer.html',
        controller: 'FormViewerCtrl'
      }
    }
  })

  .state('page.foodcodes', {
    url: '/foodcodes',
    views: {
      'page-foodcodes': {
        templateUrl: 'templates/foodcodes.html',
        controller: 'FoodCodesCtrl'
      }
    }
  })

  .state('page.foodcodeviewer', {
    url: '/foodcodes/:foodCodePath',
    views: {
      'page-foodcodes': {
        templateUrl: 'templates/foodcodeviewer.html',
        controller: 'FoodCodeViewerCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/page/dash');
});