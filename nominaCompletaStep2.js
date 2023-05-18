var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/inputFile2", "../../common/modalReactBootstrap", "../../controller/nominaController", "../../common/errorExcel", "../../common/buttonLoading", "loadsh", "./processOkPayroll", "./processErrorScreen", "../../lib/utils", "./profeModal", "../../redux/store", "../../controller/vidaColectivoController"], function (React, InputFile2, ModalReactBootstrap, NominaController, ErrorExcel, ButtonLoading, Loadsh, ProcessOkPayroll, ProcessErrorScreen, Utils, ProfeModal, Store, VidaColectivoController) {
  var NominaCompletaStep2 = function (_React$Component) {
    _inherits(NominaCompletaStep2, _React$Component);

    function NominaCompletaStep2(props) {
      _classCallCheck(this, NominaCompletaStep2);

      var _this = _possibleConstructorReturn(this, (NominaCompletaStep2.__proto__ || Object.getPrototypeOf(NominaCompletaStep2)).call(this, props));

      _this.FORM_NAME = "nominaCompletaStep2";

      _this._showModalProcessOK = function () {
        _this.setState({
          showModal: _this.state.listError.length == 0,
          modal: {
            component: null,
            contentHTML: "La nómina se procesó satisfactoriamente.",
            html: true,
            title: "Información",
            size: "md"
          }
        });
      };

      _this._handleBack = function () {
        _this.props.switch("home");
      };

      _this._handleReprocesar = function () {
        _this.props.switch("nominaCompleta");
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handleButtonProcess = function () {
        _this.nominaController.handleXLS(_this.fileExcel, function (list) {
          _this.nominaController.validateFieldWithFormats(list, _this.props.camposNomina, function (listErrores) {
            listErrores.concat(_this.state.listError);
            _this.setState({
              listError: listErrores
            });
            _this._showModalProcessOK();
          }, function (listOK) {
            _this.setState({
              listExcel: listOK
            });
          });
        });
      };

      _this.ageValidate = function (list) {
        var age = [];
        var notNomina = [];
        list.map(function (field, i) {
          Object.keys(field).map(function (e) {
            if (e === 'FECHA DE NACIMIENTO') {
              var formattedDate = _this.fechaDeExcel(field[e], "DD/MM/AAAA");
              var ageFormat = Utils.fAgeCalc2(formattedDate);
              age.push(ageFormat);
            }
          });
        });

        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var vidaController = new VidaColectivoController();
        vidaController.getDatosPoliza(detalle.POLIZSEC, detalle.POLIZANN, detalle.RAMOPCOD, function (callBack) {
          if (callBack !== "ERROR") {
            _this.setState({
              listPoliza: callBack.Message.DATOS
            });
            for (var i = 0; i < list.length; i++) {
              if (!(_this.state.listPoliza.EDADMING < age[i] < _this.state.listPoliza.EDADMAXG)) {
                notNomina.push(list[i].NOMBRE.toLowerCase() + " " + list[i].APELLIDO.toLowerCase());
              }
            }
            if (notNomina != null) {
              _this.setState({
                showModal: true,
                modal: {
                  component: null,
                  contentHTML: "El nominado " + ("" + notNomina) + "no es valido",
                  html: true,
                  title: "Carga de archivo nomina",
                  size: "md"
                }
              });
              return false;
            }
          }
        });
      };

      _this.fileChangedHandler = function (oInput) {
        var target = oInput.target;
        var _validFileExtensions = [".xls", ".xlsx"];
        var listFiles = oInput.target.files;
        if (listFiles.length == 1) {
          var file = listFiles[0];
          var fileName = file.name;
          _this.setState({ filename: fileName });
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
              _this.fileExcel = file;
              target.value = "";
            } else {
              _this.setState({
                filename: "",
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

      _this._getFecha = function (dateExcel) {
        return _this.nominaController.fechaDeExcel(dateExcel, "DD/MM/AAAA");
      };

      _this._handleValidateButtonAP = function () {
        //llama para los productos AP
        //setear estado con actividades y list vacios e inputs
        _this.activities = _this.nominaController.getActivitiesFromExcel(_this.state.listExcel);

        var list = [];
        _this.activities.forEach(function (act, i) {
          list.push({ list: [], name: act });
        });

        _this.setState({ ACTIVIDADES: list });

        _this._handleModalSetActivities(); //abre modal
      };

      _this._handleSendMailButton = function () {
        _this._handleModalIsOpen();
        var product = _this.props.product.detalle ? _this.props.product.detalle : _this.props.product.cup;
        var listToSend = [];
        _this.state.listExcel.map(function (item) {
          if (item.VALIDACION != "MAILOK" && item.VALIDACION != "NOEXIST") listToSend.push(item);
        });
        if (listToSend.length > 0) _this.setState({ enviarLoading: true });
        _this.nominaController.sendNomina(listToSend, product, function (errors) {
          if (errors.length == 0 && listToSend.length != 0) _this.setState({ processRegBenef: true });else if (errors.length != 0 && listToSend.length != 0) _this.setState({ showErrorsMsg: true });
        }, _this.props.user, "ABM");
        _this.nominaController.sendNominaAsegurados(_this.state.listExcel, _this.props.grupo, function (sendError, valError) {
          _this.setState({ listSendError: sendError, listErrorAseg: valError });
        }, "EXCEL");
      };

      _this._tableExcel = function () {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "table",
            { className: "table-responsive table-excel table-sm table-bordered mt-4" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                { className: "text-danger" },
                _this.props.camposNomina.map(function (e) {
                  return React.createElement(
                    "th",
                    null,
                    e.nombre
                  );
                }),
                _this.state.validation ? React.createElement(
                  "th",
                  null,
                  "Validaci\xF3n"
                ) : ""
              )
            ),
            React.createElement(
              "tbody",
              null,
              _this.state.listExcel.map(function (registro) {
                return React.createElement(
                  "tr",
                  { key: registro.__rowNum__ },
                  _this.props.camposNomina.map(function (campo) {
                    var key = Object.keys(registro).find(function (key) {
                      return key.toUpperCase().trim() === campo.nombre.toUpperCase().trim();
                    });
                    var valorKey = registro[key];
                    if (key === undefined) {
                      return React.createElement(
                        "td",
                        { "data-th": campo.nombre },
                        "-"
                      );
                    }
                    if (key.toUpperCase().substr(0, 5) == "FECHA") valorKey = _this._getFecha(valorKey);

                    return React.createElement(
                      "td",
                      { "data-th": campo.nombre },
                      valorKey
                    );
                  }),
                  _this.state.validation ? registro.VALIDACION ? _this._caseValidationResult(registro) : React.createElement(
                    "td",
                    null,
                    React.createElement("div", {
                      className: "spinner-border spinner-border-sm position-spinner  ",
                      role: "status"
                    })
                  ) : ""
                );
              })
            )
          )
        );
      };

      _this._getIndexByDoc = function (doc) {
        var listadocs = _this.state.listExcel.map(function (item) {
          return item.CUIL;
        });
        var index = listadocs.indexOf(doc.toString());
        if (index > -1) return index + 2;else return "-";
      };

      _this._errorTable = function (list) {
        return React.createElement(
          "div",
          { className: "col-12 mt-4" },
          React.createElement(
            "h5",
            { className: "subtitle-inside" },
            "Resultado de la validaci\xF3n"
          ),
          React.createElement(
            "table",
            { "class": "table table-bordered table-striped mt-4" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  null,
                  "Fila"
                ),
                React.createElement(
                  "th",
                  null,
                  "Descripcion"
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              list.map(function (item) {
                var documDatIsCero = item.DOCUMDAT == 0 ? true : false;
                var global = React.createElement(
                  React.Fragment,
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      null,
                      "-"
                    ),
                    React.createElement(
                      "td",
                      { className: "text-left" },
                      "Se encontraron ERRORES GLOBALES en la Nomina"
                    )
                  ),
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      null,
                      "-"
                    ),
                    React.createElement(
                      "td",
                      { className: "text-left" },
                      item.DESCERROR
                    )
                  )
                );
                var row = React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "td",
                    null,
                    !documDatIsCero && _this._getIndexByDoc(item.DOCUMDAT)
                  ),
                  React.createElement(
                    "td",
                    { className: "text-left" },
                    !documDatIsCero && item.DESCERROR.substr(0, 18).toUpperCase() == "EDAD DEL ASEGURADO" ? item.DOCUMDAT + " - " + item.DESCERROR + ". Este nominado debe ser cargado por otro medio." : item.DOCUMDAT + " - " + item.DESCERROR
                  )
                );
                if (item.DOCUMTIP == 0) {
                  row = global;
                }
                return row;
              })
            )
          )
        );
      };

      _this._handleModalSendMailButton = function () {
        var date = Utils.formatFechaString(_this.props.grupo.fecvig.toString());
        _this.setState({
          showModal: true,
          modal: {
            component: null,
            contentHTML: "<div><div class='alert alert-secondary'><strong>" + _this.props.grupo.grupodes + "  -  Fecha:  " + date + "</strong></div></div><div class='col-md-10'><p class='text-justify'><strong>Nómina informada: </strong>" + _this.state.listExcel.length + " Asegurados</p></div></div>",
            html: true,
            title: "Alta de Nómina",
            size: "md",
            accept: _this._handleSendMailButton
          }
        });
      };

      _this._getActEquiv = function (text) {
        var index = _this.activities.indexOf(text);
        return _this.state.ACTIVIDADES[index];
      };

      _this._handleModalValidateButton = function () {
        var excelData = _this.state.listExcel.map(function (item) {
          var obj = _this._getActEquiv(item.ACTIVIDAD);
          return Object.assign({}, item, {
            ACTIVIDAD: obj.newVal.value,
            PROFECOD: obj.newVal.id
          });
        });

        var product = _this.props.product.detalle ? _this.props.product.detalle : _this.props.product.cup;
        _this.setState({
          validation: true
        });
        _this.nominaController.validateNominaAsegurados(excelData, function () {
          _this.setState({
            listExcel: excelData
          });
        }, product);
        _this._handleModalIsOpen();
      };

      _this._handleValidateButton = function () {
        //llama a este si no es producto ap
        var product = _this.props.product.detalle ? _this.props.product.detalle : _this.props.product.cup;
        _this.setState({
          validation: true
        });
        var listExcelClon = Loadsh.cloneDeep(_this.state.listExcel);
        _this.nominaController.validateNominaAsegurados(listExcelClon, function () {
          _this.setState({
            listExcel: listExcelClon
          });
        }, product);
      };

      _this._setActivities = function (data) {
        _this.setState({ ACTIVIDADES: data });
        var cont = 0;
        if (Object.keys(data).map(function (item) {
          if (data[item].newVal && data[item].newVal.id && data[item].newVal.id != "default") cont++;
        }).length == cont) _this.setState({ modal: Object.assign({}, _this.state.modal, { disBtnAccept: false }) });else _this.setState({ modal: Object.assign({}, _this.state.modal, { disBtnAccept: true }) });
      };

      _this._handleModalSetActivities = function () {
        _this.setState({
          showModal: true,
          modal: {
            component: React.createElement(ProfeModal, {
              activities: _this.nominaController.getActivitiesFromExcel(_this.state.listExcel),
              getActivitiesModalData: _this._setActivities
            }),
            disBtnAccept: _this.state.disBtnAccept,
            contentHTML: null,
            html: false,
            title: "Alta de Nómina",
            size: "md",
            accept: _this._handleModalValidateButton
          }
        });
      };

      _this._caseValidationResult = function (e) {
        // HF 20221005 ABMSO INI
        return React.createElement(
          "td",
          { "data-th": "Validaci\xF3n" },
          React.createElement("i", { className: "fas fa-check text-success" })
        );
        // HF 20221005 ABMSO FIN
        switch (e.VALIDACION) {
          case "OK":
          case "ADD":
            return React.createElement(
              "td",
              { "data-th": "Mail para designar beneficiarios" },
              React.createElement("i", { className: "fas fa-check text-success" })
            );
          case "ERROR":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" })
            );
          case "DOCOK":
            return React.createElement(
              "td",
              { "data-th": "Mail para designar beneficiarios" },
              React.createElement("i", { className: "fas fa-check mr-1 text-success" }),
              "\xA0DNI registrado con ",
              e.DATOSREGISTRO.MAIL,
              ", ",
              React.createElement("br", null),
              " se enviar\xE1 el mail a dicha casilla de correo y a la ingresada"
            );
          case "MAILOK":
            return React.createElement(
              "td",
              { "data-th": "Mail para designar beneficiarios" },
              React.createElement("i", { className: "fas fa-times mr-1 text-danger" }),
              "\xA0No es posible enviar mail a este usuario,",
              React.createElement("br", null),
              " el mail esta registrado con otro DNI"
            );
          case "NOMAIL":
            return React.createElement(
              "td",
              { "data-th": "Mail para designar beneficiarios" },
              React.createElement("i", { className: "fas fa-times mr-1 text-danger" }),
              "\xA0No se ha ingresado un mail"
            );
        }
      };

      _this._selectFileScreen = function () {
        return React.createElement(
          "div",
          { className: "container remove-left-padding profile-container" },
          React.createElement(
            "em",
            null,
            "Seleccion\xE1 el archivo .xls de la n\xF3mina que dese\xE1s ingresar"
          ),
          React.createElement(
            "div",
            { className: "col-md-12" },
            React.createElement(
              "div",
              { className: "custom-file col-md-5" },
              React.createElement(InputFile2, {
                onChange: _this.fileChangedHandler,
                filename: _this.state.filename
              })
            ),
            React.createElement(
              "button",
              {
                className: "ml-3 btn btn-hsbc mt-2",
                onClick: _this._handleButtonProcess,
                disabled: !_this.state.filename
              },
              "Procesar"
            )
          ),
          React.createElement(
            "div",
            { className: "col-12 mt-4" },
            React.createElement(
              "div",
              { className: "form-group row text-center mt-5" },
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "button",
                  { onClick: _this._handleBack, className: "btn btn-light" },
                  "Cancelar"
                )
              )
            )
          )
        );
      };

      _this._displayNone = function () {
        _this.setState({ displayNone: "d-none" });
      };

      _this._screenInvalidFile = function () {
        return React.createElement(
          "div",
          { className: "container remove-left-padding profile-container" },
          React.createElement(
            "div",
            { className: "col-12 mt-4" },
            React.createElement(
              "h5",
              { className: "subtitle-inside" },
              "El archivo no cumple con la validaci\xF3n"
            ),
            React.createElement(ErrorExcel, { listError: _this.state.listError })
          ),
          React.createElement(
            "div",
            { className: "col-12 mt-4" },
            React.createElement(
              "div",
              { className: "form-group row text-center mt-5" },
              React.createElement(
                "div",
                { className: "col-md-6" },
                React.createElement(
                  "button",
                  {
                    onClick: _this._handleReprocesar,
                    className: "btn btn-hsbc"
                  },
                  "Reprocesar n\xF3mina"
                )
              ),
              React.createElement(
                "div",
                { className: "col-md-6" },
                React.createElement(
                  "button",
                  { onClick: _this._handleBack, className: "btn btn-light" },
                  "Cancelar"
                )
              )
            )
          )
        );
      };

      _this.state = {
        listExcel: [],
        listError: [],
        filename: "",
        showModal: false,
        validation: false,
        processRegBenef: false,
        showErrorsMsg: false,
        listSendError: null,
        //mailNull: false,
        listErrorAseg: { LISTAERRORES: { LISTAERROR: [] }, CANTERR: -1 },
        displayNone: "",
        modalButtonEnabled: false,
        listPoliza: null,
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "Nomina de asegurados",
          size: "md",
          accept: null,
          disBtnAccept: true
        }
      };

      _this.fileExcel = null;
      _this.nominaController = new NominaController();
      _this.activities = [];
      return _this;
    }

    _createClass(NominaCompletaStep2, [{
      key: "fechaDeExcel",
      value: function fechaDeExcel(days, fecha) {
        var date = new Date(1900, 0, 1);
        date.setDate(date.getDate() + days - 2);

        // Consigo los valores del valor ingresado para ver si es una fecha válida
        var dia = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
        var mes = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        var anio = date.getFullYear().toString();

        fecha = fecha.replace(/DD/g, dia);
        fecha = fecha.replace(/MM/g, mes);
        if (fecha.indexOf("AAAA") >= 0) {
          fecha = fecha.replace(/AAAA/g, anio);
        } else if (fecha.indexOf("AA") >= 0) {
          fecha = fecha.replace(/AA/g, anio.substr(2, 2));
        }
        return fecha;
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside " + this.state.displayNone },
            "Informa n\xF3mina completa"
          ),
          React.createElement(
            "small",
            {
              className: "subtitle-inside font-weight-normal " + this.state.displayNone
            },
            "Descargue el instructivo de carga de N\xF3minas, haciendo click",
            " ",
            React.createElement(
              "a",
              {
                href: "https://www.segurosonline.hsbc.com.ar/oficina-gateway/getPDF/SOABMNomInstructivo.pdf",
                target: "_blank"
              },
              "aqu\xED"
            ),
            " "
          ),
          this.state.listError.length === 0 && this.state.listExcel.length === 0 ? this._selectFileScreen() : this.state.listError.length > 0 ? this._screenInvalidFile() : this.state.listErrorAseg.CANTERR > 0 ? this._errorTable(this.state.listErrorAseg.LISTAERRORES.LISTAERROR) : this.state.listSendError != null ? React.createElement(ProcessErrorScreen, {
            title: "Informe nómina completa",
            "switch": this.props.switch,
            error: this.state.listSendError,
            displayNone: this._displayNone
          }) : this.state.listErrorAseg.CANTERR == 0 ? React.createElement(ProcessOkPayroll, {
            "switch": this.props.switch,
            displayNone: this._displayNone
          }) : this._tableExcel(),
          React.createElement(
            "div",
            { className: "row justify-content-md-center mt-2" },
            this.state.listExcel.length > 0 && this.state.listError.length == 0 ? !this.state.validation ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "button",
                {
                  className: "btn btn btn-danger border-dark right mt-2 mr-3",
                  onClick: this.props.product.ramopcod.substring(0, 2) == "CA" ? this._handleValidateButtonAP : this._handleValidateButton
                },
                "Validar n\xF3mina"
              ),
              React.createElement(
                "button",
                { className: "btn btn-light", onClick: this._handleBack },
                "Cancelar"
              )
            ) : this.state.listErrorAseg.LISTAERRORES.LISTAERROR.length > 0 ? React.createElement(
              "div",
              { className: "col-12 mt-4" },
              React.createElement(
                "div",
                { className: "form-group row text-center mt-5" },
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    "button",
                    {
                      onClick: this._handleReprocesar,
                      className: "btn btn-hsbc"
                    },
                    "Reprocesar n\xF3mina"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    "button",
                    {
                      onClick: this._handleBack,
                      className: "btn btn-light"
                    },
                    "Cancelar"
                  )
                )
              )
            ) : this.state.listErrorAseg.CANTERR == 0 || this.state.listSendError != null ? "" : React.createElement(
              React.Fragment,
              null,
              React.createElement(
                ButtonLoading,
                {
                  disabled: this.state.enviarLoading,
                  className: "btn btn btn-danger border-dark right mt-2 mr-3",
                  onClick: this._handleModalSendMailButton,
                  loading: this.state.enviarLoading
                },
                "Enviar n\xF3mina"
              ),
              React.createElement(
                "button",
                { className: "btn btn-light", onClick: this._handleBack },
                "Cancelar"
              )
            ) : ""
          ),
          React.createElement(ModalReactBootstrap, {
            accept: this.state.modal.accept,
            title: this.state.modal.title,
            show: this.state.showModal,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            disBtnAccept: this.state.modal.disBtnAccept
          })
        );
      }
    }]);

    return NominaCompletaStep2;
  }(React.Component);

  return NominaCompletaStep2;
});