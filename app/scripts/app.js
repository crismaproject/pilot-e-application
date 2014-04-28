angular.module(
    'eu.crismaproject.pilotE',
    [
        'eu.crismaproject.pilotE.controllers',
        'eu.crismaproject.pilotE.directives',
        'ngRoute',
        'ngAnimate'
    ]
).config(['$routeProvider', function ($routeProvider) {
    'use strict';

    $routeProvider
        .when('/exercise', {
            redirectTo: '/exercise/debriefing'
        })
        .when('/exercise/capture', {
            templateUrl: 'views/exerciseCapture.html',
            controller: 'exerciseCaptureViewController'
        })
        .when('/exercise/debriefing', {
            templateUrl: 'views/exerciseDebriefing.html',
            controller: 'exerciseDebriefingViewController'
        })
        .when('/analysis', {
            templateUrl: 'views/analysis.html',
            controller: 'analysisViewController'
        })
//        .when('/createWs', {
//            templateUrl: 'views/analysis.html',
//            controller: 'cws'
//        })
        .otherwise({
            redirectTo: '/exercise/debriefing'
        });
}]);
