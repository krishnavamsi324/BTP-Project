sap.ui.define([
    "sap/m/MessageToast"
], function(MessageToast) {
    'use strict';

    return {
        SendApproval: function(oEvent) {
            MessageToast.show("Custom handler invoked.");
        }
    };
});
