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
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'captureViewController'
        })
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
        .otherwise({
            redirectTo: '/exercise/debriefing'
        });
}]);
