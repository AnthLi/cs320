var app = angular.module('inspectorGadget.services', []);
var db = null;

app.factory('DB', function($cordovaSQLite) {
  // Detect whether the user is in on mobile (prod) or a desktop browser (dev)
  if (window.cordova) {
    db = $cordovaSQLite.openDatabase('inspections.db');
  } else {
    db = window.openDatabase('inspections.db', '', 'Inspections',
      1024 * 1024 * 100);
  }

  // Drop the tables and start over
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Form');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Violation');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS CorrectiveAction');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Vtype');
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
  );

  // Violation table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Violation( \
      v_vid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      v_fid               INTEGER NOT NULL, \
      v_tid               INTEGER NOT NULL, \
      v_itemNum           INTEGER NOT NULL, \
      v_codeRef           TEXT NOT NULL, \
      v_isCrit            TEXT NOT NULL, \
      v_description       TEXT NOT NULL, \
      v_dateVerified      TEXT NOT NULL, \
      FOREIGN KEY(v_fid)  REFERENCES Form(f_fid), \
      FOREIGN KEY(v_tid)  REFERENCES Vtype(f_tid) \
    )'
  );

  // Corrective Action table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS CorrectiveAction( \
      ca_caid              INTEGER PRIMARY KEY AUTOINCREMENT, \
      ca_fid               INTEGER NOT NULL, \
      ca_description       TEXT NOT NULL, \
      FOREIGN KEY(ca_fid)  REFERENCES Form(f_fid) \
    )'
  );

  // Violation type table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Vtype( \
      vt_tid   INTEGER PRIMARY KEY, \
      vt_type  TEXT NOT NULL \
    )'
  );

  // Picture table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Picture( \
      p_pid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      p_vid               INTEGER NOT NULL, \
      p_filename          TEXT NOT NULL, \
      FOREIGN KEY(p_vid)  REFERENCES Violation(v_vid) \
    )'
  );

  // Fill Vtype with necessary values
  var types = [
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
  var q = 'INSERT INTO Vtype VALUES(';
  for (var i = 0; i < types.length; i++) {
    $cordovaSQLite.execute(db, q + String(i + 1) + ', ' + types[i] + ')');
  }

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
  var redVList = [{
    title: 'FOOD PROTECTION MANAGEMENT',
    violations: [{
      name: 'PIC Assigned',
      checked: false
    }]
  }, {
    title: 'EMPLOYEE HEALTH',
    violations: [{
      name: 'Reporting of Diseases by Food Employee and PIC',
      checked: false
    }, {
      name: 'Personnel with Infections Restricted / Excluded',
      checked: false
    }]
  }, {
    title: 'FOOD FROM APPROVED SOURCE',
    violations: [{
      name: 'Food and Water from Approved Source',
      checked: false
    }, {
      name: 'Receiving / Condition',
      checked: false
    }, {
      name: 'Tags / Records / Accuracy of Ingredient Statements',
      checked: false
    }, {
      name: 'Conformance with Approved Procedures / HACCP Plans',
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CONTAMINATION',
    violations: [{
      name: 'Separation / Segregation / Protection',
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
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CHEMICALS',
    violations: [{
      name: 'Approved Food or Color Additives',
      checked: false
    }, {
      name: 'Toxic Chemicals',
      checked: false
    }]
  }, {
    title: 'TIME/TEMPERATURE CONTROLS (Potentially Hazardous Foods)',
    violations: [{
      name: 'Cooking Temperature',
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
      checked: false
    }]
  }, {
    title: 'REQUIREMENTS FOR HIGHLY SUSCEPTIBLE POPULATIONS (HSP)',
    violations: [{
      name: 'Food and Food Preparation for HSP',
      checked: false
    }]
  }, {
    title: 'CONSUMER ADVISORY',
    violations: [{
      name: 'Posting of Consumer Advisories',
      checked: false
    }]
  }];

  var blueVList = [{
    title: 'GOOD RETAIL PRACTICES (BLUE ITEMS)',
    violations: [{
      name: 'Management and Personnel',
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
      checked: false
    }]
  }];

  var caList = [{
    name: 'Voluntary Compliance',
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
    checked: false
  }];

  // Lists of checked violations and corrective actions
  var checkedV = [];
  var checkedCA = [];

  // Lists of detailed violations
  var detailedVList = [];

  return {
    redVList: function() {
      return redVList;
    },
    blueVList: function() {
      return blueVList;
    },
    caList: function() {
      return caList;
    },
    checkedV: function() {
      return checkedV;
    },
    checkedCA: function() {
      return checkedCA;
    },
    detailedVList: function() {
      return detailedVList;
    }
  };
});

app.factory('Forms', function() {
  var forms = [];

  return {
    formData: function() {
      return formData;
    },
    forms: function() {
      return forms;
    },
    addForm: function(form) {
      // Don't add duplicate forms with the same name and date
      var exists = false;
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].name === form.name && forms[i].date === form.date) {
          exists = true;
        }
      }

      if (!exists) {
        forms.push(form);
      }
    },
    getForm: function(formName, date) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].name === formName && forms[i].date === date) {
          return forms[i];
        }
      }

      return null;
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