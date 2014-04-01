angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'exerciseNavDirectiveController',
    [
        '$scope',
        '$location',
        'DEBUG',
        function ($scope, $location, DEBUG) {
            'use strict';

            if (DEBUG) {
                console.log('initialising exercise nav directive controller');
            }
            
            $scope.isVisible = function () {
                return $location.path().indexOf('exercise') === 1;
            };
            
            $scope.goto = function (path) {
                $location.path(path);
            };
        }
    ]);