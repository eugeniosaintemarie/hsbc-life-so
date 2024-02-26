var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../components/loginForm", "../components/loginStep2", "../components/loginChangePass", "../components/loginSecretQuestion", "../common/navBar", "../common/carouselImages", "../common/modalReactBootstrap", "../components/siniestroModal2", "../components/knowMoreLogin", "../components/terminosCondiciones", "../components/preguntasFrecuentes", "../components/forgetPasswordLogin", "../components/registerUserLogin", "../controller/loginController", "../lib/utils", "../segurosOnline/firstLogin", "../common/inputvalidation", "../components/outService"], function (React, ReactRedux, LoginForm, LoginStep2, LoginChangePass, LoginSecretQuestion, NavBar, CarouselImages, ModalReactBootstrap, SiniestroModal2, KnowMoreLogin, TerminosCondiciones, PreguntasFrecuentes, ForgetPasswordLogin, RegisterUserLogin, LoginController, Utils, FirstLogin, InputValidation, OutService) {
  var Login = function (_React$Component) {
    _inherits(Login, _React$Component);

    function Login(props) {
      _classCallCheck(this, Login);

      var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

      _this.loginController = new LoginController();

      _this._passwordBlankOK = function () {
        _this.setState({
          isSubmitting: false,
          showModalSinister: true,
          modal: {
            component: null,
            title: 'Restauracion de contraseña correcta',
            contentHTML: 'Se ha enviado un Email con los pasos a seguir',
            html: true,
            size: "md",
            dialogClassName: ""
          }
        });
      };

      _this._handleClickForgetPassword = function (e) {
        e.preventDefault();
        _this.setState({
          showModalSinister: true,
          modal: {
            component: React.createElement(ForgetPasswordLogin, null),
            title: "¿Olvidaste tu contraseña?",
            contentHTML: '',
            html: false,
            size: "xl",
            dialogClassName: "",
            responseModal: _this._passwordBlankOK,
            hiddenButtonClose: true
          }
        });
      };

      _this._handleClickKnowMore = function (e) {
        e.preventDefault();

        _this.setState({
          showModalSinister: true,
          modal: {
            component: React.createElement(KnowMoreLogin, null),
            title: "Registrate en HSBC Seguros On Line",
            contentHTML: '',
            html: false,
            size: "lg",
            dialogClassName: ""
          }
        });
      };

      _this._handleClickRegister = function (e) {
        e.preventDefault();

        _this.setState({
          showModalSinister: true,
          modal: {
            component: React.createElement(RegisterUserLogin, null),
            title: "Solicitud de suscripción",
            contentHTML: '',
            html: false,
            size: "xl",
            dialogClassName: "",
            hiddenButtonClose: true
          }
        });
      };

      _this._handleClickTerminos = function (e) {
        e.preventDefault();

        var url = 'https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_term_cond_seg_online.pdf';

        window.open(url);
      };

      _this._handleClickPreguntas = function (e) {
        e.preventDefault();

        _this.setState({
          showModalSinister: true,
          modal: {
            component: React.createElement(PreguntasFrecuentes, null),
            title: "Preguntas Frecuentes",
            contentHTML: '',
            html: false,
            size: "lg",
            dialogClassName: ""
          }
        });
      };

      _this._handleClickSinister = function (e) {
        e.preventDefault();
        _this.setState({
          showModalSinister: true,
          modal: {
            component: React.createElement(SiniestroModal2, null),
            title: "¿Qué hacer en caso de sufrir un siniestro?",
            contentHTML: '',
            html: false,
            size: "md",
            dialogClassName: ""
          }
        });
      };

      _this._caseLogin = function () {
        switch (_this.state.step) {
          case 'step1':
            return React.createElement(LoginForm, {
              forgetPassword: _this._handleClickForgetPassword,
              knowMore: _this._handleClickKnowMore,
              register: _this._handleClickRegister,
              onSubmit: _this._handleSubmitStep1,
              isSubmitting: _this.state.isSubmitting,
              onResult: _this._handleResults });
          case 'step2':
            return React.createElement(LoginStep2, {
              forgetPassword: _this._handleClickForgetPassword,
              knowMore: _this._handleClickKnowMore,
              register: _this._handleClickRegister,
              onSubmit: _this._handleSubmitStep2,
              isSubmitting: _this.state.isSubmitting,
              onResult: _this._handleResults });
          case 'changePassword':
            return React.createElement(LoginChangePass, {
              forgetPassword: _this._handleClickForgetPassword,
              knowMore: _this._handleClickKnowMore,
              onSubmit: _this._handleSubmitChangePassword,
              isSubmitting: _this.state.isSubmitting,
              onResult: _this._handleResults,
              title: _this.state.titlePass,
              detail: _this.state.detailPass });
          case 'SecretQuestion':
            return React.createElement(LoginSecretQuestion, {
              forgetPassword: _this._handleClickForgetPassword,
              knowMore: _this._handleClickKnowMore,
              onSubmit: _this._handleSubmitSecretQuestion,
              isSubmitting: _this.state.isSubmitting,
              onResult: _this._handleResults });
          case 'FirstLogin':
            return React.createElement(FirstLogin, {
              onSubmit: _this._handleSubmitFirstLogin,
              isSubmitting: _this.state.isSubmitting,
              email: _this.state.email,
              tipoDoc: _this.state.tipoDoc,
              nroDoc: _this.state.nroDoc,
              onCancel: _this._onCancel });
          case 'outService':
            return React.createElement(OutService, null);
        }
      };

      _this._handleSubmitStep1 = function (e) {
        e.preventDefault();
        _this.setState({
          isSubmitting: true
        });
        _this.loginController.loginPaso1(_this.state.email.value, _this.state.password.value, function (promise, requestURL) {
          var path = requestURL.split("pages");
          var paramsPath = path[1].split("?");
          var errorParam = paramsPath[1];

          if (errorParam) {
            //Manejo de errores}
            var title = '';
            var description = 'Usuario o clave incorrecta. Ingresá tus datos nuevamente.';
            errorParam = decodeURIComponent(errorParam).split("=");
            var paramObj = _defineProperty({}, errorParam[0], errorParam[1]);
            var ContentHTML = '';
            var ValidaHTML = false;

            if (paramsPath[0] == '/login') {

              if (paramObj.unauthenticated == '1') {
                title = description;
              }
              if (paramObj.accessdenied == '1') {
                title = description;
              }
              if (paramObj.usernotfound == '1') {
                title = description;
              }
              if (paramObj.notavailable == '1') {
                title = description;
              }
              if (paramObj.expiredsession == '1') {
                title = description;
              }
              if (paramObj.servererror == '1') {
                title = description;
              }
              ContentHTML = '<h6 style="font-size: 80%">Tené en cuenta que luego de 3 intentos fallidos el usuario quedará bloquedo y deberás llamar al centro de atención al cliente 0800-333-0003 para desbloquearlo.<h6>';
              ValidaHTML = true;
            }

            if (paramsPath[0] == '/login2') {
              if (paramObj.unauthenticated == '2') {
                title = "Documento o nro de documento. Ingrese los datos nuevamente.";
              }
              if (paramObj.accessdenied == '1') {
                title = "El usuario no tiene permisos para acceder.";
              }
              if (paramObj.usernotfound == '1') {
                title = "El usuario no se encuentra en el directorio.";
              }
              if (paramObj.notavailable == '1') {
                title = "El recurso al que desea acceder no se encuentra disponible.";
              }
            }

            _this.setState({
              step: 'step1',
              isSubmitting: false,
              showModalSinister: true,
              modal: {
                component: null,
                title: title,
                contentHTML: ContentHTML,
                html: ValidaHTML,
                size: "md",
                dialogClassName: ""
              }
            });
          } else {
            if (path[1] == '/login2') {
              _this.setState({
                step: 'step2',
                isSubmitting: false
              });
            }
          }
        });
      };

      _this._handleSubmitStep2 = function (e) {
        e.preventDefault();
        _this.setState({
          isSubmitting: true
        });

        _this.loginController.loginPaso2(_this.state.tipoDoc.id, _this.state.rcc.rcc1, _this.state.rcc.rcc2, _this.state.rcc.rcc3, _this.state.nroDoc.value, function (promise, requestURL) {
          var path = requestURL.split("pages");
          var paramsPath = path[1].split("?");
          var errorParam = paramsPath[1];

          if (errorParam) {
            //Manejo de errores
            var title = '';
            errorParam = decodeURIComponent(errorParam).split("=");
            var paramObj = _defineProperty({}, errorParam[0], errorParam[1]);

            if (paramsPath[0] == '/login2') {
              if (paramObj.unauthenticated == '2') {
                title = "Documento o nro de documento. Ingrese los datos nuevamente.";
              }
              if (paramObj.accessdenied == '1') {
                title = "El usuario no tiene permisos para acceder.";
              }
              if (paramObj.usernotfound == '1') {
                title = "El usuario no se encuentra en el directorio.";
              }
              if (paramObj.notavailable == '1') {
                title = "El recurso al que desea acceder no se encuentra disponible.";
              }
            }

            _this.setState({
              isSubmitting: false,
              showModalSinister: true,
              modal: {
                component: null,
                title: title,
                contentHTML: '',
                html: false,
                size: "sm",
                dialogClassName: ""
              }
            });
          } else {
            if (path[1] == '/cambiarPassword_Cap') {
              _this.setState({
                step: 'changePassword',
                isSubmitting: false,
                titlePass: 'Generación de Contraseña',
                detailPass: ''
              });
            } else if (path[1] == '/pregunta_secreta') {
              _this.setState({
                step: 'SecretQuestion',
                isSubmitting: false
              });
            } else if (path[1] == '/positive_id') {
              _this.setState({
                step: 'FirstLogin',
                isSubmitting: false
              });
            } else if (path[1] == '/home') {
              _this.setState({
                isSubmitting: false
              });

              _this.props.onLoadOK();
              _this.props.login();
            }
          }
        });
      };

      _this._handleSubmitChangePassword = function (e) {
        e.preventDefault();
        _this.setState({
          isSubmitting: true
        });

        _this.loginController.savePassword(_this.state.email.value, _this.state.passwordChange.value, function (promise, requestURL) {
          if (promise.status === 200) {
            _this.setState({
              step: 'step1',
              isSubmitting: false,
              showModalSinister: true,
              modal: {
                component: null,
                title: 'Se ha cambiado la contraseña correctamente',
                contentHTML: 'Por favor vuelva a ingresar.',
                html: true,
                size: "md",
                dialogClassName: ""
              }
            });
          } else if (promise.status === 406) {
            _this.setState({
              isSubmitting: false,
              showModalSinister: true,
              modal: {
                component: null,
                title: 'Contraseña Inválida',
                contentHTML: '<div class="text-left">' + '<p>La contraseña no cumple con las políticas de seguridad.</p><p>' + '<b>1-</b> La contraseña debe tener al menos una letra en mayúscula. (<strong>H</strong>sbc12+)<br>' + '<b>2-</b> La contraseña debe tener al menos una letra en minúscula. (HSBC<strong>x</strong>12+)<br>' + '<b>3-</b> La contraseña debe tener al menos un caracter especial. (Hsbc12<strong>+</strong>)<br> ' + '<b>4-</b> La contraseña no puede tener más de 2 números consecutivos. (<s>Hsbc<strong>715+</strong></s>)<br>' + '<b>5-</b> La contraseña no puede contener más de 2 letras iguales. (<s>Hsbc<strong>aaa+</strong></s>)</p>' + '<p>Ejemplo de contraseña válida: <b>Hsbc12+</b></p>' + '</div>',
                html: true,
                size: "",
                dialogClassName: "contrasenia-modal"
              }
            });
          }
        });
      };

      _this._handleSubmitSecretQuestion = function (e) {
        e.preventDefault();
        _this.setState({
          isSubmitting: true
        });

        _this.loginController.guardarPreguntaYRespuestaSecreta(_this.state.question.id, _this.state.anwser.value, function (promise, requestURL) {
          var path = requestURL.split("pages");
          var paramsPath = path[1].split("?");
          var errorParam = paramsPath[1];

          if (errorParam) {
            //Manejor de errores
            var title = '';
            errorParam = decodeURIComponent(errorParam).split("=");
            var paramObj = _defineProperty({}, errorParam[0], errorParam[1]);

            if (paramsPath[0] == '/login') {

              if (paramObj.unauthenticated == '1') {
                title = "Usuario o clave incorrecta. Ingrese sus datos nuevamente.";
              }
              if (paramObj.accessdenied == '1') {
                title = "Usuario o clave incorrecta. Ingrese sus datos nuevamente.";
              }
              if (paramObj.usernotfound == '1') {
                title = "Usuario o clave incorrecta. Ingrese sus datos nuevamente.";
              }
              if (paramObj.notavailable == '1') {
                title = "Usuario o clave incorrecta. Ingrese sus datos nuevamente.";
              }
              if (paramObj.expiredsession == '1') {
                title = "Usuario o clave incorrecta. Ingrese sus datos nuevamente.";
              }
              if (paramObj.servererror == '1') {
                title = "Usuario o clave incorrecta. Ingrese sus datos nuevamente.";
              }
            }

            if (paramsPath[0] == '/login2') {
              if (paramObj.unauthenticated == '2') {
                title = "Documento o nro de documento. Ingrese los datos nuevamente.";
              }
              if (paramObj.accessdenied == '1') {
                title = "El usuario no tiene permisos para acceder.";
              }
              if (paramObj.usernotfound == '1') {
                title = "El usuario no se encuentra en el directorio.";
              }
              if (paramObj.notavailable == '1') {
                title = "El recurso al que desea acceder no se encuentra disponible.";
              }
            }

            _this.setState({
              step: 'step1',
              isSubmitting: false,
              showModalSinister: true,
              modal: {
                component: null,
                title: title,
                contentHTML: '',
                html: false,
                size: "sm",
                dialogClassName: ""
              }
            });
          } else {
            if (path[1] == '/cambiar_password_cai') {
              _this.setState({
                step: 'changePassword',
                titlePass: 'Primer Ingreso',
                detailPass: 'Validación de datos de acceso - Paso 2 de 2',
                isSubmitting: false

              });
            }
          }
        });
      };

      _this._handleSubmitFirstLogin = function (data) {

        if (data === 'pregunta_secreta') {
          _this.setState({
            step: 'SecretQuestion',
            isSubmitting: false
          });
        }
      };

      _this._onCancel = function () {
        // this.setState({
        //   step: 'step1'
        // });
        _this.props.logout();
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSinister;
        _this.setState({
          showModalSinister: !current
        });
      };

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
      };

      _this.state = {
        isSubmitting: false,
        showModalSinister: false,
        modal: {
          title: "",
          component: null,
          contentHTML: '',
          html: false,
          size: "md",
          dialogClassName: "",
          responseModal: null,
          hiddenButtonClose: false,
          footerText: ""
        },
        step: 'step1',
        //Campos Form
        email: "",
        password: "",
        tipoDoc: {},
        nroDoc: {},
        // Titulo de login de pass
        titlePass: '',
        detailPass: ''
      };
      //checamo sí corresponde al paso 2
      return _this;
    }

    _createClass(Login, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(NavBar, null),
            React.createElement(
              "h3",
              { className: "text-md-center hsbc-title-red titlePadding", id: "titleLogin" },
              "\xA1Te damos la bienvenida a HSBC Seguros Online!"
            ),
            React.createElement(
              "h2",
              { className: "hsbc-subtitle subTitlePadding" },
              "Ac\xE1 podr\xE1s encontrar informaci\xF3n y realizar todas las gestiones de tu p\xF3liza"
            ),
            React.createElement(
              "div",
              { className: "container" },
              this.state.step === 'FirstLogin' ? this._caseLogin() : React.createElement(
                "div",
                { className: "d-block d-md-flex justify-content-center" },
                React.createElement(ModalReactBootstrap, {
                  title: this.state.modal.title,
                  show: this.state.showModalSinister,
                  size: this.state.modal.size,
                  dialogClassName: this.state.modal.dialogClassName,
                  isOpen: this._handleModalIsOpen,
                  component: this.state.modal.component,
                  contentHTML: this.state.modal.contentHTML,
                  html: this.state.modal.html,
                  responseModal: this.state.modal.responseModal,
                  hiddenButtonClose: this.state.modal.hiddenButtonClose }),
                React.createElement(
                  "div",
                  { id: "login-left-panel", className: "hsbc-form-left" },
                  React.createElement(
                    "div",
                    { className: "hsbc-stepper" },
                    React.createElement("div", { className: this.state.step == "step1" ? "hsbc-stepper-progress" : "hsbc-stepper-progress-step2" }),
                    React.createElement("div", { className: this.state.step == "step1" ? "hsbc-stepper-progress-left" : "" })
                  ),
                  this._caseLogin()
                ),
                React.createElement(
                  "div",
                  { className: "hsbc-form-right ml-0 rightPanelPadding", id: "login-right-panel" },
                  React.createElement(
                    "form",
                    { className: "container" },
                    React.createElement(
                      "div",
                      { className: "p-1 " },
                      "Accesos Directos: "
                    ),
                    React.createElement("p", null),
                    React.createElement(
                      "div",
                      { className: "container col-md-12 text-md-left d-flex center-align-icon" },
                      React.createElement(
                        "div",
                        { className: "d-block" },
                        React.createElement("img", { src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_servicio_al_cliente.svg", alt: "Icon" })
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-9" },
                        React.createElement(
                          "u",
                          {
                            href: "#",
                            type: "submit",
                            className: "hsbc-text-normal smallFont",
                            onClick: this._handleClickSinister },
                          "Denunciar Siniestro"
                        )
                      )
                    ),
                    React.createElement("p", null),
                    React.createElement(
                      "div",
                      { className: "container col-md-12 text-md-left d-flex center-align-icon" },
                      React.createElement(
                        "div",
                        { className: "d-block" },
                        React.createElement("img", { src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_lupa.svg", alt: "Icon" })
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-9" },
                        React.createElement(
                          "u",
                          {
                            href: "#",
                            type: "submit",
                            className: "hsbc-text-normal smallFont",
                            onClick: this._handleClickKnowMore },
                          "Conoc\xE9 m\xE1s HSBC Life"
                        )
                      )
                    ),
                    React.createElement("p", null),
                    React.createElement(
                      "div",
                      { className: "container col-md-12 text-md-left d-flex center-align-icon" },
                      React.createElement(
                        "div",
                        { className: "d-block" },
                        React.createElement("img", { src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_atencion_al_cliente.svg", alt: "Icon" })
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-9" },
                        React.createElement(
                          "span",
                          { className: "hsbc-text-normal smallFont" },
                          "Atencion al cliente ",
                          React.createElement(
                            "p",
                            { className: "marginZero" },
                            React.createElement(
                              "strong",
                              null,
                              "0800-333-0003"
                            )
                          ),
                          " lunes a viernes 8 a 20hs"
                        )
                      )
                    ),
                    React.createElement("p", null),
                    React.createElement(
                      "div",
                      { className: "container smallFont col-md-12 text-md-left d-flex center-align-icon" },
                      React.createElement(
                        "div",
                        { className: "d-block" },
                        React.createElement("img", { src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_correo_de_contacto.svg", alt: "Icon" })
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-9" },
                        React.createElement(
                          "span",
                          { className: "hsbc-text-normal smallFont" },
                          "Contactanos ",
                          React.createElement(
                            "strong",
                            null,
                            "contactenos@hsbc.com.ar"
                          )
                        )
                      )
                    ),
                    React.createElement("p", null),
                    React.createElement("div", { className: "hsbc-divider" }),
                    React.createElement("p", null),
                    React.createElement(
                      "div",
                      null,
                      React.createElement(
                        "a",
                        { href: "#", className: "offset-1 hsbc-text-normal smallFont", onClick: this._handleClickTerminos },
                        "T\xE9rminos y Condiciones"
                      )
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-md-12 myFooter" },
              React.createElement(
                "footer",
                null,
                React.createElement(
                  "div",
                  { "class": "col-md-12 footer-2 p-0" },
                  React.createElement(
                    "div",
                    { "class": "container" },
                    React.createElement("iframe", { src: "https://argentina.hsbc.com.ar/OBD VIDA/footer/footer-legales.html", name: "SubHtml", scrolling: "no", "class": "footer-legales" })
                  )
                )
              )
            )
          )
        );
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        this.loginController.getSitioHab(function (callback) {
          if (callback != "S") {
            _this2.setState({
              step: "outService"
            });
          } else {
            _this2.setState({
              step: "step1"
            });
          }
        });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {

        var params = {
          IDE_SIT: 0,
          CLI_TIP: "SOF",
          UBI_BAN: 2
        };

        try {
          var exist = localStorage.getItem("currentStep");

          if (typeof exist !== null) {
            var obj = JSON.parse(exist);
            this.isStep2 = obj.step2;
            this.setState({
              step2: obj.step2
            });
          }
        } catch (error) {}
        // const ws = new SiniestroService();
        // console.log(ws);
        // ws.getBanners(params).then(r => console.log(r));    
      }
    }]);

    return Login;
  }(React.Component);

  function mapStateToProps(state) {
    return {
      auth: Object.assign({}, state.auth)
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      login: function login() {
        return dispatch({ type: "LOGIN" });
      },
      logout: function logout() {
        return dispatch({ type: "LOGOUT" });
      }
    };
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Login);
});