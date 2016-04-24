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
    path: 'test_1.pdf',
    name: 'Red Team Software Design Specification'
  }, {
    path: 'test_2.pdf',
    name: 'Green Team Software Design Document'
  }, {
    path: 'test_3.pdf',
    name: 'Green Team High Level Design Document'
  }];

  return {
    all: function() {
      return forms;
    },
    get: function(formPath) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].path === formPath) {
          return forms[i];
        }
      }

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