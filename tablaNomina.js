var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./itemNomina", "../../common/modalReactBootstrap", "./paginatedView"], function (React, ItemNomina, ModalReactBootstrap, PaginatedView) {
  var TablaNomina = function (_React$Component) {
    _inherits(TablaNomina, _React$Component);

    function TablaNomina(props) {
      _classCallCheck(this, TablaNomina);

      var _this = _possibleConstructorReturn(this, (TablaNomina.__proto__ || Object.getPrototypeOf(TablaNomina)).call(this, props));

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handlerPages = function (e) {
        _this.setState({
          page: Number(e.target.value)
        });
        _this._getPage(e.target.value, _this.state.rows);
      };

      _this._handlerRows = function (e) {
        _this.setState({
          rows: Number(e.target.value),
          page: 1
        });
        _this._getPage(1, e.target.value);
      };

      _this._loadNominados = function () {
        var lista = [];
        _this.props.listNominados.map(function (nomina, i) {
          lista.push(nomina);
          lista[i].id = i;
        });
        return lista;
      };

      _this._getPage = function (pag, amount) {
        if (pag > 0) {
          lista = _this.props.listNominados.slice((pag - 1) * amount, (pag - 1) * amount + amount);
          _this.setState({
            paginaShow: lista,
            rows: Number(amount),
            page: Number(pag)
          });
        }
      };

      _this._getAmountSelected = function () {
        var lista = _this.props.listchecked.filter(function (item) {
          return item.isChecked;
        });
        return lista.length;
      };

      _this._checkHandler = function (e) {
        var lista = _this.props.listchecked;
        lista[e.target.name].isChecked = !_this.props.listchecked[e.target.name].isChecked;

        _this.setState({
          selected: _this._getAmountSelected()
        });
        _this.props.updateLista(lista);
      };

      _this._getGrupo = function () {
        var modalText = "";
        switch (_this.props.group) {
          case "":
            modalText = "";
            break;
          case "TITULARES":
            modalText = " de TITULARES";
            break;
          case "CONYUGES":
            modalText = " de CONYUGES";
            break;

          default:
            break;
        }
        return modalText;
      };

      _this._checkAllHandler = function (e) {
        var lista = _this.props.listchecked;

        lista.forEach(function (item) {
          return item.isChecked = e.target.checked;
        });
        if (e.target.checked) {
          _this.setState({
            showModal: true,
            modal: {
              component: null,
              contentHTML: "Seleccionaste todos los nominados del grupo" + _this._getGrupo() + ".",
              html: true,
              title: "Nomina de asegurados",
              size: "md"
            }
          });
        }
        _this.setState({
          selected: _this._getAmountSelected()
        });
        _this.props.updateLista(lista);
      };

      _this._checkAllInPageHandler = function (e) {
        var lista = _this.props.listchecked;
        _this.state.paginaShow.forEach(function (item) {
          return lista[item.id].isChecked = e.target.checked;
        });
        if (e.target.checked) {
          _this.setState({
            showModal: true,
            modal: {
              component: null,
              contentHTML: "Seleccionaste todos los nominados del grupo de TITULARES /CONYUGES",
              html: true,
              title: "Nomina de asegurados",
              size: "md"
            }
          });
        }
        _this.setState({
          selected: _this._getAmountSelected()
        });
        _this.props.updateLista(lista);
      };

      _this.state = {
        paginaShow: [],
        listnominados: _this._loadNominados(),
        selected: 0,
        rows: 100,
        page: 1,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        },
        showModal: false
      };
      return _this;
    }

    _createClass(TablaNomina, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this._getPage(this.state.page, this.state.rows);
      }

      //Selecciona solo los items de una pagina. Checkbox removido por CSO13

      //Selecciona solo los items de una pagina. Checkbox removido por CSO13

    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props$listchecked = this.props.listchecked,
            listchecked = _props$listchecked === undefined ? [] : _props$listchecked;


        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "table",
            { className: "table table-sm table-bordered" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  { colSpan: "6", className: "main-header" },
                  "N\xF3mina correspondiente al grupo",
                  this._getGrupo()
                )
              ),
              React.createElement(
                "tr",
                null,
                !this.props.checkRow && React.createElement(
                  "th",
                  { className: "cell-select-all ", width: "13%" },
                  React.createElement(
                    "label",
                    { htmlFor: "selectAll" },
                    "Seleccionar"
                  ),
                  React.createElement("input", {
                    type: "checkbox",
                    name: "selectAll",
                    className: "check-all",
                    onChange: this._checkAllHandler
                  })
                ),
                React.createElement(
                  "th",
                  { width: "17%" },
                  "N\xFAmero de Documento"
                ),
                React.createElement(
                  "th",
                  { width: "40%", className: "align-middle" },
                  "Apellido y Nombre"
                ),
                React.createElement(
                  "th",
                  { width: "15%" },
                  "Capital Asegurado"
                ),
                React.createElement(
                  "th",
                  { width: "15%" },
                  "Fecha de Nacimiento"
                )
              )
            ),
            React.createElement(
              "tbody",
              null,
              this.state.paginaShow.map(function (nomina, i) {
                return React.createElement(ItemNomina, {
                  checkRow: _this2.props.checkRow,
                  nomina: nomina,
                  key: i,
                  name: nomina.id,
                  checkhandler: _this2._checkHandler,
                  ischecked: listchecked[nomina.id] ? listchecked[nomina.id].isChecked : false
                });
              })
            ),
            React.createElement(PaginatedView, {
              selected: this.state.selected,
              setrows: this._handlerRows,
              activepage: this.state.page,
              selectpage: this._handlerPages,
              rows: this.state.rows,
              total: this.state.listnominados.length
            })
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModal,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML
          })
        );
      }
    }]);

    return TablaNomina;
  }(React.Component);

  return TablaNomina;
});