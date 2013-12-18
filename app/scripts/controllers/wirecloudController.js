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

                var getSelectedPatient, setSelectedPatient;

                setSelectedPatient = function (patientUri) {
                    console.log('setSelectedPatientL callback: ' + patientUri);
                };

                getSelectedPatient = function () {
                    return $scope.selectedPatient;
                };

                $scope.$watch('selectedPatient', function (n) {
                    console.log('selectedPatient watch: ' + n);
                    MashupPlatform.widget.log('selectedPatient watch', MashupPlatform.log.INFO);

                    MashupPlatform.wiring.pushEvent('getSelectedPatient', getSelectedPatient());
                });

                MashupPlatform.wiring.registerCallback('setSelectedPatient', setSelectedPatient);

                $scope.selectedPatient = null;
            }]);