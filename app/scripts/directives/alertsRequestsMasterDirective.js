angular.module(
    'eu.crismaproject.pilotE.directives'
).directive(
    'alertsRequestsMasterWidget',
    function () {
        'use strict';

        var scope = {
                rescueMeans: '=',
                selectedRescueMeans: '='
            };

        return {
            scope: scope,
            restrict: 'E',
            templateUrl: 'templates/alertsRequestsMasterTemplate.html',
            controller: 'eu.crismaproject.pilotE.controllers.alertsRequestsMasterDirectiveController'
        };
    }
);