var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./main/selectModPoliza", "./payment/paymentMethodEndoso", "./payment/paymentMethodView", "./beneficiary/beneficiaryManager", "./main/historyBeneficiaryEndoso", "./address/addressEndoso", "./errorEndoso", "./processOK", "../../controller/endososController", "../../common/loader"], function (React, SelectModPoliza, PaymentMethodEndoso, PaymentMethodView, BeneficiaryManager, HistoryBeneficiaryEndoso, AddressEndoso, ErrorEndoso, ProcessOK, EndososController, Loader) {
    var EndosoManager = function (_React$Component) {
        _inherits(EndosoManager, _React$Component);

        function EndosoManager(props) {
            _classCallCheck(this, EndosoManager);

            var _this = _possibleConstructorReturn(this, (EndosoManager.__proto__ || Object.getPrototypeOf(EndosoManager)).call(this, props));

            _this._handleSwitch = function (view) {
                _this.setState({ currentView: view });
                if (view == 'main') {
                    _this._refreshData();
                }
            };

            _this._handleUpdateState = function (key, value) {
                _this.setState(_defineProperty({}, key, value));
            };

            _this._refreshData = function () {
                _this._getExisteEndoso();
            };

            _this._caseForm = function () {
                var currentView = _this.state.currentView;


                switch (currentView) {
                    case 'main':
                        return React.createElement(SelectModPoliza, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            refresh: _this._refreshData,
                            polizaState: _this.endososController.getPolizaEnable() });
                    case 'default':
                        return React.createElement(SelectModPoliza, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            refresh: _this._refreshData });
                    case 'paymentMethod':
                        if (_this.endososController.getPolizaEnable() != '22') {
                            return React.createElement(PaymentMethodEndoso, {
                                "switch": _this._handleSwitch,
                                endosoData: _this.state.endosoData,
                                refresh: _this._refreshData });
                        } else {
                            return _this.setState({
                                currentView: 'userNoAvailable'
                            });
                        }
                    case 'paymentMethodView':
                        return React.createElement(PaymentMethodView, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData });
                    case 'paymentMethodOK':
                        return React.createElement(ProcessOK, {
                            "switch": _this._handleSwitch,
                            text: 'Su cambio de medio de pago se registro con éxito' });
                    case 'beneficiary':
                        return React.createElement(BeneficiaryManager, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            refresh: _this._refreshData,
                            refreshOnlyBenef: _this._refreshOnlyBenef });
                    case 'beneficiaryView':
                        return React.createElement(BeneficiaryManager, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            refresh: _this._refreshData,
                            refreshOnlyBenef: _this._refreshOnlyBenef,
                            onlyView: true });
                    case 'address':
                        return React.createElement(AddressEndoso, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            clixPolData: _this.state.clixPolData,
                            refresh: _this._refreshData });
                    case 'addressView':
                        return React.createElement(AddressEndoso, {
                            "switch": _this._handleSwitch,
                            endosoData: _this.state.endosoData,
                            clixPolData: _this.state.clixPolData,
                            refresh: _this._refreshData,
                            onlyView: true });
                    case 'addressOK':
                        return React.createElement(ProcessOK, {
                            "switch": _this._handleSwitch,
                            text: 'Su cambio de domicilio se registro con éxito' });
                    case 'history':
                        return React.createElement(HistoryBeneficiaryEndoso, {
                            "switch": _this._handleSwitch });
                    case 'error':
                        return React.createElement(ErrorEndoso, { type: "error",
                            "switch": _this._handleSwitch,
                            handleShowEndoso: _this.props.handleShowMain });
                    case 'noAvailable':
                        return React.createElement(ErrorEndoso, { type: "noAvailable",
                            "switch": _this._handleSwitch,
                            handleShowEndoso: _this.props.handleShowMain });
                    case 'userNoAvailable':
                        return React.createElement(ErrorEndoso, { type: "userNoAvailable",
                            "switch": _this._handleSwitch,
                            handleShowEndoso: _this.props.handleShowMain });
                }
            };

            _this._refreshOnlyBenef = function (idCurrent) {

                _this.endososController.getConsEndoso(function (data) {
                    if (typeof data !== 'string') {

                        var dataAux = _this.state.endosoData;

                        dataAux.data.DATOBENE.BENEF[idCurrent] = data.data.DATOBENE.BENEF[idCurrent];

                        _this.setState({
                            currentView: 'beneficiary',
                            endosoData: {
                                action: dataAux.action,
                                data: dataAux.data
                            }
                        });
                    }
                });
            };

            _this._getExisteEndoso = function () {
                _this.endososController.getConsEndoso(function (data) {
                    if (typeof data !== 'string') {
                        if (data.action == 'error' || data.action == 'noAvailable') {
                            _this.setState({
                                dataLoaded: true,
                                currentView: data.action
                            });
                        } else {
                            _this.setState({
                                dataLoaded: true,
                                endosoData: {
                                    action: data.action,
                                    data: data.data
                                }
                            });
                        }
                    } else {
                        _this.setState({
                            dataLoaded: true,
                            currentView: 'error'
                        });
                    }
                });
                _this.endososController.getRecupClixPol(function (data) {
                    _this.setState({
                        clixPolData: data
                    });
                });
            };

            _this.state = {
                currentView: 'main',
                dataLoaded: false,
                endosoData: {},
                clixPolData: {}
            };
            _this.endososController = new EndososController();
            return _this;
        }

        _createClass(EndosoManager, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    this.state.dataLoaded != false ? this._caseForm() : React.createElement(
                        "div",
                        { className: "col-md-11 d-flex justify-content-center" },
                        React.createElement(Loader, { width: "4rem", height: "4rem" })
                    )
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this._getExisteEndoso();
            }
        }]);

        return EndosoManager;
    }(React.Component);

    return EndosoManager;
});