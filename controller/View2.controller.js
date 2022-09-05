sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View2", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                this.getOwnerComponent().getRouter().getRoute("View2").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "2");
            },

            onChangeText: function() {
                /**
                 * string.prototype.splice 등 의 string 프로토타입 메소드를 사용하여 이름의 맨 앞자리 글자만 추출 후 ** 두개만 붙여주기
                 * 이름이 [박아무개] 같이 3자리의 이름을 입력해도 ** 두개로 변경
                 */

                // 1. input1 의 값을 받아오기
                 var oInputOne = this.getView().byId("input1");
                 var oInputTwo = this.getView().byId("input2");     // 여기서 oInputTwo를 선언하고!
                 var sInputTextValueOne = oInputOne.getValue();

                // 2. 받아온 input1의 값을 첫글자만 남기고 + "**" 추가하기

                 var changedTextOne = (sInputTextValueOne.slice(0,1)) +"**";                

                 console.log(changedTextOne);

                // 3. changedTextOne 을 input2에 넣어주기

                oInputTwo.setValue(changedTextOne);     // setValue로 값을 받아와야한다!
                

            }
        });
    });
