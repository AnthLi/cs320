var app = angular.module('inspectorGadget.services', []);
var db = null;

app.factory('DB', function($cordovaSQLite) {
  // Detect whether the user is in on mobile (prod) or a desktop browser (dev)
  if (window.cordova) {
    db = $cordovaSQLite.openDatabase('inspections.db');
  } else {
    db = window.openDatabase('inspections.db', '1', 'inspections',
      1024 * 1024 * 100);
  }

  // Form table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Form( \
      fid              INTEGER PRIMARY KEY AUTOINCREMENT, \
      name             TEXT NOT NULL, \
      owner            TEXT, \
      pic              TEXT, \
      inspector        TEXT, \
      address          TEXT, \
      town             TEXT, \
      state            TEXT, \
      zip              TEXT, \
      phone            TEXT, \
      permitNum        TEXT, \
      date             TEXT, \
      riskLvl          TEXT, \
      prevInspectDate  TEXT, \
      timeIn           TEXT, \
      timeOut          TEXT, \
      opType           TEXT, \
      inspType         TEXT, \
      haccp            BOOLEAN)'
  );

  // Violation table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Violation( \
      vid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      fid               INTEGER NOT NULL, \
      tid               INTEGER NOT NULL, \
      codeRef           TEXT, \
      isCrit            TEXT NOT NULL, \
      description       TEXT NOT NULL, \
      dateVerified      TEXT, \
      FOREIGN KEY(fid)  REFERENCES Form(fid), \
      FOREIGN KEY(tid)  REFERENCES Vtype(tid)'
  );

  // Corrective Action table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS CorrectiveAction( \
      caid              INTEGER PRIMARY KEY AUTOINCREMENT, \
      fid               INTEGER NOT NULL, \
      description       TEXT NOT NULL, \
      FOREIGN KEY(fid)  REFERENCES Form(fid)'
  );

  // Violation type table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Vtype( \
      tid   INTEGER PRIMARY KEY, \
      type  TEXT NOT NULL'
  );

  // Picture table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Picture( \
      pid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      vid               INTEGER NOT NULL, \
      filename          TEXT NOT NULL, \
      FOREIGN KEY(vid)  REFERENCES Violation(vid)'
  );

  // Fill Vtype with necessary values
  var q = 'INSERT INTO Vtype VALUES(';
  $cordovaSQLite.execute(db, q + "1, 'PIC Assigned')");
  $cordovaSQLite.execute(db, q + "2, 'Reporting of Diseases by Food Employee and PIC')");
  $cordovaSQLite.execute(db, q + "3, 'Personnel with Infections Restricted/Excluded')");
  $cordovaSQLite.execute(db, q + "4, 'Food and Water from Approved Source')");
  $cordovaSQLite.execute(db, q + "5, 'Receiving/Condition')");
  $cordovaSQLite.execute(db, q + "6, 'Tags/Records/Accuracy of Ingredient Statements')");
  $cordovaSQLite.execute(db, q + "7, 'Conformance with Approved Procedures/HACCP Plans')");
  $cordovaSQLite.execute(db, q + "8, 'Separation/Segregation/Protection')");
  $cordovaSQLite.execute(db, q + "9, 'Food Contact Surface Cleaning and Sanitizing')");
  $cordovaSQLite.execute(db, q + "10, 'Proper Adquate Handwashing')");
  $cordovaSQLite.execute(db, q + "11, 'Good Hygenic Practices')");
  $cordovaSQLite.execute(db, q + "12, 'Prevention of Contamination')");
  $cordovaSQLite.execute(db, q + "13, 'Handwash Facilities')");
  $cordovaSQLite.execute(db, q + "14, 'Approved Food or Color Additives')");
  $cordovaSQLite.execute(db, q + "15, 'Toxic Chemicals')");
  $cordovaSQLite.execute(db, q + "16, 'Cooking Temperature')");
  $cordovaSQLite.execute(db, q + "17, 'Reheating')");
  $cordovaSQLite.execute(db, q + "18, 'Cooling')");
  $cordovaSQLite.execute(db, q + "19, 'Hot and Cold Holding')");
  $cordovaSQLite.execute(db, q + "20, 'Time as a Public Health Control')");
  $cordovaSQLite.execute(db, q + "21, 'Food and Food Preparation for HSP')");
  $cordovaSQLite.execute(db, q + "22, 'Posting of Consumer Advisories')");

  return db;
});

