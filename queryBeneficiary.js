var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../controller/retiroNominaController", "../../controller/nominaController", "../../controller/beneficiariosController", "../../common/fileManager", "../../services/segurosOnlineService", "../../common/modalReactBootstrap", "../../lib/utils", "../nominas/paginatedView"], function (React, AdhesionController, NominaController, BeneficiariosController, FileManager, SegurosOnlineService, ModalReactBootstrap, Utils, PaginatedView) {
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

      _this._handlerPages = function (e) {
        var pageNumber = Number(e.target.value) !== 0 ? Number(e.target.value) : 1;

        _this.setState({
          page: pageNumber
        });

        _this._getPage(pageNumber.toString(), _this.state.rows);

        if (pageNumber !== _this.state.page) {
          _this.setState({
            cont: 2
          });

          _this.handleSelectAll("pagination");
        }
      };

      _this._handlerRows = function (e) {
        _this.setState({
          rows: Number(e.target.value),
          page: 1
        });

        _this._getPage(1, e.target.value);
      };

      _this._getPage = function (pag, amount, list) {
        if (pag > 0) {
          var lista = void 0;

          if (list !== undefined) {
            lista = list.slice((pag - 1) * amount, (pag - 1) * amount + amount);
          } else {
            lista = _this.state.stateList.slice((pag - 1) * amount, (pag - 1) * amount + amount);
          }

          _this.setState({
            paginaShow: lista,
            rows: Number(amount),
            page: Number(pag)
          });
        }
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
                    var resultDownload = fileManager.downloadPDF(data, filename);
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
                          textClose: "Entendido",
                          hiddenButtonClose: false
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
                        textClose: "Entendido",
                        hiddenButtonClose: false
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
              textClose: "Entendido",
              hiddenButtonClose: false
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
        if (_this.state.cont == 1 && e === undefined) {
          if (_this.state.listChecked.length !== 0) {
            _this.state.listChecked = [];
          }
          _this.state.paginaShow.forEach(function (element, i) {
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

          for (var i = 0; i < _this.state.paginaShow.length; i++) {
            var input = document.getElementById("" + i);
            input.checked = false;
            input.disabled = false;
          }

          if (e !== "pagination") {
            _this.setState({ cont: 1 });
          }
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
                  textClose: "Entendido",
                  hiddenButtonClose: false
                }
              });
            } else {
              var recordEnviados = localStorage.getItem("recordatoriosEnviados");
              var fecha = new Date();
              var fechaHabilitada = new Date(fecha.getTime() + 24 * 60 * 60 * 1000);
              var polizas;

              if (recordEnviados !== null) {
                polizas = JSON.parse(recordEnviados);

                var polizasObj = {
                  nroPoliza: _this.props.product.NROPOLIZA,
                  fechaHabilitacion: fechaHabilitada
                };

                if (_this.state.noEnviado) {
                  polizas = polizas.filter(function (obj) {
                    return obj.nroPoliza !== _this.props.product.NROPOLIZA;
                  });

                  polizas.push(polizasObj);

                  _this.setState({
                    noEnviado: false
                  });
                }
              } else if (_this.state.noEnviado) {
                polizas = [{
                  nroPoliza: _this.props.product.NROPOLIZA,
                  fechaHabilitacion: fechaHabilitada
                }];

                _this.setState({
                  noEnviado: false
                });
              }

              localStorage.setItem("recordatoriosEnviados", JSON.stringify(polizas));

              _this.setState({ generarBoton: false });

              _this.setState({
                showModalSuccess: true,
                recordatoriosEnviados: polizas,
                modal: {
                  title: "",
                  component: null,
                  size: "md",
                  html: true,
                  contentHTML: "¡Recordatorio enviado!",
                  hiddenButtonClose: true
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
              textClose: "Entendido",
              hiddenButtonClose: false
            }
          });
        }
      };

      _this.handleTest = function (e) {
        var _this$state = _this.state,
            page = _this$state.page,
            rows = _this$state.rows,
            stateList = _this$state.stateList,
            listChecked = _this$state.listChecked;


        var checkId = Number(e.target.id);

        if (page > 1) {
          var realPage = page - 1;

          if (rows === 100) {
            checkId = Number(realPage.toString() + checkId);
          } else {
            var realIndex = rows * realPage;

            checkId = Number(realIndex + checkId);
          }
        }

        if (stateList[checkId].COD_EST == "E" && e.target.checked) {
          listChecked.push(stateList[checkId]);
        } else if (!e.target.checked && stateList[checkId].COD_EST == "E") {
          var eliminar = stateList[checkId].NRO_DOC;
          var aEliminar = listChecked.find(function (element) {
            return element.NRO_DOC == eliminar;
          });
          var eliminado = listChecked.indexOf(aEliminar); // obtenemos el indice que no coincide con la posicion en el array

          listChecked.splice(eliminado, 1);
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
        noEnviado: true,
        generarBoton: true,
        recordatoriosEnviados: [],
        cont: 1,
        idEmployee: 0,
        showModal: false,
        showModalPendiente: false,
        paginaShow: [],
        stateListLength: undefined,
        selected: 0,
        rows: 100,
        page: 1,
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
          disBtnAccept: true,
          hiddenButtonClose: false
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

    //Paginado de la Tabla

    //Fin del  Paginado

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
              this.state.generarBoton ? React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-danger ml-2",
                  onClick: this.handleClickPendientes
                },
                "Enviar recordatorio a pendientes"
              ) : ""
            ),
            React.createElement(
              "div",
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
                  this.state.paginaShow.map(function (item, i) {
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
                ),
                this.state.stateListLength ? React.createElement(PaginatedView, {
                  setrows: this._handlerRows,
                  activepage: this.state.page,
                  selectpage: this._handlerPages,
                  rows: this.state.rows,
                  total: this.state.stateListLength
                }) : ""
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
            textClose: this.state.modal.textClose,
            hiddenButtonClose: this.state.modal.hiddenButtonClose
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

          var employeesList = data.Message.REGS.REG.filter(function (element) {
            return element.COD_EST == "G" || element.COD_EST == "E";
          });

          _this3.setState({
            stateList: employeesList,
            stateListLength: employeesList.length
          });

          _this3._getPage(_this3.state.page, _this3.state.rows, employeesList);
        });

        var productRecordEnv = localStorage.getItem("recordatoriosEnviados");

        if (productRecordEnv !== null) {
          var recordsEnv = JSON.parse(productRecordEnv);
          this.setState({ recordatoriosEnviados: recordsEnv });

          recordsEnv.map(function (e, i) {
            var fechaActual = new Date();
            var fechaGuardada = new Date(e.fechaHabilitacion);
            var nroPolizaExiste = recordsEnv.some(function (obj) {
              return obj.nroPoliza === _this3.props.product.NROPOLIZA;
            });

            if (nroPolizaExiste) {
              if (e.nroPoliza === _this3.props.product.NROPOLIZA) {
                if (fechaActual.getTime() > fechaGuardada.getTime()) {
                  _this3.setState({ generarBoton: true });
                } else {
                  _this3.setState({ generarBoton: false });
                }
              }
            } else {
              _this3.setState({ generarBoton: true });
            }
          });
        }
      }
    }]);

    return QueryBeneficiary;
  }(React.Component);

  return QueryBeneficiary;
});