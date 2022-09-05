sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"
    ],
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("sap.sync.ui5test.controller.controller.App", {
            onInit: function () {
                this._createAppViewModel();
            },

            _createAppViewModel: function () {
                var oAppModel = new JSONModel({
                    currentPage : "1",
                });

                this.getView().setModel(oAppModel, "AppModel");
            },

            onNavToPage: function (sButton) {
                var sRoute = "";
                this.getView().getModel("AppModel").setProperty("/currentPage", sButton);
                if( sButton === '1') {
                    sRoute = "RouteView1"
                } else {
                    sRoute = "View" + sButton;
                }
                this.getOwnerComponent().getRouter().navTo(sRoute);
            }

        });
    }
);
