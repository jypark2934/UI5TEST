sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/Input',
    'sap/m/MessageBox',
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Input, MessageBox, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View1", {
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();

                var oViewModel = new JSONModel({
                    value1: null,
                    value2: null,
                    result: null,
                    sSelValue: null
                })
                this.getView().setModel(oViewModel, "view");

                var oSelectData = {
                    calc: {
                        operate: [
                            { id: "plus", ope: "+" },
                            { id: "min", ope: "-" },
                            { id: "mul", ope: "*" },
                            { id: "div", ope: "/" },
                            { id: "구구단", ope: "@" }
                        ]
                    }
                };
                var oSelModel = new JSONModel(oSelectData);
                this.getView().setModel(oSelModel, "selList");

                this.getOwnerComponent().getRouter().getRoute("RouteView1").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function () {
                this.getView().getModel("AppModel").setProperty("/currentPage", "1");
            },

            onCalc: function () {

                var oViewModel = this.getView().getModel("view");
                var oInputOne = this.getView().byId("input1"),
                    oInputTwo = this.getView().byId("input2");
                // view 에 연결된 모델을 읽어옴
                var sInputTextValueOne = oInputOne.getValue();
                var sInputTextValueTwo = oInputTwo.getValue();
                
                    

                var sValueOne = oViewModel.getProperty("/value1");
                var sValueTwo = oViewModel.getProperty("/value2");
                var sValueOperator = oViewModel.getProperty("/sSelValue");
                var iValue1 = parseInt(sValueOne);
                var iValue2 = parseInt(sValueTwo);

                // 인풋에 0이 들어있으면 false 로 Boolean 값 변경이 일어날 수 있기 때문에 조건식을 걸어서 처리
                // 만약에 0이 들어 있으면 이게 실제로 인풋객체에 0이라는 텍스트가 들어 있는지 한번 더 판단해서 값이 입력되어있는 상태인지 확인
                var bInputValueOne = sValueOne !== 0 ? Boolean(sValueOne) : (sInputTextValueOne === '0' ? true : false),
                    bInputValueTwo = sValueTwo !== 0 ? Boolean(sValueTwo) : (sInputTextValueTwo === '0' ? true : false);

                switch (false) {
                    case Boolean(bInputValueOne+bInputValueTwo):   // switch-case 문은 순서대로 조건을 검증, false+false=0 둘 다 비어있는 경우
                        MessageToast.show("모든 숫자가 입력되지 않았습니다.");
                        oInputOne.focus();
                        break;

                    case bInputValueOne:
                        MessageToast.show("첫번째 숫자가 입력되지 않았습니다.");
                        oInputOne.focus();
                        break;  
                    case bInputValueTwo:  // + 연산자가 구구단 일 때는 이 조건에 안타도록 구현
                        MessageToast.show("두번째 숫자가 입력되지 않았습니다.");
                        oInputTwo.focus();
                        break;
                
                    default:


//var sValueOperator = oSelect.getSelectedKey();
                // getProperty - JSONModel 도 JSON->JS Object
                // 모델의 내용은 프로퍼티
                // 프로퍼티의 키 이름을 주소로 사용해 실제 값에 접근
                // { inputValue2 : [실제 값] }

                var iResult;
                // Select 에서 선택한 아이템의 key value
               
                

                oViewModel.setProperty("/result", iResult);

                var oText = this.getView().byId("text1");
                var sText = ''; //이거를 설정해줘야 처음에 undefined가 뜨지 않음 

                //var sValueOperator = oEvent.getParameter("selectedItem").getKey();
                if (sValueOperator === '/' && iValue2 === 0) {
                    //iResult = "0으로 나눌 수 없습니다"
                    oInputTwo.setValueState("Error");
                    oInputTwo.setValueStateText("0으로 나눌 수 없습니다.");
                    MessageToast.show("0으로 나눌 수 없습니다.");
                    oInputTwo.setValue("");
                    //console.log("Can't divide into 0");
                    //MessageBox.show("Can't divide into 0");
                }
                else {
                    oInputTwo.setValueState("None"); //평소 상태로 돌려놓음
                    switch (sValueOperator) {
                        case "+": // 더하기 일때
                            iResult = iValue1 + iValue2;
                            break;
                        case "-":
                            iResult = iValue1 - iValue2;
                            break;
                        case "*":
                            iResult = iValue1 * iValue2;
                            break;
                        case "/":
                            iResult = iValue1 / iValue2;
                            break;
                        case "@":
                            for (var i = 1; i <= 9; i++) {
                                //계산 입력값과 i 곱한 결과
                                var iResult = iValue1 * i;
                                //aArray2.push(iResult); 없어도됨
                
                                // 출력
                                // 문자열 + 숫자 = 문자열 + 문자열
                                // abap CONCATENATE 처럼 문자열 조합으로 합쳐짐
                                var sOutput = iValue1 + "단:" + iValue1 + "X" + i + "=" + iResult;
                                //var sOutput = i+"단:"+"입력값"+"X"+i+"="+"결과";
                                //console.log(sOutput);
                                //oViewModel.setProperty("/result", sOutput);
                                sText = sText + sOutput + '\n'; /// sText는 이전의 sText에서 새로나올 sOutput을 더함
                            }
                            iResult = sText;
                            break;
                        default:
                            iResult = "계산 실패";
                            break;
                    }
                    
                    oViewModel.setProperty("/result", iResult);
                    //MessageToast.show("계산결과:" + iResult);
                    //iResult.value = null;
                }

                    
                        break;
                }
                
                
            },

            onSelect: function(oEvent) { 
                // 1. 연산자를 읽어옴
                var oViewModel = this.getView().getModel("view");
                var sValueOperator = oViewModel.getProperty("/sSelValue");
                //console.log(sValueOperator);
                // 2. inputTwo의 값을 가져옴
                var oInputTwo = this.getView().byId("input2");
                var sInputTwo = oViewModel.getProperty("/value2");  

                if (sValueOperator === '/' && sInputTwo == "0") {
                    //iResult = "0으로 나눌 수 없습니다"
                    oInputTwo.setValueState("Error");
                    oInputTwo.setValueStateText("0으로 나눌 수 없습니다.");
                    MessageToast.show("0으로 나눌 수 없습니다.");
                    oInputTwo.setValue("");
                }
                else{
                    oInputTwo.setValueState("None");
                }
                

            },

            onSubmit: function (oEVent) {

                var oViewModel = this.getView().getModel("view");
                var oInputOne = this.getView().byId("input1"),
                    oInputTwo = this.getView().byId("input2");
                // view 에 연결된 모델을 읽어옴
                var sInputTextValueOne = oInputOne.getValue();
                var sInputTextValueTwo = oInputTwo.getValue();
                
                    

                var sValueOne = oViewModel.getProperty("/value1");
                var sValueTwo = oViewModel.getProperty("/value2");
                var sValueOperator = oViewModel.getProperty("/sSelValue");
                var iValue1 = parseInt(sValueOne);
                var iValue2 = parseInt(sValueTwo);

                // 인풋에 0이 들어있으면 false 로 Boolean 값 변경이 일어날 수 있기 때문에 조건식을 걸어서 처리
                // 만약에 0이 들어 있으면 이게 실제로 인풋객체에 0이라는 텍스트가 들어 있는지 한번 더 판단해서 값이 입력되어있는 상태인지 확인
                var bInputValueOne = sValueOne !== 0 ? Boolean(sValueOne) : (sInputTextValueOne === '0' ? true : false),
                    bInputValueTwo = sValueTwo !== 0 ? Boolean(sValueTwo) : (sInputTextValueTwo === '0' ? true : false);

                switch (false) {
                    case Boolean(bInputValueOne+bInputValueTwo):   // switch-case 문은 순서대로 조건을 검증, false+false=0 둘 다 비어있는 경우
                        MessageToast.show("모든 숫자가 입력되지 않았습니다.");
                        oInputOne.focus();
                        break;

                    case bInputValueOne:
                        MessageToast.show("첫번째 숫자가 입력되지 않았습니다.");
                        oInputOne.focus();
                        break;  
                    case bInputValueTwo:  // + 연산자가 구구단 일 때는 이 조건에 안타도록 구현
                        MessageToast.show("두번째 숫자가 입력되지 않았습니다.");
                        oInputTwo.focus();
                        break;
                
                    default:


//var sValueOperator = oSelect.getSelectedKey();
                // getProperty - JSONModel 도 JSON->JS Object
                // 모델의 내용은 프로퍼티
                // 프로퍼티의 키 이름을 주소로 사용해 실제 값에 접근
                // { inputValue2 : [실제 값] }

                var iResult;
                // Select 에서 선택한 아이템의 key value
               
                

                oViewModel.setProperty("/result", iResult);

                var oText = this.getView().byId("text1");
                var sText = ''; //이거를 설정해줘야 처음에 undefined가 뜨지 않음 

                //var sValueOperator = oEvent.getParameter("selectedItem").getKey();
                if (sValueOperator === '/' && iValue2 === 0) {
                    //iResult = "0으로 나눌 수 없습니다"
                    oInputTwo.setValueState("Error");
                    oInputTwo.setValueStateText("0으로 나눌 수 없습니다.");
                    MessageToast.show("0으로 나눌 수 없습니다.");
                    oInputTwo.setValue("");
                    //console.log("Can't divide into 0");
                    //MessageBox.show("Can't divide into 0");
                }
                else {
                    oInputTwo.setValueState("None"); //평소 상태로 돌려놓음
                    switch (sValueOperator) {
                        case "+": // 더하기 일때
                            iResult = iValue1 + iValue2;
                            break;
                        case "-":
                            iResult = iValue1 - iValue2;
                            break;
                        case "*":
                            iResult = iValue1 * iValue2;
                            break;
                        case "/":
                            iResult = iValue1 / iValue2;
                            break;
                        case "@":
                            for (var i = 1; i <= 9; i++) {
                                //계산 입력값과 i 곱한 결과
                                var iResult = iValue1 * i;
                                //aArray2.push(iResult); 없어도됨
                
                                // 출력
                                // 문자열 + 숫자 = 문자열 + 문자열
                                // abap CONCATENATE 처럼 문자열 조합으로 합쳐짐
                                var sOutput = iValue1 + "단:" + iValue1 + "X" + i + "=" + iResult;
                                //var sOutput = i+"단:"+"입력값"+"X"+i+"="+"결과";
                                //console.log(sOutput);
                                //oViewModel.setProperty("/result", sOutput);
                                sText = sText + sOutput + '\n'; /// sText는 이전의 sText에서 새로나올 sOutput을 더함
                            }
                            iResult = sText;
                            break;
                        default:
                            iResult = "계산 실패";
                            break;
                    }
                    
                    oViewModel.setProperty("/result", iResult);
                    //MessageToast.show("계산결과:" + iResult);
                    //iResult.value = null;
                    //MessageToast.show("/result");
                }

                    
                        break;
                }
                // var oViewModel = this.getView().getModel("view");
                // var sResult = oViewModel.getProperty("/result");

                // console.log(sResult);
                
                
                // 사용자가 인풋에 커서가 있을때 Enter 키를 누르면 발동
            },




        });
    });
