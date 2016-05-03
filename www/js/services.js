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
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Picture');

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
      itemNum           INTEGER NOT NULL, \
      codeRef           TEXT NOT NULL, \
      isCrit            TEXT NOT NULL, \
      description       TEXT NOT NULL, \
      dateVerified      TEXT NOT NULL, \
      FOREIGN KEY(fid)  REFERENCES Form(fid), \
      FOREIGN KEY(tid)  REFERENCES Vtype(tid))'
  );

  // Corrective Action table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS CorrectiveAction( \
      caid              INTEGER PRIMARY KEY AUTOINCREMENT, \
      fid               INTEGER NOT NULL, \
      description       TEXT NOT NULL, \
      FOREIGN KEY(fid)  REFERENCES Form(fid))'
  );

  // Violation type table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Vtype( \
      tid   INTEGER PRIMARY KEY, \
      type  TEXT NOT NULL)'
  );

  // Picture table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Picture( \
      pid               INTEGER PRIMARY KEY AUTOINCREMENT, \
      vid               INTEGER NOT NULL, \
      filename          TEXT NOT NULL, \
      FOREIGN KEY(vid)  REFERENCES Violation(vid))'
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
      name: 'PIC Assigned',
      checked: false
    }]
  }, {
    title: 'EMPLOYEE HEALTH',
    violations: [{
      name: 'Reporting of Diseases by Food Employee and PIC',
      checked: false
    }, {
      name: 'Personnel with Infections Restricted/Excluded',
      checked: false
    }]
  }, {
    title: 'FOOD FROM APPROVED SOURCE',
    violations: [{
      name: 'Food and Water from Approved Source',
      checked: false
    }, {
      name: 'Receiving/Condition',
      checked: false
    }, {
      name: 'Tags/Records/Accuracy of Ingredient Statements',
      checked: false
    }, {
      name: 'Conformance with Approved Procedures/HACCP Plans',
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CONTAMINATION',
    violations: [{
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
    title: 'TIME/TEMPERATURE CONTROLS',
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
    title: 'REQUIREMENTS FOR HIGHLY SUSCEPTIBLE POPULATIONS',
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
  }, {
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
    },
    detailedVList: function() {
      return detailedVList;
    }
  };
});

app.factory('Forms', function() {
  var forms = [];

  return {
    forms: function() {
      return forms;
    },
    addForm: function(form) {
      forms.push(form);
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