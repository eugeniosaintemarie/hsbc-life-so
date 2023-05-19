var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "./beneficiaryEndoso", "./modifyBeneficiaryEndoso", "./identityValidationBeneficiary", "./noDirectFamilyBeneficiary", "../../../controller/endososController", "../../../common/loader", "./fileRepoEndoso", "./errorBeneficiary", "../../../common/modalReactBootstrap"], function (React, Loadsh, BeneficiaryEndoso, ModifyBeneficiaryEndoso, IdentityValidationBeneficiary, NoDirectFamilyBeneficiary, EndososController, Loader, FileRepoEndoso, ErrorBeneficiary, ModalReactBootstrap) {
    var BeneficiaryManager = function (_React$Component) {
        _inherits(BeneficiaryManager, _React$Component);

        function BeneficiaryManager(props) {
            _classCallCheck(this, BeneficiaryManager);

            var _this = _possibleConstructorReturn(this, (BeneficiaryManager.__proto__ || Object.getPrototypeOf(BeneficiaryManager)).call(this, props));

            _this._haldleAddBeneficiary = function (listNewBenef) {
                _this.endososController.validateBeneficiary(listNewBenef, function (data) {
                    _this.setState({
                        currentView: data,
                        listTemp: listNewBenef
                    });
                });
            };

            _this._setEditedTrue = function () {
                _this.setState({ isEdited: true });
            };

            _this._haldleModifyBeneficiary = function (benefData) {
                _this.endososController.validateBeneficiary(benefData, function (data) {
                    if (data != 'beneficiary') {
                        _this.setState({
                            currentView: data,
                            benefModTemp: benefData
                        });
                    } else {
                        var endosoData = _this.state.endosoData;
                        benefData.questionFND = undefined;
                        if (_this.state.flag == 'new') {
                            endosoData.data.DATOBENE.BENEF.push(benefData);
                        } else if (_this.state.flag == 'modify') {
                            var idSelect = void 0;
                            Object.keys(endosoData.data.DATOBENE.BENEF).map(function (currency) {
                                if (_this.state.listSelected[currency] && _this.state.listSelected[currency] == true) {
                                    idSelect = currency;
                                }
                            });
                            endosoData.data.DATOBENE.BENEF[idSelect] = benefData;
                        }
                        endosoData.data.DATOBENE.BENEF.sort(function (a, b) {
                            return a.BENEFORD - b.BENEFORD;
                        });
                        _this.setState({
                            currentView: 'beneficiary',
                            benefModTemp: {},
                            // questionTomador: {},
                            endosoData: endosoData,
                            isEdited: true
                        });
                    }
                });
            };

            _this._haldleDeleteBeneficiary = function () {
                var listBenef = _this.state.endosoData.data.DATOBENE.BENEF;
                Object.keys(_this.state.listSelected).map(function (currency) {
                    if (_this.state.listSelected[currency] && _this.state.listSelected[currency] == true) {
                        // listBenef.splice(currency, 1);
                        listBenef[currency] = undefined;
                        _this.state.listSelected[currency] = false;
                    }
                });

                var listDeleteUpdate = [];
                listBenef.forEach(function (e) {
                    if (e != undefined) {
                        listDeleteUpdate.push(e);
                    }
                });

                listDeleteUpdate.sort(function (a, b) {
                    return a.BENEFORD - b.BENEFORD;
                });

                var endosoData = _this.state.endosoData;
                endosoData.data.DATOBENE.BENEF = listDeleteUpdate;

                _this.setState({
                    endosoData: endosoData,
                    showError: false,
                    textError: ''
                });
            };

            _this._handlecheckedResult = function (listSelected) {
                _this.setState({
                    listSelected: listSelected
                });
            };

            _this._haldleAddQuestion = function (questions) {
                var endosoData = _this.state.endosoData;
                var benefAux = _this.state.benefModTemp;

                benefAux.questionFND = {
                    question3: questions.question3,
                    question4: questions.question4,
                    question5: questions.question5,
                    question6: questions.question6,
                    question7: questions.question7,
                    question8: questions.question8,
                    question9: questions.question9,
                    question10: questions.question10
                };

                if (_this.state.flag == 'new') {
                    endosoData.data.DATOBENE.BENEF.push(benefAux);
                } else if (_this.state.flag == 'modify') {
                    var idSelect = void 0;
                    Object.keys(endosoData.data.DATOBENE.BENEF).map(function (currency) {
                        if (_this.state.listSelected[currency] && _this.state.listSelected[currency] == true) {
                            idSelect = currency;
                        }
                    });
                    endosoData.data.DATOBENE.BENEF[idSelect] = benefAux;
                }

                endosoData.data.DATOBENE.BENEF.sort(function (a, b) {
                    return a.BENEFORD - b.BENEFORD;
                });

                _this.setState({
                    currentView: 'beneficiary',
                    benefModTemp: {},
                    endosoData: endosoData,
                    questionTomador: {
                        question1: questions.question1,
                        question2: questions.question2
                    }
                });
            };

            _this._handleSwitch = function (view, flag) {
                var flagAux = _this.state.flag;
                if (flag) {
                    flagAux = flag;
                }
                _this.setState({
                    currentView: view,
                    showError: false,
                    textError: '',
                    flag: flagAux
                });
            };

            _this._handleCancelAddModif = function () {
                _this.setState({
                    currentView: 'beneficiary',
                    benefModTemp: {},
                    showError: false,
                    textError: ''
                });
            };

            _this._handleCancel = function () {
                _this.setState({
                    currentView: 'endosoMain',
                    showError: false,
                    textError: ''
                });
            };

            _this._showModifyBenef = function () {
                var datosBenef = _this.state.endosoData.data.DATOBENE.BENEF;
                var listSelected = _this.state.listSelected;
                var data = void 0;
                Object.keys(datosBenef).map(function (currency) {
                    if (listSelected[currency] && listSelected[currency] == true) {
                        data = datosBenef[currency];
                    }
                });
                return React.createElement(ModifyBeneficiaryEndoso, {
                    setIsEdited: _this._setEditedTrue,
                    isEdited: _this.state.isEdited,
                    flag: _this.state.flag,
                    "switch": _this._handleSwitch,
                    orderList: _this.state.orderList,
                    dateBenef: Loadsh.cloneDeep(data),
                    modifyResult: _this._haldleModifyBeneficiary,
                    cancel: _this._handleCancelAddModif });
            };

            _this._showViewBenef = function () {
                var _this$props$onlyView = _this.props.onlyView,
                    onlyView = _this$props$onlyView === undefined ? false : _this$props$onlyView;

                var datosBenef = _this.state.endosoData.data.DATOBENE.BENEF;
                var listSelected = _this.state.listSelected;
                var data = void 0;
                Object.keys(datosBenef).map(function (currency) {
                    if (listSelected[currency] && listSelected[currency] == true) {
                        data = datosBenef[currency];
                    }
                });
                return React.createElement(ModifyBeneficiaryEndoso, {
                    flag: _this.state.flag,
                    "switch": _this._handleSwitch,
                    orderList: _this.state.orderList,
                    dateBenef: data,
                    onlyView: onlyView,
                    setIsEdited: _this._setEditedTrue,
                    isEdited: _this.state.isEdited,
                    modifyResult: _this._haldleModifyBeneficiary,
                    cancel: _this._handleCancelAddModif });
            };

            _this._hadleValidationAccept = function () {
                var noDirect = false;
                _this.state.endosoData.data.DATOBENE.BENEF.map(function (e) {
                    if (e.questionFND) {
                        noDirect = true;
                    }
                });

                if (noDirect == true) {
                    _this.endososController.buildJsonFileRepo(_this.state.endosoData.data, _this.state.questionTomador, function (response) {
                        if (response == 'OK') {
                            _this.endososController.altaEndoso('beneficiary', Loadsh.cloneDeep(_this.state.endosoData.data.DATOBENE.BENEF), function () {
                                if (data === 'OK') {
                                    _this.setState({
                                        currentView: 'fileRepo',
                                        showError: false,
                                        textError: ''
                                    });
                                } else {
                                    _this.setState({
                                        currentView: 'endosoMain',
                                        showError: true,
                                        textError: data
                                    });
                                }
                            });
                        }
                    });
                } else {
                    _this.endososController.altaEndoso('beneficiary', Loadsh.cloneDeep(_this.state.endosoData.data.DATOBENE.BENEF), function (data) {
                        if (data === 'OK') {
                            _this.setState({
                                currentView: 'fileRepo',
                                showError: false,
                                textError: ''
                            });
                        } else {
                            _this.setState({
                                currentView: 'beneficiary',
                                showModal: true,
                                modal: {
                                    component: null,
                                    title: 'Error',
                                    contentHTML: data,
                                    html: true,
                                    size: "md"
                                }
                            });
                        }
                    });
                }
            };

            _this._handleUpdateButton = function () {
                _this.setState({
                    currentView: 'identityValidation',
                    showError: false,
                    textError: '',
                    isEdited: true
                });
            };

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModal;
                _this.setState({
                    showModal: !current,
                    showError: false,
                    textError: ''
                });
            };

            _this._caseForm = function () {
                var currentView = _this.state.currentView;
                var _this$props$onlyView2 = _this.props.onlyView,
                    onlyView = _this$props$onlyView2 === undefined ? false : _this$props$onlyView2;

                switch (currentView) {
                    case 'beneficiary':
                        return React.createElement(BeneficiaryEndoso, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            deleteResult: _this._haldleDeleteBeneficiary,
                            orderList: _this.state.orderList,
                            selectedResult: _this._handlecheckedResult,
                            listSelected: _this.state.listSelected,
                            cancel: _this._handleCancel,
                            update: _this._handleUpdateButton,
                            setIsEdited: _this._setEditedTrue,
                            isEdited: _this.state.isEdited,
                            onlyView: onlyView
                        });
                    case 'new':
                        return React.createElement(ModifyBeneficiaryEndoso, {
                            flag: _this.state.flag,
                            "switch": _this._handleSwitch,
                            orderList: _this.state.orderList,
                            modifyResult: _this._haldleModifyBeneficiary,
                            setIsEdited: _this._setEditedTrue,
                            isEdited: _this.state.isEdited,
                            cancel: _this._handleCancelAddModif });
                    case 'view':
                        return _this._showViewBenef();
                    case 'modify':
                        return _this._showModifyBenef();
                    case 'modifyBack':
                        return React.createElement(ModifyBeneficiaryEndoso, {
                            flag: _this.state.flag,
                            "switch": _this._handleSwitch,
                            orderList: _this.state.orderList,
                            setIsEdited: _this._setEditedTrue,
                            isEdited: _this.state.isEdited,
                            dateBenef: _this.state.benefModTemp,
                            modifyResult: _this._haldleModifyBeneficiary,
                            cancel: _this._handleCancelAddModif });
                    case 'identityValidation':
                        return React.createElement(IdentityValidationBeneficiary, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            cancel: _this._handleCancelAddModif,
                            accept: _this._hadleValidationAccept });
                    case 'noDirectFamily':
                        return React.createElement(NoDirectFamilyBeneficiary, {
                            questionsTomador: _this.state.questionTomador,
                            questionsBenef: _this.state.benefModTemp.questionFND,
                            "switch": _this._handleSwitch,
                            onResult: _this._haldleAddQuestion,
                            cancel: _this._handleCancelAddModif });
                    case 'fileRepo':
                        return React.createElement(FileRepoEndoso, {
                            "switch": _this._handleSwitch });
                    case 'error':
                        _this.props.switch('noAvailable');
                        break;
                    case 'noPep':
                        return React.createElement(ErrorBeneficiary, {
                            type: "noPep",
                            "switch": _this._handleSwitch });
                    case 'endosoMain':
                        _this.props.switch('main');
                        break;
                    default:
                        return React.createElement(
                            "div",
                            { className: "col-md-11 d-flex justify-content-center" },
                            React.createElement(Loader, { width: "4rem", height: "4rem" })
                        );
                }
            };

            _this.state = {
                currentView: '',
                endosoData: _this.props.endosoData,
                listSelected: {},
                benefModTemp: {},
                flag: '',
                questionTomador: {},

                showError: false,
                textError: '',
                orderList: [{ id: "1", name: "1" }, { id: "2", name: "2" }, { id: "3", name: "3" }, { id: "4", name: "4" }, { id: "5", name: "5" }],
                isEdited: false,
                showModal: false,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false,
                    accept: null
                }

            };
            _this.endososController = new EndososController();
            return _this;
        }

        _createClass(BeneficiaryManager, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    this._caseForm(),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(ModalReactBootstrap, {
                            title: this.state.modal.title,
                            show: this.state.showModal,
                            size: this.state.modal.size,
                            isOpen: this._handleModalIsOpen,
                            component: this.state.modal.component,
                            html: this.state.modal.html,
                            contentHTML: this.state.modal.contentHTML,
                            accept: this.state.modal.accept
                        })
                    )
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                this.endososController.getClienteSuscrito(function (data) {
                    if (data == 'clientOK') {
                        _this2.setState({
                            currentView: 'beneficiary'
                        });
                    } else if (data == 'clientInvalid' || data == 'noPersonFisica') {
                        _this2.setState({
                            currentView: 'error'
                        });
                    }
                });
            }
        }]);

        return BeneficiaryManager;
    }(React.Component);

    return BeneficiaryManager;
});