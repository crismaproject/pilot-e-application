angular.module(
    'eu.crismaproject.pilotE.directives'
).directive(
    'alertsRequestsDetailsWidget',
    function () {
        'use strict';

        var scope = {
                selectedAlertRequest: '=',
                editing: '='
            };

        return {
            scope: scope,
            restrict: 'E',
            templateUrl: 'templates/alertsRequestsDetailsTemplate.html',
            controller: 'eu.crismaproject.pilotE.controllers.alertsRequestsDetailsDirectiveController'
        };
    }
);