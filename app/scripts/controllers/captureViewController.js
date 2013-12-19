angular.module('eu.crismaproject.pilotE.controllers',
    [
        'ngTable',
        'ui.bootstrap.alert',
        'eu.crismaproject.pilotE.services',
        'eu.crismaproject.pilotE.configuration'
    ])
    .controller('captureViewController',
        [
            '$scope',
            '$injector',
            'eu.crismaproject.pilotE.services.OoI',
            'DEBUG',
            function ($scope, $injector, ooi, DEBUG) {
                'use strict';

                var wirecloudApi;

                if (DEBUG) {
                    console.log('initialising capture view controller');
                }

                $scope.patients = ooi.getCapturePatients().query();
                $scope.selectedPatient = null;
                $scope.alerts = [];

                $scope.$on('alertSave', function (e, alert) {
                    if (alert) {
                        $scope.alerts.pop();
                        $scope.alerts.push(alert);

                        if (alert.type === 'success') {
                            ooi.getQueue('alertSave').queue(function () { $scope.alerts.pop(); }, 4000);
                        } else {
                            ooi.getQueue('alertSave').clear();
                        }
                    }
                });

                if ($injector.has('eu.crismaproject.pilotE.services.WirecloudApi')) {
                    console.log('initialising wirecloud api');

                    wirecloudApi = $injector.get('eu.crismaproject.pilotE.services.WirecloudApi');

                    $scope.$on('selectedPatientChanged', function () {
                        var phase = $scope.$root.$$phase;
                        if (phase === '$apply' || phase === '$digest') {
                            $scope.selectedPatient = wirecloudApi.getSelectedPatient();
                        } else {
                            $scope.$apply(function () {
                                $scope.selectedPatient = wirecloudApi.getSelectedPatient();
                            });
                        }
                    });

                    $scope.$watch('selectedPatient', function (n, o) {
                        if (o === n) {
                            // ignore event, do nothing
                            return;
                        }

                        wirecloudApi.setSelectedPatient($scope.selectedPatient);
                    });
                }
            }
        ]);
