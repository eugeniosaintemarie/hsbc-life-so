var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var ValidityErrorScreen = function (_React$Component) {
        _inherits(ValidityErrorScreen, _React$Component);

        function ValidityErrorScreen(props) {
            _classCallCheck(this, ValidityErrorScreen);

            var _this = _possibleConstructorReturn(this, (ValidityErrorScreen.__proto__ || Object.getPrototypeOf(ValidityErrorScreen)).call(this, props));

            _this._handleOnClick = function () {
                _this.props.switch("home");
            };

            return _this;
        }

        _createClass(ValidityErrorScreen, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "h4",
                        { className: "subtitle-inside" },
                        "Lo sentimos!"
                    ),
                    React.createElement(
                        "div",
                        { className: "container remove-left-padding profile-container" },
                        React.createElement(
                            "div",
                            { className: "col-12 mt-4" },
                            React.createElement(
                                "div",
                                { className: "form-group row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    React.createElement(
                                        "div",
                                        { className: "text-justify" },
                                        React.createElement(
                                            "label",
                                            null,
                                            this.props.cobroforError ? "No se puede ingresar una nómina con esta frecuencia de facturacion" : "No se puede ingresar una nómina con las condiciones de esta póliza"
                                        ),
                                        React.createElement(
                                            "label",
                                            null,
                                            "Por favor comun\xEDcate con tu ejecutivo de cuentas para poder realizar la carga."
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group row text-center mt-5" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-12" },
                                    React.createElement(
                                        "button",
                                        { onClick: this._handleOnClick, className: "btn btn-light" },
                                        "Volver"
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return ValidityErrorScreen;
    }(React.Component);

    return ValidityErrorScreen;
});