angular.module('eu.crismaproject.pilotE.controllers',
    [
        'ngTable',
        'eu.crismaproject.pilotE.services',
        'eu.crismaproject.pilotE.configuration'
    ])
    .controller('wirecloudController',
        [
            '$scope',
            'eu.crismaproject.pilotE.services.OoI',
            function ($scope, ooi) {
                'use strict';

                var setSelectedPatient, setPatients;

                setSelectedPatient = function (patient) {
                    console.log('setSelectedPatient callback: ' + patient);

                    var patientId;

                    if (patient) {
                        patientId = patient.substr(patient.lastIndexOf('/') + 1);
                        console.log('patientId = ' + patientId);

                        ooi.getCapturePatients().get({patientId: patientId}).$promise.then(function (thePatient) {
                            $scope.selectedPatient = thePatient;
                        });
                    }
                };

                setPatients = function (patients) {
                    console.log('setPatientsL callback: ' + patients);
                };

                $scope.$watch('selectedPatient', function (n) {
                    console.log('selectedPatient watch: ' + n);

                    if (n) {
                        MashupPlatform.wiring.pushEvent('getSelectedPatient', n.$self);
                    }
                });
                $scope.$watch('patients', function (n) {
                    console.log('patients watch: ' + n);

                    MashupPlatform.wiring.pushEvent('getPatients', n);
                });

                MashupPlatform.wiring.registerCallback('setSelectedPatient', setSelectedPatient);
                MashupPlatform.wiring.registerCallback('setPatients', setPatients);

                // initially load the patients
                $scope.patients = ooi.getCapturePatients().query();
                $scope.selectedPatient = null;
            }]);