sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('task2collegedept.ext.controller.DeptObjectcontroller', {
		override: {
            routing: {
            onBeforeBinding: async function () {
                console.log('Entered');
                debugger; 
                if (sap.ushell && sap.ushell.Container) {
                    var oUserInfoService = sap.ushell.Container.getService("UserInfo");
                    var oUserEmail = oUserInfoService.getEmail();
                    console.log(oUserEmail);
                var oModel = this.base.getExtensionAPI().getModel();
        
                if (!oModel) {
                    console.error('Model is not available.');
                    return;
                }
                var sServiceUrl;
                if (typeof oModel.getServiceUrl === "function") {
                    sServiceUrl = oModel.getServiceUrl(); 
                    console.log('Service URL:', sServiceUrl);
                } 
                else {
                    console.error('Unable to determine the service URL.');
                    return;
                }
        
                try {
                    const response1 = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            // url: sServiceUrl + "/access",
                            url: sServiceUrl +  "access?$filter=userEmail eq '" + encodeURIComponent(oUserEmail) + "'",
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(new Error(textStatus + ': ' + errorThrown));
                            }
                        });
                    });
                    const aaccess = response1.value;
                    const response = await new Promise((resolve, reject) => {
                        jQuery.ajax({
                            url: sServiceUrl + "/dept?$filter=deptId eq '" + encodeURIComponent(aaccess[0].user) + "'",
                            method: "GET",
                            dataType: "json",
                            success: function (data) {
                                resolve(data);
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                reject(new Error(textStatus + ': ' + errorThrown));
                            }
                        });
                        
                    });
                    console.log('Department data:', response);
                    console.log('Access data:', response1);

                    const aDepartments = response.value;
                    // const aaccess = response1.value;
                    debugger
                    // if (aaccess && aaccess.length == 1) {
                    //     if(aaccess[0].userEmail === oUserEmail){
                    //         var depuserid = aaccess[0].user;
                    // }
                // }
                const depuserid = aDepartments[0].deptId;
            debugger
            const sUrl = window.location.href;
            console.log("Current URL:", sUrl);
            const urlObj = new URL(sUrl);
            const hashSegment = urlObj.hash.substring(1); 
            const match = /\/dept\(deptId='([^']*)'/.exec(hashSegment);
            const depId = match ? match[1] : null;
            debugger
            if(depId !== depuserid){
                this.getView().findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Button");
                }).forEach(function (oButton) {
                    if (oButton.getId().includes("Delete")) {
                        oButton.setVisible(false);
                    }
                    else if (oButton.getId().includes("Edit")){
                        // oButton.setEnabled(false);
                        oButton.setVisible(false);
                    }
                });
            }
            else if (depId == depuserid){
                this.getView().findAggregatedObjects(true, function (control) {
                    return control.isA("sap.m.Button");
                }).forEach(function (oButton) {
                    if (oButton.getId().includes("Delete")) {
                        oButton.setVisible(false);
                    }
                    else if (oButton.getId().includes("Edit")){
                        oButton.setVisible(true);
                        // oButton.setEnabled(true);
                    }
                });
            }
                } 
                catch (error) {
                    console.error('Error fetching data', error);
                }
            }
            else {
                console.log("UserInfo service not available.");
            }

            
            }
        },
			onInit: function () {
				var oModel = this.base.getExtensionAPI().getModel();
            }
		}
	});
});