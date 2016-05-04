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
  $scope.$watch('formData.timeIn', time => {
    $scope.formData.timeIn = $filter('date')(time, 'hh:mm a');
  });

  $scope.$watch('formData.timeOut', time => {
    $scope.formData.timeOut = $filter('date')(time, 'hh:mm a');
  });

  $scope.processForm = () => {
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

    var insertPictures = (vid, pictures) => {
      _.each(pictures, picture => {
        var q = 'INSERT INTO Picture(p_vid, p_filename) VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, [vid, picture]);
      });
    }

    var insertViolations = fid => {
      _.each(violations, v => {
        var violation = [
          fid,
          v.tid,
          v.itemNum,
          v.codeRef,
          v.isCrit,
          v.description,
          v.dateVerified
        ];
        var pictures = v.pictures;

        var q = 'INSERT INTO Violation(v_fid, v_tid, v_itemNum, v_codeRef, \
          v_isCrit, v_description, v_dateVerified) VALUES(?, ?, ?, ?, ?, ?, ?)';
        $cordovaSQLite.execute(DB, q, violation).then(res => {
          if (pictures) {
            insertPictures(res.insertId, pictures);
          }
          console.log('Violation:', res);
        }, err => {
          console.log(err);
        });
      });
    }

    // Inser the corrective actions marked in the form
    var insertCorrActions = fid => {
      _.each(corrActions, ca => {
        var corrAction = [
          fid,
          ca.description
        ];

        var q = 'INSERT INTO CorrectiveActions(ca_fid, ca_description) \
          VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, corrAction);
      });
    }

    var q = "INSERT INTO Form(f_name, f_owner, f_pic, f_inspector, f_address, \
      f_town, f_state, f_zip, f_phone, f_permitNum, f_date, f_riskLvl, \
      f_prevInspectDate, f_timeIn, f_timeOut, f_opType, f_inspType, f_haccp) \
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(DB, q, form).then(res => {
      // Get the fid of the last inserted form and pass it to
      // insertViolations and insertCorrActions.
      var fid = res.insertId;
      insertViolations(fid);
      insertCorrActions(fid);
    }, err => {
      console.log(err);
    });
  };
});

app.controller('AddViolationCtrl', function($scope, $filter, $stateParams,
  Violations) {
  // Lists of violations and corrective actions
  $scope.redVList = Violations.redVList();
  $scope.blueVList = Violations.blueVList();
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
  $scope.$watch('detailedV.dateVerified', time => {
    $scope.detailedV.dateVerified = $filter('date')(time, 'MM-dd-yyyy');
  });

  // Toggle a violation by adding or removing it from the list of checked off
  // violations, and mark it as checked or unchecked.
  $scope.toggleV = v => {
    if ($scope.checkedV.indexOf(v.name) < 0) {
      $scope.checkedV.push(v.name);
    } else {
      $scope.checkedV.splice($scope.checkedV.indexOf(v.name), 1);
    }

    _.each($scope.redVList, vElem => {
      _.each(vElem.violations, eElem => {
        if (eElem.name === v.name) {
          if (eElem.checked) {
            eElem.checked = false;
          } else {
            eElem.checked = true;
          }
        }
      });
    });

    _.each($scope.blueVList, vElem => {
      _.each(vElem.violations, eElem => {
        if (eElem.name === v.name) {
          if (eElem.checked) {
            eElem.checked = false;
          } else {
            eElem.checked = true;
          }
        }
      });
    });
  }

  // Toggle a corrective action by adding or removing it from the list of
  // checked off corrective actions, and mark it as checked or unchecked.
  $scope.toggleCA = ca => {
    if ($scope.checkedCA.indexOf(ca.name) < 0) {
      $scope.checkedCA.push(ca.name);
    } else {
      $scope.checkedCA.splice($scope.checkedCA.indexOf(ca.name), 1);
    }

    _.each($scope.caList, elem => {
      if (elem.name === ca.name) {
        if (elem.checked) {
          elem.checked = false;
        } else {
          elem.checked = true;
        }
      }
    });
  }

  $scope.addViolation = () => {
    $scope.detailedVList.push($scope.detailedV);
  }
});

// Controller containing each Form accessible to the user. Once the user selects
// a Form, it will direct him to the Form Viewer page where he/she can scroll
// through and search the Form.
app.controller('FormsCtrl', function($scope, $cordovaSQLite, DB, Forms) {
  // All available forms to the user
  $scope.forms = Forms.forms();

  var q = 'SELECT * FROM \
    Form f \
    LEFT OUTER JOIN Violation v ON f.f_fid = v.v_fid \
    ORDER BY f.f_fid';
  // var q = 'SELECT * FROM \
  //   Form f \
  //   LEFT OUTER JOIN Violation v ON f.f_fid = v.v_fid \
  //   LEFT OUTER JOIN Vtype vt ON v.v_tid = vt.vt_tid \
  //   ORDER BY f.f_fid';
  $cordovaSQLite.execute(DB, q).then(res => {
    var rows = res.rows;
    _.each(rows, row => {
      Forms.addForm(row);

      var q = 'SELECT * FROM Violation v WHERE v.v_fid = ?';
      $cordovaSQLite.execute(DB, q, [row.v_fid]).then(res => {
        console.log(res.rows);
        Forms.addViolationsToForm(res.rows);
      }, err => {
        console.log(err);
      });
    });
  }, err => {
    console.log(err);
  });

  // Source: http://goo.gl/r9dkjh
  // Search query based on user input, allowing the user to filter certain forms
  $scope.query = '';

  // Clears the search bar when triggered by the user
  $scope.clearSearch = () => {
    $scope.query = '';
  };
});

app.controller('FormViewerCtrl', function($scope, $stateParams, Forms,
  FormViewerFields) {
  $scope.form = Forms.getForm($stateParams.formName, $stateParams.date);
  $scope.fields = FormViewerFields.fields();

  // Set HACCP to say Yes/No rather than true/false
  if ($scope.form.f_haccp === true) {
    $scope.form.f_haccp = 'Yes';
  } else {
    $scope.form.f_haccp = 'No';
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
  $scope.getFoodCodePath = path => {
    var formViewerURL = 'lib/pdfjs-dist/web/viewer.html?file=';
    var formURL = '/foodcodes/';
    if (ionic.Platform.isIOS()) {
      formURL = '../../../foodcodes/';
    }

    return formViewerURL + formURL + path;
  };
});
