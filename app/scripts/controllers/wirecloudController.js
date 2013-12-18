angular.module('eu.crismaproject.pilotE.controllers',
    [
        'eu.crismaproject.pilotE.services',
        'eu.crismaproject.pilotE.configuration'
    ])
    .controller('wirecloudController',
        [
            '$scope',
            'eu.crismaproject.pilotE.services.OoI',
            function ($scope, ooi) {
                'use strict';

                var setSelectedPatient, getSelectedPatient, unwatch;

                setSelectedPatient = function (patient) {
                    console.log('setSelectedPatientL callback: ' + patient);

                    var patientId;

                    if (patient) {
                        patientId = patient.substr(patient.lastIndexOf('/') + 1);
                        console.log('patientId = ' + patientId);

                        ooi.getCapturePatients().get({patientId: patientId}).$promise.then(function (thePatient) {
                            // wirecloud will not check if value has changed
                            unwatch();
                            $scope.selectedPatient = thePatient;
                            unwatch = $scope.$watch('selectedPatient', getSelectedPatient);
                        });
                    }
                };

                getSelectedPatient = function (n) {
                    console.log('selectedPatient watch: ' + n);

                    if (n) {
                        MashupPlatform.wiring.pushEvent('getSelectedPatient', n.$self);
                    }
                };

                unwatch = $scope.$watch('selectedPatient', getSelectedPatient);

                MashupPlatform.wiring.registerCallback('setSelectedPatient', setSelectedPatient);

                $scope.selectedPatient = null;
            }]);