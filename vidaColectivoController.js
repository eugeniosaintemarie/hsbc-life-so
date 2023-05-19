var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../lib/utils", "../services/retiroNominaService", "../services/segurosOnlineService", "./retiroNominaController", "../redux/store"], function (React, Utils, RetiroNominaService, SegurosOnlineService, RetiroNominaController, Store) {
  var VidaColectivoController = function (_React$Component) {
    _inherits(VidaColectivoController, _React$Component);

    function VidaColectivoController() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, VidaColectivoController);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = VidaColectivoController.__proto__ || Object.getPrototypeOf(VidaColectivoController)).call.apply(_ref, [this].concat(args))), _this), _this.retiroNominaService = new RetiroNominaService(), _this.segurosOnlineService = new SegurosOnlineService(), _this.retiroNominaController = new RetiroNominaController(), _this.segurosData = Store.getState().seguros, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(VidaColectivoController, [{
      key: "savePdf",


      //guardar pdf
      value: function savePdf(requestData, image, requestNumber, des, ide, cod, ape, callBack) {
        this.retiroNominaService.guardarArchivo({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestNumber,
          TIP_ARC: image.slice(5, image.indexOf(";")),
          DES_ARC: des,
          IDE_ARC: ide,
          COD_USU: cod,
          APE_USU: ape,
          CON_ARC: image.slice(image.indexOf(",") + 1)
        }).then(function (data) {
          if (!(!data || !data.Message || !data.Message.REGS || !data.Message.REGS.REG) && data.Message.REGS.REG[0].NRO_ARC > 0) {
            callBack("NO_ERROR");
          }
        });
      }
    }, {
      key: "getPdf",
      value: function getPdf(requestData, ide, callBack) {
        this.retiroNominaService.verificarImagenDni({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestData.NRO_SOL,
          IDE_ARC: ide
        }).then(function (data) {
          if (!(!data || !data.Message || !data.Message.REGS || !data.Message.REGS.REG)) {
            callBack(data.Message.REGS.REG);
          } else {
            //se envia array vacio ante cualquier error para que permita seguir con el formulario
            callBack([]);
          }
        });
      }

      //metodos de pago

    }, {
      key: "setPaymentCardNumber",
      value: function setPaymentCardNumber(paymentPethod, formData) {
        var paymentCardNumber = "";
        if (paymentPethod == "TC") {
          paymentCardNumber = formData.applicantCardNumber ? formData.applicantCardNumber.value : "";
          // } ya no hay mas opciones que tarjeta
          // else if (paymentPethod == "CA") {
          //   if (formData.applicantCBU) {
          //     if (formData.applicantCBU.value == "CBU") {
          //       paymentCardNumber = formData.applicantCBUNumber
          //         ? formData.applicantCBUNumber.value
          //         : "";
          //     } else {
          //       paymentCardNumber = formData.applicantAccountNumber
          //         ? formData.applicantAccountNumber.value
          //         : "";
          //     }
          //   }
        }
        return paymentCardNumber;
      }
    }, {
      key: "setGroupsBurial",
      value: function setGroupsBurial(formData) {
        var result = "";
        formData.applicantTitular == undefined || formData.applicantTitular.value == "" || formData.applicantTitular.value == undefined ? result += 0 + "|" : result += formData.applicantTitular.value + "|";
        formData.applicantHijos == undefined || formData.applicantHijos.value == "" || formData.applicantHijos.value == undefined ? result += 0 + "|" : result += formData.applicantHijos.value + "|";
        formData.applicantParent == undefined || formData.applicantParent.value == "" || formData.applicantParent.value == undefined ? result += 0 + "|" : result += formData.applicantParent.value + "|";
        formData.applicantConyuge == undefined || formData.applicantConyuge.value == "" || formData.applicantConyuge.value == undefined ? result += 0 + "|" : result += formData.applicantConyuge.value + "|";
        formData.applicantTotal == undefined || formData.applicantTotal.value == "" ? result += 0 + "|" : result += formData.applicantTotal.value + "|";
        return result;
      }
      //Da formato a los datos de medio de pago para que se puedan pasar a XML

    }, {
      key: "setPerCuentaRegData",
      value: function setPerCuentaRegData(CP, NP, NC, CB, BC, SU, CT, TJ, VT, TS) {
        var regData = {
          "@CP": CP,
          "@NP": NP,
          "@NC": NC,
          "@CB": CB,
          "@BC": BC,
          "@SU": SU,
          "@CT": CT,
          "@TJ": TJ,
          "@VT": VT,
          "@TS": TS
        };
        return regData;
      }

      //Da formato a los datos de direcciones para que se puedan pasar a XML

    }, {
      key: "setPerAddressRegData",
      value: function setPerAddressRegData(CP, NP, ND, PR, PV, LO, CA, NU, PS, DT, CO, TI, TP, TA, TN) {
        var regData = {
          "@CP": CP,
          "@NP": NP,
          "@ND": ND,
          "@PR": PR,
          "@PV": PV,
          "@LO": LO,
          "@CA": CA,
          "@NU": NU,
          "@PS": PS,
          "@DT": DT,
          "@CO": CO,
          "@TI": TI,
          "@TP": TP,
          "@TA": TA,
          "@TN": TN
        };
        return regData;
      }

      //Da formato a los datos de generales para que se puedan pasar a XML

    }, {
      key: "setPerGeneralRegData",
      value: function setPerGeneralRegData(CP, NP, TD, ND, AP, NM, FN, PN, PA, SP, EC, EM, PR, TC, NC, PE, PF, V1, V2, V3) {
        var regData = {
          "@CP": CP,
          "@NP": NP,
          "@TD": TD,
          "@ND": ND,
          "@AP": AP,
          "@NM": NM,
          "@FN": FN,
          "@PN": PN,
          "@PA": PA,
          "@SP": SP,
          "@EC": EC,
          "@EM": EM,
          "@PR": PR,
          "@TC": TC,
          "@NC": NC,
          "@PE": PE,
          "@PF": PF,
          "@V1": V1,
          "@V2": V2,
          "@V3": V3
        };
        return regData;
      }
    }, {
      key: "xmlPerCuenta",
      value: function xmlPerCuenta(formData) {
        var regArray = [];
        var xmlFormat = {
          XML_PERCUENTA: {
            ROOT: {
              REG: regArray
            }
          }
        };
        //Medio de pago
        regArray.push(this.setPerCuentaRegData("S", 1, 1, formData.applicantPayment ? formData.applicantPayment.id : "", 0,
        /* ya no hay sucursales hef565 relacionada formData.applicantBranchOffice
          ? Number(formData.applicantBranchOffice.id)
          : */0, formData.applicantPayment ? this.setPaymentCardNumber(formData.applicantPayment.id, formData) : "", formData.applicantBrand ? Number(formData.applicantBrand.id) : 0, formData.applicantDateMonth && formData.applicantDateYear ? formData.applicantDateYear.value + formData.applicantDateMonth.value : 0, formData.applicantOwner ? formData.applicantOwner.id : 0));
        return Utils.json2xml(xmlFormat);
      }
    }, {
      key: "xmlPerAddress",
      value: function xmlPerAddress(formData) {
        var regArray = [];
        var xmlFormat = {
          XML_PERDOMICILIO: {
            ROOT: {
              REG: regArray
            }
          }
        };
        //Domicilio solicitante
        regArray.push(this.setPerAddressRegData("S", "1", "1", "S", !formData.applicantProvince.id ? "0" : formData.applicantProvince.id, formData.applicantLocality.value, formData.applicantStreet.value, formData.applicantNumber.value, formData.applicantFloor.value, formData.applicantDepartment.value, !formData.applicantCP.value ? "0" : formData.applicantCP.value, "", "", formData.applicantAreaTel.value, formData.applicantTelephone.value));
        //Domicilio tomador
        regArray.push(this.setPerAddressRegData("T", "1", "1", "S", "0", "", "", "", "", "", "0", "", "", "", ""));
        return Utils.json2xml(xmlFormat);
      }

      //Pasa el JSON al formato XML que tiene que tener el servicio (datos generales)

    }, {
      key: "xmlPerGeneral",
      value: function xmlPerGeneral(formData) {
        var _this2 = this;

        var regArray = [];
        var xmlFormat = {
          XML_PERGENERAL: {
            ROOT: {
              REG: regArray
            }
          }
        };
        //Datos solicitante
        regArray.push(this.setPerGeneralRegData("S", "1", !formData.applicantTypeCCC.id ? "0" : formData.applicantTypeCCC.id, formData.applicantCuilNumber.value, formData.applicantSurname.value, formData.applicantName.value, Utils.formatFechaNumber(formData.applicantDateBirth.value), formData.applicantNationality ? formData.applicantNationality.id : "", "", formData.applicantGender ? formData.applicantGender.id : "", formData.applicantCivilStatus ? formData.applicantCivilStatus.id : "", formData.applicantEmail.value, "", !formData.applicantTypeCCC.id ? "0" : formData.applicantTypeCCC.id, formData.applicantCuilNumber.value, "", "", formData.applicantCityBorn ? formData.applicantCityBorn.value : "", formData.applicantIVA ? formData.applicantIVA.value : "", ""));
        //Datos tomador
        regArray.push(this.setPerGeneralRegData("T", "1", "0", "", "", "", 0, "", "", "", "", "", "", "0", "", "", "", "", "", ""));
        //Datos conyuge
        if (formData.formConyuge && formData.formConyuge.id == "1") {
          regArray.push(this.setPerGeneralRegData("C", "1", "5", formData.applicantCUILConyuge.value, formData.applicantSurnameConyuge.value, formData.applicantNameConyuge.value, Utils.formatFechaNumber(formData.applicantDateBirthConyuge.value), formData.applicantNationalityConyuge ? formData.applicantNationalityConyuge.id : "", "", formData.applicantGenderConyuge ? formData.applicantGenderConyuge.id : "", "", formData.applicantEmailConyuge.value, "", "5", formData.applicantCUILConyuge.value, "", "", "", "", ""));
        }
        //Datos beneficiarios
        if (formData.listBenef.list.length > 0) {
          if (formData.listBenef.list[0].NOMINAS.BENEFORD) {
            formData.listBenef.list.forEach(function (beneficiary, i) {
              regArray.push(_this2.setPerGeneralRegData("B", i + 1, beneficiary.NOMINAS.TIPDOCBENE, beneficiary.NOMINAS.NUMDOCBENE, beneficiary.NOMINAS.APEBENE, beneficiary.NOMINAS.BENNOMBRE, beneficiary.NOMINAS.FNACIMIE, "", "0", "", "", beneficiary.NOMINAS.BENEMAIL, beneficiary.NOMINAS.RELBECOD, "", "", "", //Politicamente expuesta
              "", beneficiary.NOMINAS.BENNUMTELEF, beneficiary.NOMINAS.BENEPORC, beneficiary.NOMINAS.BENEFORD));
            });
          } else {
            formData.listBenef.list.forEach(function (beneficiary, i) {
              regArray.push(_this2.setPerGeneralRegData("F", i + 1, beneficiary.NOMINAS.TIPDOCBENE, beneficiary.NOMINAS.NUMDOCBENE, beneficiary.NOMINAS.APEBENE, beneficiary.NOMINAS.BENNOMBRE, beneficiary.NOMINAS.FNACIMIE, "", "0", "", "", beneficiary.NOMINAS.BENEMAIL ? beneficiary.NOMINAS.BENEMAIL : "", "", "", "", "", //Politicamente expuesta
              "", beneficiary.NOMINAS.RELBECOD, "", ""));
            });
          }
        }
        return Utils.json2xml(xmlFormat);
      }
    }, {
      key: "saveRequest",
      value: function saveRequest(formData, product, callBack) {
        this.retiroNominaService.guardarSol({
          ANN_TEM: 0,
          APO_APE: "",
          APO_INI: 0,
          APO_NO1: "",
          APO_NO2: "",
          APO_PER: 0,
          APO_TIE: "",
          CAT_IIB: "",
          CAT_SCC: "",
          CFM_MAI: "",
          COD_COB: 0,
          COD_EST: "0",
          COD_PRO: product.COD_PRO, //codigo de producto
          POL_ANN: product.POL_ANN, //polizaann
          POL_SEC: product.POL_SEC, //polizasec
          COD_USU: product.DIR_EMA, //mail tomador
          DA1_DOM: formData.formConyuge ? formData.formConyuge.id : "", //booleano conyuge vida colectivo
          DA1_FDE: 0,
          DA1_LOC: /* formData.applicantCBU ? formData.applicantCBU.id : ya no hay numero de cbu*/"",
          DA1_PAI: "00",
          DA2_FDE: 0,
          DA2_LOC: formData.applicantTitular ? this.setGroupsBurial(formData) : "",
          DA2_PAI: "00",
          DA3_FDE: 0,
          DA3_LOC: "",
          DA3_PAI: "00",
          DA4_FDE: 0,
          DA4_LOC: "",
          DA4_PAI: "",
          DA5_FDE: 0,
          DA5_LOC: "",
          DA5_PAI: "",
          DER_EMI: 0,
          EDA_APO: 0,
          EMP_ACT: formData.applicantOccupation ? formData.applicantOccupation.id : "", //codigo de ocupacion
          EMP_IME: formData.applicantSalary ? formData.applicantSalary.value : 0,
          EMP_NEG: "",
          EMP_NOM: formData.applicantPlus ? formData.applicantPlus.value : product.CAPITMAX,
          EMP_ROL: formData.salary ? formData.salary.id : 0,
          EMP_STA: "",
          FAT_CRE: "",
          FAT_GRE: "",
          FAT_HMA: "",
          FAT_NCM: "",
          FAT_PN1: "",
          FAT_PN2: "",
          FAT_RM3: "",
          FAT_TIN: 0,
          FEC_COT: 0,
          FEC_ING: Utils.formatDateToNumber(product.FEC_ING), //fecha del día en formato AAAAMMDD
          FEC_SOL: 0,
          FEC_VIG: 0,
          FON_DES: 0,
          GAS_CAP: 0,
          GAS_MEN: 0,
          GAS_PRI: 0,
          IND_COD: "",
          NAN_APE: "",
          NAN_NO1: "",
          NAN_NO2: "",
          NAN_TIE: "",
          NRO_OPE: product.NRO_SOL, //numero de solicitud/operacion
          PER_APO: 0,
          REN_DES: 0,
          REN_GAR: 0,
          REN_PRO: 0,
          TAS_GAR: 0,
          TAS_PRO: 0,
          TCE_ARE: "",
          TCE_NUM: "",
          TCE_PAI: "",
          TCE_PRE: "",
          TIP_COB: "",
          TIP_COT: 0,
          TIP_IVA: formData.listBenef.list.length ? 2 : 1, //tipo de beneficiario
          TIP_PER: "00",
          TIP_REN: "P",
          TIP_TAS: formData.applicantRequisito ? formData.applicantRequisito : "",
          TIT_COD: "",
          TIT_DOT: "",
          TLA_ARE: "",
          TLA_NUM: "",
          TLA_PAI: "",
          TLA_PRE: "",
          TYC_MAR: "",
          TYC_VER: "",
          VEN_EMP: "",
          VEN_LEG: "",
          VEN_NOM: "",
          VEN_SUC: "",
          VTO_COT: 0,
          XML_FON: "<XML_FONDO><ROOT></ROOT></XML_FONDO>",
          XML_IDE: "<XML_IMPREDET><ROOT></ROOT></XML_IMPREDET>",
          XML_IMP: "",
          XML_PEC: this.xmlPerCuenta(formData),
          XML_PED: this.xmlPerAddress(formData),
          XML_PEG: this.xmlPerGeneral(formData)
        }).then(function (data) {
          if (!(!data || !data.RESULTADO || !data.RESULTADO[0].RET)) {
            callBack(data);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "getDatosPoliza",
      value: function getDatosPoliza(POL_SEC, POL_ANN, COD_PRO, callBack) {
        this.retiroNominaService.getDatosPoliza({
          COD_PRO: COD_PRO,
          POL_ANN: POL_ANN,
          POL_SEC: POL_SEC
        }).then(function (data) {
          if (!(!data || !data.Message)) {
            callBack(data);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "sendApplication",
      value: function sendApplication(product, callBack) {
        this.retiroNominaService.sendApplication(product).then(function (data) {
          if (data && data.RESTS != undefined && data.RESTS !== "ER") callBack(data);else callBack(data.ERMSG);
        });
      }
    }, {
      key: "getExisteEnNomina",
      value: function getExisteEnNomina(product, CUIL, callBack) {
        this.retiroNominaService.getExisteEnNomina({
          COD_PRO: product.COD_PRO,
          POL_ANN: product.POL_ANN,
          POL_SEC: product.POL_SEC,
          CER_POL: product.CER_POL,
          CER_ANN: product.CER_ANN,
          CER_SEC: product.CER_SEC,
          TIP_DOC: "5",
          NRO_DOC: CUIL
        }).then(function (data) {
          if (data) {
            callBack(data.EXI_NOM);
          }
        });
      }
    }, {
      key: "getPDFFormWeb",
      value: function getPDFFormWeb(product, callBack) {
        this.retiroNominaService.getPDFFormWeb({
          COD_PRO: product.COD_PRO,
          NRO_OPE: product.NRO_SOL,
          IDE_ARC: 'PDF_GEN_SOL'
        }).then(function (data) {
          if (data) callBack(data);else callBack("ERROR");
        });
      }
    }, {
      key: "getValFormaCobro",
      value: function getValFormaCobro(bco, cardNumber, brand, brOffice, date, callBack) {
        this.retiroNominaService.getValFormaCobro({
          BANCO: bco,
          NROCOBRO: cardNumber,
          TIPOCOBR: brand,
          SUCURSAL: brOffice,
          FECVTOTARJ: date
        }).then(function (data) {
          callBack(data.Message.CAMPOS.MOTIVO);
        });
      }
    }, {
      key: "getFormularioTomVida",
      value: function getFormularioTomVida(list, callBack) {
        this.segurosOnlineService.getFormularioTomVida({
          "COD_PRO": list.COD_PRO,
          "NRO_OPE": list.NRO_OPE,
          "ASE_TDO": list.TIP_DOC,
          "ASE_NDO": list.NRO_DOC,
          "IDE_ARC": "PDF_GEN_SOL"
        }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "setDesestimarFormWeb",
      value: function setDesestimarFormWeb(product, callBack) {
        this.retiroNominaService.setDesestimarFormWeb({
          TOM_TDO: product.TOM_TDO,
          TOM_NDO: product.TOM_NDO,
          COD_PRO: product.COD_PRO,
          POL_ANN: product.POL_ANN,
          POL_SEC: product.POL_SEC,
          CER_POL: product.CER_POL,
          CER_ANN: product.CER_ANN,
          CER_SEC: product.CER_SEC,
          NRO_DOC: product.NRO_DOC,
          TIP_DOC: product.TIP_DOC,
          NRO_SOL: product.NRO_SOL
        }).then(function (data) {
          if (data) callBack(data);else callBack("ERROR");
        });
      }
    }, {
      key: "getMotivosBaja",
      value: function getMotivosBaja(callBack) {
        var currentProduct = this.segurosData.currentProduct;
        this.segurosOnlineService.getMotivosBaja({
          TIP_PRO: currentProduct.detalle.TIPOPRODU || currentProduct.TIPOPRODU
        }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "setSolicitudBaja",
      value: function setSolicitudBaja(list, callBack) {
        this.segurosOnlineService.setSolicitudBaja({
          TIP_PRO: list.TIP_PRO,
          COD_PRO: list.COD_PRO,
          POL_ANN: list.POL_ANN,
          POL_SEC: list.POL_SEC,
          CER_POL: list.CER_POL,
          CER_ANN: list.CER_ANN,
          CER_SEC: list.CER_SEC,
          COD_MOT: list.COD_MOT,
          OTR_MOT: list.OTR_MOT,
          TEL_CON: list.TEL_CON,
          HOR_CON: list.HOR_CON
        }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getReporteTom",
      value: function getReporteTom(callBack) {
        var currentProduct = this.segurosData.currentProduct;

        currentProduct = currentProduct.cup ? currentProduct.cup : currentProduct.detalle;
        this.retiroNominaService.getReporteTom({
          'COD_PRO': currentProduct.RAMOPCOD,
          'POL_ANN': currentProduct.POLIZANN,
          'POL_SEC': currentProduct.POLIZSEC,
          'CER_POL': currentProduct.CERTIPOL,
          'CER_ANN': currentProduct.CERTIANN,
          'CER_SEC': currentProduct.CERTISEC,
          'TIP_PRO': currentProduct.RAMOPTVC
        }).then(function (data) {
          if (data) callBack(data, currentProduct.RAMOPCOD);else callBack("ERROR");
        });
      }
    }]);

    return VidaColectivoController;
  }(React.Component);

  return VidaColectivoController;
});