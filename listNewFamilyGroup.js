var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./table", "../../../../common/modalReactBootstrap", "../../../../common/errormessage"], function (React, Table, ModalReactBootstrap, ErrorMessage) {
  var ListNewFamilyGroup = function (_React$Component) {
    _inherits(ListNewFamilyGroup, _React$Component);

    function ListNewFamilyGroup(props) {
      _classCallCheck(this, ListNewFamilyGroup);

      var _this = _possibleConstructorReturn(this, (ListNewFamilyGroup.__proto__ || Object.getPrototypeOf(ListNewFamilyGroup)).call(this, props));

      _this._handleButtonNew = function () {
        _this.props.handlerSwitch("inicio");
      };

      _this._checkUpdate = function () {
        var textError = "";
        var validationOK = true;
        var docNumber = [];
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
          if (!resultName) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el nombre con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          if (!resultLastName) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el apellido con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          //verificacion de edad
          _this.props.listaBeneficiarios.map(function (item) {
            return item.NOMINAS.FNACIMIE;
          });

          //verificacion de relacion o parentesco
          _this.props.listaBeneficiarios.map(function (item) {
            return item.NOMINAS.RELBECOD;
          });
        }
        //verificacion de documento
        _this.props.listaBeneficiarios.map(function (item) {
          if (item.NOMINAS.TIPDOCBENE == 0) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el tipo de documento con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          return item.NOMINAS.TIPDOCBENE;
        });
        docNumber = _this.props.listaBeneficiarios.map(function (item) {
          if (/^\d+$/im.test(item.NOMINAS.NUMDOCBENE == false)) {
            validationOK = false;
            textError = "Algún beneficiario no tiene el número de documento con el formato correcto, por favor ingresá a los mismos y verifícalos. Muchas gracias.";
          }
          return item.NOMINAS.NUMDOCBENE;
        });
        if (docNumber.length >= 2) {
          if (validationOK) {
            var aux = docNumber.slice(0, -1);
            var found = aux.indexOf(docNumber[docNumber.length - 1]);
            if (found != -1) {
              validationOK = false;
              textError = "El numero de DNI de los beneficiarios debe ser distintos";
            }
          }
        }
        _this.setState({ showError: !validationOK, textError: textError });
        _this.props.onResults(_this.props.listaBeneficiarios, validationOK);
      };

      _this._handleCancelOnClick = function () {
        _this.setState({ showError: false });
        _this.props.cancelModification();
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handleDeleteRow = function () {
        var select = false;
        var array = _this.props.selectedList.filter(function (item) {
          if (item) select = true;
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
        } else if (array.length == 0) {
          _this.setState({
            showError: true,
            textError: "Seleccioná un beneficiario para eliminar"
          });
          _this._handleChange();
        }
      };

      _this._handleButtonModify = function () {
        var array = _this.props.selectedList.filter(function (item) {
          if (item) return item;
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

      _this._handleChange = function () {
        //funcion para que al eliminar el ultimo elemento de la tabla, no muestre texError
        if (_this.props.selectedList.indexOf(true) != -1) {
          _this.setState({
            showError: false,
            textError: " "
          });
        }
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

    _createClass(ListNewFamilyGroup, [{
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
              "Lista de designaci\xF3n Grupo Familiar"
            )
          ),
          React.createElement(Table, {
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

    return ListNewFamilyGroup;
  }(React.Component);

  return ListNewFamilyGroup;
});