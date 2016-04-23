angular.module('starter.controllers', ['ngSanitize'])

.controller('DashCtrl', function($scope) {})

.controller('NewInspectionCtrl', function($scope, NewInspection) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = NewInspection.all();
  $scope.remove = function(chat) {
    NewInspection.remove(chat);
  };

  $scope.formData = {};

  $scope.processForm = function() {
    alert('sick shit');
  }
})

// Search function source: <!-- Source: http://goo.gl/H2455O -->
// Controller for the Form Viewer containing each selectable form for the user.
// Starting off, there is no form selected, so the Form Viewer won't show up
// until $scope.selection isn't null.
// $scope.getFromPath returns the path of the form selected by the user, which
// will bring up the Form Viewer with the selected form.
.controller('FormsCtrl', function($scope, Forms) {
  $scope.forms = Forms.all();
})

.controller('FormViewerCtrl', function($scope, $stateParams, Forms) {
  $scope.form = Forms.get($stateParams.formPath);

  $scope.getFromPath = function(path) {
    return "lib/pdfjs-dist/web/viewer.html?file=/forms/" + path;
  };
})

.controller('AddViolationCtrl', function($scope) {

})