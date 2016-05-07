var app = angular.module('inspectorGadget.controllers', []);

app.controller('DashCtrl', function($scope) {});

<<<<<<< HEAD
app.controller('NewInspectionCtrl', function($scope, $filter,
  NewInspection, Violations, Forms) {
  $scope.fields = NewInspection.newInspFields();
  // List of checked violations and corrective actions
  $scope.checkedV = Violations.checkedV();
  $scope.checkedCA = Violations.checkedCA();

  $scope.haccp = false;
=======
app.controller('NewInspectionCtrl', function($scope, $filter, $location,
  $cordovaSQLite, DB, NewInspection, Forms, Violations) {
  $scope.fields = NewInspection.newInspectFields();
  // Lists of checked violations and corrective actions
  $scope.checkedV = Forms.checkedV();
  $scope.checkedCA = Forms.checkedCA();
  $scope.detailedVList = Forms.detailedVList();
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
  $scope.formData = {
    estName: '',
    date: '',
    address: '',
    owner: '',
    phone: '',
    PIC: '',
    permitno: '',
    inspector: '',
<<<<<<< HEAD
    risklvl: '',
    prevInspDate: '',
    timein: '',
    timeout: '',
    HACCP: 'N',
    typeofOp: '',
    typeofInsp: '',
=======
    riskLvl: '',
    prevInspectDate: '',
    timeIn: '',
    timeOut: '',
    haccp: false,
    opType: '',
    inspType: '',
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
    violations: [],
    corrActions: []
  };

  // Format timein and timeout to only have hours, minutes, and AM/PM
  $scope.$watch('formData.timein', function(time) {
    $scope.formData.timein = $filter('date')(time, 'hh:mm a');
  });

  $scope.$watch('formData.timeout', function(time) {
    $scope.formData.timeout = $filter('date')(time, 'hh:mm a');
  });

  $scope.processForm = function() {
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
    var violations = $scope.checkedV;
    var corrActions = $scope.checkedCA;
    var detailedVList = $scope.detailedVList;

    var insertPictures = function(vid, pictures) {
      _.each(pictures, function(picture) {
        var q = 'INSERT INTO Picture(p_vid, p_filename) VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, [vid, picture]);
      });
    }

    var insertViolations = function(fid) {
      // Insert the violation types marked in the form
      _.each(violations, function(v) {
        var q = 'INSERT INTO Form_Vtype(fv_fid, fv_tid) VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, [fid, v.tid]).then(function(res) {
        });
      });

      // Insert the detailed violations in the form
      _.each(detailedVList, function(dv) {
        var dvAttrs = [
          fid,
          dv.itemNum,
          dv.codeRef,
          dv.isCrit,
          dv.description,
          dv.dateVerified
        ];
        var q = 'INSERT INTO Violation(v_fid, v_itemNum, v_codeRef, v_isCrit, \
          v_description, v_dateVerified) VALUES(?, ?, ?, ?, ?, ?)';
          $cordovaSQLite.execute(DB, q, dvAttrs);
      });
    }

    // Insert the corrective actions marked in the form
    var insertCorrActions = function(fid) {
      _.each(corrActions, function(ca) {
        var q = 'INSERT INTO Form_CA(fc_fid, fc_caid) VALUES(?, ?)';
        $cordovaSQLite.execute(DB, q, [fid, ca.caid]);
      });
    }

    var q = "INSERT INTO Form(f_name, f_owner, f_pic, f_inspector, f_address, \
      f_town, f_state, f_zip, f_phone, f_permitNum, f_date, f_riskLvl, \
      f_prevInspectDate, f_timeIn, f_timeOut, f_opType, f_inspType, f_haccp) \
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $cordovaSQLite.execute(DB, q, form).then(function(res) {
      // Get the fid of the last inserted form and pass it to
      // insertViolations and insertCorrActions.
      var fid = res.insertId;
      insertViolations(fid);
      insertCorrActions(fid);

      $location.path('/page/forms');
    });
  };


});

app.controller('AddViolationCtrl', function($scope, $filter, $stateParams,
  Forms, Violations) {
  // Lists of violations and corrective actions
  $scope.redVList = Violations.redVList();
  $scope.blueVList = Violations.blueVList();
  $scope.caList = Violations.caList();
  $scope.detailedV = {
    itemNum: '',
    codeRef: '',
    isCrit: '',
    description: '',
    dateVerified: ''
  }

  // Format the date to only be MM-dd-yyyy
  $scope.$watch('detailedV.dateVerified', function(time) {
    $scope.detailedV.dateVerified = $filter('date')(time, 'MM-dd-yyyy');
  });

  // Toggle a violation by adding or removing it from the list of checked off
  // violations, and mark it as checked or unchecked.
  $scope.toggleV = function(violation) {
    if (Forms.checkedV().length < 1) {
      Forms.addV(violation);
    } else {
      var exists = false;
      _.each(Forms.checkedV(), function(v) {
        if (v.tid === violation.tid) {
          exists = true;
        }
      });

      if (!exists) {
        Forms.addV(violation);
      } else {
        Forms.removeV(violation);
      }
    }

    _.each($scope.redVList, function(v) {
      _.each(v.violations, function(elem) {
        if (elem.tid === violation.tid) {
          if (elem.checked) {
            elem.checked = false;
          } else {
            elem.checked = true;
          }
        }
      });
    });

    _.each($scope.blueVList, function(v) {
      _.each(v.violations, function(elem) {
        if (elem.tid === violation.tid) {
          if (elem.checked) {
            elem.checked = false;
          } else {
            elem.checked = true;
          }
        }
      });
    });
  }

  // Toggle a corrective action by adding or removing it from the list of
  // checked off corrective actions, and mark it as checked or unchecked.
  $scope.toggleCA = function(corrAction) {
    if (Forms.checkedCA().length < 1) {
      Forms.addCA(corrAction);
    } else {
      var exists = false;
      _.each(Forms.checkedCA(), function(ca) {
        if (ca.caid === corrAction.caid) {
          exists = true;
        }
      });

      if (!exists) {
        Forms.addCA(corrAction);
      } else {
        Forms.removeCA(corrAction);
      }
    }

    _.each($scope.caList, function(ca) {
      if (ca.caid === corrAction.caid) {
        if (ca.checked) {
          ca.checked = false;
        } else {
          ca.checked = true;
        }
      }
    });
  }

  $scope.addViolation = function() {
    Forms.addDetailedV($scope.detailedV);
  }
});

