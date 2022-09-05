sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/ButtonType"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, ButtonType) {
        "use strict";

        return Controller.extend("sap.sync.ui5test.controller.View4", {
            /**
             * 화면제어를 위한 JSONModel, 뷰모델을 매번 getModel() 하지 않기위해 컨트롤러의 프로퍼티로 등록하여 사용해봄
             */
            oViewModel  : null,
            oViewData   : {
                iMin            : null,
                iMax            : null,
                iTimeout        : 2,
                bBeforeStart    : true,     // 게임 시작 전|후
                bAnswered       : false,    // 각 회차의 맞추기 버튼 누르기 전|후
                bCorrect        : null,     // 정답 유|무
                iCountCorrect   : 0,
                iCountFail      : 0,
                iCountTimeover  : 0,
                iPlayTotal      : 4,
                iPlayCount      : 0
            },
            aAnswers    : [],

            /**
             * 처음 뷰(컨트롤러)가 로드될 때 수행하도록 약속된 메소드
             */
            onInit: function () {
                this.getRouter = this.getOwnerComponent().getRouter();
                this.getOwnerComponent().getRouter().getRoute("View4").attachMatched(this._onRouteMatched, this);

                var oData = this.oViewData;
                this.oViewModel = new JSONModel(oData);
                this.getView().setModel(this.oViewModel,"view");
            },

            /**
             * 게임 시작버튼 메소드 - 뷰모델의 게임시작 여부 속성{bBeforeStart} 변경 & 타이머 시작 & 설정값 리셋
             */
            onStartGame: function () {
                var bClicked = null,
                    iTimeout = this.oViewModel.getProperty("/iTimeout") * 1000;

                this.oViewModel.setProperty("/bBeforeStart", false);
                this.oViewModel.setProperty("/iCountCorrect", 0);
                this.oViewModel.setProperty("/iCountFail", 0);
                this.oViewModel.setProperty("/iCountTimeover", 0);
                this.oViewModel.setProperty("/iPlayCount", 0);

                this.aAnswers = [];
                this.aAnswers.push(false);

                this._setTimeout(0);
            },


            /**
             * 버튼 공통함수
             * @param {Object} oEvent - 이벤트 객체
             * @param {string} sAnswer - 이벤트를 발생시킨 버튼 구분자
             */
            onPress: function (oEvent, sAnswer) {
                var iCount = ++this.oViewData.iPlayCount;
                if (iCount <= this.oViewData.iPlayTotal) {
                    var oButton = oEvent.getSource();
                    this._setResult(sAnswer, oButton);
                    this.oViewModel.setProperty("/bAnswered", true);
                    this.aAnswers[iCount-1] = true;
                    
                    if (iCount !== this.oViewData.iPlayTotal) { 
                        this.aAnswers.push(false);
                        this._setTimeout(iCount);
                    }
                }
            },

            /**
             * 화면에 접근 시 매번 수행하는 메소드
             * 이 화면에서는 상단 버튼번호를 갱신해주는 역할로 사용
             */
            _onRouteMatched: function() {
                this.getView().getModel("AppModel").setProperty("/currentPage", "4");
            },

            /**
             * 랜덤 정수값을 출력해주는 메소드
             * @param {number} min - 최소값
             * @param {number} max - 최대값
             * @returns 범위 내의 랜덤숫자
             */
            _setRandomNumber: function (min, max) {
                min = Math.ceil(min);
                max = Math.floor(max+1);
                return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
            },

            /**
             * 홀,짝 버튼 클릭시 랜덤숫자 생성 내부매소드 호출, 정답 유무 판정과 후처리
             * @param {string} sAnswer 
             * @param {Object} oButton 
             */
            _setResult: function (sAnswer, oButton) {
                var iMin = parseInt(this.oViewModel.getProperty("/iMin")),
                    iMax = parseInt(this.oViewModel.getProperty("/iMax"));
                var iRanNum = this._setRandomNumber(iMin, iMax);
                var bCorrect;

                if (sAnswer === 'odd') {
                    bCorrect = iRanNum % 2 === 1 ? true : false;
                } else {
                    bCorrect = iRanNum % 2 === 0 ? true : false;
                }
                
                this.oViewModel.setProperty("/bCorrect", bCorrect);
                if (bCorrect) {
                    this._setSuccess(iRanNum, oButton);
                } else {
                    this._setFailed(iRanNum, oButton);
                }
                
                if (this.oViewData.iPlayCount === this.oViewData.iPlayTotal) {
                    setTimeout(function(){this._setQuitGame();}.bind(this),1500);
                }
            },

            /**
             * 게임이 진행될 때마다 시간제한 타이머 기능을 처리하는 내부메소드
             * @param {Number} iCount - 몇번째 게임에서의 타이머인지를 전달하는 파라미터
             */
            _setTimeout: function (iCount) {
                var iTimeout = this.oViewModel.getProperty("/iTimeout") * 1000;
                setTimeout(function () {
                    var bAnswered = this.aAnswers[iCount]; // this.oViewModel.getProperty("/bAnswered");
                    if (!bAnswered) {
                        
                        if( this.oViewData.iPlayCount < this.oViewData.iPlayTotal) {
                            this._setFailed();
                            this.aAnswers.push(false);
                            this.oViewData.iPlayCount++;
                            var sText = this.oViewData.iPlayCount + "번째 [시간초과!]"
                            MessageToast.show(sText);
                            this._setTimeout(this.oViewData.iPlayCount);
                            this.oViewModel.setProperty("/bCorrect", false);
                            if (this.oViewData.iPlayCount === this.oViewData.iPlayTotal) {
                                setTimeout(function(){this._setQuitGame();}.bind(this),1500);
                            }
                        }
                    }
                }.bind(this), iTimeout);
                var bAnswered = this.aAnswers[iCount]; 
            },

            /**
             * 게임에서 정답을 맞췄을 때 구동할 내부 메소드
             * @param {Number} iRanNum - 랜덤생성된 숫자값
             * @param {Object} oButton - 정답을 맞춘 상황에서 내 클릭에 의해 동적으로 상태를 바꿀 버튼
             */
            _setSuccess: function (iRanNum, oButton) {
                this._setButtonProperties(oButton, "Success");
                var iPlayCount = this.oViewData.iPlayCount;
                var sText = iPlayCount + "번째 - [정답] " + iRanNum;
                MessageToast.show(sText);
            },

            /**
             * 게임에서 오답일 때 구동할 내부 메소드
             * @param {Number} iRanNum - 랜덤생성된 숫자값
             * @param {Object} oButton - 오답인 상황에서 내 클릭에 의해 동적으로 상태를 바꿀 버튼
             */
            _setFailed: function (iRanNum, oButton) {
                var iPlayCount = this.oViewData.iPlayCount;
                var sText;
                if(oButton) {
                    this._setButtonProperties(oButton, "Negative");
                    sText = iPlayCount + "번째 - [오답] " + iRanNum;
                } else {    // oButton 객체가 파라미터로 안들어오는 경우 = 타임오버 호출
                    sText = iPlayCount + "번째 - [시간초과]";
                }
                MessageToast.show(sText);
            },

            /**
             * 버튼의 상태를 제어하는 내부 메소드
             * @param {*} oButton - 대상 버튼 객체
             * @param {*} sType - 변경요청할 버튼타입
             */
            _setButtonProperties: function (oButton, sType) {
                oButton.setIcon("sap-icon://warning");
                oButton.setType(ButtonType[sType]);
                setTimeout(function(){
                    oButton.setType(ButtonType.None);
                    oButton.setIcon("sap-icon://question-mark");
                },500)
            },

            /**
             * 게임 종료처리 메소드 - 게임종료 메세지토스트와 뷰모델의 상태값을 바꿈
             */
            _setQuitGame: function () {
                this.oViewModel.setProperty("/bBeforeStart", true);
                MessageToast.show("게임종료!");
            }
        });
    });
