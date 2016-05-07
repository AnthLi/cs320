var app = angular.module('inspectorGadget.services', []);
var db = null;

app.factory('DB', function($cordovaSQLite) {
  // Detect whether the user is in on mobile (prod) or a desktop browser (dev)
  if (window.cordova) {
    db = $cordovaSQLite.openDB({
      name: 'inspections.db',
      iosDatabaseLocation: 'default'
    });
  } else {
    db = window.openDatabase('inspections.db', '', 'Inspections',
      1024 * 1024 * 100);
  }

  // Drop the tables and start over
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Form');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Violation');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Vtype');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Form_Vtype');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS CorrectiveAction');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Form_CA');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Picture');

  // Form table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Form( \
      f_fid              INTEGER PRIMARY KEY AUTOINCREMENT, \
      f_name             TEXT NOT NULL, \
      f_owner            TEXT, \
      f_pic              TEXT, \
      f_inspector        TEXT, \
      f_address          TEXT, \
      f_town             TEXT, \
      f_state            TEXT, \
      f_zip              TEXT, \
      f_phone            TEXT, \
      f_permitNum        TEXT, \
      f_date             TEXT, \
      f_riskLvl          TEXT, \
      f_prevInspectDate  TEXT, \
      f_timeIn           TEXT, \
      f_timeOut          TEXT, \
      f_opType           TEXT, \
      f_inspType         TEXT, \
      f_haccp            BOOLEAN \
    )'
  ).then(function(res) {
    // console.log('Form table created');
  }, function(err) {
    console.log('Form table:', err);
  });

  // Violation table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Violation( \
      v_vid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      v_fid               INTEGER NOT NULL, \
      v_itemNum           INTEGER NOT NULL, \
      v_codeRef           TEXT NOT NULL, \
      v_isCrit            TEXT NOT NULL, \
      v_description       TEXT NOT NULL, \
      v_dateVerified      TEXT NOT NULL, \
      FOREIGN KEY(v_fid) REFERENCES Form(f_fid) \
    )'
  ).then(function(res) {
    // console.log('Violation table successfully created');
  }, function(err) {
    console.log('Violation table:', err);
  });

  // Violation type table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Vtype( \
      vt_tid   INTEGER PRIMARY KEY, \
      vt_type  TEXT NOT NULL \
    )'
  ).then(function(res) {
    // console.log('Vtype table successfully created');
  }, function(err) {
    console.log('Vtype table:', err);
  });

  // Table containing the relations between each form and their violations
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Form_Vtype( \
      fv_fid INTEGER NOT NULL, \
      fv_tid INTEGER NOT NULL, \
      FOREIGN KEY(fv_fid) REFERENCES Form(f_fid), \
      FOREIGN KEY(fv_tid) REFERENCES Vtype(vt_tid) \
    )'
  ).then(function(res) {
    // console.log('Form_Vtype table successfully created');
  }, function(err) {
    console.log('Form_Vtype table:', err);
  });

  // Corrective Action table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS CorrectiveAction( \
      ca_caid         INTEGER PRIMARY KEY AUTOINCREMENT, \
      ca_description  TEXT NOT NULL \
    )'
  ).then(function(res) {
    // console.log('CorrectiveAction table successfully created');
  }, function(err) {
    console.log('CorrectiveAction table:', err);
  });

  // Table containing the relations between each form and their corrective
  // actions
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Form_CA( \
      fc_fid INTEGER NOT NULL, \
      fc_caid INTEGER NOT NULL, \
      FOREIGN KEY(fc_fid) REFERENCES Form(f_fid), \
      FOREIGN KEY(fc_caid) REFERENCES CorrectiveAction(ca_caid) \
    )'
  ).then(function(res) {
    // console.log('Form_CA table successfully created');
  }, function(err) {
    console.log('Form_CA table:', err);
  });

  // Picture table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Picture( \
      p_pid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      p_vid               INTEGER NOT NULL, \
      p_filename          TEXT NOT NULL, \
      FOREIGN KEY(p_vid) REFERENCES Violation(v_vid) \
    )'
  ).then(function(res) {
    // console.log('Picture table successfully created');
  }, function(err) {
    console.log('Picture table:', err);
  });

  // Fill Vtype with necessary values
  var vTypes = [
    "'PIC Assigned / Knowledgeable / Duties'",
    "'Reporting of Diseases by Food Employee and PIC'",
    "'Personnel with Infections Restricted / Excluded'",
    "'Food and Water from Approved Source'",
    "'Receiving / Condition'",
    "'Tags / Records / Accuracy of Ingredient Statements'",
    "'Conformance with Approved Procedures / HACCP Plans'",
    "'Separation / Segregation / Protection'",
    "'Food Contact Surface Cleaning and Sanitizing'",
    "'Proper Adquate Handwashing'",
    "'Good Hygenic Practices'",
    "'Prevention of Contamination'",
    "'Handwash Facilities'",
    "'Approved Food or Color Additives'",
    "'Toxic Chemicals'",
    "'Cooking Temperature'",
    "'Reheating'",
    "'Cooling'",
    "'Hot and Cold Holding'",
    "'Time as a Public Health Control'",
    "'Food and Food Preparation for HSP'",
    "'Posting of Consumer Advisories'",
    "'Management and Personnel'",
    "'Food and Food Protection'",
    "'Equipment and Utensils'",
    "'Water, Plumbing and Waste'",
    "'Physical Facility'",
    "'Poisonous or Toxic Material'",
    "'Special Requirements'",
    "'Other'"
  ];
  var vQ = 'INSERT INTO Vtype VALUES(';
  var i = 1;
  _.each(vTypes, function(type) {
    $cordovaSQLite.execute(db, vQ + String(i++) + ', ' + type + ')');
  });

  // Fill CorreciveAction with necessary values
  var caValues = [
    "'Voluntary Compliance'",
    "'Re-inspection Scheduled'",
    "'Embargo'",
    "'Voluntary Disposal'",
    "'Employee Restriction/Exclusion'",
    "'Emergency Suspension'",
    "'Emergency Closure'",
    "'Other'"
  ];
  var caQ = 'INSERT INTO CorrectiveAction VALUES('
  i = 1;
  _.each(caValues, function(val) {
    $cordovaSQLite.execute(db, caQ + String(i++) + ', ' + val + ')');
  });

  return db;
});

