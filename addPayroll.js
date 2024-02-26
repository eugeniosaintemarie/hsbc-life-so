var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "../common/modalReactBootstrap", "../common/inputFile2", "../controller/nominaController", "../common/errorExcel", "../common/buttonLoading", "./nominas/paginatedView"], function (React, Loadsh, ModalReactBootstrap, InputFile2, NominaController, ErrorExcel, ButtonLoading, PaginatedView) {
  var AddPayroll = function (_React$Component) {
    _inherits(AddPayroll, _React$Component);

    function AddPayroll(props) {
      _classCallCheck(this, AddPayroll);

      var _this = _possibleConstructorReturn(this, (AddPayroll.__proto__ || Object.getPrototypeOf(AddPayroll)).call(this, props));

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;

        _this.setState({
          showModal: !current
        });
      };

      _this._handleButtonCancel = function () {
        _this.setState({ listExcel: [], filename: "" });
        _this.fileExcel = null;
        _this.props.handleShowMain();
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

      _this._handleExcelPasteFunction = function () {
        //Funcion para pegado en pantalla lo copiado de
        navigator.clipboard.readText().then(function (text) {
          var jsonArray = _this.convertExcelCopy(text);
          var copyJsonArray = [];
          var paramJsonArray = [];
          var structuredExcelGrid = [];
          var _copyStore = [];
        });
      };

      _this._excelJson = function (excelText) {
        var allTextLines = excelText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(/\t/);
        var lines = [];

        for (var i = 1; i < allTextLines.length; i++) {
          var data = allTextLines[i].split(/\t/);

          if (data.length == headers.length) {
            var row = {};

            for (var j = 0; j < headers.length; j++) {
              row[headers[j]] = data[j];
            }

            lines.push(row);
          }
        }

        return lines;
      };

      _this.convertExcelCopy = function (text) {
        var json = _this._excelJson(text);
        if (json.length <= 2000) {
          _this.nominaController.fechaDeExcel(json[0].FECHA_DE_NACIMIENTO, "DD/MM/AAAA");

          _this.setState({
            listExcel: json,
            isCopyFromExcel: true,
            excelLength: json.length
          });

          _this.nominaController.validateField(json, 4, true, 0, 0, function (listError) {
            _this.setState({
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

            _this.setState({
              listExcel: []
            });
          }, function (listOK) {
            _this.setState({
              listExcel: listOK
            });
          });

          _this._getPage(_this.state.page, _this.state.rows);

          return json;
        } else {
          _this.setState({
            enviarLoading: false,
            isLoading: false,
            showModal: true,
            modal: {
              component: null,
              contentHTML: "<div><p><strong>La cantidad de nominados ingresados supera los 2000, por favor particionar la nomina de modo que tenga como máximo 2000 personas</strong></p></div>",
              html: true,
              title: "Formato de la Nomina",
              size: "md",
              accept: _this._handleBack
            }
          });
        }
      };

      _this._handlerPages = function (e) {
        var pageNumber = Number(e.target.value) !== 0 ? Number(e.target.value) : 1;

        _this.setState({
          page: pageNumber
        });

        _this._getPage(pageNumber.toString(), _this.state.rows);
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
            lista = _this.state.listExcel.slice((pag - 1) * amount, (pag - 1) * amount + amount);
          }

          _this.setState({
            paginaShow: lista,
            rows: Number(amount),
            page: Number(pag)
          });
        }
      };

      _this._handleMaxValidation = function () {

        _this.setState({
          enviarLoading: false,
          isLoading: false,
          showModal: true,
          modal: {
            component: null,
            contentHTML: "<div><p><strong>La cantidad de nominados ingresados supera los 2000, por favor particionar la nomina de modo que tenga como máximo 2000 personas</strong></p></div>",
            html: true,
            title: "Formato de la Nomina",
            size: "md",
            accept: _this._handleBack
          }
        });
      };

      _this._handleButtonProcess = function () {
        _this._getPage(_this.state.page, _this.state.rows);
        _this.nominaController.handleXLSValidated(_this.fileExcel, function (list) {
          if (list.length == 0) {
            _this.setState({
              showModal: true,
              modal: {
                component: "Error al procesar el archivo",
                contentHTML: "",
                html: false,
                title: "Carga de archivo de nomina",
                size: "md"
              }
            });

            _this.setState({
              listExcel: []
            });
          }

          _this.setState({
            excelLength: list.length
          });

          _this.nominaController.validateField(list, 4, true, 0, 0, function (listError) {
            _this.setState({
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

            _this.setState({
              listExcel: []
            });
          }, function (listOK) {
            _this.setState({
              listExcel: listOK,
              validation: false
            });
          });
          _this._getPage(_this.state.page, _this.state.rows);
        }, _this._handleMaxValidation);
      };

      _this._tableExcel = function () {
        var _this$state = _this.state,
            currentPage = _this$state.currentPage,
            itemsPerPage = _this$state.itemsPerPage;

        var startIndex = currentPage * itemsPerPage;
        var endIdex = startIndex + itemsPerPage;
        var visibleItems = _this.state.listExcel.slice(startIndex, endIdex);

        return React.createElement(
          "div",
          null,
          React.createElement(
            "table",
            { className: "table table-sm table-bordered mt-4" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  { colSpan: "6", className: "main-header" },
                  "Nomina correspondiente al grupo"
                )
              ),
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  null,
                  "N\xFAmero de Documento"
                ),
                React.createElement(
                  "th",
                  null,
                  "Apellido y Nombre"
                ),
                React.createElement(
                  "th",
                  null,
                  "Correo electronico"
                ),
                _this.state.validation ? React.createElement(
                  "th",
                  null,
                  "Resultado"
                ) : ""
              )
            ),
            React.createElement(
              "tbody",
              null,
              _this.state.paginaShow.map(function (e) {
                return React.createElement(
                  "tr",
                  { key: e.__rowNum__ },
                  React.createElement(
                    "td",
                    null,
                    e.CUIL
                  ),
                  React.createElement(
                    "td",
                    null,
                    e.APELLIDO + " " + e.NOMBRE
                  ),
                  React.createElement(
                    "td",
                    null,
                    e.MAIL
                  ),
                  _this.state.validation ? e.VALIDACION ? _this._caseValidationResult(e) : React.createElement(
                    "td",
                    null,
                    React.createElement("div", {
                      className: "spinner-border spinner-border-sm position-spinner  ",
                      role: "status"
                    })
                  ) : ""
                );
              })
            ),
            React.createElement(PaginatedView, {
              setrows: _this._handlerRows,
              activepage: _this.state.page,
              selectpage: _this._handlerPages,
              rows: _this.state.rows,
              total: _this.state.excelLength
            })
          ),
          _this.state.validation ? React.createElement(
            "p",
            { className: "text-center" },
            React.createElement(
              "small",
              null,
              "Declaro que los mails de los asegurados aqu\xED ingresados pertenecen a los mismos a los que s\xF3lo ellos tienen acceso"
            )
          ) : ""
        );
      };

      _this._caseValidationResult = function (e) {
        switch (e.VALIDACION) {
          case "OK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check text-success" })
            );
          case "ADD":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check text-success" })
            );
          case "NOEXIST":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0No es un integrante de la nomina vigente"
            );
          case "ERROR":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" })
            );
          case "D-ERROR":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0 El mail se encuentra duplicado en la n\xF3mina"
            );
          case "DOCOK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check mr-1 text-success" }),
              "\xA0DNI registrado con ",
              e.DATOSREGISTRO.MAIL,
              ", ",
              React.createElement("br", null),
              " se enviar\xE1 el mail a dicha casilla de correo y a la ingresada"
            );
          case "NODESIGNA":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0",
              e.MOTIVO
            );
          case "MAILOK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times mr-1 text-danger" }),
              "\xA0No es posible enviar mail a este usuario,",
              React.createElement("br", null),
              " el mail esta registrado con otro DNI"
            );
        }
      };

      _this._handleValidateButton = function () {
        var listExcelClon = Loadsh.cloneDeep(_this.state.listExcel);
        var cont = 0;
        var validatedListExcel = [];
        var startIndex = 0;
        var listPartCont = 0;

        _this.setState({
          validarLoading: true
        });

        var processNextPart = function processNextPart() {
          var listPart = listExcelClon.slice(startIndex, startIndex + 500);
          _this._getPage(_this.state.page, _this.state.rows, listExcelClon);

          _this.nominaController.validateNomina(listPart, function (fielProcess) {
            cont++;
            listPartCont++;

            if (listPartCont === listPart.length) {
              validatedListExcel = validatedListExcel.concat(listPart);
              startIndex = startIndex + 500;
              listPartCont = 0;

              var listEmails = listPart.map(function (campo) {
                return campo.MAIL.trim();
              });
              var mails = [];

              for (var i = 0; i < listEmails.length; i++) {
                for (var j = i + 1; j < listEmails.length; j++) {
                  if (listEmails[i] === listEmails[j]) {
                    mails.push(listEmails[i]);
                  }
                }
              }

              listPart.map(function (campo) {
                if (mails.includes(campo.MAIL.trim())) {
                  campo.VALIDACION = "D-ERROR";
                } else if (!("VALIDACION" in campo)) {
                  campo.VALIDACION = "OK";
                }
              });

              processNextPart();
            }

            if (cont === listExcelClon.length) {
              _this.setState({
                listExcel: validatedListExcel,
                validarLoading: false,
                validation: true
              });
            }
          }, _this.props.product);
        };

        processNextPart();
      };

      _this._handleSendMailButton = function () {
        var listToSend = [];
        var cont = 0;

        _this.state.listExcel.map(function (item) {
          if (item.VALIDACION != "MAILOK" && item.VALIDACION != "NOEXIST" && item.VALIDACION != "NODESIGNA" && item.VALIDACION != "D-ERROR" && item.VALIDACION != "NOMAIL") {
            listToSend.push(item);
          }
        });

        if (listToSend.length > 0) _this.setState({ enviarLoading: true });

        _this.nominaController.sendNomina(listToSend, _this.props.product, function (errors, data) {
          cont++;

          if (cont === listToSend.length && listToSend.length != 0) {
            if (errors.length == 0 && listToSend.length != 0) {
              _this.setState({ showSuccessMsg: true, enviarLoading: false });
            } else if (errors.length != 0 && listToSend.length != 0) {
              _this.setState({ showErrorsMsg: true, enviarLoading: false });
            };
          } else if (errors.length != 0) {
            _this.setState({ showErrorsMsg: true, enviarLoading: false });
          }
        }, _this.props.user, "DDBEN");
      };

      _this._handleRestartButton = function () {
        _this.setState({ showSuccessMsg: false, listExcel: [], filename: "" });
        _this.fileExcel = null;
        _this.props.handleShowMain();
      };

      _this.state = {
        listExcel: [],
        filename: "",
        validation: false,
        showModal: false,
        showSuccessMsg: false,
        iscopyFromExcel: false,
        enviarLoading: false,
        validarLoading: false,
        showErrorsMsg: false,
        isLoading: false,
        desigBenefEnabled: null,
        paginaShow: [],
        excelLength: 0,
        selected: 0,
        rows: 100,
        page: 1,
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "Nomina de asegurados",
          size: "md",
          accept: null
        }
      };

      _this.fileExcel = null;

      _this.nominaController = new NominaController();
      return _this;
    }

    //Paginado de la Tabla

    //Fin del  Paginado

    _createClass(AddPayroll, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          this.state.desigBenefEnabled !== null && this.state.desigBenefEnabled ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "h4",
              { className: "subtitle-inside" },
              "Ingres\xE1 la n\xF3mina de asegurados"
            ),
            this.state.showSuccessMsg ? React.createElement(
              "div",
              null,
              " ",
              React.createElement(
                "p",
                { className: "font-italic font-weight-bold  mt-5" },
                "\xA1El proceso se ha realizado con \xE9xito!"
              ),
              " ",
              React.createElement(
                "p",
                { className: "font-italic font-weight-bold" },
                "Se ha enviado un mail a los nominados solicitando designen a sus beneficiarios."
              ),
              React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                  "div",
                  { className: "text-center justify-content-md-center mt-3" },
                  React.createElement(
                    "button",
                    {
                      className: "btn btn btn-light border-dark right mt-2",
                      onClick: this._handleRestartButton
                    },
                    "Aceptar"
                  )
                )
              )
            ) : this.state.showErrorsMsg ? React.createElement(
              "div",
              null,
              " ",
              React.createElement(
                "p",
                { className: "font-italic font-weight-bold  mt-5" },
                "\xA1Ocurri\xF3 un error!"
              ),
              " ",
              React.createElement(
                "p",
                { className: "font-italic font-weight-bold" },
                "No se ha realizado el proceso correctamente."
              ),
              React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                  "div",
                  { className: "text-center justify-content-md-center mt-3" },
                  React.createElement(
                    "button",
                    {
                      className: "btn btn btn-light border-dark right mt-2",
                      onClick: this._handleRestartButton
                    },
                    "Aceptar"
                  )
                )
              )
            ) : React.createElement(
              React.Fragment,
              null,
              " ",
              this.state.listExcel.length < 1 ? React.createElement(
                "div",
                null,
                React.createElement(
                  "em",
                  null,
                  "Seleccion\xE1 el archivo de la nomina de asegurados que deseas ingresar"
                ),
                React.createElement(
                  "div",
                  { className: "container" },
                  React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(
                      "div",
                      { className: "custom-file col-md-5" },
                      React.createElement(InputFile2, {
                        onChange: this.fileChangedHandler,
                        filename: this.state.filename
                      })
                    ),
                    React.createElement(
                      "button",
                      {
                        className: "ml-3 btn btn-hsbc mt-2",
                        onClick: this._handleButtonProcess
                      },
                      "Procesar"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "La cantidad maxima de personas a ingresar por nomina es de 2000. En caso de superar esta cantidad te pedimos por favor particiones la nomina"
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "p",
                      { className: "font-italic font-weight-bold" },
                      "Ten\xE9 en cuenta que el archivo debe contener los siguientes campos con el formato detallado:"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "CUIL: 11 caracteres sin guiones",
                      React.createElement("br", null),
                      "APELLIDO: no debe tener caracteres especiales como *, -, ?",
                      " ",
                      React.createElement("br", null),
                      "NOMBRE: no debe tener caracteres especiales como *, -, ?",
                      " ",
                      React.createElement("br", null),
                      "MAIL: mail v\xE1lido"
                    )
                  ),
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "p",
                      null,
                      "Aqu\xED pod\xE9s observar un ejemplo:"
                    ),
                    React.createElement(
                      "div",
                      { style: { width: "100%" } },
                      React.createElement("img", { style: { width: "85%" }, src: "../img/addPayroll/excelExample.png" })
                    )
                  )
                ),
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "h4",
                    { className: "subtitle-inside " },
                    "Tambien podes copiar la informacion de tu Excel"
                  ),
                  React.createElement(
                    "span",
                    null,
                    "Para hacerlo siga estos sencillos pasos"
                  ),
                  React.createElement(
                    "p",
                    null,
                    "1. Selecciona las filas que deseas importar a tu Excel y copialas"
                  ),
                  React.createElement(
                    "p",
                    null,
                    "2. Presion\xE1 ",
                    React.createElement(
                      "strong",
                      null,
                      "Generar Grilla"
                    ),
                    " y se generar\xE1 la de tu n\xF3mina automaticamente"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    "button",
                    {
                      onClick: this._handleExcelPasteFunction,
                      className: "btn btn-hsbc"
                    },
                    this.state.isLoading ? "Generando Grilla" : "Generar Grilla",
                    this.state.isLoading ? React.createElement("i", { className: "spinner-border spinner-border-sm position-spinner ml-3 md-5" }) : ""
                  )
                )
              ) : this._tableExcel(),
              React.createElement(
                "div",
                { className: "row justify-content-md-center mt-2" },
                this.state.listExcel.length > 0 ? !this.state.validation ? React.createElement(
                  ButtonLoading,
                  {
                    disabled: this.state.validarLoading,
                    className: "btn btn btn-danger border-dark right mt-2 mr-3",
                    onClick: this._handleValidateButton,
                    loading: this.state.validarLoading
                  },
                  "Validar n\xF3mina"
                ) : React.createElement(
                  ButtonLoading,
                  {
                    disabled: this.state.enviarLoading,
                    className: "btn btn btn-danger border-dark right mt-2 mr-3",
                    onClick: this._handleSendMailButton,
                    loading: this.state.enviarLoading },
                  "Enviar n\xF3mina"
                ) : "",
                React.createElement(
                  "button",
                  {
                    className: "btn btn btn-light border-dark right mt-2",
                    onClick: this._handleButtonCancel
                  },
                  "Cancelar"
                )
              )
            )
          ) : this.state.desigBenefEnabled !== null ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "h4",
              { className: "subtitle-inside" },
              "Lo sentimos!"
            ),
            React.createElement(
              "div",
              { className: "container remove-left-padding profile-container" },
              React.createElement(
                "div",
                { className: "col-12 mt-4" },
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(
                      "div",
                      { className: "text-justify" },
                      React.createElement(
                        "label",
                        null,
                        "No es posible realizar la carga para este producto por este medio"
                      ),
                      React.createElement(
                        "label",
                        null,
                        "Por favor comun\xEDcate con tu ejecutivo de cuentas para poder realizar la carga."
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row text-center mt-5" },
                  React.createElement(
                    "div",
                    { className: "col-md-12" },
                    React.createElement(
                      "button",
                      { onClick: this._handleButtonCancel, className: "btn btn-light" },
                      "Volver"
                    )
                  )
                )
              )
            )
          ) : "",
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModal,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML
          })
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var product = this.props.product.detalle ? this.props.product.detalle : this.props.product;

        this.nominaController.validateDesigBenef("22222222222", function (res) {
          if (res.VALIDACION === "NODESIGNA") {
            _this2.setState({
              desigBenefEnabled: false
            });
          } else {
            _this2.setState({
              desigBenefEnabled: true
            });
          }
        }, product);
      }
    }]);

    return AddPayroll;
  }(React.Component);

  return AddPayroll;
});