var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/loader"], function (React, InputValidation, Loader) {
  var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm(props) {
      _classCallCheck(this, LoginForm);

      var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
        _this.props.onResult(id, result);
      };

      _this.state = {
        email: {},
        password: {}
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
            { className: "form-container" },
            React.createElement(
              "h5",
              { className: "form-title", id: "titleLogin" },
              "Ingreso a HSBC Seguros On line"
            ),
            React.createElement(
              "p",
              { id: "typeBrowser" },
              "Utilizar este sitio con Chrome, FireFox o Safari"
            ),
            React.createElement(
              "form",
              { noValidate: true, onSubmit: this.props.onSubmit },
              React.createElement(
                "div",
                { className: "form-group offset-1" },
                React.createElement(
                  "div",
                  { className: "w-100" },
                  React.createElement(
                    "label",
                    {
                      htmlFor: "email",
                      className: "col-md-2 col-form-label text-md-right" },
                    "Email"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-11" },
                  React.createElement(InputValidation, {
                    id: "email",
                    name: "email",
                    type: "email",
                    minLength: "5",
                    autoFocus: true,
                    maxLength: "50",
                    requiredStr: "Email requerido",
                    charactersStr: "",
                    invalidStr: "El campo no tiene formato de correo",
                    className: "input-background-color form-control",
                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                    onResult: this._handleResults })
                )
              ),
              React.createElement(
                "div",
                { className: "form-group offset-1" },
                React.createElement(
                  "div",
                  { className: "w-100" },
                  React.createElement(
                    "label",
                    {
                      htmlFor: "password",
                      className: "col-md-3 col-form-label text-md-right" },
                    "Contrase\xF1a"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-11" },
                  React.createElement(InputValidation, {
                    id: "password",
                    name: "password",
                    type: "password",
                    minLength: "6",
                    maxLength: "15",
                    requiredStr: "Password requerido",
                    className: "form-control",
                    onResult: this._handleResults })
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-5 offset-7 offset-sm-9 offset-md-6 offset-lg-8 pl-0" },
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
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "a",
                  {
                    href: "#",
                    className: "btn btn-link link p-0 mt-3",
                    onClick: this.props.forgetPassword },
                  "\xBFOlvidaste tu contrase\xF1a?"
                )
              ),
              React.createElement(
                "div",
                { className: "small" },
                "\xBFNuevo en HSBC Seguros Online?",
                React.createElement(
                  "a",
                  {
                    type: "submit",
                    className: "btn btn-link link p-1",
                    onClick: this.props.register },
                  "Registrar"
                )
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "a",
                  {
                    href: "#",
                    className: "btn btn-link link p-0",
                    onClick: this.props.knowMore },
                  "Conoce m\xE1s"
                )
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