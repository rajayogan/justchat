'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendApp
 */
angular.module('chat')
  .controller('AboutCtrl', function ($scope, namehandle, $location) {
    $scope.setname = function() {
      namehandle.usrnme = $scope.usrnme;
      $location.path('/main');
    }
  });
