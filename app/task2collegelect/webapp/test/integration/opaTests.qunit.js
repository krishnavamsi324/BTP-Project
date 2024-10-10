sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'task2collegelect/test/integration/FirstJourney',
		'task2collegelect/test/integration/pages/lectList',
		'task2collegelect/test/integration/pages/lectObjectPage'
    ],
    function(JourneyRunner, opaJourney, lectList, lectObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('task2collegelect') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThelectList: lectList,
					onThelectObjectPage: lectObjectPage
                }
            },
            opaJourney.run
        );
    }
);