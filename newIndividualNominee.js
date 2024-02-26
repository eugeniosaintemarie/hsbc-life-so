var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/errorList", "../../controller/nominaController", "./formIndividualNominee", "../../lib/utils"], function (React, ErrorList, NominaController, FormIndividualNominee, Utils) {
  var NewIndividualNominee = function (_React$Component) {
    _inherits(NewIndividualNominee, _React$Component);

    function NewIndividualNominee(props) {
      _classCallCheck(this, NewIndividualNominee);

      var _this = _possibleConstructorReturn(this, (NewIndividualNominee.__proto__ || Object.getPrototypeOf(NewIndividualNominee)).call(this, props));

      _this.FORM_NAME = "newIndividualNominee";
      _this.ramoCod = _this.props.product.ramopcod;
      _this.age = 0;
      _this.plans = {
        accPer: ["CAP1", "CAP2", "CAP3", "CAP5", "CA01", "CA11", "CA12", "CA13", "CA21"],
        salDeu: ["CD11", "CD21", "CD22", "CD23", "CD24"],
        vidaObl: ["CE11", "CE17", "CE21", "CE23", "CE27", "CM01", "CM11", "CO11", "CS11", "CS13"],
        vidaColecOp: ["CT01", "CT11"],
        vidaCe15: "CE15",
        vidaCe13: "CE13"
      };

      _this._handleDateFormat = function (date) {
        date = String(date);
        var day = date.substring(0, 2);
        var month = date.substring(3, 5);
        var year = date.substring(6);
        return Number(year + month + day);
      };

      _this._handleMoneyFormat = function (money) {
        var newMoney = "";
        if (money != undefined) {
          if (typeof money == "string") {
            newMoney = money.replace(',', '.');
            return Number(newMoney);
          } else {
            newMoney = money.toString().replace('.', ',');
            return newMoney;
          }
        }
        return newMoney;
      };

      _this._handlePropsFormat = function (data) {
        if (data == undefined) {
          return newObject = {};
        } else {
          newObject = {
            CLIENAP1: data.CLIENAP1,
            CLIENOM: data.CLIENOM,
            COBERTURAS: data.COBERTURAS,
            DOCUMDAT: data.DOCUMDAT,
            SEXO: data.SEXO,
            FECNAC: data.FECNAC,
            FECING: data.FECING,
            PROFECOD: data.PROFECOD,
            SALDODEUDA: _this._handleMoneyFormat(data.SALDODEUDA),
            SUMASEG: _this._handleMoneyFormat(data.SUMASEG),
            SUELDO: _this._handleMoneyFormat(data.SUELDO),
            EMAIL: data.EMAIL,
            EMAILVER: data.EMAIL
          };
          return newObject;
        }
      };

      _this.newFormatNominee = _this._handlePropsFormat(_this.props.selectedNominee);

      _this._newNominee = function (id) {
        return React.createElement(
          "div",
          null,
          React.createElement("hr", null),
          React.createElement(FormIndividualNominee, {
            isEdit: _this.props.isEdit,
            onResult: _this._handleChange,
            id: id,
            plans: _this.plans,
            ramoCod: _this.ramoCod,
            selectedNominee: _this.newFormatNominee,
            product: _this.props.product,
            showError: _this._showServiceError })
        );
      };

      _this._handleChange = function (id, result) {
        _this.listValuesNominee[id] = result;
      };

      _this.validateFecha = function (dateString) {
        var parts = dateString.split("/");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);

        if (year < 1000 || year > 3000 || month == 0 || month > 12) {
          return false;
        }
        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 400 == 0 || year % 100 != 0 && year & 4 == 0) {
          monthLenght[1] = 29;
        }
        return day > 0 && day <= monthLength[month - 1];
      };

      _this._handleAge = function (birthDate, currentDate) {
        var birthDay = birthDate.toString().slice(-2);
        var birthMonth = birthDate.toString().slice(4, 6);
        var birthYear = birthDate.toString().slice(0, 4);
        var currentDay = currentDate.toString().slice(-2);
        var currentMonth = currentDate.toString().slice(4, 6);
        var currentYear = currentDate.toString().slice(0, 4);
        var age = Number(currentYear - birthYear);
        if (currentMonth < birthMonth) {
          age--;
        }
        if (birthMonth == currentMonth && currentDay < birthDay) {
          age--;
        }
        return age;
      };

      _this._handleUpdateOnClick = function () {
        var today = 0;
        var listError = [];
        var validationOk = true;
        var badCuil = _this.props.duplicateChecker("DOCUMDAT", _this.listValuesNominee[1].cuil.value);
        var badMail = _this.props.duplicateChecker("EMAIL", _this.listValuesNominee[1].email.value);
        var emailData = _this.listValuesNominee[1].email.value;

        var listSend = Object.keys(_this.listValuesNominee).map(function (currency) {
          var nominee = _this.listValuesNominee[currency];
          Object.keys(nominee).map(function (e) {
            _handleFieldValidation = function _handleFieldValidation(array, index, field, text) {
              if (index == field) {
                if (array[index].isValidate == false && array[index].value != "" && (index != "fecNac" || index != "fecIng")) {
                  array[index].refe.current._onFocus(false);
                  validationOk = false;
                  listError.push(text);
                }
                if (array[index].value == "") {
                  array[index].refe.current._onFocus(true);
                  validationOk = false;
                  listError = _this.state.listErrorText;
                }
              }
            };

            //inicio de verificacion que van en todos los ramos
            if (e == "emailVer") {
              if (emailData != nominee[e].value) {
                nominee[e].refe.current._onFocus(true);
                validationOk = false;
                listError.push("El correo electrónico no coincide");
              }
            }

            if (e == "cuil") {
              // aca se fija si hay 11 numeros
              if (!Utils.fValCUIT(nominee[e].value)) {
                nominee[e].refe.current._onFocus(true);
                validationOk = false;
              } else if (badCuil == false) {
                //aca permite que se pueda modificar sin que tomer el CUIL repetido
                nominee[e].refe.current._onFocus(true);
                validationOk = true;
              } else if (badCuil == true) {
                // aca se fija que no haya repetidos
                nominee[e].refe.current._onFocus(true);
                validationOk = false;
                listError.push("El Cuil se encuentra duplicado");
              }
            }

            if (e == "email") {
              if (nominee[e].isValidate == false && nominee[e].value != "") {
                nominee[e].refe.current._onFocus(true);
                validationOk = false;
              } else if (badMail) {
                // aca se fija que no haya repetidos
                nominee[e].refe.current._onFocus(true);
                validationOk = false;
                listError.push("El Mail se encuentra duplicado");
              } else {
                //aca permite que se pueda modificar sin que tomer el MAIL repetido
                nominee[e].refe.current._onFocus(true);
                validationOk = true;
              }
            }

            if (e == "fecNac") {
              if (!_this.validateFecha(_this.listValuesNominee[currency].fecNac.value)) {
                nominee[e].refe.current._onFocus(true);
                validationOk = false;
                listError.push("La fecha esta mal ingresada");
              } else {
                var hoy = new Date();
                var minimo = new Date(hoy.getFullYear() - 120, 1, 1);
                var maximo = new Date();
                var nacimientoFormateado = _this._handleDateFormat(_this.listValuesNominee[currency].fecNac.value);
                var fechaIngresada = new Date(parseInt(String(nacimientoFormateado).substring(0, 4)), parseInt(String(nacimientoFormateado).substring(4, 6)), parseInt(String(nacimientoFormateado).substring(6, 8)));

                if (fechaIngresada < minimo || fechaIngresada > maximo) {
                  nominee[e].refe.current._onFocus(true);
                  validationOk = false;
                  listError.push("La edad debe ser entre 0 y 120 años");
                }
              }
            }

            _handleFieldValidation(nominee, e, "name", "El formato del nombre no es el correcto, la longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o más letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre");
            _handleFieldValidation(nominee, e, "surname", "El formato del apellido no es el correcto, la longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o más letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre");
            _handleFieldValidation(nominee, e, "cuil", "El CUIL debe tener 11 dígitos");
            _handleFieldValidation(nominee, e, "sexo", "Se debe elegir el sexo");

            //fin de vereficacion que van en todos los ramos
            //inicio verificacion de lo campos adicionales segun el ramo
            if (_this.plans.accPer.some(function (el) {
              return el == _this.ramoCod;
            })) {
              if (e == "profeCod") {
                if (nominee[e].id == "") {
                  nominee[e].refe.current._onFocus();
                  validationOk = false;
                  listError = ["Seleccioná una Actividad de la lista"];
                }
              }
              _handleFieldValidation(nominee, e, "profeCod", "");
            }

            if (_this.plans.vidaColecOp.some(function (el) {
              return el == _this.ramoCod;
            })) {
              _handleFieldValidation(nominee, e, "fecIng", "Formato de fecha invalido");
            }
          });

          _this.setState({ showError: !validationOk, listErrorText: listError });

          //variable creada para enviar el valor de suma asegurada destro del array de coberturas
          var coverage = [];

          for (var i = 0; i < 20; i++) {
            coverage[i] = { COBERCOD: 0, SUMAASEG: 0 };
          }

          coverage[0] = {
            COBERCOD: !_this.props.selectedNominee ? 0 : _this.props.selectedNominee.COBERTURAS.COBERTURA[0].COBERCOD,
            SUMAASEG: _this._handleMoneyFormat(_this.listValuesNominee[currency].sumAseg.value)
          };

          return {
            FECING: _this._handleDateFormat(_this.listValuesNominee[currency].fecIng.value),
            EDAD: _this.age,
            SUELDO: _this._handleMoneyFormat(_this.listValuesNominee[currency].sueldo.value),
            DOCUMDAT: _this.listValuesNominee[currency].cuil.value,
            COBERTURAS: { COBERTURA: coverage },
            DOCUMTIP: !_this.props.selectedNominee ? 5 : _this.props.selectedNominee.DOCUMTIP,
            PROFECOD: !_this.listValuesNominee[currency].profeCod.id ? "" : _this.listValuesNominee[currency].profeCod.id,
            SEXO: _this.listValuesNominee[currency].sexo.id,
            CLIENAP2: !_this.props.selectedNominee ? "" : _this.props.selectedNominee.CLIENAP2,
            CLIENOM: _this.listValuesNominee[currency].name.value,
            GRABAFEC: !_this.props.selectedNominee ? today : _this.props.selectedNominee.GRABAFEC,
            CLIENAP1: _this.listValuesNominee[currency].surname.value,
            FECNAC: _this._handleDateFormat(_this.listValuesNominee[currency].fecNac.value),
            EMAIL: _this.listValuesNominee[currency].email.value,
            DOCUMTIPT: !_this.props.selectedNominee ? 0 : _this.props.selectedNominee.DOCUMTIPT,
            SWSELEC: !_this.props.selectedNominee ? "" : _this.props.selectedNominee.SWSELEC,
            DOCUMDATT: !_this.props.selectedNominee ? "" : _this.props.selectedNominee.DOCUMDATT,
            TOPCONVE: !_this.props.selectedNominee ? "" : _this.props.selectedNominee.TOPCONVE,
            MODIFNOM: !_this.props.selectedNominee ? "A" : "M",
            SALDODEUDA: _this._handleMoneyFormat(_this.listValuesNominee[currency].saldoDeuda.value)
          };
        });

        if (validationOk) {
          if (_this.props.desigBenefEnabled) {
            _this.nominaController.validateNominaAbm(listSend).then(function () {
              _this.props.addNominee(listSend[0]);
              _this.props.switch('table');
            });
          } else {
            _this.props.addNominee(listSend[0]);
            _this.props.switch('table');
          }
        }
      };

      _this._showServiceError = function (serviceErrorText) {
        _this.setState({ showError: true, listErrorText: [serviceErrorText] });
      };

      _this._handleCancelOnClick = function () {
        _this.props.switch('table');
      };

      _this._showForms = function () {
        return Object.keys(_this.state.listNominees).map(function (currency) {
          return React.createElement(
            "div",
            { key: currency },
            _this.state.listNominees[currency]
          );
        });
      };

      _this.state = {
        listErrorText: ["Por favor, completá los campos indicados para poder continuar"],
        showError: false,
        listNominees: [_this._newNominee(1)]
      };

      _this.listValuesNominee = {};
      _this.nominaController = new NominaController();
      return _this;
    }

    //funcion que da formato correcto para la lectura del formulario


    _createClass(NewIndividualNominee, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            null,
            !this.props.selectedNominee ? "Nuevo nominado" : "Modificar nominado"
          ),
          this._showForms(),
          React.createElement(
            "div",
            { className: "container mt-5" },
            React.createElement(ErrorList, {
              show: this.state.showError,
              list: this.state.listErrorText,
              className: "text-danger text-center"
            }),
            React.createElement(
              "div",
              { className: "text-center mt-3" },
              React.createElement(
                "button",
                {
                  className: "btn btn-dark  m-1 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleUpdateOnClick
                },
                "Actualizar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-light  m-1 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleCancelOnClick
                },
                "Cancelar"
              )
            )
          )
        );
      }
    }]);

    return NewIndividualNominee;
  }(React.Component);

  return NewIndividualNominee;
});