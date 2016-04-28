var app = angular.module('inspectorGadget.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('NewInspectionCtrl', function($scope, NewInspectionFields) {
  $scope.fields = NewInspectionFields.newInspFields();

  $scope.formData = {
    estName: '',
    date: '',
    address: '',
    owner: '',
    phone: '',
    PIC: '',
    permitno: '',
    inspector: '',
    risklvl: '',
    prevInspDate: '',
    timein: '',
    timeout: '',
    HACCP: false,
    typeofOp: '',
    typeofInsp: ''
  };

  $scope.processForm = function() {
    //TODO: do something with the form data
  };
});

app.controller('AddViolationCtrl', function($scope, $stateParams, Violations) {
  $scope.violations = Violations.allViolations();
  $scope.correctiveactions = Violations.allCorrectiveActions();
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

  // Clears the search bar when triggered by the user
  $scope.clearSearch = function() {
    $scope.query = '';
  };
});

app.controller('FormViewerCtrl', function($scope, $stateParams, Forms) {
  $scope.form = Forms.get($stateParams.formName, $stateParams.date);
});

// Same thing as FormsCtrl and FormViewerCtrl, but for the Food Codes instead
app.controller('FoodCodesCtrl', function($scope, FoodCodes) {
  // Food Codes available for the user to search through
  $scope.foodCodes = FoodCodes.all();
});

app.controller('FoodCodeViewerCtrl', function($scope, $stateParams, FoodCodes) {
  $scope.foodCode = FoodCodes.get($stateParams.foodCodePath);

  // Gets the path to a Food Code for the user to search through
  $scope.getFormPath = function(path) {
    var formViewerURL = 'lib/pdfjs-dist/web/viewer.html?file=';
    var formURL = '/foodcodes/';
    if (ionic.Platform.isIOS()) {
      formURL = '../../../foodcodes/';
    }

    return formViewerURL + formURL + path;
  };
});
