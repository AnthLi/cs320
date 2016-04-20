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

.controller('PdfCtrl', ['$scope', 'PDFViewerService', function($scope, pdf) {
  $scope.viewer = pdf.Instance("viewer");

  $scope.nextPage = function() {
    $scope.viewer.nextPage();
  };

  $scope.prevPage = function() {
    $scope.viewer.prevPage();
  };

  $scope.pageLoaded = function(curPage, totalPages) {
    $scope.currentPage = curPage;
    $scope.totalPages = totalPages;
  };
}])

.controller('NewInspectionDetailCtrl', function($scope, $stateParams, NewInspection) {
  $scope.chat = NewInspection.get($stateParams.newinspectionId);
})

.controller('SettingsCtrl', function($scope) {

});
