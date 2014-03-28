angular.module('eu.crismaproject.pilotE.directives').directive(
    'exerciseNav',
    function () {
        'use strict';

        var scope = {};

        return {
            scope: scope,
            restrict: 'E',
            replace: false,
            templateUrl: 'templates/exerciseNavTemplate.html',
            controller: 'exerciseNavDirectiveController'
        };
    }
);