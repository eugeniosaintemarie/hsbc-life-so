var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", 'react-dom', '../services/userService', "../common/inputvalidationExt", "../common/modal", "../services/segurosOnlineService", "../redux/store", "../common/errormessage", "../common/modalReactBootstrap"], function (React, ReactRedux, ReactDOM, UserService, InputValidationExt, Modal, SegurosOnlineService, Store, Errormessage, ModalReactBootstrap) {
  var RescateValidacion = function (_React$Component) {
    _inherits(RescateValidacion, _React$Component);

    function RescateValidacion(props) {
      _classCallCheck(this, RescateValidacion);

      var _this = _possibleConstructorReturn(this, (RescateValidacion.__proto__ || Object.getPrototypeOf(RescateValidacion)).call(this, props));

      _this.FORM_NAME = "RescateValidacion";

      _this._handleBack = function () {
        _this.props.switch('rescateInfoAdicional');
      };

      _this._handleResults = function (id, result) {
        var data = _defineProperty({}, id, result);
        var form = Object.keys(_this.state.form);
        form = form.find(function (el) {
          return el === id;
        });
        if (typeof form !== "undefined") {
          var current = _this.state;
          var old = _this.state.form;
          _this.setState(Object.assign({}, current, {
            form: Object.assign({}, old, data)
          }));
        }
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._reSendEMail = function () {
        var segurosOnlineService = new SegurosOnlineService();
        segurosOnlineService.envioCodigoVerificacion().then(function (validacion) {
          if (validacion.Message.CODRESULTADO == "OK") {
            //Se reenvia mail  */
            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: 'Se ha enviado un mail con el codigo de validacion.',
                html: true,
                title: "Rescates",
                size: "md"
              }
            });
          } else {
            //ERROR AL CONSULTAR SERVICIO ENVIO MAIL  */
            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: 'Error al enviar el correo con el codigo de validacion.',
                html: true,
                title: "Rescates",
                size: "md"
              }
            });
          }
        });
      };

      _this._integrateAIS = function () {
        var segurosOnlineService = new SegurosOnlineService();
        var currentProduct = Store.getState().seguros.currentProduct;


        var fecha = new Date(); //Fecha actual
        var mes = fecha.getMonth() + 1; //obteniendo mes
        var dia = fecha.getDate(); //obteniendo dia
        var ano = fecha.getFullYear(); //obteniendo año

        //parametros de grabacion de rescate 3100_OP_GrabaRoS  //LISTA
        paramRecordRescate = {
          'CIAASCOD': currentProduct.detalle.CIAASCOD,
          'RAMOPCOD': currentProduct.detalle.RAMOPCOD,
          'POLIZANN': currentProduct.detalle.POLIZANN,
          'POLIZSEC': currentProduct.detalle.POLIZSEC,
          'CERTIPOL': currentProduct.detalle.CERTIPOL,
          'CERTIANN': currentProduct.detalle.CERTIANN,
          'CERTISEC': currentProduct.detalle.CERTISEC,
          'SUPLENUM': currentProduct.detalle.SUPLENUM,
          'EFECTANN': ano,
          'EFECTMES': mes,
          'EFECTDIA': dia,
          'ORDENDENUN': 0,
          'FECDENUN': parseInt(ano + (mes < 10 ? '0' : '') + mes + (dia < 10 ? '0' : '') + dia),
          'CAUSACOD': 'RESP',
          'SUBCAUCO': 'RESP',
          'SINIEDOM': '',
          'SINIEPOB': '',
          'SINIECPO': 0,
          'DOCUMDAT': '',
          'FECINSEG': 0,
          'FECUDTRA': 0,
          'FECINCAP': 0,
          'FECINCAJ': 0,
          'INCAPOR1': 0,
          'INCAPOR2': 0,
          'RESINI': [{ 'COBECONC': '002/IN', 'RESERMAX': parseInt(String(_this.props.montoTotal).replace('.', '')), 'RESERVAM': parseInt(String(_this.props.montoRescatar).replace('.', '')) }],
          'REQPAGO': [{ 'REQUICOD': 0, 'FECSOLIC': 0, 'FECRECEP': 0 }],
          'DSTFDOS': [{ 'FONDO': 0, 'SALDO': 0, 'PORCOR': 0, 'NUEPORC': 0, 'IMPORTE': 0 }],
          'QTAXFDO': [{ 'PENALPOR': 0, 'PENALIMP': 0, 'PENALPORN': 0, 'PENALIMPN': 0 }],
          'CHECKLIST': [{ 'CHECKNUM': 0, 'CHECKVAL': 0, 'CHECKREA': 0 }],
          'DIASINT': 0,
          'DIASTI': 0,
          'MONTORESP': parseInt(String(_this.props.montoRescatar).replace('.', '')),
          'TOPERESP': parseInt(String(_this.props.montoTotal).replace('.', ''))

          //SERVICIO GRABACION RESCATE
        };segurosOnlineService.grabarRescate3100(paramRecordRescate).then(function (recordRescate) {
          var cbu1a3 = "";
          var cbu4a5 = "";
          var cbu6ToFinal = "";
          var pepropia = "S";
          var cuentaSeleccionada = 0;
          var cbuComp = 0;

          //VALIDA SI HAY CBU CARGADO
          if (_this.props.numeroCBU.value != undefined && _this.props.numeroCBU.value != "") {
            //FORMATEO DE CBU primeros tres digitos y demas
            cbu1a3 = _this.props.numeroCBU.value.substring(0, 3);
            cbu4a5 = _this.props.tipoCuenta === 'CA' ? "02" : _this.props.tipoCuenta === 'CC' ? '01' : '00';
            cbu6ToFinal = _this.props.nroCuenta;
            cbuComp = _this.props.numeroCBU.value;
            //CUENTA NO DE CBU SINO SELECCIONADA
          } else {
            cbu1a3 = "150";
            cbu4a5 = _this.props.tipoCuenta === 'IM' ? "02" : _this.props.tipoCuenta === 'ST' ? '01' : '00';
            cbu6ToFinal = _this.props.cuentaSeleccionada;
            cbuComp = _this.props.cuentaSeleccionada;
          }

          //SI NO HAY ERRORES SE LLAMA AL MENSAJE DE ORDEN DE PAGO y parametros
          if (recordRescate.Code && recordRescate.Code == "NO_ERROR" && recordRescate.Message.CAMPOS.CODERR == "") {

            //parametros de orden pago 3401_OrdenDePago
            paramOrdenPago = {
              'CIAASCOD': currentProduct.detalle.CIAASCOD,
              'RAMOPCOD': currentProduct.detalle.RAMOPCOD,
              'POLIZANN': currentProduct.detalle.POLIZANN,
              'POLIZSEC': currentProduct.detalle.POLIZSEC,
              'CERTIPOL': currentProduct.detalle.CERTIPOL,
              'CERTIANN': currentProduct.detalle.CERTIANN,
              'CERTISEC': currentProduct.detalle.CERTISEC,
              'SUPLENUM': currentProduct.detalle.SUPLENUM,
              'SINIEANN': recordRescate.Message.CAMPOS.SINIEANN,
              'SINIENUM': recordRescate.Message.CAMPOS.SINIENUM,
              'PAGOSIMP': parseInt(String(_this.props.montoRescatar).replace('.', '')),
              'IRPFIMPO': 0,
              'IVAIMPOR': 0,
              'NETOIMPO': parseInt(String(_this.props.montoRescatar).replace('.', '')),
              'TIPAGCOD': 'JE00',
              'PRFESCOD': 0,
              'CLIENSEC': 0,
              'DOMICSEC': 0,
              'CUENTSEC': '',
              'MONENCOD': 0,
              'TIPOPERC': '',
              'FORPAGO': 'JE00',
              'OBSERVAC': cuentaSeleccionada,
              'ORDENCHQ': '',
              'OFICDEST': '',
              'SWAGRUPA': '',
              'PECODBAN': parseFloat(cbu1a3),
              'PETIPCUE': parseFloat(cbu4a5),
              'PENUMCUE': cbu6ToFinal,
              'PEPROPIA': pepropia,
              'RELBECOD': '',
              'COBRACOD': '',
              'MOTSECC': '',
              'NADAPASI': '',
              'COBPAGAS': [{ 'COBERCOD': 0, 'CONCERES': "", 'COBERORD': 0, 'PAGOSIMP': 0 }],
              'CUIT': _this.props.cuit.value,
              'TITULAR': _this.props.titular.value.substr(0,40),
              'CBU': cbuComp

              //SERVICIO ORDEN DE PAGO
            };segurosOnlineService.generarOrdenDePago3401(paramOrdenPago).then(function (ordenDePago) {

              //SI NO HAY ERRORES SE LLAMA AL MENSAJE DE ORDEN DE PAGO y parametros
              if (ordenDePago.Code && ordenDePago.Code == "NO_ERROR" && ordenDePago.Message.CAMPOS.CODERR == "") {
                //parametros de orden pago 3401_OrdenDePago
                paramAutPago = {
                  'CIAASCOD': 9999,
                  'RAMOPCOD': 9999,
                  'POLIZANN': currentProduct.detalle.POLIZANN,
                  'POLIZSEC': currentProduct.detalle.POLIZSEC,
                  'COBERCOD': 999,
                  'TIPOPERS': 99,
                  'CARACTER': 9,
                  'CAUSACOD': 'RESP',
                  'SUBCAUCO': 'RESP',
                  'SUMA': parseInt(String(_this.props.montoRescatar).replace('.', '')),
                  'CIAASCODP': ordenDePago.Message.CAMPOS.CIAASCOD,
                  'RAMOPCODP': ordenDePago.Message.CAMPOS.RAMOPCOD,
                  'SINIEANN': ordenDePago.Message.CAMPOS.SINIEANN,
                  'SINIENUM': ordenDePago.Message.CAMPOS.SINIENUM,
                  'PAGOSAN2': ordenDePago.Message.CAMPOS.PAGOSAN2,
                  'PAGOSSEC': ordenDePago.Message.CAMPOS.PAGOSSEC

                  //SERVICIO AUTORIZACION DE PAGO
                };segurosOnlineService.generarAutorizacionPago3114(paramAutPago).then(function (autPago) {
                  //SI NO HAY ERRORES SE REENVIA A RECEPCION. SINO SE DESPLIEGA ERROR A CONFIRMAR
                  if (autPago.Code && autPago.Code == "NO_ERROR" && autPago.Message.CAMPOS.CODERR == "") {
                    _this.props.switch('rescateRecepcion');
                  } else {
                    //PANTALLA ERROR A DEFINIR (SE MUESTRA ERROR DE USUARIO)
                    _this.props.switch('errorUsuario');
                  }
                });
              } else {
                //PANTALLA ERROR DE ORDEN DE PAGO SE CANCELA EL PROCESO.
                _this.setState({
                  showModalSuccess: true,
                  modal: {
                    component: null,
                    contentHTML: 'No se ha podido generar la orden de pago correspondiente.',
                    html: true,
                    title: "Rescates",
                    size: "md"
                  }
                });
              }
            });
          } else {
            //PANTALLA ERROR A DEFINIR (SE MUESTRA ERROR DE USUARIO)
            _this.props.switch('errorUsuario');
          }
        });
      };

      _this._handleConfirmOnClick = function (e) {
        _this.setState({
          submitting: true
        });

        var segurosOnlineService = new SegurosOnlineService();
        var params = { codigo: _this.state.form.codigo.value };
        segurosOnlineService.verificarCodigo(params).then(function (data) {
          if (data.result == 'pass') {
            //Registrar con AIS, generar Orden de Pago y avanzar a recepcion
            _this._integrateAIS();
          } else if (data.result == 'OK') {
            _this.setState({
              count: _this.state.count + 1,
              showError: true,
              textError: 'Codigo incorrecto Intento ' + _this.state.count + ' de 3',
              submitting: false
              //Intento fallido
            });
          } else if (data.result == 'logOut' || data.result == 'BL') {
            //MODAL QUE MUESTRA AL USUARIO QUE FUE BLOQUEADO/DESLOGUEADO  
            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: 'Ha superado la cantidad maxima de intentos. Su usuario ha sido bloqueado.',
                html: true,
                title: "Rescates",
                size: "md"
              },
              submitting: false
            });
            _this.props.logout();
          }
        });
      };

      _this.state = {
        form: { codigo: "" },
        codigoValidacion: "",
        count: 1,
        showError: false,
        checkRecepcionCod: false,
        textError: '',
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        },
        submitting: false

      };

      _this.handleChangeRecepcionCod = _this.handleChangeRecepcionCod.bind(_this);
      return _this;
    }

    _createClass(RescateValidacion, [{
      key: "handleChangeRecepcionCod",
      value: function handleChangeRecepcionCod(event) {
        var valueCheck = event.target.checked;
        if (event.target.checked == true) {
          this._reSendEMail();
        }
        this.setState({
          checkRecepcionCod: valueCheck
        });
      }
    }, {
      key: "render",
      value: function render() {
        var codigo = this.state.form.codigo;


        var submitDisabled = (typeof codigo.isValidate !== "undefined" && codigo.isValidate ? false : true) || this.props.isSubmitting || this.state.submitting;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "panel" },
              React.createElement(
                "div",
                { className: "panel-title" },
                React.createElement(
                  "strong",
                  null,
                  "Se ha enviado un mail con un c\xF3digo de seguridad a su casilla de mail registrada"
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
                    { className: "my-3 p-3 col-md-4" },
                    React.createElement(
                      "label",
                      null,
                      "Ingrese el c\xF3digo de validaci\xF3n para confirmar el rescate"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "my-3 p-3 col-md-8" },
                    React.createElement(InputValidationExt, {
                      id: "codigo",
                      name: "codigo",
                      type: "password",
                      minLength: "8",
                      maxLength: "20",
                      requiredStr: "codigo requerido",
                      className: "form-control",
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "my-1 p-1" },
                    React.createElement(
                      "label",
                      null,
                      "No recib\xED c\xF3digo de validaci\xF3n"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "my-1 p-1 col-md-5" },
                    React.createElement("input", { type: "checkbox",
                      id: "recepcionCodigo",
                      name: "recepcionCodigo",
                      checked: this.state.checkRecepcionCod,
                      onChange: this.handleChangeRecepcionCod,
                      className: "small" })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "text-center" },
                  React.createElement(Errormessage, { className: "text-danger", show: this.state.showError, text: this.state.textError })
                ),
                React.createElement(
                  "div",
                  { className: "panel-actions text-center center" },
                  React.createElement(
                    "button",
                    {
                      disabled: submitDisabled,
                      className: "btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                      onClick: this._handleConfirmOnClick },
                    this.state.submitting ? React.createElement("div", {
                      className: "spinner-border spinner-border-sm position-spinner mr-2 ",
                      role: "status"
                    }) : '',
                    "Continuar"
                  ),
                  React.createElement(
                    "button",
                    { className: "btn btn btn-light border-dark right ml-2", onClick: this._handleBack },
                    "Cancelar"
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
              contentHTML: this.state.modal.contentHTML
            })
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {}
    }]);

    return RescateValidacion;
  }(React.Component);

  function mapStateToProps(state) {
    return {};
  }

  function mapDispatchToProps(dispatch) {
    return {
      logout: function logout() {
        return dispatch({ type: "LOGOUT" });
      }
    };
  }
  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(RescateValidacion);
});