var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../lib/utils", "./additionForm", "./processOk", "../../controller/retiroNominaController", "../../common/loader"], function (React, Utils, AdditionForm, ProcessOk, RetiroNominaController, Loader) {
  var AdditionManager = function (_React$Component) {
    _inherits(AdditionManager, _React$Component);

    function AdditionManager(props) {
      _classCallCheck(this, AdditionManager);

      var _this = _possibleConstructorReturn(this, (AdditionManager.__proto__ || Object.getPrototypeOf(AdditionManager)).call(this, props));

      _this._handleSetAddresses = function (requestData) {
        var addressList = requestData.DOMICILIOS.DOMICILIO;
        addressList.forEach(function (item) {
          //direccion contratante
          if (item.NRO_DOM == 1 && item.CLA_PER == "T") {
            _this.formInfo.contractorFloor = item.DIR_PIS;
            _this.formInfo.contractorDepto = item.DIR_DTO;
            _this.formInfo.contractorLocality = item.DIR_LOC;
            _this.formInfo.contractorPhone = item.TEL_NUM;
            _this.formInfo.contractorProvince = item.DIR_PRV;
            _this.formInfo.contractorAreaCode = item.TEL_ARE;
            _this.formInfo.contractorStreet = item.DIR_CAL;
            _this.formInfo.contractorZipCode = item.DIR_CPO;
            _this.formInfo.contractorPrefixCode = item.TEL_PAI;
            _this.formInfo.contractorPrefix = item.TEL_PRE;
            _this.formInfo.contractorStreetNumber = item.DIR_NUM;
          }
          //direccion representante legal
          if (item.NRO_DOM == 1 && item.CLA_PER == "R") {
            _this.formInfo.legalRepreFloor = item.DIR_PIS;
            _this.formInfo.legalRepreDepto = item.DIR_DTO;
            _this.formInfo.legalRepreLocality = item.DIR_LOC;
            _this.formInfo.legalReprePhone = item.TEL_NUM;
            _this.formInfo.legalRepreProvince = item.DIR_PRV;
            _this.formInfo.legalRepreAreaCode = item.TEL_ARE;
            _this.formInfo.legalRepreStreet = item.DIR_CAL;
            _this.formInfo.legalRepreZipCode = item.DIR_CPO;
            _this.formInfo.legalReprePrefixCode = item.TEL_PAI;
            _this.formInfo.legalReprePrefix = item.TEL_PRE;
            _this.formInfo.legalRepreStreetNumber = item.DIR_NUM;
          }
          //domicilio real
          if (item.NRO_DOM == 1 && item.CLA_PER == "S") {
            _this.formInfo.applicantFloor = item.DIR_PIS;
            _this.formInfo.applicantDepto = item.DIR_DTO;
            _this.formInfo.applicantLocality = item.DIR_LOC;
            _this.formInfo.applicantTel = item.TEL_NUM;
            _this.formInfo.applicantProvince = item.DIR_PRV;
            _this.formInfo.applicantAreaCode = item.TEL_ARE;
            _this.formInfo.applicantStreet = item.DIR_CAL;
            _this.formInfo.applicantZipCode = item.DIR_CPO;
            _this.formInfo.applicantTelPrefixCode = item.TEL_PAI;
            _this.formInfo.applicantTelPrefix = item.TEL_PRE;
            _this.formInfo.applicantStreetNumber = item.DIR_NUM;
          }
          //domicilio correspondencia
          if (item.NRO_DOM == 2 && item.CLA_PER == "S") {
            _this.formInfo.mailFloor = item.DIR_PIS;
            _this.formInfo.mailDepto = item.DIR_DTO;
            _this.formInfo.mailLocality = item.DIR_LOC;
            _this.formInfo.mailProvince = item.DIR_PRV;
            _this.formInfo.mailStreet = item.DIR_CAL;
            _this.formInfo.mailZipCode = item.DIR_CPO;
            _this.formInfo.mailStreetNumber = item.DIR_NUM;
          }
          //domicilio fiscal
          if (item.NRO_DOM == 3 && item.CLA_PER == "S") {
            _this.formInfo.fiscalFloor = item.DIR_PIS;
            _this.formInfo.fiscalDepto = item.DIR_DTO;
            _this.formInfo.fiscalLocality = item.DIR_LOC;
            _this.formInfo.fiscalProvince = item.DIR_PRV;
            _this.formInfo.fiscalStreet = item.DIR_CAL;
            _this.formInfo.fiscalZipCode = item.DIR_CPO;
            _this.formInfo.fiscalStreetNumber = item.DIR_NUM;
          }
          //primer domicilio previo
          if (item.NRO_DOM == 4 && item.CLA_PER == "S") {
            _this.formInfo.previusFloor = item.DIR_PIS;
            _this.formInfo.previusDepto = item.DIR_DTO;
            _this.formInfo.previusLocality = item.DIR_LOC;
            _this.formInfo.previusProvince = item.DIR_PRV;
            _this.formInfo.previusStreet = item.DIR_CAL;
            _this.formInfo.previusZipCode = item.DIR_CPO;
            _this.formInfo.previusStreetNumber = item.DIR_NUM;
          }
          //segundo domicilio previo
          if (item.NRO_DOM == 5 && item.CLA_PER == "S") {
            _this.formInfo.previusFloor2 = item.DIR_PIS;
            _this.formInfo.previusDepto2 = item.DIR_DTO;
            _this.formInfo.previusLocality2 = item.DIR_LOC;
            _this.formInfo.previusProvince2 = item.DIR_PRV;
            _this.formInfo.previusStreet2 = item.DIR_CAL;
            _this.formInfo.previusZipCode2 = item.DIR_CPO;
            _this.formInfo.previusStreetNumber2 = item.DIR_NUM;
          }
          //tercer domicilio previo
          if (item.NRO_DOM == 6 && item.CLA_PER == "S") {
            _this.formInfo.previusFloor3 = item.DIR_PIS;
            _this.formInfo.previusDepto3 = item.DIR_DTO;
            _this.formInfo.previusLocality3 = item.DIR_LOC;
            _this.formInfo.previusProvince3 = item.DIR_PRV;
            _this.formInfo.previusStreet3 = item.DIR_CAL;
            _this.formInfo.previusZipCode3 = item.DIR_CPO;
            _this.formInfo.previusStreetNumber3 = item.DIR_NUM;
          }
          //direccion empresa informacion adicional
          if (item.NRO_DOM == 7 && item.CLA_PER == "S") {
            _this.formInfo.companyFloor = item.DIR_PIS;
            _this.formInfo.companyDepto = item.DIR_DTO;
            _this.formInfo.companyLocality = item.DIR_LOC;
            _this.formInfo.companyProvince = item.DIR_PRV;
            _this.formInfo.companyStreet = item.DIR_CAL;
            _this.formInfo.companyZipCode = item.DIR_CPO;
            _this.formInfo.companyStreetNumber = item.DIR_NUM;
          }
          //direccion beneficiarios
          for (var i = 0; i < 5; i++) {
            if (item.NRO_PER == i + 1 && item.CLA_PER == "B") {
              var beneficiary = { NOMINAS: {} };
              beneficiary.NOMINAS.BENPISO = item.DIR_PIS;
              beneficiary.NOMINAS.BENDEPTO = item.DIR_DTO;
              beneficiary.NOMINAS.BENLOCALIDAD = item.DIR_LOC;
              beneficiary.NOMINAS.BENNUMTELEF = item.TEL_NUM;
              beneficiary.NOMINAS.BENPROVINCIA = item.DIR_PRV;
              beneficiary.NOMINAS.BENCARTELEF = item.TEL_ARE;
              beneficiary.NOMINAS.BENCALLE = item.DIR_CAL;
              beneficiary.NOMINAS.BENCPOSTAL = item.DIR_CPO;
              beneficiary.NOMINAS.BENPREFCODETELEF = item.TEL_PAI;
              beneficiary.NOMINAS.BENPAISTELEF = item.TEL_PRE;
              beneficiary.NOMINAS.BENNUMERO = item.DIR_NUM;
              _this.auxBeneficiaryList.splice(i, 0, beneficiary);
            }
          }
          _this.formInfo.beneficiaryList = _this.auxBeneficiaryList;
        });
      };

      _this._handleSetPeople = function (requestData) {
        var peopleList = requestData.PERSONAS.PERSONA;
        peopleList.forEach(function (item) {
          //datos contratante
          if (item.CLA_PER == "T" && item.NRO_PER == 1) {
            _this.formInfo.contractorName = item.APE_PER;
            _this.formInfo.contractorActivity = item.COD_PRF;
            _this.formInfo.contractorMail = item.DIR_EMA;
            _this.formInfo.contractNumber = item.VAL_001;
            _this.formInfo.contractorTypeDoc = item.CDI_CUI;
            _this.formInfo.contractorDoc = item.NRO_CUI;
          }
          //datos representante legal
          if (item.CLA_PER == "R" && item.NRO_PER == 1) {
            _this.formInfo.legalRepreTypeDoc = item.TIP_DOC;
            _this.formInfo.legalRepreSurname = item.APE_PER;
            _this.formInfo.legalRepreBornPlace = item.VAL_002;
            _this.formInfo.legalRepreCivilStatus = item.EST_CIV;
            _this.formInfo.legalRepreSexo = item.SEX_PER;
            _this.formInfo.legalRepreMail = item.DIR_EMA;
            _this.formInfo.legalRepreAge = item.VAL_001;
            _this.formInfo.legalRepreName = item.NOM_PER;
            _this.formInfo.legalRepreBornDate = Utils.formatFechaString(item.FEC_NAC);
            _this.formInfo.legalRepreTypeCuit = item.CDI_CUI;
            _this.formInfo.legalRepreCuit = item.NRO_CUI;
            _this.formInfo.legalRepreDoc = item.NRO_DOC;
          }
          //datos solicitante
          if (item.CLA_PER == "S" && item.NRO_PER == 1) {
            _this.formInfo.applicantTypeDoc = item.TIP_DOC;
            _this.formInfo.applicantSurname = item.APE_PER;
            _this.formInfo.applicantBornCountry = item.PAI_ACT;
            _this.formInfo.applicantNacionality = item.PAI_NAC;
            _this.formInfo.applicantCivilStatus = item.EST_CIV;
            _this.formInfo.applicantSexo = item.SEX_PER;
            _this.formInfo.applicantFax = item.DIR_EMA;
            _this.formInfo.applicantBornPlace = item.VAL_001;
            _this.formInfo.applicantName = item.NOM_PER;
            _this.formInfo.applicantBornDate = Utils.formatFechaString(item.FEC_NAC);
            _this.formInfo.applicantTypeCuit = item.CDI_CUI;
            _this.formInfo.applicantCuit = item.NRO_CUI;
            _this.formInfo.applicantDoc = item.NRO_DOC;
            _this.formInfo.applicantExposed = item.CLI_PEP;
          }
          //datos beneficiarios
          for (var i = 0; i < 5; i++) {
            if (item.CLA_PER == "B" && item.NRO_PER == i + 1) {
              var nomina = {};
              var currentBeneficiary = _this.auxBeneficiaryList[i].NOMINAS;
              nomina.RELBECOD = item.COD_PAR;
              nomina.TIPDOCBENE = item.TIP_DOC;
              nomina.APEBENE = item.APE_PER;
              nomina.BENNACIONAL = item.PAI_NAC;
              nomina.BENEFORD = item.VAL_003;
              nomina.BENEPORC = item.VAL_002;
              nomina.BENSEXO = item.SEX_PER;
              nomina.BENEMAIL = item.DIR_EMA;
              nomina.RELBEDEP = item.VAL_001;
              nomina.BENNOMBRE = item.NOM_PER;
              nomina.FNACIMIE = item.FEC_NAC;
              nomina.NUMDOCBENE = item.NRO_DOC;
              nomina.BENESPEP = item.CLI_PEP;
              var objectConcat = Object.assign(currentBeneficiary, nomina);
              var beneficiary = { NOMINAS: objectConcat };
              _this.auxBeneficiaryList.splice(i, 1, beneficiary);
            }
          }
        });
      };

      _this._handleSetRestInformation = function (requestData) {
        var data = requestData.REGS.REG[0];
        _this.formInfo.contractDate = Utils.formatFechaString(data.FEC_VIG);
        _this.formInfo.contractorMailCompliance = data.CFM_MAI;
        _this.formInfo.legalRepreMailCompliance = data.TYC_MAR;
        _this.formInfo.applicantThirdNacionality = data.FAT_PN2;
        _this.formInfo.applicantSecondNacionality = data.FAT_PN1;
        _this.formInfo.applicantWorkTel = data.TLA_NUM;
        _this.formInfo.ApplicantFileNumber = data.VEN_LEG;
        _this.formInfo.applicantSpecialClient = data.CAT_SCC;
        _this.formInfo.applicantWorkAreaCode = data.TLA_ARE;
        _this.formInfo.applicantMultipleNacionality = data.FAT_NCM;
        _this.formInfo.applicantOccupation = data.EMP_ACT;
        _this.formInfo.applicantCompany = data.EMP_NOM;
        _this.formInfo.applicanCel = data.TCE_NUM;
        _this.formInfo.applicantRole = data.EMP_ROL;
        _this.formInfo.applicanCelPrefixCode = data.TCE_PAI;
        _this.formInfo.applicanCelPrefix = data.TCE_PRE;
        _this.formInfo.applicantStatus = data.EMP_STA;
        _this.formInfo.applicantWorkTelPrefixCode = data.TLA_PAI;
        _this.formInfo.applicantWorkTelPrefix = data.TLA_PRE;
        _this.formInfo.applicantCelAreaCode = data.TCE_ARE;
        _this.formInfo.applicantTitle = data.TIT_COD;
        _this.formInfo.applicantDiferentAddress = data.DA1_DOM;
        _this.formInfo.applicantSameAddress = data.DA1_LOC;
        _this.formInfo.applicantNif = data.DA1_PAI;
        _this.formInfo.countryTin = data.DA2_LOC;
        _this.formInfo.unavailableNif = data.DA2_PAI;
        _this.formInfo.obligatedSubject = data.DA3_LOC;
        _this.formInfo.applicantCompanyEntryDate = Utils.formatFechaString(data.FEC_ING);
        _this.formInfo.sinceDate = Utils.formatFechaString(data.DA1_FDE);
        _this.formInfo.sinceDate2 = Utils.formatFechaString(data.DA2_FDE);
        _this.formInfo.sinceDate3 = Utils.formatFechaString(data.DA3_FDE);
        _this.formInfo.previusName = data.NAN_TIE;
        _this.formInfo.previusFirstName = data.NAN_NO1;
        _this.formInfo.previusMiddleName = data.NAN_NO2;
        _this.formInfo.previusLastName = data.NAN_APE;
        _this.formInfo.previusAddress = data.FAT_RM3;
        _this.formInfo.otherName = data.APO_TIE;
        _this.formInfo.otherFirstName = data.APO_NO1;
        _this.formInfo.otherMiddleName = data.APO_NO2;
        _this.formInfo.holdMail = data.FAT_HMA;
        _this.formInfo.otherLastName = data.APO_APE;
        _this.formInfo.unavailableReason = data.VEN_NOM;
        _this.formInfo.registrationDate = Utils.formatFechaString(data.FEC_COT);
        _this.formInfo.applicantSalary = data.EMP_IME;
        _this.formInfo.tinNumber = data.FAT_TIN;
        _this.formInfo.uueeResidense = data.FAT_CRE;
        _this.formInfo.greenCard = data.FAT_GRE;
        _this.formInfo.companyActivity = data.EMP_NEG;
        _this.formInfo.beneficiaryType = data.TIP_IVA;
      };

      _this._handleSwitch = function (form) {
        _this.setState({ currentForm: form });
      };

      _this.state = {
        currentForm: "loader",
        dniImage: "",
        docTypeList: [],
        provincesList: [],
        prefixList: [],
        countriesList: [],
        activitiesList: [],
        afipActivitiesList: [],
        depoActivitiesList: [],
        statusList: [],
        ciutList: [{ id: "4", name: "CUIT" }, { id: "5", name: "CUIL" }, { id: "40", name: "CDI" }],
        sexoList: [{ id: "M", name: "Masculino" }, { id: "F", name: "Femenino" }],
        booleanList: [{ id: "N", name: "NO" }, { id: "S", name: "SI" }],
        civilStatusList: [{ id: "C", name: "CASADO/A" }, { id: "D", name: "DIVORCIADO/A" }, { id: "E", name: "SEPARADO/A" }, { id: "S", name: "SOLTERO/A" }, { id: "U", name: "UNION LIBRE" }, { id: "V", name: "VIUDO/A" }]
      };

      _this.formInfo = {};
      _this.auxBeneficiaryList = [];
      return _this;
    }

    _createClass(AdditionManager, [{
      key: "render",
      value: function render() {
        var currentForm = this.state.currentForm;

        switch (currentForm) {
          case "newForm":
            return React.createElement(AdditionForm, {
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequest: this.props.handleShowAdditionRequest,
              handleSwitch: this._handleSwitch,
              docTypeList: this.state.docTypeList,
              provincesList: this.state.provincesList,
              prefixList: this.state.prefixList,
              booleanList: this.state.booleanList,
              countriesList: this.state.countriesList,
              sexoList: this.state.sexoList,
              ciutList: this.state.ciutList,
              activitiesList: this.state.activitiesList,
              afipActivitiesList: this.state.afipActivitiesList,
              depoActivitiesList: this.state.depoActivitiesList,
              civilStatusList: this.state.civilStatusList,
              statusList: this.state.statusList,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              handleSetRequestNumber: this.props.handleSetRequestNumber
            });
          case "modifyForm":
            return React.createElement(AdditionForm, {
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequest: this.props.handleShowAdditionRequest,
              handleSwitch: this._handleSwitch,
              docTypeList: this.state.docTypeList,
              provincesList: this.state.provincesList,
              prefixList: this.state.prefixList,
              booleanList: this.state.booleanList,
              countriesList: this.state.countriesList,
              sexoList: this.state.sexoList,
              ciutList: this.state.ciutList,
              activitiesList: this.state.activitiesList,
              afipActivitiesList: this.state.afipActivitiesList,
              depoActivitiesList: this.state.depoActivitiesList,
              civilStatusList: this.state.civilStatusList,
              statusList: this.state.statusList,
              dniImage: this.state.dniImage,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              handleSetRequestNumber: this.props.handleSetRequestNumber
            });
          case "readForm":
            return React.createElement(AdditionForm, {
              formInfo: this.formInfo,
              product: this.props.product,
              user: this.props.user,
              handleShowAdditionRequest: this.props.handleShowAdditionRequest,
              handleSwitch: this._handleSwitch,
              docTypeList: this.state.docTypeList,
              provincesList: this.state.provincesList,
              prefixList: this.state.prefixList,
              booleanList: this.state.booleanList,
              countriesList: this.state.countriesList,
              sexoList: this.state.sexoList,
              ciutList: this.state.ciutList,
              activitiesList: this.state.activitiesList,
              afipActivitiesList: this.state.afipActivitiesList,
              depoActivitiesList: this.state.depoActivitiesList,
              civilStatusList: this.state.civilStatusList,
              statusList: this.state.statusList,
              dniImage: this.state.dniImage,
              recoverPayrollEmployees: this.props.recoverPayrollEmployees,
              readOnly: true
            });
          case "sendOk":
            return React.createElement(ProcessOk, {
              handleShowAdditionRequest: this.props.handleShowAdditionRequest
            });
          case "saveOk":
            return React.createElement(ProcessOk, {
              handleShowAdditionRequest: this.props.handleShowAdditionRequest,
              itsSave: true
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

        var controller = new RetiroNominaController();
        controller.getTipoDocumento(function (docData) {
          _this2.setState({ docTypeList: docData });
        });
        controller.getProvincias(function (provinceData) {
          _this2.setState({ provincesList: provinceData });
        });
        controller.getPrefijos(function (prefixData) {
          _this2.setState({ prefixList: prefixData });
        });
        controller.getPaises(function (countriesList) {
          _this2.setState({ countriesList: countriesList });
        });
        controller.getStatus(function (statusList) {
          _this2.setState({ statusList: statusList });
        });
        //valida si es un formulario nuevo
        if (this.props.recoverPayrollEmployees.NRO_SOL == "0") {
          this.setState({ currentForm: "newForm" });
        } else {
          controller.getRequest(this.props.recoverPayrollEmployees.COD_PRO, this.props.recoverPayrollEmployees.NRO_SOL, function (requestData) {
            //valida si se puede modificar el formulario o es solo lectura, segun el estado de la solicitud
            if (_this2.props.recoverPayrollEmployees.COD_EST == "C" || _this2.props.recoverPayrollEmployees.COD_EST == "A" || _this2.props.readOnly) {
              _this2._handleSetAddresses(requestData);
              _this2._handleSetPeople(requestData);
              _this2._handleSetRestInformation(requestData);
              //Sube la informacion del formulario al componente padre, si tiene la prop
              !_this2.props.setFormData ? "" : _this2.props.setFormData(_this2.formInfo);
              _this2.setState({
                dniImage: "DNIcargado.png",
                currentForm: "readForm"
              });
            } else {
              controller.getDniImage(_this2.props.recoverPayrollEmployees, function (data) {
                if (data.length > 0) {
                  _this2.setState({ dniImage: "DNIcargado.png" });
                }
                _this2._handleSetAddresses(requestData);
                _this2._handleSetPeople(requestData);
                _this2._handleSetRestInformation(requestData);
                _this2.setState({ currentForm: "modifyForm" });
              });
            }
          });
        }
      }
    }]);

    return AdditionManager;
  }(React.Component);

  return AdditionManager;
});