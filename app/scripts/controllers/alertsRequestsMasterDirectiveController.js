angular.module('eu.crismaproject.pilotE.controllers')
    .controller('eu.crismaproject.pilotE.controllers.alertsRequestsMasterDirectiveController',
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

                $scope.$watch('rescueMeans.length', function () {
                    $scope.tableParams.reload();
                });

                $scope.selectedRescueMeans = null;

                $scope.setSelected = function (means) {
                    $scope.selectedRescueMeans = means;
                };
            }]);