app.factory('NewInspection', function() {
  // The fields are paired together based on how the front-end shows it.
  // This is to help dynamically generate the input fields rather than
  // hard-coding every single one of them, decreasing the amount of code
  // being written
  var newInspectFields = [{
    temp: ['Name of Food Establishment', 'MM/DD/YYYY'],
    model: ['name', 'date']
  }, {
    temp: ['Address', 'Owner'],
    model: ['address', 'owner']
  }, {
    temp: ['Telephone', 'Person In Charge'],
    model: ['phone', 'pic']
  }, {
    temp: ['Permit No.', 'Inspector'],
    model: ['permitNum', 'inspector']
  }, {
    temp: ['Risk Level', 'Prev. Inspection Date'],
    model: ['riskLvl', 'prevInspectDate']
  }];

  return {
    newInspectFields: function() {
      return newInspectFields;
    }
  }
});

app.factory('Violations', function() {
  var vList = [{
    title: 'FOOD PROTECTION MANAGEMENT',
    violations: [{
      description: 'PIC Assigned',
      checked: false
    }]
  }, {
    title: 'EMPLOYEE HEALTH',
    violations: [{
      description: 'Reporting of Diseases by Food Employee and PIC',
      checked: false
    }, {
      description: 'Personnel with Infections Restricted/Excluded',
      checked: false
    }]
  }, {
    title: 'FOOD FROM APPROVED SOURCE',
    violations: [{
      description: 'Food and Water from Approved Source',
      checked: false
    }, {
      description: 'Receiving/Condition',
      checked: false
    }, {
      description: 'Tags/Records/Accuracy of Ingredient Statements',
      checked: false
    }, {
      description: 'Conformance with Approved Procedures/HACCP Plans',
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CONTAMINATION',
    violations: [{
      description: 'Separation/Segregation/Protection',
      checked: false
    }, {
      description: 'Food Contact Surface Cleaning and Sanitizing',
      checked: false
    }, {
      description: 'Proper Adequate Handwashing',
      checked: false
    }, {
      description: 'Good Hygeinic Practices',
      checked: false
    }, {
      description: 'Prevention of Contamination',
      checked: false
    }, {
      description: 'Handwash Facilities',
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CHEMICALS',
    violations: [{
      description: 'Approved Food or Color Additives',
      checked: false
    }, {
      description: 'Toxic Chemicals',
      checked: false
    }]
  }, {
    title: 'TIME/TEMPERATURE CONTROLS',
    violations: [{
      description: 'Cooking Temperature',
      checked: false
    }, {
      description: 'Reheating',
      checked: false
    }, {
      description: 'Cooling',
      checked: false
    }, {
      description: 'Hot and Cold Holding',
      checked: false
    }, {
      description: 'Time as a Public Health Control',
      checked: false
    }]
  }, {
    title: 'REQUIREMENTS FOR HIGHLY SUSCEPTIBLE POPULATIONS',
    violations: [{
      description: 'Food and Food Preparation for HSP',
      checked: false
    }]
  }, {
    title: 'CONSUMER ADVISORY',
    violations: [{
      description: 'Posting of Consumer Advisories',
      checked: false
    }]
  }, {
    title: 'GOOD RETAIL PRACTICES (BLUE ITEMS)',
    violations: [{
      description: 'Management and Personnel',
      checked: false
    }, {
      description: 'Food and Food Protection',
      checked: false
    }, {
      description: 'Equipment and Utensils',
      checked: false
    }, {
      description: 'Water, Plumbing and Waste',
      checked: false
    }, {
      description: 'Physical Facility',
      checked: false
    }, {
      description: 'Poisonous or Toxic Material',
      checked: false
    }, {
      description: 'Special Requirements',
      checked: false
    }, {
      description: 'Other',
      checked: false
    }]
  }];

  var caList = [{
    description: 'Voluntary Compliance',
    checked: false
  }, {
    description: 'Re-inspection Scheduled',
    checked: false
  }, {
    description: 'Embargo',
    checked: false
  }, {
    description: 'Voluntary Disposal',
    checked: false
  }, {
    description: 'Employee Restriction/Exclusion',
    checked: false
  }, {
    description: 'Emergency Suspension',
    checked: false
  }, {
    description: 'Emergency Closure',
    checked: false
  }, {
    description: 'Other',
    checked: false
  }];

  var checkedV = [];
  var checkedCA = [];

  return {
    vList: function() {
      return vList;
    },
    caList: function() {
      return caList;
    },
    checkedV: function() {
      return checkedV;
    },
    checkedCA: function() {
      return checkedCA;
    }
  };
});

app.factory('Forms', function($cordovaSQLite) {
  return {
    forms: function() {
      var q = 'SELECT * \
        FROM Form f \
        JOIN Violation v ON(v.fid = f.fid) \
        JOIN Vtype t ON(t.tid = v.tid) \
        JOIN Picture p ON(p.vid = v.vid) \
        ORDER BY f.fid DESC';
      $cordovaSQLite.execute(db, q).then(function(res) {
        return res.rows;
      }, function(err) {
        return [];
      });
    },
    getForm: function(formName, date) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].name === formName && forms[i].date === date) {
          return forms[i];
        }
      }

      return null;
    },
    addForm: function(formObj) {
      // var form = [
      //   formObj.name,
      //   formObj.owner,
      //   formObj.pic,
      //   formObj.inspector,
      //   formObj.address,
      //   formObj.town,
      //   formObj.state,
      //   formObj.zip,
      //   formObj.phone,
      //   formObj.permitNum,
      //   formObj.date,
      //   formObj.riskLvl,
      //   formObj.prevInspectDate,
      //   formObj.timeIn,
      //   formObj.timeOut,
      //   formObj.opType,
      //   formObj.inspType,
      //   formObj.haccp
      // ];
      // var violations = formObj.violations;
      // var corrActions = formObj.corrActions;

      // var insertForm = function() {
      //   var q = "INSERT INTO Form(name, owner, pic, inspector, address, town, \
      //     state, zip, phone, permitNum, date, riskLvl, prevInspectDate, \
      //     timeIn, timeOut, opType, inspType, haccp) \
      //     VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      //   $cordovaSQLite.execute(db, q, form).then(function(res) {
      //     // Get the fid of the last inserted form and pass it to
      //     // insertViolations and insertCorrActions.
      //     var fid = this.lastID;
      //     console.log('fid', this.lastID)
      //     insertViolations(fid);
      //     insertCorrActions(fid);
      //   }, function(err) {
      //     console.log(err);
      //   });
      // }

      // var insertViolations = function(fid) {
      //   for(var i = 0; i < violations.length; i++) {
      //     var violation = [
      //       fid,
      //       violations[i].tid,
      //       violations[i].codeRef,
      //       violations[i].isCrit,
      //       violations[i].description,
      //       violations[i].dateVerified];
      //     var pictures = violations[i].pictures;

      //     var q = 'INSERT INTO Violation(fid, tid, codeRef, isCrit, \
      //       description, dateVerified) VALUES(?, ?, ?, ?, ?, ?)'
      //     $cordovaSQLite.execute(db, q, violation).then(function(res) {
      //       if (pictures) {
      //         insertPictures(this.lastID, pictures);
      //       }
      //     }, function(err) {
      //       console.log(err);
      //     });
      //   }
      // }

      // // Inser the corrective actions marked in the form
      // var insertCorrActions = function(fid) {
      //   for (var i = 0; i < corrActions.length; i++) {
      //     var corrAction = [
      //       fid,
      //       corrActions[i].description
      //     ];

      //     var q = 'INSERT INTO CorrectiveActions(fid, description) \
      //       VALUES(?, ?)';
      //     $cordovaSQLite.execute(db, q, corrAction);
      //   }
      // }

      // var insertPictures = function(vid, pictures){
      //   for(var i = 0; i < pictures.length; i++){
      //     var q = 'INSERT INTO Picture(vid, filename) VALUES(?, ?)';
      //     $cordovaSQLite.execute(db, q, [vid, pictures[i]]);
      //   }
      // }

      // // db.serialize(insertForm());
    }
  };
});

