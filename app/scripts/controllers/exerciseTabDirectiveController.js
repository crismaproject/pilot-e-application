angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'exerciseTabDirectiveController',
    [
        '$scope',
        '$location',
        '$anchorScroll',
        'DEBUG',
        function ($scope, $location, DEBUG) {
            'use strict';

            if (DEBUG) {
                console.log('initialising exercise tab directive controller');
            }
            
            $scope.isVisible = function () {
                return $location.path().indexOf('exercise') === 1;
            };
            
            $scope.goto = function (path) {
                $location.path(path);
            };
            
            $scope.showDebriefing = false;
        }
    ]);