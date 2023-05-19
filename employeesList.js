var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../redux/store", "../../controller/retiroNominaController", "../../controller/vidaColectivoController", "./additionManager", "../../common/loader", "../../common/fileManager", "../../services/segurosOnlineService", "../../common/modalReactBootstrap", "../../lib/utils"], function (React, Store, AdhesionController, VidaColectivoController, AdditionManager, Loader, FileManager, SegurosOnlineService, ModalReactBootstrap, Utils) {
  var EmployeesList = function (_React$Component) {
    _inherits(EmployeesList, _React$Component);

    function EmployeesList(props) {
      _classCallCheck(this, EmployeesList);

      var _this = _possibleConstructorReturn(this, (EmployeesList.__proto__ || Object.getPrototypeOf(EmployeesList)).call(this, props));

      _this.handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._handleSetFormData = function (form) {
        _this.formData = form;
      };

      _this._handleButtonCancel = function () {
        _this.props.handleShowMain();
      };

      _this._handleClickSearch = function (item, id) {
        _this.setState({ showForm: false, idEmployee: id });
        //timeout para que vuelva a llamar todos los servicios del formulario, por si hay varios en estado completado
        setTimeout(function () {
          _this.setState(function () {
            return {
              recoverPayrollEmployees: {
                NRO_SOL: item.NRO_OPE,
                COD_PRO: item.COD_PRO
              },
              showForm: true
            };
          });
        }, 1);
      };

      _this.handleTest = function (e) {
        if (_this.state.stateList[e.target.id].COD_EST == "E" && e.target.checked) {
          _this.state.listChecked.push(_this.state.stateList[e.target.id]);
        } else if (!e.target.checked && _this.state.stateList[e.target.id].COD_EST == "E") {
          var eliminar = _this.state.stateList[e.target.id].NRO_DOC;
          var aEliminar = _this.state.listChecked.find(function (element) {
            return element.NRO_DOC == eliminar;
          });
          var eliminado = _this.state.listChecked.indexOf(aEliminar); // obtenemos el indice que no coincide con la posicion en el array
          _this.state.listChecked.splice(eliminado, 1);
        }
      };

      _this.handleClickPdf = function () {
        var cont = 0;
        if (_this.state.listChecked.length != 0) {
          for (var i = 0; i < _this.state.listChecked.length; i++) {
            _this.vidaColectivoController.getFormularioTomVida(_this.state.list.employees[i], function (data) {
              if (data) {
                var filename = 'nomina de asegurados.pdf';
                var fileManager = new FileManager();
                var resultDownload = fileManagerPDF(data, filename);
                if (!resultDownload) {
                  _this.setState({
                    showModalSuccess: true,
                    coberturaLoading: false,
                    showAsegurados: true,
                    modal: {
                      title: "Error",
                      component: null,
                      size: "md",
                      html: true,
                      contentHTML: "Hubo inconvenientes en la descarga del pdf, por favor intente luego",
                      textClose: "Entendido"
                    }
                  });
                } else {
                  cont++;
                  if (cont == _this.state.listChecked.length) {
                    _this.state.cont = 2;
                    _this.handleSelectAll();
                  }
                  console.log(cont);
                }
              } else {
                _this.setState({
                  showModalSuccess: true,
                  showAsegurados: true,
                  modal: {
                    title: "Error",
                    component: null,
                    size: "md",
                    html: true,
                    contentHTML: "Hubo inconvenientes al generar el pdf",
                    textClose: "Entendido"
                  }
                });
              }
            });
          }
        } else {
          _this.setState({
            showModalSuccess: true,
            modal: {
              title: "Error",
              component: null,
              size: "md",
              html: true,
              contentHTML: "El estado del beneficiario que seleccione debe ser 'COMPLETO'",
              textClose: "Entendido"
            }
          });
        }
      };

      _this._handleSetHeaderObject = function (insuredInfo) {
        return {
          CIAASCOD: "0015",
          USUARCOD: "PR70794438",
          ESTADO: "",
          ERROR: "",
          CLIENSECAS: 0,
          NIVELCLAAS: "",
          NIVELCLA1: "",
          CLIENSEC1: 0,
          NIVELCLA2: "",
          CLIENSEC2: 0,
          NIVELCLA3: "",
          CLIENSEC3: 0,
          POLIZANN: insuredInfo.POL_ANN,
          POLIZSEC: insuredInfo.POL_SEC
        };
      };

      _this._handleSetApplicantObject = function (form) {
        return {
          CLIENAP1: form.applicantSurname,
          CLIENAP2: "",
          CLIENNOM: form.applicantName,
          NACIMDIA: Number(form.applicantBornDate.slice(0, 2)),
          NACIMMES: Number(form.applicantBornDate.slice(3, 5)),
          NACIMANN: Number(form.applicantBornDate.slice(6)),
          LUGARNAC: form.applicantBornPlace,
          NACIONALIDAD: form.applicantNacionality,
          CLIENSEX: form.applicantSexo,
          CLIENEST: form.applicantCivilStatus,
          PROFECOD: form.applicantProfession,
          //domicilio
          DOMICDOM: form.applicantStreet,
          DOMICDNU: form.applicantStreetNumber,
          DOMICPIS: form.applicantFloor,
          DOMICPTA: form.applicantDepto,
          DOMICPOB: form.applicantLocality,
          CPACODPO: String(form.applicantZipCode),
          PROVICOD: form.applicantProvince,
          //domicilio correspondencia
          DOMICDOMCO: !form.mailStreet ? "" : form.mailStreet,
          DOMICDNUCO: !form.mailStreetNumber ? "" : form.mailStreetNumber,
          DOMICPISCO: !form.mailFloor ? "" : form.mailFloor,
          DOMICPTACO: !form.mailDepto ? "" : form.mailDepto,
          DOMICPOBCO: !form.mailLocality ? "" : form.mailLocality,
          CPACODPOCO: !form.mailZipCode ? "" : form.mailZipCode,
          PROVICODCO: !form.mailProvince ? 0 : form.mailProvince,
          //telefono (particular)
          TLFPAISPARTI: form.applicantTelPrefixCode,
          TLFPREFIPARTI: form.applicantTelPrefix,
          TLFPREFNPARTI: form.applicantAreaCode,
          TLFNUMEPARTI: form.applicantTel,
          //telefono celular
          TLFPAISCEL: form.applicanCelPrefixCode,
          TLFPREFICEL: form.applicanCelPrefix,
          TLFPREFNCEL: form.applicantCelAreaCode,
          TLFNUMECEL: form.applicanCel,
          //datos varios
          ENVIOXMAIL: "",
          EMAILCOD: "",
          DOCUMTIP: form.applicantTypeDoc,
          DOCUMDAT: form.applicantDoc,
          CUIT: form.applicantTypeCuit == 4 ? form.applicantCuit : "",
          CUIL: form.applicantTypeCuit == 5 ? form.applicantCuit : "",
          CDI: form.applicantTypeCuit == 40 ? form.applicantCuit : "",
          PEP: form.applicantExposed,
          CATEGCGS: "",
          SUELDOIMP: !form.salary ? 0 : form.salary,
          //telefono laboral
          TLFPAISLAB: form.applicantWorkTelPrefixCode,
          TLFPREFILAB: form.applicantWorkTelPrefix,
          TLFPREFNLAB: form.applicantWorkAreaCode,
          TLFNUMELAB: form.applicantWorkTel,
          PAISNACIM: form.applicantBornCountry,
          //campos de TyC "NO" van (Hernan Fuse)
          TYCVERS: "",
          FETYCDIA: 0,
          FETYCMES: 0,
          FETYCANN: 0,
          FIRMAOV: ""
        };
      };

      _this._handleSetRepreObject = function () {
        return {
          CARACTERREP: "",
          CLIENAP1REP: "",
          CLIENAP2REP: "",
          CLIENNOMREP: "",
          NACIMDIAREP: 0,
          NACIMMESREP: 0,
          NACIMANNREP: 0,
          LUGARNACREP: "",
          NACIONALIREP: "",
          CLIENSEXREP: "",
          CLIENESTREP: "",
          PROFECODREP: "",
          DOMICDOMREP: "",
          DOMICDNUREP: "",
          DOMICPISREP: "",
          DOMICPTAREP: "",
          DOMICPOBREP: "",
          CPACODPOREP: "",
          PROVICODREP: 0,
          TLFPAISREP: "",
          TLFPREFIREP: "",
          TLFPREFNREP: "",
          TLFNUMEREP: "",
          ENVIOXMAILREP: "",
          EMAILCODREP: "",
          DOCUMTIPREP: 0,
          DOCUMDATREP: "",
          CUITREP: "",
          CUILREP: "",
          CDIREP: "",
          PEPREP: "",
          PAISNACIMREP: "00",
          CLIENRELREP: ""
        };
      };

      _this._handleSetPlanObject = function (insuredInfo) {
        return {
          RAMO: insuredInfo.COD_PRO,
          INDICE: "",
          APORTEINIC: 0,
          APORTEPERI: 0,
          PERIOCOBRO: "",
          DEREMIS: 0,
          GASTADMM: 0,
          EDADRETIRO: 0,
          LEGAJOVEND: 0,
          SUCURVTA: 0,
          FECEFECTO: 0
        };
      };

      _this._handleSetDeductionsObject = function () {
        var deductions = {};
        for (var i = 0; i < 10; i++) {
          deductions["DESDE" + (i + 1)] = 0;
          deductions["HASTA" + (i + 1)] = 0;
          deductions["PORCDEDU" + (i + 1)] = 0;
        }
        return deductions;
      };

      _this._handleSetBenefObject = function (form) {
        var beneficiaries = [];
        if (form.beneficiaryType == "1") {
          beneficiaries.push({
            APEBENE: "HEREDEROS LEGALES",
            NOMBENE: "",
            TIPDOCBENE: 0,
            NUMDOCBENE: "",
            BENEPORC: 100,
            BENEFORD: 1,
            BENRELBECOD: "",
            BENFNACIMIE: 0,
            BENRELBEDEP: "",
            BENPAISNACIM: "",
            BENDOMICDOM: "",
            BENDOMICDNU: "",
            BENDOMICPIS: "",
            BENDOMICPTA: "",
            BENCPACODPO: "",
            BENPROVICOD: 0,
            BENDOMICPOB: "",
            BENTLFPAIS: "",
            BENTLFPREFI: "",
            BENTLFPREFN: "",
            BENTLFNUME: "",
            BENEMAILCOD: "",
            BENCLIENPEP: "",
            BENCLIENSEX: ""
          });
        } else {
          form.beneficiaryList.forEach(function (beneficiary) {
            beneficiaries.push({
              APEBENE: beneficiary.NOMINAS.APEBENE,
              NOMBENE: beneficiary.NOMINAS.BENNOMBRE,
              TIPDOCBENE: Number(beneficiary.NOMINAS.TIPDOCBENE),
              NUMDOCBENE: beneficiary.NOMINAS.NUMDOCBENE,
              BENEPORC: Number(beneficiary.NOMINAS.BENEPORC),
              BENEFORD: Number(beneficiary.NOMINAS.BENEFORD),
              BENRELBECOD: beneficiary.NOMINAS.RELBECOD,
              BENFNACIMIE: beneficiary.NOMINAS.FNACIMIE,
              BENRELBEDEP: beneficiary.NOMINAS.RELBEDEP,
              BENPAISNACIM: beneficiary.NOMINAS.BENNACIONAL,
              BENDOMICDOM: beneficiary.NOMINAS.BENCALLE,
              BENDOMICDNU: beneficiary.NOMINAS.BENNUMERO,
              BENDOMICPIS: beneficiary.NOMINAS.BENPISO,
              BENDOMICPTA: beneficiary.NOMINAS.BENDEPTO,
              BENCPACODPO: beneficiary.NOMINAS.BENCPOSTAL,
              BENPROVICOD: Number(beneficiary.NOMINAS.BENPROVINCIA),
              BENDOMICPOB: beneficiary.NOMINAS.BENLOCALIDAD,
              BENTLFPAIS: beneficiary.NOMINAS.BENPREFCODETELEF,
              BENTLFPREFI: beneficiary.NOMINAS.BENPAISTELEF,
              BENTLFPREFN: beneficiary.NOMINAS.BENCARTELEF,
              BENTLFNUME: beneficiary.NOMINAS.BENNUMTELEF,
              BENEMAILCOD: beneficiary.NOMINAS.BENEMAIL,
              BENCLIENPEP: beneficiary.NOMINAS.BENESPEP,
              BENCLIENSEX: beneficiary.NOMINAS.BENSEXO
            });
          });
        }
        return { DATABENE: beneficiaries };
      };

      _this._handleSetficoDataObject = function () {
        var ficoData = [];
        ficoData.push({
          AGENTCOD: 0,
          AGENTCLA: "00",
          ADMINTIP: "S",
          FEFECTO: Utils.formatFechaNumber(Utils.dateToString(new Date())),
          DISCOPOR: 100,
          DISPRPOR: 100
        });
        return { DATOFICO: ficoData };
      };

      _this._handleSetPaymentObject = function () {
        return {
          COBROTIPCOB: "",
          COBROCODCOB: 0,
          CUENTNUMCOB: "",
          BANCOCODCOB: 0,
          SUCURCODCOB: 0,
          VENCIDIACOB: 0,
          VENCIMESCOB: 0,
          VENCIANNCOB: 0,
          CLIENNOMCOB: "",
          CLIENAP1COB: "",
          CLIENAP2COB: "",
          DOCUMTIPCOB: 0,
          DOCUMDATCOB: "",
          PAGATOMACOB: "",
          NACIMDIACOB: 0,
          NACIMMESCOB: 0,
          NACIMANNCOB: 0,
          PAISNACIMCOB: "",
          RELBACODCOB: "",
          CLIENPEPCOB: "",
          DOMICDOMCOB: "",
          DOMICDNUCOB: "",
          DOMICPISCOB: "",
          DOMICPTACOB: "",
          CPACODPOCOB: "",
          PROVICODCOB: 0,
          DOMICPOBCOB: "",
          TLFPAISCOB: "",
          TLFPREFICOB: "",
          TLFPREFNCOB: "",
          TLFNUMECOB: "",
          EMAILCODCOB: "",
          CLIENSEXCOB: ""
        };
      };

      _this._handleSetPreviusAddresses = function (form) {
        var addresses = [];
        for (var i = 1; i < 4; i++) {
          var sinceDate = !form["sinceDate" + (i > 1 ? i : "")] ? 0 : form["sinceDate" + (i > 1 ? i : "")];
          var day = !sinceDate ? 0 : Number(sinceDate.slice(0, 2));
          var month = !sinceDate ? 0 : Number(sinceDate.slice(3, 5));
          var year = !sinceDate ? 0 : Number(sinceDate.slice(6));
          addresses.push({
            DOMLOCALIDA: !form["previusLocality" + (i > 1 ? i : "")] ? 0 : ["previusLocality" + (i > 1 ? i : "")],
            DOMPAISRESI: "00",
            DOMRESIDDIA: day,
            DOMRESIDMES: month,
            DOMRESIDANN: year
          });
        }
        return addresses;
      };

      _this._handleSetFactaDataObject = function (form) {
        return {
          FTCNACMULTI: form.applicantMultipleNacionality,
          FTCNACIONAL2: form.applicantSecondNacionality,
          FTCNACIONAL3: form.applicantThirdNacionality,
          FTCGREENCARD: form.greenCard,
          FTCCOMPRES: form.uueeResidense,
          FTCHOLDMAIL: form.holdMail,
          FTCNROSEGSOC: form.tinNumber,
          FTCDOMMEN3: form.previusAddress,
          FTCDOMANTER: "",
          FTCPAISDOMA: "",
          FTCDOMANT: _this._handleSetPreviusAddresses(form),
          FTCTITULCOD: form.applicantTitle,
          FTCTITULOTR: "",
          FTCNOMBRANT: form.previusName,
          FTCNOMB1ANT: form.previusFirstName,
          FTCNOMB2ANT: form.previusMiddleName,
          FTCAPELLANT: form.previusLastName,
          FTCNOMBRALT: form.otherName,
          FTCNOMB1ALT: form.otherFirstName,
          FTCNOMB2ALT: form.otherMiddleName,
          FTCAPELLALT: form.otherLastName,
          FTCEMPLESTA: Number(form.applicantStatus),
          FTCROLCODIG: Number(form.applicantRole),
          FTCACTIVAFI: Number(form.applicantActivity),
          FTCCLIENAP1: !form.applicantCompany ? "" : form.applicantCompany,
          FTCDOMICDOM: !form.companyStreet ? "" : form.companyStreet,
          FTCDOMICDNU: !form.companyStreetNumber ? "" : form.companyStreetNumber,
          FTCDOMICPIS: !form.companyFloor ? "" : form.companyFloor,
          FTCDOMICPTA: !form.companyDepto ? "" : form.companyDepto,
          FTCCPACODPO: !form.companyZipCode ? 0 : form.companyZipCode,
          FTCPROVICOD: !form.companyProvince ? 0 : form.companyProvince,
          FTCDOMICPOB: "",
          FTCNATURNEG: form.companyActivity,
          FTCREVIWDIA: 0,
          FTCREVIWMES: 0,
          FTCREVIWANN: 0,
          FTCEVALRIES: "",
          FTCCLIENCIM: "",
          FTCCDDORIGEN: ""
        };
      };

      _this._handleSetNewSasObject = function (insuredInfo) {
        return {
          SASEXPEDNUM: insuredInfo.NRO_OPE,
          SASORIGEN: "OFV"
        };
      };

      _this._handleSetServiceParameters = function () {
        var insuredInfo = _this.state.list.employees[_this.state.idEmployee];
        var parameters = {};
        Object.assign(parameters, _this._handleSetHeaderObject(insuredInfo));
        Object.assign(parameters, _this._handleSetApplicantObject(_this.formData));
        Object.assign(parameters, _this._handleSetRepreObject());
        Object.assign(parameters, _this._handleSetPlanObject(insuredInfo));
        Object.assign(parameters, _this._handleSetDeductionsObject());
        Object.assign(parameters, _this._handleSetBenefObject(_this.formData));
        Object.assign(parameters, _this._handleSetficoDataObject());
        Object.assign(parameters, _this._handleSetPaymentObject());
        Object.assign(parameters, _this._handleSetFactaDataObject(_this.formData));
        Object.assign(parameters, _this._handleSetNewSasObject(insuredInfo));
        return parameters;
      };

      _this._handleErrorServices = function (errorText) {
        _this.setState({
          showModal: true,
          modal: {
            component: React.createElement(
              "p",
              null,
              errorText
            ),
            title: "Error de servicio",
            size: "md"
          }
        });
      };

      _this._handleFormatParameters = function (policyData, insuredData) {
        var aux = {};
        aux.COD_PRO = insuredData.COD_PRO;
        aux.POL_ANN = policyData.POLIZANN;
        aux.POL_SEC = policyData.POLIZSEC;
        aux.CER_POL = policyData.CERTIPOL;
        aux.CER_ANN = policyData.CERTIANN;
        aux.CER_SEC = policyData.CERTISEC;
        aux.TIP_DOC = insuredData.TIP_DOC;
        aux.NRO_DOC = insuredData.NRO_DOC;
        aux.ASE_APE = insuredData.ASE_APE;
        aux.ASE_NOM = insuredData.ASE_NOM;
        aux.TOM_TDO = insuredData.TOM_TDO;
        aux.TOM_NDO = insuredData.TOM_NDO;
        aux.TOM_APE = insuredData.TOM_APE;
        return aux;
      };

      _this._handleClickConfirm = function () {
        var parameters = _this._handleSetServiceParameters();
        var id = _this.state.idEmployee;
        var employeeArray = _this.state.list.employees;
        var stateList = _this.state.stateList;
        _this.setState({ loadButton: true });
        _this.retiroController.sendToAIS(parameters, function (AISdata) {
          if (AISdata != "ERROR") {
            if (AISdata.Request.ESTADO == "OK") {
              _this.retiroController.fileHeader(_this._handleFormatParameters(AISdata.CAMPOS, employeeArray[id]), employeeArray[id].NRO_OPE, function (headerData) {
                if (headerData == "NO_ERROR") {
                  _this._getPdfRetSol(employeeArray[id], function () {
                    _this._getPdfFormCrs(employeeArray[id], _this.formData, function () {
                      _this._getPdfTabletFatca(employeeArray[id], _this.formData, function () {
                        _this._getPdfTabletAddenda(employeeArray[id], _this.formData, function () {
                          _this.retiroController.changePayrollStatus(employeeArray[id], "A", employeeArray[id].NRO_OPE, function (statusData) {
                            if (statusData == "NO_ERROR") {
                              stateList[id] = "APROBADA";
                              _this.setState({
                                stateList: stateList,
                                loadButton: false,
                                showForm: false
                              });
                            } else {
                              _this._handleErrorServices("El servicio de cambio de estado del formulario no esta disponible, por favor intentalo más tarde");
                            }
                          });
                        });
                      });
                    });
                  });
                } else {
                  _this._handleErrorServices("El servicio de cabecera del archivo no esta disponible, por favor intentalo más tarde");
                }
              });
            } else {
              _this._handleErrorServices("El servicio de envío AIS para confirmar certificado no esta disponible, por favor intentalo más tarde. Código de error: " + AISdata.Request.ERROR);
            }
          } else {
            _this._handleErrorServices("El servicio de envío AIS para confirmar certificado no esta disponible, por favor intentalo más tarde");
          }
        });
      };

      _this._getPdfRetSol = function (employee, callBack) {
        _this.retiroController.getPdfRetSol(employee, function (pdfData) {
          if (pdfData != "ERROR") {
            _this.retiroController.savePdf(employee, pdfData, { DES_ARC: "Solicitud", IDE_ARC: "PDF_ADJ_SOL" }, function (savePdfData) {
              if (savePdfData == "NO_ERROR") {
                callBack();
              } else {
                _this._handleErrorServices("El servicio de guardado del pdf no esta disponible, por favor intentalo más tarde");
              }
            });
          } else {
            _this._handleErrorServices("El servicio que genera el pdf del formulario no esta disponible, por favor intentalo más tarde");
          }
        });
      };

      _this._getPdfFormCrs = function (insuredData, formData, callBack) {
        var request = {
          FORMCRS: {
            SOLIDIA: _this.day, // dia,
            SOLIMES: _this.month, //mes,
            SOLIANN: _this.year, //año,
            NROSOLICITUD: insuredData.COD_PRO + "-" + insuredData.NRO_OPE, //ramo + - + solicitud, por ej RE05- 123,
            TDOCASEG: insuredData.TIP_DOC, //tipo doc,
            NDOCASEG: insuredData.NRO_DOC, // nro doc,
            NOMBRE: insuredData.ASE_NOM, //nombre,
            APELLIDO: insuredData.ASE_APE, //apellido,
            FIRMAASEG: "",
            LUGAR: formData.applicantBornPlace, //LUGAR de nacimiento,
            CALLETOM: formData.applicantStreet, //calle,
            ALTCATOM: formData.applicantStreetNumber, //numero,
            PISOTOM: formData.applicantFloor, //piso,
            DPTOTOM: formData.applicantDepto, // depto,
            CPOSTOM: formData.applicantZipCode, //codpostal,
            LOCALIDTOM: formData.applicantLocality, // localidad,
            PROVTOM: formData.applicantProvince, //provincia,
            PAISTOM: "ARGENTINA", //"ARGENTINA",
            CALLECOR: !formData.mailStreet ? "" : formData.mailStreet, //calle correspondencia,
            ALTCACOR: !formData.mailStreetNumber ? "" : formData.mailStreetNumber, //numero,
            PISOCOR: !formData.mailFloor ? "" : formData.mailFloor, //piso,
            DPTOCOR: !formData.mailDepto ? "" : formData.mailDepto, //depto,
            CPOSCOR: !formData.mailZipCode ? "" : formData.mailZipCode, //código postal,
            LOCALIDCOR: !formData.mailLocality ? "" : formData.mailLocality, //localidad,
            PROVCOR: !formData.mailProvince ? "" : formData.mailProvince, //provincia,
            PAISCOR: "ARGENTINA",
            LUGNACTOM: formData.applicantBornPlace, //lugar de nacimiento,
            NACIONTOM: formData.applicantNacionality, //nacionalidad,
            DDNACTOM: formData.applicantBornDate.slice(0, 2), //dia del nacimiento,
            MMNACTOM: formData.applicantBornDate.slice(3, 5), //mes,
            AANACTOM: formData.applicantBornDate.slice(6), //año,
            PAISRF1: "ARGENTINA",
            CALLERF1: "calle",
            ALTCARF1: "numero",
            PISORF1: "pisto",
            DPTORF1: "depto",
            CPOSRF1: "codpostal",
            LOCALIDRF1: "localidad",
            PROVRF1: "provincia",
            TINRF1: "",
            NOTINDRF1: "X",
            NOTINERF1: "X",
            MOTIVORF1: "",
            PAISRF2: "",
            CALLERF2: "",
            ALTCARF2: "",
            PISORF2: "",
            DPTORF2: "",
            CPOSRF2: "",
            LOCALIDRF2: "",
            PROVRF2: "",
            TINRF2: "",
            NOTINDRF2: "",
            NOTINERF2: "",
            MOTIVORF2: "",
            PAISRF3: "",
            CALLERF3: "",
            ALTCARF3: "",
            PISORF3: "",
            DPTORF3: "",
            CPOSRF3: "",
            LOCALIDRF3: "",
            PROVRF3: "",
            TINRF3: "",
            NOTINDRF3: "",
            NOTINERF3: "",
            MOTIVORF3: "",
            PODER: "",
            ASESOR: "HSBC Seguros Online"
          }
        };
        _this.retiroController.getPdfFormCrs(request, function (pdfData) {
          if (pdfData != "ERROR") {
            _this.retiroController.savePdf(insuredData, pdfData, { DES_ARC: "Form. CRS", IDE_ARC: "PDF_ADJ_CRS" }, function (savePdfData) {
              if (savePdfData == "NO_ERROR") {
                callBack();
              } else {
                _this._handleErrorServices("El servicio de guardado del pdf no esta disponible, por favor intentalo más tarde");
              }
            });
          } else {
            _this._handleErrorServices("El servicio que genera el pdf del formulario no esta disponible, por favor intentalo más tarde");
          }
        });
      };

      _this._getPdfTabletFatca = function (insuredData, formData, callBack) {
        var request = {
          DATOS: {
            APELNOMADMIN: "",
            APELTOM: formData.applicantSurname, // apellido del solicitante,
            CODOFICINA: "",
            DOMCALLEREPRE: "",
            DOMCPOSTREPRE: "",
            DOMDPTOREPRE: "",
            DOMICIANT: !formData.previusAddress ? "N" : formData.previusAddress, // domicilio anterior,
            DOMLOCALREPRE: "",
            DOMNROREPRE: "",
            DOMPISOREPRE: "",
            DOMPROVREPRE: "",
            FECDOMANT: !formData.sinceDate ? "" : Utils.formatFechaNumber(formData.sinceDate), //fecha de domicilio anterior en formato AAAAMMDD,
            LOCALIDANT: !formData.previusLocality ? "" : formData.previusLocality, //localidad anterior,
            LUGAR: "",
            NACIONTOM: formData.applicantNacionality, //nacionalidad del solicitante,
            NACMULTIPLET: formData.applicantMultipleNacionality, //S o N si tiene nacionalidad multiple,
            NDOCTOM: formData.applicantDoc, // documento del solicitante,
            NOMOFICINA: "",
            NOMTOM: formData.applicantName, // nombre del solicitante,
            NROSOLICITUD: insuredData.COD_PRO + "-" + insuredData.NRO_OPE, //ramo + - + solicitud, por ej RE05-123,
            PAISDOMANT: !formData.previusAddress ? "" : "00", //pais del domicilio anterior,
            PAISNAC1T: !formData.applicantSecondNacionality ? "" : formData.applicantSecondNacionality, //si tiene nacionalidad multiple esta es la primera,
            PAISTOM: formData.applicantBornCountry, //pais de nacimiento del solicitante,
            PLAZO: "",
            PRODUCTO: "C",
            RDR: !formData.holdMail ? "N" : formData.holdMail, // isHoldMail S o N,
            SOLIANN: _this.year, // año,
            SOLIDIA: _this.day, // dia,
            SOLIMES: _this.month, // mes,
            TDOCTOM: formData.applicantTypeDoc, //tipo doc del solicitante,
            TIENEREPRE: "N",
            TIN: !formData.tinNumber ? "" : formData.tinNumber, // numero de TIN,
            TVORLP: "", // residLegEEUU S o N,
            SWR: !formData.holdMail ? "N" : formData.holdMail //isHoldMail S o N
          }
        };
        _this.retiroController.getPdfTabletFatca(request, function (pdfData) {
          if (pdfData != "ERROR") {
            _this.retiroController.savePdf(insuredData, pdfData, { DES_ARC: "FATCA", IDE_ARC: "PDF_ADJ_FAT" }, function (savePdfData) {
              if (savePdfData == "NO_ERROR") {
                callBack();
              } else {
                _this._handleErrorServices("El servicio de guardado del pdf no esta disponible, por favor intentalo más tarde");
              }
            });
          } else {
            _this._handleErrorServices("El servicio que genera el pdf del formulario no esta disponible, por favor intentalo más tarde");
          }
        });
      };

      _this._getPdfTabletAddenda = function (insuredData, formData, callBack) {
        var request = {
          REQUEST: {
            SOLIDIA: _this.day, // día,
            SOLIMES: _this.month, // mes
            SOLIANN: _this.year, // año,
            APELTOM: formData.applicantSurname, // apellido del solicitante,
            NOMTOM: formData.applicantName, // nombre del solicitante,
            FIRMATOM: "", // fijo “”,
            TDOCTOM: formData.applicantTypeDoc, //  tipo doc del solicitante,
            NDOCTOM: formData.applicantDoc // nro doc del solicitante
          }
        };
        _this.retiroController.getPdfTabletAddenda(request, function (pdfData) {
          if (pdfData != "ERROR") {
            _this.retiroController.savePdf(insuredData, pdfData, { DES_ARC: "Addenda", IDE_ARC: "PDF_ADJ_ADD" }, function (savePdfData) {
              if (savePdfData == "NO_ERROR") {
                callBack();
              } else {
                _this._handleErrorServices("El servicio de guardado del pdf no esta disponible, por favor intentalo más tarde");
              }
            });
          } else {
            _this._handleErrorServices("El servicio que genera el pdf del formulario no esta disponible, por favor intentalo más tarde");
          }
        });
      };

      _this._handleClickCancel = function () {
        var id = _this.state.idEmployee;
        var employeeArray = _this.state.list.employees;
        var stateList = _this.state.stateList;
        _this.setState({ loadButton: true });
        _this.retiroController.changePayrollStatus(employeeArray[id], "R", employeeArray[id].NRO_OPE, function (data) {
          if (data == "NO_ERROR") {
            stateList[id] = "RECHAZADA";
            _this.setState({
              stateList: stateList,
              loadButton: false,
              showForm: false
            });
          } else {
            _this._handleErrorServices("El servicio de cambio de estado del formulario no esta disponible, por favor intentalo más tarde");
          }
        });
      };

      _this.handleSelectAll = function (e) {
        var datos = document.getElementsByClassName("contenidoTabla");
        if (_this.state.cont == 1) {
          _this.state.stateList.forEach(function (element, i) {
            var input = document.getElementById("" + i);
            if (element == "COMPLETA") {
              input.checked = true;
              _this.state.listChecked.push(element);
            } else {
              input.disabled = true;
              var cont = i + 2 + i * 2; /**para poder grisar las columnas */
              if (datos["" + cont] !== "COMPLETA") {
                for (var indice = cont; indice > cont - 3; indice--) {
                  datos["" + indice].style.backgroundColor = "#BDBDBD";
                }
              }
            }
          });
          _this.setState({ cont: 2 });
        } else {
          for (var indice = 0; indice < datos.length; indice++) {
            datos["" + indice].style.backgroundColor = "white";
          }
          for (var i = 0; i < _this.state.stateList.length; i++) {
            var input = document.getElementById("" + i);
            input.checked = false;
            input.disabled = false;
          }
          _this.setState({ cont: 1 });
        }
      };

      _this.state = {
        list: [],
        listChecked: [],
        stateList: [],
        recoverPayrollEmployees: {},
        loadButton: false,
        showForm: false,
        idEmployee: 0,
        cont: 1,
        validRamo: false,
        showModal: false,
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null,
          disBtnAccept: true
        }
      };
      var today = new Date();
      _this.day = today.getDate();
      _this.month = today.getMonth() + 1;
      _this.year = today.getFullYear();
      segurosOnlineService = new SegurosOnlineService();
      _this.vidaColectivoController = new VidaColectivoController();
      _this.retiroController = new AdhesionController();
      _this.formData = {};
      return _this;
    }

    //este es el representante legal del solicitante, por eso todo va vacio


    _createClass(EmployeesList, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return this.state.validRamo /* true */ ? React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Consulta de solicitudes de adhesi\xF3n"
          ),
          this.state.list.CODE != "ERROR" ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "row justify-content-md-center mt-2" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-danger ml-2",
                  onClick: this.handleClickPdf
                },
                "Descargar seleccionados"
              )
            ),
            React.createElement(
              "div",
              { className: "col-md-12 remove-left-padding" },
              React.createElement(
                "h5",
                null,
                "Personas a adherir"
              ),
              this.state.list.employees ? React.createElement(
                "table",
                { className: "table table-sm table-bordered" },
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      { id: "seleccionar",
                        onClick: this.handleSelectAll },
                      "Seleccionar"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "N\xFAmero de documento"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Apellido y nombre"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Estado de solicitud"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.state.list.employees.map(function (item, i) {
                    return React.createElement(
                      "tr",
                      { key: i },
                      React.createElement(
                        "td",
                        { className: "text-center" },
                        React.createElement("input", { id: i,
                          onClick: _this2.handleTest,
                          type: "checkbox" })
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.NRO_DOC
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla align-middle" },
                        item.APENOM
                      ),
                      React.createElement(
                        "td",
                        { className: "contenidoTabla" },
                        _this2.state.stateList[i],
                        " ",
                        _this2.state.stateList[i] == "COMPLETA" ? React.createElement(
                          "button",
                          {
                            onClick: function onClick() {
                              _this2._handleClickSearch(item, i);
                            },
                            className: "ml-3 btn btn-link btn-hsbc btn-detail-prima"
                          },
                          React.createElement("img", {
                            width: "16px",
                            src: "../img/home/search.svg"
                          })
                        ) : React.createElement(
                          "button",
                          {
                            disabled: true,
                            className: "ml-3 btn btn-link btn-hsbc btn-detail-prima btn-hide"
                          },
                          React.createElement("img", { width: "16px" })
                        )
                      )
                    );
                  })
                )
              ) : ""
            ),
            this.state.showForm ? React.createElement(
              React.Fragment,
              null,
              React.createElement(AdditionManager, {
                recoverPayrollEmployees: this.state.recoverPayrollEmployees,
                setFormData: this._handleSetFormData,
                readOnly: true
              }),
              React.createElement(
                "div",
                { className: "row justify-content-md-center col-md-12 text-center" },
                this.state.loadButton && React.createElement(Loader, {
                  divClass: "btn-confirm-certificate",
                  width: "3rem",
                  height: "3rem"
                }),
                React.createElement(
                  "button",
                  {
                    className: "btn btn-danger m-2 p-1 pr-2 pl-2",
                    type: "button",
                    onClick: this._handleClickConfirm,
                    disabled: this.state.loadButton
                  },
                  "Confirmar",
                  React.createElement("br", null),
                  "Certificado"
                ),
                React.createElement(
                  "button",
                  {
                    className: "btn btn-light m-2 p-1 pr-2 pl-2",
                    type: "button",
                    onClick: this._handleClickCancel,
                    disabled: this.state.loadButton
                  },
                  "Anular",
                  React.createElement("br", null),
                  "Certificado"
                )
              )
            ) : ""
          ) : "Ha ocurrido un error, intente mas tarde",
          React.createElement(
            "div",
            { className: "row justify-content-md-center mt-2" },
            React.createElement(
              "button",
              {
                className: "btn btn btn-light border-dark right mt-2",
                onClick: this._handleButtonCancel
              },
              "Cancelar"
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModalSuccess,
            size: this.state.modal.size,
            isOpen: this.handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            textClose: this.state.modal.textClose
          })
        ) : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "p",
            { className: "font-weight-bold font-italic Italica" },
            "Esta funcionalidad no esta disponible para el producto al cual esta asociada su p\xF3liza"
          ),
          React.createElement(
            "div",
            { className: "row justify-content-md-center mt-2" },
            React.createElement(
              "button",
              { className: "btn btn btn-light border-dark right mt-2", onClick: this._handleButtonCancel },
              "Aceptar"
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        if (this.props.product.RAMOPTVC == "MS" || this.props.product.RAMOPTVC == "EC" || this.props.product.RAMOPTVC == "CU" || this.props.product.RAMOPTVC == "SE" || this.props.product.RAMOPTVC == "AP") {
          this.setState({ validRamo: true });
        } else {
          this.setState({ validRamo: false });
        }

        this.retiroController.getEmployees(function (data) {
          _this3.setState({ list: data });
          var employeesList = _this3.state.list.employees;
          var stateList = employeesList.map(function (employee) {
            return employee.ESTADO;
          });
          _this3.setState({ stateList: stateList });
        });
      }
    }]);

    return EmployeesList;
  }(React.Component);

  return EmployeesList;
});