app.factory('FormViewerFields', function() {
  var fields = [{
    name: ['Name', 'Date'],
    model: ['name', 'date']
  }, {
    name: ['Address', 'Owner'],
    model: ['address', 'owner']
  }, {
    name: ['Permit No.', 'Inspector'],
    model: ['permitNum', 'inspector']
  }, {
    name: ['Risk', 'HACCP'],
    model: ['riskLvl', 'haccp']
  }, {
    name: ['Time In', 'Time Out'],
    model: ['timeIn', 'timeOut']
  }, {
    name: ['Type of Operation(s)', 'Type of Inspection'],
    model: ['typeofOp', 'typeofInsp']
  }];

  return {
    fields: function() {
      return fields;
    }
  }
});

app.factory('FoodCodes', function() {
  var foodCodes = [{
    path: '1999_fda_food_code.pdf',
    name: '1999 FDA Food Code'
  }, {
    path: 'ma_food_code.pdf',
    name: 'Massachusetts Food Code'
  }];

  return {
    foodCodes: function() {
      return foodCodes;
    },
    getFoodCode: function(foodCodePath) {
      for (var i = 0; i < foodCodes.length; i++) {
        if (foodCodes[i].path === foodCodePath) {
          return foodCodes[i];
        }
      }

      return null;
    }
  };
});