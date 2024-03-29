var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./ddbenListBeneficiaries", "./newIndividualBeneficiary", "./identityValidation", "../../controller/beneficiariosController", "../../services/segurosOnlineService", "./processOk", "../../common/loader", "../../common/messageComponent"], function (React, DdbenListBeneficiaries, NewIndividualBeneficiary, IdentityValidation, BeneficiariosController, SegurosOnlineService, ProcessOK, Loader, MessageComponent) {
  var DdbenCrudMenu = function (_React$Component) {
    _inherits(DdbenCrudMenu, _React$Component);

    function DdbenCrudMenu(props) {
      _classCallCheck(this, DdbenCrudMenu);

      var _this = _possibleConstructorReturn(this, (DdbenCrudMenu.__proto__ || Object.getPrototypeOf(DdbenCrudMenu)).call(this, props));

      _this._user = function () {
        var userData = _this.props.user;
        var docDescrip = _this._getTipoDoc(userData.TIPODOCU);
        userData.DOCDESCRIP = docDescrip;
        _this.setState({ user: userData });
      };

      _this._setSelectedList = function (lista) {
        var checkedList = [];

        for (var i = 0; i < lista.length; i++) {
          checkedList.push(false);
        }

        _this.setState({ selectedList: checkedList });
      };

      _this._setEditedTrue = function () {
        _this.setState({ isEdited: true });
      };

      _this._addResult = function (newItem) {
        var lista = _this.state.listaBeneficiarios;
        lista.push(newItem);

        _this.setState({
          listaBeneficiarios: lista,
          currentForm: "ListBeneficiaries"
        });
        _this._setSelectedList(_this.state.listaBeneficiarios);
      };

      _this._addEdited = function (editedItem) {
        var lista = _this.state.listaBeneficiarios;
        lista[_this.state.idItem] = editedItem;

        _this.setState({
          listaBeneficiarios: lista,
          currentForm: "ListBeneficiaries"
        });
      };

      _this._deleteRows = function (uncheckedList) {
        _this.setState({ listaBeneficiarios: uncheckedList });
        _this._setSelectedList(uncheckedList);
      };

      _this._cancelModifications = function () {
        _this.props.handleShowAppointBeneficiary();
      };

      _this._handlerSwitch = function (form) {
        _this.setState({ currentForm: form });
      };

      _this._handlerChecked = function (list) {
        _this.setState({ selectedList: list });
      };

      _this._handlerError = function () {
        _this.setState({ serviceError: true, currentForm: "ProcessOK" });
      };

      _this._handlerSelectedItem = function (id) {
        _this.setState({
          selectedItem: _this.state.listaBeneficiarios[id],
          idItem: id
        });
      };

      _this._handlerValidationAccept = function () {
        _this._user();
        var controller = new BeneficiariosController();

        controller.updateNominadeBeneficiarios(_this.props.product, _this.state.listaBeneficiarios, _this.state.user, function (response) {
          if (response !== "ERROR") {
            _this.setState({ currentForm: "ProcessOK", pdf: response });
          } else _this.setState({ serviceError: true, currentForm: "ProcessOK" });
        });
      };

      _this._getTipoDoc = function (code) {
        var tipo = "";

        _this.state.listTipoDoc.map(function (e) {
          if (Number(e.POV_COD_TDO) == code) {
            tipo = e.POV_DES_TDO;
          }
        });

        return tipo;
      };

      _this._getParentName = function (code) {
        var parentName = "SIN PARENTESCO";

        _this.state.listParentesco.map(function (e) {
          if (e.CODIGO == code) {
            parentName = e.DESCRIPCION;
          }
        });

        return parentName;
      };

      _this._handleServiceResponse = function (list) {
        var index = [];

        var nuevaLista = list.map(function (obj, i) {
          if (obj.ORDEN != 0) {
            var relDescrip = _this._getParentName(obj.RELACION);
            obj.RELBDESC = relDescrip;
            var docDescrip = _this._getTipoDoc(obj.DOCUMTIP);
            obj.DOCUMDESCRIP = docDescrip;
          } else {
            index.push(i);
          }
          return { NOMINAS: obj };
        });

        nuevaLista.splice(index[0], index.length);
        return nuevaLista;
      };

      _this.state = {
        currentForm: "Loader",
        listaBeneficiarios: [],
        selectedList: [],
        idItem: null,
        selectedItem: {},
        serviceError: false,
        pdf: "",
        isEdited: false,
        listParentesco: [],
        listTipoDoc: [],
        user: {},
        orderList: [{ id: "1", name: "1" }, { id: "2", name: "2" }, { id: "3", name: "3" }, { id: "4", name: "4" }, { id: "5", name: "5" }]
      };
      return _this;
    }

    //Esta funcion se hace para cambiar el response del servico y no tener que cambiar mucho mas codigo, historia jira DDBEN-41


    _createClass(DdbenCrudMenu, [{
      key: "render",
      value: function render() {
        var currentForm = this.state.currentForm;


        switch (currentForm) {
          case "ListBeneficiaries":
            return React.createElement(DdbenListBeneficiaries, {
              setIsEdited: this._setEditedTrue,
              isEdited: this.state.isEdited,
              deleteRow: this._deleteRows,
              product: this.props.product,
              selectedList: this.state.selectedList,
              selectedResult: this._handlerChecked,
              selectedItem: this._handlerSelectedItem,
              listaBeneficiarios: this.state.listaBeneficiarios,
              handlerSwitch: this._handlerSwitch,
              cancelModification: this._cancelModifications,
              listTipoDoc: this.state.listTipoDoc,
              listParentesco: this.state.listParentesco,
              getTipoDoc: this._getTipoDoc,
              getParentName: this._getParentName
            });
          case "NewBeneficiary":
            return React.createElement(NewIndividualBeneficiary, {
              setIsEdited: this._setEditedTrue,
              listaBeneficiarios: this.state.listaBeneficiarios,
              addResult: this._addResult,
              handlerSwitch: this._handlerSwitch,
              listTipoDoc: this.state.listTipoDoc,
              orderList: this.state.orderList,
              listParentesco: this.state.listParentesco,
              getTipoDoc: this._getTipoDoc,
              getParentName: this._getParentName
            });
          case "EditBeneficiary":
            return React.createElement(NewIndividualBeneficiary, {
              setIsEdited: this._setEditedTrue,
              selectedItem: this.state.selectedItem,
              idItem: this.state.idItem,
              selectedList: this.state.selectedList,
              orderList: this.state.orderList,
              listaBeneficiarios: this.state.listaBeneficiarios,
              addResult: this._addEdited,
              handlerSwitch: this._handlerSwitch,
              listTipoDoc: this.state.listTipoDoc,
              listParentesco: this.state.listParentesco,
              getTipoDoc: this._getTipoDoc,
              getParentName: this._getParentName
            });
          case "identyValidationIndividualBeneficiary":
            return React.createElement(IdentityValidation, {
              handlerSwitch: this._handlerSwitch,
              accept: this._handlerValidationAccept,
              error: this._handlerError
            });
          case "ProcessOK":
            return React.createElement(ProcessOK, {
              handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary,
              handlerSwitch: this._handlerSwitch,
              serviceError: this.state.serviceError,
              pdf: this.props.product
            });
          case "Loader":
            return React.createElement(Loader, {
              divClass: "d-flex justify-content-center",
              className: "text-secondary ml-0",
              width: "5rem",
              height: "5rem"
            });
          case "serviceError":
            return React.createElement(MessageComponent, {
              titleClass: "font-italic font-weight-bold mt-5 pl-5",
              title: "\xA1Se ha producido un error!",
              bodyClass: "font-italic font-weight-bold px-5",
              body: "Por favor intente m\xE1s tarde o comun\xEDquese con nuestro centro de atenci\xF3n al cliente 0800-333-0003.",
              button: this._cancelModifications
            });
          case "serviceErrorPo":
            return React.createElement(MessageComponent, {
              titleClass: "font-italic font-weight-bold mt-5 pl-5",
              title: "\xA1Se ha producido un error!",
              bodyClass: "font-italic font-weight-bold px-5",
              body: "Te sugerimos que confirmes con el Tomador de la p\xF3liza que ya haya realizado la gesti\xF3n para habilitar esta funcionalidad.",
              button: this._cancelModifications
            });
          case "weAreSorry":
            return React.createElement(MessageComponent, {
              titleClass: "font-weight-bold mt-5 pl-5 text-danger",
              title: "\xA1Lo sentimos!",
              bodyClass: "font-weight-bold px-5",
              body: "No es posible realizar la carga para este producto por este medio. Por favor comunicate con tu ejecutivo de cuentas para poder realizar la carga.",
              button: this._cancelModifications
            });
        }
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        var beneficiariosController = new BeneficiariosController();

        beneficiariosController.getParentescoList(function (data) {
          _this2.setState({
            listParentesco: data
          });
        });

        beneficiariosController.getTipoDocumento(function (data) {
          _this2.setState({
            listTipoDoc: data
          });
        });

        var product = this.props.product;

        var segurosOnlineService = new SegurosOnlineService();

        segurosOnlineService.getListaDesigBenefNoVal({
          RAMOPCOD: product.COD_PRO,
          POLIZANN: product.POL_ANN,
          POLIZSEC: product.POL_SEC,
          CERTIPOL: product.CER_POL,
          CERTIANN: product.CER_ANN,
          CERTISEC: product.CER_SEC,
          DOCUMDAT: product.NRO_DOC,
          DOCUMTIP: Number(product.TIP_DOC)
        }).then(function (response) {
          if (response.Message.CAMPOS.PERMITE == "S") {
            if (!response || !response.Message || !response.Message.Request || response.Message.Request.ESTADO != "OK") {
              if (response.Message.Request.ERROR == "PO" || response.Message.Request.ERROR == "DO") {
                _this2.setState({ currentForm: "serviceErrorPo" });
              } else {
                _this2.setState({ currentForm: "serviceError" });
              }
            } else {
              _this2.setState({
                listaBeneficiarios: _this2._handleServiceResponse(response.Message.CAMPOS.NOMINAS.NOMINA),
                currentForm: "ListBeneficiaries"
              });

              _this2._setSelectedList(_this2.state.listaBeneficiarios);
            }
          } else if (response.Message.CAMPOS.PERMITE == "N") {
            _this2.setState({ currentForm: "weAreSorry" });
          }
        });
      }
    }]);

    return DdbenCrudMenu;
  }(React.Component);

  return DdbenCrudMenu;
});