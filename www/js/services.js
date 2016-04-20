angular.module('starter.services', [])

.factory('NewInspection', function() {
  // Might use a resource here that returns a JSON array

  // Ayy Lmao testing data
  var chats = [{
    id: 0,
    name: 'Ayy Lmao',
    lastText: 'You on your way?',
    face: 'img/ayy_lmao.png'
  }, {
    id: 1,
    name: 'Ayy Lmao',
    lastText: 'Hey, it\'s me',
    face: 'img/ayy_lmao.png'
  }, {
    id: 2,
    name: 'Ayy Lmao',
    lastText: 'I should buy a boat',
    face: 'img/ayy_lmao.png'
  }, {
    id: 3,
    name: 'Ayy Lmao',
    lastText: 'Look at my mukluks!',
    face: 'img/ayy_lmao.png'
  }, {
    id: 4,
    name: 'Ayy Lmao',
    lastText: 'This is wicked good ice cream.',
    face: 'img/ayy_lmao.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
