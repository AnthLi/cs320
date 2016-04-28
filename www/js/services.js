var app = angular.module('inspectorGadget.services', []);

app.factory('NewInspectionFields', function() {
  var fieldRows = [{
    name: [
      'estName',
      'date'
    ],
    model: [
      'formData.estName',
      'formData.date'
    ],
    placeholder: [
      'Name of Food Establishment',
      'MM/DD/YYYY'
    ]
  }, {
    name: [
      'address',
      'owner'
    ],
    model: [
      'formData.address',
      'formData.owner'
    ],
    placeholder: [
      'Address',
      'Owner'
    ]
  }, {
    name: [
      'phone',
      'PIC'
    ],
    model: [
      'formData.phone',
      'formData.PIC'
    ],
    placeholder: [
      'Telephone',
      'Person In Charge'
    ]
  }, {
    name: [
      'permitno',
      'inspector'
    ],
    model: [
      'formData.permitno',
      'formData.inspector'
    ],
    placeholder: [
      'Permit No.',
      'Inspector'
    ]
  }, {
    name: [
      'risklvl',
      'prevInspDate'
    ],
    model: [
      'formData.risklvl',
      'formData.prevInspDate'
    ],
    placeholder: [
      'Risk Level',
      'Prev. Inspection Date'
    ]
  }];

  return {
    allFieldRows: function() {
      return fieldRows;
    }
  }
});

app.factory('Violations', function() {
  var violations = [{
    title: 'FOOD PROTECTION MANAGEMENT',
    violations: [
      'PIC Assigned'
    ]
  }, {
    title: 'EMPLOYEE HEALTH',
    violations: [
      'Reporting of Diseases by Food Employee and PIC',
      'Personnel with Infections Restricted/Excluded'
    ]
  }, {
    title: 'FOOD FROM APPROVED SOURCE',
    violations: [
      'Food and Water from Approved Source',
      'Receiving/Condition',
      'Tags/Records/Accuracy of Ingredient Statements',
      'Conformance with Approved Procedures/HACCP Plans'
    ]
  }, {
    title: 'PROTECTION FROM CONTAMINATION',
    violations: [
      'Separation/Segregation/Protection',
      'Food Contact Surface Cleaning and Sanitizing',
      'Proper Adequate Handwashing',
      'Good Hygeinic Practices',
      'Prevention of Contamination',
      'Handwash Facilities'
    ]
  }, {
    title: 'PROTECTION FROM CHEMICALS',
    violations: [
      'Approved Food or Color Additives',
      'Toxic Chemicals'
    ]
  }, {
    title: 'TIME/TEMPERATURE CONTROLS',
    violations: [
      'Cooking Temperature',
      'Reheating',
      'Cooling',
      'Hot and Cold Holding',
      'Time as a Public Health Control'
    ]
  }, {
    title: 'REQUIREMENTS FOR HIGHLY SUSCEPTIBLE POPULATIONS',
    violations: [
      'Food and Food Preparation for HSP'
    ]
  }, {
    title: 'CONSUMER ADVISORY',
    violations: [
      'Posting of Consumer Advisories'
    ]
  }, {
    title: 'GOOD RETAIL PRACTICES (BLUE ITEMS)',
    violations: [
      'Management and Personnel',
      'Food and Food Protection',
      'Equipment and Utensils',
      'Water, Plumbing and Waste',
      'Physical Facility',
      'Poisonous or Toxic Material',
      'Special Requirements',
      'Other'
    ]
  }];

  var correctiveActions = [
    'Voluntary Compliance',
    'Re-inspection Scheduled',
    'Embargo',
    'Voluntary Disposal',
    'Employee Restriction/Exclusion',
    'Emergency Suspension',
    'Emergency Closure',
    'Other'
  ];

  return {
    allViolations: function() {
      return violations;
    },
    allCorrectiveActions: function() {
      return correctiveActions;
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