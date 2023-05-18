var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../common/inputvalidation", "../common/modal", "../services/segurosOnlineService", "../redux/store", "../common/modalReactBootstrap"], function (React, UserService, InputValidation, Modal, SegurosOnlineService, Store, ModalReactBootstrap) {
  var PrintedByMail = function (_React$Component) {
    _inherits(PrintedByMail, _React$Component);

    function PrintedByMail(props) {
      _classCallCheck(this, PrintedByMail);

      var _this = _possibleConstructorReturn(this, (PrintedByMail.__proto__ || Object.getPrototypeOf(PrintedByMail)).call(this, props));

      _this.FORM_NAME = "PrintedByMail";

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._handleActualizarImpresos = function () {
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var producto = {};
        var productos = [];
        var request = {};
        var email, clave, swsuscri, conforme;
        var copiaPoliza = _this.state.valueSelectPoliza;
        var mail = _this.state.valueInputMail;
        var mailConf = _this.state.valueInputMailConf;
        var pass = _this.state.valuePassword;
        var passConf = _this.state.valuePasswordConf;
        var estadoCuenta = _this.state.valueSelectCuenta;
        var conformidad = _this.state.checked;

        if (!_this.state.disabled) {
          if (mail === '' || mailConf === '' || pass === '' || passConf === '') {
            _this.setState({
              showErrorNotCompleted: true,
              showErrorNotValidEmailConf: false,
              showErrorNotValidPassConf: false,
              showErrorNotConfirmed: false
            });
            return;
          } else if (mail !== mailConf) {
            _this.setState({
              showErrorNotCompleted: false,
              showErrorNotValidEmailConf: true,
              showErrorNotValidPassConf: false,
              showErrorNotConfirmed: false
            });
            return;
          } else if (pass !== passConf) {
            _this.setState({
              showErrorNotCompleted: false,
              showErrorNotValidEmailConf: false,
              showErrorNotValidPassConf: true,
              showErrorNotConfirmed: false
            });
            return;
          } else if (!conformidad) {
            _this.setState({
              showErrorNotCompleted: false,
              showErrorNotValidEmailConf: false,
              showErrorNotValidPassConf: false,
              showErrorNotConfirmed: true
            });
            return;
          }
        }

        _this.setState({
          showErrorNotCompleted: false,
          showErrorNotValidEmailConf: false,
          showErrorNotValidPassConf: false,
          showErrorNotConfirmed: false
        });

        if (estadoCuenta == "N" && copiaPoliza == "N") {
          swsuscri = "0";
          email = "";
          clave = "";
        } else if (estadoCuenta == "N" && copiaPoliza == "S") {
          swsuscri = "1";
          email = mail;
          clave = pass;
        } else if (estadoCuenta == "S" && copiaPoliza == "S") {
          swsuscri = "2";
          email = mail;
          clave = pass;
        } else if (estadoCuenta == "S" && copiaPoliza == "N") {
          swsuscri = "3";
          email = mail;
          clave = pass;
        }

        if (_this.state.disabled) {
          email = "";
          clave = "";
        }

        producto.CIAASCOD = detalle.CIAASCOD;
        producto.RAMOPCOD = detalle.RAMOPCOD;
        producto.POLIZANN = detalle.POLIZANN;
        producto.POLIZSEC = detalle.POLIZSEC;
        producto.CERTIPOL = detalle.CERTIPOL;
        producto.CERTIANN = detalle.CERTIANN;
        producto.CERTISEC = detalle.CERTISEC;
        producto.SWSUSCRI = swsuscri;
        producto.MAIL = email;
        producto.CLAVE = clave;
        producto["SW-CLAVE"] = "U";
        producto.CONFORME = conformidad == true ? "S" : "N";
        productos.push(producto);

        request.EPOLIZA = productos;
        request.DOCUMDAT = _this.state.user.NUMEDOCU;
        request.DOCUMTIP = _this.state.user.TIPODOCU;
        request.NOMBRE = _this.state.user.CLIENNOM;
        request.APELLIDO = _this.state.user.CLIENAP1 + "  " + _this.state.user.CLIENAP2;

        var json = "{" + request.APELLIDO + "," + request.DOCUMDAT + "," + request.DOCUMTIP + "," + request.EPOLIZA + "," + request.NOMBRE + "}";

        var segurosOnlineService = new SegurosOnlineService();
        segurosOnlineService.getProcesarImpresosPorEmail(request).then(function (resp) {
          if (resp) {
            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: 'La suscripción se ha generado correctamente.',
                html: true,
                title: "Impresos por Mail",
                size: "md"
              }
            });
          }
        });
      };

      _this.state = {
        user: {},
        productosColectivos: null,
        disabled: null,
        invalidInputMail: "form-control",
        invalidInputMailConf: "form-control",
        invalidInputPass: "form-control",
        invalidInputPassConf: "form-control",
        valueSelectCuenta: "",
        valueSelectPoliza: "",
        valueInputMail: "",
        valueInputMailConf: "",
        valuePassword: "",
        valuePasswordConf: "",
        checked: true,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };

      _this.handleChangeCuenta = _this.handleChangeCuenta.bind(_this);
      _this.handleChangePoliza = _this.handleChangePoliza.bind(_this);
      _this.handleInputMail = _this.handleInputMail.bind(_this);
      _this.handleInputMailConf = _this.handleInputMailConf.bind(_this);
      _this.handlePassword = _this.handlePassword.bind(_this);
      _this.handlePasswordConf = _this.handlePasswordConf.bind(_this);
      _this.handleOptionChange = _this.handleOptionChange.bind(_this);
      return _this;
    }

    _createClass(PrintedByMail, [{
      key: "handleInputMail",
      value: function handleInputMail(event) {
        this.setState({ valueInputMail: event.target.value });
        if (event.target.value === '' && !this.state.disabled) {
          this.setState({ invalidInputMail: "form-control input-invalid" });
        } else {
          this.setState({ invalidInputMail: "form-control" });
        }
      }
    }, {
      key: "handleInputMailConf",
      value: function handleInputMailConf(event) {
        this.setState({ valueInputMailConf: event.target.value });
        if (event.target.value === '' && !this.state.disabled) {
          this.setState({ invalidInputMailConf: "form-control input-invalid" });
        } else {
          this.setState({ invalidInputMailConf: "form-control" });
        }
      }
    }, {
      key: "handlePassword",
      value: function handlePassword(event) {
        this.setState({ valuePassword: event.target.value });
        if (event.target.value === '' && !this.state.disabled) {
          this.setState({ invalidInputPass: "form-control input-invalid" });
        } else {
          this.setState({ invalidInputPass: "form-control" });
        }
      }
    }, {
      key: "handlePasswordConf",
      value: function handlePasswordConf(event) {
        this.setState({ valuePasswordConf: event.target.value });
        if (event.target.value === '' && !this.state.disabled) {
          this.setState({ invalidInputPassConf: "form-control input-invalid" });
        } else {
          this.setState({ invalidInputPassConf: "form-control" });
        }
      }
    }, {
      key: "getStateOnChange",
      value: function getStateOnChange(disabled) {
        var stateChange = {
          disabled: disabled
        };

        if (disabled) {
          stateChange.invalidInputMail = "form-control";
          stateChange.invalidInputMailConf = "form-control";
          stateChange.invalidInputPass = "form-control";
          stateChange.invalidInputPassConf = "form-control";
        }

        return stateChange;
      }
    }, {
      key: "handleChangeCuenta",
      value: function handleChangeCuenta(event) {
        var disabled = event.target.value == 'N' && this.state.valueSelectPoliza == 'N' ? "true" : null;
        var stateChange = this.getStateOnChange(disabled);

        stateChange.valueSelectCuenta = event.target.value;
        this.setState(stateChange);
      }
    }, {
      key: "handleChangePoliza",
      value: function handleChangePoliza(event) {
        var disabled = event.target.value == 'N' && this.state.valueSelectCuenta == 'N' ? "true" : null;
        var stateChange = this.getStateOnChange(disabled);

        stateChange.valueSelectPoliza = event.target.value;
        this.setState(stateChange);
      }
    }, {
      key: "handleOptionChange",
      value: function handleOptionChange(event) {
        if (event.target.checked == true) {
          this.setState({
            checked: true
          });
        } else {
          this.setState({
            checked: false
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "container remove-left-padding profile-container" },
          React.createElement(
            "div",
            { className: "panel col-md-10" },
            React.createElement(
              "div",
              { className: "panel-title" },
              React.createElement(
                "h4",
                { className: "subtitle-inside" },
                "Impresos por Mail"
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
                    null,
                    "Estado de cuenta"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(
                    "select",
                    { value: this.state.valueSelectCuenta, onChange: this.handleChangeCuenta,
                      name: "pregunta-personal",
                      id: "pregunta-personal",
                      className: "form-control"
                    },
                    React.createElement(
                      "option",
                      { value: "S" },
                      "E-mail"
                    ),
                    React.createElement(
                      "option",
                      { value: "N" },
                      "Correo Postal"
                    )
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
                    null,
                    "Copia de p\xF3liza"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(
                    "select",
                    { value: this.state.valueSelectPoliza, onChange: this.handleChangePoliza,
                      name: "pregunta-personal",
                      id: "pregunta-personal",
                      className: "form-control"
                    },
                    React.createElement(
                      "option",
                      { value: "S" },
                      "E-mail"
                    ),
                    React.createElement(
                      "option",
                      { value: "N" },
                      "Correo Postal"
                    )
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
                    null,
                    "Mail"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement("input", {
                    id: "email",
                    name: "email",
                    type: "email"
                    //  className={`${className} ${!isValid ? "" : "input-invalid"}`}
                    , minLength: "5",
                    maxLength: "50",
                    valueDefault: this.state.valueInputMail,
                    value: this.state.valueInputMail,
                    onChange: this.handleInputMail,
                    className: this.state.invalidInputMail,
                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                    disabled: this.state.disabled ? "disabled" : ""
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
                    null,
                    "Confirmaci\xF3n de Mail"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement("input", {
                    type: "text",
                    name: "confirmacionMail",
                    id: "confirmacionMail",
                    valueDefault: this.state.valueInputMailConf,
                    value: this.state.valueInputMailConf,
                    onChange: this.handleInputMailConf,
                    className: this.state.invalidInputMailConf,
                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                    disabled: this.state.disabled ? "disabled" : ""
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    this.state.showErrorNotValidEmailConf && "La clave y su confirmación no coinciden."
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
                    null,
                    "Clave de lectura"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement("input", {
                    id: "claveLectura",
                    name: "claveLectura",
                    type: "password",
                    minLength: "6",
                    maxLength: "10",
                    value: this.state.valuePassword,
                    onChange: this.handlePassword,
                    className: this.state.invalidInputPass,
                    disabled: this.state.disabled ? "disabled" : ""
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
                    null,
                    "Confirmaci\xF3n Clave de lectura"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement("input", {
                    id: "confirmacionClaveLectura",
                    name: "confirmacionClaveLectura",
                    type: "password",
                    minLength: 6,
                    maxLength: 10,
                    value: this.state.valuePasswordConf,
                    onChange: this.handlePasswordConf,
                    className: this.state.invalidInputPassConf,
                    disabled: this.state.disabled ? "disabled" : ""
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    this.state.showErrorNotValidPassConf && "La clave y su confirmación no coinciden."
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                  "div",
                  { className: "radio" },
                  React.createElement(
                    "label",
                    null,
                    React.createElement("input", { type: "checkbox", id: "cbox1", checked: this.state.checked, onChange: this.handleOptionChange,
                      onClick: this.handleOptionChange }),
                    "\xA0\xA0\xA0\xA0 Presto conformidad para ceder datos personales incluidos en este formulario a las dem\xE1s compa\xF1\xEDas que integran Grupo HSBC, a efectos de recibir informacion acerca de sus productos para este medio:"
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "alert alert-danger" },
                this.state.showErrorNotCompleted && "Por favor, completá los campos indicados para poder continuar...",
                this.state.showErrorNotConfirmed && "Debe aceptar la conformidad para enviar el mensaje."
              )
            ),
            React.createElement(
              "div",
              { className: "panel-actions text-center center" },
              React.createElement(
                "button",
                {
                  className: 'btn btn-hsbc left ml-2',
                  onClick: this._handleActualizarImpresos
                },
                "Actualizar",
                " "
              ),
              React.createElement(
                "button",
                { className: "btn btn btn-light border-dark right ml-2" },
                "Cancelar"
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
            contentHTML: this.state.modal.contentHTML
          })
        );
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        var currentProduct = Store.getState().seguros.currentProduct;

        var userService = new UserService();
        var segurosOnlineService = new SegurosOnlineService();
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        var _Store$getState = Store.getState(),
            auth = _Store$getState.auth;

        //  if (auth.authorized) { //Comentar para llamar al servicio sin login


        userService.getLoggedUser().then(function (user) {
          userService.buscarClientes().then(function (productosColectivos) {
            var tipoProducto = currentProduct.impresosPorEmail.RAMOPCOD.substr(0, 1).toUpperCase();

            _this2.setState({
              productosColectivos: productosColectivos,
              user: user
            });
            //TIPODOCU: user.TIPODOCU,
            // NUMEDOCU: user.NUMEDOCU,
            if (tipoProducto == "I" || tipoProducto == "M" || tipoProducto == "R" || tipoProducto == "C") {
              segurosOnlineService.getPolizasPorEmail({
                CERTIANN: currentProduct.impresosPorEmail.CERTIANN,
                CERTIPOL: currentProduct.impresosPorEmail.CERTIPOL,
                CERTISEC: currentProduct.impresosPorEmail.CERTISEC,
                CIAASCOD: currentProduct.impresosPorEmail.CIAASCOD,
                POLIZANN: currentProduct.impresosPorEmail.POLIZANN,
                POLIZSEC: currentProduct.impresosPorEmail.POLIZSEC,
                RAMOPCOD: currentProduct.impresosPorEmail.RAMOPCOD
              }).then(function (data) {
                _this2.setState({
                  valueSelectCuenta: data.SEMESTRAL,
                  valueSelectPoliza: data.POLIZA,
                  valueInputMail: data.EMAIL,
                  valueInputMailConf: data.EMAIL,
                  valuePassword: data.PASSWORD,
                  valuePasswordConf: data.PASSWORD,
                  disabled: data.SEMESTRAL == 'N' && data.POLIZA == 'N' ? "true" : null
                });

                /*if (data.EMAIL && data.EMAIL.length > 0) {
                  $('#email').removeClass('input-empty');
                  $('#confirmacionMail').removeClass('input-empty');
                }
                  if (data.PASSWORD && data.PASSWORD.length > 0) {
                  $('#claveLectura').removeClass('input-empty');
                  $('#confirmacionClaveLectura').removeClass('input-empty');
                }*/
              });
            }
          });
        });
        // } //Comentar para llamar al servicio sin login
      }

      /*componentDidMount() {
          $('.panel-container :input').on('input', function() {
            $(this).toggleClass('input-empty', this.value.length === 0);
        }).trigger('input');
      }*/

    }]);

    return PrintedByMail;
  }(React.Component);

  return PrintedByMail;
});