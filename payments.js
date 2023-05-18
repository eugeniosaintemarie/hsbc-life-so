var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../services/userService", "../services/segurosOnlineService", "../redux/store", "../common/datepicker", "../common/fileManager", "../common/modalReactBootstrap"], function (React, ReactRedux, UserService, SegurosOnlineService, Store, DatePicker, FileManager, ModalReactBootstrap) {
  var Payments = function (_React$Component) {
    _inherits(Payments, _React$Component);

    function Payments(props) {
      _classCallCheck(this, Payments);

      var _this = _possibleConstructorReturn(this, (Payments.__proto__ || Object.getPrototypeOf(Payments)).call(this, props));

      _initialiseProps.call(_this);

      var today = new Date();
      var lastYear = _this._getLastYear(new Date());

      if (props.product.detalle.TIPOPRODU) {
        if (props.product.detalle.TIPOPRODU === "L") {
          today.setDate(today.getDate() + 60);
          lastYear.setDate(lastYear.getDate() + 60);
        }
      } else {
        if (props.product.TIPOPRODU === "L") {
          today.setDate(today.getDate() + 60);
          lastYear.setDate(lastYear.getDate() + 60);
        }
      }

      var to = (today.getUTCDate() < 10 ? "0" : "") + today.getUTCDate().toString() + "/" + (today.getMonth() < 9 ? "0" : "") + (today.getMonth() + 1) + "/" + today.getFullYear();

      var from = (lastYear.getUTCDate() < 10 ? "0" : "") + lastYear.getUTCDate().toString() + "/" + (lastYear.getMonth() < 9 ? "0" : "") + (lastYear.getMonth() + 1) + "/" + (lastYear.getFullYear() - 2);

      _this.state = {
        showModalSuccess: false,
        gridContent: null,
        currentProduct: null,
        from: from,
        to: to,
        paymentsSearching: false,
        today: to.replace(/\//g, ""),
        lastYear: from.replace(/\//g, ""),
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };
      return _this;
    }

    /**
     * @param Date date
     */


    /**
     * @param Date date
     */


    _createClass(Payments, [{
      key: "_handleDownloadPago",
      value: function _handleDownloadPago(pago) {
        var _this2 = this;

        var segurosOnlineService = new SegurosOnlineService();
        var userService = new UserService();
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        var _Store$getState = Store.getState(),
            auth = _Store$getState.auth;

        if (auth.authorized) {
          userService.getLoggedUser().then(function (user) {
            segurosOnlineService.getPDF({
              CERTIANN: detalle.CERTIANN,
              CERTIPOL: detalle.CERTIPOL,
              CERTISEC: detalle.CERTISEC,
              CIAASCOD: detalle.CIAASCOD,
              ENDOSO: parseInt(pago.SUPLENUM),
              NRODOC: user.NUMEDOCU,
              NROPOLIZA: detalle.NROPOLIZA,
              POLIZANN: detalle.POLIZANN,
              POLIZSEC: detalle.POLIZSEC,
              RAMOPCOD: detalle.RAMOPCOD,
              RECIBO: pago.RECIBNUM,
              TIPODOC: user.TIPODOCU
            }).then(function (data) {
              var filename = pago.RECIBNUM + ".pdf";
              var fileManager = new FileManager();
              var downloadResult = fileManagerPDF(data, filename);

              if (!downloadResult) {
                _this2.setState({
                  showModalSuccess: true,
                  modal: {
                    component: null,
                    contentHTML: "Hubo un error con la descarga del cupón, por favor intente más tarde",
                    html: true,
                    title: "Detalle de pago",
                    size: "md"
                  }
                });
              }
            });
          });
        }
      }
    }, {
      key: "_handlePrintCertificate",
      value: function _handlePrintCertificate(payment) {
        var _this3 = this;

        var segurosOnlineService = new SegurosOnlineService();
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        segurosOnlineService.getImprimirCertificado({
          CIAASCOD: detalle.CIAASCOD,
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIANN: parseInt(payment.CERTIANN),
          CERTIPOL: parseInt(payment.CERTIPOL),
          CERTISEC: parseInt(payment.CERTISEC),
          SUPLENUM: parseInt(payment.SUPLENUM),
          ENDOSO: parseInt(payment.SUPLENUM)
        }).then(function (data) {
          var filename = payment.NROPOLIZA + ".pdf";
          var fileManager = new FileManager();
          var downloadResult = fileManagerPDF(data, filename);

          if (!downloadResult) {
            _this3.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: "Hubo un error con la descarga del frente, por favor intente más tarde",
                html: true,
                title: "Detalle de pago",
                size: "md"
              }
            });
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        var _state = this.state,
            from = _state.from,
            to = _state.to,
            gridContent = _state.gridContent,
            today = _state.today,
            lastYear = _state.lastYear;

        var buttonDisabled = this.state.from !== "" && this.state.to !== "" || this.state.paymentsSearching;
        var downloadColumn = true;
        var frontColumn = false;

        if (this.props.product.detalle) {
          if (this.props.product.detalle.TIPOPRODU == "R" || this.props.product.detalle.TIPOPRODU == "O") {
            downloadColumn = false;
          }

          if (this.props.product.detalle.TIPOPRODU == "L" && this.props.product.detalle.certisec == 0) {
            frontColumn = true;
          }
        } else {
          if (this.props.product.TIPOPRODU == "R" || this.props.product.TIPOPRODU == "O") {
            downloadColumn = false;
          }

          if (this.props.product.TIPOPRODU == "L" && this.props.product.certisec == 0) {
            frontColumn = true;
          }
        }

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Detalle de pago"
          ),
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "col-md-12 d-flex justify-content-center" },
              React.createElement(
                "div",
                { className: "col-md-4 pl-2" },
                "Fecha de vencimiento desde",
                React.createElement(DatePicker, {
                  id: "from",
                  className: "input-background-color form-control",
                  name: "from",
                  onResult: this._handleResults,
                  value: lastYear,
                  formatValue: true
                })
              ),
              React.createElement(
                "div",
                { className: "col-md-4" },
                "Fecha de vencimiento hasta",
                React.createElement(DatePicker, {
                  id: "to",
                  className: "input-background-color form-control",
                  name: "to",
                  onResult: this._handleResults,
                  value: today,
                  formatValue: true
                })
              ),
              React.createElement(
                "div",
                { className: "col-md-2 container-search" },
                React.createElement(
                  "button",
                  {
                    id: "btn-submit",
                    className: "btn btn-hsbc",
                    disabled: buttonDisabled ? false : true,
                    onClick: function onClick() {
                      _this4._handleSearch(from, to);
                    }
                  },
                  this.state.paymentsSearching ? "Buscando..." : "Buscar"
                )
              )
            ),
            React.createElement(
              "div",
              { className: "col-md-12 d-flex" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "col-md-4 btn btn-hsbc ml-5",
                  onClick: function onClick() {
                    _this4._handleDownloadComprobantePago(from, to);
                  }
                },
                "Comprobante de Pago"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "container remove-left-padding" },
            gridContent && React.createElement(
              "div",
              { className: "col-md-12 d-flex justify-content-left remove-left-padding" },
              React.createElement(
                "table",
                { className: "table table-sm table-bordered table-payments" },
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      null,
                      "Vigencia del recibo"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Nro. Recibo"
                    ),
                    this.props.product.detalle.TIPOPRODU == "R" || this.props.product.detalle.TIPOPRODU == "O" ? "" : React.createElement(
                      "th",
                      null,
                      "Fecha de vencimiento"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Canal Cobro"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Prima Neta"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Total Recibo"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Estado"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Fecha Cobro"
                    ),
                    downloadColumn && React.createElement(
                      "th",
                      null,
                      "Cup\xF3n"
                    ),
                    frontColumn && React.createElement(
                      "th",
                      null,
                      "Frente"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  gridContent.map(function (pago, i) {
                    return React.createElement(
                      "tr",
                      { key: i },
                      React.createElement(
                        "td",
                        null,
                        pago.VIGDDE
                      ),
                      React.createElement(
                        "td",
                        null,
                        pago.RECIBNUM
                      ),
                      _this4.props.product.detalle.TIPOPRODU == "R" || _this4.props.product.detalle.TIPOPRODU == "O" ? "" : React.createElement(
                        "td",
                        null,
                        pago.FECHAVTO
                      ),
                      React.createElement(
                        "td",
                        null,
                        pago.CANALCOBR
                      ),
                      React.createElement(
                        "td",
                        null,
                        pago.IMPORTEPRIM
                      ),
                      React.createElement(
                        "td",
                        null,
                        pago.IMPORTEREC
                      ),
                      React.createElement(
                        "td",
                        null,
                        pago.SITUAREC ? pago.SITUAREC : "-"
                      ),
                      React.createElement(
                        "td",
                        null,
                        pago.FECHACOB ? pago.FECHACOB : "-"
                      ),
                      downloadColumn && React.createElement(
                        "td",
                        { className: "td-btn-download" },
                        React.createElement(
                          "button",
                          {
                            onClick: function onClick() {
                              return _this4._handleDownloadPago(pago);
                            },
                            className: "btn btn-link"
                          },
                          React.createElement("img", {
                            width: "16px",
                            src: "../img/home/printer.svg"
                          })
                        )
                      ),
                      frontColumn && React.createElement(
                        "td",
                        { className: "td-btn-download" },
                        React.createElement(
                          "button",
                          {
                            onClick: function onClick() {
                              return _this4._handlePrintCertificate(pago);
                            },
                            className: "btn btn-link"
                          },
                          React.createElement("img", {
                            width: "16px",
                            src: "../img/home/printer.svg"
                          })
                        )
                      )
                    );
                  })
                )
              )
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModalSuccess,
              size: this.state.modal.size,
              isOpen: this._handleModalIsOpen,
              component: this.state.modal.component,
              html: this.state.modal.html,
              contentHTML: this.state.modal.contentHTML
            })
          )
        );
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this5 = this;

        var userService = new UserService();

        var _Store$getState2 = Store.getState(),
            auth = _Store$getState2.auth;

        if (auth.authorized) {
          userService.getLoggedUser().then(function (user) {
            var currentProduct = Store.getState().seguros.currentProduct;


            _this5.setState({
              currentProduct: currentProduct,
              user: user
            });
          });
        }
      }
    }]);

    return Payments;
  }(React.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this6 = this;

    this._isBiciesto = function (date) {
      return date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0;
    };

    this._getLastYear = function (date) {
      var isBiciesto = _this6._isBiciesto(date);
      date.setDate(date.getDate() + (isBiciesto ? 366 : 365));

      return date;
    };

    this._handleResults = function (id, result) {
      var current = _this6.state;
      _this6.setState(Object.assign({}, current, _defineProperty({}, id, result)));
    };

    this._verifyDates = function (fromDate, toDate) {
      var isBiciesto = _this6._isBiciesto(fromDate);

      if (fromDate > toDate) {
        _this6.setState({ paymentsSearching: false });
        alert("La fecha inicial no puede ser mayor a la final");
        return false;
      } else {
        var daysDiff = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
        if (daysDiff > (isBiciesto ? 371 : 370)) {
          _this6.setState({ paymentsSearching: false });
          alert("El rango de fechas solo puede ser hasta 1 año");
          return false;
        }
      }

      return true;
    };

    this._handleSearch = function (from, to) {
      //call API SERVICE

      _this6.setState({
        paymentsSearching: true,
        gridContent: null
      });

      var segurosOnlineService = new SegurosOnlineService();
      var currentProduct = Store.getState().seguros.currentProduct;


      if (currentProduct && from && to && from !== "" && to !== "") {
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var fromSplitted = from.split("/");
        var toSplitted = to.split("/");

        var fromDate = new Date(fromSplitted[2], fromSplitted[1] - 1, fromSplitted[0]);

        var toDate = new Date(toSplitted[2], toSplitted[1] - 1, toSplitted[0]);

        from = (fromDate.getUTCDate() < 10 ? "0" : "") + fromDate.getUTCDate().toString() + "/" + (fromDate.getUTCMonth() < 9 ? "0" : "") + (fromDate.getUTCMonth() + 1) + "/" + fromDate.getUTCFullYear();

        to = (toDate.getUTCDate() < 10 ? "0" : "") + toDate.getUTCDate().toString() + "/" + (toDate.getUTCMonth() < 9 ? "0" : "") + (toDate.getUTCMonth() + 1) + "/" + toDate.getUTCFullYear();

        if (!_this6._verifyDates(fromDate, toDate)) {
          return;
        }

        segurosOnlineService.getGridContent({
          FECHADDE: from,
          FECHAHTA: to,
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          NROPOLIZA: detalle.NROPOLIZA
        }).then(function (data) {
          _this6.setState({
            gridContent: data,
            paymentsSearching: false
          });
        });
      }
    };

    this._handleDownloadComprobantePago = function (from, to) {
      var segurosOnlineService = new SegurosOnlineService();
      var currentProduct = Store.getState().seguros.currentProduct;


      if (currentProduct && from && to && from !== "" && to !== "") {
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var fromSplitted = from.split("/");
        var toSplitted = to.split("/");
        var fromDate = new Date(fromSplitted[2], fromSplitted[1] - 1, fromSplitted[0]);
        var toDate = new Date(toSplitted[2], toSplitted[1] - 1, toSplitted[0]);

        if (!_this6._verifyDates(fromDate, toDate)) {
          return;
        }

        segurosOnlineService.getComprobanteDePago({
          APENOM: currentProduct.apellidoRazonSocial ? currentProduct.apellidoRazonSocial : currentProduct.detalle.TOMADOR ? currentProduct.detalle.TOMADOR : currentProduct.detalle.TOMARIES,
          FDESANN: parseInt(fromSplitted[2]),
          FDESDIA: parseInt(fromSplitted[0]),
          FDESMES: parseInt(fromSplitted[1]),
          FHASANN: parseInt(toSplitted[2]),
          FHASDIA: parseInt(toSplitted[0]),
          FHASMES: parseInt(toSplitted[1]),
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          NROPOLIZA: detalle.NROPOLIZA
        }).then(function (data) {
          if (data && data instanceof Blob && data.size > 0) {
            var filename = "comprobante-pago.pdf";
            var fileManager = new FileManager();

            fileManagerPDF(data, filename);
          } else {
            _this6.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: "No se encontraron Pagos para las fechas especificadas",
                html: true,
                title: "Detalle de pago",
                size: "md"
              }
            });
          }
        });
      }
    };

    this._handleModalIsOpen = function (e) {
      _this6.setState({
        showModalSuccess: false
      });
    };
  };

  function mapStateToProps(state) {
    return {
      product: Object.assign({}, state.seguros.currentProduct)
    };
  }

  return ReactRedux.connect(mapStateToProps, null)(Payments);
});