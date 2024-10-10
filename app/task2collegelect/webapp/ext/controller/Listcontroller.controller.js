sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var oUser;
	return ControllerExtension.extend('task2collegelect.ext.controller.Listcontroller', {
		override: {
			routing: {
				onBeforeBinding: async function () {
					var oTable = this.getView().findAggregatedObjects(true, function (control) {
                        return control.isA("sap.ui.table.Table") || control.isA("sap.m.Table");
                    });
                    debugger
					if (oTable.length > 0){
	                    var headerToolbar1 = oTable[1].getHeaderToolbar();
    	                var headerToolbar2 = oTable[2].getHeaderToolbar();
        	            headerToolbar1.setVisible(false);
            	        headerToolbar2.setVisible(false);
					}
					if(oUser !== 'krishna.vamsi@peolsolutions.com'){
						var Adaptfilter = this.base.getView().byId('task2collegelect::collegeList--fe::FilterBar::college-btnAdapt');
						Adaptfilter.setVisible(false);
						const oView = this.base.getView();
						const filterId = oView.getContent()[0].mAggregations.content.mAssociations.filterControl;
						const filterBar = sap.ui.getCore().byId(filterId);
		
						var oTable = this.getView().findAggregatedObjects(true, function (control) {
								return control.isA("sap.ui.table.Table") || control.isA("sap.m.Table");
							})[0];
							debugger
							var oBinding = oTable.getBinding("items");
		
							if (oBinding) {
								var oFilter = new Filter({
									path: "IsActiveEntity",
									operator: FilterOperator.EQ,
									value1: true
								});
		
							oBinding.filter([oFilter]);
							}
							var oFilterBar = sap.ui.getCore().byId(filterId);
		
							var oFilterConditions = {
								"$editState": [ 
									{
										"operator": "DRAFT_EDIT_STATE",
										"values": [
											"ALL_HIDING_DRAFTS",
											"All (Hiding Drafts)"
										],
										"validated": "Validated"
									}
								]
							};
							oFilterBar.setFilterConditions(oFilterConditions);
					}
				}
			},

			onInit: async function () {
				debugger
				var oModel = this.base.getExtensionAPI().getModel();
				if (sap.ushell && sap.ushell.Container) {
					oUser = new sap.ushell.services.UserInfo().getEmail();	 
					console.log(oUser);
					debugger
					const sCurrentUrl = window.location.origin;
					console.log("Path URL:", sCurrentUrl);
				// 	var oModel = this.base.getExtensionAPI().getModel();
				// 	if (!oModel) {
				// 		console.error('Model is not available.');
				// 		return;
				// 	}
				// 	var sServiceUrl;
                // if (typeof oModel.getServiceUrl === "function") {
                //     sServiceUrl = oModel.getServiceUrl(); 
                //     console.log('Service URL:', sServiceUrl);
                // } 
                // else {
                //     console.error('Unable to determine the service URL.');
                //     return;
                // }
				// 	try{
				// 	const response1 = await new Promise((resolve, reject) => {
                //         jQuery.ajax({
                //             // url: sServiceUrl + "/access",
                //             url: sServiceUrl +  "access?$filter=userEmail eq '" + encodeURIComponent(oUser) + "'",
                //             method: "GET",
                //             dataType: "json",
                //             success: function (data) {
                //                 resolve(data);
                //             },
                //             error: function (jqXHR, textStatus, errorThrown) {
                //                 reject(new Error(textStatus + ': ' + errorThrown));
                //             }
                //         });
                //     });
				// }
				// catch (error) {
                //     console.error('Error fetching data', error);
                // }
				// 	const aaccess = response1.value;
				// 	if (aaccess[0].user !== 'admin') {
					if(oUser !== 'krishna.vamsi@peolsolutions.com'){
						this.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Button");
						}).forEach(function (oButton) {
							if (oButton.getId().includes("Create") || oButton.getId().includes("Delete")) {
								oButton.setVisible(false);
							}
							else if (oButton.getId().includes("Adapt Filters (1)")){
								oButton.setEnabled(false);
								// oButton.setVisible(false);
							}
						});
						// const oView = this.base.getView();
						// const filterId = oView.getContent()[0].mAggregations.content.mAssociations.filterControl;
						// var oFilterBar = sap.ui.getCore().byId(filterId);
						// var oFilterConditions = {
						// 	"$editState": [ 
						// 		{
						// 			"operator": "DRAFT_EDIT_STATE",
						// 			"values": [
						// 				"ALL_HIDING_DRAFTS",
						// 				"All (Hiding Drafts)"
						// 			],
						// 			"validated": "Validated"
						// 		}
						// 	]
						// };
						// oFilterBar.setFilterConditions(oFilterConditions);
						this.base.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Input") && control.getId().includes("Draft");
						}).forEach(function (oInput) {
							oInput.setEditable(false); 
						});
					}
				}
			}
		}
	});
});
