var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "../../../common/loader", "../../../common/modalReactBootstrap", "../../../controller/retiroNominaController", "../../../controller/vidaColectivoController", "./formPointBurial", "./familyGroup", "../individualCollection", "./bonusBurial", "../../../lib/utils"], function (React, Loadsh, Loader, ModalReactBootstrap, RetiroNominaController, VidaColectivoController, FormPointBurial, FamilyGroup, IndividualCollection, BonusBurial, Utils) {
  var AdditionFormBurial = function (_React$Component) {
    _inherits(AdditionFormBurial, _React$Component);

    function AdditionFormBurial(props) {
      _classCallCheck(this, AdditionFormBurial);

      var _this2 = _possibleConstructorReturn(this, (AdditionFormBurial.__proto__ || Object.getPrototypeOf(AdditionFormBurial)).call(this, props));

      _this2._handleResults = function (id, result) {
        _this2.formData[id] = result;
        if (result.value !== "") {
          _this2.handleVerificationBrand(id, result);
        }
      };

      _this2._handleFormValidation = function (saveForm) {
        var field = _this2.formData;
        var validated = true;
        var errorsList = [];
        var emptyFields = true;
        var _this = _this2;
        return new Promise(function (resolve, reject) {
          Object.keys(field).map(function (element) {
            //Se excluyen los campos que no son obligatorios y los que estan ocultos
            if (field[element] === null) {
              return;
            }
            if (field[element].required && field[element].referencies.current != null) {
              //Se agrega parametro saveForm para utilizar la misma funcion para guardar y enviar el formulario
              if (field[element].value == "" && saveForm != "saveForm") {
                field[element].referencies.current._onFocus(true);
                errorsList[0] = "Complete los campos indicados";
                emptyFields = true;
                validated = false;
              } else {
                if (field[element].isValidate == false && field[element].value != "") {
                  field[element].referencies.current._onFocus(true);
                  if (field[element].formatText != undefined) {
                    errorsList.push(field[element].formatText);
                  }
                  emptyFields = false;
                  validated = false;
                }
              }
            }
            if (saveForm != "saveForm") {
              if (element == "applicantOwner" && field["applicantOwner"].id == 0 && _this.state.showPayment == "S") {
                errorsList[2] = "Complete los campos. Check de forma de pago";
                validated = false;
                emptyFields = false;
              }
            }
          });

          ///Aca chekeamos si debemos validar o no, y si tenemos 15 o 16 numeros en la tarjeta, en todos los casos debe terminar llamando a la funcion que va a chequear si esta validado y la lista de errores para mostrar el modal.
          if (_this.state.showPayment == "S" && saveForm != "saveForm") {
            if (field["applicantCardNumber"].value.length < 17 && field["applicantCardNumber"].value.length > 14) {
              //aca se llama a validar la forma de pago, se espera a que devuelva un resultado y con la data conseguida se llena o no el error de la tarjeta
              _this._validateFormaPago(_this.vidaColectivoController, _this.state).then(function (data) {
                _this.handleBrand(data);
                if (_this.state.brandMessage !== "") {
                  errorsList[1] = "Error en tarjeta";
                  _this.setState({ validationBrand: "Error en tarjeta" });
                  field["applicantCardNumber"].referencies.current.isValidate = false;
                  field["applicantCardNumber"].referencies.current._onFocus(true);
                  validated = false;
                  emptyFields = false;
                } else if (_this.state.brandMessage == "") {
                  _this.setState({ validationBrand: "" });
                }
                _this.setState.bind(validacionFinal);
                //Este resolve vuelve al if de handleSendForm, donde estan esperando la respuesta para continuar con el envio o no
                resolve(validacionFinal(validated, errorsList, emptyFields));
              });
            } else {
              errorsList.push("La longitud de la tarjeta ingesada no es correcta");
              _this.setState({ validationBrand: "La longitud de la tarjeta ingesada no es correcta" });
              field["applicantCardNumber"].referencies.current.isValidate = false;
              field["applicantCardNumber"].referencies.current._onFocus(true);
              validated = false;
              emptyFields = false;
              _this.setState.bind(validacionFinal);
              resolve(validacionFinal(validated, errorsList, emptyFields));
            }
          }
          // Siempre validar la fecha de nacimiento
          var dateNacimiento = Utils.formatPolizaDate(_this.props.product.FEC_NAC);
          var aniosAhora = Utils.fAgeCalc(dateNacimiento);
          if (aniosAhora > _this.props.listPoliza.EDADMAXG) {
            errorsList.push("La edad del asegurado titular es superior a la edad máxima de ingreso de la póliza");
            field["applicantDateBirth"].referencies.current.isValidate = false;
            field["applicantDateBirth"].referencies.current._onFocus(true);
            validated = false;
            emptyFields = false;
          }
          _this.setState.bind(validacionFinal);
          resolve(validacionFinal(validated, errorsList, emptyFields));
        });

        function validacionFinal(validated, errorsList, emptyFields) {
          if (!validated) {
            _this.setState({
              showModal: true,
              modal: {
                size: "md",
                title: "Validación de campos",
                component: _this._handleErrorsList(errorsList, emptyFields)
              } });

            return false;
          } else {
            return true;
          }
        };
      };

      _this2._validateFormaPago = function (vidaColectivoController, state, handleBrand) {
        return new Promise(function (resolve, reject) {
          vidaColectivoController.getValFormaCobro(0, state.cardNumber, state.brand, 0, Number(state.dateM + state.dateY), function (data) {
            resolve(data);
          });
        });
      };

      _this2.handleRepeatZero = function (polAnn, polSec) {
        var zero = "0";
        var long = polSec.toString().length;
        if (polAnn.toString().length == "1") {
          polAnn = "0" + polAnn;
        }
        for (var i = 7; i >= 0; i--) {
          if (i + long == 6) {
            return polAnn + "-" + zero.repeat(i) + polSec;
          }
        }
      };

      _this2.handlePlus = function (product) {
        if (product == "AP" || product == "EC" || product == "CU") {
          return _this2.props.listPoliza.CAPITMAX;
        } else if (product == "MS") {
          return _this2.state.policy;
        } else return "";
      };

      _this2.handleCobertura = function (cobertura) {
        var listCobertura = cobertura.map(function (cober) {
          return {
            COBERTURA: {
              COBERCOD: cober.COBERCOD,
              COBERDES: cober.COBERDES
            }
          };
        });
        return listCobertura;
      };

      _this2.handleSetSons = function () {
        var listSon = _this2.state.listSon.map(function (beneficiary) {
          return {
            EXPEDNUMH: beneficiary.NOMINAS.GRUPOCOD,
            DOCUMTIPH: Number(beneficiary.NOMINAS.TIPDOCBENE),
            DOCUMDATH: beneficiary.NOMINAS.NUMDOCBENE,
            CLIENAPEH: beneficiary.NOMINAS.APEBENE,
            CLIENNOMH: beneficiary.NOMINAS.BENNOMBRE,
            CLIENSEXH: "",
            FECNACIMH: Number(beneficiary.NOMINAS.FNACIMIE),
            CAPITASGH: 0
          };
        });
        return listSon;
      };

      _this2.handleSetParent = function () {
        var listParent = _this2.state.listParent.map(function (beneficiary) {
          return {
            EXPEDNUMP: beneficiary.NOMINAS.GRUPOCOD,
            DOCUMTIPP: Number(beneficiary.NOMINAS.TIPDOCBENE),
            DOCUMDATP: beneficiary.NOMINAS.NUMDOCBENE,
            CLIENAPEP: beneficiary.NOMINAS.APEBENE,
            CLIENNOMP: beneficiary.NOMINAS.BENNOMBRE,
            CLIENSEXP: "",
            FECNACIMP: Number(beneficiary.NOMINAS.FNACIMIE),
            CAPITASGP: 0
          };
        });
        return listParent;
      };

      _this2.handleBeneficiary = function (list) {
        var relacion = void 0;
        var listBeneficiary = list.map(function (beneficiary) {
          relacion = _this2.state.listParentesco.find(function (element) {
            return parseInt(element.GRUPOCOD) == beneficiary.NOMINAS.RELBECOD;
          });
          if (relacion.GRUPOCOD == "0000000100" || relacion.GRUPOCOD == "0000000101") {
            beneficiary.NOMINAS.GRUPOCOD = relacion.GRUPOCOD;
            _this2.state.listParent.push(beneficiary);
          } else if (relacion.GRUPOCOD == "0000000002") {
            beneficiary.NOMINAS.GRUPOCOD = relacion.GRUPOCOD;
            _this2.state.listSon.push(beneficiary);
          } else if (relacion.GRUPOCOD == "0000000050") {
            beneficiary.NOMINAS.GRUPOCOD = relacion.GRUPOCOD;
            _this2.state.listSpouse.push(beneficiary);
          }
          return {
            FAMILIAR: {
              APELLIDO: beneficiary.NOMINAS.APEBENE,
              NOMBRE: beneficiary.NOMINAS.BENNOMBRE,
              ORDEN: "",
              EMAIL: "",
              PORCENT: "",
              TELEFONO: "",
              FECNAC: Utils.formatFechaString(beneficiary.NOMINAS.FNACIMIE),
              DOCUM: beneficiary.NOMINAS.NUMDOCBENE,
              RELACION: relacion.GRUPODES
            }
          };
        });
        return listBeneficiary;
      };

      _this2._handleSendForm = function () {
        _this2.props.product.CAPITMAX = _this2.props.listPoliza.CAPITMAX;
        _this2.handleTestBonus(_this2.formData);

        _this2._handleFormValidation().then(function (validado) {
          if (validado) {

            _this2.setState({ loading: false });
            _this2.setState({ isLoaded: true });
            _this2.state.listSon = [];
            _this2.state.listParent = [];
            var familiares = _this2.handleBeneficiary(_this2.formData.listBenef.list);
            var nroPol = _this2.handleRepeatZero(_this2.props.product.POL_ANN, _this2.props.product.POL_SEC);
            var plus = _this2.handlePlus(_this2.props.recoverPayrollEmployees.TIP_PRO); //funcion que   devuelve la suma o el monto ingresado
            var coberturas = _this2.handleCobertura(_this2.props.listPoliza.COBERTURAS.COBERTURA);
            var son = _this2.handleSetSons();
            var parent = _this2.handleSetParent();
            _this2.vidaColectivoController.saveRequest(_this2.formData, _this2.props.recoverPayrollEmployees, function (saveData) {
              if (saveData != "ERROR") {
                var requestNumber = saveData.RESULTADO[0].RET;
                _this2.props.handleSetRequestNumber(requestNumber, "G");
                _this2.controller.changePayrollStatus(_this2.props.recoverPayrollEmployees, "G", requestNumber, function (stateData) {
                  if (stateData == "NO_ERROR") {
                    _this2.vidaColectivoController.sendApplication({
                      "GENPDF": {
                        "repId": "SO_SE_SOLI",
                        "jsonDataSource": {
                          "DATOS": {
                            "SEGURO": {
                              "TIPO": _this2.props.recoverPayrollEmployees.TIP_PRO,
                              "TPRDA1": _this2.props.recoverPayrollEmployees.TPR_DA1,
                              "TPRDA2": _this2.props.recoverPayrollEmployees.TPR_DA2,
                              "TPRDA3": _this2.props.recoverPayrollEmployees.TPR_DA3,
                              "POLIZA": _this2.props.product.COD_PRO + "-" + _this2.props.product.POL_ANN + "-" + _this2.props.product.POL_SEC,
                              "OPERACION": _this2.props.product.NRO_SOL,
                              "SUMA": plus,
                              "ALCANCE": _this2.props.listPoliza.DESCRCPO,
                              "PRECARGA": _this2.props.listPoliza.PRECARGA,
                              "MONEDA": _this2.props.listPoliza.MONENCOD,
                              "COBIND": _this2.props.listPoliza.MDCECOIND
                            },
                            "COBERTURAS": coberturas,
                            "ASEGURADO": _defineProperty({
                              "APELLIDO": _this2.formData.applicantSurname.value,
                              "NOMBRE": _this2.formData.applicantName.value,
                              "CUIL": _this2.formData.applicantCuilNumber.value,
                              "FECNAC": _this2.formData.applicantDateBirth.value,
                              "OCUPACION": "",
                              "DIRCALLE": _this2.formData.applicantStreet.value,
                              "DIRNUM": _this2.formData.applicantNumber.value,
                              "DIRPISO": _this2.formData.applicantFloor.value,
                              "DIRDEPTO": _this2.formData.applicantDepartment.value,
                              "DIRLOCAL": _this2.formData.applicantLocality.value,
                              "DIRCODPOS": _this2.formData.applicantCP.id,
                              "DIRPROVI": _this2.formData.applicantProvince.value,
                              "TELEFONO": _this2.formData.applicantAreaTel.value + "-" + _this2.formData.applicantTelephone.value,
                              "EMAIL": _this2.formData.applicantEmail.value,
                              "LUGNAC": _this2.formData.applicantCityBorn.value,
                              "NACIONAL": _this2.formData.applicantNationality.value,
                              "SEXO": _this2.formData.applicantGender.value,
                              "ESTCIV": _this2.formData.applicantCivilStatus.value,
                              "CONDIVA": _this2.formData.applicantIVA.value
                            }, "DIRCODPOS", _this2.formData.applicantCP.value),
                            "TOMADOR": {
                              "RAZSOC": _this2.props.listPoliza.NOMBYAPE,
                              "CUIT": _this2.props.listPoliza.CUIT,
                              "CONDIVA": _this2.props.listPoliza.CIVADESC,
                              "ACTIVIDAD": _this2.props.listPoliza.PROFEDES,
                              "DIRCALLE": _this2.props.listPoliza.DOMICDOM,
                              "DIRNUM": _this2.props.listPoliza.DOMICDNU,
                              "DIRPISO": _this2.props.listPoliza.DOMICPIS,
                              "DIRDEPTO": _this2.props.listPoliza.DOMICPTA, //departamento
                              "DIRLOCAL": _this2.props.listPoliza.DOMICPOB, //descripcion  de la localidad
                              "DIRCODPOS": _this2.props.listPoliza.CPACODPO, //codigo postal
                              "DIRPROVI": _this2.props.listPoliza.PROVIDES, //descripcion  de la provincia
                              "TELEFONO": _this2.props.listPoliza.DOMICTLF,
                              "EMAIL": ""
                            },
                            "CONYUGE": {},
                            "FAMILIARES": familiares,
                            "BENEFICIARIOS": {}
                          }
                        }
                      },
                      "FILREP": {
                        "COD_PRO": _this2.props.product.COD_PRO,
                        "NRO_OPE": _this2.props.product.NRO_SOL,
                        "TIP_ARC": "application/pdf",
                        "DES_ARC": "Solicitud",
                        "IDE_ARC": "PDF_GEN_SOL",
                        "COD_USU": "USRVC",
                        "APE_USU": "USRVC",
                        "NRO_POL": nroPol,
                        "POL_ANN": _this2.props.product.POL_ANN,
                        "POL_SEC": _this2.props.product.POL_SEC,
                        "ASE_APE": _this2.props.product.ASE_APE,
                        "ASE_NOM": _this2.props.product.ASE_NOM,
                        "TOM_TDO": _this2.props.product.TOM_TDO,
                        "TOM_NDO": _this2.props.product.TOM_NDO,
                        "TOM_APE": _this2.props.product.TOM_APE,
                        "TOM_NOM": ""
                      },
                      "INTASE": {
                        "RAMOPCOD": _this2.props.product.COD_PRO,
                        "POLIZANN": _this2.props.product.POL_ANN,
                        "POLIZSEC": _this2.props.product.POL_SEC,
                        "EXPEDNUM": "0000000001",
                        "CLIENAPE": _this2.props.product.ASE_APE,
                        "CLIENNOM": _this2.props.product.ASE_NOM,
                        "CLIENSEX": _this2.formData.applicantGender.id,
                        "FECNACIM": Utils.formatFechaNumber(_this2.formData.applicantDateBirth.value),
                        "DOCUMTIP": Number(_this2.props.product.TIP_DOC),
                        "DOCUMDAT": _this2.props.product.NRO_DOC,
                        "COBROTIP": _this2.formData.applicantPayment ? _this2.formData.applicantPayment.id : "",
                        "CUENTNUM": _this2.formData.applicantCardNumber ? _this2.formData.applicantCardNumber.value : "",
                        "CUENTVIS": _this2.formData.applicantBrand ? _this2.formData.applicantBrand.code : "",
                        "FECVENCI": _this2.formData.applicantDateMonth && _this2.formData.applicantDateYear ? Number(_this2.formData.applicantDateYear.value + _this2.formData.applicantDateMonth.value + "01") : 0,
                        "DOMICDOM": _this2.formData.applicantStreet.value,
                        "DOMICDNU": _this2.formData.applicantNumber.value,
                        "DOMICPIS": _this2.formData.applicantFloor.value,
                        "DOMICPTA": _this2.formData.applicantDepartment.value,
                        "CPACODPO": _this2.formData.applicantCP.value,
                        "PROVICOD": Number(_this2.formData.applicantProvince.id),
                        "IMPSUELD": 0,
                        "MULTIPLO": 0,
                        "CAPITASG": _this2.props.listPoliza.CAPITMAX,
                        "CONYUGE": _this2.state.listSpouse.length !== 0 ? "S" : "N",
                        "EXPEDNUMC": _this2.state.listSpouse.length !== 0 ? _this2.state.listSpouse[0].NOMINAS.GRUPOCOD : "",
                        "DOCUMTIPC": _this2.state.listSpouse.length !== 0 ? Number(_this2.state.listSpouse[0].NOMINAS.TIPDOCBENE) : 0,
                        "DOCUMDATC": _this2.state.listSpouse.length !== 0 ? _this2.state.listSpouse[0].NOMINAS.NUMDOCBENE : "",
                        "CLIENAPEC": _this2.state.listSpouse.length !== 0 ? _this2.state.listSpouse[0].NOMINAS.APEBENE : "",
                        "CLIENNOMC": _this2.state.listSpouse.length !== 0 ? _this2.state.listSpouse[0].NOMINAS.BENNOMBRE : "",
                        "CLIENSEXC": "",
                        "FECNACIMC": _this2.state.listSpouse.length !== 0 ? Number(_this2.state.listSpouse[0].NOMINAS.FNACIMIE) : 0,
                        "CAPITASGC": 0,
                        "PADSUES": parent,
                        "HIJOS": son
                      },
                      "INTBEN": {
                        "RAMOPCOD": _this2.props.product.COD_PRO,
                        "POLIZANN": _this2.props.product.POL_ANN,
                        "POLIZSEC": _this2.props.product.POL_SEC,
                        "CERTIPOL": _this2.props.product.CER_POL,
                        "CERTIANN": _this2.props.product.CER_ANN,
                        "CERTISEC": _this2.props.product.CER_SEC,
                        "DOCUMTIP": Number(_this2.props.product.TIP_DOC),
                        "DOCUMDAT": _this2.props.product.NRO_DOC,
                        "NOMINA": []
                      },
                      "ENVEMA": {
                        "POL_ANN": _this2.props.product.POL_ANN,
                        "POL_SEC": _this2.props.product.POL_SEC,
                        "ASE_APE": _this2.props.product.ASE_APE,
                        "ASE_NOM": _this2.props.product.ASE_NOM,
                        "TOM_TDO": _this2.props.product.TOM_TDO,
                        "TOM_NDO": _this2.props.product.TOM_NDO,
                        "DES_PRO": _this2.props.product.DES_PRO,
                        "TOM_APE": _this2.props.listPoliza.NOMBYAPE,
                        "TOM_NOM": ""
                      }
                    }, function (callBack) {
                      if (callBack.RESTS == "OK") {
                        _this2.props.handleSetRequestNumber(requestNumber, "E");
                        _this2.controller.changePayrollStatus(_this2.props.recoverPayrollEmployees, "E", requestNumber, function (stateData) {
                          if (stateData == "NO_ERROR") {
                            _this2.props.handleSwitch("sendOk");
                          } else {
                            _this2._handleErrorServices("El servicio de cambio de estado del formulario no esta   disponible, por favor intentalo más tarde");
                          }
                        });
                      } else {
                        _this2._handleErrorServices("Se ha producido un error al intentar enviar la solicitud ($ {callBack} )");
                      }
                    });
                  } else {
                    _this2._handleErrorServices("El servicio de envio del formulario no esta disponible, por favor  intentalo más tarde");
                  }
                });
              } else {
                _this2._handleErrorServices("El servicio de envio del formulario no esta disponible, por favor  intentalo más tarde");
              }
            });
          }
        });
      };

      _this2._handleErrorServices = function (errorText) {
        _this2.setState({
          loading: false,
          isLoaded: false,
          showModal: true,
          modal: {
            size: "md",
            title: "Error de servicio",
            component: React.createElement(
              "p",
              null,
              errorText
            )
          }
        });
      };

      _this2.handleTestBonus = function (data) {
        var total = void 0;
        if (data.applicantHijos && data.applicantHijos.value !== undefined) {
          total = Number(data.applicantHijos.value);
        }if (data.applicantTitular && data.applicantTitular.value !== undefined) {
          total += Number(data.applicantTitular.value);
        }if (data.applicantConyuge && data.applicantConyuge.value !== undefined) {
          total += Number(data.applicantConyuge.value);
        }if (data.applicantParent && data.applicantParent.value !== undefined) {
          total += Number(data.applicantParent.value);
        }
        result = {
          value: total,
          isValidate: true
        };
        _this2._handleResults("applicantTotal", result);
      };

      _this2._handleSaveForm = function () {
        _this2.props.product.CAPITMAX = _this2.props.listPoliza.CAPITMAX;
        _this2.handleTestBonus(_this2.formData);
        _this2._handleFormValidation("saveForm").then(function (validado) {
          if (validado) {
            _this2.setState({ loading: false });
            _this2.vidaColectivoController.saveRequest(_this2.formData, _this2.props.product, function (saveData) {
              if (saveData != "ERROR") {
                var requestNumber = saveData.RESULTADO[0].RET;
                _this2.props.handleSetRequestNumber(requestNumber, "G");
                _this2.controller.changePayrollStatus(_this2.props.product, "G", requestNumber, function (stateData) {
                  if (stateData == "NO_ERROR") {
                    _this2.props.handleSwitch("saveOk");
                  } else {
                    _this2._handleErrorServices("El servicio de cambio de estado del formulario no esta disponible, por favor intentalo más tarde");
                  }
                });
              } else {
                _this2._handleErrorServices("El servicio de guardado del formulario no esta disponible, por favor intentalo más tarde");
              }
            });
          }
        });
      };

      _this2.handleBrand = function (data) {
        _this2.setState({ brandMessage: data });
      };

      _this2.handleVerificationBrand = function (id, result) {
        if (id == "applicantBrand" || id == "applicantDateYear" || id == "applicantDateMonth" || id == "applicantCardNumber" && result.value.length > 14) {
          switch (id) {
            case "applicantBrand":
              _this2.state.brand = result.code;
              break;
            case "applicantCardNumber":
              _this2.state.cardNumber = result.value;
              break;
            case "applicantDateMonth":
              _this2.state.dateM = "1" + result.value;
              break;
            case "applicantDateYear":
              _this2.state.dateY = result.value;
              break;
          }
          // }
          if (_this2.state.brand !== "" && _this2.state.cardNumber !== "" && _this2.state.dateM !== "" && _this2.state.dateY !== "") {
            _this2.vidaColectivoController.getValFormaCobro(0, _this2.state.cardNumber, _this2.state.brand, 0, Number(_this2.state.dateM + _this2.state.dateY), function (data) {
              _this2.handleBrand(data);
            });
          }
        }
      };

      _this2._handleErrorsList = function (errorsList, emptyFields) {
        /**se agrega este control porque puede que un ultimo valor deje emptyfields en true y no muestra la lista */
        if (errorsList.length > 1 && emptyFields) {
          var errors = errorsList.map(function (errorText) {
            return React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                errorText
              )
            );
          });
          return errors;
        }
        if (emptyFields) {
          return React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              errorsList[0]
            )
          );
        } else {
          var _errors = errorsList.map(function (errorText) {
            return React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                errorText
              )
            );
          });
          return _errors;
        }
      };

      _this2._handleCompareObjects = function (object1, object2) {
        var areEqual = true;
        var elementsObj1 = Object.keys(object1);
        var elementsObj2 = Object.keys(object2);
        if (elementsObj1.length == elementsObj2.length) {
          Object.keys(object1).map(function (item) {
            if (object1[item].value != object2[item].value || object1[item].id != object2[item].id) {
              areEqual = false;
            }
          });
        } else {
          areEqual = false;
        }
        return areEqual;
      };

      _this2._handleBackButton = function () {
        if (_this2._handleCompareObjects(_this2.formData, _this2.firstFormData)) {
          _this2.props.handleShowAdditionRequestColectivo();
        } else {
          _this2.setState({
            showModal: true,
            modal: {
              size: "md",
              title: "Volver",
              component: React.createElement(
                "p",
                null,
                "\xBFDeseas guardar los datos completados?"
              ),
              classAccept: "confirm-btn-modal",
              textBtnAccept: "Si",
              textBtnCancel: "No"
            }
          });
        }
      };

      _this2._handleModalIsOpen = function (e) {
        var current = _this2.state.showModal;
        _this2.setState({
          showModal: !current
        });
        if (e.target.id == "cancelButtonModal") {
          _this2.props.handleShowAdditionRequestColectivo();
        }
      };

      _this2.state = {
        showModal: false,
        loading: false,
        isLoaded: false,
        nameBurial: "",
        group: [],
        listParentesco: [],
        listParent: [],
        listSon: [],
        listSpouse: [],
        /*validaciones tarjeta*/
        brand: "",
        cardNumber: "",
        dateM: "",
        dateY: "",
        showPayment: "",
        brandMessage: "",
        validationBrand: false,
        total: "",
        modal: {
          component: "",
          title: "",
          size: "md",
          classAccept: "",
          textBtnAccept: "",
          textBtnCancel: ""
        }
      };
      _this2.formData = {};
      _this2.firstFormData = {};
      _this2.controller = new RetiroNominaController();
      _this2.vidaColectivoController = new VidaColectivoController();
      return _this2;
    }
    /**con esta funcion el total de bonus queda actualizado */

    /**funcion para la verificacion de tarjetas */


    _createClass(AdditionFormBurial, [{
      key: "render",
      value: function render() {
        if (!this.state.loading || this.state.isLoaded) {
          var _React$createElement;

          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "h3",
              { className: "subtitle-inside" },
              this.props.product.TPR_DA1 === "R" ? "Solicitud de Sepelio (Reintegro de Gastos) – \n Adhesión Individual" : this.props.product.TPR_DA1 === "P" ? "Solicitud de Sepelio (Prestación de Servicios) – \n Adhesión Individual" : "Solicitud de Sepelio – \n Adhesión Individual"
            ),
            React.createElement(
              "section",
              { className: "row" },
              React.createElement(
                "article",
                { className: "col small" },
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "b",
                    null,
                    "ART\xCDCULO 5\xB0 DE LA LEY 17.418 "
                  ),
                  " \u201CTODA DECLARACI\xD3N FALSA O TODA RETICENCIA DE CIRCUNSTANCIAS CONOCIDAS POR EL ASEGURADO, A\xDAN HECHAS DE BUENA FE, QUE A JUICIO DE PERITOS HUBIESE IMPEDIDO EL CONTRATO O MODIFICADO SUS CONDICIONES SI EL ASEGURADOR HUBIESE SIDO CERCIORADO DEL VERDADERO ESTADO DEL RIESGO, HACE NULO EL CONTRATO.\u201D"
                ),
                React.createElement(
                  "p",
                  null,
                  " ",
                  React.createElement(
                    "b",
                    null,
                    "EXCLUSI\xD3N DE OTROS SEGUROS:"
                  ),
                  " QUEDA EXPRESAMENTE ESTIPULADO QUE NINGUNA PERSONA ASEGURADA BAJO ESTA P\xD3LIZA PODR\xC1 ESTAR INCORPORADA O INCORPORARSE EN EL FUTURO A OTRO SEGURO DE SEPELIO, INDIVIDUAL O COLECTIVO, CONTRATADO CON EL ASEGURADOR U OTRA ENTIDAD ASEGURADORA. EN CASO DE TRANSGRESI\xD3N A LO EXPUESTO PRECEDENTEMENTE Y EN CASO DE PRODUCIRSE EL EVENTO CUBIERTO CADA ASEGURADOR CONTRIBUIR\xC1 PROPORCIONALMENTE AL MONTO DE SU CONTRATO."
                )
              ),
              React.createElement(
                "article",
                { className: "col small" },
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "b",
                    null,
                    "IMPORTANTE:"
                  ),
                  " \u201CLAS ACCIONES FUNDADAS EN EL CONTRATO DE SEGURO PRESCRIBEN EN EL PLAZO DE UN (1) A\xD1O, COMPUTADO DESDE QUE LA CORRESPONDIENTE OBLIGACI\xD3N ES EXIGIBLE, (...) EN EL SEGURO DE VIDA, EL PLAZO DE PRESCRIPCI\xD3N PARA EL BENEFICIARIO SE COMPUTA DESDE QUE CONOCE LA EXISTENCIA DEL BENEFICIO, PERO EN NING\xDAN CASO EXCEDER\xC1 DE TRES (3) A\xD1OS DESDE EL SINIESTRO. (ART. 58 LEY 17.418)\u201D"
                ),
                React.createElement(
                  "p",
                  null,
                  React.createElement(
                    "i",
                    null,
                    " SOLICITO SER INCLUIDO EN EL PLAN DE SEGURO COLECTIVO DE SEPELIO - COBERTURA PRESTACIONAL / REINTEGRO DE GASTOS DE SEPELIO (SEG\xDAN CORRESPONDA) POR LA SUMA QUE TENGA O PUEDA TENER DERECHO DE ACUERDO A LAS CONDICIONES CONVENIDAS CON HSBC SEGUROS DE VIDA (ARGENTINA) S.A. A QUIEN ME COMPROMETO A ABONAR EL PREMIO CORRESPONDIENTE."
                  )
                )
              )
            ),
            React.createElement(
              "h5",
              { className: "mb-2" },
              "Datos del asegurado titular"
            ),
            React.createElement(FormPointBurial, (_React$createElement = {
              formInfo: this.props.formInfo,
              data: this.props.data,
              product: this.props.product,
              docTypeList: this.props.docTypeList,
              provincesList: this.props.provincesList,
              cuitList: this.props.cuitList,
              depoActivitiesList: this.props.depoActivitiesList
            }, _defineProperty(_React$createElement, "cuitList", this.props.cuitList), _defineProperty(_React$createElement, "sexoList", this.props.sexoList), _defineProperty(_React$createElement, "countriesList", this.props.countriesList), _defineProperty(_React$createElement, "civilStatusList", this.props.civilStatusList), _defineProperty(_React$createElement, "onResults", this._handleResults), _defineProperty(_React$createElement, "readOnly", this.props.readOnly), _React$createElement)),
            React.createElement(
              "h5",
              { className: "mb-2 mt-2" },
              "Calcul\xE1 el costo de tu seguro"
            ),
            React.createElement(
              BonusBurial,
              {
                formInfo: this.props.formInfo,
                applicantData: this.formData,
                group: this.state.group,
                nameBurial: this.state.nameBurial,
                product: this.props.product,
                docTypeList: this.props.docTypeList,
                handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary,
                user: this.props.user,
                onResults: this._handleResults,
                readOnly: this.props.readOnly,
                listPoliza: this.props.listPoliza
              },
              " "
            ),
            React.createElement(
              "h5",
              { className: "mb-2 mt-2" },
              "Datos del grupo familiar asegurable"
            ),
            React.createElement(
              FamilyGroup,
              {
                applicantData: this.formData,
                beneficiaryList: this.props.formInfo.beneficiaryList,
                product: this.props.product,
                listParentesco: this.state.listParentesco,
                docTypeList: this.props.docTypeList,
                handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary,
                user: this.props.user,
                onResults: this._handleResults,
                readOnly: this.props.readOnly,
                listPoliza: this.props.listPoliza
              },
              " "
            ),
            this.state.showPayment == "S" ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "h5",
                { className: "mb-2 mt-2" },
                "Forma de pago"
              ),
              React.createElement(IndividualCollection, {
                formInfo: this.props.formInfo,
                onResults: this._handleResults,
                listTipoYear: this.props.listTipoYear,
                validationBrand: this.state.validationBrand,
                paymentType: this.props.paymentType,
                brand: this.props.brand,
                readOnly: this.props.readOnly,
                showPlaceHolder: true
              })
            ) : "",
            React.createElement(
              "div",
              null,
              React.createElement(
                "p",
                null,
                React.createElement(
                  "b",
                  null,
                  "ENTREGA POR MEDIOS ELECTR\xD3NICOS: "
                ),
                "Autorizo a la aseguradora a enviar informaci\xF3n de los productos contratados y de inter\xE9s de la compa\xF1\xEDa a la direcci\xF3n de correo indicada previamente. En caso de que la solicitud resulte aprobada y que haya aceptado recibir por medio electr\xF3nico cualquier documentaci\xF3n que la aseguradora deba enviarme en virtud de la p\xF3liza, ser\xE1n enviadas a la direcci\xF3n de correo electr\xF3nico indicada. Asimismo, cualquier cambio de correo electr\xF3nico, deber\xE1 ser comunicado por mi parte a la aseguradora."
              ),
              React.createElement(
                "p",
                null,
                React.createElement(
                  "b",
                  null,
                  " PROTECCI\xD3N DE DATOS PERSONALES: "
                ),
                "Por medio de la presente el titular de los datos personales presta absoluta conformidad y autoriza expresamente a la aseguradora a:",
                React.createElement("br", null),
                "A) Consultar, utilizar, suministrar o transferir a terceros la informaci\xF3n contenida en la presente solicitud, en virtud del cumplimiento de un contrato de prestaci\xF3n de servicios suscripto por la aseguradora.",
                React.createElement("br", null),
                "B) Transferir a empresas vinculadas o no al grupo HSBC, radicadas en la rep\xFAblica argentina o en el exterior, sus datos personales, ya sea para fines de evaluaci\xF3n crediticia, operativos, de almacenamiento de datos o de oferta de servicios y productos de las empresas del grupo HSBC.",
                React.createElement("br", null),
                "C) Transferir sus datos personales e informaci\xF3n sobre productos contratados, cuando estos sean requeridos por autoridades impositivas y/o fiscales nacionales o extranjeras radicadas fuera del pa\xEDs, debidamente facultadas para ello. El titular de los datos personales puede revocar este consentimiento en cualquier momento."
              ),
              React.createElement(
                "p",
                null,
                React.createElement(
                  "small",
                  null,
                  "En cumplimiento de lo establecido por el art. 6 de la ley 25.326, se informa que sus datos est\xE1n siendo recabados con los siguientes fines: para cotizar su seguro y, de ser aceptada la propuesta, para emitir una p\xF3liza y para todo aquello que sea necesario para cumplir con lo establecido en la normativa vigente en materia de derecho de seguros. Asimismo, le informamos que sus datos formar\xE1n parte de un banco de datos electr\xF3nicos cuyo titular es HSBC seguros de Vida (argentina) S.A. (Bouchard 557, piso 20\xB0, C.A.B.A.). Los datos aqu\xED solicitados son obligatorios con el fin de poder cotizar correctamente su seguro y se considera que los mismos son exactos y veraces. Adem\xE1s, se le informa de la facultad de ejercer el derecho de acceso a sus datos personales en forma gratuita en intervalos no inferiores a seis meses, salvo que acredite un inter\xE9s leg\xEDtimo al efecto, y asimismo que tiene derecho, de ser procedente, a rectificar y/o suprimir dichos datos (arts. 14,15 y 16 de la ley n\xB0 25.326). Resoluci\xF3n AAIP 14/2018: \u201Cla AGENCIA DE ACCESO A LA INFORMACI\xD3N P\xDABLICA, en su car\xE1cter de \xD3rgano de Control de la Ley n\xBA 25.326, tiene la atribuci\xF3n de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protecci\xF3n de datos personales\u201D."
                )
              ),
              React.createElement(
                "p",
                null,
                " ",
                React.createElement(
                  "b",
                  null,
                  "PREVENCI\xD3N DE LAVADO DE ACTIVOS Y FINANCIAMIENTO DEL TERRORISMO: "
                ),
                "el asegurado asume la carga de aportar los datos y documentos que le sean requeridos por la aseguradora en virtud de lo establecido por las normas vigentes en materia de prevenci\xF3n de lavado de activos y financiamiento de terrorismo. Caso contrario, la aseguradora dar\xE1 cumplimiento a lo establecido en las resoluciones UIF vigentes en la materia."
              )
            ),
            React.createElement(
              "div",
              { className: "row justify-content-md-center col-md-12 text-center" },
              this.state.isLoaded ? React.createElement(Loader, { width: "1.5rem", height: "1.5rem" }) : "",
              React.createElement(
                "button",
                {
                  className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleSendForm,
                  disabled: this.state.isLoaded
                },
                "Enviar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleSaveForm,
                  disabled: this.state.isLoaded
                },
                "Guardar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleBackButton,
                  disabled: this.state.isLoaded
                },
                "Volver"
              )
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModal,
              size: this.state.modal.size,
              component: this.state.modal.component,
              isOpen: this._handleModalIsOpen,
              accept: this.state.modal.textBtnAccept == "Si" ? this._handleSaveForm : false,
              classAccept: this.state.modal.classAccept,
              textBtnAccept: this.state.modal.textBtnAccept,
              textBtnCancel: this.state.modal.textBtnCancel
            })
          );
        } else {
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
        var listParentesco = this.props.listPoliza.GRUPOS.GRUPO.filter(function (e) {
          return parseInt(e.GRUPOCOD) != 1;
        });
        this.setState({ listParentesco: listParentesco });
        if (this.props.product.TPR_DA1 == "P") {
          this.setState({ nameBurial: "Sepelio-Servicio" });
        } else if (this.props.product.TPR_DA1 == "R") {
          this.setState({ nameBurial: "Sepelio-Reintegro" });
        }
        this.setState({ showPayment: this.props.listPoliza.MDCECOIND });

        this.setState({ group: this.props.listPoliza.GRUPOS.GRUPO });
        this.firstFormData = Loadsh.cloneDeep(this.formData);
      }
    }]);

    return AdditionFormBurial;
  }(React.Component);

  return AdditionFormBurial;
});