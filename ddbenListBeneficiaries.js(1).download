var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./ddbenTable", "../../../common/modalReactBootstrap", "../../../common/errormessage"], function (React, DdbenTable, ModalReactBootstrap, ErrorMessage) {
  var DdbenListBeneficiaries = function (_React$Component) {
    _inherits(DdbenListBeneficiaries, _React$Component);

    function DdbenListBeneficiaries(props) {
      _classCallCheck(this, DdbenListBeneficiaries);

      var _this = _possibleConstructorReturn(this, (DdbenListBeneficiaries.__proto__ || Object.getPrototypeOf(DdbenListBeneficiaries)).call(this, props));

      _this._handleButtonNew = function () {
        _this.props.handlerSwitch("NewBeneficiary");
      };

      _this._checkUpdate = function () {
        var textError = "";
        var validationOK = true;

        //verificacion de nombres y apellidos
        var expression = /^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\1{2})[A-ZÑ]+ ?[[A-ZÑ]+ ?([[A-ZÑ]+)?$/im;
        var names = _this.props.listaBeneficiarios.map(function (item) {
          return item.NOMINAS.BENNOMBRE;
        });
        var lastNames = _this.props.listaBeneficiarios.map(function (item) {
          return item.NOMINAS.APEBENE;
        });
        for (var i = 0; i < names.length; i++) {
          // recorre todos los array
          var resultName = expression.test(names[i]);
          var resultLastName = expression.test(lastNames[i]);
          if (resultName == false) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el nombre con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          if (resultLastName == false) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el apellido con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          //verificacion de edad
          var age = _this.props.listaBeneficiarios.map(function (item) {
            return item.NOMINAS.FNACIMIE;
          });
          //let resultAge = /^\d\d?\d?$/im.test(age[i]);
          // if (resultAge == false) {
          //   validationOK = false;
          //   textError = "Algún beneficiario no tiene la edad con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          // }
          //verificacion de relacion o parentesco
          var relationship = _this.props.listaBeneficiarios.map(function (item) {
            return item.NOMINAS.RELBECOD;
          });
          resultRelationship = relationship[i];
          if (resultRelationship == "" || resultRelationship == "AC" || resultRelationship == "EM" || resultRelationship == "OT") {
            validationOK = false;
            textError = "Algún beneficiario no tiene el parentesco con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          //verificacion de documento
          var docType = _this.props.listaBeneficiarios.map(function (item) {
            return item.NOMINAS.TIPDOCBENE;
          });
          var docNumber = _this.props.listaBeneficiarios.map(function (item) {
            return item.NOMINAS.NUMDOCBENE;
          });
          var resultDocNumber = /^\d+$/im.test(docNumber[i]);
          var resultDocType = docType[i];
          if (resultDocNumber == false || resultDocType == 0) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el número de documento con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          if (resultDocType == 0) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el tipo de documento con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
        }

        //verificacion de ordenes
        var orders = _this.props.listaBeneficiarios.map(function (item) {
          return item.NOMINAS.BENEFORD;
        });
        var ordersOrdered = _this._arrayNoRepeats(orders);
        var consecutive = _this._areConsecutive(ordersOrdered);
        ordersOrdered.reverse();
        if (ordersOrdered[0] != undefined && ordersOrdered[0] != "1") {
          validationOK = false;
          textError = "Número de orden incorrecto, no puede haber orden " + ordersOrdered[0] + " sin tener orden 1, por favor ingresá a los mismos y verifícalo. Muchas gracias.";
        }
        if (consecutive != 0 && ordersOrdered.length > 1) {
          validationOK = false;
          textError = "Los números de orden no son consecutivos, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
        }
        //verificacion porcentajes
        var sorterOrders = _this._arrayNoRepeats(orders);
        sorterOrders.map(function (order) {
          totalporcentaje = 0;
          _this.props.listaBeneficiarios.map(function (benef) {
            if (benef.NOMINAS.BENEFORD == order) {
              totalporcentaje += parseInt(benef.NOMINAS.BENEPORC);
            }
          });
          if (totalporcentaje < 100) {
            validationOK = false;
            textError = "La orden " + order + " no llega a cubrir el 100%";
          } else if (totalporcentaje > 100) {
            validationOK = false;
            textError = "La orden " + order + " supera el 100%";
          }
        });

        //finalizacion de verificaciones

        _this.setState({ showError: !validationOK, textError: textError });
        _this.props.onResults(_this.props.listaBeneficiarios, validationOK);
      };

      _this._arrayNoRepeats = function (array) {
        var arrayOnlyNumber = [];
        var arrayOrderNoRepeats = array.filter(function (valor, indiceActual, arreglo) {
          return arreglo.indexOf(valor) === indiceActual;
        });
        arrayOrderNoRepeats.sort();
        for (var i = 0; i < arrayOrderNoRepeats.length; i++) {
          arrayOnlyNumber.push(Number(arrayOrderNoRepeats[i]));
        }
        return arrayOnlyNumber;
      };

      _this._areConsecutive = function (arrayNumeros) {
        if (arrayNumeros.length <= 1) {
          return -1;
        }

        if (arrayNumeros[0] < arrayNumeros[1]) {
          arrayNumeros.reverse();
        }

        return arrayNumeros.reduce(function (acum, el, index, array) {
          if (index == 1) {
            acum = 0;
          }
          return +acum + array[index - 1] - (el + 1);
        });
      };

      _this._handleCancelOnClick = function () {
        _this.setState({ showError: false });
        _this.props.cancelModification();
      };

      _this._handleDeleteRow = function () {
        var select = false;
        var array = _this.props.selectedList.filter(function (item) {
          if (item == true) select = true;
          return item;
        });
        if (select) {
          _this.setState({
            showModal: true,
            modal: {
              component: null,
              title: "Alerta",
              contentHTML: "¿Esta seguro que desea eliminar los beneficiarios seleccionados?",
              html: true,
              size: "md",
              accept: _this._handleAccept
            }
          });
        } else if (array.length == 0) _this.setState({
          showError: true,
          textError: "Seleccioná un beneficiario para eliminar"
        });
      };

      _this._handleButtonModify = function () {
        var array = _this.props.selectedList.filter(function (item) {
          if (item == true) return item;
        });
        if (array.length == 0) _this.setState({
          showError: true,
          textError: "Seleccioná un beneficiario para modificar"
        });else if (array.length > 1) _this.setState({
          showError: true,
          textError: "Solo podés modificar un beneficiario por vez"
        });else {
          var id = _this.props.selectedList.indexOf(true);
          _this.props.selectedItem(id);
          _this.props.handlerSwitch("EditBeneficiary");
        }
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handleAccept = function (e) {
        var unchecked = [];
        var lista = _this.props.listaBeneficiarios;
        _this.props.selectedList.forEach(function (item, i) {
          if (item === false) unchecked.push(lista[i]);
        });
        _this.props.deleteRow(unchecked);
        _this.props.setIsEdited();
        _this._handleModalIsOpen();
      };

      _this.state = {
        showError: false,
        textError: "",
        showModal: false,
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

    _createClass(DdbenListBeneficiaries, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "p",
            { className: "m-3" },
            React.createElement(
              "b",
              null,
              "Lista de designaci\xF3n de Beneficiarios"
            )
          ),
          React.createElement(DdbenTable, {
            list: this.props.listaBeneficiarios,
            selectedResult: this.props.selectedResult,
            selectedList: this.props.selectedList,
            getParentName: this.props.getParentName,
            getTipoDoc: this.props.getTipoDoc
          }),
          this.props.readOnly ? "" : React.createElement(
            "div",
            { className: "row justify-content-md-center mt-2" },
            React.createElement(
              "button",
              {
                onClick: this._handleButtonNew,
                type: "button",
                className: "btn btn-danger m-2 btn-sm  p-0 pl-2 pr-2 "
              },
              "Nuevo"
            ),
            React.createElement(
              "button",
              {
                onClick: this._handleButtonModify,
                type: "button",
                className: "btn btn-danger m-2 btn-sm  p-0 pl-2 pr-2"
              },
              "Modificar"
            ),
            React.createElement(
              "button",
              {
                onClick: this._handleDeleteRow,
                type: "button",
                className: "btn btn-danger m-2 btn-sm  p-0 pl-2 pr-2"
              },
              "Eliminar"
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModal,
              size: this.state.modal.size,
              isOpen: this._handleModalIsOpen,
              component: this.state.modal.component,
              html: this.state.modal.html,
              contentHTML: this.state.modal.contentHTML,
              accept: this.state.modal.accept
            })
          ),
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(ErrorMessage, {
              className: "text-danger text-center",
              show: this.state.showError,
              text: this.state.textError
            })
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._checkUpdate();
      }
    }]);

    return DdbenListBeneficiaries;
  }(React.Component);

  return DdbenListBeneficiaries;
});