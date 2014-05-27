angular.module('eu.crismaproject.pilotE.controllers')
    .controller('masterPatientDirectiveController',
        [
            '$scope',
            '$q',
            '$filter',
            'ngTableParams',
            'eu.crismaproject.pilotE.services.OoI',
            'DEBUG',
            function ($scope, $q, $filter, NgTableParams, ooi, DEBUG) {
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

                $scope.$watch('patients.length', function () {
                    $scope.tableParams.reload();
                });

                $scope.maxCareMeasures = ooi.getMaxCareMeasures();
                $scope.selectedPatient = null;

                $scope.setSelected = function (patient) {
                    $scope.selectedPatient = patient;
                };

//                $scope.$watch('selectedPatient', function (n, o) {
//                    if (o && n && o.id === n.id) {
//                        // now the patient has been changed by the user, queue save operation
//                        $scope.$emit('alertSave', {
//                            type: 'warning',
//                            msg: 'Patient \'' + n.name + ', ' + n.forename + '\' contains unsaved changes!'
//                        });
//                        ooi.getQueue(n.name + n.id).queue(function () {
//                            n.$save(
//                                {},
//                                function () {
//                                    $scope.$emit('alertSave', {
//                                        type: 'success',
//                                        msg: 'Patient \'' + n.name + ', ' + n.forename + '\' saved!'
//                                    });
//                                },
//                                function () {
//                                    $scope.$emit('alertSave', {
//                                        type: 'error',
//                                        msg: 'Patient \'' + n.name + ', ' + n.forename + '\' could not be saved!'
//                                    });
//                                }
//                            );
//                        }, 3000);
//                    }
//                }, true);
            }]);
