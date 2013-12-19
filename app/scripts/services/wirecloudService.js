angular.module(
    'eu.crismaproject.pilotE.services'
).factory(
    'eu.crismaproject.pilotE.services.WirecloudApi',
    [
        '$rootScope',
        'eu.crismaproject.pilotE.services.OoI',
        function ($rootScope, ooi) {
            'use strict';

            var getSelectedPatient, setSelectedPatient, setSelectedPatientWirecloud, selectedPatient;

            if (typeof MashupPlatform === 'undefined') {
                console.log('mashup platform not available');

                getSelectedPatient = function () {};
                setSelectedPatient = function () {};
            } else {
                setSelectedPatientWirecloud = function (newSelectedPatient) {
                    var patientId;

                    if (typeof newSelectedPatient === 'string') {
                        if (!selectedPatient || selectedPatient.$self !== newSelectedPatient) {
                            patientId = newSelectedPatient.substr(newSelectedPatient.lastIndexOf('/') + 1);

                            ooi.getCapturePatients().get({patientId: patientId}).$promise.then(function (patient) {
                                selectedPatient = patient;

                                $rootScope.$broadcast('selectedPatientChanged');
                            });
                        }
                    } else {
                        selectedPatient = undefined;
                        $rootScope.$broadcast('selectedPatientChanged');
                    }
                };

                getSelectedPatient = function () {
                    return selectedPatient;
                };

                setSelectedPatient = function (newSelectedPatient) {
                    selectedPatient = newSelectedPatient;
                    if (selectedPatient) {
                        MashupPlatform.wiring.pushEvent('getSelectedPatient', newSelectedPatient.$self);
                    } else {
                        MashupPlatform.wiring.pushEvent('getSelectedPatient', undefined);
                    }
                };

                MashupPlatform.wiring.registerCallback('setSelectedPatient', setSelectedPatientWirecloud);
            }

            return {
                getSelectedPatient: getSelectedPatient,
                setSelectedPatient: setSelectedPatient
            };
        }
    ]
);