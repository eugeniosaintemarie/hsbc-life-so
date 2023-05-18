var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../common/loader", "../services/userService", "../services/segurosOnlineService", "../redux/store", "../common/datepicker", "../common/fileManager", "../common/modalReactBootstrap"], function (React, ReactRedux, Loader, UserService, SegurosOnlineService, Store, DatePicker, FileManager, ModalReactBootstrap) {
  var Siniestros = function (_React$Component) {
    _inherits(Siniestros, _React$Component);

    function Siniestros(props) {
      _classCallCheck(this, Siniestros);

      var _this = _possibleConstructorReturn(this, (Siniestros.__proto__ || Object.getPrototypeOf(Siniestros)).call(this, props));

      _this.state = {
        siniestrosSearching: false,
        showModalSuccess: false,
        gridContent: null,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };
      return _this;
    }

    _createClass(Siniestros, [{
      key: "getSiniestros",
      value: function getSiniestros() {
        var _this2 = this;

        this.setState({
          siniestrosSearching: true,
          gridContent: null
        });
        var segurosOnlineService = new SegurosOnlineService();
        var currentProduct = Store.getState().seguros.currentProduct;

        if (currentProduct) {
          var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
          segurosOnlineService.getSiniestros({
            CIAASCOD: detalle.CIAASCOD,
            RAMOPCOD: detalle.RAMOPCOD,
            POLIZANN: detalle.POLIZANN,
            POLIZSEC: detalle.POLIZSEC,
            CERTIPOL: detalle.CERTIPOL,
            CERTIANN: detalle.CERTIANN,
            CERTISEC: detalle.CERTISEC
          }).then(function (data) {
            //if (data && data.Message !== "" && data.Message.CAMPOS.SINIESTROS.SINIESTRO && data.Message.CAMPOS.CANTREG > 0 && data.Code == "NO_ERROR") {
            //  this.setState({
            //    gridContent: data.Message.CAMPOS.SINIESTROS.SINIESTRO
            //  })
            //}
            if (data && data.length > 0) {
              _this2.setState({
                gridContent: data
              });
            }
            _this2.setState({
              siniestrosSearching: false
            });
          });
        }
      }
    }, {
      key: "formatDate",
      value: function formatDate(date) {
        date = date.toString();
        if (date.length == 8) {
          year = date.substring(0, 4);
          month = date.substring(4, 6);
          day = date.substring(6);
          return day + '/' + month + '/' + year;
        } else if (date.length == 4) {
          year = date.substring(0, 2);
          month = date.substring(2, 3);
          day = date.substring(3, 4);
          return '0' + day + '/0' + month + '/20' + year;
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var _state = this.state,
            gridContent = _state.gridContent,
            siniestrosSearching = _state.siniestrosSearching;


        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Siniestros"
          ),
          React.createElement(
            "div",
            { className: "container remove-left-padding" },
            siniestrosSearching && React.createElement(
              "div",
              { className: "mt-3" },
              "Buscando siniestros..."
            ),
            gridContent && !siniestrosSearching && React.createElement(
              "div",
              { className: "col-md-12 d-flex justify-content-left remove-left-padding" },
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
                      "Fecha de Siniestro"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Fecha de Denuncia"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Nro. de Siniestro"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Estado"
                    ),
                    React.createElement(
                      "th",
                      null,
                      "Orden de Pago"
                    )
                  )
                ),
                React.createElement(
                  "tbody",
                  null,
                  gridContent.map(function (siniestro, i) {
                    return React.createElement(
                      "tr",
                      { key: i },
                      React.createElement(
                        "td",
                        null,
                        _this3.formatDate(siniestro.FECSINIE)
                      ),
                      React.createElement(
                        "td",
                        null,
                        _this3.formatDate(siniestro.FECDENUN)
                      ),
                      React.createElement(
                        "td",
                        null,
                        siniestro.SINIENUM
                      ),
                      React.createElement(
                        "td",
                        null,
                        siniestro.ESTADSIN
                      ),
                      React.createElement(
                        "td",
                        null,
                        siniestro.CANTORD
                      )
                    );
                  })
                )
              )
            ),
            !siniestrosSearching && gridContent == null && React.createElement(
              "div",
              { className: "mt-3" },
              "No se registran siniestros"
            )
          )
        );
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.getSiniestros();
      }
    }]);

    return Siniestros;
  }(React.Component);

  function mapStateToProps(state) {
    return {
      product: Object.assign({}, state.seguros.currentProduct)
    };
  }

  return ReactRedux.connect(mapStateToProps, null)(Siniestros);
});