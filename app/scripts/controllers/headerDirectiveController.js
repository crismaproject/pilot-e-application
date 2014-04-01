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
            $scope.activeWorldstate = null;
            $scope.selectedWorldstates = [{name: '<no Worldstate selected>'}];
            // to be replace with the filter control of the ws tree
            $scope.wsName = null;
            $scope.createNewWorldstate = function () {
                // TODO: proper impl
                if ($scope.activeWorldstate) {
                    alert('will create worldstate with parent: "' + $scope.activeWorldstate.name + '"');
                } else {
                    alert('no active worldstate');
                }
            };
        }
    ]
);