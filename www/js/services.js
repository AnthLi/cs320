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
    path: '1.pdf',
    name: 'Dates'
  }, {
    path: '2.pdf',
    name: 'Hangman'
  }, {
    path: '3.pdf',
    name: 'Post Fix Evaluator'
  }, {
    path: '4.pdf',
    name: 'Tower of Hanoi (remember this?)'
  }, {
    path: '5.pdf',
    name: 'Recursive Linked List'
  }, {
    path: '6_p1.pdf',
    name: 'Grocery Store Simulator Part 1'
  }, {
    path: '6_p2.pdf',
    name: 'Grocery Store Simulator Part 2'
  }, {
    path: '7.pdf',
    name: 'Token Ring Simulator'
  }, {
    path: '8.pdf',
    name: 'Binary Search Trees'
  }, {
    path: '9.pdf',
    name: 'Priority Queue'
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