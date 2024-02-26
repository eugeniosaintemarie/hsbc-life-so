var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../lib/utils", "../services/segurosOnlineService", "../services/retiroNominaService", "../services/loginService", "../services/endososService", "../redux/store"], function (React, Utils, SegurosOnlineService, RetiroNominaService, LoginService, EndososService, Store) {
  var RetiroNominaController = function (_React$Component) {
    _inherits(RetiroNominaController, _React$Component);

    function RetiroNominaController() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, RetiroNominaController);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RetiroNominaController.__proto__ || Object.getPrototypeOf(RetiroNominaController)).call.apply(_ref, [this].concat(args))), _this), _this.segurosOnlineService = new SegurosOnlineService(), _this.retiroNominaService = new RetiroNominaService(), _this.loginService = new LoginService(), _this.endososService = new EndososService(), _this.segurosData = Store.getState().seguros, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RetiroNominaController, [{
      key: "sendNomina",
      value: function sendNomina(list, product, callback, user, form) {
        var _this2 = this;

        var error = [];
        console.log(product);
        list.map(function (benef) {
          if (benef.VALIDACION != "NOMAIL") {
            _this2.retiroNominaService.grabarNominaEmpleados({
              MAIL: benef.MAIL,
              DATOSREGISTRO: benef.DATOSREGISTRO,
              VALIDACION: benef.VALIDACION,
              FORM: form,
              POLIZA: {
                COD_PRO: product.RAMOPCOD,
                POL_ANN: product.POLIZANN,
                POL_SEC: product.POLIZSEC,
                CER_POL: product.CERTIPOL,
                CER_ANN: product.CERTIANN,
                CER_SEC: product.CERTISEC,
                TOM_TDO: user.TIPODOCU.toString(),
                TOM_NDO: user.NUMEDOCU.toString(),
                TOM_APE: user.CLIENAP1,
                COD_GRU: product.group
              }
            }).then(function (data) {
              if (data.GRABANOM != "NO_ERROR") callback.apply(undefined, error.concat([data]));else callback(error);
            });
          }
        });
      }
    }, {
      key: "handleResponse",
      value: function handleResponse(data, callback) {
        if (data && data.Code == "NO_ERROR" && data.Message.REGS && data.Message.REGS.REG) {
          var list = data.Message.REGS.REG.map(function (item) {
            return {
              APENOM: item.ASE_APE + " " + item.ASE_NOM,
              ASE_APE: item.ASE_APE,
              ASE_NOM: item.ASE_NOM,
              ASE_SUE: item.ASE_SUE,
              TIP_DOC: item.TIP_DOC,
              NRO_DOC: item.NRO_DOC,
              ESTADO: item.COD_EST == "C" ? "COMPLETA" : item.COD_EST == "E" ? "COMPLETA" : item.COD_EST == "G" ? "PENDIENTE" : item.COD_EST == "R" ? "RECHAZADA" : item.COD_EST == "D" ? "DESISTIDA" : "",
              NRO_OPE: item.NRO_SOL,
              COD_PRO: item.COD_PRO,
              POL_ANN: item.POL_ANN,
              POL_SEC: item.POL_SEC,
              CER_POL: item.CER_POL,
              CER_ANN: item.CER_ANN,
              CER_SEC: item.CER_SEC,
              TOM_TDO: item.TOM_TDO,
              TOM_NDO: item.TOM_NDO,
              TOM_APE: item.TOM_APE,
              FEC_NAC: item.FEC_NAC,
              DES_GRU: item.DES_GRU,
              FEC_ACT: item.FEC_ACT,
              TIP_SOL: item.TIP_SOL,
              TIP_MOD: item.TIP_MOD,
              MAIL: item.DIR_EMA
            };
          });
          callback({ employees: list, CODE: "OK" });
        } else {
          callback({ employees: [], CODE: "ERROR" });
        }
      }
    }, {
      key: "getEmployees",
      value: function getEmployees(callback) {
        var _this3 = this;

        var currentProduct = this.segurosData.currentProduct;

        currentProduct = currentProduct.cup ? currentProduct.cup : currentProduct.detalle;
        this.retiroNominaService.recuperarNominaEmpleados({
          COD_PRO: currentProduct.RAMOPCOD,
          POL_ANN: currentProduct.POLIZANN,
          POL_SEC: currentProduct.POLIZSEC,
          CER_POL: currentProduct.CERTIPOL,
          CER_ANN: currentProduct.CERTIANN,
          CER_SEC: currentProduct.CERTISEC
        }).then(function (data) {
          _this3.handleResponse(data, callback);
        });
      }
    }, {
      key: "getRequest",
      value: function getRequest(codPro, nroSol, callBack) {
        this.retiroNominaService.recSol({ COD_PRO: codPro, NRO_OPE: nroSol }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getTipoDocumento",
      value: function getTipoDocumento(callBack) {
        this.segurosOnlineService.getTiposDocumento({ COD_APP: "OV", COD_PRO: "" }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getProvincias",
      value: function getProvincias(callBack) {
        this.endososService.getProvinciaList({}).then(function (data) {
          callBack(data.Message.REGS.REG);
        });
      }
    }, {
      key: "getLocalidades",
      value: function getLocalidades(callBack) {
        this.endososService.getLocalidadList({}).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getPrefijos",
      value: function getPrefijos(callBack) {
        this.retiroNominaService.prefTelPaises({}).then(function (data) {
          var prefixList = data.Message.DATOS.PAISES.PAIS.map(function (e) {
            e.SHOWDESC = e.PREFIJO.replace(" ", "") + " - " + e.DESCRIPCION;
            return e;
          });
          callBack(prefixList);
        });
      }
    }, {
      key: "getDeportesActividades",
      value: function getDeportesActividades(code, description, callBack) {
        this.retiroNominaService.deportesActividades({
          ACTIVTIP: "A",
          ACTIVDES: description,
          ACTIVCOD: code
        }).then(function (data) {
          callBack(data.Message.DATOS.ACTIVIDADES.ACTIVIDAD);
        });
      }
    }, {
      key: "getPaises",
      value: function getPaises(callBack) {
        this.retiroNominaService.paises({}).then(function (data) {
          callBack(data.Message.DATOS.PAISES.PAIS);
        });
      }
    }, {
      key: "getTitle",
      value: function getTitle(callBack) {
        this.retiroNominaService.tratamientoTit({}).then(function (data) {
          callBack(data.Message.DATOS.TRATAMIENTOS.TRATAMIENTO);
        });
      }
    }, {
      key: "getStatus",
      value: function getStatus(callBack) {
        this.retiroNominaService.status({}).then(function (data) {
          callBack(data.Message.DATOS.STATUSS.STATUS);
        });
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

      //Pasa el JSON al formato XML que tiene que tener el servicio (direcciones)

    }, {
      key: "xmlPerAddress",
      value: function xmlPerAddress(formData) {
        var _this4 = this;

        var regArray = [];
        var xmlFormat = {
          XML_PERDOMICILIO: {
            ROOT: {
              REG: regArray
            }
          }
        };
        //Direccion contratante
        regArray.push(this.setPerAddressRegData("T", "1", "1", "S", !formData.contractorProvince.id ? "0" : formData.contractorProvince.id, formData.contractorLocality.value, formData.contractorStreet.value, formData.contractorStreetNumber.value, formData.contractorFloor.value, formData.contractorDepto.value, !formData.contractorZipCode.value ? "0" : formData.contractorZipCode.value, formData.contractorPrefix.code, formData.contractorPrefix.id, formData.contractorAreaCode.value, formData.contractorPhone.value));
        //Direccion representante legal
        regArray.push(this.setPerAddressRegData("R", "1", "1", "S", !formData.legalRepreProvince.id ? "0" : formData.legalRepreProvince.id, formData.legalRepreLocality.value, formData.legalRepreStreet.value, formData.legalRepreStreetNumber.value, formData.legalRepreFloor.value, formData.legalRepreDepto.value, !formData.legalRepreZipCode.value ? "0" : formData.legalRepreZipCode.value, formData.legalReprePrefix.code, formData.legalReprePrefix.id, formData.legalRepreAreaCode.value, formData.legalReprePhone.value));
        //Domicilio real
        regArray.push(this.setPerAddressRegData("S", "1", "1", "S", !formData.applicantProvince.id ? "0" : formData.applicantProvince.id, formData.applicantLocality.value, formData.applicantStreet.value, formData.applicantStreetNumber.value, formData.applicantFloor.value, formData.applicantDepto.value, !formData.applicantZipCode.value ? "0" : formData.applicantZipCode.value, formData.applicantTelPrefix.code, formData.applicantTelPrefix.id, formData.applicantAreaCode.value, formData.applicantTel.value));
        //Domicilio correspondencia
        if (formData.applicantDiferentAddress.id == "S") {
          regArray.push(this.setPerAddressRegData("S", "1", "2", "S", !formData.mailProvince.id ? "0" : formData.mailProvince.id, formData.mailLocality.value, formData.mailStreet.value, formData.mailStreetNumber.value, formData.mailFloor.value, formData.mailDepto.value, !formData.mailZipCode.value ? "0" : formData.mailZipCode.value, "", "", "00", ""));
        }
        //Domicilio fiscal
        if (formData.applicantSameAddress.id == "N") {
          regArray.push(this.setPerAddressRegData("S", "1", "3", "S", !formData.fiscalProvince.id ? "0" : formData.fiscalProvince.id, formData.fiscalLocality.value, formData.fiscalStreet.value, formData.fiscalStreetNumber.value, formData.fiscalFloor.value, formData.fiscalDepto.value, !formData.fiscalZipCode.value ? "0" : formData.fiscalZipCode.value, "", "", "", ""));
        }
        //Primer domicilio previo
        if (formData.previusStreet != undefined) {
          regArray.push(this.setPerAddressRegData("S", "1", "4", "S", !formData.previusProvince.id ? "0" : formData.previusProvince.id, formData.previusLocality.value, formData.previusStreet.value, formData.previusStreetNumber.value, formData.previusFloor.value, formData.previusDepto.value, !formData.previusZipCode.value ? "0" : formData.previusZipCode.value, "", "", "", ""));
        }
        //Segundo domicilio previo
        if (formData.previusStreet2 != undefined) {
          regArray.push(this.setPerAddressRegData("S", "1", "5", "S", !formData.previusProvince2.id ? "0" : formData.previusProvince2.id, formData.previusLocality2.value, formData.previusStreet2.value, formData.previusStreetNumber2.value, formData.previusFloor2.value, formData.previusDepto2.value, !formData.previusZipCode2.value ? "0" : formData.previusZipCode2.value, "", "", "", ""));
        }
        //Tercer domicilio previo
        if (formData.previusStreet3 != undefined) {
          regArray.push(this.setPerAddressRegData("S", "1", "6", "S", !formData.previusProvince3.id ? "0" : formData.previusProvince3.id, formData.previusLocality3.value, formData.previusStreet3.value, formData.previusStreetNumber3.value, formData.previusFloor3.value, formData.previusDepto3.value, !formData.previusZipCode3.value ? "0" : formData.previusZipCode3.value, "", "", "", ""));
        }
        //Direccion empresa informacion adicional
        if (formData.companyStreet != undefined) {
          regArray.push(this.setPerAddressRegData("S", "1", "7", "S", !formData.companyProvince.id ? "0" : formData.companyProvince.id, formData.companyLocality.value, formData.companyStreet.value, formData.companyStreetNumber.value, formData.companyFloor.value, formData.companyDepto.value, !formData.companyZipCode.value ? "0" : formData.companyZipCode.value, "", "", "", ""));
        }
        //Direccion beneficiarios
        if (formData.beneficiaryType.id == "2") {
          if (formData.listBenef.list.length > 0) {
            formData.listBenef.list.forEach(function (beneficiary, i) {
              regArray.push(_this4.setPerAddressRegData("B", i + 1, "1", "S", beneficiary.NOMINAS.BENPROVINCIA, beneficiary.NOMINAS.BENLOCALIDAD, beneficiary.NOMINAS.BENCALLE, beneficiary.NOMINAS.BENNUMERO, beneficiary.NOMINAS.BENPISO, beneficiary.NOMINAS.BENDEPTO, beneficiary.NOMINAS.BENCPOSTAL, "00", //codigo pais
              beneficiary.NOMINAS.BENPAISTELEF, beneficiary.NOMINAS.BENCARTELEF, beneficiary.NOMINAS.BENNUMTELEF));
            });
          }
        }
        return Utils.json2xml(xmlFormat);
      }

      //Pasa el JSON al formato XML que tiene que tener el servicio (datos generales)

    }, {
      key: "xmlPerGeneral",
      value: function xmlPerGeneral(formData) {
        var _this5 = this;

        var regArray = [];
        var xmlFormat = {
          XML_PERGENERAL: {
            ROOT: {
              REG: regArray
            }
          }
        };
        //Datos contratante
        regArray.push(this.setPerGeneralRegData("T", "1", "0", "0", formData.contractorName.value, "", "0", "", "", "", "", formData.contractorMail != undefined ? formData.contractorMail.value : "", "", !formData.contractorTypeDoc.id ? "0" : formData.contractorTypeDoc.id, formData.contractorDoc.value, "", formData.contractorActivity.id, formData.contractNumber.value, "", ""));
        //Datos representante legal
        regArray.push(this.setPerGeneralRegData("R", "1", !formData.legalRepreTypeDoc.id ? "0" : formData.legalRepreTypeDoc.id, formData.legalRepreDoc.value, formData.legalRepreSurname.value, formData.legalRepreName.value, Utils.formatFechaNumber(formData.legalRepreBornDate.value), "00", "", formData.legalRepreSexo.id, formData.legalRepreCivilStatus.id, formData.legalRepreMail != undefined ? formData.legalRepreMail.value : "", "", !formData.legalRepreTypeCuit.id ? "0" : formData.legalRepreTypeCuit.id, formData.legalRepreCuit.value, "", "", formData.legalRepreAge.value, formData.legalRepreBornPlace.value, ""));
        //Datos solicitante
        regArray.push(this.setPerGeneralRegData("S", "1", !formData.applicantTypeDoc.id ? "0" : formData.applicantTypeDoc.id, formData.applicantDoc.value, formData.applicantSurname.value, formData.applicantName.value, Utils.formatFechaNumber(formData.applicantBornDate.value), formData.applicantNacionality.id, formData.applicantBornCountry.id, formData.applicantSexo.id, formData.applicantCivilStatus.id, formData.applicantFax.value, "", !formData.applicantTypeCuit.id ? "0" : formData.applicantTypeCuit.id, formData.applicantCuit.value, formData.applicantExposed.id, "", formData.applicantBornPlace.value, "", //actividad
        ""));
        //Datos beneficiarios
        if (formData.beneficiaryType.id == "2") {
          if (formData.listBenef.list.length > 0) {
            formData.listBenef.list.forEach(function (beneficiary, i) {
              regArray.push(_this5.setPerGeneralRegData("B", i + 1, beneficiary.NOMINAS.TIPDOCBENE, beneficiary.NOMINAS.NUMDOCBENE, beneficiary.NOMINAS.APEBENE, beneficiary.NOMINAS.BENNOMBRE, beneficiary.NOMINAS.FNACIMIE, beneficiary.NOMINAS.BENNACIONAL, "0", beneficiary.NOMINAS.BENSEXO, "", beneficiary.NOMINAS.BENEMAIL, beneficiary.NOMINAS.RELBECOD, "", "", beneficiary.NOMINAS.BENESPEP, //Politicamente expuesta
              "", beneficiary.NOMINAS.RELBEDEP, //Dependencia financiera
              beneficiary.NOMINAS.BENEPORC, beneficiary.NOMINAS.BENEFORD));
            });
          }
        }
        return Utils.json2xml(xmlFormat);
      }

      //Codifica a B64 los datos dentro de la funcion

    }, {
      key: "setB64Data",
      value: function setB64Data(recoverPayrollEmployees) {
        var result = {
          Datos: {
            operacion: {
              producto: recoverPayrollEmployees.COD_PRO,
              operacionId: recoverPayrollEmployees.NRO_SOL,
              estado: "Y",
              usuario: recoverPayrollEmployees.DIR_EMA,
              sucursal: "",
              fechaIngreso: recoverPayrollEmployees.FEC_ING,
              fechaCotizacion: 0,
              fechaSolicitud: 0,
              fechaVigencia: 0,
              tipoPersona: "00",
              condicionIVA: "3",
              categoriaIIBB: "0",
              cobro: "",
              vendedorEmpresa: "",
              vendedorSucursal: "",
              vendedorLegajo: "",
              vendedorApeyNom: "",
              conformidadEMail: false,
              empresa: "20",
              operacionEmp: "28",
              polizaCol: "",
              agenteCla: "",
              agenteCod: "",
              nroCotizacion: recoverPayrollEmployees.NRO_SOL,
              plan: "1",
              nroNewSAS: recoverPayrollEmployees.NRO_SOL,
              campana: 0
            },
            personaList: {
              persona: []
            },
            domicilioList: {
              domicilio: []
            },
            cuentaList: {
              cuenta: []
            },
            datosRET: {
              tipCUILCDI: "",
              nroCUILCDI: "",
              celular: "",
              nacionalidad: "",
              profesion: "",
              esPEP: false,
              esSCC: false,
              codBenef: "",
              esTitMPg: true,
              tyc: {},
              tipoCotizacion: "11",
              indice: "R700",
              factorTrans: 0,
              spreadMin: 0,
              moneda: "$",
              aporteInicial: 0,
              aportePeridico: 0,
              fondoDeseado: "",
              rentaDeseada: "",
              periodicAporte: "",
              edadFinAporte: 0,
              tipoTasa: "G",
              tipoRenta: "N",
              annTemporaria: "",
              rentaMensualGarant: 0,
              rentaMensualProy: 0,
              tasaInteresGarant: 0,
              tasaInteresProy: 0,
              gastosMensuales: 0,
              derechoEmision: 0,
              gastosPrima: 0,
              gastosCapital: 0,
              fechaVtoCot: 0,
              fatNacMultiple: "N",
              fatPaisNac1: "",
              fatPaisNac2: "",
              fatGreenCard: "N",
              fatCompRes: "N",
              fatDomMenor3A: "N",
              fatDomAnterior: "",
              fatHoldMail: "N",
              fatTaxIdNum: 0,
              fatPaisDomAnterior: ""
            },
            fondoProyList: {
              fondoProy: []
            },
            deduccionList: {
              deduccion: []
            },
            beneficiarioList: {
              beneficiario: []
            },
            representanteList: {
              representante: []
            },
            titularMedioPago: {},
            datosAdi: {
              nroSoliSpot: recoverPayrollEmployees.NRO_SOL,
              cargoDeclaracion: "",
              caracterInvocado: "",
              personaDeclaracion: "",
              observacionesDeclaracion: ""
            },
            datosCDD: {
              domAntDir1Domicilio: "",
              domAntDir1Localidad: "",
              domAntDir1CodPais: "",
              domAntDir1FechaDesde: 0,
              domAntDir2Domicilio: "",
              domAntDir2Localidad: "",
              domAntDir2CodPais: "",
              domAntDir2FechaDesde: 0,
              domAntDir3Domicilio: "",
              domAntDir3Localidad: "",
              domAntDir3CodPais: "",
              domAntDir3FechaDesde: 0,
              telParCodPais: "",
              telParPrefPais: "",
              telParAreaPais: "",
              telParNumero: "",
              telCelCodPais: "",
              telCelPrefPais: "",
              telCelAreaPais: "",
              telCelNumero: "",
              telLabCodPais: "",
              telLabPrefPais: "",
              telLabAreaPais: "",
              telLabNumero: "",
              nacMulTiene: "N",
              nacMulCodPais1: "",
              nacMulCodPais2: "",
              tituloCod: "",
              tituloDes: "",
              nombreAnt1: "",
              apellidoAnt1: "",
              nombreAnt2: "",
              apellidoAnt2: "",
              domLabCalle: "",
              domLabNumero: "",
              domLabPiso: "",
              domLabDepartamento: "",
              domLabCodigoPostal: "",
              domLabProvincia: "",
              domLabLocalidad: "",
              datLabOcupacion: "",
              datLabIngresoMensual: 0,
              datLabStatus: "1",
              datLabEmpresa: "",
              datEsPEP: "N",
              datCatSCC: "N",
              rosOrigen: "N",
              rosCodCIM: "2027353252920190228162923",
              rosRiesgo: "",
              rosFecUltReview: 0
            },
            fechaHoy: new Date()
          }
        };
        return window.btoa(JSON.stringify(result));
      }
    }, {
      key: "saveRequest",
      value: function saveRequest(formData, recoverPayrollEmployees, callBack) {
        this.retiroNominaService.guardarSol({
          ANN_TEM: 0, //ANN temporario
          APO_APE: !formData.otherLastName ? "" : formData.otherLastName.value, //apellido apodo
          APO_INI: 0, //aporte inicial
          APO_NO1: !formData.otherFirstName //primer nombre apodo
          ? "" : formData.otherFirstName.value,
          APO_NO2: !formData.otherMiddleName //segundo nombre apodo
          ? "" : formData.otherMiddleName.value,
          APO_PER: 0, //aporte periodico
          APO_TIE: !formData.otherName ? "" : formData.otherName.id, //otro nombre?
          CAT_IIB: "", // datos facta?
          CAT_SCC: !formData.applicantSpecialClient //categoria SCC
          ? "" : formData.applicantSpecialClient.id,
          CFM_MAI: formData.contractorMailCompliance //conformidad de correo contratante
          ? "" : formData.contractorMailCompliance.id,
          COD_COB: 0, //codigo de cobreo
          COD_EST: "0", //codigo estado
          COD_PRO: recoverPayrollEmployees.COD_PRO, //codigo de producto
          COD_USU: recoverPayrollEmployees.DIR_EMA, //mail tomador
          DA1_DOM: !formData.applicantDiferentAddress ? "" : formData.applicantDiferentAddress.id, //domicilio correspondencia diferente
          DA1_FDE: !formData.sinceDate //fecha desde primer domicilio anterior
          ? 0 : Utils.formatFechaNumber(formData.sinceDate.value),
          DA1_LOC: !formData.applicantSameAddress ? "" : formData.applicantSameAddress.id, //domicilio fiscal igual que el actual
          DA1_PAI: !formData.applicantNif ? "" : formData.applicantNif.id, //numero de idenfificación fiscal (NIF/TIN)
          DA2_FDE: !formData.sinceDate2 //fecha desde segundo domicilio anterior
          ? 0 : Utils.formatFechaNumber(formData.sinceDate2.value),
          DA2_LOC: !formData.countryTin ? "" : formData.countryTin.id, // el país de residencia fiscal no emite número de TIN a sus residentes
          DA2_PAI: !formData.unavailableNif ? "" : formData.unavailableNif.id, //numero de TIN no disponible por otros motivos
          DA3_FDE: !formData.sinceDate3 //fecha desde tercer domicilio anterior
          ? 0 : Utils.formatFechaNumber(formData.sinceDate3.value),
          DA3_LOC: !formData.obligatedSubject ? "" : formData.obligatedSubject.id, //sujeto obligado
          DA3_PAI: "00", //pais tercer domicilio anterior
          DA4_FDE: 0, //fecha desde cuarto domicilio anterior
          DA4_LOC: "", //localidad cuarto domicilio anterior
          DA4_PAI: "", //pais cuarto domicilio anterior
          DA5_FDE: 0, //fecha desde quinto domicilio anterior
          DA5_LOC: "", //localidad quinto domicilio anterior
          DA5_PAI: "", //pais quinto domicilio anterior
          DER_EMI: 0, //derecho de emision
          EDA_APO: 0, //edad fin aporte
          EMP_ACT: formData.applicantOccupation ? formData.applicantOccupation.id : "", //ocupacion solicitante
          EMP_IME: Number(formData.applicantSalary.value), //ingreso mensual
          EMP_NEG: !formData.companyActivity //naturaleza del negocio
          ? "" : formData.companyActivity.value,
          EMP_NOM: !formData.applicantCompany //nombre de la empresa
          ? "" : formData.applicantCompany.value,
          EMP_ROL: !formData.applicantRole ? "" : formData.applicantRole.id, //codigo rol empleo
          EMP_STA: !formData.applicantStatus ? "" : formData.applicantStatus.id, //codigo status empleo
          FAT_CRE: !formData.uueeResidense ? "" : formData.uueeResidense.id, //comprobante residencia
          FAT_GRE: !formData.greenCard ? "" : formData.greenCard.id, //tarjeta verde
          FAT_HMA: !formData.holdMail ? "" : formData.holdMail.id, //holdMail
          FAT_NCM: formData.applicantMultipleNacionality.id, //nacionalidad multiple?
          FAT_PN1: !formData.applicantSecondNacionality //segunda nacionalidad
          ? "" : formData.applicantSecondNacionality.id,
          FAT_PN2: !formData.applicantThirdNacionality //tercera nacionalidad
          ? "" : formData.applicantThirdNacionality.id,
          FAT_RM3: !formData.previusAddress ? "" : formData.previusAddress.id, //residencia menor a 3 años?
          FAT_TIN: !formData.tinNumber ? "0" : formData.tinNumber.value, //tin
          FEC_COT: Utils.formatFechaNumber(formData.registrationDate.value), //fecha inscripcion registral
          FEC_ING: Utils.formatFechaNumber(formData.applicantCompanyEntryDate.value),
          FEC_SOL: 0, //fecha solicitud
          FEC_VIG: Utils.formatFechaNumber(formData.contractDate.value), //fecha contrato
          FON_DES: 0, //fondo deseado
          GAS_CAP: 0, //gasto sobre capital
          GAS_MEN: 0, //gasto mensual
          GAS_PRI: 0, //gasto sobre prima
          IND_COD: "", //indice
          NAN_APE: !formData.previusLastName //apellido anterior
          ? "" : formData.previusLastName.value,
          NAN_NO1: !formData.previusFirstName //primer nombre anterior
          ? "" : formData.previusFirstName.value,
          NAN_NO2: !formData.previusMiddleName // segundo nombre anterior
          ? "" : formData.previusMiddleName.value,
          NAN_TIE: !formData.previusName ? "" : formData.previusName.id, //nombre anterior?
          NRO_OPE: recoverPayrollEmployees.NRO_SOL, //numero de solicitud/operacion
          PER_APO: 0, //periocidad aporte
          REN_DES: 0, //renta deseada
          REN_GAR: 0, //renta garantizada
          REN_PRO: 0, //renta proyectada
          TAS_GAR: 0, //tasa garantizada
          TAS_PRO: 0, //tasa proyectada
          TCE_ARE: formData.applicantCelAreaCode.value, // codigo de area celular
          TCE_NUM: formData.applicanCel.value, //numero celular
          TCE_PAI: formData.applicanCelPrefix.code, //codigo pais celular
          TCE_PRE: formData.applicanCelPrefix.id, // codigo prefijo celular
          TIP_COB: "00", //pais correspondencia
          TIP_COT: 0, //tipo cotizacion
          TIP_IVA: formData.beneficiaryType.id, //tipo de beneficiario
          TIP_PER: "00", //tipo persona '00' FISICA '15' JURíDICA
          TIP_REN: "P", //tipo moneda contrato
          TIP_TAS: "", //conformidad representante legal solicitante
          TIT_COD: formData.applicantTitle.id,
          TIT_DOT: "", //descripcion de titulo (siempre vacio)
          TLA_ARE: formData.applicantWorkAreaCode.value,
          TLA_NUM: formData.applicantWorkTel.value,
          TLA_PAI: formData.applicantWorkTelPrefix.code, //codigo pais telefono laboral
          TLA_PRE: formData.applicantWorkTelPrefix.id,
          TYC_MAR: formData.legalRepreMailCompliance.id,
          TYC_VER: "",
          VEN_EMP: "", //vendedor empresa
          VEN_LEG: formData.ApplicantFileNumber.value, //numero de legajo
          VEN_NOM: !formData.unavailableReason //motivo indisponibilidad numero tin
          ? "" : formData.unavailableReason.value,
          VEN_SUC: "", //vendedor sucursal
          VTO_COT: 0, //vencimiento cotizacion
          XML_FON: "<XML_FONDO><ROOT></ROOT></XML_FONDO>",
          XML_IDE: "<XML_IMPREDET><ROOT></ROOT></XML_IMPREDET>",
          XML_IMP: this.setB64Data(recoverPayrollEmployees),
          XML_PEC: "<XML_PERCUENTA><ROOT></ROOT></XML_PERCUENTA>",
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
      key: "changePayrollStatus",
      value: function changePayrollStatus(requestData, state, requestNumber, callBack) {
        this.retiroNominaService.cambiarEstNominaEmpleados({
          COD_PRO: requestData.COD_PRO,
          POL_ANN: requestData.POL_ANN,
          POL_SEC: requestData.POL_SEC,
          CER_POL: requestData.CER_POL,
          CER_ANN: requestData.CER_ANN,
          CER_SEC: requestData.CER_SEC,
          COD_GRU: requestData.COD_GRU,
          TOM_TDO: requestData.TOM_TDO,
          TOM_NDO: requestData.TOM_NDO,
          TOM_APE: requestData.TOM_APE,
          TIP_DOC: requestData.TIP_DOC,
          TIP_SOL: requestData.TIP_SOL,
          NRO_DOC: requestData.NRO_DOC,
          COD_EST: state,
          NRO_SOL: requestNumber
        }).then(function (data) {
          if (!(!data || !data.Code) && data.Code == "NO_ERROR") {
            callBack("NO_ERROR");
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "fileHeader",
      value: function fileHeader(requestData, requestNumber, callBack) {
        this.retiroNominaService.cabeceraArchivo({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestNumber,
          NRO_POL: requestData.POL_ANN.toString().padStart(2, "0") + "-" + requestData.POL_SEC.toString().padStart(6, "0") + "-" + requestData.CER_POL.toString().padStart(4, "0") + "-" + requestData.CER_ANN.toString().padStart(4, "0") + "-" + requestData.CER_SEC.toString().padStart(6, "0"),
          ASE_TDO: requestData.TIP_DOC,
          ASE_NDO: requestData.NRO_DOC,
          ASE_APE: requestData.ASE_APE,
          ASE_NOM: requestData.ASE_NOM,
          TOM_TDO: requestData.TOM_TDO,
          TOM_NDO: requestData.TOM_NDO,
          TOM_APE: requestData.TOM_APE,
          TOM_NOM: ""
        }).then(function (data) {
          if (!(!data || !data.Message || !data.Message.REGS || !data.Message.REGS.REG)) {
            callBack("NO_ERROR");
          }
        });
      }
    }, {
      key: "saveDniImage",
      value: function saveDniImage(requestData, image, requestNumber, callBack) {
        this.retiroNominaService.guardarArchivo({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestNumber,
          TIP_ARC: image.slice(5, image.indexOf(";")),
          DES_ARC: "Documento",
          IDE_ARC: "IMG_USR_DOC",
          COD_USU: "USRRC",
          APE_USU: "RETCOL",
          CON_ARC: image.slice(image.indexOf(",") + 1)
        }).then(function (data) {
          if (!(!data || !data.Message || !data.Message.REGS || !data.Message.REGS.REG) && data.Message.REGS.REG[0].NRO_ARC > 0) {
            callBack("NO_ERROR");
          }
        });
      }
    }, {
      key: "getDniImage",
      value: function getDniImage(requestData, callBack) {
        this.retiroNominaService.verificarImagenDni({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestData.NRO_SOL,
          IDE_ARC: "IMG_USR_DOC"
        }).then(function (data) {
          if (!(!data || !data.Message || !data.Message.REGS || !data.Message.REGS.REG)) {
            callBack(data.Message.REGS.REG);
          } else {
            //se envia array vacio ante cualquier error para que permita seguir con el formulario
            callBack([]);
          }
        });
      }
    }, {
      key: "sendToAIS",
      value: function sendToAIS(parameters, callBack) {
        this.retiroNominaService.envioAIS(parameters).then(function (data) {
          if (!(!data || !data.Message || !data.Message.Request || !data.Message.CAMPOS)) {
            callBack(data.Message);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "getPdfRetSol",
      value: function getPdfRetSol(requestData, callBack) {
        this.retiroNominaService.generarPdfRetSol({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestData.NRO_OPE,
          DAT_IMP: ""
        }).then(function (data) {
          if (typeof data == "string") {
            callBack(data);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "getPdfFormCrs",
      value: function getPdfFormCrs(requestData, callBack) {
        this.retiroNominaService.generarPdfFormCrs(requestData).then(function (data) {
          if (typeof data == "string") {
            callBack(data);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "getPdfTabletFatca",
      value: function getPdfTabletFatca(requestData, callBack) {
        this.retiroNominaService.generarPdfTabletFatca(requestData).then(function (data) {
          if (typeof data == "string") {
            callBack(data);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "getPdfTabletAddenda",
      value: function getPdfTabletAddenda(requestData, callBack) {
        this.retiroNominaService.generarPdfTabletAddenda(requestData).then(function (data) {
          if (typeof data == "string") {
            callBack(data);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "getSucursales",
      value: function getSucursales(callBack) {
        this.retiroNominaService.getSucursales({}).then(function (data) {
          callBack(data.Message.REGS.REG);
        });
      }
    }, {
      key: "getActividadesCol",
      value: function getActividadesCol(profeCod, profeDes, product, callBack) {
        this.retiroNominaService.getActividadesCol({
          PROFECOD: profeCod,
          PROFEDES: profeDes,
          PRODUCTO: product
        }).then(function (data) {
          if (data && data.Message && data.Message.DATOS) {
            callBack(data.Message.DATOS.ACTIVIDADES.ACTIVIDAD);
          }
        });
      }
    }, {
      key: "savePdf",
      value: function savePdf(requestData, pdf, param, callBack) {
        this.retiroNominaService.guardarArchivo({
          COD_PRO: requestData.COD_PRO,
          NRO_OPE: requestData.NRO_OPE,
          TIP_ARC: "application/pdf",
          DES_ARC: param.DES_ARC,
          IDE_ARC: param.IDE_ARC,
          COD_USU: "USRRC",
          APE_USU: "RETCOL",
          CON_ARC: pdf
        }).then(function (data) {
          if (!(!data || !data.Message || !data.Message.REGS || !data.Message.REGS.REG) && data.Message.REGS.REG[0].NRO_ARC > 0) {
            callBack("NO_ERROR");
          }
        });
      }
    }]);

    return RetiroNominaController;
  }(React.Component);

  return RetiroNominaController;
});