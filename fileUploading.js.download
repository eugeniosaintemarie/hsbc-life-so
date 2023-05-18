var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "../../common/modalReactBootstrap", "../../common/inputFile2", "../../controller/nominaController", "../../controller/retiroNominaController", "../../common/errorExcel", "../../common/buttonLoading"], function (React, Loadsh, ModalReactBootstrap, InputFile2, NominaController, RetiroNominaController, ErrorExcel, ButtonLoading) {
  var FileUploading = function (_React$Component) {
    _inherits(FileUploading, _React$Component);

    function FileUploading(props) {
      _classCallCheck(this, FileUploading);

      var _this = _possibleConstructorReturn(this, (FileUploading.__proto__ || Object.getPrototypeOf(FileUploading)).call(this, props));

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

      _this._handleButtonProcess = function () {
        _this.nominaController.handleXLS(_this.fileExcel, function (list) {
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
          _this.nominaController.validateField(list, 4, true, 16, 70, function (listError) {
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
        });
      };

      _this._tableExcel = function () {
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
              _this.state.listExcel.map(function (e) {
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
            )
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
          case "YAEXIST":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0Ya es un integrante de la nomina vigente"
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
        _this.setState({
          validation: true
        });
        var listExcelClon = Loadsh.cloneDeep(_this.state.listExcel);

        _this.nominaController.validateNominaAdhesion(listExcelClon, function (fielProcess) {
          _this.setState({
            listExcel: listExcelClon
          });
        }, _this.props.product);
      };

      _this._handleSendMailButton = function () {
        var listToSend = [];
        var product = _this.props.product.cup ? _this.props.product.cup : _this.props.product.detalle;
        _this.state.listExcel.map(function (item) {
          if (item.VALIDACION != "MAILOK" && item.VALIDACION != "YAEXIST" && item.VALIDACION != "NOEXIST" && item.VALIDACION != "NODESIGNA") listToSend.push(item);
        });

        if (listToSend.length > 0) _this.setState({ enviarLoading: true });
        _this.retiroNominaController.sendNomina(listToSend, product, function (errors) {
          if (errors.length == 0 && listToSend.length != 0) _this.setState({ showSuccessMsg: true, enviarLoading: false });else if (errors.length != 0 && listToSend.length != 0) _this.setState({ showErrorsMsg: true, enviarLoading: false });
        }, _this.props.user, "RETCOL");
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
        enviarLoading: false,
        showErrorsMsg: false,
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "Nomina de asegurados",
          size: "md"
        }
      };

      _this.fileExcel = null;

      _this.nominaController = new NominaController();

      _this.retiroNominaController = new RetiroNominaController();
      return _this;
    }

    _createClass(FileUploading, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Ingres\xE1 archivo"
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
              "Se ha enviado un correo a las personas ingresadas."
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
            React.createElement(
              "em",
              null,
              "Seleccion\xE1 el archivo con el detalle de personas a adherir"
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
                )
              )
            ),
            this.state.listExcel.length < 1 ? React.createElement(
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
                  "Aqu\xED puedes observar un ejemplo:"
                ),
                React.createElement("img", { src: "../img/addPayroll/excelExample.png" })
              )
            ) : this._tableExcel(),
            React.createElement(
              "div",
              { className: "row justify-content-md-center mt-2" },
              this.state.listExcel.length > 0 ? !this.state.validation ? React.createElement(
                "button",
                {
                  className: "btn btn btn-danger border-dark right mt-2 mr-3",
                  onClick: this._handleValidateButton
                },
                "Validar n\xF3mina"
              ) : React.createElement(
                ButtonLoading,
                {
                  disabled: this.state.enviarLoading,
                  className: "btn btn btn-danger border-dark right mt-2 mr-3",
                  onClick: this._handleSendMailButton,
                  loading: this.state.enviarLoading
                },
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
          ),
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
    }]);

    return FileUploading;
  }(React.Component);

  return FileUploading;
});