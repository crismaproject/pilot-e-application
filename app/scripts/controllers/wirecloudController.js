angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'eu.crismaproject.pilotE.controllers.WirecloudController',
    [
        '$scope',
        '$modal',
        '$q',
        'eu.crismaproject.pilotE.services.OoI',
        'de.cismet.commons.angular.angularTools.AngularTools',
        'eu.crismaproject.pilotE.services.GeoTools',
        'DEBUG',
        function ($scope, $modal, $q, ooi, angularTools, geoTools, DEBUG) {
            'use strict';

            var dialog, initScope, mashupPlatform;

            if (DEBUG) {
                console.log('initialising wirecloud controller');
            }

            $scope.toggleWCEditing = function (editing) {
                MashupPlatform.wiring.pushEvent('setEditing', 'false');
            };

            initScope = function () {
                $scope.editing = false;
                $scope.worldstate = null;
                $scope.patients = null;
                $scope.selectedAlertRequest = null;
                $scope.exercise = null;
                $scope.apiurl = null;
                $scope.allTacticalAreas = [
                    {
                        'name': 'Area of danger',
                        'icon': 'img/area_of_danger_16.png'
                    },
                    {
                        'name': 'Advanced Medical Post',
                        'icon': 'img/advanced_medical_post_16.png'
                    },
                    {
                        'name': 'Treatment Area',
                        'icon': 'img/treatment_area_16.png'
                    },
                    {
                        'name': 'Staging Area',
                        'icon': 'img/staging_area_16.png'
                    },
                    {
                        'name': 'Helicopter Landing Area',
                        'icon': 'img/helicopter_landing_area_16.png'
                    },
                    {
                        'name': 'Collecting Space',
                        'icon': 'img/collecting_space_16.png'
                    },
                    {
                        'name': 'Loading Area',
                        'icon': 'img/loading_area_16.png'
                    }
                ];
            };

            initScope();

            $scope.processWorldstate = function () {
                var cats, dai, i, item, items, j, res;

                if (DEBUG) {
                    console.log('parse dataitem and fetch patients');
                }

                items = $scope.worldstate.worldstatedata;
                if (items) {
                    for (i = 0; i < items.length && !item; ++i) {
                        cats = items[i].categories;
                        if (cats) {
                            for (j = 0; j < cats.length && !item; ++j) {
                                if (cats[j].key === 'exercise_data') {
                                    item = items[i];
                                }
                            }
                        }
                    }
                }

                if (item) {
                    dai = item.datadescriptor.defaultaccessinfo;
                    res = ooi.exercises(dai);
                    $scope.apiurl = dai.substr(0, dai.indexOf('icmm_api') + 8);
                    $scope.exercise = res.get({id: item.actualaccessinfo});
                    $scope.exercise.$promise.then(function () {
                        $scope.patients = $scope.exercise.patients;
                    });
                } else {
                    initScope();
                    throw 'the worldstate has to have a proper exercise_data dataitem';
                }

            };

            $scope.addAlertRequest = function () {
                var ar;

                ar = {
                    'time': new Date().toISOString(),
                    'alert': '',
                    'rescueMeans': []
                };
                $scope.exercise.alertsRequests.push(ar);
                $scope.selectedAlertRequest = ar;
            };

            if (typeof MashupPlatform === 'undefined') {
                if (DEBUG) {
                    console.log('mashup platform not available');
                }
            } else {
                // enable minification
                mashupPlatform = MashupPlatform;

                mashupPlatform.wiring.registerCallback('setEditing', function (nuu) {

                    if (nuu && nuu.toLowerCase() === 'true' && $scope.worldstate !== null) {
                        angularTools.safeApply($scope, function () {
                            $scope.editing = true;
                        });
                    } else {
                        if ($scope.editing) {
                            // modal dialog: veto finish editing
                            dialog = $modal.open({
                                template: '<div class="modal-header"><h3>Finish Editing</h3></div><div class="modal-body">Finish editing of exercise \'' + $scope.worldstate.name + '\'?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>',
                                scope: $scope
                            });

                            dialog.result.then(function () {
                                var ar, cm, createSpatialCoverage, dataitem, getMaxTimestamp, i, j, pat;

                                // currently we have to take care of the ids ourselves
                                $q.all(
                                    [
                                        ooi.getNextId($scope.apiurl, '/CRISMA.exercises'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.capturePatients'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.preTriages'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.triages'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.consciousness'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.respirations'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.pulses'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.bloodpressures'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.positions'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.warmthpreservations'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.attendances'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.tacticalAreas'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.alertsRequests'),
                                        ooi.getNextId($scope.apiurl, '/CRISMA.rescueMeans')
                                    ]
                                ).then(function (ids) {
                                    $scope.exercise.$self = '/CRISMA.exercises/' + ids[0];
                                    $scope.exercise.id = ids[0];

                                    for (i = 0; i < $scope.exercise.patients.length; ++i) {
                                        ids[1] += i;
                                        pat = $scope.exercise.patients[i];
                                        pat.id = ids[1];
                                        pat.$self = '/CRISMA.capturePatients/' + ids[1];

                                        pat.preTriage.$self = '/CRISMA.preTriages/' + ids[2]++;
                                        pat.triage.$self = '/CRISMA.triages/' + ids[3]++;
                                        for (j = 0; j < pat.careMeasures; ++j) {
                                            cm = pat.careMeasures[j];
                                            if (cm.measure === 'Consciousness') {
                                                cm.self = '/CRISMA.consciousness/' + ids[4]++;
                                            } else if (cm.measure === 'Respiration') {
                                                cm.self = '/CRISMA.respirations/' + ids[5]++;
                                            } else if (cm.measure === 'Pulse') {
                                                cm.self = '/CRISMA.pulses/' + ids[6]++;
                                            } else if (cm.measure === 'Blood pressure') {
                                                cm.self = '/CRISMA.bloodpressures/' + ids[7]++;
                                            } else if (cm.measure === 'Position') {
                                                cm.self = '/CRISMA.positions/' + ids[8]++;
                                            } else if (cm.measure === 'Warmth preservation') {
                                                cm.self = '/CRISMA.warmthpreservations/' + ids[9]++;
                                            } else if (cm.measure === 'Attendance') {
                                                cm.self = '/CRISMA.attendances/' + ids[10]++;
                                            }
                                        }
                                    }

                                    for (i = 0; i < $scope.exercise.tacticalAreas.length; ++i) {
                                        $scope.exercise.tacticalAreas[i].$self = '/CRISMA.tacticalAreas/' + ids[11]++;
                                    }

                                    for (i = 0; i < $scope.exercise.alertsRequests.length; ++i) {
                                        ar = $scope.exercise.alertsRequests[i];
                                        ar.$self = '/CRISMA.alertsRequests/' + ids[12]++;
                                        for (j = 0; j < ar.rescueMeans.length; ++j) {
                                            ar.rescueMeans[j].$self = '/CRISMA.rescueMeans/' + ids[13]++;
                                        }
                                    }

                                    $scope.exercise.$save();

                                    // save current state and create the dataslot without self and id
                                    angularTools.safeApply($scope, function () {
                                        $scope.editing = false;
                                    });

                                    createSpatialCoverage = function (exercise) {
                                        var convexHull, ewkt, geojson, i, indexof, points;

                                        points = [];
                                        ewkt = exercise.location;
                                        indexof = ewkt.indexOf(';');
                                        // assume 4326 point
                                        geojson = Terraformer.WKT.parse(indexof > 0 ? ewkt.substr(indexof + 1) : ewkt);
                                        points[0] = new google.maps.LatLng(
                                            geojson.coordinates[0],
                                            geojson.coordinates[1]
                                        );

                                        for (i = 0; i < exercise.tacticalAreas.length; ++i) {
                                            geojson = exercise.tacticalAreas[i];
                                            points[i + 1] = new google.maps.LatLng(
                                                geojson.coordinates[0],
                                                geojson.coordinates[1]
                                            );
                                        }

                                        convexHull = geoTools.createConvexHull(points);

                                        ewkt = 'SRID=4326; POLYGON ((';
                                        for (i = 0; i < convexHull.length; ++i) {
                                            ewkt += convexHull[i].lng() + ' ' + convexHull[i].lat() + ', ';
                                        }
                                        ewkt += convexHull[0].lng() + ' ' + convexHull[0].lat() + '))';

                                        return ewkt;
                                    };

                                    getMaxTimestamp = function (exercise) {
                                        var cur, getMax, i, patient;

                                        getMax = function (date1, date2) {
                                            if (date1 > date2) {
                                                return date1;
                                            } else {
                                                return date2;
                                            }
                                        };

                                        cur = new Date(exercise.patients[0].transportation_timestamp);
                                        for (i = 0; i < exercise.patients.length; ++i) {
                                            patient = exercise.patients[i];
                                            cur = getMax(new Date(patient.transportation_timestamp), cur);
                                            cur = getMax(new Date(patient.treatment_timestamp), cur);
                                            cur = getMax(new Date(patient.preTriage.timestamp), cur);
                                            cur = getMax(new Date(patient.triage.timestamp), cur);
                                        }

                                        for (i = 0; i < exercise.tacticalAreas.length; ++i) {
                                            cur = getMax(new Date(exercise.tacticalAreas[i].time), cur);
                                        }

                                        for (i = 0; i < exercise.alertsRequests.length; ++i) {
                                            cur = getMax(new Date(exercise.alertsRequests[i].time), cur);
                                        }

                                        return cur.toISOString();
                                    };

                                    dataitem = {
                                        'name': 'Exercise Data',
                                        'description': 'Data relevant for the exercise',
                                        'lastmodified': new Date().toISOString(),
                                        'temporalcoveragefrom': $scope.exercise.incidentTime,
                                        'temporalcoverageto': getMaxTimestamp($scope.exercise),
                                        'spatialcoverage': createSpatialCoverage($scope.exercise),
                                        'datadescriptor': {
                                            '$ref': '/CRISMA.datadescriptors/2'
                                        },
                                        'actualaccessinfocontenttype': 'text/plain',
                                        'actualaccessinfo': $scope.exercise.id,
                                        'categories': [{
                                            '$ref': '/CRISMA.categories/5'
                                        }]
                                    };

                                    if (DEBUG) {
                                        console.log("created dataitem: " + JSON.stringify(dataitem));
                                    }

                                    mashupPlatform.wiring.pushEvent('getDataitem', JSON.stringify(dataitem));
                                });
                            }, function () {
                                mashupPlatform.wiring.pushEvent('isEditing', 'true');
                            });
                        }
                    }
                });

                mashupPlatform.wiring.registerCallback('setWorldstate', function (ws) {
                    $scope.ok = function () {
                        dialog.close();
                    };

                    $scope.cancel = function () {
                        dialog.dismiss();
                    };

                    if ($scope.editing) {
                        // modal dialog: discard changes
                        dialog = $modal.open({
                            template: '<div class="modal-header"><h3>Cancel Editing</h3></div><div class="modal-body">Discard current changes?</div><div class="modal-footer"><button class="btn btn-primary" ng-click="ok()">OK</button><button class="btn btn-warning" ng-click="cancel()">Cancel</button></div>',
                            scope: $scope
                        });

                        dialog.result.then(function () {
                            angularTools.safeApply($scope, function () {
                                $scope.editing = false;
                            });
                            $scope.worldstate = JSON.parse(ws);
                            $scope.processWorldstate();
                            mashupPlatform.wiring.pushEvent('isEditing', 'false');
                        }, function () {
                            mashupPlatform.wiring.pushEvent('isEditing', 'true');
                        });
                    } else {
                        $scope.worldstate = JSON.parse(ws);
                        $scope.processWorldstate();
                    }
                });
            }
        }
    ]
);