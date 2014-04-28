angular.module('eu.crismaproject.pilotE.controllers')
        .controller('cws', [
            '$resource',
            function (r) {
                'use strict';
                
                var ex = {
                    '$self': '/CRISMA.exercises/1',
                    'id': 1,
                    'incidentTime': '2010-11-20T10:05:00.000Z',
                    'location': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                    'alertsRequests': [
                        
                    ],
                    'tacticalAreas': [
                        
                    ],
                    'patients': [
                        {
                            '$ref': '/CRISMA.capturePatients/1'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/2'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/3'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/4'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/5'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/6'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/7'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/8'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/9'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/10'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/11'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/12'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/13'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/14'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/15'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/16'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/17'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/18'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/19'
                        },
                        {
                            '$ref': '/CRISMA.capturePatients/20'
                        }
                    ]
                };
                
                var ws = {
                    '$self': '/CRISMA.worldstates/1',
                    'id': 1,
                    'name': 'Ski-Weltmeisterschaften Garmisch-Partenkirchen 1',
                    'description': 'Im Februar 2011 finden in Garmisch-Partenkirchen die Ski-Weltmeisterschaften statt. An den Veranstaltungsstätten Gudiberg und Kandahar stehen Tribünen mit einem Fassungsvermögen von bis zu 6.000 Zuschauern. Die Einsatzkräfte des BRK Garmisch-Partenkirchen werden bei einen Großschadensereignis im Rahmen der Ski-WM primär zum Einsatz kommen.',
                    'categories': [
                        {
                            '$self': '/CRISMA.categories/1',
                            'id': 1,
                            'key': 'Exercise',
                            'classification': {
                                '$self': '/CRISMA.classifications/1',
                                'id': 1,
                                'key': 'CAPTURE'
                            }
                        }
                    ],
                    'creator': 'mscholl',
                    'created': new Date().toISOString(),
                    'origintransition': null, // TODO: maybe do initial transition
                    'worldstatedata': [
                        {
                            '$self': '/CRISMA.dataitems/1',
                            'id': 1,
                            'name': 'Exercise Data',
                            'description': 'Data relevant for the exercise',
                            'lastmodified': new Date().toISOString(),
                            'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                            'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                            'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                            'datadescriptor': {
                                '$self': '/CRISMA.datadescriptors/2',
                                'id': 2,
                                'name': 'exercise_slot',
                                'description': 'Dataslot for exercise data',
                                'categories': [
                                    {
                                        '$self': '/CRISMA.categories/4',
                                        'id': 4,
                                        'key': 'capture_data',
                                        'classification': {
                                            '$self': '/CRISMA.classifications/1',
                                            'id': 1,
                                            'key': 'CAPTURE'
                                        }
                                    }
                                ],
                                'defaultaccessinfocontenttype': 'application/x-www-form-urlencoded',
                                'defaultaccessinfo': 'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:id?deduplicate=true'
                            },
                            'actualaccessinfocontenttype': 'text/plain',
                            'actualaccessinfo': '1',
                            'categories': [
                                {
                                    '$self': '/CRISMA.categories/5',
                                    'id': 5,
                                    'key': 'exercise_data',
                                    'classification': {
                                        '$self': '/CRISMA.classifications/1',
                                        'id': 1,
                                        'key': 'CAPTURE'
                                    }
                                }
                            ]
                        }
                    ],
                    'iccdata': [
                        {
                            '$self': '/CRISMA.dataitems/2',
                            'id': 2,
                            'name': 'Indicators',
                            'description': 'Indicator data',
                            'lastmodified': new Date().toISOString(),
                            'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                            'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                            'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                            'datadescriptor': {
                                '$self': '/CRISMA.datadescriptors/1',
                                'id': 1,
                                'name': 'icc_slot',
                                'description': 'Dataslot for icc data',
                                'categories': [
                                    {
                                        '$self': '/CRISMA.categories/3',
                                        'id': 3,
                                        'key': 'ICC_DATA',
                                        'classification': {
                                            '$self': '/CRISMA.classifications/2',
                                            'id': 2,
                                            'key': 'ICC_DATA'
                                        }
                                    }
                                ],
                                'defaultaccessinfocontenttype': 'application/json',
                                'defaultaccessinfo': null
                            },
                            'actualaccessinfocontenttype': 'application/json',
                            'actualaccessinfo': '{"tobe":"done"}', // TODO: icc data
                            'categories': [
                                {
                                    '$self': '/CRISMA.categories/2',
                                    'id': 2,
                                    'key': 'Indicators',
                                    'classification': {
                                        '$self': '/CRISMA.classifications/2',
                                        'id': 2,
                                        'key': 'ICC_DATA'
                                    }
                                }
                            ]
                        },
                        {
                            '$self': '/CRISMA.dataitems/3',
                            'id': 3,
                            'name': 'Criteria',
                            'description': 'Criteria data',
                            'lastmodified': new Date().toISOString(),
                            'temporalcoveragefrom': '2010-11-20T10:05:00.000Z',
                            'temporalcoverageto': '2010-11-20T11:55:00.000Z',
                            'spatialcoverage': 'SRID=4326;POINT (47.493611111111 11.100833333333)',
                            'datadescriptor': {
                                '$self': '/CRISMA.datadescriptors/1',
                                'id': 1,
                                'name': 'icc_slot',
                                'description': 'Dataslot for icc data',
                                'categories': [
                                    {
                                        '$self': '/CRISMA.categories/3',
                                        'id': 3,
                                        'key': 'ICC_DATA',
                                        'classification': {
                                            '$self': '/CRISMA.classifications/2',
                                            'id': 2,
                                            'key': 'ICC_DATA'
                                        }
                                    }
                                ],
                                'defaultaccessinfocontenttype': 'application/json',
                                'defaultaccessinfo': null
                            },
                            'actualaccessinfocontenttype': 'application/json',
                            'actualaccessinfo': '{"tobe":"done"}', // TODO: icc data
                            'categories': [
                                {
                                    '$self': '/CRISMA.categories/6',
                                    'id': 6,
                                    'key': 'Criteria',
                                    'classification': {
                                        '$self': '/CRISMA.classifications/2',
                                        'id': 2,
                                        'key': 'ICC_DATA'
                                    }
                                }
                            ]
                        }
                    ],
                    'childworldstates': []
                };
                var res = r(
                    'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.worldstates/:wsId', 
                    {wsId: '@id'},
                    {
                        get: {method:'GET', params: {deduplicate: true}},
                        save: {method:'PUT', transformRequest: function (data) {
                            return JSON.stringify(data, function (k, v) {
                                // angular strips $ vars by default
                                if (k.substring(0, 1) === '$' && !(k === '$self' || k === '$ref')) {
                                    return undefined;
                                }

                                return v;
                            });
                        }},
                        query: {method:'GET', isArray:true, transformResponse: function(data) {
                                // we strip the ids of the objects only
                                var col, res, i;

                                col = JSON.parse(data).$collection;
                                res = [];

                                for (i = 0; i < col.length; ++i) {
                                    res.push(col[i]);
                                }

                                return res;
                        }}
                    }
                            );
                    
                var exer = r(
                    'http://crisma.cismet.de/pilotE/ait/icmm_api/CRISMA.exercises/:wsId', 
                    {wsId: '@id'},
                    {
                        get: {method:'GET', params: {deduplicate: true}},
                        save: {method:'PUT', transformRequest: function (data) {
                            return JSON.stringify(data, function (k, v) {
                                // angular strips $ vars by default
                                if (k.substring(0, 1) === '$' && !(k === '$self' || k === '$ref')) {
                                    return undefined;
                                }

                                return v;
                            });
                        }},
                        query: {method:'GET', isArray:true, transformResponse: function(data) {
                                // we strip the ids of the objects only
                                var col, res, i;

                                col = JSON.parse(data).$collection;
                                res = [];

                                for (i = 0; i < col.length; ++i) {
                                    res.push(col[i]);
                                }

                                return res;
                        }}
                    }
                            );
                
                res.save(ws);
                exer.save(ex);
            }
        ]);