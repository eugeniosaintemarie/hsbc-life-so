var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/modalReactBootstrap", "../common/modal", "../lib/utils", "../redux/store", "../common/datepicker", "../controller/nominaController", "./nomina.js"], function (React, ModalReactBootstrap, Modal, Utils, Store, DatePicker, NominaController, Nomina) {
  var NominaSeg = function (_React$Component) {
    _inherits(NominaSeg, _React$Component);

    function NominaSeg(props) {
      _classCallCheck(this, NominaSeg);

      var _this = _possibleConstructorReturn(this, (NominaSeg.__proto__ || Object.getPrototypeOf(NominaSeg)).call(this, props));

      _this.FORM_NAME = "NominaSeg";

      _this._setReqSegToNull = function () {
        _this.setState({ reqNomina: null, from: Utils.dateToString(Utils.addDays(new Date(), -180)), to: Utils.dateToString(new Date()) });
      };

      _this._handleBack = function () {
        _this.props.handleShowMain();
      };

      _this._handlerOnResult = function (id, result) {
        _this.setState(_defineProperty({}, id, Utils.formatFechaNumber(result)));
      };

      _this._handleSearch = function () {
        var _this$state = _this.state,
            from = _this$state.from,
            to = _this$state.to;

        if (to == 0 || from == 0) _this.setState({ textError: "Debe seleccionar dos fechas válidas para continuar.", list: null });else if (to < from) _this.setState({ textError: "La fecha final debe ser posterior a la inicial.", list: null });else if (Utils.diffDays(from, to) > 365) _this.setState({ textError: "El rango de fecha no puede ser mayor a un año.", list: null });else {
          _this.setState({ findLoading: true, textError: "" });
          _this.nominaController.consultaEnviadas(from, to, function (regs, total) {
            _this.setState({ findLoading: false });
            if (regs) {
              _this.setState({
                textError: "",
                list: regs,
                total: total
              });
            }
          });
        }
      };

      _this.state = {
        findLoading: false,
        from: Utils.dateToString(Utils.addDays(new Date(), -180)),
        to: Utils.dateToString(new Date())
      };

      _this.nominaController = new NominaController();

      return _this;
    }

    _createClass(NominaSeg, [{
      key: "_handleClickNominaButton",
      value: function _handleClickNominaButton(req) {
        var reqNomina = {
          RAMOPCOD: req.RAMOPCOD,
          POLIZANN: req.POLIZANN,
          POLIZSEC: req.POLIZSEC,
          CERTIPOL: req.CERTIPOL,
          CERTIANN: req.CERTIANN,
          CERTISEC: req.CERTISEC,
          SUPLENUM: req.SUPLENUM,
          EXPEDNUM: req.GRUPOCOD,
          FECHA: req.FECHAENVIO,
          ESTADO: req.ESTADO,
          ORDEN: '',
          NROQRY: 0,
          CLAVE: ''
        };
        this.setState({ reqNomina: reqNomina });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var currentProduct = Store.getState().seguros.currentProduct;


        var ramo;
        if (currentProduct.detalle == "" || currentProduct.detalle == null) {
          ramo = currentProduct.ramopcod;
        } else {
          ramo = currentProduct.detalle.RAMOPCOD;
        }

        return this.state.reqNomina ? React.createElement(Nomina, { reqSeguimiento: this.state.reqNomina, goBack: this._setReqSegToNull }) : React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "h4",
              { className: "subtitle-inside" },
              "Seguimiento de nominas enviadas"
            ),
            React.createElement("div", { className: "col-md-12 d-flex justify-content-center" }),
            React.createElement(
              "div",
              { className: "col-md-4 pl-2" },
              "Desde",
              React.createElement(DatePicker, {
                id: "from",
                className: "input-background-color form-control",
                name: "from",
                onResult: this._handlerOnResult,
                value: this.state.from,
                formatValue: false
              })
            ),
            React.createElement(
              "div",
              { className: "col-md-4" },
              "Hasta",
              React.createElement(DatePicker, {
                id: "to",
                className: "input-background-color form-control",
                name: "to"
                //disabled={!this.state.from}
                , onResult: this._handlerOnResult
                //onResult={this._displayWordingMaxDate}
                , value: this.state.to,
                formatValue: false,
                maxDate: yesterday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                reloadable: true
              })
            ),
            React.createElement(
              "div",
              { className: "align-center col-md-2" },
              React.createElement("br", null),
              React.createElement(
                "button",
                {
                  disabled: this.state.findLoading
                  //loading={this.state.findLoading}
                  , className: "btn btn-hsbc ",
                  onClick: function onClick() {
                    _this2._handleSearch(from, to);
                  }
                },
                this.state.findLoading ? "Buscando.." : "Buscar"
              )
            )
          ),
          React.createElement(
            "div",
            { id: "wording", "class": "text-justify text-danger text-center mt-2" },
            this.state.textError
          ),
          this.state.list && this.state.list != "ERROR" && this.state.list.length > 0 ? React.createElement(
            "div",
            { className: "col-md-12 remove-left-padding mt-4" },
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
                    null,
                    "Fecha de Vigencia"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Grupo"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Estado"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Vidas"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Nomina"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                this.state.list.map(function (item, i) {
                  return React.createElement(
                    "tr",
                    { key: i },
                    React.createElement(
                      "td",
                      null,
                      Utils.formatFechaString(item.FECHAENVIO)
                    ),
                    React.createElement(
                      "td",
                      null,
                      item.GRUPODES.toUpperCase()
                    ),
                    React.createElement(
                      "td",
                      null,
                      item.ESTADESC.toUpperCase()
                    ),
                    React.createElement(
                      "td",
                      null,
                      item.VIDAS
                    ),
                    React.createElement(
                      "td",
                      null,
                      item.MARCA == 'S' && React.createElement(
                        "button",
                        {
                          onClick: function onClick(e) {
                            _this2._handleClickNominaButton(item);
                          },
                          className: "btn btn-link btn-hsbc btn-detail-prima"
                        },
                        React.createElement("img", { width: "16px", src: "../img/home/search.svg" })
                      )
                    )
                  );
                })
              )
            )
          ) : this.state.list && this.state.list.length == 0 ? React.createElement(
            "div",
            { id: "wording", "class": "text-justify text-danger text-center mt-2" },
            "No se encontraron resultados."
          ) : this.state.list == "ERROR" ? React.createElement(
            "div",
            { id: "wording", "class": "text-justify text-danger text-center mt-2" },
            "Ha ocurrido un error."
          ) : ''
        );
      }
    }]);

    return NominaSeg;
  }(React.Component);

  return NominaSeg;
});