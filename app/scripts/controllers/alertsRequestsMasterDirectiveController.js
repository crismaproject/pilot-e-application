angular.module('eu.crismaproject.pilotE.controllers')
    .controller('eu.crismaproject.pilotE.controllers.alertsRequestsMasterDirectiveController',
        [
            '$scope',
            '$filter',
            'ngTableParams',
            'eu.crismaproject.pilotE.services.OoI',
            'DEBUG',
            function ($scope, $filter, NgTableParams, ooi, DEBUG) {
                'use strict';

                if (DEBUG) {
                    console.log('initialising master alerts requests directive controller');
                }

                $scope.tableParams = new NgTableParams(
                    {
                        page: 1,
                        count: 10,
                        sorting: { time: 'asc' }
                    },
                    {
                        total: $scope.alertsRequests ? $scope.alertsRequests.length : 0,
                        $scope: {$data: {}},
                        getData: function ($defer, params) {
                            var ordered;

                            if ($scope.alertsRequests) {
                                ordered = params.filter() ? $filter('filter')($scope.alertsRequests, params.filter()) : $scope.alertsRequests;
                                ordered = params.sorting() ? $filter('orderBy')(ordered, params.orderBy()) : $scope.alertsRequests;

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

                $scope.$watch('alertsRequests.length', function () {
                    var ar, i;
                    
                    if($scope.alertsRequests) {
                        for(i = 0; i <  $scope.alertsRequests.length; ++i) {
                            ar = $scope.alertsRequests[i];
                            if (!ar.abbrevRequests) {
                                ar.abbrevRequests = ooi.getAbbreviatedRequests(ar);
                            }
                        }
                    }
                    $scope.tableParams.reload();
                });

                $scope.selectedAlertRequest = null;

                $scope.setSelected = function (alertRequest) {
                    $scope.selectedAlertRequest = alertRequest;
                };
                
                $scope.removeAlertRequest = function (ar) {
                    var i;

                    if (ar === $scope.selectedAlertRequest) {
                        $scope.selectedAlertRequest = null;
                    }

                    for (i = 0; i < $scope.alertsRequests.length; ++i) {
                        if ($scope.alertsRequests[i] === ar) {
                            $scope.alertsRequests.splice(i, 1);
                            break;
                        }
                    }
                };
            }]);
