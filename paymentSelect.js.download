'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './radioGroupAccount', "../../../controller/endososController"], function (React, ReactDOM, RadioGroupAccount, EndososController) {
    var PaymentSelect = function (_React$Component) {
        _inherits(PaymentSelect, _React$Component);

        function PaymentSelect() {
            _classCallCheck(this, PaymentSelect);

            var _this = _possibleConstructorReturn(this, (PaymentSelect.__proto__ || Object.getPrototypeOf(PaymentSelect)).call(this));

            _this._handleResultsDropDown = function (id, result) {
                _this.setState(_defineProperty({}, id, result));
                _this.props.onResult(id, result);
            };

            _this._handleResultsRadio = function (result) {
                _this.props.onResult('pmSelected', result);
            };

            _this._handleChange = function (event) {
                _this.setState({ paymentMethod: event.target.value });
                _this.props.onResult('method', event.target.value);
            };

            _this.state = {
                paymentMethod: 'cardCredit',
                listRadio: [],
                apiMsg: 'Buscando Tarjetas HSBC…',
                apiCalled: false
            };
            return _this;
        }

        _createClass(PaymentSelect, [{
            key: '_getRadioButton',
            value: function _getRadioButton() {
                if (this.state.apiCalled) {
                    if (Array.isArray(this.state.listRadio) && this.state.listRadio.some(function (card) {
                        return card.productArrangement.Prod.InstCde['#text'] == "TC";
                    })) {
                        return React.createElement(
                            React.Fragment,
                            null,
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'form-row' },
                                React.createElement(
                                    'div',
                                    { className: 'col-6 text-center' },
                                    'Seleccione'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-6' },
                                    'Tarjeta de cr\xE9dito'
                                )
                            ),
                            React.createElement('br', null),
                            React.createElement(
                                'div',
                                { className: 'form-row ' },
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(RadioGroupAccount, {
                                        list: this.state.listRadio,
                                        className: 'input-background-color',
                                        id: 'pmSelected',
                                        name: 'pmSelected',
                                        onResult: this._handleResultsRadio,
                                        otherEnabled: false,
                                        otherLabel: 'Ingresar una tarjeta no listada'
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-md-12' },
                                    React.createElement(
                                        'label',
                                        null,
                                        React.createElement('br', null),
                                        'Si deseas utilizar una tarjeta distinta a las listadas, comunicate con el centro de atenci\xF3n al cliente al 0800-333-0003.',
                                        React.createElement('br', null),
                                        React.createElement('br', null),
                                        'Muchas gracias'
                                    )
                                )
                            )
                        );
                    }
                }

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'div',
                        { className: '' },
                        React.createElement(
                            'div',
                            { className: 'col-6 text-center' },
                            'Seleccione'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-6' },
                            'Tarjeta de cr\xE9dito'
                        )
                    ),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('br', null),
                        React.createElement(
                            'div',
                            { className: 'col-6  offset-md-6' },
                            this.state.apiMsg
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-md-12' },
                        React.createElement(
                            'label',
                            null,
                            React.createElement('br', null),
                            'Si deseas utilizar una tarjeta distinta a las listadas, comunicate con el centro de atenci\xF3n al cliente al 0800-333-0003.',
                            React.createElement('br', null),
                            React.createElement('br', null),
                            'Muchas gracias'
                        )
                    )
                );
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    this._getRadioButton()
                );
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                var controllerEndosos = new EndososController();
                controllerEndosos.getDatosFinancieros(function (data) {
                    _this2.setState({
                        listRadio: data,
                        apiMsg: 'No se encontraron tarjetas HSBC',
                        apiCalled: true
                    });
                });
            }
        }]);

        return PaymentSelect;
    }(React.Component);

    return PaymentSelect;
});