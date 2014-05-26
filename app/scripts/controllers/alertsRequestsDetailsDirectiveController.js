angular.module('eu.crismaproject.pilotE.controllers')
    .controller('eu.crismaproject.pilotE.controllers.alertsRequestsDetailsDirectiveController',
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
                    console.log('initialising master alerts requests directive controller');
                }
                
                $scope.quantity = 1;

                $scope.tableParams = new NgTableParams(
                    {
                        page: 1,
                        count: 10,
                        sorting: { name: 'asc' }
                    },
                    {
                        total: $scope.rescueMeans ? $scope.rescueMeans.length : 0,
                        $scope: {$data: {}},
                        getData: function ($defer, params) {
                            var resolvedMeans, i;

                            // we have to load every rescue means to ensure proper paging/sorting
                            resolvedMeans = [];
                            
                            if ($scope.rescueMeans) {
                                for (i = 0; i < $scope.rescueMeans.length; ++i) {
                                    resolvedMeans[i] = ooi.getRescueMeans().get({meansId: $scope.rescueMeans[i].id}).$promise;
                                }

                                $q.all(resolvedMeans).then(function (theMeans) {
                                    var ordered;

                                    ordered = params.filter() ? $filter('filter')(theMeans, params.filter()) : theMeans;
                                    ordered = params.sorting() ? $filter('orderBy')(ordered, params.orderBy()) : theMeans;

                                    params.total(ordered.length);
                                    $defer.resolve(ordered.slice(
                                        (params.page() - 1) * params.count(),
                                        params.page() * params.count()
                                    ));
                                });
                            } else {
                                $defer.resolve([]);
                            }
                        }
                    }
                );

                $scope.allRescueMeans = [
                    {
                        'type': 'TRV',
                        'name': 'Technical rescue vehicle',
                        'icon': ''
                    },
                    {
                        'type': 'FT',
                        'name': 'Fire truck',
                        'icon': ''
                    },
                    {
                        'type': 'PV',
                        'name': 'Police vehicle',
                        'icon': ''
                    },
                    {
                        'type': 'RTH',
                        'name': 'Intensive care helicopter',
                        'icon': ''
                    },
                    {
                        'type': 'RTW',
                        'name': 'Intensive care ambulance',
                        'icon': ''
                    },
                    {
                        'type': 'NEF',
                        'name': 'Emergency doctor vehicle',
                        'icon': ''
                    },
                    {
                        'type': 'MTW',
                        'name': 'Personnel transport vehicle',
                        'icon': ''
                    },
                    {
                        'type': 'San-EL',
                        'name': 'Command vehicle ambulance services',
                        'icon': ''
                    },
                    {
                        'type': 'UG-San-EL',
                        'name': 'Supporting leading personnel',
                        'icon': ''
                    },
                    {
                        'type': 'KID',
                        'name': 'Crisis intervention service',
                        'icon': ''
                    },
                    {
                        'type': 'GW-San',
                        'name': 'Equipment truck medical service',
                        'icon': ''
                    },
                    {
                        'type': 'KdoW',
                        'name': 'Command vehicle',
                        'icon': ''
                    },
                    {
                        'type': 'KTW',
                        'name': 'Patient transport ambulance',
                        'icon': ''
                    }
                ];

                $scope.$watch('rescueMeans.length', function () {
                    $scope.tableParams.reload();
                });

                $scope.selectedOOAMeans = null;
                $scope.selectedRescueMeans = $scope.allRescueMeans[0];

                $scope.setSelected = function (means) {
                    $scope.selectedRescueMeans = means;
                };
                
                $scope.addOOAMeans = function () {
                    // TODO: impl
                    $scope.selectedOOAMeans;
                };
                
                $scope.addMeans = function () {
                    // TODO: impl
                    $scope.quantity;
                    $scope.selectedRescueMeans;
                };
            }]);
