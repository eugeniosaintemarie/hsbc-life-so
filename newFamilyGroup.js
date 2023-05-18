var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./formNewFamilyGroup", "../../../../common/errormessage", "../../../../common/modalReactBootstrap", "../../../../lib/utils"], function (React, FormNewFamilyGroup, ErrorMessage, ModalReactBootstrap, Utils) {
  var NewFamilyGroup = function (_React$Component) {
    _inherits(NewFamilyGroup, _React$Component);

    function NewFamilyGroup(props) {
      _classCallCheck(this, NewFamilyGroup);

      var _this = _possibleConstructorReturn(this, (NewFamilyGroup.__proto__ || Object.getPrototypeOf(NewFamilyGroup)).call(this, props));

      _this.listValuesBeneficiary = {};

      _this._isNew = function () {
        return _this.props.selectedItem ? false : true;
      };

      _this._handleChange = function (id, result) {
        _this.listValuesBeneficiary[id] = result;
      };

      _this._hadlesubtractBeneficiary = function () {
        var list = _this.state.listBeneficiary;
        list.pop();

        delete _this.listValuesBeneficiary[Object.keys(_this.listValuesBeneficiary).pop()];

        _this.setState({
          listBeneficiary: list
        });
      };

      _this._showForms = function () {
        return Object.keys(_this.state.listBeneficiary).map(function (currency) {
          return React.createElement(
            "div",
            { key: currency },
            _this.state.listBeneficiary[currency]
          );
        });
      };

      _this._handleCancelOnClick = function () {
        _this.props.handlerSwitch("ListBeneficiaries");
      };

      _this._checkNacimientoHijoMayor25 = function (nacimiento) {
        var hoyString = _this.props.listPoliza.FEC_HOY;
        var hoyDate = _this._fechaCambioFormato(hoyString);
        var nacimientoDate = _this._fechaCambioFormato(nacimiento);
        var edadDif = hoyDate.getFullYear() - nacimientoDate.getFullYear();
        var mesDif = hoyDate.getMonth() + 1 - (nacimientoDate.getMonth() + 1);
        var diaDif = hoyDate.getDate() - nacimientoDate.getDate();
        if (edadDif <= 24) {
          return true;
        } else if (edadDif == 25 && mesDif < 0) {
          return true;
        } else if (edadDif == 25 && mesDif == 0 && diaDif < 0) {
          return true;
        }
        return false;
      };

      _this._checkEdadFamiliares = function (nacimiento, edadMin, edadMax) {
        var dateBirthday = Utils.formatPolizaDate(nacimiento);
        if (Utils.fAgeCalc(dateBirthday) < edadMin || Utils.fAgeCalc(dateBirthday) > edadMax) {
          return false;
        } else {
          return true;
        }
      };

      _this._handleUpdateOnClick = function () {
        var textError = "";
        var validationOK = true;
        var listSend = [];
        if (!_this.props.selectedItem && _this.listValuesBeneficiary[1].relationShip.id == "50" && _this.props.listaBeneficiarios.find(function (element) {
          return element.NOMINAS.RELBECOD == "50";
        })) {
          validationOK = false;
          textError = "No puede asegurar mas de 1 conyuge";
        } else if (!_this.props.selectedItem && _this.listValuesBeneficiary[1].relationShip.id == "2" && _this.props.listaBeneficiarios.filter(function (element) {
          return element.NOMINAS.RELBECOD == "2";
        }).length == 6) {
          validationOK = false;
          textError = "No puede asegurar mas de 6 hijos";
        } else if (!_this.props.selectedItem && (_this.listValuesBeneficiary[1].relationShip.id == "101" || _this.listValuesBeneficiary[1].relationShip.id == "100") && _this.props.listaBeneficiarios.filter(function (element) {
          return element.NOMINAS.RELBECOD == "101" || element.NOMINAS.RELBECOD == "100";
        }).length == 4) {
          validationOK = false;
          textError = "No puede asegurar mas de 4 padres/suegros";
        } else {
          listSend = Object.keys(_this.listValuesBeneficiary).map(function (currency) {
            var benef = _this.listValuesBeneficiary[currency];
            var birthday = _this.listValuesBeneficiary[currency]["birthday" + currency].value.split("/");
            birthday = birthday[2] + birthday[1] + birthday[0];

            Object.keys(benef).map(function (e) {
              if (benef[e].isValidate == false || benef[e].value == "") {
                if (e == "name" || e == "surname") {
                  benef[e].refe.current._setInvalid();
                  validationOK = false;
                  textError = "El formato del campo indicado no es el correcto, la longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.";
                }
                benef[e].refe.current._onFocus(true);
                validationOK = false;
              } else if (e == "age") {
                if (benef[e] == "") {
                  validationOK = false;
                  textError = "Ingrese una fecha válida";
                }
              } else if (e == "birthday1") {
                var relationshipId = _this.listValuesBeneficiary[currency].relationShip.id;
                var grupo = _this.props.listPoliza.GRUPOS.GRUPO.find(function (e) {
                  return parseInt(e.GRUPOCOD) == relationshipId;
                });
                //el id 2 hace referencia a "hijos menores de 25 años"
                if (relationshipId == 2) {
                  if (!_this._checkNacimientoHijoMayor25(birthday)) {
                    validationOK = false;
                    textError = "La edad debe ser menor a 25 años.";
                  }
                } else if (!_this._checkEdadFamiliares(birthday, grupo.GEDADMIN, grupo.GEDADMAX)) {
                  {
                    validationOK = false;
                    textError = "La edad debe ser entre " + grupo.GEDADMIN + " y " + grupo.GEDADMAX + " años.";
                  }
                }
              }
            });

            return {
              NOMINAS: {
                APEBENE: _this.listValuesBeneficiary[currency].surname.value,
                TIPDOCBENE: _this.listValuesBeneficiary[currency].typeDoc.id,
                NUMDOCBENE: _this.listValuesBeneficiary[currency].dniNumber.value,
                RELBECOD: _this.listValuesBeneficiary[currency].relationShip.id,
                FNACIMIE: birthday,
                BENNOMBRE: _this.listValuesBeneficiary[currency].name.value
              }
            };
          });

          if (validationOK) {
            _this.props.setIsEdited();
            _this.props.addResult(listSend[0]);
          }
        }

        _this.setState({ showError: !validationOK, textError: textError });
      };

      _this._hadleAddBeneficiary = function () {
        var list = _this.state.listBeneficiary;
        list.push(_this._newBeneficiary(_this.state.listBeneficiary.length + 1));
        _this.setState({
          listBeneficiary: list
        });
      };

      _this._handleButtonNew = function () {
        _this.props.handlerSwitch("inicio");
      };

      _this._newBeneficiary = function (id) {
        return React.createElement(
          "div",
          null,
          React.createElement("hr", null),
          React.createElement(FormNewFamilyGroup, {
            applicantData: _this.props.applicantData,
            selectedItem: _this.props.selectedItem,
            listaBeneficiarios: _this.props.listaBeneficiarios,
            id: id,
            onResult: _this._handleChange,
            listTipoDoc: _this.props.listTipoDoc,
            listParentesco: _this.props.listParentesco,
            readOnly: _this.props.readOnly,
            listPoliza: _this.props.listPoliza

          })
        );
      };

      _this.state = {
        textError: "",
        showError: false,
        listBeneficiary: [_this._newBeneficiary(1)],
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false,
          accept: null
        }
      };
      return _this;
    }

    _createClass(NewFamilyGroup, [{
      key: "_fechaCambioFormato",
      value: function _fechaCambioFormato(fecha) {
        var año = "";
        var mes = "";
        var dia = "";
        fecha = String(fecha);
        for (var index = 0; index < fecha.length; index++) {

          if (index <= 3) {
            año += fecha[index];
          } else if (index > 3 && index <= 5) {
            mes += fecha[index];
          } else {
            dia += fecha[index];
          }
        }
        var fechaString = año + "/" + mes + "/" + dia;
        var fechaDate = new Date(fechaString);
        return fechaDate;
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "ml-2 mr-2" },
            this._showForms()
          ),
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(ErrorMessage, {
              show: this.state.showError,
              text: this.state.textError,
              className: "text-danger text-center"
            }),
            React.createElement(
              "div",
              { className: "text-center" },
              React.createElement(
                "button",
                {
                  className: "btn btn-dark  m-1 mt-1 p-1 pr-2 pl-2",
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

    return NewFamilyGroup;
  }(React.Component);

  return NewFamilyGroup;
});