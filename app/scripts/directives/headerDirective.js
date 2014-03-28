angular.module('eu.crismaproject.pilotE.directives').directive(
    'headNav',
    function () {
        'use strict';

        var scope = {};

        return {
            scope: scope,
            restrict: 'E',
            replace: true,
            templateUrl: 'templates/headerTemplate.html',
            controller: 'headerDirectiveController'
        };
    }
);