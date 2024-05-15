sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/odata/ODataModel"
], function(Controller, MessageToast, ODataModel) {
    "use strict";

   var token;
    var username = "LABS.SHAIMAA";
    var password = "Monairy@123456789";
var sServiceUri = "https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/";
// var oModel = new sap.ui.model.odata.v2.ODataModel(sServiceUri);
    return Controller.extend("Task3.controller.View1", {
        onDisplayPress: function() {
            var referenceNumber = this.byId("refNo").getValue();

           
            // var sServiceUri = "https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/";
            var oModel = new ODataModel(sServiceUri, {
                json: true,
                 headers: {
                    "Authorization": "Basic " + btoa(username + ":" + password),
                    "SameSite": "None",
                    "Secure": true,
                    'X-CSRF-Token': 'Fetch'
                   
                }
                });
               
            // console.log(headers.get('X-CSRF-Token'));
            // this.getView().setModel(oModel, "GSHeaderSet");
 var inputValue = this.getView().byId("refNo").getValue();
var entitySetName = "GSHeaderSet";
			var entityId = inputValue; // Change this value as needed
			var url = "/" + entitySetName + "(" + entityId + ")";
            // Read data based on the reference number
            // oModel.read("/GSHeaderSet(" + referenceNumber + ")", {
             oModel.read(url, {
                success: function(oData) {
                   
                    this.byId("awl1").setValue(oData.ZX2GluFru);
                    this.byId("akher1").setValue(oData.ZX4GluFru);
                   
                }.bind(this),
                error: function() {
                    MessageToast.show("Error fetching data");
                }
            });
             var csr = fetch('https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/GSHeaderSet', {
                method: 'GET',
                headers: {
                	 "Authorization": "Basic " + btoa(username + ":" + password),
                    'X-CSRF-Token': 'Fetch'
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching CSRF token: ${response.statusText}`);
                }
                console.log(response.headers.get('X-CSRF-Token'));
                token = response.headers.get('X-CSRF-Token');
                 console.log(token);
           //     // return response.headers.get('X-CSRF-Token');
            });
        },
       
         onChangePress: function() {
            var referenceNumber = this.byId("refNo").getValue();

            var updatedData = {
                ZX2GluFru: +(this.byId("awl1").getValue()),
                ZX4GluFru: +(this.byId("akher1").getValue())
            };
              console.log(token);
               console.log(referenceNumber);
    var csr1 = fetch('https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/GSHeaderSet', {
                method: 'PUT',
                headers: {
                	 "Authorization": "Basic " + btoa(username + ":" + password),
                    'X-CSRF-Token': token,
                    'Content-Type':'application/json'
   
                }
            });
            var oModel2 = new sap.ui.model.odata.v2.ODataModel(sServiceUri);
            // var sServiceUri = "https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/";
            // var oModel = this.getView().getModel("GSHeaderSet");
            var inputValue = this.getView().byId("refNo").getValue();
var entitySetName = "GSHeaderSet";
			var entityId = inputValue; // Change this value as needed
			var url = "/" + entitySetName + "(" + entityId + ")";
			console.log(url);
			debugger;
            oModel2.update("https://dev.monairy.com/sap/opu/odata/SAP/ZGW_SC_SRV/GSHeaderSet(1)", updatedData, {
               method: "PUT",
    success: function() {
        MessageToast.show("Data updated successfully.");
    },
                error: function() {
                    MessageToast.show("Error updating data.");
                }
            });
        }
    });
});