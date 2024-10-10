sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'task2collegedept/test/integration/FirstJourney',
		'task2collegedept/test/integration/pages/deptList',
		'task2collegedept/test/integration/pages/deptObjectPage'
    ],
    function(JourneyRunner, opaJourney, deptList, deptObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('task2collegedept') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThedeptList: deptList,
					onThedeptObjectPage: deptObjectPage
                }
            },
            opaJourney.run
        );
    }
);