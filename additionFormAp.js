var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "../../../common/loader", "../../../common/formaPago", "./formPointAp", "./formPointApConyuge", "../typeBeneficiary", "./ApQuote", "../../../common/modalReactBootstrap", "../../../controller/retiroNominaController", "../../../controller/vidaColectivoController", "../../../controller/endososController", "../individualCollection", "../../../lib/utils"], function (React, Loadsh, Loader, FormaPago, FormPointAp, FormPointApConyuge, TypeBeneficiary, ApQuote, ModalReactBootstrap, RetiroNominaController, VidaColectivoController, EndososController, IndividualCollection, Utils) {
  var AdditionFormAp = function (_React$Component) {
    _inherits(AdditionFormAp, _React$Component);

    function AdditionFormAp(props) {
      _classCallCheck(this, AdditionFormAp);

      var _this2 = _possibleConstructorReturn(this, (AdditionFormAp.__proto__ || Object.getPrototypeOf(AdditionFormAp)).call(this, props));

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
          if (_this2.state.brand !== "" && _this2.state.cardNumber !== "" && _this2.state.dateM !== "" && _this2.state.dateY !== "") {
            _this2.vidaColectivoController.getValFormaCobro(0, _this2.state.cardNumber, _this2.state.brand, 0, Number(_this2.state.dateM + _this2.state.dateY), function (data) {
              _this2.handleBrand(data);
            });
          }
        }
      };

      _this2._handleResults = function (id, result) {
        _this2.formData[id] = result;

        if (result.value !== "") {
          _this2.handleVerificationBrand(id, result);
        }

        if (id === "applicantCuilNumber" && !result.isValidate && _this2.formData[id].referencies.current !== null) {
          _this2.formData[id].referencies.current._onFocus(true);
        }
      };

      _this2.handleBrand = function (data) {
        _this2.setState({ brandMessage: data });
      };

      _this2._handleFormValidation = function (saveForm) {
        var field = _this2.formData;
        var formPropData = _this2.props.formInfo ? _this2.props.formInfo : _this2.props.data;
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
              //valida el cuil de conyuge, para guardado y envio
              if (field[element].value !== "") {
                if (element == "applicantCUILConyuge" && _this.state.conyugeCuilVerification) {
                  errorsList[1] = "Error en conyuge";
                  validated = false;
                  emptyFields = false;
                }

                if (element == "applicantCuilNumber" && field[element].value.length !== 11 && formPropData.applicantTypeCCC == "1" && field[element].formatText == undefined) {
                  errorsList.push("La longitud del CUIL debe ser de 11 digitos");
                  field[element].referencies.current._onFocus(true);
                  validated = false;
                  emptyFields = false;
                }
              }
              if (field[element].value == "" && saveForm != "saveForm") {
                field[element].referencies.current._onFocus(true);

                if (errorsList.length !== 0) {
                  if (!errorsList.includes("Complete los campos indicados")) {
                    errorsList.push("Complete los campos indicados");
                  }
                } else {
                  errorsList[0] = "Complete los campos indicados";
                }

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
              if (field["listBenef"].isValidate == false) {
                errorsList[2] = "Designación Beneficiarios: Verifique que las órdenes cubran el 100%";
                emptyFields = false;
                validated = false;
              }
            }
            if (saveForm != "saveForm") {
              if (element == "applicantOwner" && field["applicantOwner"].id == 0 && _this.state.showPayment == "S") {
                errorsList[5] = "Complete los campos. Check de forma de pago";
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

          if (saveForm != "saveForm" && _this.state.notConyuge) {
            var fechaNacimientoConyu = field["applicantDateBirthConyuge"].value;
            var dateNacimientoConyu = Utils.formatPolizaDate(Utils.formatFechaNumber(fechaNacimientoConyu));
            var aniosAhoraConyu = Utils.fAgeCalc(dateNacimientoConyu);
            var grupo = _this.props.listSubGrupos[0];

            var fecha = fechaNacimientoConyu.split("/");
            var dia = parseInt(fecha[0], 10);
            var mes = parseInt(fecha[1], 10) - 1;
            var anio = parseInt(fecha[2], 10);
            var date = new Date(anio, mes, dia);

            var regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;

            if (fechaNacimientoConyu !== "") {
              if (!regexFecha.test(fechaNacimientoConyu)) {
                errorsList.push("Fecha de Nacimiento incompleta");
                field["applicantDateBirthConyuge"].referencies.current.isValidate = false;
                field["applicantDateBirthConyuge"].referencies.current._onFocus(true);
                validated = false;
                emptyFields = false;
              } else if (date.getFullYear() !== anio || date.getMonth() !== mes || date.getDate() !== dia) {
                errorsList.push("Fecha de Nacimiento invalida, el formato debe ser DD/MM/AAAA");
                field["applicantDateBirthConyuge"].referencies.current.isValidate = false;
                field["applicantDateBirthConyuge"].referencies.current._onFocus(true);
                validated = false;
                emptyFields = false;
              } else if (aniosAhoraConyu > grupo.GEDADMAX || aniosAhoraConyu < grupo.GEDADMIN) {
                errorsList.push("La edad del conyuge del asegurado titular debe ser entre " + grupo.GEDADMIN + " y " + grupo.GEDADMAX);
                field["applicantDateBirthConyuge"].referencies.current.isValidate = false;
                field["applicantDateBirthConyuge"].referencies.current._onFocus(true);
                validated = false;
                emptyFields = false;
              }
            }
          }

          if (saveForm === "saveForm" && _this.props.isConyuge && _this.state.notConyuge) {
            var fechaNacimientoConyu = field["applicantDateBirthConyuge"].value;
            var dateNacimientoConyu = Utils.formatPolizaDate(Utils.formatFechaNumber(fechaNacimientoConyu));
            var aniosAhoraConyu = Utils.fAgeCalc(dateNacimientoConyu);
            var grupo = _this.props.listSubGrupos[0];

            var fecha = fechaNacimientoConyu.split("/");
            var dia = parseInt(fecha[0], 10);
            var mes = parseInt(fecha[1], 10) - 1;
            var anio = parseInt(fecha[2], 10);
            var date = new Date(anio, mes, dia);

            var _regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;

            if (fechaNacimientoConyu !== "") {
              if (!_regexFecha.test(fechaNacimientoConyu)) {
                errorsList.push("Fecha de Nacimiento incompleta");
                field["applicantDateBirthConyuge"].referencies.current.isValidate = false;
                field["applicantDateBirthConyuge"].referencies.current._onFocus(true);
                validated = false;
                emptyFields = false;
              } else if (date.getFullYear() !== anio || date.getMonth() !== mes || date.getDate() !== dia) {
                errorsList.push("Fecha de Nacimiento invalida, el formato debe ser DD/MM/AAAA");
                field["applicantDateBirthConyuge"].referencies.current.isValidate = false;
                field["applicantDateBirthConyuge"].referencies.current._onFocus(true);
                validated = false;
                emptyFields = false;
              } else if (aniosAhoraConyu > grupo.GEDADMAX || aniosAhoraConyu < grupo.GEDADMIN) {
                errorsList.push("La edad del conyuge del asegurado titular debe ser entre " + grupo.GEDADMIN + " y " + grupo.GEDADMAX);
                field["applicantDateBirthConyuge"].referencies.current.isValidate = false;
                field["applicantDateBirthConyuge"].referencies.current._onFocus(true);
                validated = false;
                emptyFields = false;
              }
            }
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
              }
            });

            return false;
          } else {
            return true;
          }
        };
      };

      _this2._validateFormaPago = function (vidaColectivoController, state) {
        return new Promise(function (resolve, reject) {
          vidaColectivoController.getValFormaCobro(0, state.cardNumber, state.brand, 0, Number(state.dateM + state.dateY), function (data) {
            resolve(data);
          });
        });
      };

      _this2.handleCheckConyuge = function (datoConyuge) {
        if (datoConyuge == "S") {
          _this2.setState({ conyugeCuilVerification: true });
        } else _this2.setState({ conyugeCuilVerification: false });
      };

      _this2.handleEraseData = function () {
        _this2.formData.applicantEmailConyuge ? _this2.formData.applicantEmailConyuge.value = "" : "";
        _this2.formData.applicantNameConyuge ? _this2.formData.applicantNameConyuge.value = "" : "";
        _this2.formData.applicantCUILConyuge ? _this2.formData.applicantCUILConyuge.value = "" : "";
        _this2.formData.applicantDateBirthConyuge ? _this2.formData.applicantDateBirthConyuge.value = "" : "";
        _this2.formData.applicantSurnameConyuge ? _this2.formData.applicantSurnameConyuge.value = "" : "";
        _this2.formData.applicantNationalityConyuge ? _this2.formData.applicantNationalityConyuge.value = "" : "";
        _this2.formData.applicantGenderConyuge ? _this2.formData.applicantGenderConyuge.value = "" : "";
      };

      _this2.handleConyuge = function (form) {
        if (form.formConyuge && form.formConyuge.id == 1 && _this2.props.isConyuge) {
          return {
            "APELLIDO": form.applicantSurnameConyuge.value,
            "NOMBRE": form.applicantNameConyuge.value,
            "CUIL": form.applicantCUILConyuge.value,
            "FECNAC": form.applicantDateBirthConyuge.value,
            "OCUPACION": "",
            "EMAIL": form.applicantEmailConyuge.value,
            "NACIONAL": form.applicantNationalityConyuge ? form.applicantNationalityConyuge.value : ""
          };
        } else {
          return {
            "APELLIDO": "",
            "NOMBRE": "",
            "CUIL": "",
            "FECNAC": "",
            "OCUPACION": "",
            "EMAIL": "",
            "NACIONAL": ""
          };
        }
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

      _this2.hanldeNomina = function (list) {
        var nominas = list.map(function (item) {
          return {
            ORDEN: Number(item.NOMINAS.BENEFORD),
            DOCUMDATB: item.NOMINAS.NUMDOCBENE,
            DOCUMTIPB: Number(item.NOMINAS.TIPDOCBENE),
            CLIENAP: item.NOMINAS.APEBENE,
            CLIENNOM: item.NOMINAS.BENNOMBRE,
            PORCENT: item.NOMINAS.BENEPORC / 100,
            EDAD: 0,
            RELACION: item.NOMINAS.RELBECOD,
            TELEFONO: item.NOMINAS.BENNUMTELEF,
            EMAIL: item.NOMINAS.BENEMAIL,
            FECNACIM: Number(item.NOMINAS.FNACIMIE)
          };
        });
        return nominas;
      };

      _this2.handleBeneficiary = function (list) {
        var relacion = void 0;
        var listBeneficiary = list.map(function (beneficiary) {
          relacion = _this2.state.listParentesco.find(function (element) {
            return element.CODIGO == beneficiary.NOMINAS.RELBECOD;
          });
          return {
            BENEFICIARIO: {
              APELLIDO: beneficiary.NOMINAS.APEBENE,
              NOMBRE: beneficiary.NOMINAS.BENNOMBRE,
              ORDEN: beneficiary.NOMINAS.BENEFORD,
              EMAIL: beneficiary.NOMINAS.BENEMAIL,
              PORCENT: beneficiary.NOMINAS.BENEPORC,
              TELEFONO: beneficiary.NOMINAS.BENNUMTELEF,
              FECNAC: Utils.formatFechaString(beneficiary.NOMINAS.FNACIMIE),
              DOCUM: beneficiary.NOMINAS.NUMDOCBENE,
              RELACION: relacion.DESCRIPCION
            }
          };
        });
        return listBeneficiary;
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

      _this2.handlePlus = function (product) {
        if (product == "AP" || product == "EC" || product == "CU") {
          if (_this2.props.listPoliza.MONENCOD === 1) {
            return "$ " + _this2.props.grupoPoliza.GCAPIMAX;
          } else if (_this2.props.listPoliza.MONENCOD === 2) {
            return "U$S " + _this2.props.grupoPoliza.GCAPIMAX;
          }
        } else if (product == "MS") {
          return _this2.state.policy;
        } else return "";
      };

      _this2._handleSendForm = function () {
        _this2.props.product.GCAPIMAX = _this2.props.grupoPoliza.GCAPIMAX;
        if (_this2.formData.formConyuge && _this2.formData.formConyuge.id == 2) {
          _this2.handleEraseData();
        }
        _this2._handleFormValidation().then(function (validado) {

          if (validado) {
            _this2.setState({ loading: false });
            _this2.setState({ isLoaded: true });
            var listBeneficiary = _this2.handleBeneficiary(_this2.formData.listBenef.list);
            var nroPol = _this2.handleRepeatZero(_this2.props.product.POL_ANN, _this2.props.product.POL_SEC);
            var nomina = _this2.hanldeNomina(_this2.formData.listBenef.list);
            var coberturas = _this2.handleCobertura(_this2.props.listPoliza.COBERTURAS.COBERTURA);
            var plus = _this2.handlePlus(_this2.props.recoverPayrollEmployees.TIP_PRO); //funcion que   devuelve la suma o el monto ingresado
            var conyuge = _this2.handleConyuge(_this2.formData);
            _this2.vidaColectivoController.saveRequest(_this2.formData, _this2.props.recoverPayrollEmployees, function (saveData) {
              if (saveData != "ERROR") {
                var requestNumber = saveData.RESULTADO[0].RET;
                _this2.props.handleSetRequestNumber(requestNumber, "G");
                _this2.controller.changePayrollStatus(_this2.props.recoverPayrollEmployees, "G", requestNumber, function (stateData) {
                  if (stateData == "NO_ERROR") {
                    var _ASEGURADO;

                    _this2.vidaColectivoController.sendApplication({
                      "GENPDF": {
                        "repId": "SO_AP_SOLI",
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
                            "ASEGURADO": (_ASEGURADO = {
                              "APELLIDO": _this2.formData.applicantSurname.value,
                              "NOMBRE": _this2.formData.applicantName.value,
                              "CUIL": _this2.formData.applicantCuilNumber.value,
                              "FECNAC": _this2.formData.applicantDateBirth.value,
                              "OCUPACION": _this2.formData.applicantOccupation ? _this2.formData.applicantOccupation.value : "",
                              "DIRCALLE": _this2.formData.applicantStreet.value,
                              "DIRNUM": _this2.formData.applicantNumber.value,
                              "DIRPISO": _this2.formData.applicantFloor.value,
                              "DIRDEPTO": _this2.formData.applicantDepartment.value,
                              "DIRLOCAL": _this2.formData.applicantLocality.value,
                              "DIRCODPOS": _this2.formData.applicantCP.id,
                              "DIRPROVI": _this2.formData.applicantProvince.value,
                              "TELEFONO": _this2.formData.applicantAreaTel.value + "-" + _this2.formData.applicantTelephone.value,
                              "EMAIL": _this2.formData.applicantEmail.value
                            }, _defineProperty(_ASEGURADO, "DIRCODPOS", _this2.formData.applicantCP.value), _defineProperty(_ASEGURADO, "LUGNAC", ""), _defineProperty(_ASEGURADO, "NACIONAL", _this2.formData.applicantNationality.value), _defineProperty(_ASEGURADO, "SEXO", _this2.formData.applicantGender.value), _defineProperty(_ASEGURADO, "ESTCIV", _this2.formData.applicantCivilStatus.value), _defineProperty(_ASEGURADO, "CONDIVA", ""), _ASEGURADO),
                            "TOMADOR": {
                              "RAZSOC": _this2.props.listPoliza.NOMBYAPE,
                              "CUIT": _this2.props.listPoliza.CUIT,
                              "CONDIVA": _this2.props.listPoliza.CIVADESC,
                              "ACTIVIDAD": _this2.props.listPoliza.PROFEDES,
                              "DIRCALLE": _this2.props.listPoliza.DOMICDOM,
                              "DIRNUM": _this2.props.listPoliza.DOMICDNU,
                              "DIRPISO": _this2.props.listPoliza.DOMICPIS,
                              "DIRDEPTO": _this2.props.listPoliza.DOMICPTA, //departamento
                              "DIRLOCAL": _this2.props.listPoliza.DOMICPOB, //descripcion de   la localidad
                              "DIRCODPOS": _this2.props.listPoliza.CPACODPO, //codigo postal
                              "DIRPROVI": _this2.props.listPoliza.PROVIDES, //descripcion de   la provincia
                              "TELEFONO": _this2.props.listPoliza.DOMICTLF,
                              "EMAIL": ""
                            },
                            "CONYUGE": conyuge,
                            "FAMILIARES": {}, //para sepelio si se completa
                            "BENEFICIARIOS": listBeneficiary
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
                        "CAPITASG": _this2.props.grupoPoliza.GCAPIMAX,
                        "CONYUGE": _this2.formData.formConyuge ? _this2.formData.formConyuge.id == 1 ? "S" : "N" : "N",
                        "EXPEDNUMC": "0000000050",
                        "DOCUMTIPC": _this2.formData.formConyuge ? 5 : 0,
                        "DOCUMDATC": _this2.formData.formConyuge ? _this2.formData.applicantCUILConyuge ? _this2.formData.applicantCUILConyuge.value : "" : "",
                        "CLIENAPEC": _this2.formData.formConyuge ? _this2.formData.applicantSurnameConyuge ? _this2.formData.applicantSurnameConyuge.value : "" : "",
                        "CLIENNOMC": _this2.formData.formConyuge ? _this2.formData.applicantNameConyuge ? _this2.formData.applicantNameConyuge.value : "" : "",
                        "CLIENSEXC": _this2.formData.formConyuge ? _this2.formData.applicantGender ? _this2.formData.applicantGender.id : "" : "",
                        "FECNACIMC": _this2.formData.formConyuge ? _this2.formData.applicantDateBirthConyuge ? Utils.formatFechaNumber(_this2.formData.applicantDateBirthConyuge.value) : 0 : 0,
                        "CAPITASGC": 0
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
                        "NOMINA": nomina
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
                        "TOM_NOM": "",
                        "COD_PRO": _this2.props.product.COD_PRO
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
                        _this2._handleErrorServices("Se ha producido un error al intentar enviar la solicitud (" + callBack + "   )");
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

      _this2._handleSaveForm = function () {
        _this2.props.product.GCAPIMAX = _this2.props.grupoPoliza.GCAPIMAX;
        if (_this2.formData.formConyuge && _this2.formData.formConyuge.id == 2) {
          _this2.handleEraseData();
        }
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

      _this2._handleErrorsList = function (errorsList, emptyFields) {
        if (emptyFields && errorsList.length === 1) {
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

      _this2.handlerIsConyuge = function (e) {
        if (e.target.id == "2") {
          _this2.setState({ notConyuge: false });
        } else _this2.setState({ notConyuge: true });
      };

      _this2.state = {
        showModal: false,
        loading: false,
        isLoaded: false,
        cont: 2,
        conyugeCuilVerification: false,
        check: false,
        notConyuge: false,
        listParentesco: [],
        /*validaciones tarjeta*/
        brand: "",
        cardNumber: "",
        dateM: "",
        dateY: "",
        brandMessage: "",
        validationBrand: false,
        showPayment: "",
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
      _this2.endososController = new EndososController();

      return _this2;
    }
    /**funcion para la verificacion de tarjetas */


    _createClass(AdditionFormAp, [{
      key: "render",
      value: function render() {

        if (!this.state.loading || this.state.isLoaded) {

          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "h3",
              { className: "subtitle-inside" },
              "Solicitud de Accidentes Personales \u2013 ",
              React.createElement("br", null),
              "Adhesi\xF3n Individual"
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
                )
              ),
              React.createElement(
                "article",
                { className: "col small" },
                React.createElement(
                  "p",
                  null,
                  " ",
                  React.createElement(
                    "b",
                    null,
                    "IMPORTANTE: "
                  ),
                  "\u201CLAS ACCIONES FUNDADAS EN EL CONTRATO DE SEGURO PRESCRIBEN EN EL PLAZO DE UN (1) A\xD1O, COMPUTADO DESDE QUE LA CORRESPONDIENTE OBLIGACI\xD3N ES EXIGIBLE, (...) EN EL SEGURO DE VIDA, EL PLAZO DE PRESCRIPCI\xD3N PARA EL BENEFICIARIO SE COMPUTA DESDE QUE CONOCE LA EXISTENCIA DEL BENEFICIO,                    PERO EN NING\xDAN CASO EXCEDER\xC1 DE TRES (3) A\xD1OS DESDE EL SINIESTRO. (ART. 58 LEY 17.418)\u201D"
                )
              )
            ),
            React.createElement(
              "h5",
              { className: "mb-2" },
              "Datos del asegurado"
            ),
            React.createElement(FormPointAp, {
              formInfo: this.props.formInfo,
              data: this.props.data,
              product: this.props.product,
              docTypeList: this.props.docTypeList,
              provincesList: this.props.provincesList,
              sexoList: this.props.sexoList,
              civilStatusList: this.props.civilStatusList,
              countriesList: this.props.countriesList,
              cuitList: this.props.cuitList,
              depoActivitiesList: this.props.depoActivitiesList,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            this.props.isConyuge ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "h5",
                { className: "mb-2 mt-2" },
                "Datos del conyuge"
              ),
              React.createElement(FormPointApConyuge, {
                handlerIsConyuge: this.handlerIsConyuge,
                handleCheckConyuge: this.handleCheckConyuge,
                formInfo: this.props.formInfo,
                product: this.props.product,
                data: this.props.data,
                applicantData: this.formData,
                docTypeList: this.props.docTypeList,
                check: this.state.check,
                handleVerificationCuil: this.handleVerificationCuil,
                provincesList: this.props.provincesList,
                isConyuge: this.props.isConyuge,
                sexoList: this.props.sexoList,
                civilStatusList: this.props.civilStatusList,
                countriesList: this.props.countriesList,
                cuitList: this.props.cuitList,
                depoActivitiesList: this.props.depoActivitiesList,
                onResults: this._handleResults,
                readOnly: this.props.readOnly,
                fechaAct: this.props.user.FECHA,
                grupoPoliza: this.props.grupoPoliza,
                listSubGrupos: this.props.listSubGrupos
              })
            ) : "",
            React.createElement(
              "h5",
              { className: "mb-2 mt-2" },
              "Calcula el costo de tu seguro"
            ),
            React.createElement(ApQuote, {
              formInfo: this.props.formInfo,
              data: this.props.data,
              conyuge: this.state.conyuge,
              isConyuge: this.props.isConyuge,
              listPoliza: this.props.listPoliza,
              grupoPoliza: this.props.grupoPoliza,
              listSubGrupos: this.props.listSubGrupos,
              notConyuge: this.state.notConyuge,
              applicantData: this.formData,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            React.createElement(
              "h5",
              { className: "mb-2 mt-2" },
              "Designaci\xF3n de beneficiarios"
            ),
            React.createElement(TypeBeneficiary, {
              applicantData: this.formData,
              beneficiaryList: this.props.formInfo.beneficiaryList,
              product: this.props.product,
              docTypeList: this.props.docTypeList,
              cuitList: this.props.cuitList,
              orderList: this.props.orderList,
              handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary,
              user: this.props.user,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            this.state.showPayment == "S" ? React.createElement(FormaPago, {
              refProps: this.props,
              _handleResults: this._handleResults,
              validationBrand: this.state.validationBrand
            }) : "",
            React.createElement(
              "section",
              null,
              React.createElement(
                "p",
                null,
                "Solicito ser incluido en el/los seguros de acuerdo con las condiciones de la/s p\xF3liza/s contratadas por el tomador de las mismas , autoriz\xE1ndolo, de corresponder, deducir de mis haberes el importe de la prima. Acepto expresamente que las modificaciones de capital m\xE1ximo se efectuar\xE1n peri\xF3dicamente seg\xFAn la pauta de ajuste que el contratante convenga con la compa\xF1\xEDa, a la que doy mi expresa conformidad el asegurado. Los riesgos cubiertos, los capitales m\xE1ximos y dem\xE1s condiciones del seguro son los estipulados en la p\xF3liza que obra en poder del contratante, y que se encuentra a disposici\xF3n del asegurado. "
              ),
              React.createElement(
                "p",
                null,
                React.createElement(
                  "small",
                  null,
                  React.createElement(
                    "b",
                    null,
                    "ENTREGA POR MEDIOS ELECTR\xD3NICOS: "
                  )
                ),
                "Autorizo a la aseguradora a enviar informaci\xF3n de los productos contratados y de inter\xE9s de la compa\xF1\xEDa a la direcci\xF3n de correo indicada previamente. En caso de que la solicitud resulte aprobada y que haya aceptado recibir por medio electr\xF3nico cualquier documentaci\xF3n que la aseguradora deba enviarme en virtud de la p\xF3liza, ser\xE1n enviadas a la direcci\xF3n de correo electr\xF3nico indicada. Asimismo, cualquier cambio de correo electr\xF3nico, deber\xE1 ser comunicado por mi parte a la aseguradora."
              ),
              React.createElement(
                "p",
                null,
                " ",
                React.createElement(
                  "small",
                  null,
                  React.createElement(
                    "b",
                    null,
                    "PROTECCI\xD3N DE DATOS PERSONALES: "
                  )
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
                "En cumplimiento de lo establecido por el art. 6 de la ley 25.326, se informa que sus datos est\xE1n siendo recabados con los siguientes fines: para cotizar su seguro y, de ser aceptada la propuesta, para emitir una p\xF3liza y para todo aquello que sea necesario para cumplir con lo establecido en la normativa vigente en materia de derecho de seguros. Asimismo, le informamos que sus datos formar\xE1n parte de un banco de datos electr\xF3nicos cuyo titular es HSBC seguros de Vida (argentina) S.A. (Bouchard 557, piso 20\xB0, C.A.B.A.). Los datos aqu\xED solicitados son obligatorios con el fin de poder cotizar correctamente su seguro y se considera que los mismos son exactos y veraces. Adem\xE1s, se le informa de la facultad de ejercer el derecho de acceso a sus datos personales en forma gratuita en intervalos no inferiores a seis meses, salvo que acredite un inter\xE9s leg\xEDtimo al efecto, y asimismo que tiene derecho, de ser procedente, a rectificar y/o suprimir dichos datos (arts. 14,15 y 16 de la ley n\xB0 25.326)."
              ),
              React.createElement(
                "p",
                null,
                " Resoluci\xF3n AAIP 14/2018: \u201Cla AGENCIA DE ACCESO A LA INFORMACI\xD3N P\xDABLICA, en su car\xE1cter de \xD3rgano de Control de la Ley n\xBA 25.326, tiene la atribuci\xF3n de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protecci\xF3n de datos personales\u201D."
              ),
              React.createElement(
                "p",
                null,
                " ",
                React.createElement(
                  "small",
                  null,
                  React.createElement(
                    "b",
                    null,
                    "PREVENCI\xD3N DE LAVADO DE ACTIVOS Y FINANCIAMIENTO DEL TERRORISMO: "
                  )
                ),
                " el asegurado asume la carga de aportar los datos y documentos que le sean requeridos por la aseguradora en virtud de lo establecido por las normas vigentes en materia de prevenci\xF3n de lavado de activos y financiamiento de terrorismo. Caso contrario, la aseguradora dar\xE1 cumplimiento a lo establecido en las resoluciones UIF vigentes en la materia."
              ),
              " "
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
        var _this3 = this;

        this.firstFormData = Loadsh.cloneDeep(this.formData);
        this.endososController.getWsFormBeneficiary(function (element) {
          _this3.setState({ listParentesco: element.listParentestco });
        });
        if (!this.props.isConyuge) {
          this.setState({ cont: 1 });
        }
        this.setState({ showPayment: this.props.listPoliza.MDCECOIND });
        if (this.props.formInfo.salary) {
          this._handleResults("salary", {
            id: this.props.formInfo.salary,
            isValidate: true
          });
        }
        if (this.props.formInfo.formConyuge == 1) {
          this.setState({
            check: true,
            notConyuge: true
          });
          this._handleResults("formConyuge", {
            id: "1",
            isValidate: true
          });
        } else if (this.props.formInfo.formConyuge == 2) {
          this.setState({ notConyuge: false });
          this._handleResults("formConyuge", {
            id: "2",
            isValidate: true
          });
        }
      }
    }]);

    return AdditionFormAp;
  }(React.Component);

  return AdditionFormAp;
});