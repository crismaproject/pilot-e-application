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
                        total: $scope.alertsRequests ? $scope.alertsRequests.length : 0,
                        $scope: {$data: {}},
                        getData: function ($defer, params) {
                            var resolvedAlertsRequests, i;

                            // we have to load every rescue means to ensure proper paging/sorting
                            resolvedAlertsRequests = [];

                            if ($scope.alertsRequests) {
                                for (i = 0; i < $scope.alertsRequests.length; ++i) {
                                    resolvedAlertsRequests[i] = ooi.getAlertsRequests().get(
                                        {alertsRequestsId: $scope.alertsRequests[i].id}
                                    ).$promise;
                                }

                                $q.all(resolvedAlertsRequests).then(function (theAlertsRequests) {
                                    var ordered;

                                    ordered = params.filter() ? $filter('filter')(theAlertsRequests, params.filter()) : theAlertsRequests;
                                    ordered = params.sorting() ? $filter('orderBy')(ordered, params.orderBy()) : theAlertsRequests;

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

                $scope.$watch('alertsRequests.length', function () {
                    $scope.tableParams.reload();
                });

                $scope.selectedAlertRequest = null;

                $scope.setSelected = function (alertRequest) {
                    $scope.selectedAlertRequest = alertRequest;
                };
            }]);
