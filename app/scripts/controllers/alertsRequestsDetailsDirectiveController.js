angular.module('eu.crismaproject.pilotE.controllers')
    .controller('eu.crismaproject.pilotE.controllers.alertsRequestsDetailsDirectiveController',
        [
            '$scope',
            'eu.crismaproject.pilotE.services.OoI',
            'DEBUG',
            function ($scope, ooi, DEBUG) {
                'use strict';

                var select2Format;

                if (DEBUG) {
                    console.log('initialising master alerts requests directive controller');
                }

                $scope.quantity = 1;

                select2Format = function (selection) {
                    try {
                        return '<span style="margin: 10px;"><img src="' + JSON.parse(selection.id).icon + '"/></span>' + selection.text;
                    } catch (e) {
                        // could not parse selection
                    }
                };

                $scope.select2Options = {
                    allowClear: false,
                    formatResult: select2Format,
                    formatSelection: select2Format
                };

                $scope.allRescueMeans = [
                    {
                        'type': 'TRV',
                        'name': 'Technical rescue vehicle',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'FT',
                        'name': 'Fire truck',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'PV',
                        'name': 'Police vehicle',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'RTH',
                        'name': 'Intensive care helicopter',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'RTW',
                        'name': 'Intensive care ambulance',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'NEF',
                        'name': 'Emergency doctor vehicle',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'MTW',
                        'name': 'Personnel transport vehicle',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'San-EL',
                        'name': 'Command vehicle ambulance services',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'UG-San-EL',
                        'name': 'Supporting leading personnel',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'KID',
                        'name': 'Crisis intervention service',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'GW-San',
                        'name': 'Equipment truck medical service',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'KdoW',
                        'name': 'Command vehicle',
                        'icon': 'img/ambulance_16.png'
                    },
                    {
                        'type': 'KTW',
                        'name': 'Patient transport ambulance',
                        'icon': 'img/ambulance_16.png'
                    }
                ];

                $scope.selectedOOAMeans = null;
                $scope.selectedRescueMeans = JSON.stringify($scope.allRescueMeans[0]);

                $scope.setSelected = function (means) {
                    $scope.selectedRescueMeans = means;
                };

                $scope.addOOAMeans = function () {
                    // TODO: impl
//                    $scope.selectedOOAMeans;
                };

                $scope.addMeans = function () {
                    var doAdd, i, means;

                    if (!$scope.selectedAlertRequest.rescueMeans) {
                        $scope.selectedAlertRequest.rescueMeans = [];
                    }

                    doAdd = true;
                    means = JSON.parse($scope.selectedRescueMeans);
                    for (i = 0; i < $scope.selectedAlertRequest.rescueMeans.length && doAdd; ++i) {
                        if ($scope.selectedAlertRequest.rescueMeans[i].type === means.type) {
                            $scope.selectedAlertRequest.rescueMeans[i].quantity += $scope.quantity;
                            doAdd = false;
                        }
                    }

                    if (doAdd) {
                        means.quantity = $scope.quantity;
                        $scope.selectedAlertRequest.rescueMeans.push(means);
                    }

                    $scope.selectedAlertRequest.abbrevRequests = ooi.getAbbreviatedRequests(
                        $scope.selectedAlertRequest
                    );
                };

                $scope.removeMeans = function (index) {
                    $scope.selectedAlertRequest.rescueMeans.splice(index, 1);
                    $scope.selectedAlertRequest.abbrevRequests = ooi.getAbbreviatedRequests(
                        $scope.selectedAlertRequest
                    );
                };
            }]);