app.factory('NewInspection', function() {
  // The fields are paired together based on how the front-end shows it.
  // This is to help dynamically generate the input fields rather than
  // hard-coding every single one of them, decreasing the amount of code
  // being written
  var newInspFields = [{
    model: ['estName', 'date'],
    temp: ['Name of Food Establishment', 'MM/DD/YYYY']
  }, {
    model: ['address', 'owner'],
    temp: ['Address', 'Owner']
  }, {
    model: ['phone', 'PIC'],
    temp: ['Telephone', 'Person In Charge']
  }, {
    model: ['permitno', 'inspector'],
    temp: ['Permit No.', 'Inspector']
  }, {
    model: ['risklvl', 'prevInspDate'],
    temp: ['Risk Level', 'Prev. Inspection Date']
  }];

  return {
    newInspFields: function() {
      return newInspFields;
    }
  }
});

app.factory('Forms', function() {
  // Lists of checked violations and corrective actions
  var checkedV = [];
  var checkedCA = [];
  // Lists of detailed violations
  var detailedVList = [];
  var forms = [];

  return {
    checkedV: function() {
      return checkedV;
    },
    addV: function(v) {
      checkedV.push(v);
    },
    // Remove the given violation from the list of checked violations
    removeV: function(v) {
      var index = 0;
      for (var i = 0; i < checkedV.length; i++) {
        if (checkedV[i].tid === v.tid) {
          index = i;
        }
      }

      checkedV.splice(index, 1);
    },
    checkedCA: function() {
      return checkedCA;
    },
    addCA: function(ca) {
      checkedCA.push(ca);
    },
    // Remove the given corrective action from the list of checked corrective
    // actions
    removeCA: function(ca) {
      var index = 0;
      for (var i = 0; i < checkedCA.length; i++) {
        if (checkedCA[i].caid === ca.caid) {
          index = i;
        }
      }

      checkedCA.splice(index, 1);
    },
    detailedVList: function() {
      return detailedVList;
    },
    addDetailedV: function(dv) {
      detailedVList.push(dv);
    },
    forms: function() {
      return forms;
    },
    addForm: function(form) {
      // Don't add duplicate forms with the same name and date
      var exists = false;
      _.each(forms, function(f) {
        if (f.f_name === form.f_name && f.f_date === form.f_date) {
          exists = true;
        }
      });

      if (!exists) {
        form.violations = [];
        form.corrActions = [];
        form.detailedViolations = [];
        forms.push(form);
      }
    },
    addViolationsToForm: function(fid, violations) {
      _.each(forms, function(f) {
        if (f.f_fid === fid) {
          f.violations.push(violations[0].vt_type);
        }
      });
    },
    addCorrActionsToForm: function(fid, corrAction) {
      _.each(forms, function(f) {
        if (f.f_fid === fid) {
          f.corrActions.push(corrAction[0].ca_description);
        }
      });
    },
    addDetailedViolationToForm: function(fid, detailedViolation) {
      _.each(forms, function(f) {
        if (f.f_fid === fid) {
          f.detailedViolations.push({
            v_itemNum: detailedViolation.v_itemNum,
            v_codeRef: detailedViolation.v_codeRef,
            v_isCrit: detailedViolation.v_isCrit,
            v_description: detailedViolation.v_description,
            v_dateVerified: detailedViolation.v_dateVerified
          });
        }
      });
    },
    getForm: function(formName, date) {
      var form = null;
      _.each(forms, function(f) {
        if (f.f_name === formName && f.f_date === date) {
          form = f;
        }
      });

      return form;
    }
  };
});

