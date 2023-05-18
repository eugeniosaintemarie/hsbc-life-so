var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./rescate1", "./rescateErrorUsuario", "./rescateErrorPoliza", "./rescateErrorCuenta", "./rescateErrorMonto", "./rescateCobro", "./rescateInfoAdicional", "./rescateErrorFondos", "./rescateValidacion", "./rescateRecepcion", "../segurosOnline/home"], function (React, Rescate1, RescateErrorUsuario, RescateErrorPoliza, RescateErrorCuenta, RescateErrorMonto, RescateCobro, RescateInfoAdicional, RescateErrorFondos, RescateValidacion, RescateRecepcion, Home) {
    var RescateMain = function (_React$Component) {
        _inherits(RescateMain, _React$Component);

        function RescateMain(props) {
            _classCallCheck(this, RescateMain);

            var _this = _possibleConstructorReturn(this, (RescateMain.__proto__ || Object.getPrototypeOf(RescateMain)).call(this, props));

            _this._handleSwitch = function (view) {
                if (view == 'home') {
                    _this.props.handleShowRescateParcial();
                } else _this.setState({ currentView: view });
            };

            _this._handleErrorPoliza = function (error) {
                _this.setState({ errorPoliza: error });
            };

            _this._addMonto = function (e) {
                _this.setState({
                    montoRescatar: e
                });
            };

            _this._montoSaldoTotal = function (e) {
                _this.setState({
                    montoTotal: e
                });
            };

            _this._addNumeroCBU = function (e) {
                _this.setState({
                    numeroCBU: e
                });
            };

            _this._addCUIT = function (e) {
                _this.setState({
                    cuit: e
                });
            };

            _this._addTitular = function (e) {
                _this.setState({
                    titular: e
                });
            };

            _this._addCuenta = function (e) {
                _this.setState({
                    cuentaSeleccionada: e
                });
            };

            _this._addTipoCuenta = function (e) {
                _this.setState({
                    tipoCuenta: e
                });
            };

            _this._addNroCuenta = function (e) {
                _this.setState({
                    nroCuenta: e
                });
            };

            _this._getClientNeg = function (e) {
                _this.setState({
                    clienteNeg: e
                });
            };

            _this._caseForm = function () {
                var currentView = _this.state.currentView;


                switch (currentView) {
                    case 'main':
                        return React.createElement(Rescate1, { "switch": _this._handleSwitch, addMonto: _this._addMonto, montoSaldoTotal: _this._montoSaldoTotal, errorPoliza: _this._handleErrorPoliza, getClientNeg: _this._getClientNeg });
                    case 'errorUsuario':
                        return React.createElement(RescateErrorUsuario, { "switch": _this._handleSwitch });
                    case 'errorPoliza':
                        return React.createElement(RescateErrorPoliza, { "switch": _this._handleSwitch, errorPoliza: _this.state.errorPoliza });
                    case 'errorCuenta':
                        return React.createElement(RescateErrorCuenta, { "switch": _this._handleSwitch });
                    case 'errorMonto':
                        return React.createElement(RescateErrorMonto, { "switch": _this._handleSwitch });
                    case 'rescateCobro':
                        return React.createElement(RescateCobro, { "switch": _this._handleSwitch, addNumeroCBU: _this._addNumeroCBU, addCuenta: _this._addCuenta, addCUIT: _this._addCUIT,
                            addTitular: _this._addTitular, addTipoCuenta: _this._addTipoCuenta, addNroCuenta: _this._addNroCuenta });
                    case 'rescateInfoAdicional':
                        return React.createElement(RescateInfoAdicional, { "switch": _this._handleSwitch });
                    case 'rescateValidacion':
                        return React.createElement(RescateValidacion, { "switch": _this._handleSwitch, montoRescatar: _this.state.montoRescatar, montoTotal: _this.state.montoTotal,
                            numeroCBU: _this.state.numeroCBU, cuit: _this.state.cuit, titular: _this.state.titular, tipoCuenta: _this.state.tipoCuenta, nroCuenta: _this.state.nroCuenta,
                            cuentaSeleccionada: _this.state.cuentaSeleccionada });
                    case 'rescateRecepcion':
                        return React.createElement(RescateRecepcion, { "switch": _this._handleSwitch, clienteNeg: _this.state.clienteNeg });
                    case 'errorFondos':
                        return React.createElement(RescateErrorFondos, { "switch": _this._handleSwitch });
                }
            };

            _this.state = {
                currentView: 'main',
                montoRescatar: {},
                montoTotal: {},
                numeroCBU: {},
                cuentaSeleccionada: {},
                cuit: {},
                titular: {},
                nroCuenta: null,
                tipoCuenta: null,
                clienteNeg: null,
                errorPoliza: ""
            };
            return _this;
        }

        _createClass(RescateMain, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    this._caseForm()
                );
            }
        }]);

        return RescateMain;
    }(React.Component);

    return RescateMain;
});