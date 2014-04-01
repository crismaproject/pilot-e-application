angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'headerDirectiveController',
    [
        '$scope',
        '$location',
        'eu.crismaproject.pilotE.services.OoI',
        'DEBUG',
        function ($scope, $location, ooi, DEBUG) {
            'use strict';

            if (DEBUG) {
                console.log('initialising header directive controller');
            }
            
            $scope.location = $location;
            $scope.dropdownVisible = false;
            $scope.selectedWorldstates = [{name:'<no Worldstate selected>'}];
        }
    ]);