var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/datepicker", "../services/segurosOnlineService", "../common/modalReactBootstrap", "../redux/store", "../common/fileManager"], function (React, DatePicker, SegurosOnlineService, ModalReactBootstrap, Store, FileManager) {
  var CopyPolicy = function (_React$Component) {
    _inherits(CopyPolicy, _React$Component);

    function CopyPolicy(props) {
      _classCallCheck(this, CopyPolicy);

      var date = new Date();
      var fromInitialFormatted = date.getDate() + "/" + (date.getMonth() + 1) + "/" + (date.getFullYear() - 10);
      var toInitialFormatted = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

      var _this = _possibleConstructorReturn(this, (CopyPolicy.__proto__ || Object.getPrototypeOf(CopyPolicy)).call(this, props));

      _initialiseProps.call(_this);

      _this.state = {
        from: fromInitialFormatted,
        to: toInitialFormatted,
        type: "copy",
        insurancePoliciesSearching: false,
        insurancePolicies: null,
        showModalPrima: false,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };
      return _this;
    }

    _createClass(CopyPolicy, [{
      key: "_formatDate",
      value: function _formatDate(dateSplitted) {
        var date = dateSplitted[2];

        date += (parseInt(dateSplitted[1]) < 10 ? "0" : "") + parseInt(dateSplitted[1]);
        date += (parseInt(dateSplitted[0]) < 10 ? "0" : "") + parseInt(dateSplitted[0]);

        return parseInt(date);
      }

      //redirige a Nomina con el nro de poliza
      //NOMINA

    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var _state = this.state,
            from = _state.from,
            to = _state.to,
            type = _state.type;
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var isNomina = currentProduct.TIPOPRODU === "L" && detalle.CERTISEC > 0 || currentProduct.TIPOPRODU === "O";
        var buttonDisabled = this.state.from !== "" && this.state.to !== "" || this.state.insurancePoliciesSearching;
        var printPolicy = currentProduct.TIPOPRODU === "L";
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Historial de Endosos"
          ),
          printPolicy && React.createElement(
            "em",
            null,
            "Hac\xE9 click en el icono de la impresora para poder imprimir la copia de tu p\xF3liza. En caso de que no se muestre alg\xFAn resultado, seleccion\xE1 un rango de fecha m\xE1s amplio."
          ),
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "col-md-12 d-flex justify-content-center" },
              React.createElement(
                "div",
                { className: "col-md-4" },
                "Desde",
                React.createElement(DatePicker, {
                  id: "from",
                  className: "input-background-color form-control",
                  value: from,
                  name: "from",
                  onResult: this._handleResults
                })
              ),
              React.createElement(
                "div",
                { className: "col-md-4" },
                "Hasta",
                React.createElement(DatePicker, {
                  id: "to",
                  className: "input-background-color form-control",
                  value: to,
                  name: "to",
                  onResult: this._handleResults
                })
              ),
              React.createElement(
                "div",
                { className: "col-md-2 container-search" },
                React.createElement(
                  "button",
                  {
                    id: "btn-submit",
                    className: "btn  btn-hsbc",
                    disabled: buttonDisabled ? false : true,
                    onClick: function onClick() {
                      _this2._handleSearch(from, to, type);
                    }
                  },
                  this.state.insurancePoliciesSearching ? "Buscando..." : "Buscar"
                )
              )
            )
          ),
          this.state.insurancePolicies !== null && React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "col-md-12 remove-left-padding" },
              React.createElement(
                "h5",
                null,
                "Filtro de",
                " ",
                React.createElement(
                  "small",
                  null,
                  this.replaceDate(this.state.from) + " a  " + this.replaceDate(this.state.to)
                )
              ),
              this.state.insurancePolicies ? React.createElement(
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
                      "Nro Endoso"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Vigencia Desde"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Vigencia Hasta"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Motivo"
                    ),
                    detalle.TIPOPRODU && detalle.TIPOPRODU != "R" && detalle.TIPOPRODU != "O" && React.createElement(
                      "th",
                      null,
                      "Prima"
                    ),
                    isNomina && React.createElement(
                      "th",
                      null,
                      "Nomina"
                    ),
                    printPolicy && React.createElement(
                      "th",
                      null,
                      "Imprimir"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  this.state.insurancePolicies.map(function (policy, i) {
                    return React.createElement(
                      "tr",
                      { key: i },
                      React.createElement(
                        "td",
                        { style: { padding: "3%" } },
                        policy.ENDOSO
                      ),
                      React.createElement(
                        "td",
                        { style: { padding: "3%" } },
                        policy.FECVIGDDE
                      ),
                      React.createElement(
                        "td",
                        { style: { padding: "3%" } },
                        policy.FECVIGHTA
                      ),
                      React.createElement(
                        "td",
                        { style: { padding: "3%" } },
                        policy.MOTIVO && policy.MOTIVO !== "" ? policy.MOTIVO : "-"
                      ),
                      detalle.TIPOPRODU && detalle.TIPOPRODU != "R" && detalle.TIPOPRODU != "O" && React.createElement(
                        "td",
                        { style: { padding: "3%" } },
                        React.createElement(
                          "button",
                          {
                            onClick: function onClick(e) {
                              _this2._handleClickPrima(e, policy);
                            },
                            className: "btn btn-link btn-hsbc btn-detail-prima"
                          },
                          React.createElement("img", {
                            width: "20px",
                            src: "../img/home/search.svg"
                          })
                        )
                      ),
                      isNomina && React.createElement(
                        "td",
                        null,
                        React.createElement(
                          "button",
                          {
                            onClick: function onClick(e) {
                              _this2._handleShowNomina(e, policy);
                            },
                            className: "btn btn-link btn-hsbc btn-detail-prima"
                          },
                          React.createElement("img", {
                            width: "20px",
                            src: "../img/home/search.svg"
                          })
                        )
                      ),
                      printPolicy && policy.IMPRESO === "S" ? React.createElement(
                        "td",
                        null,
                        React.createElement(
                          "button",
                          {

                            onClick: function onClick(e) {
                              _this2._handleClickPrint(e, policy);
                            },
                            className: "btn btn-link"
                          },
                          React.createElement("img", {
                            width: "25px",
                            src: "../img/home/printer.svg"
                          })
                        )
                      ) : React.createElement("td", { style: { height: "50%" } })
                    );
                  })
                )
              ) : ""
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModalPrima,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML
          })
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._handleSearch(this.state.from, this.state.to, this.state.type);
      }
    }]);

    return CopyPolicy;
  }(React.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this._handleResults = function (id, result) {
      var current = _this3.state;
      _this3.setState(Object.assign({}, current, _defineProperty({}, id, result)), function () {});
    };

    this.replaceDate = function (date) {
      if (date !== "") {
        return date.replace(/-/g, "/");
      }
    };

    this._handleSearch = function (from, to, type) {
      //call API SERVICE
      _this3.setState({
        insurancePoliciesSearching: true,
        insurancePolicies: null
      });
      var segurosOnlineService = new SegurosOnlineService();
      var currentProduct = Store.getState().seguros.currentProduct;

      if (currentProduct && from !== "" && to !== "") {
        var current = _this3.state;
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var fromSplitted = from.split("/");
        var toSplitted = to.split("/");
        var fromDate = new Date(fromSplitted[2], fromSplitted[1] - 1, fromSplitted[0]);
        var toDate = new Date(toSplitted[2], toSplitted[1] - 1, toSplitted[0]);
        var actualDate = new Date();
        var actualDateForm = new Date(actualDate.getFullYear(), actualDate.getMonth(), actualDate.getDate());
        //   var daysDiff = (toDate.getTime() - fromDate.getTime()) / (1000 * 3600 * 24);
        /*   const fromDate = new Date(fromSplitted[2] + '-' + fromSplitted[1] + '-' + fromSplitted[0]);
           const toDate = new Date(toSplitted[2] + '-' + toSplitted[1] + '-' + toSplitted[0]);   */
        if (fromDate.getTime() > toDate.getTime()) {
          alert("La fecha inicial no puede ser mayor a la fecha destino");
          _this3.setState({ insurancePoliciesSearching: false });
          return;
        } else if (toDate.getTime() > actualDateForm.getTime()) {
          alert("La fecha destino no puede ser mayor a la actual");
          _this3.setState({ insurancePoliciesSearching: false });
          return;
        }
        segurosOnlineService.getDetalleEndoso({
          FECHADDE: _this3._formatDate(fromSplitted),
          FECHAHTA: _this3._formatDate(toSplitted),
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          SUPLENUM: detalle.SUPLENUM
        }).then(function (data) {
          _this3.setState(Object.assign({}, current, {
            insurancePoliciesSearching: false,
            from: from,
            to: to,
            insurancePolicies: data
          }));
        });
      }
    };

    this._handleClickPrima = function (e, poliza) {
      e.preventDefault();
      var segurosOnlineService = new SegurosOnlineService();
      var currentProduct = Store.getState().seguros.currentProduct;


      if (currentProduct && poliza) {
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        segurosOnlineService.getDetPrimas({
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          SUPLENUM: detalle.SUPLENUM,
          ENDOSO: poliza.ENDOSO
        }).then(function (primas) {
          var comp = "<table class=\"table table-sm table-bordered table-detail-prima table-striped\">\n              <tbody>";
          primas.map(function (prima) {
            comp += '<tr><td colspan="3">' + prima.CONCEPTO + "</td><td>" + prima.VALOR + "</td></tr>";
          });
          comp += "</table>";
          _this3.setState({
            showModalPrima: true,
            modal: {
              component: null,
              contentHTML: comp,
              html: true,
              title: "Detalle de prima",
              size: "md"
            }
          });
        });
      }
    };

    this._handleClickPrint = function (e, poliza) {
      var segurosOnlineService = new SegurosOnlineService();
      var currentProduct = Store.getState().seguros.currentProduct;

      var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
      segurosOnlineService.getImprimirCertificado({
        RAMOPCOD: detalle.RAMOPCOD,
        POLIZANN: detalle.POLIZANN,
        POLIZSEC: detalle.POLIZSEC,
        CERTIPOL: detalle.CERTIPOL,
        CERTIANN: detalle.CERTIANN,
        CERTISEC: detalle.CERTISEC,
        CIAASCOD: detalle.CIAASCOD,
        SUPLENUM: detalle.SUPLENUM,
        ENDOSO: poliza.ENDOSO
      }).then(function (data) {
        var filename = detalle.NROPOLIZA + ".pdf";
        var fileManager = new FileManager();

        var resultDownload = fileManager.downloadPDF(data, filename);

        if (!resultDownload) {
          _this3.setState({
            showModalPrima: true,
            modal: {
              component: null,
              contentHTML: "Ha surgido un error al generar la copia de póliza",
              html: true,
              title: "Copia de póliza",
              size: "md"
            }
          });
        }
      });
    };

    this._handleShowNomina = function (e, poliza) {
      _this3.props.endoso(poliza.ENDOSO);
      _this3.props.goToNomina();
    };

    this._handleModalIsOpen = function (e) {
      var current = _this3.state.showModalPrima;
      _this3.setState({
        showModalPrima: !current
      });
    };

    this._generateTable = function () {};
  };

  return CopyPolicy;
});