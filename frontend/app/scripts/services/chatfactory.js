/**
 * Created by rajayogan on 7/10/15.
 */
angular.module('chat')

  .factory('chatfactory', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('broadcast');
    socket.forward('raja');
    socket.forward('updatedlist');
    return socket;
  })
