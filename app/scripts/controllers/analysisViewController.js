angular.module(
    'eu.crismaproject.pilotE.controllers'
).controller(
    'analysisViewController', 
    [
        'DEBUG',
        function(DEBUG) {
            'use strict';

            if (DEBUG) {
                console.log('initialising analysis view controller');
            }
      
        }
    ]
);