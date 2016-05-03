var app = angular.module('inspectorGadget.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('NewInspectionCtrl', function($scope, $filter, $state,
  $cordovaSQLite, DB, NewInspection, Violations, Forms) {
  $scope.fields = NewInspection.newInspectFields();
  // List of checked violations and corrective actions
  $scope.checkedV = Violations.checkedV();
  $scope.checkedCA = Violations.checkedCA();
  $scope.detailedVList = Violations.detailedVList();

  $scope.formData = {
    name: '',
    date: '',
    address: '',
    owner: '',
    phone: '',
    pic: '',
    permitNum: '',
    inspector: '',
    riskLvl: '',
    prevInspectDate: '',
    timeIn: '',
    timeOut: '',
    haccp: false,
    typeofOp: '',
    typeofInsp: '',
    violations: [],
    corrActions: []
  };

  // Format timein and timeout to only have hours, minutes, and AM/PM
  $scope.$watch('formData.timeIn', function(time) {
    $scope.formData.timeIn = $filter('date')(time, 'hh:mm a');
  });

  $scope.$watch('formData.timeOut', function(time) {
    $scope.formData.timeOut = $filter('date')(time, 'hh:mm a');
  });

  $scope.processForm = function() {
    $scope.formData.violations = $scope.checkedV;
    $scope.formData.corrActions = $scope.checkedCA;

    var form = [
      $scope.formData.name,
      $scope.formData.owner,
      $scope.formData.pic,
      $scope.formData.inspector,
      $scope.formData.address,
      $scope.formData.town,
      $scope.formData.state,
      $scope.formData.zip,
      $scope.formData.phone,
      $scope.formData.permitNum,
      $scope.formData.date,
      $scope.formData.riskLvl,
      $scope.formData.prevInspectDate,
      $scope.formData.timeIn,
      $scope.formData.timeOut,
      $scope.formData.opType,
      $scope.formData.inspType,
      $scope.formData.haccp
    ];
    var violations = $scope.formData.violations;
    var corrActions = $scope.formData.corrActions;

    var insertPictures = function(vid, pictures){
      for(var i = 0; i < pictures.length; i++){
        var q = 'INSERT INTO Picture(vid, filename) VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, [vid, pictures[i]]);
      }
    }

    var insertViolations = function(fid) {
      for(var i = 0; i < violations.length; i++) {
        var violation = [
          fid,
          violations[i].tid,
          violations[i].itemNum,
          violations[i].codeRef,
          violations[i].isCrit,
          violations[i].description,
          violations[i].dateVerified
        ];
        var pictures = violations[i].pictures;

        var q = 'INSERT INTO Violation(fid, tid, itemNum, codeRef, isCrit, \
          description, dateVerified) VALUES(?, ?, ?, ?, ?, ?, ?)'
        $cordovaSQLite.execute(DB, q, violation).then(function(res) {
          if (pictures) {
            insertPictures(res.insertId, pictures);
          }
          console.log(res);
        }, function(err) {
          console.log(err);
        });
      }
    }

    // Inser the corrective actions marked in the form
    var insertCorrActions = function(fid) {
      for (var i = 0; i < corrActions.length; i++) {
        var corrAction = [
          fid,
          corrActions[i].description
        ];

        var q = 'INSERT INTO CorrectiveActions(fid, description) \
          VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, corrAction);
      }
    }

    var q = "INSERT INTO Form(name, owner, pic, inspector, address, town, \
      state, zip, phone, permitNum, date, riskLvl, prevInspectDate, \
      timeIn, timeOut, opType, inspType, haccp) \
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(DB, q, form).then(function(res) {
      // Get the fid of the last inserted form and pass it to
      // insertViolations and insertCorrActions.
      var fid = res.insertId;
      insertViolations(fid);
      insertCorrActions(fid);
    }, function(err) {
      console.log(err);
    });
  };
});

