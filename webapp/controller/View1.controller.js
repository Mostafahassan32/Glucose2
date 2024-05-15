sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("Task.controller.View1", {
		onInit: function() {
  var oModel = new sap.ui.model.odata.v2.ODataModel("https://services.odata.org/V4/Northwind/Northwind.svc/");
 this.getView().setModel(oModel, "employee");
 //sap.ui.getcore().setModel(oModel, "employee");
 




    
    
		
		}
	});
});