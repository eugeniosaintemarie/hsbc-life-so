var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../controller/vidaColectivoController", "../../controller/retiroNominaController", "../../common/fileManager", "../../common/modalReactBootstrap", "../../services/segurosOnlineService"], function (React, VidaColectivoController, RetiroNominaController, FileManager, ModalReactBootstrap, SegurosOnlineService) {
  var AdditionPdfColectivo = function (_React$Component) {
    _inherits(AdditionPdfColectivo, _React$Component);

    function AdditionPdfColectivo(props) {
      _classCallCheck(this, AdditionPdfColectivo);

      var _this = _possibleConstructorReturn(this, (AdditionPdfColectivo.__proto__ || Object.getPrototypeOf(AdditionPdfColectivo)).call(this, props));

      _this._handleReject = function () {
        var current = _this.state.modal.show;
        var contentInfo = "¿Esta seguro de avanzar con el desistimiento?";
        _this.setState({
          modal: { show: !current,
            component: null,
            html: true,
            title: "Adhesión web",
            size: "md",
            contentHTML: contentInfo,
            textBtnAccept: " Si",
            textBtnCancel: " No",
            accept: true
          }
        });
      };

      _this._handleOkReject = function () {
        var current = _this.state.modal.show;
        var contentInfo = "Su adhesión web está en proceso de desistimiento. Muchas gracias.";
        _this.setState({
          modal: { show: current,
            component: null,
            html: true,
            title: "Adhesión web",
            size: "md",
            contentHTML: contentInfo,
            accept: false
          }
        });

        _this.vidaColectivoController.setDesestimarFormWeb(_this.props.product, function (data) {
          if (data.SOL_DES == "OK") {
            _this.props.handleSetRequestNumber(_this.props.product.NRO_SOL, "D");
            _this.retiroNominaController.changePayrollStatus(_this.props.product, "D", _this.props.product.NRO_SOL, function (data) {
              if (data == "NO_ERROR") {
                _this.setState({ reject: true });
              }
            });
          } else {
            var _current = _this.state.modal.show;
            var _contentInfo = "Ocurrió un problema al desistir, por favor intentelo nuevamente";
            _this.setState({
              modal: { show: _current,
                component: null,
                html: true,
                title: "Adhesión web",
                size: "md",
                contentHTML: _contentInfo,
                accept: false
              }
            });
          }
        });
      };

      _this._handleModalIsOpen = function () {
        var current = _this.state.modal.show;
        _this.setState({
          modal: { show: !current }
        });
      };

      _this._handleCopyServiceError = function (contentInfo) {
        var current = _this.state.modal.show;
        _this.setState({
          modal: { show: !current,
            component: null,
            html: true,
            title: "Adhesión web",
            size: "md",
            contentHTML: contentInfo,
            accept: false
          }
        });
      };

      _this._getFormWebPDF = function () {
        _this.vidaColectivoController.getPDFFormWeb(_this.props.product, function (data) {
          if (data && data instanceof Blob && data.size > 0) {
            var filename = _this.props.product.NROPOLIZA + ".pdf";
            var fileManager = new FileManager();
            var resultDownload = fileManagerPDF(data, filename);
            if (!resultDownload) {
              var contentInfo = "Ha surgido un error al descargar el PDF";
              _this._handleCopyServiceError(contentInfo);
            }
          } else {
            var _contentInfo2 = "Ha surgido un error al generar el PDF";
            _this._handleCopyServiceError(_contentInfo2);
          }
        });
      };

      _this._setCheckDesistir = function () {
        _this.vidaColectivoController.getDatosPoliza(_this.props.product.POL_SEC, _this.props.product.POL_ANN, _this.props.product.COD_PRO, function (callBack) {
          if (callBack !== "ERROR") {
            var fechaHoy = _this._fechaCambioFormato(callBack.Message.DATOS.FEC_HOY);
            fechaHoy.setDate(fechaHoy.getDate() + 1);
            var campaHasta = _this._fechaCambioFormato(callBack.Message.DATOS.CAMPFECHAS); //this._fechaCambioFormato("20220211")
            campaHasta.setDate(campaHasta.getDate() + 1);

            var fechaEnvio = new Date(_this.props.product.FEC_ACT); //this._fechaCambioFormato("20220108")

            var diferencia = Math.round((fechaHoy.getTime() - fechaEnvio.getTime()) / (1000 * 60 * 60 * 24)) - 1;

            if (callBack.Message.DATOS.CAMPA == "S" && campaHasta < fechaHoy) {
              _this.setState({
                checkDesistir: false
              });
            } else if (callBack.Message.DATOS.CAMPA == "S" && campaHasta >= fechaHoy) {
              _this.setState({
                checkDesistir: true
              });
            } else if (callBack.Message.DATOS.CAMPA == "N" && diferencia <= 30) {
              _this.setState({
                checkDesistir: true
              });
            } else {
              _this.setState({
                checkDesistir: false
              });
            }
          }
        });
      };

      _this.state = {
        user: null,
        checkPdf: false,
        validForm: false,
        reject: false,
        checkDesistir: true,
        modal: {
          show: false,
          title: "",
          component: null,
          size: "md",
          html: false,
          contentHTML: "",
          textBtnAccept: "",
          textBtnCancel: ""
        }
      };
      _this.vidaColectivoController = new VidaColectivoController();
      _this.retiroNominaController = new RetiroNominaController();
      return _this;
    }

    _createClass(AdditionPdfColectivo, [{
      key: "_fechaCambioFormato",
      value: function _fechaCambioFormato(fecha) {
        var año = "";
        var mes = "";
        var dia = "";
        fecha = String(fecha);
        for (var index = 0; index < fecha.length; index++) {

          if (index <= 3) {
            año += fecha[index];
          } else if (index > 3 && index <= 5) {
            mes += fecha[index];
          } else {
            dia += fecha[index];
          }
        }
        var fechaString = año + "/" + mes + "/" + dia;
        var fechaDate = new Date(fechaString);
        return fechaDate;
      }
    }, {
      key: "render",
      value: function render() {
        var product = this.props.product;

        return React.createElement(
          React.Fragment,
          null,
          this.state.reject ? React.createElement(
            "div",
            { className: "col-md-16" },
            React.createElement(
              "p",
              { className: "font-weight-bold " },
              "Tu adhesi\xF3n web esta en proceso de desistimiento."
            ),
            React.createElement(
              "p",
              { className: "font-weight-bold " },
              "Muchas gracias"
            )
          ) : "",
          this.state.validForm && !this.state.reject && React.createElement(
            "div",
            { className: "container-fluid" },
            React.createElement(
              "div",
              { className: "col-md-16" },
              React.createElement(
                "p",
                { className: "font-weight-bold " },
                "\xA1Ya completaste tu adhesi\xF3n web!"
              ),
              React.createElement(
                "span",
                null,
                "Ten\xE9 en cuenta que antes de incluirte dentro de la p\xF3liza necesitaremos la confirmaci\xF3n de tu empleador"
              ),
              React.createElement("br", null),
              React.createElement("br", null),
              React.createElement(
                "span",
                null,
                "  Descarga ac\xE1 una copia de tu formulario de adhesi\xF3n"
              ),
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn-danger border-dark right",
                    onClick: this._getFormWebPDF
                  },
                  "Formulario de adhesi\xF3n web"
                )
              )
            ),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement(
              "span",
              null,
              this.state.checkDesistir ? React.createElement(
                "div",
                { className: "col-md-16" },
                React.createElement(
                  "p",
                  { className: "font-weight-bold " },
                  "\xBFTe arrepentiste de adherirte a esta p\xF3liza?"
                ),
                React.createElement(
                  "span",
                  null,
                  "Pod\xE9s darla de baja haciendo click en el boton \"Desistir mi adhesi\xF3n web\" "
                ),
                React.createElement(
                  "div",
                  { className: "col-md-12" },
                  React.createElement(
                    "button",
                    {
                      className: "btn btn-danger border-dark right",
                      onClick: this._handleReject
                    },
                    "Desistir adhesi\xF3n web"
                  )
                )
              ) : React.createElement(
                "span",
                null,
                "Si queres dar de baja tu p\xF3liza deberas notificarle tu decisi\xF3n a tu empleador para que te ayude con la gesti\xF3n."
              )
            )
          ),
          !this.state.validForm && !this.state.reject ? React.createElement(
            "div",
            { className: "container-fluid" },
            React.createElement(
              "div",
              { className: "col-md-16" },
              React.createElement(
                "span",
                null,
                "  Descarga ac\xE1 una copia de tu formulario de adhesi\xF3n"
              ),
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn-danger border-dark right",
                    onClick: this._getFormWebPDF
                  },
                  "Formulario de adhesi\xF3n web"
                )
              ),
              React.createElement("br", null),
              React.createElement(
                "span",
                null,
                "Si queres dar de baja tu p\xF3liza deberas notificarle tu decisi\xF3n a tu empleador para que te ayude con la gesti\xF3n."
              )
            )
          ) : "",
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.modal.show,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            textBtnAccept: this.state.modal.textBtnAccept,
            textBtnCancel: this.state.modal.textBtnCancel,
            accept: this.state.modal.accept && this._handleOkReject
          })
        );
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (prevProps.product.NROPOLIZA != this.props.product.NROPOLIZA) {
          this._setCheckDesistir();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var product = this.props.product;

        var seguroOnlineService = new SegurosOnlineService();
        seguroOnlineService.getListaDesignacionDeBenef({
          RAMOPCOD: product.COD_PRO,
          POLIZANN: product.POL_ANN,
          POLIZSEC: product.POL_SEC,
          CERTIPOL: product.CER_POL,
          CERTIANN: product.CER_ANN,
          CERTISEC: product.CER_SEC,
          DOCUMDAT: product.NRO_DOC,
          DOCUMTIP: Number(product.TIP_DOC)
        }).then(function (response) {
          if (!response || !response.Message || !response.Message.Request || response.Message.Request.ESTADO == "ER") {
            if (response.Message.Request.ERROR == "PO" || response.Message.Request.ERROR == "DO") {
              _this2.setState({ validForm: !_this2.state.validForm });
            }
          }
        });

        this._setCheckDesistir();
      }
    }]);

    return AdditionPdfColectivo;
  }(React.Component);

  return AdditionPdfColectivo;
});