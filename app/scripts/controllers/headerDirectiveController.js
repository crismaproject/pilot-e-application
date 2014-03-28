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
            
            $scope.radioModel = {
                values: [{route: 'exercise', displayName:'Exercise'}, {route: 'analysis', displayName:'Analysis'}],
                selected: 'exercise'
            };
            $scope.$watch('radioModel.selected', function(n){
                $location.path('/' + n);
            });
        }
    ]);