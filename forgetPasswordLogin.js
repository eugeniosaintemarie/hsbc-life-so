var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/dialogPregunta2", "../common/dropdownContainer", "../common/errormessage", "../common/loader", "../controller/loginController"], function (React, InputValidation, DialogPregunta2, DropdownContainer, Errormessage, Loader, LoginController) {
  var forgetPasswordLogin = function (_React$Component) {
    _inherits(forgetPasswordLogin, _React$Component);

    function forgetPasswordLogin(props) {
      _classCallCheck(this, forgetPasswordLogin);

      var _this = _possibleConstructorReturn(this, (forgetPasswordLogin.__proto__ || Object.getPrototypeOf(forgetPasswordLogin)).call(this, props));

      _this._handleResults = function (id, result) {
        var _this$setState;

        _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, "txtError", ''), _this$setState));
      };

      _this._handleButton = function () {
        var _this$state = _this.state,
            typeDoc = _this$state.typeDoc,
            nroDoc = _this$state.nroDoc,
            email = _this$state.email,
            answerPersonal = _this$state.answerPersonal;

        _this.loginController.recoveryPassword(typeDoc.id, nroDoc.value, email.value, answerPersonal.value, function (data) {
          if (data == 'DATOSINVALIDOS') {
            if (_this.state.respuestaInputLabel == "Respuesta") {
              _this.setState({
                txtError: 'Los datos ingresados no coinciden con los registrados en la compañía. Por favor verificá los mismos o comunicate con nuestro centro de atención al cliente.'
              });
            } else {
              _this.setState({
                txtError: 'El dato ingresado no es el correcto. Por favor validá con el tomador de tu póliza y volve a intentar o escribinos a : reseteodepassword@hsbc.com.ar y te brindaremos asistencia.'
              });
            }
          } else if (data == 'OK') {
            _this.props.close();
            _this.props.responseModal();
          } else {
            _this.setState({
              txtError: 'Ha ocurrido un error.'
            });
          }
        }, _this.state.respuestaInputLabel);
      };

      _this._handleResultQuestion = function (id, result) {
        if (typeof _this.state.email.value !== 'undefined' && _this.state.email.value != '' && _this.state.email.isValidate) {
          _this._handleResults(id, result);
          _this.setState({ loader: true });
          _this.loginController.getQuestion(_this.state.email.value, _this.state.nroDoc.value, _this.state.typeDoc.id, function (callback) {
            var result = callback.result;
            switch (result) {

              case "OK":
                _this.setState({ question: callback.pregunta });
                _this.setState({ questionPersonal: false, preguntaTitle: "Pregunta Personal", respuestaInputLabel: "Respuesta" });
                break;

              case "ERROR":
                _this.setState({ questionPersonal: true });
                _this.setState({
                  txtError: 'Si sos asegurado de una póliza colectiva intentá ingresar el CUIL'
                });
                break;

              case "NOMINP":
                _this.setState({ questionPersonal: false,
                  preguntaString: "un dato perteneciente a tu empleador.",
                  respuestaInputLabel: "CUIT del empleador",
                  questionPattern: "[0-9]{4,90}",
                  questionMinLength: "11",
                  questionMaxLength: "11"
                });
                break;

              default:
                _this.setState({ questionPersonal: true });
                _this.setState({
                  txtError: 'Los datos ingresados no se encuentran registrados en Seguros Online. Por favor corroborá que el mail y documento ingresado sean los correctos.'
                });
                break;
            }

            _this.setState({ loader: false });
          });
        }
      };

      _this._enableButton = function () {
        var answerPersonal = _this.state.answerPersonal;

        if (answerPersonal.isValidate) {
          return false;
        }
        return true;
      };

      _this.handleLoader = function (e) {
        e.currentTarget.id == "boton" ? React.createElement(Loader, { width: "2rem", height: "2rem" }) : "";
      };

      _this.state = {
        email: {},
        typeDoc: {},
        nroDoc: {},
        questionPersonal: true,
        loader: false,
        answerPersonal: {},
        question: "",
        listTipoDoc: [],
        questionWS: '',
        txtError: '',
        preguntaTitle: "",
        preguntaString: "",
        respuestaInputLabel: "",
        questionPattern: "[A-Za-z0-9_/]{4,90}",
        questionMinLength: "0",
        questionMaxLength: "50"
      };

      _this.loginController = new LoginController();
      return _this;
    }

    _createClass(forgetPasswordLogin, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "p",
            null,
            "Para poder generar una nueva contrase\xF1a es necesario que ingreses ",
            this.state.preguntaString
          ),
          this.state.questionPersonal && React.createElement(Loader, null) ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "row align-items-center m-2" },
              React.createElement(
                "div",
                { className: "col-5 col-lg-3" },
                React.createElement(
                  "label",
                  {
                    className: "form-check-label",
                    htmlFor: "email" },
                  "E-mail"
                )
              ),
              React.createElement(
                "div",
                { className: "col-6 col-lg-4 col-xl-3" },
                React.createElement(InputValidation, {
                  id: "email",
                  name: "email",
                  minLength: "5",
                  maxLength: "50",
                  requiredStr: "Email requerido",
                  invalidStr: "El campo no tiene formato de correo",
                  charactersStr: "",
                  pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                  className: "input-background-color form-control w-100 ",
                  onResult: this._handleResults })
              )
            ),
            React.createElement(
              "div",
              { className: "row align-items-center m-2" },
              React.createElement(
                "div",
                { className: "col-5 col-lg-3" },
                React.createElement(
                  "label",
                  {
                    className: "form-check-label",
                    htmlFor: "typeDoc" },
                  "Tipo de documento"
                )
              ),
              React.createElement(
                "div",
                { className: "col-6 col-lg-2" },
                React.createElement(DropdownContainer, {
                  dataList: this.state.listTipoDoc,
                  className: "input-background-color form-control p-2",
                  id: "typeDoc",
                  name: "typeDoc",
                  idObject: "POV_COD_TDO",
                  nameObject: "POV_DES_TDO",
                  onResult: this._handleResults })
              )
            ),
            React.createElement(
              "div",
              { className: "row align-items-center m-2" },
              React.createElement(
                "div",
                { className: "col-5 col-lg-3" },
                React.createElement(
                  "label",
                  {
                    className: "form-check-label",
                    htmlFor: "nroDoc" },
                  "N\xB0 de documento"
                )
              ),
              React.createElement(
                "div",
                { className: "col-6 col-lg-4  col-xl-3" },
                React.createElement(InputValidation, {
                  id: "nroDoc",
                  name: "nroDoc",
                  minLength: "0",
                  maxLength: "12",
                  requiredStr: "debe ingresar numeros",
                  charactersStr: "",
                  className: "input-background-color form-control w-100 ",
                  onResult: this._handleResults })
              )
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { onClick: this._handleResultQuestion,
                  type: "button",
                  id: "boton",
                  className: "btn btn-danger m-2 rounded " },
                "Siguiente"
              )
            ),
            this.state.loader ? React.createElement(
              "div",
              { style: { bottom: "9rem" }, className: " m-0 position-relative bottom-10 col-md-10 d-flex justify-content-center mt-5 pt-5" },
              React.createElement(Loader, null)
            ) : " "
          ) : React.createElement(DialogPregunta2, {
            title: this.state.preguntaTitle,
            question: this.state.question,
            _handleResults: this._handleResults,
            respuestaInputLabel: this.state.respuestaInputLabel,
            pattern: this.state.questionPattern,
            minLength: this.state.questionMinLength,
            maxLength: this.state.questionMaxLength
          }),
          React.createElement(Errormessage, { className: "text-danger", show: this.state.txtError == '' ? false : true, text: this.state.txtError }),
          React.createElement("br", null),
          React.createElement(
            "p",
            null,
            "Se generar\xE1 una contrase\xF1a de acceso provisorio que ser\xE1 enviada a tu e-mail para que puedas ingresar a HSBC Seguros On Line. Como esta contrase\xF1a es de acceso provisorio, el sistema te pedir\xE1 que selecciones una m\xE1s sencilla para ingresar en el futuro."
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: this._handleButton,
                type: "button",
                disabled: this._enableButton(),
                className: "btn btn-danger m-2 rounded " },
              "Enviar"
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var controller = new LoginController();

        controller.getTiposDocumento().then(function (data) {
          _this2.setState({
            listTipoDoc: data, preguntaString: "los datos pertenecientes a tu registración."
          });
        });
      }
    }]);

    return forgetPasswordLogin;
  }(React.Component);

  return forgetPasswordLogin;
});