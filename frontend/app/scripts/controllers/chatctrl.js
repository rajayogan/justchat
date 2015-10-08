/**
 * Created by rajayogan on 7/10/15.
 */
angular.module('chat')

.controller('chatcontroller', function($scope, chatfactory, $log, namehandle, $location){
    if(namehandle.usrnme == null){
      alert('You cant chat without a name');
      $location.path('/');
    }
    $scope.nme = namehandle.usrnme;
    $scope.mlog = 'Ready';
    $scope.activeusers = [];
  //  chatfactory.forward('usermng', $scope);
    chatfactory.emit('activeusers', $scope.nme);
    $scope.sendmess = function() {

chatfactory.emit('message', namehandle.usrnme, $scope.inpmsg);
      $scope.inpmsg = '';
    }
    $scope.$on('socket:broadcast', function(event, data) {
      $log.debug('got a message', event.name);
      if (!data.payload) {
        $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
        return;
      }
      $scope.$apply(function() {
        $scope.mlog = $scope.mlog + '\n' + data.source + ' said ' + data.payload;
      });
    });
    $scope.$on('socket:raja', function(event, data) {
      console.log('entered');
      $log.debug('onlineusers', event.name);
      if (!data) {
        $log.error('invalid message', 'event', event, 'data', JSON.stringify(data));
        return;
      }
      $scope.$apply(function() {
        $scope.activeusers.push(data);


      // console.log($scope.tempvar);
        chatfactory.emit('updatelist', $scope.activeusers);
        var listlen = $scope.activeusers.length;
        var newname = $scope.activeusers[listlen-1].activeuser;
        $scope.mlog = $scope.mlog + '\n' + newname + ' has joined the chat';

      });
    });
    $scope.$on('socket:updatedlist', function(event, data){
      $scope.$apply(function(){

        $scope.dispvar = data.updatedlist;
     //   console.log(data);


      })


    })
  })


