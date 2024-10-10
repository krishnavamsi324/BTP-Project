sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var oUser;
	return ControllerExtension.extend('task2collegelect.ext.controller.LecObjectcontroller', {
		override: {
			routing: {
				onAfterBinding: async function () {
					debugger 
					setTimeout(function() {
						this.base.getView().findAggregatedObjects(true, function (control) {
							return control.isA("sap.m.Button");
						}).forEach(function (oButton) {
							if (oButton.getText().includes("Create")) {
								oButton.setText("Send for Approval");
							}
						});
					}.bind(this), 500);  
				},
				onBeforeBinding: async function () {
					debugger
					var oModel = this.base.getExtensionAPI().getModel();
					if (!oModel) {
						console.error('Model is not available.');
						return;
					}
					
					debugger
					var oUploadSet = this.base.getView().byId("task2collegelect::collegeObjectPage--fe::CustomSubSection::Attachments--uploadSet");
					const sUrl = window.location.href;
					console.log("Current URL:", sUrl);
					const urlObj = new URL(sUrl);
					const hashSegment = urlObj.hash.substring(1); 
					const match = /college\(lectId='([^']*)',IsActiveEntity=(true|false)\)/.exec(hashSegment);
					const lectId = match ? match[1] : null;
					const isActiveEntity = match ? (match[2] === 'true') : null;
					if (isActiveEntity === true) {
						oUploadSet.setUploadButtonInvisible(true);
						oUploadSet.setUploadEnabled(false);
						oUploadSet.mBindingInfos.items.template.setEnabledRemove(false);
						oUploadSet.mBindingInfos.items.template.setVisibleRemove(false);
						oUploadSet.mBindingInfos.items.template.setEnabledEdit(false);
						oUploadSet.mBindingInfos.items.template.setVisibleEdit(false);
					}
					else if (isActiveEntity === false){
						oUploadSet.setUploadButtonInvisible(false);
						oUploadSet.setUploadEnabled(true);
						oUploadSet.mBindingInfos.items.template.setEnabledRemove(true);
						oUploadSet.mBindingInfos.items.template.setVisibleRemove(true);
						oUploadSet.mBindingInfos.items.template.setEnabledEdit(true);
						oUploadSet.mBindingInfos.items.template.setVisibleEdit(true);
					}
					setTimeout(async function() {
					if (lectId && isActiveEntity === true) {
						oUploadSet.setUploadButtonInvisible(true);
						oUploadSet.setUploadEnabled(false);
						oUploadSet.mBindingInfos.items.template.setEnabledRemove(false);
						oUploadSet.mBindingInfos.items.template.setVisibleRemove(false);
						oUploadSet.mBindingInfos.items.template.setEnabledEdit(false);
						oUploadSet.mBindingInfos.items.template.setVisibleEdit(false);

						let funcname = 'postattach';
						let oFunction = this.getView().getModel().bindContext(`/${funcname}(...)`);
						console.log();
						oFunction.setParameter('p', lectId);
						await oFunction.execute();
						const oContext = oFunction.getBoundContext();
						var result = oContext.getValue();
						console.log(result.value.status);
						if (result.value.status == 'Approved' && oUser === 'krishna.vamsi@peolsolutions.com'){
							this.getView().findAggregatedObjects(true, function (control) {
								return control.isA("sap.m.Button");
							}).forEach(function (oButton) {
								if (oButton.getId().includes("Delete")) {
									oButton.setVisible(true);
								}
								else if (oButton.getId().includes("Edit")){
									oButton.setEnabled(true);
								}
							});
						}
						// else if(result.value.status === 'In Process' || result.value.status === 'Rejected'){
						else{
							this.getView().findAggregatedObjects(true, function (control) {
								return control.isA("sap.m.Button");
							}).forEach(function (oButton) {
								if (oButton.getId().includes("Delete")) {
									oButton.setEnabled(false);
									oButton.setVisible(false);
								}
								else if (oButton.getId().includes("Edit")){
									oButton.setEnabled(false);
									oButton.setVisible(false);
								}
							});
						}
					}
				}.bind(this), 500); 
				}
			},
			onInit: async function () {
				var oModel = this.base.getExtensionAPI().getModel();
				debugger
				if (sap.ushell && sap.ushell.Container) {
					oUser = new sap.ushell.services.UserInfo().getEmail();	 
					console.log(oUser);
					debugger
					if(oUser !== 'krishna.vamsi@peolsolutions.com'){
                	    this.getView().findAggregatedObjects(true, function (control) {
                    	    return control.isA("sap.m.Button");
        	            }).forEach(function (oButton) {
                        if (oButton.getId().includes("Delete")) {
                            oButton.setVisible(false);
                        }
						else if (oButton.getId().includes("Edit")){
							oButton.setEnabled(false);
                            // oButton.setVisible(false);
						}
                    });
				}
			}
		}
		}
	});
});
