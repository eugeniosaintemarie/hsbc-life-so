var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/segurosOnlineService", "../common/saldoCuentasMensaje", "../redux/store"], function (React, SegurosOnlineService, SaldoCuentasMensaje, Store) {
  var SaldoCuentas = function (_React$Component) {
    _inherits(SaldoCuentas, _React$Component);

    function SaldoCuentas(props) {
      _classCallCheck(this, SaldoCuentas);

      var _this = _possibleConstructorReturn(this, (SaldoCuentas.__proto__ || Object.getPrototypeOf(SaldoCuentas)).call(this, props));

      _this.FORM_NAME = "SaldoCuentas";

      _this._handleResults = function (id, result) {
        var data = _defineProperty({}, id, result);
        var form = Object.keys(_this.state.form);
        form = form.find(function (el) {
          return el === id;
        });
        if (typeof form !== "undefined") {
          var current = _this.state;
          var old = _this.state.form;
          _this.setState(Object.assign({}, current, {
            form: Object.assign({}, old, data)
          }));
        }
      };

      _this.traerDatos = function () {
        var currentProduct = Store.getState().seguros.currentProduct;

        var segurosOnlineService = new SegurosOnlineService();
        var product = currentProduct.cup ? currentProduct.cup : currentProduct.detalle;
        params = {
          CIAASCOD: product.CIAASCOD,
          RAMOPCOD: product.RAMOPCOD,
          POLIZANN: product.POLIZANN,
          POLIZSEC: product.POLIZSEC,
          CERTIPOL: product.CERTIPOL,
          CERTIANN: product.CERTIANN,
          CERTISEC: product.CERTISEC
        };
        segurosOnlineService.getCargarDatos(params).then(function (mensaje) {
          _this.setState({
            date: mensaje.FECSALDO,
            ctaIGarantizado: mensaje.SALDOINDGAR.toLocaleString("de-DE"),
            ctaIFondo: mensaje.SALDOINDFFL.toLocaleString("de-DE"),
            ctaISaldoDisponible: mensaje.SALDOINDREA > mensaje.SALDOINDGAR ? mensaje.SALDOINDREA.toLocaleString("de-DE") : mensaje.SALDOINDGAR.toLocaleString("de-DE"),
            ctaEGarantizado: mensaje.SALDOESPGAR.toLocaleString("de-DE"),
            ctaEFondo: mensaje.SALDOESPFFL.toLocaleString("de-DE"),
            ctaESaldoDisponible: mensaje.SALDOESPREA > mensaje.SALDOESPGAR ? mensaje.SALDOESPREA.toLocaleString("de-DE") : mensaje.SALDOESPGAR.toLocaleString("de-DE"),
            ctaCGarantizado: mensaje.SALDOCOLGAR.toLocaleString("de-DE"),
            ctaCFondo: mensaje.SALDOCOLFFL.toLocaleString("de-DE"),
            ctaCSaldoDisponible: mensaje.SALDOCOLREA > mensaje.SALDOCOLGAR ? mensaje.SALDOCOLREA.toLocaleString("de-DE") : mensaje.SALDOCOLGAR.toLocaleString("de-DE")
          });
        });
      };

      _this._validacionDia = function () {
        var hoy = new Date();
        var dia = hoy.getDate();
        if (dia > 5) {
          return true;
        } else {
          return false;
        };
      };

      _this._handleBack = function () {
        _this.props.handleShowMain();
      };

      _this.state = {
        checked: _this._validacionDia(),
        date: "",
        ctaIGarantizado: 0,
        ctaIFondo: 0,
        ctaISaldoDisponible: 0,
        ctaEGarantizado: 0,
        ctaEFondo: 0,
        ctaCGarantizado: 0,
        ctaCFondo: 0,
        ctaCSaldoDisponible: 0,
        form: { montoRetirar: 0 }
      };
      return _this;
    }

    _createClass(SaldoCuentas, [{
      key: "render",
      value: function render() {
        var currentProduct = Store.getState().seguros.currentProduct;

        var tipoproduct;
        var certisec;

        if (currentProduct.detalle == "" || currentProduct.detalle == null) {
          tipoproduct = currentProduct.TIPOPRODU;
          certisec = currentProduct.certisec;
        } else {
          tipoproduct = currentProduct.detalle.TIPOPRODU;
          certisec = currentProduct.detalle.CERTISEC;
        }

        if (tipoproduct === "R") {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "span",
              null,
              this.state.checked ? React.createElement(
                "div",
                { className: "panel d-block" },
                React.createElement(
                  "div",
                  { className: "panel" },
                  React.createElement(
                    "div",
                    { className: "panel-title" },
                    React.createElement(
                      "h2",
                      { className: "text-left text-danger" },
                      "Saldo en cuentas al ",
                      this.state.date
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "panel-container" },
                    React.createElement("div", { className: "form-group row" }),
                    React.createElement(
                      "div",
                      { "class": "alert border p-2 bg-light" },
                      "Cuenta individual",
                      React.createElement(
                        "div",
                        { className: "d-flex justify-content-between" },
                        React.createElement(
                          "b",
                          { className: "col-6" },
                          "Saldo garantizado: "
                        ),
                        React.createElement(
                          "p",
                          { className: "col-5 col-md-2 p-0 text-right" },
                          this.state.ctaIGarantizado
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "d-flex justify-content-between" },
                        React.createElement(
                          "b",
                          { className: "col-6" },
                          "Fondo de fluctuacion: "
                        ),
                        React.createElement(
                          "p",
                          { className: "col-5 col-md-2 p-0 text-right" },
                          this.state.ctaIFondo
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "d-flex justify-content-between" },
                        React.createElement(
                          "b",
                          { className: "col-6" },
                          "Saldo disponible sujeto a quitas:"
                        ),
                        React.createElement(
                          "p",
                          { className: "col-5 col-md-2 p-0 text-right" },
                          this.state.ctaISaldoDisponible
                        )
                      )
                    ),
                    React.createElement(
                      "p",
                      { className: "m-3 font-italic" },
                      "Los saldos informados se encuentran expresados en la moneda detallada en su estado de cuenta -Reporte Semestral-. El mismo puede obtenerlo desde el MENU, opci\xF3n ESTADO DE CUENTA"
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { align: "center", "class": "col-md6" },
                  React.createElement(
                    "button",
                    {
                      className: "btn btn btn-light border-dark ",
                      onClick: this._handleBack
                    },
                    "Volver"
                  )
                )
              ) : React.createElement(SaldoCuentasMensaje, { onClick: this._handleBack })
            )
          );
        } else if (tipoproduct === "O" && certisec == 0) {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "span",
              null,
              this.state.checked ? React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  { className: "panel d-block" },
                  React.createElement(
                    "div",
                    { className: "panel" },
                    React.createElement(
                      "div",
                      { className: "panel-title" },
                      React.createElement(
                        "h2",
                        { className: "text-left text-danger" },
                        "Saldo en cuentas al ",
                        this.state.date
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "panel-container" },
                      React.createElement("div", { className: "form-group row" }),
                      React.createElement(
                        "div",
                        { "class": "alert border p-2 bg-light" },
                        "Cuenta Colectiva",
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo garantizado: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaCGarantizado
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Fondo de Fluctuacion: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaCFondo
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo disponible sujeto a quitas:"
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaCSaldoDisponible
                          )
                        )
                      ),
                      React.createElement(
                        "div",
                        { "class": "alert border p-2 bg-light" },
                        "Cuenta individual",
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo garantizado: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaIGarantizado
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Fondo de Fluctuacion: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaIFondo
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo disponible sujeto a quitas:"
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaISaldoDisponible
                          )
                        )
                      ),
                      React.createElement(
                        "div",
                        { "class": "alert border p-2 bg-light" },
                        "Cuenta especial",
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo garantizado: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaEGarantizado
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Fondo de Fluctuacion: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaEFondo
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo disponible sujeto a quitas:"
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaESaldoDisponible
                          )
                        )
                      ),
                      React.createElement(
                        "p",
                        { className: "m-3 font-italic" },
                        "Los saldos informados se encuentran expresados en la moneda detallada en su estado de cuenta -Reporte Semestral-. El mismo puede obtenerlo desde el MENU, opci\xF3n ESTADO DE CUENTA"
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { align: "center", "class": "col-md6" },
                    React.createElement(
                      "button",
                      {
                        className: "btn btn btn-light border-dark ",
                        onClick: this._handleBack
                      },
                      "Volver"
                    )
                  )
                )
              ) : React.createElement(SaldoCuentasMensaje, { onClick: this._handleBack })
            )
          );
        } else if (tipoproduct === "O" && certisec > 0) {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "span",
              null,
              this.state.checked ? React.createElement(
                "div",
                null,
                React.createElement(
                  "div",
                  { className: "panel d-block" },
                  React.createElement(
                    "div",
                    { className: "panel" },
                    React.createElement(
                      "div",
                      { className: "panel-title" },
                      React.createElement(
                        "h2",
                        { className: "text-left text-danger" },
                        "Saldo en cuentas al ",
                        this.state.date
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "panel-container " },
                      React.createElement("div", { className: "form-group row" }),
                      React.createElement(
                        "div",
                        { "class": "alert border p-2 bg-light" },
                        "Cuenta individual",
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo garantizado: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaIGarantizado
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Fondo de Fluctuacion: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaIFondo
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo disponible sujeto a quitas:"
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaISaldoDisponible
                          )
                        )
                      ),
                      React.createElement(
                        "div",
                        { "class": "alert border p-2 bg-light" },
                        "Cuenta especial",
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo garantizado: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaEGarantizado
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Fondo de Fluctuacion: "
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaEFondo
                          )
                        ),
                        React.createElement(
                          "div",
                          { className: "row" },
                          React.createElement(
                            "b",
                            { className: "col-6" },
                            "Saldo disponible sujeto a quitas:"
                          ),
                          React.createElement(
                            "p",
                            { className: "col-5 col-md-2 p-0 text-right" },
                            this.state.ctaESaldoDisponible
                          )
                        )
                      ),
                      React.createElement(
                        "p",
                        { className: "m-3 font-italic" },
                        "Los saldos informados se encuentran expresados en la moneda detallada en su estado de cuenta -Reporte Semestral-. El mismo puede obtenerlo desde el MENU, opci\xF3n ESTADO DE CUENTA"
                      )
                    )
                  ),
                  React.createElement(
                    "div",
                    { align: "center", "class": "col-md6" },
                    React.createElement(
                      "button",
                      {
                        className: "btn btn btn-light border-dark ",
                        onClick: this._handleBack
                      },
                      "Volver"
                    )
                  )
                )
              ) : React.createElement(SaldoCuentasMensaje, { onClick: this._handleBack })
            )
          );
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.state.checked) {
          this.traerDatos();
        }
      }
    }]);

    return SaldoCuentas;
  }(React.Component);

  return SaldoCuentas;
});