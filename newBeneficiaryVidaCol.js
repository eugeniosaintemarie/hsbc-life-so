var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./formNewBeneficiaryVidaCol", "../../../common/errormessage", "../../../common/modalReactBootstrap", "../../../lib/utils"], function (React, FormBeneficiary, ErrorMessage, ModalReactBootstrap, Utils) {
  var NewBeneficiaryVidaCol = function (_React$Component) {
    _inherits(NewBeneficiaryVidaCol, _React$Component);

    function NewBeneficiaryVidaCol(props) {
      _classCallCheck(this, NewBeneficiaryVidaCol);

      var _this = _possibleConstructorReturn(this, (NewBeneficiaryVidaCol.__proto__ || Object.getPrototypeOf(NewBeneficiaryVidaCol)).call(this, props));

      _this.listValuesBeneficiary = {};

      _this._checkEdadFamiliares = function (nacimiento) {
        var dateBirthday = Utils.formatPolizaDate(nacimiento);
        if (Utils.fAgeCalc(dateBirthday) < 0 || Utils.fAgeCalc(dateBirthday) > 119) {
          return false;
        } else {
          return true;
        }
      };

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

      _this._handleUpdateOnClick = function () {
        var textError = "";
        var order = null;
        var lastOrder = null;
        var validationOK = true;
        var listSend = Object.keys(_this.listValuesBeneficiary).map(function (currency) {
          var benef = _this.listValuesBeneficiary[currency];
          var birthday = _this.listValuesBeneficiary[currency]["birthday" + currency].value.split("/");
          Object.keys(benef).map(function (e) {
            if (benef[e].isValidate == false || benef[e].value == "") {
              if (e == "name" || e == "surname") {
                benef[e].refe.current._setInvalid();
                validationOK = false;
                textError = "El formato del campo indicado no es el correcto, la longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.";
              }
              benef[e].refe.current._onFocus(true);
              validationOK = false;
            } else if (e == "order") {
              lastOrder = _this._lastOrder();
              order = Number(benef[e].value);
              if (order > lastOrder) {
                validationOK = false;
                textError = "Número de orden no válido";
              }
            } else if (e == "perc") {
              if (benef[e].value == 0) {
                validationOK = false;
                textError = "El porcentaje no puede ser 0%";
              } else if (!_this._checkPercent(order, benef[e].value)) {
                benef[e].refe.current._setInvalid();
                validationOK = false;
                textError = "El porcentaje de la orden " + order + " excede el 100%";
              }
            } else if (e == "age") {
              if (benef[e] == "") {
                validationOK = false;
                textError = "Ingrese una fecha válida";
              }
            } else if (e == "birthday1") {
              var fechaNacimiento = benef[e].value;
              birthday = birthday[2] + birthday[1] + birthday[0];

              var fecha = fechaNacimiento.split("/");
              var dia = parseInt(fecha[0], 10);
              var mes = parseInt(fecha[1], 10) - 1;
              var anio = parseInt(fecha[2], 10);
              var date = new Date(anio, mes, dia);

              var regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;

              if (fechaNacimiento !== "") {
                if (!regexFecha.test(fechaNacimiento)) {
                  validationOK = false;
                  textError = "Fecha de Nacimiento incompleta";
                } else if (date.getFullYear() !== anio || date.getMonth() !== mes || date.getDate() !== dia) {
                  validationOK = false;
                  textError = "Fecha de Nacimiento invalida, el formato debe ser DD/MM/AAAA";
                } else if (!_this._checkEdadFamiliares(birthday)) {
                  validationOK = false;
                  textError = "La edad debe ser entre 0 y 120 años.";
                }
              }
            }
          });

          _this.setState({ showError: !validationOK, textError: textError });

          return {
            NOMINAS: {
              APEBENE: _this.listValuesBeneficiary[currency].surname.value,
              TIPDOCBENE: _this.listValuesBeneficiary[currency].typeDoc.id,
              BENEFORD: _this.listValuesBeneficiary[currency].order.value,
              NUMDOCBENE: _this.listValuesBeneficiary[currency].dniNumber.value,
              BENEPORC: _this.listValuesBeneficiary[currency].perc.value,
              RELBECOD: _this.listValuesBeneficiary[currency].relationShip.id,
              FNACIMIE: birthday,
              BENNOMBRE: _this.listValuesBeneficiary[currency].name.value,
              BENEMAIL: _this.listValuesBeneficiary[currency].email.value,
              BENNUMTELEF: _this.listValuesBeneficiary[currency].telephone.value
            }
          };
        });

        if (validationOK) {
          _this.props.setIsEdited();
          _this.props.addResult(listSend[0]);
        }
      };

      _this._hadleAddBeneficiary = function () {
        var list = _this.state.listBeneficiary;
        list.push(_this._newBeneficiary(_this.state.listBeneficiary.length + 1));

        _this.setState({
          listBeneficiary: list
        });
      };

      _this._lastOrder = function () {
        var mayor = 1;
        _this.props.listaBeneficiarios.map(function (item) {
          if (item.NOMINAS.BENEFORD > mayor) mayor = item.NOMINAS.BENEFORD;
        });
        return Number(mayor) + 1;
      };

      _this._checkPercent = function (order, percent) {
        var total = Number(percent) * 100;
        _this.props.listaBeneficiarios.map(function (item, i) {
          if (item.NOMINAS.BENEFORD == order && _this.props.idItem != i) {
            total += Number(item.NOMINAS.BENEPORC);
          }
        });
        if (total > 10000) return false;else return true;
      };

      _this._handleButtonNew = function () {
        _this.props.handlerSwitch("inicio");
      };

      _this._newBeneficiary = function (id) {
        return React.createElement(
          "div",
          null,
          React.createElement("hr", null),
          React.createElement(FormBeneficiary, {
            applicantData: _this.props.applicantData,
            selectedItem: _this.props.selectedItem,
            listaBeneficiarios: _this.props.listaBeneficiarios,
            id: id,
            onResult: _this._handleChange,
            orderList: _this.props.orderList,
            listTipoDoc: _this.props.listTipoDoc,
            listParentesco: _this.props.listParentesco,
            fecha: _this.props.fecha
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

    _createClass(NewBeneficiaryVidaCol, [{
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

    return NewBeneficiaryVidaCol;
  }(React.Component);

  return NewBeneficiaryVidaCol;
});