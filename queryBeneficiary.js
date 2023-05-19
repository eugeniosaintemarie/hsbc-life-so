var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../controller/retiroNominaController", "../../controller/nominaController", "../../controller/beneficiariosController", "../../common/fileManager", "../../services/segurosOnlineService", "../../common/modalReactBootstrap", "../../lib/utils"], function (React, AdhesionController, NominaController, BeneficiariosController, FileManager, SegurosOnlineService, ModalReactBootstrap, Utils) {
  var QueryBeneficiary = function (_React$Component) {
    _inherits(QueryBeneficiary, _React$Component);

    function QueryBeneficiary(props) {
      _classCallCheck(this, QueryBeneficiary);

      var _this = _possibleConstructorReturn(this, (QueryBeneficiary.__proto__ || Object.getPrototypeOf(QueryBeneficiary)).call(this, props));

      _this._handleSetFormData = function (form) {
        _this.formData = form;
      };

      _this._handleButtonCancel = function () {
        _this.props.handleShowMain();
      };

      _this.handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this.handleRepeatZero = function (polAnn, polSec) {
        var zero = "0";
        var long = polSec.toString().length;
        if (polAnn.toString().length == "1") {
          polAnn = "0" + polAnn;
        }
        for (var i = 7; i >= 0; i--) {
          if (i + long == 6) {
            return polAnn + "-" + zero.repeat(i) + polSec;
          }
        }
      };

      _this.handleDownloadExcel = function (completado) {
        if (completado == _this.state.listChecked.length) {
          var tabla = document.getElementById("tabla");
          var tableExport = new TableExport(tabla, {
            exportButtons: false, // No queremos botones
            filename: "Nomina", //Nombre del archivo de Excel
            sheetname: "Mi tabla de Excel", //Título de la hoja
            ignoreCols: 0
          });
          var datos = tableExport.getExportData();
          var preferenciasDocumento = datos.tabla.xlsx;
          tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
          // this.state.listChecked.pop()
          _this.handleSelectAll();
          _this.state.listChecked = [];
        }
      };

      _this.handleClickPendientes = function () {
        _this.setState({
          showModalPendiente: true,
          modalPendiente: {
            title: "",
            component: null,
            textBtnAccept: "Si",
            textBtnCancel: "No",
            size: "md",
            html: true,
            contentHTML: "Se enviará un recordatorio a cada nominado que tenga pendiente su designacion de beneficiarios.\n ¿Querés continuar?"
          }
        });
      };

      _this.handleClickSearch = function () {
        var completado = 0;
        if (_this.state.listChecked.length != 0) {
          var _loop = function _loop(i, p) {
            var nroPol = _this.handleRepeatZero(_this.state.listChecked[i].POL_ANN, _this.state.listChecked[i].POL_SEC),
                p = p.then(function () {
              return new Promise(function (resolve) {
                return _this.beneficiarios.getFormularioTomador(_this.state.listChecked[i], nroPol, _this.props.product, function (data) {
                  if (data) {
                    var filename = "SolicitudBen- " + _this.state.listChecked[i].NRO_DOC + ".pdf";
                    var fileManager = new FileManager();
                    var resultDownload = fileManagerPDF(data, filename);
                    if (!resultDownload) {
                      _this.setState({
                        showModalSuccess: true,
                        showAsegurados: true,
                        modal: {
                          title: "Error",
                          component: null,
                          size: "md",
                          html: true,
                          contentHTML: "Hubo inconvenientes en la descarga del pdf, por favor intente luego",
                          textClose: "Entendido"
                        }
                      });
                    } else {
                      completado++;
                      _this.handleDownloadExcel(completado);
                    }
                  } else {
                    _this.setState({
                      showModalSuccess: true,
                      showAsegurados: true,
                      modal: {
                        title: "Error",
                        component: null,
                        size: "md",
                        html: true,
                        contentHTML: "Hubo inconvenientes al generar el pdf",
                        textClose: "Entendido"
                      }
                    });
                  }
                });
              });
            });
          };

          for (var i = 0, p = Promise.resolve(); i < _this.state.listChecked.length; i++) {
            _loop(i, p);
          }
        } else {
          _this.setState({
            showModalSuccess: true,
            modal: {
              title: "Error",
              component: null,
              size: "md",
              html: true,
              contentHTML: "El estado del beneficiario que seleccione debe ser 'COMPLETO'",
              textClose: "Entendido"
            }
          });
        }
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handlePendientesBoolean = function (e) {
        debugger;
        var current = _this.state.pendienteBoolean;
        _this.setState({
          pendienteBoolean: !current
        });
      };

      _this.handleModalPendienteIsOpen = function (e) {
        var current = _this.state.showModalPendiente;
        _this.setState({
          showModalPendiente: !current
        });
      };

      _this.handleSelectAll = function (e) {
        var datos = document.getElementsByClassName("contenidoTabla");
        if (_this.state.cont == 1) {
          if (_this.state.listChecked.length !== 0) {
            _this.state.listChecked = [];
          }
          _this.state.stateList.forEach(function (element, i) {
            var input = document.getElementById("" + i);
            if (element.COD_EST == "E") {
              input.checked = true;
              _this.state.listChecked.push(element);
            } else {
              input.disabled = true;
              var cont = i + 2 + i * 2; /**para poder grisar las columnas */
              if (datos["" + cont] !== "E") {
                for (var indice = cont; indice > cont - 3; indice--) {
                  datos["" + indice].style.backgroundColor = "#BDBDBD";
                }
              }
            }
          });
          _this.setState({ cont: 2 });
        } else {
          for (var indice = 0; indice < datos.length; indice++) {
            datos["" + indice].style.backgroundColor = "white";
          }
          for (var i = 0; i < _this.state.stateList.length; i++) {
            var input = document.getElementById("" + i);
            input.checked = false;
            input.disabled = false;
          }
          _this.setState({ cont: 1 });
        }
      };

      _this._aceptarButton = function () {
        var list = _this.state.stateList;
        var arrayPendientes = [];

        list.map(function (benef) {
          if (benef.COD_EST == "G") {
            arrayPendientes.push(benef);
          }
        });
        if (arrayPendientes.length > 0) {
          _this.nominaController.sendPendientes(arrayPendientes, "DDBEN", function (error) {
            if (error.length > 0) {
              _this.setState({
                showModalSuccess: true,
                modal: {
                  title: "Error",
                  component: null,
                  size: "md",
                  html: true,
                  contentHTML: "Ocurrio un error al enviar el recordatorio a los pendientes.",
                  textClose: "Entendido"
                }
              });
            }
          });
          _this.handleModalPendienteIsOpen();
        } else {
          _this.handleModalPendienteIsOpen();
          _this.setState({
            showModalSuccess: true,
            modal: {
              title: "Error",
              component: null,
              size: "md",
              html: true,
              contentHTML: "No hay designaciones pendientes.",
              textClose: "Entendido"
            }
          });
        }
      };

      _this.handleTest = function (e) {
        if (_this.state.stateList[e.target.id].COD_EST == "E" && e.target.checked) {
          _this.state.listChecked.push(_this.state.stateList[e.target.id]);
        } else if (!e.target.checked && _this.state.stateList[e.target.id].COD_EST == "E") {
          var eliminar = _this.state.stateList[e.target.id].NRO_DOC;
          var aEliminar = _this.state.listChecked.find(function (element) {
            return element.NRO_DOC == eliminar;
          });
          var eliminado = _this.state.listChecked.indexOf(aEliminar); // obtenemos el indice que no coincide con la posicion en el array
          _this.state.listChecked.splice(eliminado, 1);
        }
      };

      _this.state = {
        list: [],
        stateList: [],
        listChecked: [],
        fileExcel: XLSX.ExcelFile,
        excelSheet: XLSX.ExcelSheet,
        columnExcel: XLSX.ExcelColumn,
        recoverPayrollEmployees: {},
        loadButton: false,
        showForm: false,
        cont: 1,
        idEmployee: 0,
        showModal: false,
        showModalPendiente: false,
        modalPendiente: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null,
          disBtnAccept: false,
          hiddenButtonClose: true
        },
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null,
          disBtnAccept: true
        },
        pendienteBoolean: false

      };
      var today = new Date();
      _this.day = today.getDate();
      _this.month = today.getMonth() + 1;
      _this.year = today.getFullYear();
      segurosOnlineService = new SegurosOnlineService();
      _this.beneficiarios = new BeneficiariosController();
      _this.retiroController = new AdhesionController();
      _this.formData = {};
      _this.nominaController = new NominaController();
      return _this;
    }

    _createClass(QueryBeneficiary, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Seguimiento de designacion de beneficiarios"
          ),
          this.state.list != "ERROR" ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "p",
              null,
              "Para poder descargar el comprobante de la designacion de beneficiarios de tus nominados tendr\xE1s que hacer la selecci\xF3n en la parte izquierda del cuadro de el /los que desees , y luego hacer clic en el bot\xF3n \"descargar seleccionados\""
            ),
            React.createElement(
              "div",
              { className: "row justify-content-md-center mt-2" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-danger ml-2",
                  onClick: this.handleClickSearch
                },
                "Descargar seleccionados"
              ),
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-danger ml-2",
                  onClick: this.handleClickPendientes
                },
                "Enviar recordatorio a pendientes"
              )
            ),
            React.createElement(
              "form",
              { className: "col-md-12 remove-left-padding" },
              React.createElement(
                "h5",
                null,
                "Nomina correspondiente al grupo"
              ),
              this.state.stateList ? React.createElement(
                "table",
                { id: "tabla", className: "table table-sm table-bordered" },
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      { id: "seleccionar",
                        onClick: this.handleSelectAll },
                      "Seleccionar"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "N\xFAmero de documento"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Apellido y nombre"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Estado de solicitud"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Fecha"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.state.stateList.map(function (item, i) {
                    return React.createElement(
                      "tr",
                      { key: i },
                      React.createElement(
                        "td",
                        { className: "text-center" },
                        React.createElement("input", { id: i,
                          onClick: _this2.handleTest,
                          type: "checkbox" })
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.NRO_DOC
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.ASE_APE + " " + item.ASE_NOM
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.COD_EST == "G" ? "PENDIENTE" : "COMPLETA"
                      ),
                      React.createElement(
                        "td",
                        null,
                        item.COD_EST == "E" ? Utils.formatFechaString(Utils.formatDateToNumber(item.FEC_ACT)) : ""
                      )
                    );
                  })
                )
              ) : ""
            ),
            this.state.showForm ? React.createElement(
              React.Fragment,
              null,
              React.createElement(AdditionManagerColectivo, {
                recoverPayrollEmployees: this.state.recoverPayrollEmployees,
                setFormData: this._handleSetFormData,
                readOnly: true
              })
            ) : ""
          ) : "Ha ocurrido un error, intente mas tarde",
          React.createElement(
            "div",
            { className: "row justify-content-md-center mt-2" },
            React.createElement(
              "button",
              {
                className: "btn btn btn-light border-dark right mt-2",
                onClick: this._handleButtonCancel
              },
              "Cancelar"
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModalSuccess,
            size: this.state.modal.size,
            isOpen: this.handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            textClose: this.state.modal.textClose
          }),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modalPendiente.title,
            show: this.state.showModalPendiente,
            size: this.state.modalPendiente.size,
            isOpen: this.handleModalPendienteIsOpen,
            component: this.state.modalPendiente.component,
            html: this.state.modalPendiente.html,
            contentHTML: this.state.modalPendiente.contentHTML,
            accept: this._aceptarButton,
            textBtnAccept: this.state.modalPendiente.textBtnAccept,
            textBtnCancel: this.state.modalPendiente.textBtnCancel,
            hiddenButtonClose: this.state.modalPendiente.hiddenButtonClose
          })
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        this.beneficiarios.recuperarBeneficiarios(this.props.product, function (data) {
          _this3.setState({ list: data.CODE });
          console.log(data);
          var employeesList = data.Message.REGS.REG.filter(function (element) {
            return element.COD_EST == "G" || element.COD_EST == "E";
          });

          _this3.setState({ stateList: employeesList });
        });
      }
    }]);

    return QueryBeneficiary;
  }(React.Component);

  return QueryBeneficiary;
});