sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View4", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                
                var oViewFourModel = new JSONModel({
                    /**
                     * code 코드명 / materialName 자재명 /  manufacturer 생산업체 / qualified 품질검사여부 / 
                     * createdDate 생산일자 / quantity 재고량 / unit 단위 / warehouse 창고
                     */ 
                    materialList : [
                        { code: "m001", materialName: "카메라모듈", manufacturer : "k004", qualified : true, createdDate: "2022-07-01", quantity: 102, unit: "u01", warehouse: "" },
                        { code: "m012", materialName: "베터리", manufacturer : "k201", qualified : true, createdDate: "2022-03-09", quantity: 8, unit: "u02", warehouse: "" },
                        { code: "m003", materialName: "무선충전모듈", manufacturer : "k001", qualified : false, createdDate: "2022-04-17", quantity: 14, unit: "u02", warehouse: "" },
                        { code: "m004", materialName: "LED 플래쉬", manufacturer : "k065", qualified : true, createdDate: "2020-11-24", quantity: 99, unit: "u01", warehouse: "" },
                        { code: "m008", materialName: "LCD 디스플레이모듈", manufacturer : "k001", qualified : true, createdDate: "2022-07-01", quantity: 1039, unit: "u01", warehouse: "" },
                        { code: "m004", materialName: "커버 글래스", manufacturer : "k201", qualified : true, createdDate: "2022-07-01", quantity: 98, unit: "u03", warehouse: "" },
                        { code: "m021", materialName: "알루미늄 바디", manufacturer : "k001", qualified : false, createdDate: "2022-07-01", quantity: 74, unit: "u03", warehouse: "" },
                        { code: "m101", materialName: "스피커모듈", manufacturer : "k065", qualified : true, createdDate: "2022-07-01", quantity: 1, unit: "u01", warehouse: "" },
                        { code: "m097", materialName: "기판", manufacturer : "k004", qualified : true, createdDate: "2022-07-01", quantity: 385, unit: "u01", warehouse: "" },
                        { code: "m056", materialName: "메인프로세서", manufacturer : "k001", qualified : true, createdDate: "2022-07-01", quantity: 234, unit: "u01", warehouse: "" }
                    ],
                    businessPartner : [
                        { companyCode: "k001", companyName: "현대전기", contract: "02-567-8900", address: "서울시 마포구"},
                        { companyCode: "k004", companyName: "LG디스플레이", contract: "031-127-8120", address: "경기도 파주시"},
                        { companyCode: "k065", companyName: "싱크전자", contract: "02-234-5678", address: "서울시 종로구"},
                        { companyCode: "k201", companyName: "삼성전자", contract: "02-151-3526", address: "서울시 강남구"}
                    ],
                    unitInfo : [
                        { code: "u01", unit: 100 },
                        { code: "u02", unit: 10 },
                        { code: "u03", unit: 1 }
                    ]
                })
                this.getView().setModel(oViewFourModel, "oViewFourModel");

                this.getOwnerComponent().getRouter().getRoute("View4").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "4");
            },

            onChangeText: function() {
                // string.prototype.splice substring 등 의 string 프로토타입 메소드를 사용하여 이름의 맨 앞자리 글자만 추출 후 ** 두개만 붙여주기
                // 이름이 [박 아무개] 같이 3자리의 이름을 입력해도 ** 두개로 변경
            }
        });
    });
