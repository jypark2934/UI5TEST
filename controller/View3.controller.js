sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View3", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                
                var oViewModel = new JSONModel({
                    Questions : [
                        { Q : "당신은 외향적인가요? 내향적인가요?", Text1: "내향적", Text2: "외향적", Answer: -1 },
                        { Q : "당신은 직관적인가요? 감각적인가요?", Text1: "직관적", Text2: "감각적", Answer: -1 },
                        { Q : "당신은 감정적인가요? 현실적인가요?", Text1: "감정적", Text2: "현실적", Answer: -1 },
                        { Q : "당신은 즉흥적인가요? 계획적인가요?", Text1: "즉흥적", Text2: "계획적", Answer: -1 }
                    ],
                    Results : [
                        { answer: "INFP", code: "0000" },
                        { answer: "INFJ", code: "0001" },
                        { answer: "INTP", code: "0010" },
                        { answer: "INTJ", code: "0011" },
                        { answer: "ISFP", code: "0100" },
                        { answer: "ISFJ", code: "0101" },
                        { answer: "ISTP", code: "0110" },
                        { answer: "ISTJ", code: "0111" },
                        { answer: "ENFP", code: "1000" },
                        { answer: "ENFJ", code: "1001" },
                        { answer: "ENTP", code: "1010" },
                        { answer: "ENTJ", code: "1011" },
                        { answer: "ESFP", code: "1100" },
                        { answer: "ESFJ", code: "1101" },
                        { answer: "ESTP", code: "1110" },
                        { answer: "ESTJ", code: "1111" }
                    ],
                    bQ1Visible : false,
                    bQ2Visible : false,
                    bQ3Visible : false,
                    bQ4Visible : false,
                    bQ5Visible : false,
                    // Option - setTimeout 으로 질문이 뜨고 5초간 입력을 못하도록 editable="false" 값을 초기값으로 가지는 프로퍼티
                    bQ1DelaySelect : false,
                    bQ2DelaySelect : false,
                    bQ3DelaySelect : false,
                    bQ4DelaySelect : false
                })
                this.getView().setModel(oViewModel, "view");

                this.getOwnerComponent().getRouter().getRoute("View3").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "3");
            },

            /**
             * 처음 검사 시작버튼 이벤트
             */
            onPressStart: function() {
                this.getView().getModel("view").setProperty("/bQ1Visible", true);

                setTimeout(() => { 
                    this.getView().getModel("view").setProperty("/bQ1DelaySelect", true);
                }, 5000);
            },

            onSelected: function(oEvent, qNum) {
                var qBoxPath;
                switch (qNum) {
                    case '1':
                        qBoxPath = "/bQ2Visible"
                        this.getView().getModel("view").setProperty(qBoxPath, true);
                        setTimeout(() => { 
                            this.getView().getModel("view").setProperty("/bQ2DelaySelect", true);
                        }, 5000);
                        break;
                    case '2':
                        qBoxPath = "/bQ3Visible"
                        this.getView().getModel("view").setProperty(qBoxPath, true);
                        setTimeout(() => { 
                            this.getView().getModel("view").setProperty("/bQ3DelaySelect", true);
                        }, 5000)
                        break;
                    case '3':
                        qBoxPath = "/bQ4Visible"
                        this.getView().getModel("view").setProperty(qBoxPath, true);
                        setTimeout(() => { 
                            this.getView().getModel("view").setProperty("/bQ4DelaySelect", true);
                        }, 5000)
                        break;
                        case '4':
                            qBoxPath = "/bQ5Visible"
                            this.getView().getModel("view").setProperty(qBoxPath, true);
                        break;

                    default:
                        break;
                }
            },

            onPressFinish: function() {

                // 1. 뷰 가져오고
                var oViewModel = this.getView().getModel("view"); 

                
                // 2. 라디오 버튼 그룹 가져오고 3. getSelctedIndex로 매겨주고
                var oRadio1 = this.byId("groupA")
                var oIndex1 = String(oRadio1.getSelectedIndex());

                var oRadio2 = this.byId("groupB")
                var oIndex2 = String(oRadio2.getSelectedIndex());

                var oRadio3 = this.byId("groupC")
                var oIndex3 = String(oRadio3.getSelectedIndex());

                var oRadio4 = this.byId("groupD")
                var oIndex4 = String(oRadio4.getSelectedIndex());

                var sResult = oIndex1 + oIndex2 + oIndex3 + oIndex4;

               //var sValue;

                if (sResult === '0000') {
                    MessageBox.confirm("INFP");
                }else if (sResult === '0001') {
                    MessageBox.confirm("INFJ");
                }else if (sResult === '0010') {
                    MessageBox.confirm("INTP");
                }else if (sResult === '0011') {
                    MessageBox.confirm("INTJ");
                }else if (sResult === '0100') {
                    MessageBox.confirm("ISFP");
                }else if (sResult === '0101') {
                    MessageBox.confirm("ISFJ");
                }else if (sResult === '0110') {
                    MessageBox.confirm("ISTP");
                }else if (sResult === '0111') {
                    MessageBox.confirm("ISTJ");
                }else if (sResult === '1000') {
                    MessageBox.confirm("ENFP");
                }else if (sResult === '1001') {
                    MessageBox.confirm("ENFJ");
                }else if (sResult === '1010') {
                    MessageBox.confirm("ENTP");
                }else if (sResult === '1011') {
                    MessageBox.confirm("ENTJ");
                }else if (sResult === '1100') {
                    MessageBox.confirm("ESFP");
                }else if (sResult === '1101') {
                    MessageBox.confirm("ESFJ");
                }else if (sResult === '1110') {
                    MessageBox.confirm("ESTP");
                }else if (sResult === '1111') {
                    MessageBox.confirm("ESTJ");
                };
                


            }




                
        });7
    });
