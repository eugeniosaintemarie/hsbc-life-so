var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../segurosOnline/login", "../common/navBar", "../segurosOnline/myProducts", "../segurosOnline/manager", "../services/userService", "../common/loader", "../redux/store", "../lib/utils", "../services/segurosOnlineService", "../services/retiroNominaService", "../components/mailOnboarding", "../components/modalPepLowRisk", "../common/modalReactBootstrap", "../components/contact", "../components/profile", "../components/novedades"], function (React, ReactRedux, Login, NavBar, MyProducts, Manager, UserService, Loader, Store, Utils, SegurosOnlineService, RetiroNominaService, MailOnboarding, ModalPepLowRisk, ModalReactBootstrap, Contact, Profile, Novedades) {
  var Layout = function (_React$Component) {
    _inherits(Layout, _React$Component);

    function Layout(props) {
      _classCallCheck(this, Layout);

      var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

      _this.isLoaded = false;

      _this._handleSwitch = function (form, previusForm) {
        _this.props.setCurrentProduct(form);
        var viewsToFalse = _this.setToFalse();
        Store.dispatch({ type: 'seguros', form: form });
        _this.setState(Object.assign({
          currentForm: form,
          previusForm: previusForm,
          product: form
        }, viewsToFalse), function () {});

        if (form.additionRequest) {
          _this.setState({ showAdditionRequest: true });
        }
      };

      _this._handleShowAdditionManager = function () {
        var current = _this.state.showAdditionManager;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAdditionManager: !current
        }));
      };

      _this._handleShowAdditionRequest = function () {
        var current = _this.state.showAdditionRequest;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAdditionRequest: !current
        }));
      };

      _this._handleShowAdditionRequestColectivo = function () {
        var current = _this.state.showAdditionRequestColectivo;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAdditionRequestColectivo: !current
        }));
      };

      _this._handleShowAdditionFormModify = function () {
        var current = _this.state.showAdditionFormModify;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAdditionFormModify: !current
        }));
      };

      _this._handleShowAdditionManagerColectivo = function () {
        var current = _this.state.showAdditionManagerColectivo;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAdditionManagerColectivo: !current
        }));
      };

      _this._handleShowAppointBeneficiary = function () {
        var current = _this.state.showAppointBeneficiary;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAppointBeneficiary: !current
        }));
      };

      _this._handleShowDdbenCrudMenu = function () {
        var current = _this.state.showDdbenCrudMenu;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showDdbenCrudMenu: !current
        }));
      };

      _this._handleShowMain = function () {
        var current = _this.state.showMoreInformation;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse));
      };

      _this._handleShowNomina = function () {
        var current = _this.state.showNomina;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showNomina: !current
        }));
      };

      _this._handleShowAltasTempranas = function () {
        var current = _this.state.showAltasTempranas;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAltasTempranas: !current
        }));
      };

      _this._handleShowMoreInformation = function () {
        var current = _this.state.showMoreInformation;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showMoreInformation: !current
        }));
      };

      _this._handleShowPaySheet = function () {
        var current = _this.state.showPaySheet;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showPaySheet: !current
        }));
      };

      _this._handleShowCopyPolicy = function () {
        var current = _this.state.showCopyPolicy;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showCopyPolicy: !current
        }));
      };

      _this._handleShowAddPayroll = function () {
        var current = _this.state.showAddPayroll;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAddPayroll: !current
        }));
      };

      _this._handleShowConsBeneficiary = function () {
        var current = _this.state.showConsBeneficiary;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showConsBeneficiary: !current
        }));
      };

      _this._handleShowAdhesion = function () {
        var current = _this.state.showAdhesion;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAdhesion: !current
        }));
      };

      _this._handleShowColectiveLifeAdhesion = function () {
        var current = _this.state.showColectiveLifeAdhesion;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showColectiveLifeAdhesion: !current
        }));
      };

      _this._handleShowListaEmpleadosRetiro = function () {
        var current = _this.state.showListaEmpleadosRetiro;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showListaEmpleadosRetiro: !current
        }));
      };

      _this._handleShowConsultaNomina = function () {
        var current = _this.state.showConsultaNomina;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showConsultaNomina: !current
        }));
      };

      _this._handleShowConsultaBeneficary = function () {
        var current = _this.state.showConsultaBeneficiary;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showConsultaBeneficiary: !current
        }));
      };

      _this._handleShowPrintAccountStatus = function () {
        var current = _this.state.showPrintAccountStatus;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showPrintAccountStatus: !current
        }));
      };

      _this._handleShowAccountState = function () {
        var current = _this.state.showAccountState;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAccountState: !current
        }));
      };

      _this._handleShowDropRequest = function () {
        var current = _this.state.showDropRequest;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showDropRequest: !current
        }));
      };

      _this._handleShowConstAltasTempranas = function () {
        var current = _this.state.showConstAltasTempranas;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showConstAltasTempranas: !current
        }));
      };

      _this._handleShowPrintedByMail = function () {
        var current = _this.state.showPrintedByMail;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showPrintedByMail: !current
        }));
      };

      _this._handleShowAbmNomina = function () {
        var current = _this.state.showAbmNomina;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAbmNomina: !current
        }));
      };

      _this._handleShowSaldoCuentas = function () {
        var current = _this.state.showSaldoCuentas;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showSaldoCuentas: !current
        }));
      };

      _this._handleShowNominaSeg = function () {
        var current = _this.state.showNominaSeg;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showNominaSeg: !current
        }));
      };

      _this._handleShowRescateParcial = function () {
        var current = _this.state.showRescateParcial;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showRescateParcial: !current
        }));
      };

      _this._handleShowPayments = function () {
        var current = _this.state.showPayments;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showPayments: !current
        }));
      };

      _this._handleShowSiniestros = function () {
        var current = _this.state.showSiniestros;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showSiniestros: !current
        }));
      };

      _this._handleShowRescates = function () {
        var current = _this.state.showRescates;
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showRescates: !current
        }));
      };

      _this._handleShowContact = function () {
        _this.setState({
          showModal: true,
          modal: {
            title: "",
            component: React.createElement(Contact, { handleClose: _this._handleModalIsOpen }),
            contentHTML: '',
            html: false,
            size: "xl",
            responseModal: null,
            hiddenButtonClose: true
          }
        });
      };

      _this._handleShowNovedades = function () {
        _this.setState({
          showModal: true,
          modal: {
            title: "",
            component: React.createElement(Novedades, { handleClose: _this._handleModalIsOpen }),
            contentHTML: '',
            html: false,
            size: "xl",
            responseModal: null,
            hiddenButtonClose: false
          }
        });
      };

      _this._handleShowProfile = function () {
        _this.setState({
          showModal: true,
          modal: {
            title: "",
            component: React.createElement(Profile, { handleClose: _this._handleModalIsOpen }),
            contentHTML: '',
            html: false,
            size: "xl",
            responseModal: null,
            hiddenButtonClose: true
          }
        });
      };

      _this._handleShowEndoso = function () {
        var current = void 0;
        if (_this.state.showEndoso == true) {
          current = 'reload';
        } else {
          current = true;
        }
        var currentState = _this.state;
        var viewsToFalse = _this.setToFalse();
        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showEndoso: current
        }));
      };

      _this.setToFalse = function () {
        return {
          showAltasTempranas: false,
          showAccountState: false,
          showDropRequest: false,
          showConstAltasTempranas: false,
          showCopyPolicy: false,
          showNomina: false,
          showMoreInformation: false,
          showPayments: false,
          showSiniestros: false,
          showPrintAccountStatus: false,
          showPrintedByMail: false,
          showAbmNomina: false,
          showSaldoCuentas: false,
          showNominaSeg: false,
          showRescateParcial: false,
          showEndoso: false,
          showAddPayroll: false,
          showConsBeneficiary: false,
          showAppointBeneficiary: false,
          showDdbenCrudMenu: false,
          showAdditionRequest: false,
          showAdditionRequestColectivo: false,
          showAdditionFormModify: false,
          showListaEmpleadosRetiro: false,
          showConsultaNomina: false,
          showConsultaBeneficiary: false,
          showAdditionManager: false,
          showAdditionManagerColectivo: false,
          showAdhesion: false,
          showRescates: false,
          showColectiveLifeAdhesion: false
        };
      };

      _this.load = false;

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._loadWS = function () {

        var myForms = [];

        _this.userService.getLoggedUser().then(function (user) {
          _this.userService.getCustomerProducts().then(function (data) {
            _this.userService.buscarClientes().then(function (productsCollective) {
              _this.segurosOnlineService.getBuscarPrecarga().then(function (productsNotIssued) {
                _this.segurosOnlineService.getProdColAseg({}).then(function (productsUnificados) {
                  _this.segurosOnlineService.getPolXEmailMasivo({}).then(function (response) {
                    _this.segurosOnlineService.getPEPLowRisk({}).then(function (pep) {
                      if (productsUnificados.Code === "NO_ERROR") {
                        var productsForm = productsUnificados.Message.REGS.REG;

                        productsForm.map(function (productData) {
                          myForms.push(productData);
                        });
                      }

                      _this.setState({
                        misformularios: myForms,
                        productNotIssued: productsNotIssued
                      });

                      var products = data;
                      var product = {};

                      if (products && products.productosIndividuales && products.productosIndividuales.length > 0) {
                        product = products.productosIndividuales[0];
                      } else if (productsCollective && productsCollective.length > 0) {
                        product = productsCollective[0];
                      } else if (productsNotIssued && productsNotIssued.length > 0) {
                        product = productsNotIssued[0];
                      } else if (myForms && myForms.length > 0) {
                        var nroPol = myForms[0].COD_PRO + "-" + myForms[0].POL_ANN.toString().padStart(2, "0") + "-" + myForms[0].POL_SEC.toString().padStart(6, "0") + " -" + myForms[0].CER_POL.toString().padStart(4, "0") + "-" + myForms[0].CER_ANN.toString().padStart(4, "0") + "-" + myForms[0].CER_SEC.toString().padStart(6, "0");

                        product = {
                          additionRequest: true,
                          detalle: Object.assign({
                            NROPOLIZA: nroPol
                          }, myForms[0])
                        };
                      }

                      if (response.Code === "NO_ERROR" && pep.Message.REGS.REG[0].PLR_PED === 'N') {
                        if (products && products.productosIndividuales && products.productosIndividuales.length > 0 && products.productosIndividuales.length <= 10) {
                          if (response.Code === "NO_ERROR" && response.Message.REGS.REG[0].PXM_PED === 'S') {
                            //Verifica que todas las polizas tengas un mail asociado
                            var list = products.productosIndividuales;
                            _this._verificarMailPolizas(list, function (tienenEmail) {
                              if (tienenEmail) {
                                _this.segurosOnlineService.setPolXEmailMasivo({ COD_EST: 'H' });
                              } else {
                                _this.setState({
                                  showModal: true,
                                  modal: {
                                    title: "",
                                    component: React.createElement(MailOnboarding, { email: user.MAIL, listPol: list, handleClose: _this._handleModalIsOpen }),
                                    contentHTML: '',
                                    html: false,
                                    size: "xl",
                                    responseModal: null,
                                    hiddenButtonClose: true
                                  }
                                });
                              }
                            });
                          };
                        } else {
                          _this.segurosOnlineService.setPolXEmailMasivo({ COD_EST: 'A' });
                        }
                      } else {
                        _this.setState({
                          showModal: true,
                          modal: {
                            title: "",
                            component: React.createElement(ModalPepLowRisk, { doc: {
                                tipoDoc: user.TIPODOCU, nroDoc: user.NUMEDOCU
                              },
                              email: user.MAIL,
                              listPol: products.productosIndividuales,
                              handleClose: _this._handleModalIsOpen }),
                            contentHTML: '',
                            html: false,
                            size: "xl",
                            responseModal: null,
                            hiddenButtonClose: true
                          }
                        });
                      }

                      _this.isLoaded = true;
                      _this.props.setCurrentProduct(product);
                      _this.setState({
                        user: user,
                        products: products,
                        product: product
                      });
                    });
                  });
                });
              });
            });
          });
        });
      };

      _this.state = {
        currentForm: "", //view or component to load
        previusForm: "",
        products: null,
        product: null,
        user: null,
        showAccountState: false,
        showDropRequest: false,
        showConstAltasTempranas: false,
        showCopyPolicy: false,
        showNomina: false,
        showMoreInformation: false,
        showPaySheet: false,
        showPayments: false,
        showSiniestros: false,
        showRescates: false,
        showPrintAccountStatus: false,
        showPrintedByMail: false,
        showAbmNomina: false,
        showSaldoCuentas: false,
        showNominaSeg: false,
        showRescateParcial: false,
        insurancePolicies: null,
        showEndoso: false,
        showAddPayroll: false,
        showConsBeneficiary: false,
        showAdhesion: false,
        showAppointBeneficiary: false,
        showDdbenCrudMenu: false,
        showAdditionRequest: false,
        showAdditionRequestColectivo: false,
        showAdditionFormModify: false,
        misformularios: null,
        showAdditionManager: false,
        showAdditionManagerColectivo: false,
        showListaEmpleadosRetiro: false,
        showConsultaNomina: false,
        showConsultaBeneficiary: false,
        showColectiveLifeAdhesion: false,
        showAltasTempranas: false,

        showModal: false,
        modal: {
          title: "",
          component: null,
          contentHTML: '',
          html: false,
          size: "md",
          responseModal: null,
          hiddenButtonClose: false
        },

        userLoad: false
      };

      _this.userService = new UserService();
      _this.segurosOnlineService = new SegurosOnlineService();
      _this.retiroNominaService = new RetiroNominaService();
      return _this;
    }

    _createClass(Layout, [{
      key: "render",
      value: function render() {
        var auth = this.props.auth;
        var _state = this.state,
            product = _state.product,
            user = _state.user;
        // valida si el logeo viene por gsp

        var param = Utils.getUrlParameter("gsp");
        if (param === 'true') {
          // agregar || true, para saltear el login
          if (this.load == false) {
            this._loadWS();
            this.load = true;
          }
        } else {
          // valida si ya esta logueado
          if (this.state.userLoad) {
            if (this.load == false) {
              this._loadWS();
              this.load = true;
            }
          }
        }

        if (auth.authorized || this.load) {
          //cambiar aqui para ir a la pantalla de inicio
          this.props.assignBackground();

          return React.createElement(
            React.Fragment,
            null,
            React.createElement(NavBar, {
              handleShowNovedades: this._handleShowNovedades,
              handleShowProfile: this._handleShowProfile,
              handleShowContact: this._handleShowContact,
              GSP: true }),
            product !== null && user !== null ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "div",
                { className: "row header-customer" },
                React.createElement(
                  "div",
                  { className: "col-md-4 text-center" },
                  React.createElement(
                    "h5",
                    { className: "title-myproducts text-left title" },
                    "Mis productos"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8 text-center" },
                  React.createElement(
                    "h5",
                    { className: "title" },
                    "Bienvenido",
                    React.createElement(
                      "strong",
                      null,
                      " " + this.state.user.CLIENNOM + " " + this.state.user.CLIENAP1 + " " + this.state.user.CLIENAP2
                    ),
                    " ",
                    "tu \xFAltima visita fue el",
                    " ",
                    React.createElement(
                      "strong",
                      null,
                      this.state.user.FECHA
                    )
                  )
                )
              ),
              React.createElement("div", { className: "clearfix" }),
              React.createElement(
                "div",
                { className: "container main-container home-container custom-padding" },
                React.createElement(
                  "div",
                  { className: "col-md-12 custom-padding" },
                  React.createElement(
                    "div",
                    { className: "col-md-4 custom-padding" },
                    React.createElement(MyProducts, {
                      misformularios: this.state.misformularios,
                      "switch": this._handleSwitch,
                      updateViewOnManager: this._updateView
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 custom-padding" },
                    React.createElement(Manager, {
                      handleShowAltasTempranas: this._handleShowAltasTempranas,
                      handleShowNomina: this._handleShowNomina,
                      handleShowMore: this._handleShowMoreInformation,
                      handleShowPaySheet: this._handleShowPaySheet,
                      handleShowPrintAccountStatus: this._handleShowPrintAccountStatus,
                      handleShowAccountState: this._handleShowAccountState,
                      handleShowDropRequest: this._handleShowDropRequest,
                      handleShowConstAltasTempranas: this._handleShowConstAltasTempranas,
                      handleShowCopyPolicy: this._handleShowCopyPolicy,
                      handleShowPayments: this._handleShowPayments,
                      handleShowSiniestros: this._handleShowSiniestros,
                      handleShowRescates: this._handleShowRescates,
                      handleShowPrintedByMail: this._handleShowPrintedByMail,
                      handleShowAbmNomina: this._handleShowAbmNomina,
                      handleShowSaldoCuentas: this._handleShowSaldoCuentas,
                      handleShowNominaSeg: this._handleShowNominaSeg,
                      handleShowRescateParcial: this._handleShowRescateParcial,
                      handleShowEndoso: this._handleShowEndoso,
                      handleShowMain: this._handleShowMain,
                      showAltasTempranas: this.state.showAltasTempranas,
                      showNomina: this.state.showNomina,
                      showMore: this.state.showMoreInformation,
                      showAccountState: this.state.showAccountState,
                      showDropRequest: this.state.showDropRequest,
                      showConstAltasTempranas: this.state.showConstAltasTempranas,
                      showCopyPolicy: this.state.showCopyPolicy,
                      showPrintAccountStatus: this.state.showPrintAccountStatus,
                      showPayments: this.state.showPayments,
                      showSiniestros: this.state.showSiniestros,
                      showRescates: this.state.showRescates,
                      showPaySheet: this.state.showPaySheet,
                      showPrintedByMail: this.state.showPrintedByMail,
                      showAbmNomina: this.state.showAbmNomina,
                      showSaldoCuentas: this.state.showSaldoCuentas,
                      showNominaSeg: this.state.showNominaSeg,
                      showRescateParcial: this.state.showRescateParcial,
                      showEndoso: this.state.showEndoso,
                      handleShowAddPayroll: this._handleShowAddPayroll,
                      handleShowConsBeneficiary: this._handleShowConsBeneficiary,
                      showConsBeneficiary: this.state.showConsBeneficiary,
                      showAddPayroll: this.state.showAddPayroll,
                      handleShowAdhesion: this._handleShowAdhesion,
                      showAdhesion: this.state.showAdhesion,
                      handleShowColectiveLifeAdhesion: this._handleShowColectiveLifeAdhesion,
                      showColectiveLifeAdhesion: this.state.showColectiveLifeAdhesion,
                      product: product,
                      "switch": this._handleSwitch,
                      handleShowAppointBeneficiary: this._handleShowAppointBeneficiary,
                      showAppointBeneficiary: this.state.showAppointBeneficiary,
                      showDdbenCrudMenu: this.state.showDdbenCrudMenu,
                      handleShowDdbenCrudMenu: this._handleShowDdbenCrudMenu,
                      showAdditionRequest: this.state.showAdditionRequest,
                      handleShowAdditionRequest: this._handleShowAdditionRequest,
                      showAdditionRequestColectivo: this.state.showAdditionRequestColectivo,
                      showAdditionFormModify: this.state.showAdditionFormModify,
                      handleShowAdditionRequestColectivo: this._handleShowAdditionRequestColectivo,
                      handleShowListaEmpleadosRetiro: this._handleShowListaEmpleadosRetiro,
                      showListaEmpleadosRetiro: this.state.showListaEmpleadosRetiro,
                      handleShowConsultaNomina: this._handleShowConsultaNomina,
                      showConsultaNomina: this.state.showConsultaNomina,
                      handleShowConsultaBeneficiary: this._handleShowConsultaBeneficary,
                      showConsultaBeneficiary: this.state.showConsultaBeneficiary,
                      showAdditionManager: this.state.showAdditionManager,
                      handleShowAdditionManager: this._handleShowAdditionManager,
                      showAdditionManagerColectivo: this.state.showAdditionManagerColectivo,
                      handleShowAdditionManagerColectivo: this._handleShowAdditionManagerColectivo,
                      handleShowAdditionFormModify: this._handleShowAdditionFormModify,
                      user: this.state.user,
                      recoverPayrollEmployees: this.state.currentForm.detalle
                    })
                  )
                )
              ),
              React.createElement(ModalReactBootstrap, {
                title: this.state.modal.title,
                show: this.state.showModal,
                size: this.state.modal.size,
                isOpen: this._handleModalIsOpen,
                contentHTML: this.state.modal.contentHTML,
                html: this.state.modal.html,
                component: this.state.modal.component,
                responseModal: true,
                hiddenButtonClose: true })
            ) : !this.isLoaded ? React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            ) : ''
          );
        } else {
          this.props.removeBackground();
          return React.createElement(Login, { onLoadOK: this._loadWS });
        }
      }
    }, {
      key: "_verificarMailPolizas",
      value: function _verificarMailPolizas(list, response) {
        var _this2 = this;

        var tieneMail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        this.segurosOnlineService.getPolizasPorEmail({
          CERTIANN: list[index].poliza.CERTIANN,
          CERTIPOL: list[index].poliza.CERTIPOL,
          CERTISEC: list[index].poliza.CERTISEC,
          CIAASCOD: list[index].poliza.CIAASCOD,
          POLIZANN: list[index].poliza.POLIZANN,
          POLIZSEC: list[index].poliza.POLIZSEC,
          RAMOPCOD: list[index].poliza.RAMOPCOD
        }).then(function (pol) {
          list[index].tieneMail = true;
          if (pol.EMAIL === '') {
            list[index].tieneMail = false;
            tieneMail = false;
          }
          if (list.length > index + 1) {
            index++;
            _this2._verificarMailPolizas(list, response, tieneMail, index);
          } else {
            response(tieneMail);
          }
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.isLoaded = false;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        // Llamar al servicio, para verificar si ya esta logueado
        this.userService.getLoggedUserOnly().then(function (data) {
          if (data.MAIL) {
            _this3.setState({
              userLoad: true
            });
          }
        }).catch(function (e) {
          // console.log("");
        });
      }
    }]);

    return Layout;
  }(React.Component);

  function mapStateToProps(state) {
    return {
      auth: Object.assign({}, state.auth)
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      setCurrentProduct: function setCurrentProduct(product) {
        return dispatch({ type: "SET_CURRENT_PRODUCT", payload: product });
      }
    };
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Layout);
});