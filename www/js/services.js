var app = angular.module('inspectorGadget.services', []);

app.factory('Violations', function() {
  var violations = [
    {id: 1, name: 'Violation 1'},
    {id: 2, name: 'Violation 2'},
    {id: 3, name: 'Violation 3'},
    {id: 4, name: 'Violation 4'},
    {id: 5, name: 'Violation 5'}
  ];

  return {
    all: function() {
      return violations;
    },
    get: function(formPath) {
      for (var i = 0; i < violations.length; i++) {
        if (violations[i].id === violationID) {
          return forms[i];
        }
      }

      return null;
    }
  };
});

app.factory('Forms', function() {
  var forms = [{
    estName: 'Ridgy-D\'s',
    date: 'January 1, 1970',
    address: '144 Ridgway Lane Sunderland MA, 01001 US',
    owner: 'John Ridgbay',
    phone: '1-800-THI-SSUX',
    pic: 'pic/path',
    permitNo: '0001',
    inspector: 'Dude Magoo',
    riskLvl: 'Over 9000',
    prevInspDate: 'N/A',
    timeIn: '00:00:00',
    timeOut: '00:00:01',
    typeOfOp: 'Food Service',
    typeOfInsp: 'Routine'
  }];

  return {
    all: function() {
      return forms;
    },
    get: function(formName) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].estName === formName) {
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