var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/messageComponent", "./mainBar", "../components/nomina", "../components/moreInformation", "../components/paySheet", "../components/printAccountStatus", "../components/printedByMail", "../components/abmNomina/abmNominaMain", "../components/saldoCuentas", "../components/nominaSeg", "../components/rescateMain", "../components/copyPolicy", "../components/addPayroll", "../components/beneficiarios/appointBeneficiary", "../components/accountState", "../components/payments", "../components/siniestros", "../components/rescates", "../components/endosos/endosoManager", "../segurosOnline/home", "../services/userService", "../components/beneficiarios/ddbenCrudMenu", "../components/retiroNomina/additionRequest", "../components/retiroNomina/fileUploading", "../components/retiroNomina/employeesList", "../components/retiroNomina/additionManager", "../components/adhecionVidaColectivo/fileUpload", "../components/adhecionVidaColectivo/additionRequestColectivo", "../components/adhecionVidaColectivo/additionManagerColectivo", "../components/adhecionVidaColectivo/payrollQuery", "../components/beneficiarios/queryBeneficiary", "../components/adhecionVidaColectivo/additionPdfColectivo", "../components/altasTempranas.js", "../components/dropRequest"], function (React, MessageComponent, MainBar, Nomina, MoreInformation, PaySheet, PrintAccountStatus, PrintedByMail, AbmNomina, SaldoCuentas, NominaSeg, RescateMain, CopyPolicy, AddPayroll, AppointBeneficiary, AccountState, Payments, Siniestros, Rescates, EndosoManager, Home, UserService, DdbenCrudMenu, AdditionRequest, FileUploading, EmployeesList, AdditionManager, FileUpload, AdditionRequestColectivo, AdditionManagerColectivo, PayrollQuery, QueryBeneficiary, AdditionPdfColectivo, AltasTempranas, DropRequest) {
  var Manager = function (_React$Component) {
    _inherits(Manager, _React$Component);

    function Manager(props) {
      _classCallCheck(this, Manager);

      var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this, props));

      _this._handleEndoso = function (e) {
        _this.setState({
          nroEndoso: e
        });
      };

      _this._handleSearch = function (from, to, type) {
        //call API SERVICE

        _this.setState({
          insurancePoliciesSearching: true,
          insurancePolicies: null
        });
        var userService = new UserService();
        var p = userService.getCustomerProducts().individual[0];
        if (p && from !== "" && to !== "") {
          var current = _this.state;

          setTimeout(function () {
            this.setState(Object.assign({}, current, {
              insurancePolicies: p.polizas,
              insurancePoliciesSearching: false
            }));
          }.bind(_this), 2000);
        }
      };

      _this._handleButtonModifyBeneficiary = function () {
        if (_this.props.showAppointBeneficiary == true) {
          _this.props.handleShowDdbenCrudMenu();
        }
      };

      _this._handleButtonAdditionManager = function () {
        if (_this.props.showAdditionRequest == true) {
          _this.props.handleShowAdditionManager();
        }
      };

      _this._handleButtonAdditionManagerColectivo = function () {
        if (_this.props.showAdditionRequestColectivo == true) {
          _this.props.handleShowAdditionManagerColectivo();
        }
      };

      _this._handleSetRequestNumber = function (requestNumber, requestState) {
        var auxProp = _this.props.recoverPayrollEmployees;

        auxProp.NRO_SOL = requestNumber;
        auxProp.COD_EST = requestState;

        if (_this.newRecoverPayrollEmployee == null) {
          _this.newRecoverPayrollEmployee = [];
        }
        var ind = -1;
        for (var i = 0; i < _this.newRecoverPayrollEmployee.length; i++) {
          if (_this.newRecoverPayrollEmployee[i].NROPOLIZA == auxProp.NROPOLIZA) {
            ind = i;
            break;
          }
        }
        if (ind >= 0) {
          _this.newRecoverPayrollEmployee[ind] = auxProp;
        } else {
          _this.newRecoverPayrollEmployee.push(auxProp);
        }
      };

      _this.indexPoliza = function (newRecoverPayrollEmployee, recoverPayrollEmployees) {
        var ind = -1;
        for (var i = 0; i < newRecoverPayrollEmployee.length; i++) {
          if (newRecoverPayrollEmployee[i].NROPOLIZA == recoverPayrollEmployees.NROPOLIZA) {
            ind = i;
            break;
          }
        }
        return ind;
      };

      _this._handleSetRecoverPayrollEmployee = function () {
        if (_this.newRecoverPayrollEmployee != null) {
          var indexPoliza = _this.indexPoliza(_this.newRecoverPayrollEmployee, _this.props.recoverPayrollEmployees);
          if (indexPoliza >= 0) {
            return _this.newRecoverPayrollEmployee[indexPoliza];
          } else {
            return _this.props.recoverPayrollEmployees;
          }
        } else {
          return _this.props.recoverPayrollEmployees;
        }
      };

      _this.state = {
        product: null,
        insurancePolicies: null,
        insurancePoliciesSearching: false,
        nroEndoso: {}
      };
      _this.newRecoverPayrollEmployee = null;
      return _this;
    }

    _createClass(Manager, [{
      key: "render",
      value: function render() {
        var insurancePoliciesSearching = this.state.insurancePoliciesSearching;
        var _props = this.props,
            product = _props.product,
            showNomina = _props.showNomina,
            showAltasTempranas = _props.showAltasTempranas,
            showMore = _props.showMore,
            handleShowMore = _props.handleShowMore,
            handleShowPaySheet = _props.handleShowPaySheet,
            showPrintAccountStatus = _props.showPrintAccountStatus,
            showPrintedByMail = _props.showPrintedByMail,
            showAbmNomina = _props.showAbmNomina,
            showSaldoCuentas = _props.showSaldoCuentas,
            showNominaSeg = _props.showNominaSeg,
            showRescateParcial = _props.showRescateParcial,
            showAccountState = _props.showAccountState,
            showCopyPolicy = _props.showCopyPolicy,
            showAddPayroll = _props.showAddPayroll,
            showConsBeneficiary = _props.showConsBeneficiary,
            showPayments = _props.showPayments,
            showSiniestros = _props.showSiniestros,
            showRescates = _props.showRescates,
            showPaySheet = _props.showPaySheet,
            showEndoso = _props.showEndoso,
            showAppointBeneficiary = _props.showAppointBeneficiary,
            showDdbenCrudMenu = _props.showDdbenCrudMenu,
            showAdhesion = _props.showAdhesion,
            showAdditionRequest = _props.showAdditionRequest,
            showAdditionRequestColectivo = _props.showAdditionRequestColectivo,
            showListaEmpleadosRetiro = _props.showListaEmpleadosRetiro,
            showConsultaNomina = _props.showConsultaNomina,
            showConsultaBeneficiary = _props.showConsultaBeneficiary,
            showAdditionManager = _props.showAdditionManager,
            showAdditionManagerColectivo = _props.showAdditionManagerColectivo,
            showColectiveLifeAdhesion = _props.showColectiveLifeAdhesion,
            showDropRequest = _props.showDropRequest;


        var withoutProducts = Object.keys(product).length === 0;
        var detalle = product.detalle ? product.detalle : product.cup;

        var accountStateAvailable = false;
        if (detalle) {
          if (detalle.TIPOPRODU) {
            if (detalle.TIPOPRODU === 'C' || detalle.TIPOPRODU === 'R') {
              accountStateAvailable = true;
            }
          } else if (detalle.RAMOPCOD) {
            if (detalle.RAMOPCOD.substr(0, 1) === 'R') {
              accountStateAvailable = true;
            }
          }
        }

        if (withoutProducts) {
          return React.createElement(
            "div",
            { className: "container main-container manager-container", style: { minHeight: "0" } },
            React.createElement(MessageComponent, { title: "Lo sentimos!", body: "No se encontraron productos para mostrar.", buttonClass: "d-none" })
          );
        } else {
          return React.createElement(
            "div",
            { className: "container main-container manager-container" },
            React.createElement(
              "div",
              { className: "col-md-12 remove-left-padding" },
              React.createElement(
                "h3",
                { className: "text-left text-dark product-name" },
                detalle && detalle.RAMOPDES
              ),
              React.createElement(
                "p",
                null,
                detalle && detalle.NROPOLIZA
              ),
              product.id,
              React.createElement("hr", { className: "red" })
            ),
            React.createElement(MainBar, {
              showMoreInformation: handleShowMore,
              showPaySheet: handleShowPaySheet,
              handleShowPayments: this.props.handleShowPayments,
              handleShowSiniestros: this.props.handleShowSiniestros,
              handleShowRescates: this.props.handleShowRescates,
              handleShowAccountState: this.props.handleShowAccountState,
              handleShowCopyPolicy: this.props.handleShowCopyPolicy,
              handleShowPrintedByMail: this.props.handleShowPrintedByMail,
              handleShowAbmNomina: this.props.handleShowAbmNomina,
              handleShowSaldoCuentas: this.props.handleShowSaldoCuentas,
              handleShowNominaSeg: this.props.handleShowNominaSeg,
              handleShowRescateParcial: this.props.handleShowRescateParcial,
              handleShowEndonso: this.props.handleShowEndoso,
              showPayments: this.props.showPayments,
              showSiniestros: this.props.showSiniestros,
              "switch": this.props.switch,
              handleShowAddPayroll: this.props.handleShowAddPayroll,
              handleShowConsBeneficiary: this.props.handleShowConsBeneficiary,
              handleShowColectiveLifeAdhesion: this.props.handleShowColectiveLifeAdhesion,
              handleShowConsultaNomina: this.props.handleShowConsultaNomina,
              handleShowConsultaBeneficiary: this.props.handleShowConsultaBeneficiary,
              handleShowAdhesion: this.props.handleShowAdhesion,
              isAppointBeneficiary: this.props.product ? this.props.product.appointBeneficiary : false,
              itsAdditionRequest: this.props.product ? this.props.product.additionRequest : false,
              itsAdditionRequestColectivo: this.props.product ? this.props.product.additionRequestColectivo : false,
              showAddPayroll: this.props.showAddPayroll,
              showConsBeneficiary: this.props.showConsBeneficiary,
              showAdhesion: this.props.showAdhesion,
              showListaEmpleadosRetiro: this.props.showListaEmpleadosRetiro,
              showConsultaBeneficiary: this.props.showConsultaBeneficiary,
              showConsultaNomina: this.props.showConsultaNomina,
              handleShowListaEmpleadosRetiro: this.props.handleShowListaEmpleadosRetiro,
              showAdditionManager: this._handleButtonAdditionManager,
              showAdditionManagerColectivo: this._handleButtonAdditionManagerColectivo,
              handleShowDdbenCrudMenu: this._handleButtonModifyBeneficiary,
              showDdbenCrudMenu: this.props.showDdbenCrudMenu,
              handleShowDropRequest: this.props.handleShowDropRequest
            }),
            !showPaySheet && !showMore && !showEndoso && React.createElement("div", { className: "print-container" }),
            showAddPayroll && React.createElement(AddPayroll, { product: this.props.product.detalle, handleShowMain: this.props.handleShowMain, user: this.props.user }),
            showConsBeneficiary && React.createElement(QueryBeneficiary, { product: this.props.product.detalle, handleShowMain: this.props.handleShowMain, user: this.props.user }),
            showAppointBeneficiary && React.createElement(AppointBeneficiary, { product: this.props.product.detalle, handleShowDdbenCrudMenu: this._handleButtonModifyBeneficiary, user: this.props.user }),
            showDdbenCrudMenu && React.createElement(DdbenCrudMenu, { product: this.props.product.detalle, handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary, user: this.props.user }),
            showAdhesion && React.createElement(FileUploading, { product: this.props.product, handleShowMain: this.props.handleShowMain, user: this.props.user }),
            showListaEmpleadosRetiro && React.createElement(EmployeesList, { handleShowMain: this.props.handleShowMain, tipoProducto: this.props.product.cup.RAMOPTVC }),
            showConsultaNomina && React.createElement(PayrollQuery, { handleShowMain: this.props.handleShowMain, product: this.props.product.cup, user: this.props.user }),
            showConsultaBeneficiary && React.createElement(QueryBeneficiary, { handleShowMain: this.props.handleShowMain }),
            showAdditionRequest && React.createElement(AdditionRequest, { product: this.props.product.detalle, handleShowAdditionManager: this._handleButtonAdditionManager }),
            showAdditionManager && React.createElement(AdditionManager, { product: this.props.product.detalle, handleShowAdditionRequest: this.props.handleShowAdditionRequest,
              user: this.props.user, handleSetRequestNumber: this._handleSetRequestNumber,
              recoverPayrollEmployees: this._handleSetRecoverPayrollEmployee() }),
            showAdditionRequestColectivo ? React.createElement(AdditionRequestColectivo, { product: this._handleSetRecoverPayrollEmployee(), handleShowAdditionManagerColectivo: this._handleButtonAdditionManagerColectivo, handleSetRequestNumber: this._handleSetRequestNumber }) : "",
            showAdditionManagerColectivo && React.createElement(AdditionManagerColectivo, { product: this._handleSetRecoverPayrollEmployee(), handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              user: this.props.user, handleSetRequestNumber: this._handleSetRequestNumber, recoverPayrollEmployees: this._handleSetRecoverPayrollEmployee() }),
            showColectiveLifeAdhesion && React.createElement(FileUpload, { product: this.props.product.cup, handleShowMain: this.props.handleShowMain, user: this.props.user }),
            showNomina && React.createElement(Nomina, { nroEndoso: this.state.nroEndoso,
              nroPoliza: this.props.product.numeroDePoliza,
              goTocopyPolicy: this.props.handleShowCopyPolicy,
              setToFalse: this.props.setToFalse,
              goToNomina: this.props.handleShowNomina,
              showAltasTempranas: showAltasTempranas
            }),
            showMore && React.createElement(MoreInformation, { product: this.props.product }),
            showPaySheet && React.createElement(PaySheet, null),
            product === null ? React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "2rem", height: "2rem" }),
              React.createElement("br", null)
            ) : React.createElement(
              React.Fragment,
              null,
              showPrintAccountStatus && React.createElement(PrintAccountStatus, {
                search: this._handleSearch
              }),
              showAccountState && React.createElement(AccountState, { product: this.props.product.detalle }),
              showDropRequest && React.createElement(DropRequest, { handleShowDropRequest: (this.props.handleShowDropRequest, this.props.product) }),
              showPrintedByMail && React.createElement(PrintedByMail, null),
              showNominaSeg && React.createElement(NominaSeg, { handleShowMain: this.props.handleShowMain }),
              showSaldoCuentas && React.createElement(SaldoCuentas, { handleShowMain: this.props.handleShowMain }),
              showAbmNomina && React.createElement(AbmNomina, { handleShowAbmNomina: this.props.handleShowAbmNomina, handleShowMain: this.props.handleShowMain, product: this.props.product, user: this.props.user }),
              showRescateParcial && React.createElement(RescateMain, { handleShowRescateParcial: this.props.handleShowRescateParcial }),
              showEndoso == true && React.createElement(EndosoManager, { handleShowEndoso: this.props.handleShowEndoso, handleShowMain: this.props.handleShowMain }),
              showCopyPolicy && React.createElement(CopyPolicy, {
                searching: insurancePoliciesSearching,
                search: this._handleSearch,
                goToNomina: this.props.handleShowNomina,
                endoso: this._handleEndoso
              }),
              showPayments && React.createElement(Payments, { product: this.props.product.detalle, search: this._handleSearch }),
              showSiniestros && React.createElement(Siniestros, null),
              showRescates && React.createElement(Rescates, null),
              !showPrintAccountStatus && !showCopyPolicy && !showPayments && !showSiniestros && !showRescates && !showNomina && !showMore && !showAccountState && !showDropRequest && !showPrintedByMail && !showAbmNomina && !showSaldoCuentas && !showNominaSeg && !showRescateParcial && !showPaySheet && !showAddPayroll && !showConsBeneficiary && !showEndoso && !showAppointBeneficiary && !showDdbenCrudMenu && !showAdhesion && !showAdditionRequest && !showAdditionRequestColectivo && !showAdditionManager && !showAdditionManagerColectivo && !showListaEmpleadosRetiro && !showConsultaNomina && !showConsultaBeneficiary && !showColectiveLifeAdhesion && !showAltasTempranas && React.createElement(
                React.Fragment,
                null,
                React.createElement(Home, null)
              )
            ),
            React.createElement("br", null)
          );
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.props.showEndoso == 'reload') {
          this.props.handleShowEndoso();
        }
      }
    }]);

    return Manager;
  }(React.Component);

  return Manager;
});