app.controller('AddViolationCtrl', function($scope, $filter, $stateParams,
  Violations) {
  // Lists of violations and corrective actions
  $scope.vList = Violations.vList();
  $scope.caList = Violations.caList();
  // Lists of checked violations and corrective actions
  $scope.checkedV = Violations.checkedV();
  $scope.checkedCA = Violations.checkedCA();
  // List of detailed violations
  $scope.detailedVList = Violations.detailedVList();
  $scope.detailedV = {
    itemNum: '',
    codeRef: '',
    status: '',
    description: '',
    dateVerified: ''
  }

  // Format the date to only be MM-dd-yyyy
  $scope.$watch('detailedV.dateVerified', function(time) {
    $scope.detailedV.dateVerified = $filter('date')(time, 'MM-dd-yyyy');
  });

  // Toggle a violation by adding or removing it from the list of checked off
  // violations, and mark it as checked or unchecked.
  $scope.toggleV = function(v) {
    if ($scope.checkedV.indexOf(v.name) < 0) {
      $scope.checkedV.push(v.name);
    } else {
      $scope.checkedV.splice($scope.checkedV.indexOf(v.name), 1);
    }

    // Maybe think of a more efficient way to do this...?
    for (var i = 0; i < $scope.vList.length; i++) {
      for (var j = 0; j < $scope.vList[i].violations.length; j++) {
        if ($scope.vList[i].violations[j].name === v.name) {
          if ($scope.vList[i].violations[j].checked) {
            $scope.vList[i].violations[j].checked = false;
          } else {
            $scope.vList[i].violations[j].checked = true;
          }
        }
      }
    }
  }

  // Toggle a corrective action by adding or removing it from the list of
  // checked off corrective actions, and mark it as checked or unchecked.
  $scope.toggleCA = function(ca) {
    if ($scope.checkedCA.indexOf(ca.name) < 0) {
      $scope.checkedCA.push(ca.name);
    } else {
      $scope.checkedCA.splice($scope.checkedCA.indexOf(ca.name), 1);
    }

    for (var i = 0; i < $scope.caList.length; i++) {
      if ($scope.caList[i].name === ca.name) {
        if ($scope.caList[i].checked) {
          $scope.caList[i].checked = false;
        } else {
          $scope.caList[i].checked = true;
        }
      }
    }
  }

  $scope.addViolation = function() {
    $scope.detailedVList.push($scope.detailedV);
  }
});

// Controller containing each Form accessible to the user. Once the user selects
// a Form, it will direct him to the Form Viewer page where he/she can scroll
// through and search the Form.
app.controller('FormsCtrl', function($scope, $cordovaSQLite, DB, Forms) {
  // All available forms to the user
  $scope.forms = Forms.forms();

  // var q = 'SELECT * \
  //   FROM Form f \
  //   JOIN Violation v ON f.fid = v.fid \
  //   JOIN Vtype t on v.tid = t.tid \
  //   JOIN Picture p ON t.vid = p.vid';

  // var q = 'SELECT * FROM Form';
  var q = 'SELECT * FROM Violation';
  // $cordovaSQLite.execute(DB, q).then(function(res) {
  //   var rows = res.rows;
  //   for (var i = 0; i < res.rows.length; i++) {
  //     Forms.addForm(res.rows[i]);
  //   }
  // }, function(err) {
  //   console.log(err);
  // });

  $cordovaSQLite.execute(DB, q).then(function(res) {
    console.log(res);
  }, function(err) {
    console.log(err);
  });

  // Source: http://goo.gl/r9dkjh
  // Search query based on user input, allowing the user to filter certain forms
  $scope.query = '';

  // Clears the search bar when triggered by the user
  $scope.clearSearch = function() {
    $scope.query = '';
  };
});

app.controller('FormViewerCtrl', function($scope, $stateParams, Forms,
  FormViewerFields) {
  $scope.form = Forms.getForm($stateParams.formName, $stateParams.date);
  $scope.fields = FormViewerFields.fields();

  // Set HACCP to say Yes/No rather than true/false
  if ($scope.form.haccp === true) {
    $scope.form.haccp = 'Yes';
  } else {
    $scope.form.haccp = 'No';
  }
});

// Same thing as FormsCtrl and FormViewerCtrl, but for the Food Codes instead
app.controller('FoodCodesCtrl', function($scope, FoodCodes) {
  // Food Codes available for the user to search through
  $scope.foodCodes = FoodCodes.foodCodes();
});

app.controller('FoodCodeViewerCtrl', function($scope, $stateParams, FoodCodes) {
  $scope.foodCode = FoodCodes.getFoodCode($stateParams.foodCodePath);

  // Gets the path to a Food Code for the user to search through
  $scope.getFoodCodePath = function(path) {
    var formViewerURL = 'lib/pdfjs-dist/web/viewer.html?file=';
    var formURL = '/foodcodes/';
    if (ionic.Platform.isIOS()) {
      formURL = '../../../foodcodes/';
    }

    return formViewerURL + formURL + path;
  };
});
