var app = angular.module('inspectorGadget.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('NewInspectionCtrl', function($scope, Violations) {
  $scope.violations = Violations.all();
  $scope.formData = {};
  // Yo database dogs...
  // $scope.formData is a javascript object and contains all the formData
  // fields: estName - name of establishment
  // date
  // address
  // owner
  // phone
  // PIC - person in charge
  // permitno - permit number
  // inspector
  // risklvl
  // prevInspDate - previous inspection date
  // timein
  // timeout
  // typeofOp - type of operation (e.g. retail, food service, residential, etc.)
  // typeofInsp - type of inspection (routine, re-inspection)

  // HACCP - i have no idea how to get the value from the checkbox :/

  $scope.processForm = function() {
    //TODO: do something with the form data
  }
});

app.controller('AddViolationCtrl', function($scope, $stateParams, Violations) {
  $scope.violation = Violations.get($stateParams.violationID);
});

// Controller containing each Form accessible to the user. Once the user selects
// a Form, it will direct him to the Form Viewer page where he/she can scroll
// through and search the Form.
app.controller('FormsCtrl', function($scope, Forms) {
  // All available forms to the user
  $scope.forms = Forms.all();

  // Source: http://goo.gl/r9dkjh
  // Search query based on user input, allowing the user to filter certain forms
  $scope.query = '';

  // Source: http://goo.gl/r9dkjh
  // Clears the search bar when triggered by the user
  $scope.clearSearch = function() {
    $scope.query = '';
  };
});

app.controller('FormViewerCtrl', function($scope, $stateParams, Forms) {
  $scope.form = Forms.get($stateParams.formPath);

  // Gets the path to a form so that the Form Viewer can open it
  $scope.getFormPath = function(path) {
    return "lib/pdfjs-dist/web/viewer.html?file=/forms/" + path;
  };
});