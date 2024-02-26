var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputValidationImage", "../common/loader"], function (React, InputValidationImage, Loader) {
  var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm(props) {
      _classCallCheck(this, LoginForm);

      var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
        _this.props.onResult(id, result);
      };

      _this._handleView = function () {
        _this.setState({ setActive: !_this.state.setActive });
      };

      _this._handleOnClickEmail = function () {
        _this.setState({ viewKeyboardEmail: true && _this.state.keyboardOpen, viewKeyboardPassword: false });
      };

      _this._handleOnClickPassword = function () {
        _this.setState({ viewKeyboardEmail: false, viewKeyboardPassword: true && _this.state.keyboardOpen });
      };

      _this._handleOpenKeyboard = function () {
        _this.setState({ viewKeyboardEmail: !_this.state.viewKeyboardEmail, viewKeyboardPassword: false, keyboardOpen: !_this.state.keyboardOpen });
      };

      _this.state = {
        email: {},
        password: {},
        setActive: false,
        layoutName: "default",
        input: "",
        viewKeyboardEmail: false,
        viewKeyboardPassword: false,
        keyboardOpen: false
      };

      return _this;
    }

    _createClass(LoginForm, [{
      key: "render",
      value: function render() {
        var _state = this.state,
            email = _state.email,
            password = _state.password;

        var submitDisabled = (typeof email.isValidate !== "undefined" && email.isValidate ? false : true) || (typeof password.isValidate !== "undefined" && password.isValidate ? false : true) || this.props.isSubmitting;

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "hsbc-title-step offset-1" },
            " Paso 1"
          ),
          React.createElement(
            "h2",
            { className: "hsbc-subtitle" },
            "Inici\xE1 sesi\xF3n ingresando tus datos:"
          ),
          React.createElement("div", { className: "hsbc-divider" }),
          React.createElement(
            "form",
            { noValidate: true, onSubmit: this.props.onSubmit },
            React.createElement(
              "div",
              { className: "offset-1" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  {
                    htmlFor: "email",
                    className: "col-form-label smallFont text-md-right" },
                  "Email"
                )
              ),
              React.createElement(
                "div",
                { onClick: this._handleOnClickEmail },
                React.createElement(InputValidationImage, {
                  id: "email",
                  name: "email",
                  type: "email",
                  minLength: "5",
                  autoFocus: true,
                  value: this.state.email.value,
                  viewKeyboard: this.state.viewKeyboardEmail,
                  onMemory: this.handleChange,
                  maxLength: "50",
                  requiredStr: "Email requerido",
                  charactersStr: "",
                  invalidStr: "El campo no tiene formato de correo",
                  className: "hsbc-input d-flex",
                  pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                  onResult: this._handleResults,
                  src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_email%20(1).svg",
                  alt: "Icon" })
              )
            ),
            React.createElement(
              "div",
              { className: "offset-1" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "label",
                  {
                    htmlFor: "password",
                    className: "col-form-label smallFont text-md-right" },
                  "Contrase\xF1a"
                )
              ),
              React.createElement(
                "div",
                { onClick: this._handleOnClickPassword },
                React.createElement(InputValidationImage, {
                  id: "password",
                  name: "password",
                  type: this.state.setActive ? "" : "password",
                  minLength: "6",
                  maxLength: "15",
                  value: this.state.password.value,
                  viewKeyboard: this.state.viewKeyboardPassword,
                  onMemory: this.handleChange,
                  requiredStr: "Password requerido",
                  className: "hsbc-input d-flex",
                  onResult: this._handleResults,
                  src: this.state.setActive ? "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_ojo1.svg" : "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_ojo2.svg",
                  alt: "Icon",
                  onClick: this._handleView })
              )
            ),
            React.createElement("p", null),
            React.createElement(
              "div",
              { className: "d-flex loginPadding" },
              React.createElement(
                "div",
                null,
                React.createElement("img", { className: "iconWidth", src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_signo_preg.svg", alt: "Icon" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "u",
                  {
                    href: "#",
                    type: "submit",
                    className: "hsbc-text-help-red",
                    onClick: this.props.forgetPassword },
                  "\xBFOlvidaste tu contrase\xF1a?"
                )
              )
            ),
            React.createElement("p", null),
            React.createElement(
              "div",
              { className: "loginPadding d-flex" },
              React.createElement(
                "div",
                null,
                React.createElement("img", { className: "iconWidth", src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_lapiz.svg", alt: "Icon" })
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "u",
                  {
                    type: "submit",
                    className: "hsbc-text-help-red",
                    onClick: this.props.register },
                  "\xBFNo est\xE1s registrado? Registrate ahora"
                )
              )
            ),
            React.createElement("p", null),
            React.createElement(
              "div",
              { className: "col-md-5 offset-1 pl-0" },
              this.props.isSubmitting && React.createElement(Loader, null),
              React.createElement(
                "button",
                {
                  type: "submit",
                  id: "btn-submit",
                  disabled: submitDisabled,
                  className: "btn hsbc-btn-red " + (submitDisabled ? "disabled" : "") },
                this.props.isSubmitting ? "Iniciando sesion" : "Iniciar sesión"
              )
            )
          )
        );
      }
    }]);

    return LoginForm;
  }(React.Component);

  return LoginForm;
});