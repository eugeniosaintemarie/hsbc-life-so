var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "./paymentSelect", "./paymentOther", '../../../controller/endososController', "../../../common/errormessage"], function (React, Utils, PaymentSelect, PaymentOther, EndososController, Errormessage) {
    var PaymentMethodEndoso = function (_React$Component) {
        _inherits(PaymentMethodEndoso, _React$Component);

        function PaymentMethodEndoso(props) {
            _classCallCheck(this, PaymentMethodEndoso);

            var _this = _possibleConstructorReturn(this, (PaymentMethodEndoso.__proto__ || Object.getPrototypeOf(PaymentMethodEndoso)).call(this, props));

            _this._handleResults = function (id, result) {
                var _this$setState;

                _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, "error", false), _defineProperty(_this$setState, "txtError", ''), _this$setState));
            };

            _this._disableButton = function (e) {
                if (_this.state.method != '' && Object.keys(_this.state.pmSelected).length > 0 && !_this.state.pmSelected.other || _this.state.brand.value != '' && _this.state.creditcardnumber.isValidate && _this.state.permission == true) {
                    return false;
                }
                return true;
            };

            _this._handleCancel = function () {
                _this.props.refresh();
                _this.props.switch('main');
            };

            _this._handleUpdateOnClick = function () {

                var sendData = {};
                if (!_this.state.pmSelected.other) {
                    var creditCardNumber = _this.state.pmSelected.productAdditionalInfo.creditCardInfo.creditCardNumber;
                    var productArrangement = _this.state.pmSelected.productArrangement;

                    var tipoCorbo = _this._handleMarca(productArrangement.FinSvceArr.AcctIntTrnsfNum.AcctSfxNum["#text"]);

                    var fechaVenc = productArrangement.DueDt["#text"].split("-");

                    sendData = {
                        NROCOBRO: creditCardNumber["#text"],
                        TIPOCOBR: tipoCorbo,
                        FECVTOTARJ: fechaVenc[2] + fechaVenc[1] + fechaVenc[0],
                        NOMCOBR: _this.props.endosoData.data.NOMCOBR,
                        APELLCOBR: _this.props.endosoData.data.APELLCOBR,
                        TIPDOCCOBR: _this.props.endosoData.data.TIPDOCCOBR,
                        NUMDOCCOBR: _this.props.endosoData.data.NUMDOCCOBR,
                        TOMEDPAG: _this.props.endosoData.data.TOMEDPAG,
                        COBROCOD: 4
                    };
                } else {
                    sendData = {
                        NROCOBRO: _this.state.creditcardnumber.value,
                        TIPOCOBR: _this.state.brand.id,
                        FECVTOTARJ: "01" + _this.state.expirationDate.value.replace('/', ''),
                        NOMCOBR: _this.props.endosoData.data.NOMCOBR,
                        APELLCOBR: _this.props.endosoData.data.APELLCOBR,
                        TIPDOCCOBR: _this.props.endosoData.data.TIPDOCCOBR,
                        NUMDOCCOBR: _this.props.endosoData.data.NUMDOCCOBR,
                        TOMEDPAG: _this.props.endosoData.data.TOMEDPAG,
                        COBROCOD: 4
                    };
                }

                _this.endososController.altaEndoso('payment', sendData, function (data) {
                    if (data === 'OK') {
                        _this.props.switch('paymentMethodOK');
                    } else {
                        _this.setState({
                            showError: true,
                            textError: data
                        });
                    }
                });
            };

            _this.state = {
                method: 'cardCredit',
                paymentMethod: {},
                pmSelected: {},
                brand: {},
                creditcardnumber: {},
                permission: false,

                showError: false,
                textError: ''
            };

            _this.endososController = new EndososController();
            return _this;
        }

        _createClass(PaymentMethodEndoso, [{
            key: "_handleMarca",
            value: function _handleMarca(marca) {
                switch (marca) {
                    case '3':
                        return 'VI';
                    case '1':
                        return 'MC';
                    case '7':
                        return 'AE';
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _props$endosoData$dat = this.props.endosoData.data,
                    TIPOCOBR = _props$endosoData$dat.TIPOCOBR,
                    NROCOBRO = _props$endosoData$dat.NROCOBRO;


                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        { className: "ml-5 mb-5" },
                        React.createElement(
                            "small",
                            null,
                            "Medio de pago actual"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "small",
                            null,
                            TIPOCOBR,
                            " ",
                            Utils.zfill(NROCOBRO.substr(-4), NROCOBRO.length, '*')
                        )
                    ),
                    React.createElement(PaymentSelect, {
                        tokenData: this.state.tokenData,
                        onResult: this._handleResults }),
                    this.state.pmSelected.other && this.state.method != '' ? React.createElement(PaymentOther, {
                        paymentMethod: this.state.paymentMethod,
                        onResult: this._handleResults }) : '',
                    React.createElement(
                        "div",
                        { className: "text-center mt-2" },
                        React.createElement(Errormessage, { className: "text-danger", show: this.state.showError, text: this.state.textError })
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center mt-3" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-dark m-2 p-1 pr-2 pl-2",
                                type: "button",
                                onClick: this._handleUpdateOnClick,
                                disabled: this._disableButton() },
                            "Actualizar"
                        ),
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-light m-2 p-1 pr-2 pl-2 ",
                                type: "button",
                                onClick: this._handleCancel },
                            "Cancelar"
                        )
                    )
                );
            }
        }]);

        return PaymentMethodEndoso;
    }(React.Component);

    return PaymentMethodEndoso;
});