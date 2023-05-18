var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var ErrorEndoso = function (_React$Component) {
        _inherits(ErrorEndoso, _React$Component);

        function ErrorEndoso(props) {
            _classCallCheck(this, ErrorEndoso);

            var _this = _possibleConstructorReturn(this, (ErrorEndoso.__proto__ || Object.getPrototypeOf(ErrorEndoso)).call(this, props));

            _this._returnError = function () {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Error en el sistema, por favor intente m\xE1s tarde. Si su problema persiste comunicarse con el centro de atenci\xF3n al cliente 0800-333-0003'
                    )
                );
            };

            _this._returnNoAvailable = function () {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'La p\xF3liza no esta encuentra disponible para realizar endosos. Por favor comunicarse con el centro de atenci\xF3n al cliente 0800-333-0003 para realizar el mismo.'
                    )
                );
            };

            _this._returnUserNoAvailable = function () {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        'Su usuario no se encuentra habilitado a realizar endosos. A continuaci\xF3n de detallan formularios a completar para realizar el cambio. Por favor comunicarse con el call center N\xB0 0800-333-0003 para continuar con el mismo.'
                    ),
                    React.createElement(
                        'p',
                        { className: 'text-danger' },
                        'Descargar ',
                        React.createElement('br', null),
                        'Formulario de cambio de benefiiario.pdfs'
                    )
                );
            };

            _this._handleOnClick = function () {
                _this.props.handleShowEndoso();
            };

            _this._switchMsj = function () {
                var type = _this.props.type;

                switch (type) {
                    case 'error':
                        return _this._returnError();
                    case 'noAvailable':
                        return _this._returnNoAvailable();
                    case 'userNoAvailable':
                        return _this._returnUserNoAvailable();
                }
            };

            _this.state = {};
            return _this;
        }

        _createClass(ErrorEndoso, [{
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    null,
                    this._switchMsj(),
                    React.createElement(
                        'div',
                        { className: 'container' },
                        React.createElement(
                            'div',
                            { className: 'row justify-content-center' },
                            React.createElement(
                                'div',
                                { className: 'col-12' },
                                React.createElement(
                                    'div',
                                    { className: 'text-center' },
                                    React.createElement(
                                        'button',
                                        {
                                            className: 'btn btn-dark  m-2 p-1 pr-2 pl-2',
                                            type: 'button',
                                            onClick: this._handleOnClick },
                                        'Continuar'
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return ErrorEndoso;
    }(React.Component);

    return ErrorEndoso;
});