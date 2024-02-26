var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/modalReactBootstrap", "../common/dropdownContainer", "../services/segurosOnlineService", "../services/loginService", "../services/endososService", "../common/datepicker", "../common/inputvalidation", "../common/dropdownContent"], function (React, ModalReactBootstrap, DropdownContainer, SegurosOnlineService, LoginService, EndososService, DatePicker, InputValidation, DropDownContent) {
  var FirstLogin = function (_React$Component) {
    _inherits(FirstLogin, _React$Component);

    function FirstLogin(props) {
      _classCallCheck(this, FirstLogin);

      var _this = _possibleConstructorReturn(this, (FirstLogin.__proto__ || Object.getPrototypeOf(FirstLogin)).call(this, props));

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSinister;
        _this.setState({
          showModalSinister: !current
        });
      };

      _this._handleResults = function (id, result) {
        var dataState = _defineProperty({}, id, result);

        _this.setState(dataState);
      };

      _this._disableButton = function () {
        if ((_this.state.PID === "N" || _this.state.PID === "O") && _this.state.codigoValidacion !== null) {
          return _this.state.mail === null || _this.state.codigoValidacion.value === "";
        } else {
          return _this.state.producto === null || _this.state.codigoPostal === null && _this.state.producto.id === 'L' || _this.state.formaPago === null || _this.state.medioPago === null || _this.state.provincia === null;
        }
      };

      _this._disableVerificationButton = function () {
        return _this.state.mail === null;
      };

      _this._handleCodeValidation = function () {
        var params = {
          PRODUCTO: _this.state.productoSelected,
          CODMAIL: Number(_this.state.mail.id)
        };

        var loginService = new LoginService();
        loginService.sendCodVal(params).then(function (data) {
          console.log(data);
        });
      };

      _this._handleSubmit = function () {
        var loginService = new LoginService();
        var productSelected = _this.state.productoSelected;

        if (_this.state.PID === "N" || _this.state.PID === "O") {
          var params = {
            PRODUCTO: productSelected,
            DATO1: _this.state.codigoValidacion.value,
            DATO2: "",
            DATO3: "",
            DATO4: ""
          };

          loginService.verificarPositiveID(params).then(function (response) {
            if (response === 'pregunta_secreta') {
              _this.props.onSubmit(response);
            } else {
              _this.setState({
                showModalSinister: true,
                modal: {
                  component: null,
                  title: "Primer ingreso",
                  contentHTML: 'Los datos no son correctos.',
                  html: true,
                  size: "md"
                }
              });
            }
          });
        } else {
          if (!_this._disableButton()) {
            if (productSelected.PID === 'N' || productSelected.PID === 'O') {
              var birthDateSplitted = _this.state.birthDate.split('/');
            }

            var _params = {
              PRODUCTO: productSelected,
              DATO1: (productSelected.PID === 'N' || productSelected.PID === 'O') ? birthDateSplitted[2] + birthDateSplitted[1] + birthDateSplitted[0] : _this.state.codigoPostal.value,
              DATO2: _this.state.medioPago.id,
              DATO3: _this._fillWithZeros(_this.state.formaPago.id, 4),
              DATO4: _this._fillWithZeros(_this.state.provincia.id, 2)
            };

            loginService.verificarPositiveID(_params).then(function (response) {
              if (response === 'pregunta_secreta') {
                _this.props.onSubmit(response);
              } else {
                _this.setState({
                  showModalSinister: true,
                  modal: {
                    component: null,
                    title: "Primer ingreso",
                    contentHTML: 'Los datos no son correctos.',
                    html: true,
                    size: "md"
                  }
                });
              }
            });
          }
        }
      };

      _this._getProductoSelected = function () {
        var producto = null;
        var loginService = new LoginService();

        if (_this.state.producto) {
          $.each(_this.state.dataCAI.OPTIONS, function (index, prod) {
            if (prod.VALUE === _this.state.producto.id) {
              producto = prod;
            }
          });
        }

        if (producto !== null && (producto.PID === "N" || producto.PID === "O")) {
          loginService.getMails({ PRODUCTO: producto }).then(function (mails) {
            _this.setState({
              mailsRegistrados: mails,
              mail: null,
              PID: producto.PID,
              productoSelected: producto,
              displayForm: true
            });
          });
        } else if (producto !== null) {
          _this.setState({
            PID: producto.PID,
            productoSelected: producto,
            displayForm: true
          });
        }

        return producto;
      };

      _this._fillWithZeros = function (value, totalZeros) {

        var lengthValue = totalZeros - value.length;
        var zeros = '';

        if (lengthValue > 0) {
          for (var i = 0; i < lengthValue; i++) {
            zeros += '0';
          }
        }

        return zeros + value;
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
          responseModal: null,
          hiddenButtonClose: false
        },
        producto: null,
        productoSelected: null,
        birthDate: null,
        codigoPostal: null,
        codigoValidacion: null,
        formaPago: null,
        medioPago: null,
        provincia: null,
        mail: null,
        mailsRegistrados: null,
        displayForm: false,
        PID: null
      };
      return _this;
    }

    _createClass(FirstLogin, [{
      key: "render",
      value: function render() {
        if (!this.state.dataCAI) {
          return React.createElement("div", null);
        }

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "" },
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "div",
                  { className: "col-md-12" },
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "div",
                      null,
                      "Primer Ingreso"
                    ),
                    React.createElement("br", null),
                    React.createElement(
                      "div",
                      { className: "form-inline" },
                      "Por favor eleg\xED alg\xFAn producto que tengas en la compa\xF1\xEDa. En base al producto deber\xE1s completar algunos datos para poder identificarte como cliente y asociar todas tus p\xF3lizas a tu usuario de HSBC Seguros On Line. Estos datos se te pedir\xE1n por \xFAnica vez."
                    ),
                    React.createElement("br", null),
                    React.createElement(
                      "div",
                      { className: "mb-3" },
                      React.createElement(
                        "label",
                        { className: "col-md-2" },
                        "Producto:"
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-7 d-inline-block" },
                        React.createElement(DropdownContainer, {
                          dataList: this.state.dataCAI.OPTIONS,
                          className: "input-background-color form-control",
                          id: "producto",
                          name: "producto",
                          idObject: "VALUE",
                          nameObject: "CONTENT",
                          onResult: this._handleResults })
                      )
                    ),
                    this.state.displayForm && (this.state.PID === 'N' || this.state.PID === 'O') && this.state.mailsRegistrados !== null ? React.createElement(
                      "div",
                      null,
                      React.createElement(
                        "div",
                        { className: "mb-3", style: { paddingLeft: "15px" } },
                        "Para poder autoregistrarte debemos enviarte un c\xF3digo de validac\xEDon a alguno de los mails que tenemos registrados. Por favor selecciona el mismo del desplegable que se encuentra debajo y oprim\xED el boton \"enviar c\xF3digo de validac\xEDon\":"
                      ),
                      React.createElement(
                        "div",
                        { className: "mb-3 row", style: { paddingLeft: "15px" } },
                        React.createElement(
                          "label",
                          { className: "col-md-2" },
                          "Mail registrado:"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-7 d-inline-block mb-2" },
                          React.createElement(DropDownContent, {
                            list: this.state.mailsRegistrados,
                            className: "input-background-color form-control",
                            id: "mail",
                            name: "mail",
                            idObject: "CODIGO",
                            nameObject: "MAIL",
                            disabled: this.state.mailsRegistrados.length === 0,
                            placeHolder: this.state.mailsRegistrados.length === 0 ? "Actualmente no tenes un mail registrado" : "",
                            defaultValue: this.state.mail !== null ? this.state.mail.id : "default",
                            changeValue: this.state.mail ? undefined : true,
                            onResult: this._handleResults }),
                          React.createElement(
                            "div",
                            { className: "mt-2", style: { fontSize: "14px" } },
                            "En caso que no tengas ningun mail registrado o los que figuren no se encuentren vigentes por favor comunicate con el call center para hacer la autoregistraci\xF3n: 0810-333-8432"
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "col" },
                          React.createElement(
                            "button",
                            {
                              onClick: this._handleCodeValidation,
                              type: "button",
                              disabled: this._disableVerificationButton(),
                              className: "btn btn-sm btn-success"
                            },
                            "Enviar c\xF3digo de validac\xEDon"
                          )
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "mb-3", style: { paddingLeft: "15px" } },
                        "Recibido tu c\xF3digo, por favor ingresalo en el campo que se encuentra debajo:"
                      ),
                      React.createElement(
                        "div",
                        { className: "mb-3" },
                        React.createElement(
                          "label",
                          { className: "col-md-3" },
                          "C\xF3digo de validac\xEDon:"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-5 d-inline-block" },
                          React.createElement(InputValidation, {
                            id: "codigoValidacion",
                            name: "codigoValidacion",
                            placeholder: "Ingresa el c\xF3digo que recibiste por mail...",
                            type: "text",
                            charactersStr: "",
                            className: "form-control",
                            onResult: this._handleResults
                          })
                        )
                      )
                    ) : this.state.displayForm && this.state.PID === "L" ? React.createElement(
                      "div",
                      null,
                      (this.state.PID === 'N' || this.state.PID === 'O') ? React.createElement(
                        "div",
                        { className: "mb-2" },
                        React.createElement(
                          "label",
                          { className: "col-md-5" },
                          "Fecha de Nacimiento del Contratante:"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-7 d-inline-block" },
                          React.createElement(DatePicker, {
                            id: "birthDate",
                            className: "input-background-color form-control input-size",
                            name: "birthDate",
                            onResult: this._handleResults,
                            formatValue: true
                          })
                        )
                      ) : React.createElement(
                        "div",
                        { className: "mb-2" },
                        React.createElement(
                          "label",
                          { className: "col-md-5" },
                          "C\xF3digo postal:"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-7 d-inline-block" },
                          React.createElement(InputValidation, {
                            id: "codigoPostal",
                            name: "codigoPostal",
                            type: "text",
                            minLength: "2",
                            maxLength: "10",
                            charactersStr: "",
                            className: "form-control",
                            onResult: this._handleResults
                          })
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "mb-2" },
                        React.createElement(
                          "label",
                          { className: "col-md-5" },
                          "Forma de Pago de la P\xF3liza"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-7 d-inline-block" },
                          React.createElement(DropdownContainer, {
                            dataList: this.state.canalesCobro,
                            className: "input-background-color form-control",
                            id: "formaPago",
                            name: "formaPago",
                            idObject: "COBROCOD",
                            nameObject: "COBRODAB",
                            onResult: this._handleResults })
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "mb-2" },
                        React.createElement(
                          "label",
                          { className: "col-md-5" },
                          "Medio de Pago de la P\xF3liza:"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-7 d-inline-block" },
                          React.createElement(DropdownContainer, {
                            dataList: this.state.tarjetas,
                            className: "input-background-color form-control",
                            id: "medioPago",
                            name: "medioPago",
                            idObject: "COD_TAR",
                            nameObject: "DES_TAR",
                            onResult: this._handleResults })
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "mb-2" },
                        React.createElement(
                          "label",
                          { className: "col-md-5" },
                          "Provincia Domicilio de Correspondencia:"
                        ),
                        React.createElement(
                          "div",
                          { className: "col-md-7 d-inline-block" },
                          React.createElement(DropdownContainer, {
                            dataList: this.state.provincias,
                            className: "input-background-color form-control",
                            id: "provincia",
                            name: "provincia",
                            idObject: "CODIGO",
                            nameObject: "DESCRIPCION",
                            onResult: this._handleResults })
                        )
                      )
                    ) : "",
                    this.state.displayForm && this.state.PID !== 'N' && this.state.PID !== 'O' && this.state.PID !== 'L' && React.createElement(
                      "div",
                      { className: "text-danger col-md-8" },
                      React.createElement("br", null),
                      "Con el producto elegido no se puede continuar con la suscripci\xF3n on-line, por favor, seleccion\xE1 otro producto o llamanos a nuestro centro de atenci\xF3n al cliente.",
                      React.createElement("br", null),
                      React.createElement("br", null)
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "float-right" },
                    React.createElement(
                      "button",
                      { onClick: this.props.onCancel,
                        type: "button",
                        className: "btn btn-danger m-2", "data-dismiss": "modal" },
                      "Cancelar"
                    ),
                    React.createElement(
                      "button",
                      { onClick: this._handleSubmit,
                        type: "button",
                        disabled: this._disableButton(),
                        className: "btn btn-success m-2" },
                      "Continuar"
                    )
                  )
                ),
                React.createElement(ModalReactBootstrap, {
                  title: this.state.modal.title,
                  show: this.state.showModalSinister,
                  size: this.state.modal.size,
                  isOpen: this._handleModalIsOpen,
                  component: this.state.modal.component,
                  contentHTML: this.state.modal.contentHTML,
                  html: this.state.modal.html,
                  responseModal: this.state.modal.responseModal,
                  hiddenButtonClose: this.state.modal.hiddenButtonClose })
              )
            )
          )
        );
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevState.producto !== this.state.producto) {
          this._getProductoSelected();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var segurosOnlineService = new SegurosOnlineService();
        var loginService = new LoginService();
        var endososService = new EndososService();

        segurosOnlineService.analizarCAI().then(function (data) {
          loginService.getProvincias().then(function (provincias) {
            loginService.getCanalesCobro().then(function (canalesCobro) {
              endososService.getTarjetas().then(function (tarjetas) {
                if (tarjetas.Code === 'NO_ERROR') {
                  _this2.setState({
                    step: '1',
                    dataCAI: data,
                    provincias: provincias,
                    canalesCobro: canalesCobro,
                    tarjetas: tarjetas.Message.REGS.REG.concat([{ COD_TAR: 'CA', DES_TAR: 'CAJA DE AHORRO' }, { COD_TAR: 'CC', DES_TAR: 'CUENTA CORRIENTE' }, { COD_TAR: 'DB', DES_TAR: 'DEBITO DIRECTO' }, { COD_TAR: 'SU', DES_TAR: 'DEBITO SUELDO' }, { COD_TAR: 'EF', DES_TAR: 'EFECTIVO' }, { COD_TAR: 'PE', DES_TAR: 'PAGO ELECTRONICO' }])
                  });
                }
              });
            });
          });
        });
      }
    }]);

    return FirstLogin;
  }(React.Component);

  return FirstLogin;
});