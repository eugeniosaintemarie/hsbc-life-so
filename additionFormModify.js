var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/loader", "./formPointConyuge", "./bonusQuote", "../../common/modalReactBootstrap", "../../controller/retiroNominaController", "../../controller/vidaColectivoController", "../../controller/endososController", "../../lib/utils", "../../common/dropdownContent", "../../common/inputvalidation", "./personalAccidents/ApQuote", "./processOKVC"], function (React, Loader, FormPointConyuge, BonusQuote, ModalReactBootstrap, RetiroNominaController, VidaColectivoController, EndososController, Utils, DropDownContent, InputValidation, ApQuote, ProcessOk) {
  var AdditionFormModify = function (_React$Component) {
    _inherits(AdditionFormModify, _React$Component);

    function AdditionFormModify(props) {
      _classCallCheck(this, AdditionFormModify);

      var _this2 = _possibleConstructorReturn(this, (AdditionFormModify.__proto__ || Object.getPrototypeOf(AdditionFormModify)).call(this, props));

      _this2._handleValidacionSolicitud = function (recSol, getPolizaAseg) {
        var tipoPro = _this2.props.product.TIP_PRO;

        if (getPolizaAseg.conyugeModify === "S") {
          if (tipoPro === "MS") {
            if (Number(recSol.salary) === getPolizaAseg.salary) {
              return true;
            } else if (recSol.applicantSalary === getPolizaAseg.applicantSalary) {
              return true;
            } else {
              return false;
            }
          } else {
            if (Number(recSol.applicantPlus) === getPolizaAseg.applicantPlus) {
              return true;
            } else {
              return false;
            }
          }
        } else {
          return false;
        }
      };

      _this2._handleValidacionInputValues = function (id, value) {
        var recSolData = _this2.state.recSolData;

        var result = true;

        switch (id) {
          case "applicantNameConyuge":
            if (value === recSolData.applicantNameConyuge) {
              result = false;
            }
            break;
          case "applicantSurnameConyuge":
            if (value === recSolData.applicantSurnameConyuge) {
              result = false;
            }
            break;
          case "applicantDateBirthConyuge":
            if (value === Utils.formatFechaString(recSolData.applicantDateBirthConyuge)) {
              result = false;
            }
            break;
          case "applicantEmailConyuge":
            if (value === recSolData.applicantEmailConyuge) {
              result = false;
            }
            break;
          case "applicantCUILConyuge":
            if (value === recSolData.applicantCUILConyuge) {
              result = false;
            }
            break;
          case "applicantPlus":
            if (value === recSolData.applicantPlus) {
              result = false;
            }
            break;
          case "applicantSalary":
            if (Number(value) === recSolData.applicantSalary) {
              result = false;
            }
            break;
          default:
            break;
        }

        return result;
      };

      _this2._handleErrorServices = function (errorText) {
        _this2.setState({
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

      _this2.handlerIsConyuge = function (e) {
        if (e.target.id == "2") {
          _this2.setState({ notConyuge: false });
        } else _this2.setState({ notConyuge: true });
      };

      _this2.handleCheckConyuge = function (datoConyuge) {
        if (datoConyuge == "S") {
          _this2.setState({ conyugeCuilVerification: true });
        } else _this2.setState({ conyugeCuilVerification: false });
      };

      _this2._handleResults = function (id, result) {
        _this2.formData[id] = result;
        var data = _defineProperty({}, id, result);
        var aux = false;

        var form = Object.keys(_this2.state.form);
        form = form.find(function (el) {
          return el === id;
        });

        if (result.referencies !== undefined) {
          _this2.referencies[id] = result.referencies;
        } else {
          result.referencies = _this2.referencies[id];
        }

        if (typeof form !== "undefined") {
          var current = _this2.state;
          var old = _this2.state.form;
          _this2.setState(Object.assign({}, current, {
            form: Object.assign({}, old, data)
          }));
        }

        if (id === "gmultipValidation") {
          _this2.setState({ gmultipValidation: result });
        }

        if (_this2.formData.formConyuge !== undefined || _this2.formData.formModify !== undefined) {
          if (result.value !== undefined && result.value !== "" && id !== "currentApplicantPlus" && id !== "currentApplicantSalary" && id !== "currentSalary") {
            if (_this2.state.recSolData !== undefined) {
              var validateValues = _this2._handleValidacionInputValues(id, result.value);

              if (validateValues) {
                _this2.setState({ disable: false });
              } else {
                _this2.setState({ disable: true });
              }
            } else {
              _this2.setState({ disable: false });
              aux = false;
            }
          } else if (id !== "formConyuge" && id !== "formModify" && aux) {
            _this2.setState({ disable: true });
          } else if (_this2.state.conyugeAdherido && _this2.formData.formModify.id === "2") {
            _this2.setState({ disable: true });
            aux = true;
          } else if (_this2.formData.formConyuge !== undefined && _this2.formData.formModify !== undefined && _this2.formData.formModify.id === "2" && _this2.formData.formConyuge.id === "2") {
            _this2.setState({ disable: true });
            aux = true;
          }

          if (id === "formConyuge" && result.id === "2") {
            if (_this2.formData.formModify === undefined) {
              _this2.setState({ disable: true });
              aux = true;
            } else if (_this2.formData.applicantPlus !== undefined && _this2.formData.applicantPlus.value === "") {
              _this2.setState({ disable: true });
              aux = true;
            }

            if (_this2.state.gmultipValidation) {
              _this2.setState({ disable: true });
              aux = true;
            }

            var keys = Object.keys(_this2.formData);

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (key.includes("Conyuge") && key !== "formConyuge") {
                  delete _this2.formData[key];
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            _this2.formData.conyugeModify = "N";
          }

          if (id === "formModify" && result.id === "2") {
            _this2.formData.sumAsegModify = "N";

            delete _this2.formData.applicantPlus;
          }

          if (id === "formModify" && result.id === "1" || _this2.formData.formModify !== undefined && _this2.formData.formModify.id === "1") {
            _this2.formData.sumAsegModify = "S";
          }

          if (id === "formConyuge" && result.id === "1" || _this2.formData.formConyuge !== undefined && _this2.formData.formConyuge.id === "1") {
            _this2.formData.conyugeModify = "S";
          }
        }
      };

      _this2.handleCheckDdjj = function (poliza, requisito) {
        var requisitoEnvio = "";

        if (requisito.REQUISITO == undefined || requisito.REQUISITO.length == 0) {
          _this2.setState({
            showDdjj: false,
            showDdjjS: false
          });

          requisitoEnvio = "";

          _this2._handleResults("applicantRequisito", requisitoEnvio);

          return;
        }
      };

      _this2._handleErrorsList = function (errorsList, emptyFields) {
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

      _this2._handleSwitch = function (form) {
        _this2.setState({ currentForm: form });
      };

      _this2._handleFormValidation = function (saveForm) {
        var field = _this2.formData;
        var validated = true;
        var errorsList = [];
        var emptyFields = true;
        var _this = _this2;

        return new Promise(function (resolve, reject) {
          Object.keys(field).map(function (element) {
            if (field[element] === null) {
              return;
            }

            //Se excluyen los campos que no son obligatorios y los que estan ocultos      
            if (field[element].required) {
              //valida el cuil de conyuge, para guardado y envio
              if (field[element].value !== "") {
                if (element == "applicantCUILConyuge" && _this.state.conyugeCuilVerification) {
                  errorsList[2] = "Error en conyuge";
                  field[element].referencies.current._onFocus(true);
                  validated = false;
                  emptyFields = false;
                }
              }
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

              //Se agrega valdiacion/suma asegurada para envio de form 
              if (saveForm != "saveForm" && (element == "applicantPlus" || element == "applicantSalary")) {
                if (field[element].referencies.current.props.checkValue) {
                  field[element].referencies.current._onFocus(true);
                  errorsList[4] = "La suma asegurada no esta en los valores permitidos";
                  emptyFields = false;
                  validated = false;
                }
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

          if (saveForm != "saveForm" && _this.state.notConyuge && _this.formData.applicantDateBirthConyuge) {
            var fechaNacimientoConyu = field["applicantDateBirthConyuge"].value;
            var dateNacimientoConyu = Utils.formatPolizaDate(Utils.formatFechaNumber(fechaNacimientoConyu));
            var aniosAhoraConyu = Utils.fAgeCalc(dateNacimientoConyu);

            var fecha;

            if (!isNaN(fechaNacimientoConyu)) {
              fecha = Utils.formatFechaString(fechaNacimientoConyu);
            } else {
              fecha = fechaNacimientoConyu.split("/");
            }

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
              }
            }
          }

          if (saveForm === "saveForm" && _this.props.isConyuge && _this.state.notConyuge && _this.formData.applicantDateBirthConyuge) {
            var fechaNacimientoConyu = field["applicantDateBirthConyuge"].value;
            var dateNacimientoConyu = Utils.formatPolizaDate(Utils.formatFechaNumber(fechaNacimientoConyu));
            var aniosAhoraConyu = Utils.fAgeCalc(dateNacimientoConyu);
            var grupo = _this.state.listSubGrupos[0];

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

      _this2._handleModalIsOpen = function (e) {
        var current = _this2.state.showModal;

        _this2.setState({
          showModal: !current
        });

        if (e.target.id == "cancelButtonModal") {
          _this2.props.handleShowAdditionRequestColectivo();
        }
      };

      _this2.handleEraseData = function () {
        _this2.formData.applicantEmailConyuge = { value: "" };
        _this2.formData.applicantNameConyuge = { value: "" };
        _this2.formData.applicantCUILConyuge = { value: "" };
        _this2.formData.applicantDateBirthConyuge = { value: "" };
        _this2.formData.applicantSurnameConyuge = { value: "" };
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
        if (product == "AP" || product == "CU") {
          if (_this2.state.listPoliza.MONENCOD === 1) {
            return "$ " + _this2.props.grupoPoliza.GCAPIMAX;
          } else if (_this2.state.listPoliza.MONENCOD === 2) {
            return "U$S " + _this2.props.grupoPoliza.GCAPIMAX;
          }
        } else if (product == "MS") {
          return _this2.formData.salary ? _this2.formData.salary.id : "0";
        } else if (product == "EC") {
          if (_this2.state.listPoliza.MONENCOD === 1) {
            return "$ " + _this2.formData.applicantPlus.value;
          } else if (_this2.state.listPoliza.MONENCOD === 2) {
            return "U$S " + _this2.formData.applicantPlus.value;
          }
        } else return "";
      };

      _this2.handleConyuge = function (form) {
        if (form.formConyuge && form.formConyuge.id == 1) {
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

      _this2.handleTypeProduct = function (product) {
        if (product == "MS") {
          return _this2.formData.formModify === undefined || _this2.formData.formModify.id === "2" || _this2.state.gmultipValidation ? _this2.state.DATA.CAPITASG : _this2.formData.applicantSalary.value * _this2.formData.salary.id;
        } else if (product == "EC") {
          return _this2.formData.formModify === undefined || _this2.formData.formModify.id === "2" ? "0" : _this2.formData.applicantPlus.value;
        } else if (product == "CU") {
          return _this2.state.grupoPoliza.GCAPIMAX;
        } else if (product == "AP") {
          return _this2.state.grupoPoliza.GCAPIMAX;
        }
      };

      _this2._handleSendForm = function () {
        if (!_this2.state.isConyuge || _this2.formData.formConyuge && _this2.formData.formConyuge.id == 2) {
          _this2.handleEraseData();
        }

        _this2._handleFormValidation().then(function (validado) {
          if (validado) {
            _this2.setState({ loading: false });
            _this2.setState({ isLoaded: true });
            var nroPol = _this2.handleRepeatZero(_this2.props.product.POL_ANN, _this2.props.product.POL_SEC);
            var plus = _this2.formData.formModify === undefined || _this2.formData.formModify.id === "2" ? "0" : _this2.handlePlus(_this2.props.recoverPayrollEmployees.TIP_PRO); //funcion que       devuelve la suma o el monto ingresado
            var conyuge = _this2.handleConyuge(_this2.formData);
            var coberturas = _this2.handleCobertura(_this2.state.listPoliza.COBERTURAS.COBERTURA);
            var capt = _this2.handleTypeProduct(_this2.props.recoverPayrollEmployees.TIP_PRO);
            _this2.vidaColectivoController.saveRequest(_this2.formData, _this2.props.recoverPayrollEmployees, function (saveData) {
              if (saveData != "ERROR") {
                var requestNumber = saveData.RESULTADO[0].RET;
                _this2.props.handleSetRequestNumber(requestNumber, "G");
                _this2.retiroNominaController.changePayrollStatus(_this2.props.recoverPayrollEmployees, "G", requestNumber, function (stateData) {
                  if (stateData == "NO_ERROR") {
                    var _ASEGURADO;

                    _this2.vidaColectivoController.sendApplication({
                      "GENPDF": {
                        "repId": "SO_VC_SOLI",
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
                              "ALCANCE": _this2.state.listPoliza.DESCRCPO,
                              "PRECARGA": _this2.state.listPoliza.PRECARGA,
                              "MONEDA": _this2.state.listPoliza.MONENCOD,
                              "COBIND": _this2.state.listPoliza.MDCECOIND
                            },
                            "COBERTURAS": coberturas,
                            "ASEGURADO": (_ASEGURADO = {
                              "APELLIDO": _this2.formData.applicantSurname.value,
                              "NOMBRE": _this2.formData.applicantName.value,
                              "CUIL": _this2.formData.applicantCuilNumber.value,
                              "FECNAC": Utils.formatFechaString(Number(_this2.props.product.FEC_NAC)),
                              "OCUPACION": "",
                              "DIRCALLE": "",
                              "DIRNUM": "",
                              "DIRPISO": "",
                              "DIRDEPTO": "",
                              "DIRLOCAL": "",
                              "DIRCODPOS": "",
                              "DIRPROVI": "",
                              "TELEFONO": "",
                              "EMAIL": ""
                            }, _defineProperty(_ASEGURADO, "DIRCODPOS", ""), _defineProperty(_ASEGURADO, "LUGNAC", ""), _defineProperty(_ASEGURADO, "NACIONAL", ""), _defineProperty(_ASEGURADO, "SEXO", ""), _defineProperty(_ASEGURADO, "ESTCIV", ""), _defineProperty(_ASEGURADO, "CONDIVA", ""), _ASEGURADO),
                            "TOMADOR": {
                              "RAZSOC": _this2.state.listPoliza.NOMBYAPE,
                              "CUIT": _this2.state.listPoliza.CUIT,
                              "CONDIVA": _this2.state.listPoliza.CIVADESC,
                              "ACTIVIDAD": _this2.state.listPoliza.PROFEDES,
                              "DIRCALLE": _this2.state.listPoliza.DOMICDOM,
                              "DIRNUM": _this2.state.listPoliza.DOMICDNU,
                              "DIRPISO": _this2.state.listPoliza.DOMICPIS,
                              "DIRDEPTO": _this2.state.listPoliza.DOMICPTA, //departamento
                              "DIRLOCAL": _this2.state.listPoliza.DOMICPOB, //descripcion de la      localidad
                              "DIRCODPOS": _this2.state.listPoliza.CPACODPO, //codigo postal
                              "DIRPROVI": _this2.state.listPoliza.PROVIDES, //descripcion de la      provincia
                              "TELEFONO": _this2.state.listPoliza.DOMICTLF,
                              "EMAIL": ""
                            },
                            "CONYUGE": conyuge,
                            "FAMILIARES": {}, //para sepelio si se completa
                            "BENEFICIARIOS": []
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
                        "TOM_NOM": "",
                        "REQ_ADI": _this2.formData.applicantRequisito ? _this2.formData.applicantRequisito : ""
                      },
                      "INTASE": {
                        "RAMOPCOD": _this2.props.product.COD_PRO,
                        "POLIZANN": _this2.props.product.POL_ANN,
                        "POLIZSEC": _this2.props.product.POL_SEC,
                        "EXPEDNUM": "0000000001",
                        "CLIENAPE": _this2.props.product.ASE_APE,
                        "CLIENNOM": _this2.props.product.ASE_NOM,
                        "CLIENSEX": "",
                        "FECNACIM": Number(_this2.props.product.FEC_NAC),
                        "DOCUMTIP": Number(_this2.props.product.TIP_DOC),
                        "DOCUMDAT": _this2.props.product.NRO_DOC,
                        "COBROTIP": _this2.formData.applicantPayment ? _this2.formData.applicantPayment.id : "",
                        "CUENTNUM": _this2.formData.applicantCardNumber ? _this2.formData.applicantCardNumber.value : "",
                        "CUENTVIS": _this2.formData.applicantBrand ? _this2.formData.applicantBrand.code : "",
                        "FECVENCI": _this2.formData.applicantDateMonth && _this2.formData.applicantDateYear ? Number(_this2.formData.applicantDateYear.value + _this2.formData.applicantDateMonth.value + "01") : 0,
                        "DOMICDOM": "",
                        "DOMICDNU": "",
                        "DOMICPIS": "",
                        "DOMICPTA": "",
                        "CPACODPO": "",
                        "PROVICOD": 0,
                        "IMPSUELD": _this2.formData.applicantSalary ? Number(_this2.formData.applicantSalary.value) : 0,
                        "MULTIPLO": _this2.formData.salary ? Number(_this2.formData.salary.id) : 0,
                        "CAPITASG": Number(capt),
                        "CONYUGE": _this2.formData.formConyuge ? _this2.formData.formConyuge.id == 1 ? "S" : "N" : "N",
                        "EXPEDNUMC": "0000000050",
                        "DOCUMTIPC": _this2.formData.formConyuge ? 5 : 0,
                        "DOCUMDATC": _this2.formData.formConyuge ? _this2.formData.applicantCUILConyuge ? _this2.formData.applicantCUILConyuge.value : "" : "",
                        "CLIENAPEC": _this2.formData.formConyuge ? _this2.formData.applicantSurnameConyuge ? _this2.formData.applicantSurnameConyuge.value : "" : "",
                        "CLIENNOMC": _this2.formData.formConyuge ? _this2.formData.applicantNameConyuge ? _this2.formData.applicantNameConyuge.value : "" : "",
                        "CLIENSEXC": "",
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
                        "TOM_APE": _this2.state.listPoliza.NOMBYAPE,
                        "TOM_NOM": "",
                        "COD_PRO": _this2.props.product.COD_PRO,
                        "REQ_ASE": _this2.formData.applicantRequisito ? _this2.formData.applicantRequisito : "",
                        "TIP_SOL":"M"
                      }
                    }, function (callBack) {
                      if (callBack.RESTS == "OK") {
                        _this2.props.handleSetRequestNumber(requestNumber, "E");
                        _this2.retiroNominaController.changePayrollStatus(_this2.props.recoverPayrollEmployees, "E", requestNumber, function (stateData) {
                          if (stateData == "NO_ERROR") {
                            _this2._handleSwitch("sendOk");
                          } else {
                            _this2._handleErrorServices("El servicio de cambio de estado del formulario no esta       disponible, por favor intentalo más tarde");
                          }
                        });
                      } else {
                        _this2._handleErrorServices("Se ha producido un error al intentar enviar la solicitud (" + callBack + " )");
                      }
                    });
                  } else {
                    _this2._handleErrorServices("El servicio de envio del formulario no esta disponible, por favor      intentalo más tarde");
                  }
                });
              } else {
                _this2._handleErrorServices("El servicio de envio del formulario no esta disponible, por favor      intentalo más tarde");
              }
            });
          }
        });
      };

      _this2.state = {
        DATA: null,
        polizaAsegData: undefined,
        recSolData: undefined,
        grupoPoliza: "", //null
        currentForm: "formModify",
        listPoliza: [],
        listSubGrupos: null,
        checkEmail: false,
        check: false,
        notConyuge: true,
        isConyuge: true,
        conyuge: false,
        conyugeAdherido: false,
        loading: false,
        isLoaded: false,
        showModal: false,
        disable: true,
        gmultipValidation: false,
        disableElements: undefined,
        docTypeList: [],
        form: {
          applicantTypeCCC: "",
          applicantCuilNumber: "",
          applicantName: "",
          applicantSurname: ""
        },
        modal: {
          component: "",
          title: "",
          size: "md",
          classAccept: "",
          textBtnAccept: "",
          textBtnCancel: ""
        }
      };

      _this2.retiroNominaController = new RetiroNominaController();
      _this2.vidaColectivoController = new VidaColectivoController();
      _this2.endososController = new EndososController();

      _this2.formData = {
        isModify: true,
        conyugeModify: "N",
        sumAsegModify: "N"
      };

      _this2.referencies = {
        applicantTypeCCC: React.createRef(),
        applicantCuilNumber: React.createRef(),
        applicantName: React.createRef(),
        applicantSurname: React.createRef(),
        applicantDateBirth: React.createRef(),
        conyugeTypeCCC: React.createRef(),
        conyugeCuilNumber: React.createRef(),
        conyugeName: React.createRef(),
        conyugeSurname: React.createRef(),
        applicantPlus: React.createRef(),
        applicantNameConyuge: React.createRef(),
        applicantEmailConyuge: React.createRef(),
        applicantCUILConyuge: React.createRef(),
        applicantDateBirthConyuge: React.createRef(),
        applicantSurnameConyuge: React.createRef()
      };
      return _this2;
    }

    _createClass(AdditionFormModify, [{
      key: "render",
      value: function render() {
        var product = this.props.product;
        var DATA = this.state.DATA;

        var fechaActual = this.props.user.FECHA.split(" ");

        if (this.state.isLoaded) {
          if (this.state.currentForm === "formModify") {
            return React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "h3",
                { className: "subtitle-inside" },
                "Solicitud de Vida Colectivo \u2013 ",
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
                "Datos del asegurado titular"
              ),
              React.createElement(
                "form",
                null,
                React.createElement(
                  "div",
                  { className: "form-row mt-2 form-height" },
                  React.createElement(
                    "div",
                    { className: "form-group col-3 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "applicantTypeCCC"
                      },
                      "CUIT/CUIL/CDI"
                    ),
                    React.createElement(DropDownContent, {
                      ref: this.referencies.applicantTypeCCC,
                      list: this.state.docTypeList,
                      className: "input-background-color form-control  input-size",
                      id: "applicantTypeCCC",
                      name: "applicantTypeCCC",
                      typeValue: "id",
                      idObject: "POV_COD_TDO",
                      nameObject: "POV_DES_TDO",
                      defaultValue: "0" + product.TIP_DOC,
                      disabled: true,
                      onResult: this._handleResults
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-3 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "applicantCuilNumber"
                      },
                      "N\xFAmero de CUIL"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.applicantCuilNumber,
                      classNameAd: "hide",
                      id: "applicantCuilNumber",
                      name: "applicantCuilNumber",
                      minLength: "8",
                      maxLength: "11",
                      value: product.NRO_DOC,
                      className: "input-background-color form-control input-size",
                      formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
                      upperCase: true,
                      disabled: true,
                      onResult: this._handleResults
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-3 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "applicantName"
                      },
                      "Nombre"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.applicantName,
                      classNameAd: "hide",
                      id: "applicantName",
                      name: "applicantName",
                      minLength: "2",
                      maxLength: "40",
                      pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                      value: product.ASE_NOM,
                      className: "input-background-color form-control input-size",
                      formatText: "Nombre Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                      upperCase: true,
                      disabled: true,
                      onResult: this._handleResults
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-3 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "applicantSurname"
                      },
                      "Apellido"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.applicantSurname,
                      classNameAd: "hide",
                      id: "applicantSurname",
                      name: "applicantSurname",
                      minLength: "2",
                      maxLength: "40",
                      pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                      value: product.ASE_APE,
                      className: "input-background-color form-control input-size",
                      formatText: "Apellido Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                      upperCase: true,
                      disabled: true,
                      onResult: this._handleResults
                    })
                  )
                )
              ),
              this.state.isConyuge ? React.createElement(
                "h5",
                { className: "mb-2 mt-2" },
                "Opci\xF3n para el c\xF3nyuge"
              ) : "",
              this.state.conyugeAdherido ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "form",
                  null,
                  React.createElement(
                    "p",
                    { className: "mb-0" },
                    "Datos del c\xF3nyuge adherido"
                  ),
                  React.createElement(
                    "div",
                    { className: "form-row mt-2 form-height" },
                    React.createElement(
                      "div",
                      { className: "form-group col-3 text-center" },
                      React.createElement(
                        "label",
                        {
                          className: "font-size-ddben-beneficiary",
                          htmlFor: "conyugeTypeCCC"
                        },
                        "CUIT/CUIL/CDI"
                      ),
                      React.createElement(DropDownContent, {
                        ref: this.referencies.conyugeTypeCCC,
                        list: this.state.docTypeList,
                        className: "input-background-color form-control  input-size",
                        id: "conyugeTypeCCC",
                        name: "conyugeTypeCCC",
                        typeValue: "id",
                        idObject: "POV_COD_TDO",
                        nameObject: "POV_DES_TDO",
                        defaultValue: "0" + DATA.DOCUMTIPC,
                        disabled: true,
                        onResult: this._handleResults
                      })
                    ),
                    React.createElement(
                      "div",
                      { className: "form-group col-3 text-center" },
                      React.createElement(
                        "label",
                        {
                          className: "font-size-ddben-beneficiary",
                          htmlFor: "applicantCuilNumber"
                        },
                        "N\xFAmero de CUIL"
                      ),
                      React.createElement(InputValidation, {
                        ref: this.referencies.applicantCUILConyuge,
                        classNameAd: "hide",
                        id: "applicantCUILConyuge",
                        name: "applicantCUILConyuge",
                        minLength: "8",
                        maxLength: "11",
                        value: DATA.DOCUMDATC,
                        className: "input-background-color form-control input-size",
                        formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
                        upperCase: true,
                        disabled: true,
                        onResult: this._handleResults
                      })
                    ),
                    React.createElement(
                      "div",
                      { className: "form-group col-3 text-center" },
                      React.createElement(
                        "label",
                        {
                          className: "font-size-ddben-beneficiary",
                          htmlFor: "applicantName"
                        },
                        "Nombre"
                      ),
                      React.createElement(InputValidation, {
                        ref: this.referencies.applicantNameConyuge,
                        classNameAd: "hide",
                        id: "applicantNameConyuge",
                        name: "applicantNameConyuge",
                        minLength: "2",
                        maxLength: "40",
                        pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                        value: DATA.CLIENNOMC,
                        className: "input-background-color form-control input-size",
                        formatText: "Nombre Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                        upperCase: true,
                        disabled: true,
                        onResult: this._handleResults
                      })
                    ),
                    React.createElement(
                      "div",
                      { className: "form-group col-3 text-center" },
                      React.createElement(
                        "label",
                        {
                          className: "font-size-ddben-beneficiary",
                          htmlFor: "applicantSurname"
                        },
                        "Apellido"
                      ),
                      React.createElement(InputValidation, {
                        ref: this.referencies.applicantSurnameConyuge,
                        classNameAd: "hide",
                        id: "applicantSurnameConyuge",
                        name: "applicantSurnameConyuge",
                        minLength: "2",
                        maxLength: "40",
                        pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                        value: DATA.CLIENAPEC,
                        className: "input-background-color form-control input-size",
                        formatText: "Apellido Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                        upperCase: true,
                        disabled: true,
                        onResult: this._handleResults
                      })
                    )
                  )
                )
              ) : React.createElement(
                React.Fragment,
                null,
                this.state.isConyuge ? React.createElement(FormPointConyuge, {
                  handlerIsConyuge: this.handlerIsConyuge,
                  handleCheckConyuge: this.handleCheckConyuge,
                  product: this.props.product,
                  check: this.state.check,
                  isConyuge: this.state.isConyuge,
                  conyuge: this.state.conyuge,
                  applicantData: this.formData,
                  docTypeList: this.state.docTypeList,
                  onResults: this._handleResults,
                  readOnly: false,
                  fecha: fechaActual[0],
                  isModify: true,
                  disableElements: this.state.disableElements,
                  recSolData: this.state.recSolData
                }) : ""
              ),
              React.createElement(
                "h5",
                { className: "mb-2 mt-2" },
                this.props.product.TIP_PRO === "CU" || this.props.product.TIP_PRO === "AP" ? "Datos tu seguro" : this.state.recSolData !== undefined && this.state.recSolData.sumAsegModify === "S" ? "Suma Asegurada Modificada" : this.state.recSolData !== undefined && this.state.recSolData.sumAsegModify === "N" ? "Suma Asegurada" : "Modifica tu Suma Asegurada"
              ),
              this.props.product.TIP_PRO === "AP" ? React.createElement(ApQuote, {
                conyuge: this.state.conyuge,
                isConyuge: this.state.isConyuge,
                listPoliza: this.state.listPoliza,
                grupoPoliza: this.state.grupoPoliza,
                listSubGrupos: this.state.listSubGrupos,
                notConyuge: this.state.notConyuge,
                applicantData: this.formData,
                onResults: this._handleResults,
                readOnly: false,
                isModify: true
              }) : React.createElement(BonusQuote, {
                handleCheckDdjj: this.handleCheckDdjj,
                isConyuge: this.state.isConyuge,
                notConyuge: this.state.notConyuge,
                product: this.props.product,
                applicantData: this.formData,
                onResults: this._handleResults,
                readOnly: false,
                listPoliza: this.state.listPoliza,
                grupoPoliza: this.state.grupoPoliza,
                listSubGrupos: this.state.listSubGrupos,
                isModify: true,
                sumAseg: DATA.CAPITASG,
                multiplo: DATA.MULTIPLO,
                sueldo: DATA.IMPSUELD,
                disableElements: this.state.disableElements,
                recSolData: this.state.recSolData
              }),
              this.props.product.COD_EST === "E" && this.state.disableElements ? React.createElement(
                React.Fragment,
                null,
                React.createElement("br", null),
                React.createElement(
                  "p",
                  null,
                  "La modificacion esta pendiente de aprobacion por su empleador"
                )
              ) : "",
              React.createElement(
                "div",
                { className: "row justify-content-md-start col-md-12 text-center" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                    type: "button",
                    onClick: this._handleSendForm,
                    disabled: this.state.disableElements !== undefined ? this.state.disableElements : this.state.disable
                  },
                  "Enviar"
                ),
                React.createElement(
                  "button",
                  {
                    className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                    type: "button",
                    onClick: this.props.handleShowAdditionRequestColectivo
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
          } else if (this.state.currentForm === "sendOk") {
            return React.createElement(ProcessOk, {
              handleShowAdditionRequestColectivo: this.props.handleShowAdditionRequestColectivo,
              product: this.props.recoverPayrollEmployees,
              handleSetRequestNumber: this.props.handleSetRequestNumber,
              isModify: true
            });
          }
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

        var vidaController = new VidaColectivoController();
        var controller = new RetiroNominaController();

        controller.getTipoDocumento(function (docData) {
          _this3.setState({ docTypeList: docData });

          vidaController.getDatosPoliza(_this3.props.product.POL_SEC, _this3.props.product.POL_ANN, _this3.props.product.COD_PRO, function (callBack) {
            if (callBack !== "ERROR") {
              var codGrupo = _this3.props.product.COD_GRU;
              var dataPoliza = callBack.Message.DATOS;
              var gruposPoliza = dataPoliza.GRUPOS.GRUPO;

              var grupo = gruposPoliza.length > 0 ? gruposPoliza.filter(function (grupo) {
                return grupo.GRUPOCOD === codGrupo;
              }) : [];
              var subGrupos = gruposPoliza.length > 0 ? gruposPoliza.filter(function (grupo) {
                return grupo.GRUPOPRI === codGrupo;
              }) : [];

              _this3.setState({
                listPoliza: dataPoliza,
                grupoPoliza: grupo[0],
                listSubGrupos: subGrupos
              });

              if (subGrupos.length === 1) {
                _this3.setState({ isConyuge: true });
              } else {
                _this3.setState({ isConyuge: false });
              }

              vidaController.getPolizaAseg(_this3.props.product.POL_SEC, _this3.props.product.POL_ANN, _this3.props.product.COD_PRO, function (callBack) {
                if (callBack !== "ERROR") {
                  var data = callBack.Message.DATOS;

                  if (data.CONYUGE === "S") {
                    _this3.setState({ conyugeAdherido: true });
                  }

                  if (_this3.props.product.COD_EST === "E") {
                    controller.getRequest(_this3.props.recoverPayrollEmployees.COD_PRO, _this3.props.recoverPayrollEmployees.NRO_SOL, function (requestData) {
                      var conyugeModify = requestData.REGS.REG[0].DA1_PAI.charAt(0);

                      var formDataSent = {
                        applicantPlus: requestData.REGS.REG[0].EMP_NOM,
                        applicantNameConyuge: requestData.PERSONAS.PERSONA[0].NOM_PER,
                        applicantEmailConyuge: requestData.PERSONAS.PERSONA[0].DIR_EMA,
                        applicantCUILConyuge: requestData.PERSONAS.PERSONA[0].NRO_CUI,
                        applicantDateBirthConyuge: requestData.PERSONAS.PERSONA[0].FEC_NAC,
                        applicantSurnameConyuge: requestData.PERSONAS.PERSONA[0].APE_PER,
                        conyugeModify: conyugeModify,
                        sumAsegModify: requestData.REGS.REG[0].DA1_PAI.charAt(1),
                        formConyuge: conyugeModify === "S" ? "1" : "2",
                        salary: Number(requestData.REGS.REG[0].EMP_ROL),
                        applicantSalary: requestData.REGS.REG[0].EMP_IME
                      };

                      var polizaAsegData = {
                        applicantPlus: data.CAPITASG,
                        conyugeModify: data.CONYUGE,
                        salary: data.MULTIPLO,
                        applicantSalary: data.IMPSUELD
                      };

                      var validacion = _this3._handleValidacionSolicitud(formDataSent, polizaAsegData);

                      _this3.setState({
                        DATA: data,
                        isLoaded: true,
                        recSolData: formDataSent,
                        disableElements: !validacion ? !validacion : undefined,
                        polizaAsegData: polizaAsegData
                      });

                      _this3.formData.formConyuge = {
                        id: formDataSent.conyugeModify === "S" ? "1" : "2",
                        referencies: undefined
                      };

                      _this3.formData.formModify = {
                        id: formDataSent.sumAsegModify === "S" ? "1" : "2",
                        referencies: undefined
                      };

                      _this3.formData.sumAsegModify = formDataSent.sumAsegModify;
                      _this3.formData.conyugeModify = formDataSent.conyugeModify;
                    });
                  } else {
                    _this3.setState({
                      DATA: data,
                      isLoaded: true
                    });
                  }
                }
              });
            }
          });
        });
      }
    }]);

    return AdditionFormModify;
  }(React.Component);

  return AdditionFormModify;
});