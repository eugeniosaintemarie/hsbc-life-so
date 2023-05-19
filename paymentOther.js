'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../../../common/inputvalidation', '../../../common/inputMaskValidation', '../../../common/dropdownContainer', '../../../controller/endososController'], function (React, ReactDOM, InputValidation, InputMaskValidation, DropdownContainer, EndososController) {
    var PaymentOther = function (_React$Component) {
        _inherits(PaymentOther, _React$Component);

        function PaymentOther() {
            _classCallCheck(this, PaymentOther);

            var _this = _possibleConstructorReturn(this, (PaymentOther.__proto__ || Object.getPrototypeOf(PaymentOther)).call(this));

            _this._handleResults = function (id, result) {
                _this.props.onResult(id, result);
            };

            _this.state = {
                listTarj: {}
            };
            return _this;
        }

        _createClass(PaymentOther, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'div',
                        { className: 'row mt-3 ' },
                        React.createElement(
                            'div',
                            { className: 'col-5 offset-1' },
                            React.createElement(
                                'label',
                                { htmlFor: 'creditcardnumber' },
                                'N\xFAmero de tarjeta'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-6 pl-0' },
                            React.createElement(InputValidation, {
                                id: 'creditcardnumber',
                                name: 'creditcardnumber',
                                minLength: '16',
                                maxLength: '16',
                                requiredStr: 'Nro. de tarjeta requerido',
                                charactersStr: 'El nro. de tarjeta debe tener 16 caracteres',
                                className: 'input-background-color form-control',
                                onResult: this._handleResults,
                                onKeyPress: function onKeyPress(e) {
                                    if (isNaN(e.key)) {
                                        e.preventDefault();
                                    }
                                },
                                upperCase: true })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row mt-3' },
                        React.createElement(
                            'div',
                            { className: 'col-5 offset-1' },
                            React.createElement(
                                'label',
                                { htmlFor: 'creditcardnumber' },
                                'Marca'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-6 pl-0' },
                            React.createElement(DropdownContainer, {
                                dataList: this.state.listTarj,
                                className: 'input-background-color form-control',
                                id: 'brand',
                                name: 'brand',
                                idObject: 'COD_TAR',
                                nameObject: 'DES_TAR',
                                onResult: this._handleResults })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row mt-3' },
                        React.createElement(
                            'div',
                            { className: 'col-5 offset-1' },
                            React.createElement(
                                'label',
                                { htmlFor: 'creditcardnumber' },
                                'Fecha de vencimiento'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-6 pl-0' },
                            React.createElement(InputValidation, {
                                id: 'expirationDate',
                                name: 'expirationDate',
                                mask: '99/9999',
                                requiredStr: 'Fecha de Expiracion requerida',
                                charactersStr: '',
                                className: 'input-background-color form-control',
                                onResult: this._handleResults,
                                onKeyPress: function onKeyPress(e) {
                                    if (isNaN(e.key)) {
                                        e.preventDefault();
                                    }
                                },
                                upperCase: true })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-10 mt-3 offset-2' },
                            React.createElement(
                                'div',
                                { className: 'custom-control custom-checkbox d-inline' },
                                React.createElement('input', { type: 'checkbox',
                                    className: 'custom-control-input',
                                    id: 'permission',
                                    name: 'permission',
                                    onClick: function onClick(e) {
                                        e ? _this2._handleResults(e.target.id, e.target.checked) : '';
                                    }, required: true }),
                                React.createElement(
                                    'label',
                                    { className: 'custom-control-label',
                                        htmlFor: 'permission' },
                                    'Declaro que la tarjeta ingresada corresponde al tomador de la p\xF3liza'
                                )
                            )
                        )
                    )
                );
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this3 = this;

                var controllerEndosos = new EndososController();
                controllerEndosos.getTarjetas(function (data) {
                    _this3.setState({
                        listTarj: data
                    });
                });
            }
        }]);

        return PaymentOther;
    }(React.Component);

    return PaymentOther;
});