// Controller containing each Form accessible to the user. Once the user selects
// a Form, it will direct him to the Form Viewer page where he/she can scroll
// through and search the Form.
app.controller('FormsCtrl', function($scope, $cordovaSQLite, DB, Forms) {
  // All available forms to the user
  $scope.forms = Forms.forms();

  var q = 'SELECT * FROM Form f WHERE f.f_name != ""';
  $cordovaSQLite.execute(DB, q).then(function(res) {
    console.log(res);
  })

  // Get every violation type for each form and add it to its respective form
  var q = 'SELECT * FROM \
    Form f \
    LEFT OUTER JOIN Form_Vtype fv ON f.f_fid = fv.fv_fid \
    WHERE f.f_name != "" OR f.f_date != "" \
    ORDER BY f.f_fid';
  $cordovaSQLite.execute(DB, q).then(function(res) {
    var rows = res.rows;
    _.each(rows, function(row) {
      Forms.addForm(row);

      // Get each violation type from the database and add it to each of their
      // respective forms
      q = 'SELECT * FROM Vtype vt WHERE vt.vt_tid = ?';
      $cordovaSQLite.execute(DB, q, [row.fv_tid]).then(function(res) {
        rows = res.rows;
        if (rows.length > 0) {
          Forms.addViolationsToForm(row.f_fid, rows);
        }
      });
    });
  });

  // Get every corrective action for each form and add it to its respective form
  q = 'SELECT * FROM \
    Form f \
    LEFT OUTER JOIN Form_CA fc ON f.f_fid = fc.fc_fid \
    ORDER BY f.f_fid';
  $cordovaSQLite.execute(DB, q).then(function(res) {
    var rows = res.rows;
    _.each(rows, function(row) {
      q = 'SELECT * FROM CorrectiveAction ca WHERE ca.ca_caid = ?';
      $cordovaSQLite.execute(DB, q, [row.fc_caid]).then(function(res) {
        rows = res.rows;
        if (rows.length > 0) {
          Forms.addCorrActionsToForm(row.f_fid, rows);
        }
      });
    });
  });

  // Get every detailed violation for each form and add it to its respective
  // form
  q = 'SELECT * FROM \
    Form f \
    LEFT OUTER JOIN Violation v ON f.f_fid = v.v_fid \
    ORDER BY f.f_fid';
  $cordovaSQLite.execute(DB, q).then(function(res) {
    var rows = res.rows;
    _.each(rows, function(row) {
      if (row.v_fid) {
        Forms.addDetailedViolationToForm(row.f_fid, row);
      }
    });
  });

  // Source: http://goo.gl/r9dkjh
  // Search query based on user input, allowing the user to filter certain forms
  $scope.query = '';

  // Clears the search bar when triggered by the user
  $scope.clearSearch = function() {
    $scope.query = '';
  };
});

app.controller('FormViewerCtrl', function($scope, $stateParams, $ionicPopup,
  $cordovaPrinter, Forms, FormViewerFields) {
  $scope.form = Forms.getForm($stateParams.formName, $stateParams.date);
  $scope.fields = FormViewerFields.fields();

  // Set HACCP to say Yes/No rather than true/false
  if ($scope.form.f_haccp === true) {
    $scope.form.f_haccp = 'Yes';
  } else {
    $scope.form.f_haccp = 'No';
  }

  /* TODO: figure out how to print the current form */
  $scope.print = function() {
    if($cordovaPrinter.isAvailable()) {
      $cordovaPrinter.print('');
    } else {
      $ionicPopup.alert({
        title: 'Error',
        template: 'Printing is not available'
      });
    }
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
  $scope.getFormPath = function(path) {
    var formViewerURL = 'lib/pdfjs-dist/web/viewer.html?file=';
    var formURL = '/foodcodes/';
    if (ionic.Platform.isIOS()) {
      formURL = '../../../foodcodes/';
    }

    return formViewerURL + formURL + path;
  };
});

// Controller for taking a picture
app.controller('PictureCtrl', function($scope, $ionicPopup, $cordovaCamera) {
  $scope.takePicture = function() {
    var option = {
      quality: 100,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = 'data:image/jpeg;base64' + imageData;
    }, function(err) {
      $ionicPopup.alert({
        title: 'Error',
        template: err
      });
    });
  }
});