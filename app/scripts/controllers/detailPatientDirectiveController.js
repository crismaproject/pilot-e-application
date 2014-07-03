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

                $scope.injuryPatterns = ooi.getInjuryPatterns();
                $scope.ooi = ooi;
                $scope.select2Options = {
                    allowClear: true
                };

                $scope.sortCareMeasures = function (cm) {
                    switch (cm.measure) {
                        case 'Position': return 1;
                        case 'Supplemental Oxygen': return 2;
                        case 'Ventilation': return 3;
                        case 'Hemorrhage': return 4;
                        case 'Consciousness': return 5;
                        case 'Warmth preservation': return 6;
                        case 'Attendance': return 7;
                    }
                };

                $scope.$watch('patient.careMeasures', function () {
                    if ($scope.patient) {
                        $scope.patient.ratedMeasuresCount = ooi.getRatedMeasuresCount($scope.patient);
                    }
                }, true);
            }
        ]);
