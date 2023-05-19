var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var ErrorBeneficiary = function (_React$Component) {
        _inherits(ErrorBeneficiary, _React$Component);

        function ErrorBeneficiary(props) {
            _classCallCheck(this, ErrorBeneficiary);

            var _this = _possibleConstructorReturn(this, (ErrorBeneficiary.__proto__ || Object.getPrototypeOf(ErrorBeneficiary)).call(this, props));

            _this._returnNoPep = function () {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'p',
                        null,
                        '\u201C\xA1Lo sentimos! No se puede realizar esta acci\xF3n por este medio. Por favor comun\xEDcate con nuestro centro de atenci\xF3n al cliente al 0800-333-0003 para realizar el mismo. \xA1Muchas gracias!"'
                    )
                );
            };

            _this._handleOnClick = function () {
                _this.props.switch('beneficiary');
            };

            _this._switchMsj = function () {
                var type = _this.props.type;

                switch (type) {
                    case 'noPep':
                        return _this._returnNoPep();
                }
            };

            _this.state = {};
            return _this;
        }

        _createClass(ErrorBeneficiary, [{
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

        return ErrorBeneficiary;
    }(React.Component);

    return ErrorBeneficiary;
});