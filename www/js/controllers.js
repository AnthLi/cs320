angular.module('starter.controllers', [])

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
})

.controller('PdfCtrl', function($scope) {

})

.controller('NewInspectionDetailCtrl', function($scope, $stateParams, NewInspection) {
  $scope.chat = NewInspection.get($stateParams.newinspectionId);
})


.controller('AddViolationCtrl', function($scope){
})


.controller('SettingsCtrl', function($scope) {

});
