var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../common/inputvalidation", "../services/segurosOnlineService", "../redux/store", "../common/modalReactBootstrap"], function (React, UserService, InputValidation, SegurosOnlineService, Store, ModalReactBootstrap) {
  var MisDatos = function (_React$Component) {
    _inherits(MisDatos, _React$Component);

    function MisDatos(props) {
      _classCallCheck(this, MisDatos);

      var _this = _possibleConstructorReturn(this, (MisDatos.__proto__ || Object.getPrototypeOf(MisDatos)).call(this, props));

      _this.FORM_NAME = "MisDatos";

      _this._handleResults = function (id, result) {
        var data = _defineProperty({}, id, result);
        var form1 = Object.keys(_this.state.form1);
        var form2 = Object.keys(_this.state.form2);
        form1 = form1.find(function (el) {
          return el === id;
        });
        form2 = form2.find(function (el) {
          return el === id;
        });
        if (typeof form1 !== "undefined") {
          var current = _this.state;
          var old = _this.state.form1;
          _this.setState(Object.assign({}, current, {
            form1: Object.assign({}, old, data)
          }));
        }
        if (typeof form2 !== "undefined") {
          var _current = _this.state;
          var _old = _this.state.form2;
          _this.setState(Object.assign({}, _current, {
            form2: Object.assign({}, _old, data)
          }));
        }
      };

      _this._handleChanges = function () {
        var _this$state$form = _this.state.form1,
            confirmAnswer = _this$state$form.confirmAnswer,
            newAnswer = _this$state$form.newAnswer,
            personalQuestion = _this$state$form.personalQuestion;
        var user = _this.state.user;

        var segurosOnlineService = new SegurosOnlineService();

        if (confirmAnswer && newAnswer && confirmAnswer.value === newAnswer.value) {
          segurosOnlineService.sendActualizarDatos({
            "PREGUNTA": parseInt(personalQuestion),
            "RESPUESTA": newAnswer.value
          }).then(function (resp) {
            var content = '';
            _this.setState({
              showErrorAnswers: false,
              errorAnswers: ''
            });

            if (resp.ESTADO && resp.ESTADO === 'SUCCESS') {
              _this.setState({
                showErrorAnswers: false,
                form1: { newAnswer: "", confirmAnswer: "" }
              });
              _this.componentWillMount();
              content = 'Los datos se guardaron exitosamente.';
            } else {
              content = 'Ha sucedido un error. Intentelo nuevamente m&aacute;s tarde.';
            }

            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: content,
                html: true,
                title: "Datos personales",
                size: "md"
              }
            });
          });
        } else if (confirmAnswer.value !== newAnswer.value) {
          _this.setState({
            showErrorAnswers: true,
            errorAnswers: 'La nueva respuesta y su confirmación no coinciden.'
          });
        } else {
          _this.setState({
            showErrorAnswers: true,
            errorAnswers: 'Ingrese correctamente los datos.'
          });
        }
      };

      _this._handleChangePassword = function () {
        var _this$state$form2 = _this.state.form2,
            newPassword = _this$state$form2.newPassword,
            confirmNewPassword = _this$state$form2.confirmNewPassword,
            currentPassword = _this$state$form2.currentPassword;
        var user = _this.state.user;

        var segurosOnlineService = new SegurosOnlineService();

        if (newPassword && confirmNewPassword && confirmNewPassword.value === newPassword.value) {
          segurosOnlineService.sendActualizarContrasenia({
            "PASSWORD": newPassword.value,
            "PASSWORDV": currentPassword.value
          }).then(function (resp) {

            var content = '';

            if (resp === 'OK') {
              _this.setState({
                showErrorPasswd: false,
                form2: { currentPassword: "", newPassword: "", confirmNewPassword: "" }
              });

              content = 'Los datos se guardaron exitosamente.';
            } else if (resp === 'fail') {
              content = 'Ha sucedido un error. Intentelo nuevamente m&aacute;s tarde.';
            } else if (resp === 'password_invalidate') {
              content = "<div class=\"text-left\">\n              <p>La contrase\xF1a no cumple con las pol\xEDticas de seguridad.</p><p>\n              <b>1-</b> La contrase\xF1a debe tener al menos una letra en may\xFAscula. (<strong>H</strong>sbc12+)<br>\n              <b>2-</b> La contrase\xF1a debe tener al menos una letra en min\xFAscula. (HSBC<strong>x</strong>12+)<br>\n              <b>3-</b> La contrase\xF1a debe tener al menos un caracter especial. (Hsbc12<strong>+</strong>)<br>\n              <b>4-</b> La contrase\xF1a no puede tener m\xE1s de 2 n\xFAmeros consecutivos. (<s>Hsbc<strong>715+</strong></s>)<br>\n              <b>5-</b> La contrase\xF1a no puede contener m\xE1s de 2 letras iguales. (<s>Hsbc<strong>aaa+</strong></s>)</p>\n              <p>Ejemplo de contrase\xF1a v\xE1lida: <b>Hsbc12+</b></p></div>";
            }

            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: content,
                html: true,
                title: "Cambio de contraseña",
                size: "",
                dialogClassName: "contrasenia-modal"
              }
            });
          });
        } else if (confirmNewPassword.value !== newPassword.value) {
          _this.setState({
            showErrorPasswd: true,
            errorPasswd: 'La nueva contraseña y su confirmación no coinciden.'
          });
        } else {
          _this.setState({
            showErrorPasswd: true,
            errorPasswd: 'Ingrese correctamente los datos.'
          });
        }
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this.state = {
        showErrorAnswers: false,
        showErrorPasswd: false,
        showModalSuccess: false,
        form1: { personalQuestion: "", newAnswer: "", confirmAnswer: "" },
        form2: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false,
          dialogClassName: ""
        }
      };
      return _this;
    }

    _createClass(MisDatos, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _state = this.state,
            user = _state.user,
            preguntas = _state.preguntas,
            respPreg = _state.respPreg;
        var _state$form = this.state.form1,
            confirmAnswer = _state$form.confirmAnswer,
            newAnswer = _state$form.newAnswer;
        var _state$form2 = this.state.form2,
            currentPassword = _state$form2.currentPassword,
            newPassword = _state$form2.newPassword,
            confirmNewPassword = _state$form2.confirmNewPassword;

        var submitDisabled = (typeof newAnswer.isValidate !== "undefined" && newAnswer.isValidate ? false : true) || (typeof confirmAnswer.isValidate !== "undefined" && confirmAnswer.isValidate ? false : true) || this.props.isSubmitting;

        var submitDisabled2 = (typeof currentPassword.isValidate !== "undefined" && currentPassword.isValidate ? false : true) || (typeof newPassword.isValidate !== "undefined" && newPassword.isValidate ? false : true) || (typeof confirmNewPassword.isValidate !== "undefined" && confirmNewPassword.isValidate ? false : true) || this.props.isSubmitting;

        if (!user) {
          return React.createElement("div", null);
        } else {
          return React.createElement(
            "div",
            { className: "container remove-left-padding profile-container" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                { className: "panel offset-1 col-md-10" },
                React.createElement(
                  "div",
                  { className: "panel-title" },
                  React.createElement(
                    "h5",
                    null,
                    "Datos Personales"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "panel-container" },
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "estado" },
                        "Email"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement("input", {
                        className: "form-control",
                        value: user.MAIL,
                        disabled: true,
                        readOnly: true
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "pregunta-personal" },
                        "Pregunta personal"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(
                        "select",
                        {
                          name: "personalQuestion",
                          id: "personalQuestion",
                          className: "form-control",
                          onChange: function onChange(e) {
                            return _this2._handleResults('personalQuestion', e.target.value);
                          }
                        },
                        preguntas.map(function (pregunta) {
                          var isSelected = _this2.state.form1.personalQuestion == pregunta.id;

                          return React.createElement(
                            "option",
                            { value: pregunta.id, key: pregunta.id, selected: isSelected ? '"selected"' : '' },
                            pregunta.PREGUNTA
                          );
                        }, this)
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "mail" },
                        "Respuesta anterior"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement("input", {
                        type: "text",
                        name: "respuesta-anterior",
                        id: "respuesta-anterior",
                        className: "form-control",
                        disabled: "disabled",
                        value: respPreg.RESPUESTA
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "respuesta-nueva" },
                        "Respuesta nueva"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(InputValidation, {
                        id: "newAnswer",
                        name: "newAnswer",
                        type: "text",
                        minLength: "2",
                        maxLength: "50",
                        charactersStr: "",
                        className: "form-control",
                        onResult: this._handleResults,
                        value: newAnswer != "" ? newAnswer.value : ''
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "confirmacion-respuesta" },
                        "Confirmaci\xF3n de respuesta"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(InputValidation, {
                        id: "confirmAnswer",
                        name: "confirmAnswer",
                        type: "text",
                        minLength: "2",
                        maxLength: "50",
                        charactersStr: "",
                        className: "form-control",
                        onResult: this._handleResults,
                        value: confirmAnswer != "" ? confirmAnswer.value : ''
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "font-italic col text-right ml-3 text-danger" },
                    "Ten\xE9 en cuenta que se considerar\xE1n may\xFAsculas y min\xFAsculas en tu respuesta"
                  ),
                  this.state.showErrorAnswers && React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    this.state.errorAnswers,
                    React.createElement("br", null),
                    React.createElement("br", null)
                  ),
                  React.createElement(
                    "div",
                    { className: "panel-actions" },
                    React.createElement(
                      "button",
                      {
                        disabled: submitDisabled,
                        className: "btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleChanges
                      },
                      "Confirmar Cambios"
                    )
                  )
                )
              ),
              React.createElement("div", { className: "clearfix" }),
              React.createElement(
                "div",
                { className: "panel offset-1 col-md-10" },
                React.createElement(
                  "div",
                  { className: "panel-title" },
                  React.createElement(
                    "h5",
                    null,
                    "Cambio de Contrase\xF1a"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "panel-container" },
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "passwd-actual" },
                        "Contrase\xF1a actual"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(InputValidation, {
                        id: "currentPassword",
                        name: "currentPassword",
                        type: "password",
                        minLength: "6",
                        maxLength: "15",
                        requiredStr: "Password requerido",
                        className: "form-control",
                        onResult: this._handleResults,
                        value: currentPassword != "" ? currentPassword.value : ''
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "passwd-nevua" },
                        "Contrase\xF1a nueva"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(InputValidation, {
                        id: "newPassword",
                        name: "newPassword",
                        type: "password",
                        minLength: "6",
                        maxLength: "15",
                        requiredStr: "Nueva contrase\xF1a requerido",
                        className: "form-control",
                        onResult: this._handleResults,
                        value: newPassword != "" ? newPassword.value : ''
                      })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        { htmlFor: "passwdconfirmation" },
                        "Confirmar contrase\xF1a"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(InputValidation, {
                        id: "confirmNewPassword",
                        name: "confirmNewPassword",
                        type: "password",
                        minLength: "6",
                        maxLength: "15",
                        requiredStr: "confirmaci\xF3n requerido",
                        className: "form-control",
                        onResult: this._handleResults,
                        value: confirmNewPassword != "" ? confirmNewPassword.value : ''
                      })
                    )
                  ),
                  this.state.showErrorPasswd && React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    this.state.errorPasswd,
                    React.createElement("br", null),
                    React.createElement("br", null)
                  ),
                  React.createElement(
                    "div",
                    { className: "panel-actions" },
                    React.createElement(
                      "button",
                      {
                        disabled: submitDisabled2,
                        className: "btn btn-hsbc right " + (submitDisabled2 ? "disabled" : ""),
                        onClick: this._handleChangePassword
                      },
                      "Confirmar Cambios"
                    )
                  )
                )
              )
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModalSuccess,
              size: this.state.modal.size,
              isOpen: this._handleModalIsOpen,
              component: this.state.modal.component,
              html: this.state.modal.html,
              contentHTML: this.state.modal.contentHTML,
              dialogClassName: this.state.modal.dialogClassName
            })
          );
        }
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this3 = this;

        var userService = new UserService();
        var segurosOnlineService = new SegurosOnlineService();

        var _Store$getState = Store.getState(),
            auth = _Store$getState.auth;

        if ( /* auth.authorized */true) {
          userService.getLoggedUser().then(function (user) {
            segurosOnlineService.getObtenerPreguntas().then(function (preguntas) {
              segurosOnlineService.getObtenerPregResp().then(function (respPreg) {

                _this3.setState({
                  user: user,
                  preguntas: preguntas,
                  respPreg: respPreg,
                  form1: { personalQuestion: respPreg.PREGUNTA ? respPreg.PREGUNTA : preguntas[0].id, newAnswer: "", confirmAnswer: "" }
                });
              });
            });
          });
        }
      }
    }]);

    return MisDatos;
  }(React.Component);

  return MisDatos;
});