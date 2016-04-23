angular.module('starter.services', [])

.factory('Forms', function() {
  var forms = [{
    path: "1999_fda_food_code.pdf",
    name: "1999 FDA Food Code"
  }, {
    path: "ma_food_code.pdf",
    name: "Massachusetts Food Code"
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
