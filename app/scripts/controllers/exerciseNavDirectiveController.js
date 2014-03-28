angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'exerciseNavDirectiveController',
    [
        '$scope',
        '$location',
        'eu.crismaproject.pilotE.services.OoI',
        'DEBUG',
        function ($scope, $location, ooi, DEBUG) {
            'use strict';

            if (DEBUG) {
                console.log('initialising exercise nav directive controller');
            }
            
            $scope.isVisible = function () {
                return $location.path().indexOf('exercise') === 1;
            };
        }
    ]);