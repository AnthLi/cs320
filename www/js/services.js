var app = angular.module('inspectorGadget.services', []);

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

app.factory('Forms', function() {
  var forms = [];

  return {
    forms: function() {
      return forms;
    },
    getForm: function(formName, date) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].name === formName && forms[i].date === date) {
          return forms[i];
        }
      }

      return null;
    },
    addForm: function(form) {
      forms.push(form);
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