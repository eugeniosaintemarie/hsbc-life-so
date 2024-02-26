var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../controller/beneficiariosController", "../../common/modalReactBootstrap", "../../common/fileManager"], function (React, BeneficiariosController, ModalReactBootstrap, FileManager) {
  var AppointBeneficiary = function (_React$Component) {
    _inherits(AppointBeneficiary, _React$Component);

    function AppointBeneficiary(props) {
      _classCallCheck(this, AppointBeneficiary);

      var _this = _possibleConstructorReturn(this, (AppointBeneficiary.__proto__ || Object.getPrototypeOf(AppointBeneficiary)).call(this, props));

      _this.controller = new BeneficiariosController();
      _this.fileManager = new FileManager();

      _this._handleModalIsOpen = function () {
        var current = _this.state.showModal;

        _this.setState({
          showModal: !current
        });
      };

      _this._handleImpresionCertIncorp = function () {
        _this.setState({
          printButtonLoading: true
        });

        var product = _this.props.product;

        var desigBenefReq = {
          RAMOPCOD: product.COD_PRO,
          POLIZANN: product.POL_ANN,
          POLIZSEC: product.POL_SEC,
          CERTIPOL: product.CER_POL,
          CERTIANN: product.CER_ANN,
          CERTISEC: product.CER_SEC,
          DOCUMDAT: product.NRO_DOC,
          DOCUMTIP: Number(product.TIP_DOC)
        };

        var pdfReq = {
          RAMOPCOD: product.COD_PRO,
          POLIZANN: product.POL_ANN,
          POLIZSEC: product.POL_SEC,
          CERTIPOL: product.CER_POL,
          CERTIANN: product.CER_ANN,
          CERTISEC: product.CER_SEC,
          TIPODOC: Number(product.TOM_TDO),
          NRODOC: Number(product.TOM_NDO),
          DOCUMDAT: product.NRO_DOC,
          CIAASCOD: "0020",
          ENDOSO: 9999
        };

        _this.controller.listDesigBenef(desigBenefReq, function (dat) {
          if (dat === "") {
            _this.controller.imprimirCertIncorp(pdfReq, function (data) {
              var filename = 'Certificado Incorporacion - ' + _this.props.product.NROPOLIZA + '.pdf';
              var resultDownload = _this.fileManager.downloadPDF(data, filename);

              if (!resultDownload) {
                _this.setState({
                  printButtonLoading: false,
                  showModal: true,
                  modal: {
                    component: null,
                    contentHTML: 'Disculpe, ha surgido un error al descargar el formulario, por favor inténtelo mas tarde',
                    html: true,
                    title: "Certificados de Incorporación ",
                    size: "md"
                  }
                });
              } else {
                _this.setState({
                  printButtonLoading: false
                });
              }
            });
          } else {
            _this.setState({
              printButtonLoading: false,
              showModal: true,
              modal: {
                component: null,
                contentHTML: 'Tu certificado de incorporación aún no está disponible',
                html: true,
                title: "Certificado de Incorporación",
                size: "md"
              }
            });
          }
        });
      };

      _this._handleImpresionCertCober = function () {
        _this.setState({
          printButtonLoading: true
        });

        var product = _this.props.product;

        var pdfReq = {
          RAMOPCOD: product.COD_PRO,
          POLIZANN: product.POL_ANN,
          POLIZSEC: product.POL_SEC,
          CERTIPOL: product.CER_POL,
          CERTIANN: product.CER_ANN,
          CERTISEC: product.CER_SEC,
          CIAASCOD: "0020",
          TIPODOC: Number(product.TOM_TDO),
          NRODOC: Number(product.TOM_NDO),
          ENDOSO: 9999,
          ASEGURADOS: [String(_this.props.user.NUMEDOCU)]
        };

        _this.controller.imprimirCertCober(pdfReq, function (data) {
          var filename = 'Certificado Cobertura - ' + _this.props.product.NROPOLIZA + '.pdf';
          var resultDownload = _this.fileManager.downloadPDF(data, filename);

          if (!resultDownload) {
            _this.setState({
              printButtonLoading: false,
              showModal: true,
              modal: {
                component: null,
                contentHTML: 'Disculpe, ha surgido un error al descargar el formulario, por favor inténtelo mas tarde',
                html: true,
                title: "Certificados de Cobertura ",
                size: "md"
              }
            });
          } else {
            _this.setState({
              printButtonLoading: false
            });
          }
        });
      };

      _this.state = {
        printButtonLoading: false,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        },
        showModal: false
      };
      return _this;
    }

    _createClass(AppointBeneficiary, [{
      key: "render",
      value: function render() {
        var product = this.props.product;
        var contenido = void 0;

        if (product.EST_DBE === "E") {
          contenido = React.createElement(
            "button",
            { className: "btn btn-danger border-dark right", onClick: this.props.handleShowDdbenCrudMenu },
            "Modificar Beneficiarios"
          );
        } else {
          contenido = React.createElement(
            "button",
            { className: "btn btn-danger border-dark right", onClick: this.props.handleShowDdbenCrudMenu },
            "Designar Beneficiarios"
          );
        }
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "container-fluid" },
            React.createElement(
              "div",
              { className: "col-md-12" },
              React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  { className: "col-md-8 p-3" },
                  React.createElement(
                    "span",
                    { className: "text-body" },
                    "Hac\xE9 click para designar los beneficiarios de tu poliza."
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-5 p-3" },
                  contenido
                )
              )
            )
          ),
          React.createElement(
            "div",
            { className: "container col-md-17" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                { className: "p-3" },
                React.createElement(
                  "span",
                  { className: "text-body" },
                  "Hac\xE9 click para imprimir tu certificado de incorporaci\xF3n."
                )
              ),
              React.createElement(
                "button",
                { className: "btn btn-danger m-3 border-dark right", onClick: this._handleImpresionCertIncorp },
                "Certificado Incorporaci\xF3n"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { className: "btn btn-danger m-2 btn-sm rounded d-none", onClick: this._handleImpresionCertCober, style: { padding: "0.25rem 0.7rem" } },
                "Certificados de cobertura"
              ),
              " "
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

    return AppointBeneficiary;
  }(React.Component);

  return AppointBeneficiary;
});