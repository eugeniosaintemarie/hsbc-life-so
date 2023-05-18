var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../../../lib/utils'], function (React, ReactDOM, Utils) {
    var RadioGroupAccount = function (_React$Component) {
        _inherits(RadioGroupAccount, _React$Component);

        function RadioGroupAccount(props) {
            _classCallCheck(this, RadioGroupAccount);

            var _this = _possibleConstructorReturn(this, (RadioGroupAccount.__proto__ || Object.getPrototypeOf(RadioGroupAccount)).call(this, props));

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

        _createClass(RadioGroupAccount, [{
            key: '_handleMarca',
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
            key: '_renderCurrencies',
            value: function _renderCurrencies() {
                var _this2 = this;

                var _props = this.props,
                    name = _props.name,
                    className = _props.className;


                var detail = void 0;
                var route = Object.keys(this.props.list).map(function (currency) {

                    if (Object.values(_this2.props.list[currency].productArrangement.Prod.InstCde)[0] == 'TC') {
                        var plastico = _this2.props.list[currency].productAdditionalInfo.creditCardInfo.creditCardNumber["#text"];
                        detail = Utils.zfill(plastico.substr(-4), plastico.length, '*');

                        var marca = _this2.props.list[currency].productArrangement.FinSvceArr.AcctIntTrnsfNum.AcctSfxNum["#text"];

                        return React.createElement(
                            'div',
                            { className: 'form-row', key: currency + 'div' },
                            React.createElement(
                                'div',
                                { className: 'col-6 float-left text-center' },
                                React.createElement('input', {
                                    type: 'radio',
                                    className: className,
                                    name: name,
                                    id: name + currency,
                                    value: currency,
                                    key: currency + 'input',
                                    onClick: _this2._handleOnChange })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-6 float-left' },
                                React.createElement(
                                    'label',
                                    {
                                        htmlFor: name + currency,
                                        key: currency + 'label' },
                                    React.createElement(
                                        'b',
                                        null,
                                        _this2._handleMarca(marca)
                                    ),
                                    ' ',
                                    detail
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
                    otherLabel = _props2.otherLabel;


                return React.createElement(
                    React.Fragment,
                    null,
                    this.props.list != 'empty' ? this._renderCurrencies() : '',
                    otherEnabled ? React.createElement(
                        'div',
                        { className: 'form-row' },
                        React.createElement(
                            'div',
                            { className: 'col-6 float-left text-center' },
                            React.createElement('input', { type: 'radio',
                                className: className,
                                name: name,
                                id: name + 'other',
                                key: name + 'other',
                                value: 'other',
                                onClick: this._handleOnChange })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-6 float-left' },
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
                    ) : ''
                );
            }
        }]);

        return RadioGroupAccount;
    }(React.Component);

    return RadioGroupAccount;
});