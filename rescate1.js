var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../common/modalReactBootstrap", "../common/validationResc", "../common/modal", "../lib/utils", "../services/segurosOnlineService", "../services/retiroNominaService", "../redux/store"], function (React, UserService, ModalReactBootstrap, ValidationResc, Modal, Utils, SegurosOnlineService, RetiroNominaService, Store) {
  var Rescate1 = function (_React$Component) {
    _inherits(Rescate1, _React$Component);

    function Rescate1(props) {
      _classCallCheck(this, Rescate1);

      var _this = _possibleConstructorReturn(this, (Rescate1.__proto__ || Object.getPrototypeOf(Rescate1)).call(this, props));

      _this.FORM_NAME = "Rescate1";

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;

        _this.setState({
          showModal: !current
        });
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

      _this._handleInterPeriodo999 = function () {
        var currentProduct = Store.getState().seguros.currentProduct;

        var segurosOnlineService = new SegurosOnlineService();

        params1551 = {
          'CIAASCOD': currentProduct.detalle.CIAASCOD,
          'RAMOPCOD': currentProduct.detalle.RAMOPCOD,
          'POLIZANN': currentProduct.detalle.POLIZANN,
          'POLIZSEC': currentProduct.detalle.POLIZSEC,
          'CERTIPOL': currentProduct.detalle.CERTIPOL,
          'CERTIANN': currentProduct.detalle.CERTIANN,
          'CERTISEC': currentProduct.detalle.CERTISEC
        };

        segurosOnlineService.get1551_RescatesMov999(params1551).then(function (mensaje1551) {
          if (mensaje1551.Message.CAMPOS.INTERPERI == 0) {
            _this.setState({
              montoCuentaActual: mensaje1551.Message.CAMPOS.SALDOMOFO,
              cheked: false

            });
          } else {
            _this.setState({
              montoCuentaActual: mensaje1551.Message.CAMPOS.SALDOMOFO,
              disabledCheck: false,
              disabledMontoRescatar: true,
              cheked: true
            });
          }
        });
      };

      _this._handleBack = function () {
        _this.props.switch('home');
      };

      _this._handleSubmit = function () {
        var montoRetirar = _this.state.form.montoRetirar;


        var montoTotalCuenta = 0;

        if (_this.state.disabledMontoRescatar) {
          var montoCuentaAct = Number.parseInt(_this.state.montoCuentaActual, 10);
          montoTotalCuenta = montoCuentaAct / 100;

          if (montoTotalCuenta > _this.state.sumMax) {
            //Monto no permitido mayor a sumMax.
            _this.props.switch('errorMonto');
          } else {
            //pasar a la pantalla siguiente.
            //Mismo monto para ambos casos (monto total a retirar y el deseado para validacion final)
            _this.props.montoSaldoTotal(montoTotalCuenta);
            _this.props.addMonto(montoTotalCuenta);
            //  this.props.montoSaldoTotal(this.state.montoCuentaActual.value);
            _this.props.switch('rescateCobro');
          }
          //RETIRO CON OPCION DE INGRESAR VALOR A RETIRAR
        } else {
          var montoTotalRetirar = Number.parseFloat(montoRetirar.value).toFixed(2);

          if (montoTotalRetirar > _this.state.sumMax) {
            //Monto no permitido mayor a sumMax.
            _this.props.switch('errorMonto');
          } else {
            //pasar a la pantalla siguiente.
            _this.props.montoSaldoTotal(_this.state.montoCuentaActual / 100);
            _this.props.addMonto(montoTotalRetirar);
            //  this.props.montoSaldoTotal(this.state.montoCuentaActual.value);
            _this.props.switch('rescateCobro');
            // this.props.switch('rescateInfoAdicional');
          }
        }
      };

      _this.state = {
        montoCuentaActual: "0",
        disabledMontoRescatar: false,
        cheked: true,
        disabledCheck: true,
        showModal: false,
        sumMax: 0,
        modal: {
          title: "Aviso",
          component: null,
          contentHTML: "",
          html: true,
          size: "md",
          responseModal: null,
          hiddenButtonClose: false
        },
        form: { montoRetirar: 0 }
      };
      return _this;
    }

    _createClass(Rescate1, [{
      key: "render",
      value: function render() {
        var montoRetirar = this.state.form.montoRetirar;

        var submitDisabled = typeof montoRetirar.isValidate !== "undefined" && montoRetirar.isValidate || this.state.disabledMontoRescatar == true ? false : true;

        this.props.isSubmitting;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "panel d-block" },
              React.createElement(
                "div",
                { className: "panel" },
                React.createElement(
                  "div",
                  { className: "panel-title" },
                  React.createElement(
                    "h2",
                    { className: "text-left text-dark" },
                    "Rescate"
                  ),
                  React.createElement("hr", { className: "red" })
                ),
                React.createElement(
                  "div",
                  { className: "panel-container" },
                  !this.state.disabledMontoRescatar && React.createElement(
                    "div",
                    { className: "form-group row" },
                    React.createElement(
                      "div",
                      { className: "col-md-4" },
                      React.createElement(
                        "label",
                        null,
                        "Monto que posee en la cuenta actual:"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(
                        "strong",
                        { name: "monto-actual", id: "monto-actual" },
                        this.state.disabledMontoRescatar ? "-" : this.state.montoCuentaActual / 100
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
                        "Monto a retirar:"
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(ValidationResc, {
                        id: "montoRetirar",
                        name: "montoRetirar",
                        type: "number",
                        pattern: "[0-9]*",
                        minLength: "2",
                        maxLength: "10",
                        requiredStr: "Monto requerido",
                        disabled: this.state.disabledMontoRescatar,
                        compareData: this.state.montoCuentaActual,
                        className: "form-control",
                        onResult: this._handleResults
                      })
                    ),
                    React.createElement(
                      "div",
                      { "class": "col-md-8 offset-md-4" },
                      React.createElement(
                        "small",
                        { "class": "font-italic" },
                        "Si su p\xF3liza posee quita, los rescates de fondos est\xE1n sujetos a esta"
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { align: "right", "class": "mt-5" },
                    React.createElement(
                      "button",
                      {
                        disabled: submitDisabled,
                        className: "btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleSubmit
                      },
                      "Actualizar"
                    ),
                    React.createElement(
                      "button",
                      { className: "btn btn btn-light border-dark right ml-2", onClick: this._handleBack },
                      "Cancelar"
                    )
                  )
                )
              )
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModal,
              size: this.state.modal.size,
              isOpen: this._handleModalIsOpen,
              component: this.state.modal.component,
              contentHTML: this.state.modal.contentHTML,
              html: this.state.modal.html,
              responseModal: this.state.modal.responseModal,
              hiddenButtonClose: this.state.modal.hiddenButtonClose })
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var userService = new UserService();
        retiroNominaService = new RetiroNominaService();
        var currentProduct = Store.getState().seguros.currentProduct;

        var segurosOnlineService = new SegurosOnlineService();

        retiroNominaService.getNBWSParamGrl({ COD_PAR: "RESSUMMAX" }).then(function (data) {
          _this2.setState(function (prevState) {
            return {
              sumMax: Number(data.Message.REGS.REG[0].VAL_PAR),
              showModal: true,
              modal: Object.assign({}, prevState.modal, {
                contentHTML: "Consider&aacute; que pod&eacute;s rescatar hasta " + data.Message.REGS.REG[0].VAL_PAR + " USD por este medio. Si deseas rescatar m&aacute;s pod&eacute;s hacerlo llamando al 0800-333-0003"
              })
            };
          });
        });

        var ramo = currentProduct.detalle.RAMOPCOD;
        if (ramo.substring(0, 3) == 'IC0' && ramo != 'IC07') {
          // HFE1-288
          params1551 = {
            'CIAASCOD': currentProduct.detalle.CIAASCOD,
            'RAMOPCOD': currentProduct.detalle.RAMOPCOD,
            'POLIZANN': currentProduct.detalle.POLIZANN,
            'POLIZSEC': currentProduct.detalle.POLIZSEC,
            'CERTIPOL': currentProduct.detalle.CERTIPOL,
            'CERTIANN': currentProduct.detalle.CERTIANN,
            'CERTISEC': currentProduct.detalle.CERTISEC
          };

          segurosOnlineService.get1551_RescatesMov999(params1551).then(function (mensaje1551) {
            if (mensaje1551.Message.CAMPOS.ENCUADRADA == 'N' && ['IC01', 'IC02', 'IC03'].includes(ramo)) {
              _this2.props.switch('errorPoliza');
              _this2.props.errorPoliza('(R2)');
            }

            // Solo se permite rescatar a los IC0 (excepto IC07), y los 01 02 y 03 tienen que tener encuadrada

            // Si 999 (INTERPERI) es 0, continua normal, sino redistribuye y vuelve a probar
            if (mensaje1551.Message.CAMPOS.INTERPERI != 0) {
              params1552 = {
                'CIAASCOD': currentProduct.detalle.CIAASCOD,
                'RAMOPCOD': currentProduct.detalle.RAMOPCOD,
                'POLIZANN': currentProduct.detalle.POLIZANN,
                'POLIZSEC': currentProduct.detalle.POLIZSEC,
                'CERTIPOL': currentProduct.detalle.CERTIPOL,
                'CERTIANN': currentProduct.detalle.CERTIANN,
                'CERTISEC': currentProduct.detalle.CERTISEC,
                'ORDENNUM': mensaje1551.Message.CAMPOS.ORDENMOFO
              };
              segurosOnlineService.get1552_Ajustes999(params1552).then(function (mensaje1552) {
                if (mensaje1552.Code && mensaje1552.Code == "NO_ERROR" && mensaje1552.Message.CAMPOS.RESPUESTA != "") {
                  //FIN DE PROCESO se arroja error de poliza
                  _this2.props.switch('errorPoliza');
                  _this2.props.errorPoliza('(M1)');
                } else {
                  segurosOnlineService.get1551_RescatesMov999(params1551).then(function (verificaDistribucion) {
                    //SE VERIFICA DISTRIBUCION DE FONDOS SI QUEDA EN CERO (INTERPERIODO) AVANZA, SINO DA ERROR DE POLIZA y FIN DE PROCESO.
                    if (verificaDistribucion.Message.CAMPOS.INTERPERI != 0) {
                      _this2.props.switch('errorPoliza');
                      _this2.props.errorPoliza('(M2)');
                    }
                  });
                }
              });
            }
          });

          segurosOnlineService.getPoliza({
            CIAASCOD: currentProduct.detalle.CIAASCOD,
            RAMOPCOD: currentProduct.detalle.RAMOPCOD,
            POLIZANN: currentProduct.detalle.POLIZANN,
            POLIZSEC: currentProduct.detalle.POLIZSEC,
            CERTIPOL: currentProduct.detalle.CERTIPOL,
            CERTIANN: currentProduct.detalle.CERTIANN,
            CERTISEC: currentProduct.detalle.CERTISEC
          }).then(function (poliza) {
            if (poliza.Message.CAMPOS.PERMITE == "N") {
              _this2.props.switch('errorFondos');
            }
          });

          segurosOnlineService.getRecupClixPol({
            CIAASCOD: currentProduct.detalle.CIAASCOD,
            RAMOPCOD: currentProduct.detalle.RAMOPCOD,
            POLIZANN: currentProduct.detalle.POLIZANN,
            POLIZSEC: currentProduct.detalle.POLIZSEC,
            CERTIPOL: currentProduct.detalle.CERTIPOL,
            CERTIANN: currentProduct.detalle.CERTIANN,
            CERTISEC: currentProduct.detalle.CERTISEC
          }).then(function (clientexPol) {
            // if (clientexPol.Message.CAMPOS.CATEGCLI == '12' ||
            //   clientexPol.Message.CAMPOS.CATEGCLI == '13' ||
            //   clientexPol.Message.CAMPOS.CATEGCLI == '14') {
            //PANTALLA ERROR POLIZA POR CLIENTE HIGHT
            //   this.props.switch('errorPoliza');
            //  this.props.errorPoliza('(C1)');
            // } else {
            // CLIENTE LOW 
            userService.getLoggedUser().then(function (user) {
              if (currentProduct.detalle.MENSASUS == "00") {
                segurosOnlineService.get1133_CliNegativizados().then(function (clienteNeg) {
                  var markNegativo = clienteNeg.Message.CAMPOS.MARKNEGATIVO;
                  var campMotivo = clienteNeg.Message.CAMPOS.MOTIVO;

                  if (markNegativo == "N" || markNegativo !== "N" && campMotivo >= 1 && campMotivo <= 51 && campMotivo !== 10 && campMotivo !== 35 && campMotivo !== 47) {
                    //Permite ingresar el monto o retirar el total y valida para el caso de monto a ingresar que no 
                    //mas de 1500 USD
                    _this2.props.getClientNeg(clienteNeg.Message.CAMPOS);
                    _this2._handleInterPeriodo999();
                  } else {
                    //PANTALLA DE IMPOSIBILIDAD DE POLIZA
                    _this2.props.switch('errorPoliza');
                    _this2.props.errorPoliza('(C3)');
                  }
                });
              } else if (currentProduct.detalle.MENSASUS == '54' || currentProduct.detalle.MENSASUS == '53' || currentProduct.detalle.MENSASUS == '03' || currentProduct.detalle.MENSASUS == '04' || currentProduct.detalle.MENSASUS == '10' || currentProduct.detalle.MENSASUS == '52') {
                //PANTALLA DE IMPOSIBILIDAD DE POLIZA
                _this2.props.switch('errorPoliza');
                _this2.props.errorPoliza('(C2)');
              }
            });
            //}
          });
        } else {
          this.props.switch('errorPoliza');
          this.props.errorPoliza('(R1)');
        }
      }
    }]);

    return Rescate1;
  }(React.Component);

  return Rescate1;
});