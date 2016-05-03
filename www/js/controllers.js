var app = angular.module('inspectorGadget.controllers', []);

app.controller('DashCtrl', function($scope) {});

app.controller('NewInspectionCtrl', function($scope, $filter, $cordovaSQLite,
  NewInspection, Violations, Forms, DB) {
  $scope.fields = NewInspection.newInspectFields();
  // List of checked violations and corrective actions
  $scope.checkedV = Violations.checkedV();
  $scope.checkedCA = Violations.checkedCA();

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
    // Forms.addForm($scope.formData);

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

    var insertForm = function() {
      var q = "INSERT INTO Form(name, owner, pic, inspector, address, town, \
        state, zip, phone, permitNum, date, riskLvl, prevInspectDate, \
        timeIn, timeOut, opType, inspType, haccp) \
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      $cordovaSQLite.execute(db, q, form).then(function(res) {
        // Get the fid of the last inserted form and pass it to
        // insertViolations and insertCorrActions.
        var fid = this.lastID;
        console.log('fid', this.lastID)
        insertViolations(fid);
        insertCorrActions(fid);
      }, function(err) {
        console.log(err);
      });
    }

    var insertViolations = function(fid) {
      for(var i = 0; i < violations.length; i++) {
        var violation = [
          fid,
          violations[i].tid,
          violations[i].codeRef,
          violations[i].isCrit,
          violations[i].description,
          violations[i].dateVerified];
        var pictures = violations[i].pictures;

        var q = 'INSERT INTO Violation(fid, tid, codeRef, isCrit, \
          description, dateVerified) VALUES(?, ?, ?, ?, ?, ?)'
        $cordovaSQLite.execute(db, q, violation).then(function(res) {
          if (pictures) {
            insertPictures(this.lastID, pictures);
          }
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
        $cordovaSQLite.execute(db, q, corrAction);
      }
    }

    var insertPictures = function(vid, pictures){
      for(var i = 0; i < pictures.length; i++){
        var q = 'INSERT INTO Picture(vid, filename) VALUES(?, ?)';
        $cordovaSQLite.execute(db, q, [vid, pictures[i]]);
      }
    }

    // db.serialize(insertForm());
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
app.controller('FormsCtrl', function($scope, $cordovaSQLite, Forms) {
  // All available forms to the user
  $scope.forms = [];
  var q = 'SELECT * \
    FROM Form f \
    JOIN Violation v ON(v.fid = f.fid) \
    JOIN Vtype t ON(t.tid = v.tid) \
    JOIN Picture p ON(p.vid = v.vid) \
    ORDER BY f.fid DESC';
  $cordovaSQLite.execute(db, q).then(function(res) {
    console.log(res.rows);
    $scope.form = res.rows
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
