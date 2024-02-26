var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../lib/utils", "../services/userService", "../services/segurosOnlineService", "../common/fileManager", "../common/modalReactBootstrap"], function (React, ReactRedux, Utils, UserService, SegurosOnlineService, FileManager, ModalReactBootstrap) {
  var MainBar = function (_React$Component) {
    _inherits(MainBar, _React$Component);

    function MainBar(props) {
      _classCallCheck(this, MainBar);

      var _this = _possibleConstructorReturn(this, (MainBar.__proto__ || Object.getPrototypeOf(MainBar)).call(this, props));

      _this.isLoaded = false;

      _this.goToMasInformacion = function () {
        _this.props.showMoreInformation();
      };

      _this.goToCargarNomina = function () {
        _this.props.showPaySheet();
      };

      _this._handleCopyServiceError = function () {
        _this.setState({
          modal: {
            show: true,
            component: null,
            contentHTML: "Ha surgido un error al generar la copia de póliza",
            html: true,
            title: "Copia de póliza",
            size: "md"
          }
        });
      };

      _this._handleInvalidPolicy = function () {
        _this.setState({
          modal: {
            show: true,
            component: null,
            contentHTML: "La impresión no está disponible debido a una o más situaciones de la póliza",
            html: true,
            title: "Copia de póliza",
            size: "md"
          }
        });
      };

      _this._handleClickPrint = function (e, detalle) {
        var segurosOnlineService = new SegurosOnlineService();
        var today = Utils.formatFechaNumber(Utils.dateToString(new Date()));

        if (e.target.id === "impClausulado") {
          segurosOnlineService.getImprimirClausulado({
            RAMOPCOD: detalle.RAMOPCOD,
            POLIZANN: detalle.POLIZANN,
            POLIZSEC: detalle.POLIZSEC,
            CERTIPOL: detalle.CERTIPOL,
            CERTIANN: detalle.CERTIANN,
            CERTISEC: detalle.CERTISEC,
            CIAASCOD: detalle.CIAASCOD
          }).then(function (data) {
            if (data) {
              var filename = detalle.NROPOLIZA + "_clausulado" + ".pdf";
              var fileManager = new FileManager();
              var resultDownload = fileManager.downloadPDF(data, filename);

              if (!resultDownload) {
                _this._handleCopyServiceError();
              }
            } else {
              _this._handleCopyServiceError();
            }
          });
        } else {
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
            _this.setState({
              currentPoliza: _this.props.currentProduct.polizaComp
            });

            if (endorsementData && endorsementData.length > 0 && typeof endorsementData[0].ENDOSO == "number" && endorsementData[0].IMPRESO === "S") {
              segurosOnlineService.getImprimirCertificado({
                RAMOPCOD: detalle.RAMOPCOD,
                POLIZANN: detalle.POLIZANN,
                POLIZSEC: detalle.POLIZSEC,
                CERTIPOL: detalle.CERTIPOL,
                CERTIANN: detalle.CERTIANN,
                CERTISEC: detalle.CERTISEC,
                CIAASCOD: detalle.CIAASCOD,
                SUPLENUM: detalle.SUPLENUM,
                ENDOSO: endorsementData[0].ENDOSO
              }).then(function (data) {
                if (data) {
                  var filename = detalle.NROPOLIZA + ".pdf";
                  var fileManager = new FileManager();
                  var resultDownload = fileManager.downloadPDF(data, filename);

                  if (!resultDownload) {
                    _this._handleCopyServiceError();
                  }
                } else {
                  _this._handleCopyServiceError();
                }
              });
            } else {
              _this._handleInvalidPolicy();
            }
          });
        }
      };

      _this._handleModalIsOpen = function () {
        var current = _this.state.modal.show;
        _this.setState({
          modal: { show: !current }
        });
      };

      _this._handleApplicationWeb = function (detalle) {
        if (detalle.COD_EST === 'E') {
          return _this._handleModalApplicationWeb;
        } else if (detalle.COD_EST === 'D') {
          return "";
        } else {
          return _this.props.showAdditionManagerColectivo;
        }
      };

      _this._handleModalApplicationWeb = function () {
        var current = _this.state.modal.show;
        _this.setState({
          modal: {
            show: !current,
            component: null,
            contentHTML: "La solicitud ya fue enviada",
            html: true,
            title: "Adhesión web",
            size: "md"
          }
        });
      };

      _this.state = {
        user: null,
        imprimirButton: false,
        currentPoliza: "",
        modal: {
          show: false,
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };
      return _this;
    }

    _createClass(MainBar, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            isAppointBeneficiary = _props.isAppointBeneficiary,
            itsAdditionRequest = _props.itsAdditionRequest,
            itsAdditionRequestColectivo = _props.itsAdditionRequestColectivo;

        var itsMyForms = isAppointBeneficiary || itsAdditionRequest || itsAdditionRequestColectivo;
        var user = this.state.user;


        var detalle = this.props.currentProduct ? this.props.currentProduct.detalle ? this.props.currentProduct.detalle : this.props.currentProduct.cup : null;

        var currentProduct = this.props.currentProduct ? this.props.currentProduct : null;
        // Habilitaciones

        // Menus para mis formularios
        var gMnuMFoRCo = itsAdditionRequest;
        var gMnuMFoVCo = itsAdditionRequestColectivo;

        // Menus
        var gMnuHitEnd = !itsMyForms;
        var gMnuAccSta = false;
        var gMnuDrpRqt = false;
        var gMnuDocXMa = !itsMyForms;
        var gMnuNomABM = false;
        var gMnuNomSeg = false;
        var gMnuVCoAdh = false;
        var gMnuBenNom = false;
        var gMenConBen = false;
        var gMnuResFon = false;
        var gMnuRCoAdh = false;
        var gMnuEndoso = false;
        var gMnuSalRet = false;
        var gMnuDesBen = false;
        var gMnuAdhWeb = false;
        var gMnuConAlT = false;

        // Botones
        var gBtnMasInf = !itsMyForms;
        var gBtnPagCon = !itsMyForms;
        var gBtnSinCon = false;
        var gBtnResCon = false;
        var gBtnImpPol = !itsMyForms;
        var gBtnImpCla = false;
        var gBtnDesBen = false;
        var gBtnAdhWeb = false;

        // Nombres Botones
        var gLeyDrpRqt = void 0;
        var gLeyAdhWeb = void 0;

        if (detalle) {
          if (detalle.TIPOPRODU) {
            if (detalle.TIPOPRODU === "C" || detalle.TIPOPRODU === "R" || detalle.TIPOPRODU === "O") {
              gMnuAccSta = true;
            }
            if (detalle.TIPOPRODU === "C") {
              gMnuResFon = true;
            }
            if (detalle.TIPOPRODU === "R") {
              gMnuEndoso = true;
              gMnuSalRet = true;
              gMnuDrpRqt = true;
              gLeyDrpRqt = "Solicitud de Rescates";
            }
            if (detalle.TIPOPRODU === "C" || detalle.TIPOPRODU === "M") {
              gMnuEndoso = true;
              gBtnSinCon = true;
              gMnuDrpRqt = true;
              gLeyDrpRqt = "Solicitud de baja";
            }
            if (detalle.TIPOPRODU === "R" || detalle.TIPOPRODU === "O") {
              gBtnResCon = true;
            } //
            if (detalle.TIPOPRODU === "O") {
              if (detalle.CERTISEC === 0) {
                gMnuRCoAdh = false;
              } else {
                gMnuDrpRqt = true;
                gLeyDrpRqt = "Solicitud de Rescates";
              }
              gMnuSalRet = true;
              gBtnPagCon = false;
            }
          } else {
            if (currentProduct) {
              if (currentProduct.TIPOPRODU === "L") {
                gBtnSinCon = true;
                if (currentProduct.certisec === 0) {
                  gMnuNomABM = true;
                  gMnuNomSeg = true;
                  gMnuVCoAdh = true;
                  gMnuDrpRqt = true;
                  gLeyDrpRqt = "Solicitud de baja";
                  gBtnImpCla = false;
                } else {
                  gMnuBenNom = true;
                  gMenConBen = true;

                  if (currentProduct.ramopcod === "CO10") {
                    gMnuConAlT = true;
                  }
                }
              }
              if (currentProduct.TIPOPRODU === "X") {
                if (currentProduct.certisec === 0) {
                  gMnuVCoAdh = true;
                  gBtnMasInf = false;
                  gBtnImpPol = false;
                  gMnuHitEnd = false;
                  gMnuDocXMa = false;
                  gBtnPagCon = false;
                  gBtnSinCon = false;
                }
              }
              if (currentProduct.TIPOPRODU === "O") {
                if (currentProduct.certisec === 0) {
                  gMnuRCoAdh = false;
                  gMnuDrpRqt = true;
                  gLeyDrpRqt = "Solicitud de baja";
                }
                gMnuAccSta = true;
                gMnuSalRet = true;
                gBtnPagCon = false;
                gBtnResCon = true;
              }

              if (currentProduct.detalle) {
                if (currentProduct.detalle.MAR_ADH && currentProduct.detalle.MAR_ADH === "S") {
                  gMnuAdhWeb = true;
                  //gBtnAdhWeb = true;
                  if (currentProduct.detalle.TIP_SOL && currentProduct.detalle.TIP_SOL === "M") {
                    gLeyAdhWeb = "Modificación de p\xF3liza";
                  } else {
                    gLeyAdhWeb = "Datos de adhesión";
                  }
                }

                if (currentProduct.detalle.MAR_DBE && currentProduct.detalle.MAR_DBE === "S") {
                  gMnuDesBen = true;
                  //gBtnDesBen = true;
                }
              }
            }
          }
        }

        if (user !== null) {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "main-bar" },
              React.createElement(
                "div",
                { className: "dropdown" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn-light dropdown-toggle menu-home",
                    type: "button",
                    id: "dropdownMenuButton",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "false"
                  },
                  React.createElement("span", { className: "navbar-toggler-icon custom-icons" }),
                  "Men\xFA"
                ),
                React.createElement(
                  "div",
                  {
                    className: "dropdown-menu",
                    "aria-labelledby": "dropdownMenuButton"
                  },
                  gMnuHitEnd && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowCopyPolicy
                    },
                    "Historia de endosos"
                  ),
                  gMnuAccSta && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowAccountState
                    },
                    "Estado de cuenta"
                  ),
                  gMnuDocXMa && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowPrintedByMail
                    },
                    "Suscripci\xF3n de env\xEDo de Doc. por email"
                  ),
                  gMnuNomABM && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowAbmNomina
                    },
                    "Cargar n\xF3mina de asegurados"
                  ),
                  gMnuNomSeg && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowNominaSeg
                    },
                    "Seguimiento de n\xF3minas enviadas"
                  ),
                  gMnuVCoAdh && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowColectiveLifeAdhesion
                    },
                    "Carga nomina Adhesi\xF3n Individual"
                  ),
                  gMnuVCoAdh && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowConsultaNomina
                    },
                    "Consulta de solicitudes de adhesi\xF3n"
                  ),
                  gMnuBenNom && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowAddPayroll
                    },
                    "Cargar n\xF3mina para designar beneficiarios"
                  ),
                  gMenConBen && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowConsBeneficiary
                    },
                    "Seguimiento designacion de beneficiarios"
                  ),
                  gMnuResFon && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowRescateParcial
                    },
                    "Rescate de fondo"
                  ),
                  gMnuRCoAdh && React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "button",
                      {
                        className: "dropdown-item",
                        href: "#",
                        onClick: this.props.handleShowAdhesion
                      },
                      "Carga nomina Adhesi\xF3n Individual"
                    ),
                    React.createElement(
                      "button",
                      {
                        className: "dropdown-item",
                        href: "#",
                        onClick: this.props.handleShowListaEmpleadosRetiro
                      },
                      "Consulta de solicitudes de adhesi\xF3n"
                    )
                  ),
                  gMnuEndoso && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowEndonso
                    },
                    "Modificar p\xF3liza"
                  ),
                  gMnuSalRet && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowSaldoCuentas
                    },
                    "Saldo en Cuentas"
                  ),
                  gMnuDrpRqt && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowDropRequest
                    },
                    gLeyDrpRqt
                  ),
                  gMnuConAlT && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowConstAltasTempranas
                    },
                    "Constancia de Altas Tempranas"
                  ),
                  gMnuDesBen && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowAppointBeneficiary
                    },
                    "Designaci\xF3n de beneficiarios"
                  ),
                  gMnuAdhWeb && React.createElement(
                    "button",
                    {
                      className: "dropdown-item",
                      href: "#",
                      onClick: this.props.handleShowAdditionRequestColectivo
                    },
                    gLeyAdhWeb
                  )
                )
              ),
              React.createElement(
                "div",
                null,
                gBtnDesBen && React.createElement(
                  "button",
                  {
                    onClick: this.props.handleShowAppointBeneficiary,
                    className: "btn btn-light"
                  },
                  "Designaci\xF3n de beneficiarios"
                )
              ),
              React.createElement(
                "div",
                null,
                gBtnAdhWeb && React.createElement(
                  "button",
                  {
                    onClick: this.props.handleShowAdditionRequestColectivo,
                    className: "btn btn-light"
                  },
                  gLeyAdhWeb
                )
              ),
              React.createElement(
                "div",
                null,
                gBtnMasInf && React.createElement(
                  "button",
                  {
                    onClick: this.goToMasInformacion,
                    className: "btn btn-light"
                  },
                  "M\xE1s Informaci\xF3n"
                )
              ),
              React.createElement(
                "div",
                null,
                gBtnPagCon && React.createElement(
                  "button",
                  {
                    className: "btn btn-light",
                    onClick: this.props.handleShowPayments
                  },
                  "Pagos",
                  React.createElement("span", { className: "icon-payments custom-icons" })
                )
              ),
              gBtnSinCon && React.createElement(
                "div",
                null,
                React.createElement(
                  "button",
                  {
                    className: "btn btn-light",
                    onClick: this.props.handleShowSiniestros
                  },
                  "Siniestros"
                )
              ),
              gBtnResCon && React.createElement(
                "div",
                null,
                React.createElement(
                  "button",
                  {
                    className: "btn btn-light",
                    onClick: this.props.handleShowRescates
                  },
                  "Rescates"
                )
              ),
              gBtnImpPol && React.createElement(
                "div",
                null,
                React.createElement(
                  "button",
                  {
                    className: "btn btn-light py-0",
                    style: { maxHeight: "46px" },
                    onClick: function onClick(e) {
                      _this2._handleClickPrint(e, detalle);
                    }
                  },
                  "Imprimir copia",
                  React.createElement("br", null),
                  "de p\xF3liza"
                )
              ),
              gBtnImpCla && React.createElement(
                "div",
                null,
                React.createElement(
                  "button",
                  {
                    id: "impClausulado",
                    className: "btn btn-light py-0",
                    style: { maxHeight: "46px" },
                    onClick: function onClick(e) {
                      _this2._handleClickPrint(e, detalle);
                    }
                  },
                  "Imprimir ",
                  React.createElement("br", null),
                  "clausulado"
                )
              )
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.modal.show,
              size: this.state.modal.size,
              isOpen: this._handleModalIsOpen,
              component: this.state.modal.component,
              html: this.state.modal.html,
              contentHTML: this.state.modal.contentHTML
            })
          );
        } else {
          return null;
        }
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this3 = this;

        var userService = new UserService();

        userService.getLoggedUser().then(function (user) {
          _this3.isLoaded = true;
          _this3.setState({
            user: user
          });
        });
      }
    }]);

    return MainBar;
  }(React.Component);

  function mapStateToProps(state) {
    return {
      currentProduct: Object.assign({}, state.seguros.currentProduct)
    };
  }

  return ReactRedux.connect(mapStateToProps, null)(MainBar);
});