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
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Vtype');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS Form_Vtype');
  // $cordovaSQLite.execute(db, 'DROP TABLE IF EXISTS CorrectiveAction');
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
  ).then(res => {
    // console.log('Form table created');
  }, err => {
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
  ).then(res => {
    // console.log('Violation table successfully created');
  }, err => {
    console.log('Violation table:', err);
  });

  // Violation type table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS Vtype( \
      vt_tid   INTEGER PRIMARY KEY, \
      vt_type  TEXT NOT NULL \
    )'
  ).then(res => {
    // console.log('Vtype table successfully created');
  }, err => {
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
  ).then(res => {
    // console.log('Form_Vtype table successfully created');
  }, err => {
    console.log('Form_Vtype table:', err);
  });

  // Corrective Action table
  $cordovaSQLite.execute(db,
    'CREATE TABLE IF NOT EXISTS CorrectiveAction( \
      ca_caid              INTEGER PRIMARY KEY AUTOINCREMENT, \
      ca_description       TEXT NOT NULL \
    )'
  ).then(res => {
    // console.log('CorrectiveAction table successfully created');
  }, err => {
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
  ).then(res => {
    // console.log('Form_CA table successfully created');
  }, err => {
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
  ).then(res => {
    // console.log('Picture table successfully created');
  }, err => {
    console.log('Picture table:', err);
  });

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
  var i = 1;
  _.each(types, type => {
    $cordovaSQLite.execute(db, q + String(i++) + ', ' + type + ')');
  });

  return db;
});

app.factory('NewInspection', () => {
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
    newInspectFields: () => {
      return newInspectFields;
    }
  }
});

app.factory('Forms', () => {
  // Lists of checked violations and corrective actions
  var checkedV = [];
  var checkedCA = [];
  // Lists of detailed violations
  var detailedVList = [];
  var forms = [];

  return {
    checkedV: () => {
      return checkedV;
    },
    addV: v => {
      checkedV.push(v);
    },
    removeV: v => {
      var index = 0;
      for (var i = 0; i < checkedV.length; i++) {
        if (checkedV[i].tid === v.tid) {
          index = i;
        }
      }

      checkedV.splice(index, 1);
    },
    checkedCA: () => {
      return checkedCA;
    },
    addCA: ca => {
      checkedCA.push(ca);
    },
    removeCA: ca => {
      var index = 0;
      for (var i = 0; i < checkedCA.length; i++) {
        if (checkedCA[i].tid === v.tid) {
          index = i;
        }
      }

      checkedCA.splice(index, 1);
    },
    detailedVList: () => {
      return detailedVList;
    },
    forms: () => {
      return forms;
    },
    addForm: form => {
      // Don't add duplicate forms with the same name and date
      var exists = false;
      _.each(forms, f => {
        if (f.f_name === form.f_name && f.f_date === form.f_date) {
          exists = true;
        }
      });

      if (!exists) {
        forms.push(form);
      }
    },
    addViolationsToForm: violations => {
      var added = [];
      _.each(forms, f => {
        _.each(violations, v => {
          if (f.f_fid === v.v_fid) {
            added.push(v.v_tid);
          }
        });
      });

      _.each(added, tid => {
        console.log(tid);
        // var q = 'SELECT * FROM Vtype vt WHERE vt.tid '
        // $cordovaSQLite.execute
      });
    },
    getForm: (formName, date) => {
      var form = null;
      _.each(forms, f => {
        if (f.f_name === formName && f.f_date === date) {
          form = f;
        }
      });

      return form;
    }
  };
});

app.factory('Violations', () => {
  var redVList = [{
    title: 'FOOD PROTECTION MANAGEMENT',
    violations: [{
      name: 'PIC Assigned',
      tid: 1,
      checked: false
    }]
  }, {
    title: 'EMPLOYEE HEALTH',
    violations: [{
      name: 'Reporting of Diseases by Food Employee and PIC',
      tid: 2,
      checked: false
    }, {
      name: 'Personnel with Infections Restricted / Excluded',
      tid: 3,
      checked: false
    }]
  }, {
    title: 'FOOD FROM APPROVED SOURCE',
    violations: [{
      name: 'Food and Water from Approved Source',
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
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CONTAMINATION',
    violations: [{
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
      checked: false
    }]
  }, {
    title: 'PROTECTION FROM CHEMICALS',
    violations: [{
      name: 'Approved Food or Color Additives',
      tid: 14,
      checked: false
    }, {
      name: 'Toxic Chemicals',
      tid: 15,
      checked: false
    }]
  }, {
    title: 'TIME/TEMPERATURE CONTROLS (Potentially Hazardous Foods)',
    violations: [{
      name: 'Cooking Temperature',
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
      checked: false
    }]
  }, {
    title: 'REQUIREMENTS FOR HIGHLY SUSCEPTIBLE POPULATIONS (HSP)',
    violations: [{
      name: 'Food and Food Preparation for HSP',
      tid: 21,
      checked: false
    }]
  }, {
    title: 'CONSUMER ADVISORY',
    violations: [{
      name: 'Posting of Consumer Advisories',
      tid: 22,
      checked: false
    }]
  }];

  var blueVList = [{
    title: 'GOOD RETAIL PRACTICES (BLUE ITEMS)',
    violations: [{
      name: 'Management and Personnel',
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

  return {
    redVList: () => {
      return redVList;
    },
    blueVList: () => {
      return blueVList;
    },
    caList: () => {
      return caList;
    }
  };
});

app.factory('FormViewerFields', () => {
  var fields = [{
    name: ['Name', 'Date'],
    model: ['f_name', 'f_date']
  }, {
    name: ['Address', 'Owner'],
    model: ['f_address', 'f_owner']
  }, {
    name: ['Permit No.', 'Inspector'],
    model: ['f_permitNum', 'f_inspector']
  }, {
    name: ['Risk', 'HACCP'],
    model: ['f_riskLvl', 'f_haccp']
  }, {
    name: ['Time In', 'Time Out'],
    model: ['f_timeIn', 'f_timeOut']
  }, {
    name: ['Type of Operation(s)', 'Type of Inspection'],
    model: ['f_opType', 'f_inspType']
  }];

  return {
    fields: () => {
      return fields;
    }
  }
});

app.factory('FoodCodes', () => {
  var foodCodes = [{
    path: '1999_fda_food_code.pdf',
    name: '1999 FDA Food Code'
  }, {
    path: 'ma_food_code.pdf',
    name: 'Massachusetts Food Code'
  }];

  return {
    foodCodes: () => {
      return foodCodes;
    },
    getFoodCode: foodCodePath => {
      var foodCode = null;
      _.each(foodCodes, fc => {
        if (fc.path === foodCodePath) {
          foodCode = fc;
        }
      });

      return foodCode;
    }
  };
});