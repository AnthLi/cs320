var app = angular.module('inspectorGadget.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('NewInspectionCtrl', function($scope, $filter,
  NewInspectionFields, Violations) {
  $scope.fields = NewInspectionFields.newInspFields();
  // List of checked violations and corrective actions
  $scope.checkedV = Violations.checkedV();
  $scope.checkedCA = Violations.checkedCA();

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

  // Format timein and timeout to only have hours, minutes, and AM/PM
  $scope.$watch('formData.timein', function(time) {
    $scope.formData.timein = $filter('date')(time, 'hh:mm a');
  });

  $scope.$watch('formData.timeout', function(time) {
    $scope.formData.timeout = $filter('date')(time, 'hh:mm a');
  });

  $scope.processForm = function() {
    //TODO: do something with the form data
  };
});

app.controller('AddViolationCtrl', function($scope, $stateParams, Violations) {
  // List of violations
  $scope.vList = Violations.vList();
  // List of corrective actions
  $scope.caList = Violations.caList();
  // List of checked violations and corrective actions
  $scope.checkedV = Violations.checkedV();
  $scope.checkedCA = Violations.checkedCA();

  // Toggle a violation by adding or removing it from the list of checked off
  // violations, and mark it as checked or unchecked.
  $scope.toggleV = function(v) {
    if ($scope.checkedV.indexOf(v.name) < 0) {
      $scope.checkedV.push(v.name);
      $scope.checkedV.sort();
    } else {
      $scope.checkedV.splice($scope.checkedV.indexOf(v.name), 1);
    }

    // Maybe think of a more efficient way to do this...?
    for (var i = 0; i < $scope.vList.length; i++) {
      for (var j = 0; j < $scope.vList[i].violations.length; j++) {
        if ($scope.vList[i].violations[j].name === v.name) {
          $scope.vList[i].violations[j].checked = true;
        }
      }
    }
  }

  // Toggle a corrective action by adding or removing it from the list of
  // checked off corrective actions, and mark it as checked or unchecked.
  $scope.toggleCA = function(ca) {
    if ($scope.checkedCA.indexOf(ca.name) < 0) {
      $scope.checkedCA.push(ca.name);
      $scope.checkedCA.sort();
    } else {
      $scope.checkedCA.splice($scope.checkedCA.indexOf(ca.name), 1);
    }

    for (var i = 0; i < $scope.caList.length; i++) {
      if ($scope.caList[i].name === ca.name) {
        $scope.caList[i].checked = true;
      }
    }
  }
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
