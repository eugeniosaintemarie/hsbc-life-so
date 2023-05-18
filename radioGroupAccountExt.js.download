var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../lib/utils'], function (React, ReactDOM, Utils) {
    var RadioGroupAccountExt = function (_React$Component) {
        _inherits(RadioGroupAccountExt, _React$Component);

        function RadioGroupAccountExt(props) {
            _classCallCheck(this, RadioGroupAccountExt);

            var _this = _possibleConstructorReturn(this, (RadioGroupAccountExt.__proto__ || Object.getPrototypeOf(RadioGroupAccountExt)).call(this, props));

            _this._handleOnChange = function (e) {
                if (e.target.value != 'other') {
                    _this.props.onResult(_this.props.list[e.target.value]);
                } else {
                    _this.props.onResult({
                        other: true
                    });
                }
            };

            return _this;
        }

        _createClass(RadioGroupAccountExt, [{
            key: '_handleTipo',
            value: function _handleTipo(tipoCuenta) {
                if (tipoCuenta.includes("IM")) {
                    //CODIGO AIS = 7
                    return 'Caja de Ahorro';
                }if (tipoCuenta.includes("ST")) {
                    //CODIGO AIS = 2
                    return 'Cuenta Corriente';
                }
            }
        }, {
            key: '_renderCurrencies',
            value: function _renderCurrencies() {
                var _this2 = this;

                var _props = this.props,
                    name = _props.name,
                    className = _props.className;


                var detail = void 0;
                var route = Object.keys(this.props.list).map(function (currency) {
                    if (_this2.props.list[currency].productArrangement && (Object.values(_this2.props.list[currency].productArrangement.Prod.InstCde)[0] == 'IM' || Object.values(_this2.props.list[currency].productArrangement.Prod.InstCde)[0] == 'ST')) {

                        var numeroCuenta = Object.values(_this2.props.list[currency].productArrangement.FinSvceArr.AcctIntTrnsfNum.AcctNum)[0].trim();
                        detail = Utils.zfill(numeroCuenta.substr(-4), numeroCuenta.length, '*');
                        var tipoCuenta = Object.values(_this2.props.list[currency].productArrangement.Prod.InstCde)[0];

                        return React.createElement(
                            'div',
                            { className: 'container pl-0' },
                            React.createElement(
                                'div',
                                { className: 'form-row align-items-center', key: name + currency + 'div' },
                                React.createElement(
                                    'div',
                                    { className: 'col-1 float-left text-left' },
                                    React.createElement('input', {
                                        type: 'radio',
                                        className: className,
                                        name: name,
                                        id: name + currency,
                                        value: currency,
                                        key: name + currency + 'input',
                                        onClick: _this2._handleOnChange })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-4 float-left text-left' },
                                    React.createElement(
                                        'label',
                                        {
                                            htmlFor: name + currency,
                                            key: name + currency + 'label' },
                                        React.createElement(
                                            'b',
                                            null,
                                            _this2._handleTipo(tipoCuenta)
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-5 float-left text-left' },
                                    React.createElement(
                                        'label',
                                        {
                                            htmlFor: name + currency,
                                            key: name + currency + 'label' },
                                        detail
                                    )
                                )
                            )
                        );
                    }
                });
                return route;
            }
        }, {
            key: 'render',
            value: function render() {
                var _props2 = this.props,
                    className = _props2.className,
                    id = _props2.id,
                    name = _props2.name,
                    otherEnabled = _props2.otherEnabled,
                    otherLabel = _props2.otherLabel,
                    checked = _props2.checked;


                return React.createElement(
                    React.Fragment,
                    null,
                    this._renderCurrencies(),
                    otherEnabled ? React.createElement(
                        'div',
                        { className: 'container pl-0' },
                        React.createElement(
                            'div',
                            { className: 'form-row align-items-center' },
                            React.createElement(
                                'div',
                                { className: 'col-1 float-left text-left' },
                                React.createElement('input', { type: 'radio',
                                    className: className,
                                    name: name,
                                    id: name + 'other',
                                    key: name + 'other',
                                    value: 'other',
                                    checked: checked,
                                    onClick: this._handleOnChange })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-11 float-left text-left' },
                                React.createElement(
                                    'label',
                                    { htmlFor: name + 'other' },
                                    React.createElement(
                                        'b',
                                        null,
                                        otherLabel
                                    )
                                )
                            )
                        )
                    ) : ''
                );
            }
        }]);

        return RadioGroupAccountExt;
    }(React.Component);

    return RadioGroupAccountExt;
});