var app = angular.module('inspectorGadget.services', []);

app.factory('NewInspectionFields', function() {
  // The fields are paired together based on how the front-end shows it.
  // This is to help dynamically generate the input fields rather than
  // hard-coding every single one of them, decreasing the amount of code
  // being written
  var newInspFields = [{
    name: [
      'estName',
      'date'
    ],
    model: [
      'estName',
      'date'
    ],
    temp: [
      'Name of Food Establishment',
      'MM/DD/YYYY'
    ]
  }, {
    name: [
      'address',
      'owner'
    ],
    model: [
      'address',
      'owner'
    ],
    temp: [
      'Address',
      'Owner'
    ]
  }, {
    name: [
      'phone',
      'PIC'
    ],
    model: [
      'phone',
      'PIC'
    ],
    temp: [
      'Telephone',
      'Person In Charge'
    ]
  }, {
    name: [
      'permitno',
      'inspector'
    ],
    model: [
      'permitno',
      'inspector'
    ],
    temp: [
      'Permit No.',
      'Inspector'
    ]
  }, {
    name: [
      'risklvl',
      'prevInspDate'
    ],
    model: [
      'risklvl',
      'prevInspDate'
    ],
    temp: [
      'Risk Level',
      'Prev. Inspection Date'
    ]
  }];

  return {
    newInspFields: function() {
      return newInspFields;
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

app.factory('Forms', function() {
  var forms = [{
    estName: 'Apartment 101',
    date: 'January 1, 1970',
    address: '101 Complex Street, Amherst, MA 01003',
    owner: 'Some guy',
    phone: '1-800-COM-PLEX',
    PIC: 'Some PIC',
    permitno: '0001',
    inspector: 'Some Inspector',
    risklvl: '42',
    prevInspDate: 'N/A',
    timein: '00:00:00',
    timeout: '00:00:01',
    typeofOp: 'Residential',
    typeofInsp: 'Routine'
  }, {
    estName: 'Restaurant ABC',
    date: 'February 1, 1970',
    address: '123 ABC Street, Amherst, MA 01003',
    owner: 'XYZ',
    phone: '1-234-567-8910',
    PIC: 'XYZ',
    permitno: '1234',
    inspector: 'Gadget',
    risklvl: '1',
    prevInspDate: 'N/A',
    timein: '00:00:00',
    timeout: '00:00:01',
    typeofOp: 'Food Service',
    typeofInsp: 'Routine'
  }, {
    estName: 'Restaurant ABC',
    date: 'March 1, 1970',
    address: '123 ABC Street, Amherst, MA 01003',
    owner: 'XYZ',
    phone: '1-234-567-8910',
    PIC: 'XYZ',
    permitno: '1234',
    inspector: 'Gadget',
    risklvl: '1',
    prevInspDate: 'February 1, 1970',
    timein: '00:00:01',
    timeout: '00:00:02',
    typeofOp: 'Food Service',
    typeofInsp: 'Re-Inspection'
  }, {
    estName: 'Apartment 101',
    date: 'January 1, 1971',
    address: '101 Complex Street, Amherst, MA 01003',
    owner: 'Some guy',
    phone: '1-800-COM-PLEX',
    PIC: 'Some PIC',
    permitno: '0001',
    inspector: 'Some Inspector',
    risklvl: '42',
    prevInspDate: 'January 1, 1970',
    timein: '00:00:00',
    timeout: '00:00:01',
    typeofOp: 'Residential',
    typeofInsp: 'Re-inspection'
  }];

  return {
    all: function() {
      return forms;
    },
    get: function(formName, date) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].estName === formName && forms[i].date === date) {
          return forms[i];
        }
      }

      return null;
    },
    add: function(form) {
      forms.push(form);
      return null;
    }
  };
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
    all: function() {
      return foodCodes;
    },
    get: function(foodCodePath) {
      for (var i = 0; i < foodCodes.length; i++) {
        if (foodCodes[i].path === foodCodePath) {
          return foodCodes[i];
        }
      }

      return null;
    }
  };
});