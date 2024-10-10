// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         onPress: function(oEvent) {
//             MessageToast.show("Custom handler invoked.");
//         }
//     };
// });
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
],
	function (
		Controller,
		MessageToast, 
		HashChanger
	) {
		"use strict";
		var entityurl;
            return {
				onInit: function () {
					// Initialize the controller
					
				},

				onAfterItemAdded: function (oEvent) {
					debugger
					var baseUrl = oEvent.oSource.getModel().getServiceUrl();
					var item = oEvent.getParameter("item");
					var par_id = window.location.href;
					var regex = /college\([^)]*\)/;
					const match = par_id.match(regex);
					if (match) {
						entityurl = match[0];
						console.log(entityurl);
					} else {
						console.log("Number not found in URL");
					}
		
					var item = oEvent.getParameter("item");
					// this._createEntity(item)
					var data = {
						mediaType: item.getMediaType(),
						fileName: item.getFileName(),
						size: item.getFileObject().size
					};
		
					var settings = {
						url: baseUrl+entityurl+'/coltofile',
						//url : `/odata/v4/my/College(lectId='${extractedNumber}',IsActiveEntity=false)/clgToFile`,
						method: "POST",
						headers: {
							"Content-type": "application/json"
						},
						data: JSON.stringify(data)
					}
		
				return new Promise((resolve, reject) => {
					$.ajax(settings)
						.done((results, textStatus, request) => {
							resolve(results.ID);
						})
						.fail((err) => {
							reject(err);
						})
				})				
					.then((id) => {
						// this._uploadContent(item, id);
						debugger
						// var url = `/odata/v4/my/Files(ID=${id},IsActiveEntity=false)/content`;
						var url = baseUrl + `Files(ID=${id},IsActiveEntity=false)/content`
						item.setUploadUrl(url);	
						var oUploadSet = this.byId("uploadSet");
						oUploadSet.setHttpRequestMethod("PUT");
						oUploadSet.uploadItem(item);
					})
					.catch((err) => {
						console.log(err);
					})
				},
		
				onUploadCompleted: function (oEvent) {
					debugger
					var oUploadSet = this.byId("uploadSet");
					oUploadSet.removeAllIncompleteItems();
					oUploadSet.getBinding("items");
					var binding = oEvent.oSource.mBindingInfos.items.binding.oContext;
					binding.refresh();
					
				},
		
				onOpenPressed: async function (oEvent) {
					debugger
					var baseUrl = oEvent.oSource.getModel().getServiceUrl();
					var currentUrl =oEvent.oSource.mProperties.url;
					let fileurl;
					if (!currentUrl.startsWith(baseUrl)) {
            			fileurl = baseUrl + oEvent.oSource.mProperties.url;
            		}
					else{
						fileurl = oEvent.oSource.mProperties.url;
					}
					const sUrl = window.location.href;
					console.log("Current URL:", sUrl);
					const urlObj = new URL(sUrl);
					const hashSegment = urlObj.hash.substring(1); 
					const match = /college\(lectId='([^']*)',IsActiveEntity=(true|false)\)/.exec(hashSegment);
					const isActiveEntity = match ? (match[2] === 'true') : null;
					//
					var baseUrl = oEvent.oSource.getModel().getServiceUrl();
					// fileurl = baseUrl+oEvent.oSource.mProperties.url;
					if( isActiveEntity === false){
						debugger
						oEvent.oSource.mProperties.url = fileurl.replace("true", "false")
					}
					else{
						oEvent.oSource.mProperties.url = fileurl;
					}
				},
		
				onAfterItemRemoved: function (oEvent) {
					debugger
					var baseUrl = oEvent.oSource.getModel().getServiceUrl();
					var oItem = oEvent.getParameter("item"); 
					var sFileId = oItem.getBindingContext().getProperty("ID"); 
					// var sUrl = `/odata/v4/my/Files(ID=${sFileId},IsActiveEntity=false)`;
					var sUrl = baseUrl+`Files(ID=${sFileId},IsActiveEntity=false)`;
					
					// Make an AJAX request to delete the file from the database
					$.ajax({
						url: sUrl,
						method: "DELETE",
						success: function () {
							sap.m.MessageToast.show("File deleted successfully");
						}.bind(this),
						error: function (err) {
							sap.m.MessageToast.show("Error deleting file");
							console.log("Error deleting file:", err);
						}
					});
				},		
		
				onFileRenamed: function (oEvent) {
					debugger
					var baseUrl = oEvent.oSource.getModel().getServiceUrl();
					var oItem = oEvent.getParameter("item"); 
					var sFileId = oItem.getBindingContext().getProperty("ID"); 
		
					var sUrl = baseUrl+`Files(ID=${sFileId},IsActiveEntity=false)`;
					var oData = {
						fileName: sNewFileName
					};
				
					$.ajax({
						url: sUrl,
						method: "PATCH",
						contentType: "application/json",
						data: JSON.stringify(oData),
						success: function () {
							sap.m.MessageToast.show("File name updated successfully");
						},
						error: function (err) {
							sap.m.MessageToast.show("Error updating file name");
							console.log("Error updating file name:", err);
						}
					});
				}

		};
	});