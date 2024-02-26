var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./formIndividualBeneficiary", "../../../common/errormessage"], function (React, FormIndividualBeneficiary, ErrorMessage) {
  var NewIndividualBeneficiary = function (_React$Component) {
    _inherits(NewIndividualBeneficiary, _React$Component);

    function NewIndividualBeneficiary(props) {
      _classCallCheck(this, NewIndividualBeneficiary);

      var _this = _possibleConstructorReturn(this, (NewIndividualBeneficiary.__proto__ || Object.getPrototypeOf(NewIndividualBeneficiary)).call(this, props));

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

      _this._handleUpdateOnClick = function () {
        var textError = "";
        var order = null;
        var lastOrder = null;
        var validationOK = true;
        var listSend = Object.keys(_this.listValuesBeneficiary).map(function (currency) {
          var benef = _this.listValuesBeneficiary[currency];
          Object.keys(benef).map(function (e) {
            if (e == "email") {
              if (benef[e].isValidate == false && benef[e].value != "") {
                benef[e].refe.current._setInvalid();
                validationOK = false;
                textError = "El formato del correo electronico no es el correcto";
              }
            }
            if ((benef[e].isValidate == false || benef[e].value == "") && e != "email" && e != "telephone" && e != "numberFloor" && e != "numberDepart" && e != "location") {
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
                textError = "N\xfamero de orden no v\xE1lido";
                benef[e].refe.current._setInvalid();
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
            } else if (benef[e].value == undefined || benef[e].value == "") {
              if (e == "location") {
                if (benef["state"].value != "CAPITAL FEDERAL") {
                  benef[e].refe.current._onFocus(true);
                  validationOK = false;
                }
              }
            }
          });

          var birthday = _this.listValuesBeneficiary[currency]["birthday" + currency].value.split("/");
          birthday = birthday[2] + birthday[1] + birthday[0];

          _this.setState({ showError: !validationOK, textError: textError });

          return {
            NOMINAS: {
              APEBENE: _this.listValuesBeneficiary[currency].surname.value,
              TIPDOCBENE: _this.listValuesBeneficiary[currency].typeDoc.id,
              NUMDOCBENE: _this.listValuesBeneficiary[currency].dniNumber.value,
              BENEPORC: _this.listValuesBeneficiary[currency].perc.value,
              BENEFORD: _this.listValuesBeneficiary[currency].order.value,
              RELBECOD: _this.listValuesBeneficiary[currency].relationShip.id,
              RELBEDEP: _this.listValuesBeneficiary[currency].depFinancial.id,
              FNACIMIE: birthday,
              BENNOMBRE: _this.listValuesBeneficiary[currency].name.value,
              BENNACIONAL: _this.listValuesBeneficiary[currency].nationality.id,
              BENCALLE: _this.listValuesBeneficiary[currency].street.value,
              BENNUMERO: _this.listValuesBeneficiary[currency].numberStreet.value,
              BENPISO: _this.listValuesBeneficiary[currency].numberFloor.value,
              BENDEPTO: _this.listValuesBeneficiary[currency].numberDepart.value,
              BENCPOSTAL: _this.listValuesBeneficiary[currency].zipCode.value,
              BENPROVINCIA: _this.listValuesBeneficiary[currency].state.id,
              BENLOCALIDAD: _this.listValuesBeneficiary[currency].location.value,
              BENPAISTELEF: _this.listValuesBeneficiary[currency].codeCoutry.id,
              BENCARTELEF: _this.listValuesBeneficiary[currency].areaCode.value,
              BENNUMTELEF: _this.listValuesBeneficiary[currency].telephone.value,
              BENEMAIL: _this.listValuesBeneficiary[currency].email.value,
              BENESPEP: _this.listValuesBeneficiary[currency].pep.id,
              BENSEXO: _this.listValuesBeneficiary[currency].sex.id
            }
          };
        });

        if (validationOK == true) {
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
          if (item.NOMINAS.ORDEN > mayor) mayor = item.NOMINAS.ORDEN;
        });
        return Number(mayor) + 1;
      };

      _this._checkPercent = function (order, percent) {
        var total = Number(percent) * 100;

        _this.props.listaBeneficiarios.map(function (item, i) {
          if (item.NOMINAS.ORDEN == order && _this.props.idItem != i) {
            total += item.NOMINAS.PORCENT;
          }
        });
        if (total > 10000) return false;else return true;
      };

      _this._newBeneficiary = function (id) {
        return React.createElement(
          "div",
          null,
          React.createElement("hr", null),
          React.createElement(FormIndividualBeneficiary, {
            applicantData: _this.props.applicantData,
            selectedItem: _this.props.selectedItem,
            id: id,
            onResult: _this._handleChange,
            listTipoDoc: _this.props.listTipoDoc,
            listParentesco: _this.props.listParentesco
          })
        );
      };

      _this.state = {
        textError: "",
        showError: false,
        listBeneficiary: [_this._newBeneficiary(1)]
      };
      return _this;
    }

    _createClass(NewIndividualBeneficiary, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "h3",
            { className: "ml-2" },
            this.props.selectedItem ? "Modificar Beneficiario" : "Nuevo Beneficiario"
          ),
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

    return NewIndividualBeneficiary;
  }(React.Component);

  return NewIndividualBeneficiary;
});