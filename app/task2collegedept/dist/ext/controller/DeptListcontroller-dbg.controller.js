sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var oUser;
	return ControllerExtension.extend('task2collegedept.ext.controller.DeptListcontroller', {
		override: {
			// onBeforeRendering: function (){
			routing: {
				onBeforeBinding: async function () {
				if(oUser !== 'krishna.vamsi@peolsolutions.com'){
					var Adaptfilter = this.base.getView().byId('task2collegedept::deptList--fe::FilterBar::dept-btnAdapt');
					Adaptfilter.setVisible(false);
					const oView = this.base.getView();
					const filterId = oView.getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;
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
						this.base.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Input") && control.getId().includes("Draft");
						}).forEach(function (oInput) {
							oInput.setEditable(false); // Set draft-related fields to read-only
						});
						// const oView = this.base.getView();
						// const filterId = oView.getContent()[0].mAggregations.content.mAggregations.content.mAssociations.filter;
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
					}
				}
			}
		}
	});
});
