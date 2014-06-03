angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'masterPatientDirectiveController',
    [
        '$scope',
        '$filter',
        'ngTableParams',
        'eu.crismaproject.pilotE.services.OoI',
        'DEBUG',
        function ($scope, $filter, NgTableParams, ooi, DEBUG) {
            'use strict';

            if (DEBUG) {
                console.log('initialising master patient directive controller');
            }

            $scope.tableParams = new NgTableParams(
                {
                    page: 1,
                    count: 10,
                    sorting: { name: 'asc' }
                },
                {
                    total: $scope.patients ? $scope.patients.length : 0,
                    $scope: {$data: {}},
                    getData: function ($defer, params) {
                        var ordered;

                        if ($scope.patients) {
                            ordered = params.filter() ? $filter('filter')($scope.patients, params.filter()) : $scope.patients;
                            ordered = params.sorting() ? $filter('orderBy')(ordered, params.orderBy()) : $scope.patients;

                            params.total(ordered.length);
                            $defer.resolve(ordered.slice(
                                (params.page() - 1) * params.count(),
                                params.page() * params.count()
                            ));
                        } else {
                            $defer.resolve([]);
                        }
                    }
                }
            );

            $scope.$watchCollection('patients', function (n) {
                // this ensures that newly created patients without a name are actually visible
                // why is n.length === o.length --> https://github.com/angular/angular.js/issues/2621
                if (n) {
                    if (n.length > $scope.patientsCount) {
                        $scope.tableParams.sorting('name', 'asc');
                    }
                    $scope.patientsCount = n.length;
                }
                $scope.tableParams.reload();
            });

            $scope.maxCareMeasures = ooi.getMaxCareMeasures;
            $scope.selectedPatient = null;
            $scope.patientsCount = null;

            $scope.setSelected = function (patient) {
                $scope.selectedPatient = patient;
            };

            $scope.removePatient = function (patient) {
                var i;

                if (patient === $scope.selectedPatient) {
                    $scope.selectedPatient = null;
                }

                for (i = 0; i < $scope.patients.length; ++i) {
                    if ($scope.patients[i] === patient) {
                        $scope.patients.splice(i, 1);
                        break;
                    }
                }
            };
        }
    ]
);
