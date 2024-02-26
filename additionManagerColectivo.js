var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../redux/store", "./processOKVC", "../../lib/utils", "../../controller/endososController", "./additionFormColectivo", "../../controller/vidaColectivoController", "../../controller/retiroNominaController", "../../common/loader", "./sepelio/additionFormBurial", "./personalAccidents/additionFormAp", "./additionPdfColectivo"], function (React, Store, ProcessOk, Utils, EndososController, AdditionFormColectivo, VidaColectivoController, RetiroNominaController, Loader, AdditionFormBurial, AdditionFormAp) {
  var AdditionManagerColectivo = function (_React$Component) {
    _inherits(AdditionManagerColectivo, _React$Component);

    function AdditionManagerColectivo(props) {
      _classCallCheck(this, AdditionManagerColectivo);

      var _this = _possibleConstructorReturn(this, (AdditionManagerColectivo.__proto__ || Object.getPrototypeOf(AdditionManagerColectivo)).call(this, props));

      _this._handleSetAddresses = function (requestData) {
        var addressList = requestData.DOMICILIOS.DOMICILIO;
        addressList.forEach(function (item) {
          //direccion asegurado
          if (item.NRO_DOM == 1 && item.CLA_PER == "S") {
            _this.formInfo.applicantFloor = item.DIR_PIS;
            _this.formInfo.applicantDepartment = item.DIR_DTO;
            _this.formInfo.applicantLocality = item.DIR_LOC;
            _this.formInfo.applicantAreaTel = item.TEL_ARE;
            _this.formInfo.applicantTelephone = item.TEL_NUM;
            _this.formInfo.applicantProvince = item.DIR_PRV;
            _this.formInfo.applicantStreet = item.DIR_CAL;
            _this.formInfo.applicantCP = item.DIR_CPO;
            _this.formInfo.applicantNumber = item.DIR_NUM;
          }
        });
      };

      _this._handleSetRestInformation = function (requestData) {
        var data = requestData.REGS.REG[0];
        _this.formInfo.formConyuge = data.DA1_DOM;
        // this.formInfo.applicantCBU = data.DA1_LOC; ya no hay opcion a cbu
        _this.formInfo.applicantOccupation = data.EMP_ACT;
        _this.formInfo.applicantSalary = parseInt(data.EMP_IME);
        _this.formInfo.salary = data.EMP_ROL;
        _this.formInfo.applicantPlus = data.EMP_NOM;
        _this.formInfo.applicantTitular = data.DA2_LOC.slice(0, 1);
        _this.formInfo.applicantHijos = data.DA2_LOC.slice(2, 3);
        _this.formInfo.applicantParent = data.DA2_LOC.slice(4, 5);
        _this.formInfo.applicantConyuge = data.DA2_LOC.slice(6, 7);
        _this.formInfo.applicantTotal = data.DA2_LOC.slice(8, 9);
      };

      _this._handleSetCuentas = function (requestData) {
        var cuenta = requestData.CUENTAS.CUENTA;
        cuenta.forEach(function (item) {
          if (item.CLA_PER == "S" && item.NRO_PER == 1) {
            _this.formInfo.applicantCardNumber = item.NUM_CTA;
            _this.formInfo.applicantBrand = item.COD_TAR;
            _this.formInfo.applicantPayment = item.TIP_COB;
            if (item.VEN_TAR == 0) {
              _this.formInfo.applicantDateYear = "";
              _this.formInfo.applicantDateMonth = "";
            } else if (item.VEN_TAR.toString().length == 4) {
              _this.formInfo.applicantDateYear = item.VEN_TAR.toString();
              _this.formInfo.applicantDateMonth = "";
            } else if (item.VEN_TAR.toString().length < 4) {
              if (item.VEN_TAR.toString().length == 1) {
                _this.formInfo.applicantDateMonth = "0" + item.VEN_TAR.toString();
              } else {
                _this.formInfo.applicantDateMonth = item.VEN_TAR.toString();
              }
              _this.formInfo.applicantDateYear = "";
            } else {
              _this.formInfo.applicantDateYear = ("" + item.VEN_TAR).slice(0, 4);
              _this.formInfo.applicantDateMonth = ("" + item.VEN_TAR).slice(4, 6);
            }
            _this.formInfo.applicantOwner = item.TIP_SEL;
          }
        });
      };

      _this._handleSetPeople = function (requestData) {
        var peopleList = requestData.PERSONAS.PERSONA;
        peopleList.forEach(function (item) {
          //datos asegurado
          if (item.CLA_PER == "S" && item.NRO_PER == 1) {
            _this.formInfo.applicantName = item.NOM_PER;
            _this.formInfo.applicantEmail = item.DIR_EMA;
            _this.formInfo.applicantTypeCCC = item.CDI_CUI;
            _this.formInfo.applicantCuilNumber = item.NRO_CUI;
            _this.formInfo.applicantSurname = item.APE_PER;
            _this.formInfo.applicantGender = item.SEX_PER;
            _this.formInfo.applicantCivilStatus = item.EST_CIV;
            _this.formInfo.applicantNationality = item.PAI_NAC;
            _this.formInfo.applicantIVA = item.VAL_002;
            _this.formInfo.applicantCityBorn = item.VAL_001;
            _this.formInfo.applicantDateBirth = Utils.formatFechaString(item.FEC_NAC);
          }
          //datos del conyuge
          else if (item.CLA_PER == "C" && item.NRO_PER == 1) {
              _this.formInfo.applicantCUILConyuge = item.NRO_CUI;
              _this.formInfo.applicantNameConyuge = item.NOM_PER;
              _this.formInfo.applicantSurnameConyuge = item.APE_PER;
              _this.formInfo.applicantDateBirthConyuge = Utils.formatFechaString(item.FEC_NAC);
              _this.formInfo.applicantEmailConyuge = item.DIR_EMA;
              _this.formInfo.applicantGenderConyuge = item.SEX_PER;
              _this.formInfo.applicantNationalityConyuge = item.PAI_NAC;
            }
          //datos familiares
          for (var i = 0; i < 11; i++) {
            if (item.CLA_PER == "F" && item.NRO_PER == i + 1) {
              var beneficiary = { NOMINAS: {} };
              beneficiary.NOMINAS.BENNOMBRE = item.NOM_PER;
              beneficiary.NOMINAS.APEBENE = item.APE_PER;
              beneficiary.NOMINAS.TIPDOCBENE = item.TIP_DOC;
              beneficiary.NOMINAS.NUMDOCBENE = item.NRO_DOC;
              beneficiary.NOMINAS.RELBECOD = item.VAL_001;
              beneficiary.NOMINAS.FNACIMIE = item.FEC_NAC;
              _this.auxBeneficiaryList.splice(i, 0, beneficiary);
            }
          }
          _this.formInfo.beneficiaryList = _this.auxBeneficiaryList;
          //datos beneficiarios
          for (var _i = 0; _i < 10; _i++) {
            if (item.CLA_PER == "B" && item.NRO_PER == _i + 1) {
              var _beneficiary = { NOMINAS: {} };
              _beneficiary.NOMINAS.BENNOMBRE = item.NOM_PER;
              _beneficiary.NOMINAS.APEBENE = item.APE_PER;
              _beneficiary.NOMINAS.TIPDOCBENE = item.TIP_DOC;
              _beneficiary.NOMINAS.NUMDOCBENE = item.NRO_DOC;
              _beneficiary.NOMINAS.RELBECOD = item.COD_PAR;
              _beneficiary.NOMINAS.FNACIMIE = item.FEC_NAC;
              _beneficiary.NOMINAS.BENEMAIL = item.DIR_EMA;
              _beneficiary.NOMINAS.BENEFORD = item.VAL_003;
              _beneficiary.NOMINAS.BENEPORC = item.VAL_002;
              _beneficiary.NOMINAS.BENNUMTELEF = item.VAL_001;
              _this.auxBeneficiaryList.splice(_i, 0, _beneficiary);
            }
          }
          _this.formInfo.beneficiaryList = _this.auxBeneficiaryList;
        });
      };

      _this._handleSwitch = function (form) {
        _this.setState({ currentForm: form });
      };

      _this.handleRecoveryData = function (data) {
        //trae la informacion del reporte
        _this.formInfo.applicantName = data.ASE_NOM;
        _this.formInfo.applicantSurname = data.ASE_APE;
        _this.formInfo.applicantEmail = data.DIR_EMA;
        _this.formInfo.applicantTypeCCC = data.TIP_DOC;
        _this.formInfo.applicantCuilNumber = data.NRO_DOC;
        _this.formInfo.applicantDateBirth = Utils.formatFechaString(data.FEC_NAC);
        _this.formInfo.applicantSalary = parseInt(data.ASE_SUE);
      };

      _this.state = {
        currentForm: "loader",
        docTypeList: [],
        brand: [],
        provincesList: [],
        readOnly: false,
        depoActivitiesList: [],
        countriesList: [],
        listPoliza: null,
        grupoPoliza: null,
        listSubGrupos: null,
        fileDDJJ2: { name: "" },
        fileDDJJ1: { name: "" },
        isConyuge: true, //esta es la variable que va a guardar el valor del back de bonus
        sexoList: [{ id: "M", name: "Masculino" }, { id: "F", name: "Femenino" }],
        civilStatusList: [{ id: "C", name: "CASADO/A" }, { id: "D", name: "DIVORCIADO/A" }, { id: "E", name: "SEPARADO/A" }, { id: "S", name: "SOLTERO/A" }, { id: "U", name: "UNION LIBRE" }, { id: "V", name: "VIUDO/A" }],
        paymentType: [{ id: "TC", name: "TARJETA DE CREDITO" }],
        listTipoYear: [{ id: "1", name: "" }, { id: "2", name: "" }, { id: "3", name: "" }, { id: "4", name: "" }, { id: "5", name: "" }, { id: "6", name: "" }, { id: "7", name: "" }, { id: "8", name: "" }, { id: "9", name: "" }, { id: "10", name: "" }, { id: "11", name: "" }, { id: "12", name: "" }, { id: "13", name: "" }, { id: "14", name: "" }, { id: "15", name: "" }, { id: "16", name: "" }, { id: "17", name: "" }, { id: "18", name: "" }, { id: "19", name: "" }, { id: "20", name: "" }, { id: "21", name: "" }],
        orderList: [{ id: "1", name: "1" }, { id: "2", name: "2" }, { id: "3", name: "3" }, { id: "4", name: "4" }, { id: "5", name: "5" }],
        cuitList: [{ id: "4", name: "CUIT" }, { id: "5", name: "CUIL" }, { id: "40", name: "CDI" }]
      };
      _this.formInfo = {};
      _this.auxBeneficiaryList = [];
      _this.data = {};
      return _this;
    }

    _createClass(AdditionManagerColectivo, [{
      key: "render",
      value: function render() {
        var currentForm = this.state.currentForm;

        switch (currentForm) {
          case "newForm":
            return this.state.listPoliza ? React.createElement(AdditionFormColectivo, {
              data: this.data,
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              handleSwitch: this._handleSwitch,
              cuitList: this.state.cuitList,
              orderList: this.state.orderList,
              fileDDJJ1: this.state.fileDDJJ1,
              fileDDJJ2: this.state.fileDDJJ2,
              paymentType: this.state.paymentType,
              brand: this.state.brand,
              listTipoYear: this.state.listTipoYear,
              isConyuge: this.state.isConyuge,
              docTypeList: this.state.docTypeList,
              provincesList: this.state.provincesList,
              depoActivitiesList: this.state.depoActivitiesList,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              readOnly: this.state.readOnly,
              listPoliza: this.state.listPoliza,
              grupoPoliza: this.state.grupoPoliza,
              listSubGrupos: this.state.listSubGrupos
            }) : React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
          case "modifyForm":
            return this.state.listPoliza ? React.createElement(AdditionFormColectivo, {
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              handleSwitch: this._handleSwitch,
              cuitList: this.state.cuitList,
              orderList: this.state.orderList,
              paymentType: this.state.paymentType,
              brand: this.state.brand,
              listTipoYear: this.state.listTipoYear,
              fileDDJJ1: this.state.fileDDJJ1,
              fileDDJJ2: this.state.fileDDJJ2,
              isConyuge: this.state.isConyuge,
              docTypeList: this.state.docTypeList,
              provincesList: this.state.provincesList,
              depoActivitiesList: this.state.depoActivitiesList,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              readOnly: this.state.readOnly,
              listPoliza: this.state.listPoliza,
              grupoPoliza: this.state.grupoPoliza,
              listSubGrupos: this.state.listSubGrupos
            }) : React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
          case "newBurial":
            return this.state.listPoliza ? React.createElement(AdditionFormBurial, {
              data: this.data,
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              provincesList: this.state.provincesList,
              depoActivitiesList: this.state.depoActivitiesList,
              sexoList: this.state.sexoList,
              civilStatusList: this.state.civilStatusList,
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              handleSwitch: this._handleSwitch,
              cuitList: this.state.cuitList,
              paymentType: this.state.paymentType,
              brand: this.state.brand,
              listTipoYear: this.state.listTipoYear,
              docTypeList: this.state.docTypeList,
              countriesList: this.state.countriesList,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              readOnly: this.state.readOnly,
              listPoliza: this.state.listPoliza,
              grupoPoliza: this.state.grupoPoliza,
              listSubGrupos: this.state.listSubGrupos
            }) : React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
          case "modifyBurial":
            return this.state.listPoliza ? React.createElement(AdditionFormBurial, {
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              provincesList: this.state.provincesList,
              depoActivitiesList: this.state.depoActivitiesList,
              sexoList: this.state.sexoList,
              civilStatusList: this.state.civilStatusList,
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              handleSwitch: this._handleSwitch,
              cuitList: this.state.cuitList,
              paymentType: this.state.paymentType,
              brand: this.state.brand,
              listTipoYear: this.state.listTipoYear,
              docTypeList: this.state.docTypeList,
              countriesList: this.state.countriesList,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              readOnly: this.state.readOnly,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              listPoliza: this.state.listPoliza,
              grupoPoliza: this.state.grupoPoliza,
              listSubGrupos: this.state.listSubGrupos
            }) : React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
          case "newPersonalAccidents":
            return this.state.listPoliza ? React.createElement(AdditionFormAp, {
              data: this.data,
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              handleSwitch: this._handleSwitch,
              docTypeList: this.state.docTypeList,
              sexoList: this.state.sexoList,
              civilStatusList: this.state.civilStatusList,
              isConyuge: this.state.isConyuge,
              paymentType: this.state.paymentType,
              brand: this.state.brand,
              listTipoYear: this.state.listTipoYear,
              cuitList: this.state.cuitList,
              orderList: this.state.orderList,
              countriesList: this.state.countriesList,
              provincesList: this.state.provincesList,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              readOnly: this.state.readOnly,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              listPoliza: this.state.listPoliza,
              grupoPoliza: this.state.grupoPoliza,
              listSubGrupos: this.state.listSubGrupos
            }) : React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
          case "modifyPersonalAccidents":
            return this.state.listPoliza ? React.createElement(AdditionFormAp, {
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              handleSwitch: this._handleSwitch,
              docTypeList: this.state.docTypeList,
              sexoList: this.state.sexoList,
              isConyuge: this.state.isConyuge,
              paymentType: this.state.paymentType,
              brand: this.state.brand,
              listTipoYear: this.state.listTipoYear,
              civilStatusList: this.state.civilStatusList,
              cuitList: this.state.cuitList,
              orderList: this.state.orderList,
              countriesList: this.state.countriesList,
              provincesList: this.state.provincesList,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              readOnly: this.state.readOnly,
              listPoliza: this.state.listPoliza,
              grupoPoliza: this.state.grupoPoliza,
              listSubGrupos: this.state.listSubGrupos
            }) : React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
          case "sendOk":
            return React.createElement(ProcessOk, {
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              product: this.props.recoverPayrollEmployees,
              handleSetRequestNumber: this.props.handleSetRequestNumber
            });
          case "saveOk":
            return React.createElement(ProcessOk, {
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              itsSave: true,
              product: this.props.recoverPayrollEmployees
            });
          case "loader":
            return React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        /**funcion para traer año de vto de tarjeta */
        var currentTime = new Date();
        this.state.listTipoYear.map(function (element, i) {
          element.name = currentTime.getFullYear() + i;
        });

        var vidaController = new VidaColectivoController();
        var controller = new RetiroNominaController();

        controller.getTipoDocumento(function (docData) {
          _this2.setState({ docTypeList: docData });
        });
        var controllerEndosos = new EndososController();
        controllerEndosos.getTarjetas(function (data) {
          _this2.setState({ brand: data });
        });
        controller.getPaises(function (countriesList) {
          _this2.setState({ countriesList: countriesList });
        });
        controller.getProvincias(function (provinceData) {
          _this2.setState({ provincesList: provinceData });
        });

        vidaController.getDatosPoliza(this.props.recoverPayrollEmployees.POL_SEC, this.props.recoverPayrollEmployees.POL_ANN, this.props.recoverPayrollEmployees.COD_PRO, function (callBack) {
          if (callBack !== "ERROR") {
            var codGrupo = _this2.props.product.COD_GRU;
            var dataPoliza = callBack.Message.DATOS;
            var gruposPoliza = dataPoliza.GRUPOS.GRUPO;

            var grupo = gruposPoliza.length > 0 ? gruposPoliza.filter(function (grupo) {
              return grupo.GRUPOCOD === codGrupo;
            }) : [];
            var subGrupos = gruposPoliza.length > 0 ? gruposPoliza.filter(function (grupo) {
              return grupo.GRUPOPRI === codGrupo;
            }) : [];

            _this2.setState({
              listPoliza: dataPoliza,
              grupoPoliza: grupo[0],
              listSubGrupos: subGrupos
            });

            if (subGrupos.length === 1) {
              _this2.setState({ isConyuge: true });
            } else {
              _this2.setState({ isConyuge: false });
            }
          }
        });
        vidaController.getPdf(this.props.product, "PDF_ADJ_DJ1", function (data) {
          if (data.length > 0) {
            _this2.setState({ fileDDJJ1: { name: "Declaracion Jurada I" } });
          }
        });
        vidaController.getPdf(this.props.product, "PDF_ADJ_DJ2", function (data) {
          if (data.length > 0) {
            _this2.setState({ fileDDJJ2: { name: "Declaracion Jurada II" } });
          }
        });
        if (this.props.recoverPayrollEmployees.NRO_SOL == "0") {
          this.handleRecoveryData(this.props.recoverPayrollEmployees); //para traer los datos del reporte del tomador
          if (this.props.product.TIP_PRO == "SE") {
            this.setState({ currentForm: "newBurial" });
          } else if (this.props.product.TIP_PRO == "AP") {
            this.setState({ currentForm: "newPersonalAccidents" });
          } else {
            this.setState({ currentForm: "newForm" });
          }
        } else if (this.props.recoverPayrollEmployees.COD_EST == "E") {
          this.setState({ currentForm: "sendOk" });
        } else {
          //esta parte es para traer los datos del usuario
          controller.getRequest(this.props.recoverPayrollEmployees.COD_PRO, this.props.recoverPayrollEmployees.NRO_SOL, function (requestData) {
            _this2._handleSetAddresses(requestData);
            _this2._handleSetPeople(requestData);
            _this2._handleSetCuentas(requestData);
            _this2._handleSetRestInformation(requestData);
            if (_this2.props.product.TIP_PRO == "SE") {
              _this2.setState({ currentForm: "modifyBurial" });
            } else if (_this2.props.product.TIP_PRO == "AP") {
              _this2.setState({ currentForm: "modifyPersonalAccidents" });
            } else {
              _this2.setState({ currentForm: "modifyForm" });
            }
          });
        }
      }
    }]);

    return AdditionManagerColectivo;
  }(React.Component);

  return AdditionManagerColectivo;
});