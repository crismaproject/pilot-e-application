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

                if (!$scope.patients) {
                    throw 'IllegalStateException: patients not provided by directive user';
                }

                $scope.tableParams = new NgTableParams(
                    {
                        page: 1,
                        count: 10,
                        sorting: { name: 'asc' }
                    },
                    {
                        total: $scope.patients.length,
                        $scope: {$data: {}},
                        getData: function ($defer, params) {
                            var resolvedPatients, i;

                            // we have to load every patient to ensure proper paging/sorting
                            resolvedPatients = [];

                            for (i = 0; i < $scope.patients.length; ++i) {
                                resolvedPatients[i] = ooi.getCapturePatients().get({patientId: $scope.patients[i].id}).$promise;
                            }

                            $q.all(resolvedPatients).then(function (thePatients) {
                                var ordered;

                                ordered = params.filter() ? $filter('filter')(thePatients, params.filter()) : thePatients;
                                ordered = params.sorting() ? $filter('orderBy')(ordered, params.orderBy()) : thePatients;

                                params.total(ordered.length);
                                $defer.resolve(ordered.slice(
                                    (params.page() - 1) * params.count(),
                                    params.page() * params.count()
                                ));
                            });
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
            }]);
