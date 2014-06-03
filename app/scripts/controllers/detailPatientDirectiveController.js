angular.module('eu.crismaproject.pilotE.controllers')
    .controller('detailPatientDirectiveController',
        [
            '$scope',
            'eu.crismaproject.pilotE.services.OoI',
            'DEBUG',
            function ($scope, ooi, DEBUG) {
                'use strict';

                if (DEBUG) {
                    console.log('initialising detail patient directive controller');
                }

                $scope.$watch('patient.careMeasures', function () {
                    if ($scope.patient) {
                        $scope.patient.ratedMeasuresCount = ooi.getRatedMeasuresCount($scope.patient);
                    }
                }, true);
            }
        ]);