app.factory('Violations', function() {
  var redVList = [{
    title: 'FOOD PROTECTION MANAGEMENT',
    violations: [{
      name: 'PIC Assigned',
<<<<<<< HEAD
=======
      tid: 1,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'EMPLOYEE HEALTH',
    violations: [{
      name: 'Reporting of Diseases by Food Employee and PIC',
<<<<<<< HEAD
      checked: false
    }, {
      name: 'Personnel with Infections Restricted/Excluded',
=======
      tid: 2,
      checked: false
    }, {
      name: 'Personnel with Infections Restricted / Excluded',
      tid: 3,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'FOOD FROM APPROVED SOURCE',
    violations: [{
      name: 'Food and Water from Approved Source',
<<<<<<< HEAD
      checked: false
    }, {
      name: 'Receiving/Condition',
      checked: false
    }, {
      name: 'Tags/Records/Accuracy of Ingredient Statements',
      checked: false
    }, {
      name: 'Conformance with Approved Procedures/HACCP Plans',
=======
      tid: 4,
      checked: false
    }, {
      name: 'Receiving / Condition',
      tid: 5,
      checked: false
    }, {
      name: 'Tags / Records / Accuracy of Ingredient Statements',
      tid: 6,
      checked: false
    }, {
      name: 'Conformance with Approved Procedures / HACCP Plans',
      tid: 7,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CONTAMINATION',
    violations: [{
<<<<<<< HEAD
      name: 'Separation/Segregation/Protection',
      checked: false
    }, {
      name: 'Food Contact Surface Cleaning and Sanitizing',
      checked: false
    }, {
      name: 'Proper Adequate Handwashing',
      checked: false
    }, {
      name: 'Good Hygeinic Practices',
      checked: false
    }, {
      name: 'Prevention of Contamination',
      checked: false
    }, {
      name: 'Handwash Facilities',
=======
      name: 'Separation / Segregation / Protection',
      tid: 8,
      checked: false
    }, {
      name: 'Food Contact Surface Cleaning and Sanitizing',
      tid: 9,
      checked: false
    }, {
      name: 'Proper Adequate Handwashing',
      tid: 10,
      checked: false
    }, {
      name: 'Good Hygeinic Practices',
      tid: 11,
      checked: false
    }, {
      name: 'Prevention of Contamination',
      tid: 12,
      checked: false
    }, {
      name: 'Handwash Facilities',
      tid: 13,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CHEMICALS',
    violations: [{
      name: 'Approved Food or Color Additives',
<<<<<<< HEAD
      checked: false
    }, {
      name: 'Toxic Chemicals',
=======
      tid: 14,
      checked: false
    }, {
      name: 'Toxic Chemicals',
      tid: 15,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'TIME/TEMPERATURE CONTROLS (Potentially Hazardous Foods)',
    violations: [{
      name: 'Cooking Temperature',
<<<<<<< HEAD
      checked: false
    }, {
      name: 'Reheating',
      checked: false
    }, {
      name: 'Cooling',
      checked: false
    }, {
      name: 'Hot and Cold Holding',
      checked: false
    }, {
      name: 'Time as a Public Health Control',
=======
      tid: 16,
      checked: false
    }, {
      name: 'Reheating',
      tid: 17,
      checked: false
    }, {
      name: 'Cooling',
      tid: 18,
      checked: false
    }, {
      name: 'Hot and Cold Holding',
      tid: 19,
      checked: false
    }, {
      name: 'Time as a Public Health Control',
      tid: 20,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'REQUIREMENTS FOR HIGHLY SUSCEPTIBLE POPULATIONS (HSP)',
    violations: [{
      name: 'Food and Food Preparation for HSP',
<<<<<<< HEAD
=======
      tid: 21,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }, {
    title: 'CONSUMER ADVISORY',
    violations: [{
      name: 'Posting of Consumer Advisories',
<<<<<<< HEAD
=======
      tid: 22,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }];

  var blueVList = [{
    title: 'GOOD RETAIL PRACTICES (BLUE ITEMS)',
    violations: [{
      name: 'Management and Personnel',
<<<<<<< HEAD
      checked: false
    }, {
      name: 'Food and Food Protection',
      checked: false
    }, {
      name: 'Equipment and Utensils',
      checked: false
    }, {
      name: 'Water, Plumbing and Waste',
      checked: false
    }, {
      name: 'Physical Facility',
      checked: false
    }, {
      name: 'Poisonous or Toxic Material',
      checked: false
    }, {
      name: 'Special Requirements',
      checked: false
    }, {
      name: 'Other',
=======
      tid: 23,
      checked: false
    }, {
      name: 'Food and Food Protection',
      tid: 24,
      checked: false
    }, {
      name: 'Equipment and Utensils',
      tid: 25,
      checked: false
    }, {
      name: 'Water, Plumbing and Waste',
      tid: 26,
      checked: false
    }, {
      name: 'Physical Facility',
      tid: 27,
      checked: false
    }, {
      name: 'Poisonous or Toxic Material',
      tid: 28,
      checked: false
    }, {
      name: 'Special Requirements',
      tid: 29,
      checked: false
    }, {
      name: 'Other',
      tid: 30,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
      checked: false
    }]
  }];

  var caList = [{
    name: 'Voluntary Compliance',
<<<<<<< HEAD
    checked: false
  }, {
    name: 'Re-inspection Scheduled',
    checked: false
  }, {
    name: 'Embargo',
    checked: false
  }, {
    name: 'Voluntary Disposal',
    checked: false
  }, {
    name: 'Employee Restriction/Exclusion',
    checked: false
  }, {
    name: 'Emergency Suspension',
    checked: false
  }, {
    name: 'Emergency Closure',
    checked: false
  }, {
    name: 'Other',
=======
    caid: 1,
    checked: false
  }, {
    name: 'Re-inspection Scheduled',
    caid: 2,
    checked: false
  }, {
    name: 'Embargo',
    caid: 3,
    checked: false
  }, {
    name: 'Voluntary Disposal',
    caid: 4,
    checked: false
  }, {
    name: 'Employee Restriction/Exclusion',
    caid: 5,
    checked: false
  }, {
    name: 'Emergency Suspension',
    caid: 6,
    checked: false
  }, {
    name: 'Emergency Closure',
    caid: 7,
    checked: false
  }, {
    name: 'Other',
    caid: 8,
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
    checked: false
  }];

  return {
    redVList: function() {
      return redVList;
    },
    blueVList: function() {
      return blueVList;
    },
    caList: function() {
      return caList;
<<<<<<< HEAD
    },
    checkedV: function() {
      return checkedV;
    },
    checkedCA: function() {
      return checkedCA;
    }
  };
});

app.factory('Forms', function() {
  var forms = [];

  return {
    forms: function() {
      return forms;
    },
    getForm: function(formName, date) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].estName === formName && forms[i].date === date) {
          return forms[i];
        }
      }

      return null;
    },
    addForm: function(form) {
      forms.push(form);
      console.log(forms);
=======
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
    }
  };
});

app.factory('FormViewerFields', function() {
  var fields = [{
    name: ['Name', 'Date'],
<<<<<<< HEAD
    model: ['estName', 'date']
=======
    model: ['f_name', 'f_date']
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
  }, {
    name: ['Address', 'Owner'],
    model: ['f_address', 'f_owner']
  }, {
    name: ['Permit No.', 'Inspector'],
<<<<<<< HEAD
    model: ['permitno', 'inspector']
  }, {
    name: ['Risk', 'HACCP'],
    model: ['risklvl', 'HACCP']
  }, {
    name: ['Time In', 'Time Out'],
    model: ['timein', 'timeout']
=======
    model: ['f_permitNum', 'f_inspector']
  }, {
    name: ['Risk', 'HACCP'],
    model: ['f_riskLvl', 'f_haccp']
  }, {
    name: ['Time In', 'Time Out'],
    model: ['f_timeIn', 'f_timeOut']
>>>>>>> be10bcf8a460ef933cb73c881552b2db42b73650
  }, {
    name: ['Type of Operation(s)', 'Type of Inspection'],
    model: ['f_opType', 'f_inspType']
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
      var foodCode = null;
      _.each(foodCodes, function(fc) {
        if (fc.path === foodCodePath) {
          foodCode = fc;
        }
      });

      return foodCode;
    }
  };
});