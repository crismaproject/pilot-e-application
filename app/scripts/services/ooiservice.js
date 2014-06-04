/* Services */
angular.module(
    'eu.crismaproject.pilotE.services'
).factory(
    'eu.crismaproject.pilotE.services.OoI',
    [
        '$q',
        '$resource',
        '$timeout',
        function ($q, $resource, $timeout) {
            'use strict';

            var exercises,
                getNextId,
                getMaxCareMeasures,
                getClassifications,
                getRatedMeasuresCount,
                getAbbreviatedRequests,
                getQueue,
                queueMap;

            exercises = function (api) {
                return $resource(
                    api,
                    {
                        id: '@id'
                    },
                    {
                        'get': {
                            method: 'GET',
                            params: {
                                deduplicate: true
                            },
                            cache: true,
                            transformResponse: function (data) {
                                var ar, exercise, i, patient;

                                exercise = JSON.parse(data);
                                // we augment serveral objects with virtual properties
                                for (i = 0; i < exercise.patients.length; ++i) {
                                    patient = exercise.patients[i];
                                    patient.ratedMeasuresCount = getRatedMeasuresCount(patient);
                                }

                                for (i = 0; i < exercise.alertsRequests.length; ++i) {
                                    ar = exercise.alertsRequests[i];
                                    ar.abbrevRequests = getAbbreviatedRequests(ar);
                                }

                                return exercise;
                            }
                        },
                        'save': {
                            method: 'PUT',
                            cache: true,
                            transformRequest: function (data) {
                                // we remove the virtual properties from the objects again
                                return JSON.stringify(data, function (k, v) {
                                    if (k === 'ratedMeasuresCount' || k === 'abbrevRequests') {
                                        return undefined;
                                    }

                                    // we have to take care of angular properties by ourselves
                                    if (k.substring(0, 1) === '$' && !(k === '$self' || k === '$ref')) {
                                        return undefined;
                                    }

                                    return v;
                                });
                            },
                            transformResponse: function (data) {
                                var ar, exercise, i, patient;

                                exercise = JSON.parse(data);
                                // we augment serveral objects with virtual properties
                                for (i = 0; i < exercise.patients.length; ++i) {
                                    patient = exercise.patients[i];
                                    patient.ratedMeasuresCount = getRatedMeasuresCount(patient);
                                }

                                for (i = 0; i < exercise.alertsRequests.length; ++i) {
                                    ar = exercise.alertsRequests[i];
                                    ar.abbrevRequests = getAbbreviatedRequests(ar);
                                }

                                return exercise;
                            }
                        },
                        'query':  {
                            method: 'GET',
                            isArray: true,
                            transformResponse: function (data) {
                                // we strip the ids of the objects only
                                var col, res, i;

                                col = JSON.parse(data).$collection;
                                res = [];

                                for (i = 0; i < col.length; ++i) {
                                    res.push({'id': parseInt(col[i].$ref.substr(col[i].$ref.lastIndexOf('/') + 1), 10)});
                                }

                                return res;
                            }
                        }
                    }
                );
            };

            getNextId = function (apiurl, classkey) {
                var def, Resource, objects;
                def = $q.defer();
                Resource = $resource(apiurl + classkey, {limit: '999999999'},
                    {
                        'query': {method: 'GET', isArray: true, transformResponse: function (data) {
                            // we strip the ids of the objects only
                            var col, res, i;

                            col = JSON.parse(data).$collection;
                            res = [];

                            for (i = 0; i < col.length; ++i) {
                                res.push(col[i]);
                            }

                            return res;
                        }}
                    });
                objects = Resource.query();
                objects.$promise.then(function (data) {
                    var i, id, maxId;

                    maxId = 0;

                    for (i = 0; i < data.length; ++i) {
                        id = parseInt(data[i].$ref.substr(data[i].$ref.lastIndexOf('/') + 1), 10);
                        if (id > maxId) {
                            maxId = id;
                        }
                    }
                    def.resolve(maxId + 1);
                });

                return def.promise;
            };

            getMaxCareMeasures = function (patient) {
                if (patient && patient.correctTriage === 'T3') {
                    return 6;
                } else {
                    return 7;
                }
            };

            getClassifications = function () {
                return [
                    'T1', 'T2', 'T3'
                ];
            };

            getRatedMeasuresCount = function (patient) {
                var i, count;

                count = 0;
                for (i = 0; i < patient.careMeasures.length; ++i) {
                    if (patient.careMeasures[i].value) {
                        count++;
                    }
                }

                return count;
            };

            getAbbreviatedRequests = function (alertRequest) {
                var i, s;

                if (alertRequest &&
                        alertRequest.rescueMeans &&
                        alertRequest.rescueMeans.length > 0) {
                    s = '';
                    for (i = 0; i < alertRequest.rescueMeans.length; ++i) {
                        s += alertRequest.rescueMeans[i].type + ' x ' +
                            alertRequest.rescueMeans[i].quantity + ', ';
                    }

                    return s.substr(0, s.length - 2);
                } else {
                    return '';
                }
            };

            queueMap = {};

            getQueue = function (queueName) {
                var queue, clear, currentPromise;

                if (!queueName) {
                    throw 'IllegalArgumentException: queueName empty';
                }

                currentPromise = queueMap[queueName];

                queue = function (fn, timeout) {
                    clear();

                    currentPromise = $timeout(fn, timeout);
                    queueMap[queueName] = currentPromise;
                    currentPromise.then(function () {
                        queueMap[queueName] = undefined;
                    });
                };

                clear = function () {
                    if (currentPromise) {
                        $timeout.cancel(currentPromise);
                    }
                };

                return {
                    queue : queue,
                    clear : clear
                };
            };

            return {
                exercises: exercises,
                getNextId: getNextId,
                getMaxCareMeasures : getMaxCareMeasures,
                getClassifications : getClassifications,
                getRatedMeasuresCount : getRatedMeasuresCount,
                getAbbreviatedRequests : getAbbreviatedRequests,
                getQueue : getQueue
            };
        }
    ]
);
