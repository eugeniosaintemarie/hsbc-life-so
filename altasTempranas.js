var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/buttonLoading", "../lib/utils", "../services/segurosOnlineService", "../services/endososService", "../redux/store", "../common/modalReactBootstrap", "../common/errorExcel", "../controller/nominaController", "../common/fileManager", "../common/messageComponent", "../components/altaIndividual", "../components/altaCompleta"], function (React, ButtonLoading, Utils, SegurosOnlineService, EndososService, Store, ModalReactBootstrap, ErrorExcel, NominaController, FileManager, MessageComponent, AltaIndividual, AltaCompleta) {
  var AltasTempranas = function (_React$Component) {
    _inherits(AltasTempranas, _React$Component);

    function AltasTempranas(props) {
      _classCallCheck(this, AltasTempranas);

      var _this = _possibleConstructorReturn(this, (AltasTempranas.__proto__ || Object.getPrototypeOf(AltasTempranas)).call(this, props));

      _initialiseProps.call(_this);

      _this.state = {
        altaTempranaLoading: false,
        list: [],
        stateList: [],
        listChecked: [],
        recoverPayrollEmployees: {},
        showAltaCompleta: false,
        showAltaIndividual: false,
        showSuccessMsg: false,
        loadButton: false,
        showForm: false,
        cont: 1,
        idEmployee: 0,
        showModal: false,
        exitoImpreso: false,
        listExcel: [],
        filename: "",
        nominas: [],
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null
        },
        endoso: {
          FECVIGDDE: "",
          FECVIGHTA: ""
        },
        today: "",
        todayString: "",
        presentado: "",
        provincias: []
      };

      var today = new Date();
      _this.day = today.getDate();
      _this.month = today.getMonth() + 1;
      _this.year = today.getFullYear();
      _this.nominaController = new NominaController();
      _this.EndososService = new EndososService();
      return _this;
    }

    _createClass(AltasTempranas, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            React.Fragment,
            null,
            !this.state.showAltaCompleta && !this.state.showAltaIndividual && React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "h4",
                { className: "subtitle-inside" },
                "Carga de Constacia de cobertura altas tempranas"
              ),
              React.createElement(
                "h5",
                { className: "mt-2 mb-2" },
                "Ingresar Constancia de cobertura altas tempranas"
              )
            ),
            React.createElement(
              "div",
              { className: "pb-3" },
              !this.state.showAltaCompleta && !this.state.showAltaIndividual && React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  ButtonLoading,
                  {
                    disabled: this.state.altaTempranaLoading,
                    className: "ml-1 btn btn-hsbc right " + (this.state.altaTempranaLoading ? "disabled" : ""),
                    onClick: this.handleAltasTempranas,
                    loading: this.state.altaTempranaLoading },
                  "Informar Nomina Completa"
                ),
                React.createElement(
                  ButtonLoading,
                  {
                    disabled: this.state.altaTempranaLoading,
                    className: "ml-1 btn btn-hsbc right " + (this.state.altaTempranaLoading ? "disabled" : ""),
                    onClick: this.handleAltasTempranas,
                    loading: this.state.altaTempranaLoading },
                  "Informar Alta Individual"
                ),
                React.createElement(
                  "button",
                  { className: "ml-1 btn btn-hsbc ", onClick: this.props.goToNomina },
                  "Volver"
                )
              ),
              this.state.showAltaCompleta && !this.state.exitoImpreso ? React.createElement(AltaCompleta, {
                showSuccessMsg: this.state.showSuccessMsg,
                goToNomina: this.props.goToNomina,
                showErrorsMsg: this.state.showErrorsMsg,
                fileChangedHandler: this.fileChangedHandler,
                filename: this.state.filename,
                _handleButtonProcess: this._handleButtonProcess,
                listExcel: this.state.listExcel,
                validation: this.state.validation,
                _handleImprimirButton: this._handleImprimirButton,
                _handleButtonCancel: this._handleButtonCancelCompleta,
                nominas: this.state.nominas,
                showAltaCompleta: this._handleButtonCancelCompleta,
                setPresentado: this._handleSetPresentado
              }) : this.state.exitoImpreso && this.state.showAltaCompleta ? React.createElement(MessageComponent, {
                body: "\xA1El certificado se imprimi\xF3 con \xE9xito!",
                button: this._handleButtonCancelCompleta
              }) : this.state.showAltaIndividual && !this.state.exitoImpreso ? React.createElement(AltaIndividual, {
                goToNomina: this.props.goToNomina,
                validation: this.state.validation,
                nominas: this.state.nominas,
                _handleImprimirButton: this._handleImprimirButton,
                _handleButtonCancel: this._handleButtonCancelIndividual,
                _handleButtonAgregar: this._handleButtonAgregar,
                setPresentado: this._handleSetPresentado
              }) : this.state.exitoImpreso && this.state.showAltaIndividual ? React.createElement(MessageComponent, {
                bodyClass: "font-italic font-weight-bold px-5 center",
                body: "\xA1El certificado se imprimi\xF3 con \xE9xito!",
                button: this._handleButtonCancelIndividual
              }) : ""
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModal,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            accept: this._aceptarButton,
            hiddenButtonClose: this.state.modal.hiddenButtonClose
          })
        );
      }
    }]);

    return AltasTempranas;
  }(React.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._handleButtonCancelCompleta = function () {
      var current = _this2.state.showAltaCompleta;
      var currentState = _this2.state;
      var viewsToFalse = _this2.props.setToFalse;

      _this2.setState(Object.assign({}, currentState, viewsToFalse, {
        showAltaCompleta: !current,
        exitoImpreso: false
      }));
    };

    this._handleButtonCancelIndividual = function () {
      var current = _this2.state.showAltaIndividual;
      var currentState = _this2.state;
      var viewsToFalse = _this2.props.setToFalse;

      _this2.setState(Object.assign({}, currentState, viewsToFalse, {
        showAltaIndividual: !current,
        exitoImpreso: false
      }));
    };

    this.handleModalSuccessIsOpen = function (e) {
      var current = _this2.state.showModalSuccess;

      _this2.setState({
        showModalSuccess: !current
      });
    };

    this._aceptarButton = function () {
      if (_this2.state.showAltaCompleta || _this2.state.showAltaIndividual) {
        if (_this2.state.nominas.length > 0) {
          _this2._imprimir();
        }
      }

      _this2.setState({
        showModal: false
      });
    };

    this._imprimir = function () {
      var currentProduct = Store.getState().seguros.currentProduct;

      var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
      var segurosOnlineService = new SegurosOnlineService();
      var Solicitud = void 0;
      var nroDocumento = _this2.props.nroDocu;
      var filename = _this2.props.nroPoliza + ".pdf";

      var Poliza = {
        CABECERA: {
          "COD_PRO": detalle.RAMOPCOD,
          "POL_ANN": detalle.POLIZANN.toString(),
          "POL_SEC": detalle.POLIZSEC,
          "CER_POL": detalle.CERTIPOL,
          "CER_ANN": detalle.CERTIANN,
          "CER_SEC": detalle.CERTISEC,
          "SUP_NUM": _this2.props.nroEndoso || 9999,
          "TOM_TDO": _this2.props.tipoDocumento,
          "TOM_NDO": _this2.props.nroDocu
          // EN EL BACK VA UN PARAM MAS DE USU_OPE QUE SE SACA DEL USUARIO LOGUEADO
        },
        DETALLE: []
      };

      segurosOnlineService.getRecupClixPol({
        "RAMOPCOD": detalle.RAMOPCOD,
        "POLIZANN": detalle.POLIZANN,
        "POLIZSEC": detalle.POLIZSEC,
        "CERTIPOL": detalle.CERTIPOL,
        "CERTIANN": detalle.CERTIANN,
        "CERTISEC": detalle.CERTISEC
      }).then(function (data) {
        var datos = data.Message.CAMPOS;
        var provincia = "";

        _this2.state.provincias.map(function (prov) {
          if (datos.PROVICOD == prov.COD_PRV) {
            provincia = prov.DES_PRV;
          }
        });

        Solicitud = {
          SOLICITUD: {
            "DATOSPOLIZA": {
              "RAMOPCOD": detalle.RAMOPCOD,
              "POLIZANN": detalle.POLIZANN,
              "POLIZSEC": detalle.POLIZSEC,
              "CERTIPOL": detalle.CERTIPOL,
              "CERTIANN": detalle.CERTIANN,
              "CERTISEC": detalle.CERTISEC,
              "POLIZA": _this2.props.nroPoliza,
              "FVIGDES": _this2.state.today, //this.state.endoso.FECVIGDDE,
              "FVIGHAS": _this2.state.endoso.FECVIGHTA,
              "TOMADOR": detalle.TOMADOR,
              "CUITTOM": nroDocumento,
              "CALLETOM": datos.DOMICDOM + " " + datos.DOMICDNU + " " + datos.DOMICPIS + " " + datos.DOMICPTA,
              "ALTCATOM": "",
              "PISOTOM": "",
              "DPTOTOM": "",
              "CPOSTOM": datos.DOMICCPO,
              "PROVTOM": provincia,
              "FECHADIA": _this2.state.todayString
            },
            "ASEGURADOS": []
          }
        };

        if (_this2.state.presentado !== "") {
          Solicitud.SOLICITUD.DATOSPOLIZA.PRESENTADO = _this2.state.presentado.toUpperCase();
        }

        _this2.state.nominas.forEach(function (asegurado) {
          var tipoDoc; //HDNC-723

          if (asegurado.ESTADO == "Existente en nomina vigente") {
            tipoDoc = asegurado.TIPDOCU;
          } else if (asegurado.ESTADO == "Alta Temprana") {
            tipoDoc = 5;
          }

          Poliza.DETALLE.push({
            "NRO_DOC": asegurado.CUIL,
            "TIP_DOC": tipoDoc,
            "APE_NOM": asegurado.APELLIDO + " " + asegurado.NOMBRE,
            "TIP_ASE": asegurado.ESTADO == "Existente en nomina vigente" ? "E" : "A"
          });

          Solicitud.SOLICITUD.ASEGURADOS.push({
            "ASEGURADO": {
              "CUITASEG": asegurado.CUIL,
              "APEASEG": asegurado.APELLIDO + " " + asegurado.NOMBRE,
              "NOMASEG": ""
            }
          });
        });

        var resultado = segurosOnlineService.getImprimirAltasTempranas(Solicitud).then(function (data) {
          var fileManager = new FileManager();
          var resultDownload = fileManagerPDF(data, filename);

          return resultDownload;
        });

        if (!resultado) {
          _this2.setState({
            showModal: true,
            modal: {
              component: null,
              contentHTML: "Ha surgido un error al generar la copia de póliza",
              html: true,
              title: "Copia de póliza",
              size: "md"
            }
          });
        } else {
          _this2.setState({
            presentado: "",
            exitoImpreso: true
          });
        }

        _this2.nominaController.logImpresoAltasTempranas(Poliza);
      });
    };

    this._handleImprimirButton = function () {
      _this2.setState({
        showModal: true,
        modal: {
          component: React.createElement(
            "p",
            null,
            "De continuar e imprimir el certificado, cualquier modificaci\xF3n requerira del proceso completo de nuevo"
          ),
          contentHTML: "",
          html: false,
          title: "Advertencia",
          size: "md",
          hiddenButtonClose: true

        },
        showError: false,
        textError: ''
      });
    };

    this._handleButtonAgregar = function (nuevo) {
      var array = _this2.state.nominas;
      array.push(nuevo);

      _this2.setState({
        nominas: array
      });
    };

    this._handleButtonProcess = function () {
      _this2.nominaController.handleXLS(_this2.fileExcel, function (list) {
        if (list.length == 0) {
          _this2.setState({
            showModal: true,
            modal: {
              component: "Error al procesar el archivo",
              contentHTML: "",
              html: false,
              title: "Carga de archivo de nomina",
              size: "md"
            }
          });
          _this2.setState({
            listExcel: [],
            nominas: []
          });
        }

        _this2.nominaController.validateField(list, 3, false, 0, 0, function (listError) {
          _this2.setState({
            fileError: listError.length,
            showModal: true,
            modal: {
              component: React.createElement(ErrorExcel, { listError: listError }),
              contentHTML: "",
              html: false,
              title: "Carga de archivo de nomina",
              size: "md"
            }
          });

          _this2.setState({
            listExcel: []
          });
        }, function (listOK) {
          _this2.setState({
            listExcel: listOK,
            validation: false,
            nominas: _this2._checkAltasTempranas()
          });
        });
      });
    };

    this._handleSetPresentado = function (inputValue) {
      _this2.setState({
        presentado: inputValue
      });
    };

    this.consultarEndosos = function (detalle, today) {
      return new Promise(function (resolve, reject) {
        var segurosOnlineService = new SegurosOnlineService();
        segurosOnlineService.getDetalleEndoso({
          FECHADDE: today - 100000, // 10 años antes al dia actual
          FECHAHTA: today,
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          SUPLENUM: detalle.SUPLENUM
        }).then(function (endorsementData) {
          if (endorsementData && endorsementData[0].ENDOSO == _this2.props.nroEndoso) {
            _this2.setState({
              altaTempranaLoading: false,
              endoso: {
                FECVIGDDE: Utils.formatFechaNumber(endorsementData[0].FECVIGDDE),
                FECVIGHTA: Utils.formatFechaNumber(endorsementData[0].FECVIGHTA)
              }
            });

            resolve(endorsementData[0].ENDOSO);
          } else {
            _this2.setState({ altaTempranaLoading: false });
            _this2.setState({
              showModal: true,
              modal: {
                component: null,
                contentHTML: "<p>Debe seleccionar el ultimo endoso para cargar constancia de altas tempranas</p>",
                html: true,
                title: "Endoso incorrecto",
                size: "md"
              }
            });
          }
        });
      });
    };

    this.handleAltasTempranas = function (e) {
      var today = Utils.formatFechaNumber(Utils.dateToString(new Date()));
      var currentProduct = Store.getState().seguros.currentProduct;

      var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
      var completa = e.target.innerHTML.includes("Completa");
      var individual = e.target.innerHTML.includes("Individual");
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

      _this2.setState({ altaTempranaLoading: true });

      _this2.consultarEndosos(detalle, today).then(function () {
        _this2.setState({
          showAltaCompleta: completa,
          showAltaIndividual: individual,
          todayString: _this2.day + " de " + meses[_this2.month - 1] + " de " + _this2.year,
          today: today
        });
      });

      _this2.EndososService.getProvinciaList({}).then(function (data) {
        _this2.setState({ provincias: data.Message.REGS.REG });
      });

      if (individual == true) {
        var estado = void 0;
        var cuil = void 0;
        var apellido = void 0;
        var nombre = void 0;
        var tipoDoc = void 0;
        var jsonNominas = void 0;
        var arrayNominas = [];

        _this2.props.asegurados.map(function (asegurado) {
          estado = "Existente en nomina vigente";
          cuil = asegurado.ASNRODOC;
          var apellidoNombre = asegurado.ASEGURADOR.split(" ");
          apellido = apellidoNombre[0];

          if (apellidoNombre[2] == undefined) {
            nombre = apellidoNombre[1];
          } else {
            nombre = apellidoNombre[1] + " " + apellidoNombre[2];
          }

          tipoDoc = asegurado.ASTIPDOC;

          jsonNominas = { TIPDOCU: tipoDoc, CUIL: cuil, NOMBRE: nombre, APELLIDO: apellido, ESTADO: estado };
          arrayNominas.push(jsonNominas);
        });

        _this2.setState({
          nominas: arrayNominas
        });
      }
    };

    this._handleModalIsOpen = function (e) {
      var current = _this2.state.showModal;

      _this2.setState({
        showModal: !current
      });
    };

    this._checkAltasTempranas = function () {
      var estado = "Alta Temprana";
      var cuil = void 0;
      var apellido = void 0;
      var nombre = void 0;
      var tipoDoc = void 0;
      var jsonNominas = void 0;
      var arrayNominas = [];

      if (_this2.state.showAltaCompleta && _this2.state.listExcel.length > 0) {
        _this2.state.listExcel.map(function (e) {
          estado = "Alta Temprana";
          cuil = e.CUIL;
          apellido = e.APELLIDO;
          nombre = e.NOMBRE;
          tipoDoc = 5;

          _this2.props.asegurados.map(function (asegurado) {
            if (asegurado.ASNRODOC == cuil) {
              estado = "Existente en nomina vigente";
              tipoDoc = asegurado.ASTIPDOC;
            }
          });
          jsonNominas = { TIPDOCU: tipoDoc, CUIL: cuil, NOMBRE: nombre, APELLIDO: apellido, ESTADO: estado };
          arrayNominas.push(jsonNominas);
        });
      } else {
        _this2._handleButtonProcess();
      }

      return arrayNominas;
    };

    this._altaIndividual = function () {};

    this.fileChangedHandler = function (oInput) {
      var target = oInput.target;
      var _validFileExtensions = [".xls", ".xlsx"];
      var listFiles = oInput.target.files;

      if (listFiles.length == 1) {
        var file = listFiles[0];
        var fileName = file.name;

        _this2.setState({ filename: fileName });

        if (fileName.length > 0) {
          var blnValid = false;

          for (var j = 0; j < _validFileExtensions.length; j++) {
            var sCurExtension = _validFileExtensions[j];

            if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
              blnValid = true;
              break;
            }
          }

          if (blnValid) {
            _this2.fileExcel = file;
            target.value = "";
          } else {
            _this2.setState({
              showModal: true,
              modal: {
                component: null,
                contentHTML: "Tiene que elegir un documento de extensión .xls o .xlsx.",
                html: true,
                title: "Carga de archivo nomina",
                size: "md"
              }
            });
            target.value = "";

            return false;
          }
        }
      }
    };
  };

  return AltasTempranas;
});