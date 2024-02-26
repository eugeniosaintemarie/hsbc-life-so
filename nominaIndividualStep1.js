var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/modalReactBootstrap", "../../common/errormessage", "./tablaNominaAbm", "../../services/abmNominaService.js", "./newIndividualNominee", "../../controller/nominaController", "../../lib/utils", "./processOkPayroll", "./processErrorScreen", "../../common/buttonLoading"], function (React, ModalReactBootstrap, ErrorMessage, TablaNominaAbm, AbmNominaService, NewIndividualNominee, NominaController, Utils, ProcessOkPayroll, ProcessErrorScreen, ButtonLoading) {
  var NominaIndividualStep1 = function (_React$Component) {
    _inherits(NominaIndividualStep1, _React$Component);

    function NominaIndividualStep1(props) {
      _classCallCheck(this, NominaIndividualStep1);

      var _this = _possibleConstructorReturn(this, (NominaIndividualStep1.__proto__ || Object.getPrototypeOf(NominaIndividualStep1)).call(this, props));

      _this.FORM_NAME = "nominaIndividualStep1";
      _this.abmNominaService = new AbmNominaService();

      _this._handleBack = function () {
        _this.props.switch("home");
      };

      _this._amountByModifNom = function (modifcode) {
        var lista = [];

        _this.state.nominas.NOMINAS.NOMINA.forEach(function (item) {
          if (item.MODIFNOM && item.MODIFNOM == modifcode) lista.push(1);
        });

        return lista.length;
      };

      _this._handleContinue = function () {
        var date = Utils.formatFechaString(_this.props.grupo.fecvig.toString());

        _this.setState({
          showModal: true,
          modal: {
            component: null,
            contentHTML: "<div><div class='alert alert-secondary'><strong>" + _this.props.grupo.grupodes + "  -  Fecha pedido de Actualización:  " + date + "</strong></div></div><div class='col-md-10'><p class='text-justify'><strong>Nómina Actual: </strong>" + _this.total + " Asegurados</p><p class='text-justify'><strong>Bajas: </strong>" + _this.state.cantDown + " Asegurados</p><p class='text-justify'><strong>Modificaciones: </strong>" + _this._amountByModifNom("M") + " Asegurados</p><p class='text-justify'><strong>Altas: </strong>" + _this._amountByModifNom("A") + " Asegurados</p><p class='text-justify'><strong>Nómina Actualizada: </strong>" + _this.state.nominas.NOMINAS.NOMINA.length + " Asegurados</p></div></div>",
            html: true,
            title: "Cambios realizados",
            size: "md",
            accept: _this._handleSendMailButton
          }
        });
      };

      _this._handleSendMailButton = function () {
        _this._handleModalIsOpen();
        _this.setState({ enviarLoading: true });

        if (_this.props.desigBenefEnabled) {
          _this.nominaController.sendMailsNominaAbm(_this.state.nominas.NOMINAS.NOMINA, _this.props.product, _this.props.user, function (errors) {
            errors.length == 0 ? _this.setState({ processRegBenef: true }) : errors.length != 0 ? _this.setState({ showErrorsMsg: true }) : _this.setState({ showErrorsMsg: false });
          });
        }

        _this.nominaController.sendNominaAsegurados(_this.state.nominas.NOMINAS.NOMINA, _this.props.grupo, function (sendError, valError) {
          _this.setState({ listSendError: sendError, listErrorAseg: valError });
        }, "ABM");
      };

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;

        _this.setState({
          cantModal: 0,
          showModal: !current
        });
      };

      _this._handlerLoadListChecked = function () {
        var lista = [];

        for (var index = 0; index < _this.state.nominas.NOMINAS.NOMINA.length; index++) {
          lista.push({ isChecked: false });
        }

        _this.setState({ listChecked: lista });
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

      _this._addNominee = function (newItem) {
        var lista = _this.state.nominas.NOMINAS.NOMINA;
        lista[lista.length] = newItem;

        _this.setState({
          nominas: { NOMINAS: { NOMINA: lista } },
          currentView: "table"
        });

        _this._handlerLoadListChecked();
      };

      _this._addEdited = function (editedItem) {
        var lista = _this.state.nominas.NOMINAS.NOMINA;
        lista[_this.state.idSelectItem] = editedItem;

        _this.setState({
          listaBeneficiarios: lista,
          currentForm: "table"
        });
      };

      _this._handleView = function (view) {
        _this.setState({ currentView: view });
      };

      _this._handleNewNominee = function () {
        _this.setState({ selectedNominee: null, showError: false });
        _this._handleView("newIndividualNominee");
      };

      _this._handleDuplicateChecker = function (key, value) {
        var array = _this.state.nominas.NOMINAS.NOMINA;
        var retorno = false;

        for (var index = 0; index < array.length; index++) {
          if (array[index][key] == value && _this.state.isModified == false) {
            retorno = true;
          }
        };

        _this.setState({
          isModified: false
        });

        return retorno;
      };

      _this._handleModifyNominee = function () {
        var booleanList = [];

        var array = _this.state.listChecked.filter(function (item) {
          booleanList.push(item.isChecked);
          if (item.isChecked) return item;
        });

        if (array.length == 0) _this.setState({
          showError: true,
          textError: "Seleccioná un beneficiario para modificar"
        });else if (array.length > 1) _this.setState({
          showError: true,
          textError: "Solo podés modificar un beneficiario por vez"
        });else {
          var id = booleanList.indexOf(true);

          _this.setState({
            selectedNominee: _this.state.nominas.NOMINAS.NOMINA[id],
            isModified: true,
            idSelectItem: id,
            showError: false
          });

          _this._handleView("modifyIndividualNominee");
        }
      };

      _this._errorTable = function (list) {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "col-12 mt-4" },
            React.createElement(
              "h5",
              { className: "subtitle-inside" },
              "Resultado de la validaci\xF3n"
            ),
            React.createElement(
              "table",
              { "class": "table table-bordered table-striped mt-4" },
              React.createElement(
                "thead",
                null,
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    null,
                    "Descripcion"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                list.map(function (item) {
                  var documDatIsCero = item.DOCUMDAT == 0 ? true : false;
                  var global = React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "td",
                        { className: "text-left" },
                        "Se encontraron ERRORES GLOBALES en la Nomina"
                      )
                    ),
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "td",
                        { className: "text-left" },
                        item.DESCERROR
                      )
                    )
                  );
                  var row = React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      { className: "text-left" },
                      !documDatIsCero && item.DESCERROR.substr(0, 18).toUpperCase() == "EDAD DEL ASEGURADO" ? item.DOCUMDAT + " - " + item.DESCERROR + ". Este nominado debe ser cargado por otro medio." : item.DOCUMDAT + " - " + item.DESCERROR
                    )
                  );
                  if (item.DOCUMTIP == 0) {
                    row = global;
                  }
                  return row;
                })
              )
            )
          ),
          React.createElement(
            "div",
            { className: "col-12" },
            React.createElement(
              "div",
              { className: "form-group container row text-center mt-3" },
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "button",
                  { onClick: _this._handleBack, className: "btn btn-light" },
                  "Cerrar"
                )
              )
            )
          )
        );
      };

      _this._tabla = function () {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Informa Alta, Baja o Modificaci\xF3n Individual"
          ),
          React.createElement(
            "div",
            { className: "col-md-12" },
            "Haga clic en el boton \"Nuevo\" para agregar un nominado. Si desea modificar datos o borrar un nominado ya ingresado en la lista, seleccionalo haciendo clic sobre el mismo y utiliza los botones \"Modificar\" o \"Eliminar\""
          ),
          React.createElement(
            "div",
            { className: "container remove-left-padding profile-container" },
            _this.state.nominas && !_this.state.reloadTable ? React.createElement(TablaNominaAbm, {
              getTipoDoc: _this._getTipoDoc,
              listNominados: _this.state.nominas.NOMINAS.NOMINA,
              listchecked: _this.state.listChecked,
              desigBenefEnabled: _this.props.desigBenefEnabled,
              updateLista: function updateLista(lista) {
                _this.setState({ listChecked: lista });
              }
            }) //Fin TablaNominaAbm
            : "",
            React.createElement(
              "div",
              { calssName: "col-12 mt-4" },
              React.createElement(
                "button",
                {
                  className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2 ",
                  onClick: _this._handleNewNominee
                },
                "Agregar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2 ",
                  onClick: _this._handleModifyNominee
                },
                "Modificar"
              ),
              React.createElement(
                "button",
                {
                  onClick: _this._haldleDeleteRow,
                  className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2 "
                },
                "Eliminar"
              )
            ),
            React.createElement(
              "div",
              { className: "container mt-3" },
              React.createElement(ErrorMessage, {
                className: "text-danger text-center",
                show: _this.state.showError,
                text: _this.state.textError
              })
            ),
            React.createElement(
              "div",
              { className: "col-12" },
              React.createElement(
                "div",
                { className: "form-group row text-center mt-3" },
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    ButtonLoading,
                    {
                      disabled: _this.state.enviarLoading,
                      className: "btn btn-hsbc",
                      onClick: _this._handleContinue,
                      loading: _this.state.enviarLoading
                    },
                    "Enviar n\xF3mina"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    "button",
                    { onClick: _this._handleBack, className: "btn btn-light" },
                    "Cancelar"
                  )
                )
              )
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: _this.state.modal.title,
            show: _this.state.showModal,
            size: _this.state.modal.size,
            isOpen: _this._handleModalIsOpen,
            component: _this.state.modal.component,
            html: _this.state.modal.html,
            contentHTML: _this.state.modal.contentHTML,
            accept: _this.state.modal.accept
          })
        );
      };

      _this._handleAcceptDelete = function (e) {
        var listNomina = _this.state.nominas.NOMINAS.NOMINA;
        var cantDelete = _this.state.cantDown;

        Object.keys(_this.state.listChecked).map(function (currency) {
          if (_this.state.listChecked[currency] && _this.state.listChecked[currency].isChecked) {
            listNomina[currency] = undefined;
            cantDelete++;
          }
        });

        var listDeleteUpdate = [];

        listNomina.forEach(function (e) {
          if (e != undefined) {
            listDeleteUpdate.push(e);
          }
        });

        var listCheckUpdate = [];

        _this.state.listChecked.map(function (e) {
          if (e.isChecked != true) {
            listCheckUpdate.push(e);
          }
        });

        var nominaData = _this.state.nominas;
        nominaData.NOMINAS.NOMINA = listDeleteUpdate;

        _this.setState({
          nominas: nominaData,
          listChecked: listCheckUpdate,
          cantDown: cantDelete,
          showError: false,
          reloadTable: true,
          textError: ""
        });

        _this._handleModalIsOpen();
      };

      _this._haldleDeleteRow = function () {
        var select = false;

        Object.keys(_this.state.listChecked).map(function (currency) {
          if (_this.state.listChecked[currency].isChecked) {
            select = true;
          }
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
              accept: _this._handleAcceptDelete
            },
            showError: false
          });
        } else {
          _this.setState({
            currentView: "beneficiary",
            showError: true,
            textError: "Seleccione un beneficiario para modificar"
          });
        }
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;

        _this.setState({
          showModal: !current,
          showError: false,
          textError: ""
        });
      };

      _this.state = {
        currentView: "table",
        isModified: false,
        listFields: [],
        nominas: null,
        listTipoDoc: [],
        listChecked: [],
        selectedNominee: {},
        idSelectItem: null,
        showError: false,
        textError: "",
        reloadTable: false,
        enviarLoading: false,
        listSendError: null,
        listErrorAseg: { LISTAERRORES: { LISTAERROR: [] }, CANTERR: -1 },
        cantDown: 0,

        showModal: false,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false,
          accept: null
        }
      };
      _this.total = null;
      _this.fileExcel = null;
      _this.nominaController = new NominaController();
      return _this;
    }

    _createClass(NominaIndividualStep1, [{
      key: "render",
      value: function render() {
        var currentView = this.state.currentView;

        switch (currentView) {
          case "table":
            return this.state.listErrorAseg.CANTERR > 0 ? this._errorTable(this.state.listErrorAseg.LISTAERRORES.LISTAERROR) : this.state.listSendError != null ? React.createElement(ProcessErrorScreen, {
              title: "Alta, Baja o Modificación Individual",
              "switch": this._handleBack,
              error: this.state.listSendError,
              displayNone: this._displayNone
            }) : this.state.listErrorAseg.CANTERR == 0 ? React.createElement(ProcessOkPayroll, { "switch": this._handleBack }) : this.state.nominas && this.state.nominas.ESTADOMSG ? React.createElement(ProcessErrorScreen, {
              title: "Alta, Baja o Modificación Individual",
              "switch": this._handleBack,
              error: this.state.nominas.ESTADOMSG,
              textError: this.state.nominas.ERRORMSG,
              displayNone: this._displayNone
            }) : this._tabla();
          case "newIndividualNominee":
            return React.createElement(NewIndividualNominee, {
              "switch": this._handleView,
              duplicateChecker: this._handleDuplicateChecker,
              desigBenefEnabled: this.props.desigBenefEnabled,
              addNominee: this._addNominee,
              product: this.props.product,
              isEdit: false
            });
          case "modifyIndividualNominee":
            return React.createElement(NewIndividualNominee, {
              "switch": this._handleView,
              duplicateChecker: this._handleDuplicateChecker,
              desigBenefEnabled: this.props.desigBenefEnabled,
              addNominee: this._addEdited,
              selectedNominee: this.state.selectedNominee,
              product: this.props.product,
              isEdit: true
            });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        if (this.state.reloadTable) {
          this.setState({
            reloadTable: false
          });
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.nominaController.getTiposDocumento(function (data) {
          _this2.setState({
            listTipoDoc: data
          });

          _this2.props.startLoading();

          _this2.nominaController.getNomina(_this2.props.grupo, function (response) {
            if (typeof response == "string") {
              _this2.props.stopLoading();
              _this2.props.payrollInError(response);
            } else {
              _this2.total = response.DATOS.NOMINAS.NOMINA.length;

              if (_this2.total > 0 && _this2.props.desigBenefEnabled) {
                _this2.nominaController.validateNominaAbm(response.DATOS.NOMINAS.NOMINA).then(function (nomina) {
                  _this2.setState({ nominas: response.DATOS });
                  _this2._handlerLoadListChecked();

                  _this2.props.stopLoading();
                });
              } else {
                _this2.setState({ nominas: response.DATOS });
                _this2._handlerLoadListChecked();

                _this2.props.stopLoading();
              }
            }
          });
        });
      }
    }]);

    return NominaIndividualStep1;
  }(React.Component);

  return NominaIndividualStep1;
});