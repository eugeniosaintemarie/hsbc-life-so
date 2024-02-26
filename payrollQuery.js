var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../redux/store", "../../controller/retiroNominaController", "../../controller/vidaColectivoController", "./additionManagerColectivo", "../../common/loader", "../../common/fileManager", "../../services/segurosOnlineService", "../../common/modalReactBootstrap", "../../lib/utils"], function (React, Store, AdhesionController, VidaColectivoController, AdditionManagerColectivo, Loader, FileManager, SegurosOnlineService, ModalReactBootstrap, Utils) {
  var PayrollQuery = function (_React$Component) {
    _inherits(PayrollQuery, _React$Component);

    function PayrollQuery(props) {
      _classCallCheck(this, PayrollQuery);

      var _this = _possibleConstructorReturn(this, (PayrollQuery.__proto__ || Object.getPrototypeOf(PayrollQuery)).call(this, props));

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

      _this._handleSetHeaderObject = function (insuredInfo) {
        return {
          CIAASCOD: "0015",
          USUARCOD: "PR70794438",
          ESTADO: "",
          ERROR: "",
          CLIENSECAS: 0,
          NIVELCLAAS: "",
          NIVELCLA1: "",
          CLIENSEC1: 0,
          NIVELCLA2: "",
          CLIENSEC2: 0,
          NIVELCLA3: "",
          CLIENSEC3: 0,
          POLIZANN: insuredInfo.POL_ANN,
          POLIZSEC: insuredInfo.POL_SEC
        };
      };

      _this._handleErrorServices = function (errorText) {
        _this.setState({
          showModal: true,
          modal: {
            component: React.createElement(
              "p",
              null,
              errorText
            ),
            title: "Error de servicio",
            size: "md"
          }
        });
      };

      _this.handleClickPdf = function () {
        var cont = 0;
        if (_this.state.listChecked.length != 0) {
          var _loop = function _loop(i) {
            _this.vidaColectivoController.getFormularioTomVida(_this.state.listChecked[i], function (data) {
              if (data) {
                var filename = "SolicitudVC - " + _this.state.listChecked[i].NRO_DOC;
                var fileManager = new FileManager();
                var resultDownload = fileManager.downloadPDF(data, filename);
                if (!resultDownload) {
                  _this.setState({
                    showModalSuccess: true,
                    coberturaLoading: false,
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
                  cont++;
                  if (cont == _this.state.listChecked.length) {
                    _this.state.cont = 2;
                    _this.handleSelectAll();
                  }
                  console.log(cont);
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
          };

          for (var i = 0; i < _this.state.listChecked.length; i++) {
            _loop(i);
          }
        } else {
          _this.setState({
            showModalSuccess: true,
            modal: {
              title: "Error",
              component: null,
              size: "md",
              html: true,
              contentHTML: "Tene en cuenta que solo podras descargar los PDF que tengan estado de adhesion 'Completa'",
              textClose: "Entendido"
            }
          });
        }
      };

      _this.handleEnvioRecordatorio = function () {
        _this.setState({
          showModalSuccess: true,
          modal: {
            title: "",
            accept: _this.enviarRecordatorios,
            component: null,
            size: "md",
            html: true,
            contentHTML: "Se enviará un recordatorio a cada nominado que tenga pendiente su adhesion web ¿Queres continuar?",
            textClose: "Entendido"
          }
        });
      };

      _this.enviarRecordatorios = function () {
        _this.setState({
          showModalSuccess: true,
          modal: {
            accept: false,
            hiddenButtonClose: true,
            title: "Procesando",
            component: null,
            size: "md",
            html: true,
            contentHTML: "Procesando envios a pendientes",
            classCancel: "invisible"
          }
        });

        _this.retiroController.sendNomina(_this.state.listPendientes, _this.props.product, function (errors) {
          if (errors.length > 0) {
            _this.setState({
              showModalSuccess: true,
              modal: {
                hiddenButtonClose: false,
                title: "Error",
                component: null,
                size: "md",
                html: true,
                contentHTML: "hubo un error al enviar los avisos a pendientes",
                textClose: "Entendido"
              }
            });
          } else {
            _this.setState({
              showModalSuccess: false
            });
          }
        }, _this.props.user, "VIDCOL");
      };

      _this.handleClickReporte = function () {

        _this.vidaColectivoController.getReporteTom(function (data, ramo) {
          if (!data) {
            _this.setState({
              showModalSuccess: true,
              showAsegurados: true,
              modal: {
                title: "Error",
                component: null,
                size: "md",
                html: true,
                contentHTML: "Hubo inconvenientes al generar el reporte",
                textClose: "Entendido"
              }
            });
          } else {
            var csv = Utils.JSON2CSV(data);
            var downloadLink = document.createElement("a");
            var blob = new Blob(["\uFEFF", csv]);
            var url = URL.createObjectURL(blob);

            downloadLink.href = url;
            downloadLink.download = "ReporteVC-" + ramo + ".csv";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
          }
        });
      };

      _this.handleSelectAll = function (e) {
        var datos = document.getElementsByClassName("contenidoTabla");
        if (_this.state.cont == 1) {
          _this.state.list.employees.forEach(function (element, i) {
            var input = document.getElementById("" + i);
            if (element.ESTADO == "COMPLETA") {
              input.checked = true;
              _this.state.listChecked.push(element);
            } else {
              input.disabled = true;
              var cont = i + 2 + i * 2; /**para poder grisar las columnas */
              if (datos["" + cont] !== "COMPLETA") {
                for (var indice = cont; indice > cont - 3; indice--) {
                  datos["" + indice].style.backgroundColor = "#BDBDBD";
                }
              }
            }
          });
          _this.setState({ cont: 2 });
        } else {
          //quita la seleccion de todos los elementos
          for (var indice = 0; indice < datos.length; indice++) {
            datos["" + indice].style.backgroundColor = "white";
          }
          for (var i = 0; i < _this.state.stateList.length; i++) {
            var input = document.getElementById("" + i);
            input.checked = false;
            input.disabled = false;
          }
          _this.state.listChecked = [];
          _this.setState({ cont: 1 });
        }
      };

      _this.handleTest = function (e) {
        if (_this.state.list.employees[e.target.id].ESTADO == "COMPLETA" && e.target.checked) {
          _this.state.listChecked.push(_this.state.list.employees[e.target.id]);
        } else if (!e.target.checked && _this.state.list.employees[e.target.id].ESTADO == "COMPLETA") {
          var eliminar = _this.state.list.employees[e.target.id].NRO_DOC;
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
        listPendientes: [],
        recoverPayrollEmployees: {},
        fileExcel: XLSX.ExcelFile,
        excelSheet: XLSX.ExcelSheet,
        columnExcel: XLSX.ExcelColumn,
        loadButton: false,
        showForm: false,
        idEmployee: 0,
        cont: 1,
        validRamo: false,
        showModal: false,
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null,
          disBtnAccept: true
        }
      };
      var today = new Date();
      _this.day = today.getDate();
      _this.month = today.getMonth() + 1;
      _this.year = today.getFullYear();
      segurosOnlineService = new SegurosOnlineService();
      _this.vidaColectivoController = new VidaColectivoController();
      _this.retiroController = new AdhesionController();
      _this.formData = {};
      return _this;
    }

    //este es el representante legal del solicitante, por eso todo va vacio 

    _createClass(PayrollQuery, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return this.state.validRamo /* true */ ? React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Consulta de solicitudes de adhesi\xF3n"
          ),
          this.state.list.CODE != "ERROR" ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              null,
              React.createElement(
                "p",
                null,
                React.createElement(
                  "b",
                  null,
                  "Haciendo clic"
                ),
                " en el bot\xF3n ",
                React.createElement(
                  "b",
                  null,
                  "Descargar"
                ),
                " reporte podr\xE1s descargar un archivo .xls con la informacion de todos los nominados adheridos para tu control."
              ),
              React.createElement(
                "p",
                null,
                "Para ",
                React.createElement(
                  "b",
                  null,
                  "descargar"
                ),
                " los formularios de PDF de tus nominados adheridos deber\xE1s ",
                React.createElement(
                  "b",
                  null,
                  "seleccionarlos"
                ),
                "y luego ",
                React.createElement(
                  "b",
                  null,
                  "hacer clic"
                ),
                " en el bot\xF3n ",
                React.createElement(
                  "b",
                  null,
                  "Descargar PDF"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "row justify-content-around" },
              React.createElement(
                "div",
                { className: "col-4" },
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-danger ml-2",
                    onClick: this.handleClickReporte
                  },
                  "Descargar reporte"
                )
              ),
              React.createElement(
                "div",
                { className: "col-4" },
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-danger ml-2",
                    onClick: this.handleClickPdf
                  },
                  "Descargar PDF"
                )
              ),
              this.state.listPendientes.length > 0 ? React.createElement(
                "div",
                { className: "col-4" },
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-danger ml-2",
                    onClick: this.handleEnvioRecordatorio
                  },
                  "Enviar recordatorio a pendientes"
                )
              ) : ""
            ),
            React.createElement(
              "div",
              { className: "col-md-12 remove-left-padding" },
              React.createElement(
                "h5",
                null,
                "Personas a adherir"
              ),
              this.state.list.employees ? React.createElement(
                "table",
                { className: "table table-sm table-bordered" },
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
                      "Fecha"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Grupo"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Estado de solicitud"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Tipo de solicitud"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Tipo de modicacion"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.state.list.employees.map(function (item, i) {
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
                        item.APENOM
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        Utils.dateToString(new Date(item.FEC_ACT))
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.DES_GRU
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla" },
                        _this2.state.stateList[i]
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.TIP_SOL === "A" ? "Alta" : "Modificacion"
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.TIP_MOD === "SN" ? "Adhirio Conyuge" : item.TIP_MOD === "NS" ? "Modifico Multiplo/Suma" : item.TIP_MOD === "SS" ? "Adhirio Conyuge/Modifico Multiplo/Suma" : ""
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
            accept: this.state.modal.accept,
            hiddenButtonClose: this.state.modal.hiddenButtonClose,
            title: this.state.modal.title,
            show: this.state.showModalSuccess,
            size: this.state.modal.size,
            isOpen: this.handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            textClose: this.state.modal.textClose,
            textBtnAccept: "Si",
            textBtnCancel: "No"
          })
        ) : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "p",
            { className: "font-weight-bold font-italic Italica" },
            "Esta funcionalidad no esta disponible para el producto al cual esta asociada su p\xF3liza"
          ),
          React.createElement(
            "div",
            { className: "row justify-content-md-center mt-2" },
            React.createElement(
              "button",
              { className: "btn btn btn-light border-dark right mt-2", onClick: this._handleButtonCancel },
              "Aceptar"
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        if (this.props.product.RAMOPTVC == "MS" || this.props.product.RAMOPTVC == "EC" || this.props.product.RAMOPTVC == "CU" || this.props.product.RAMOPTVC == "SE" || this.props.product.RAMOPTVC == "AP") {
          this.setState({ validRamo: true });
        } else {
          this.setState({ validRamo: false });
        }

        this.retiroController.getEmployees(function (data) {
          _this3.setState({ list: data });
          var employeesList = _this3.state.list.employees;
          var stateList = employeesList.map(function (employee) {
            return employee.ESTADO;
          });
          _this3.setState({ stateList: stateList });
          var listaRecordatorios = [];
          _this3.state.list.employees.forEach(function (item) {
            if (item.ESTADO == "PENDIENTE") {
              listaRecordatorios.push({ VALIDACION: "OK",
                MAIL: item.MAIL,
                DATOSREGISTRO: {
                  ASE_APE: item.ASE_APE,
                  ASE_NOM: item.ASE_NOM,
                  ASE_SUE: item.ASE_SUE,
                  FEC_NAC: item.FEC_NAC,
                  MAIL: item.MAIL,
                  NRO_DOC: item.NRO_DOC,
                  TIP_DOC: item.TIP_DOC }
              });
            } else {
              return;
            }
          });
          _this3.setState({ listPendientes: listaRecordatorios });
        });
      }
    }]);

    return PayrollQuery;
  }(React.Component);

  return PayrollQuery;
});