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

                var getSelectedPatientL, setSelectedPatientL, setPatientsL;

                setSelectedPatientL = function () {
                    console.log('setSelectedPatientL callback');
                };

                setPatientsL = function () {
                    console.log('setPatientsL callback');
                };

                $scope.$watch('selectedPatient', function (n) {
                    console.log('selectedPatient watch: ' + n);
                    MashupPlatform.widget.log('selectedPatient watch', MashupPlatform.log.INFO);

                    MashupPlatform.wiring.pushEvent('getSelectedPatient', 'bla');
                });
                $scope.$watch('patients', function (n) {
                    console.log('patients watch: ' + n);
                    MashupPlatform.widget.log('patients watch', MashupPlatform.log.INFO);

                    MashupPlatform.wiring.pushEvent('getPatients', $scope.patients);
                });

                MashupPlatform.wiring.registerCallback('setSelectedPatient', getSelectedPatientL);
                MashupPlatform.wiring.registerCallback('setPatients', setPatientsL);

                // initially load the patients
                $scope.patients = ooi.getCapturePatients().query();
                $scope.selectedPatient = null;
            }]);