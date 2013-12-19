$(function () {
    'use strict';

    // quick and dirty
    setTimeout(function () {
        var scope;

        if (typeof MashupPlatform === 'undefined') {
            console.log("mashup platform not available");
        } else {
            scope = $('div[ng-view]').scope();

            MashupPlatform.wiring.registerCallback('setSelectedPatient', function (selfref) {
                var doApply, patient, patientId, ooi, phase;

                doApply = function () {
                    phase = scope.$root.$$phase;
                    if (phase === '$apply' || phase === '$digest') {
                        scope.selectedPatient = patient;
                    } else {
                        scope.$apply(function () {
                            scope.selectedPatient = patient;
                        });
                    }
                };

                if (typeof selfref === 'string') {
                    ooi = $('div[ng-view]').injector().get('eu.crismaproject.pilotE.services.OoI');
                    patientId = selfref.substr(selfref.lastIndexOf('/') + 1);

                    ooi.getCapturePatients().get({patientId: patientId}).$promise.then(function (p) {
                        patient = p;
                        doApply();
                    });
                } else {
                    patient = undefined;
                    doApply();
                }
            });

            scope.$watch('selectedPatient', function (n, o) {
                if (n === o) {
                    return;
                }

                if (n) {
                    MashupPlatform.wiring.pushEvent('getSelectedPatient', n.$self);
                } else {
                    MashupPlatform.wiring.pushEvent('getSelectedPatient', undefined);
                }
            }, true);
        }
    }, 3000);
})