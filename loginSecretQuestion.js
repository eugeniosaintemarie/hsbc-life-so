var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/dropdownContainer", "../common/loader", "../common/errormessage", "../controller/loginController"], function (React, InputValidation, DropdownContainer, Loader, Errormessage, LoginController) {
    var LoginChangePass = function (_React$Component) {
        _inherits(LoginChangePass, _React$Component);

        function LoginChangePass(props) {
            _classCallCheck(this, LoginChangePass);

            var _this = _possibleConstructorReturn(this, (LoginChangePass.__proto__ || Object.getPrototypeOf(LoginChangePass)).call(this, props));

            _this._handleResults = function (id, result) {
                _this.setState(_defineProperty({}, id, result));
                _this.props.onResult(id, result);
            };

            _this.state = {
                question: {},
                anwser: {},

                listQuestions: [],
                txtError: ''
            };
            return _this;
        }

        _createClass(LoginChangePass, [{
            key: "render",
            value: function render() {
                var _state = this.state,
                    question = _state.question,
                    anwser = _state.anwser;

                var submitDisabled = (typeof question.value != '' ? false : true) || (typeof anwser.isValidate !== "undefined" && anwser.isValidate ? false : true) || this.props.isSubmitting;

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "form-container" },
                        React.createElement(
                            "h5",
                            { className: "form-title" },
                            "Primer Ingreso"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Validaci\xF3n de datos de acceso - Paso 1 de 2"
                        ),
                        React.createElement(
                            "form",
                            { noValidate: true, onSubmit: this.props.onSubmit },
                            React.createElement(
                                "div",
                                { className: "form-group row align-items-center" },
                                React.createElement(
                                    "label",
                                    {
                                        htmlFor: "question",
                                        className: "col-md-3 col-form-label text-md-left" },
                                    "Pregunta Secreta:"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-8" },
                                    React.createElement(DropdownContainer, {
                                        dataList: this.state.listQuestions,
                                        className: "input-background-color form-control",
                                        id: "question",
                                        name: "question",
                                        idObject: "id",
                                        nameObject: "PREGUNTA",
                                        onResult: this._handleResults })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "form-group row align-items-center" },
                                React.createElement(
                                    "label",
                                    {
                                        htmlFor: "anwser",
                                        className: "col-md-3 col-form-label text-md-left" },
                                    "Respuesta:"
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-8" },
                                    React.createElement(InputValidation, {
                                        id: "anwser",
                                        name: "anwser",
                                        type: "text",
                                        minLength: "0",
                                        maxLength: "100",
                                        requiredStr: "Password requerido",
                                        className: "form-control",
                                        onResult: this._handleResults })
                                ),
                                React.createElement(
                                    "p",
                                    { style: { marginLeft: "10px" }, className: "font-italic text-danger" },
                                    React.createElement(
                                        "small",
                                        null,
                                        "Ten\xE9 en cuenta que se considerar\xE1n may\xFAsculas y min\xFAsculas en tu respuesta."
                                    )
                                )
                            ),
                            React.createElement(Errormessage, { className: "text-danger text-center", show: this.state.txtError == '' ? false : true, text: this.state.txtError }),
                            React.createElement(
                                "div",
                                { className: "col-md-4 offset-md-8 " },
                                this.props.isSubmitting && React.createElement(Loader, null),
                                React.createElement(
                                    "button",
                                    {
                                        type: "submit",
                                        id: "btn-submit",
                                        disabled: submitDisabled,
                                        className: "btn btn-primary btn-hsbc " + (submitDisabled ? "disabled" : "") },
                                    this.props.isSubmitting ? "Ingresando" : "Ingresar"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "form-container" },
                        React.createElement(
                            "h5",
                            { className: "form-title" },
                            "\xBFNuevo en HSBC Seguros On line?"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-4 offset-md-4" },
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary btn-hsbc", onClick: this.props.register },
                                "Registrar"
                            )
                        ),
                        React.createElement(
                            "a",
                            {
                                href: "#",
                                className: "btn btn-link link",
                                onClick: this.props.knowMore },
                            "Conoce m\xE1s"
                        )
                    )
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                var controller = new LoginController();
                controller.getQuestions(function (data) {
                    _this2.setState({
                        listQuestions: data
                    });
                });
            }
        }]);

        return LoginChangePass;
    }(React.Component);

    return LoginChangePass;
});