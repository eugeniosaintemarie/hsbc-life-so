var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../common/loader", "../services/userService", "../services/segurosOnlineService", "../redux/store"], function (React, ReactRedux, Loader, UserService, SegurosOnlineService, Store) {
  var PrintAccountStatus = function (_React$Component) {
    _inherits(PrintAccountStatus, _React$Component);

    function PrintAccountStatus(props) {
      _classCallCheck(this, PrintAccountStatus);

      var _this = _possibleConstructorReturn(this, (PrintAccountStatus.__proto__ || Object.getPrototypeOf(PrintAccountStatus)).call(this, props));

      _this.state = {
        data: null
      };
      return _this;
    }

    _createClass(PrintAccountStatus, [{
      key: "render",
      value: function render() {
        var _state = this.state,
            user = _state.user,
            periodos = _state.periodos;
        var currentProduct = Store.getState().seguros.currentProduct;


        if (user !== null && currentProduct !== null) {
          var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "h4",
              { className: "subtitle-inside" },
              "Imprim\xED el estado de cuenta de tu p\xF3liza"
            ),
            React.createElement(
              "em",
              null,
              "Eleg\xED la fecha que desees y hac\xE9 click en el \xEDcono de la impresora"
            ),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "col-md-12 d-flex justify-content-center" },
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
                        { colSpan: "3" },
                        "Nombre y Apellido / Raz\xF3n Social"
                      ),
                      React.createElement(
                        "th",
                        { colSpan: "2" },
                        "N\xFAmero de p\xF3liza"
                      )
                    )
                  ),
                  React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "td",
                        { colSpan: "3" },
                        currentProduct.apellidoRazonSocial ? currentProduct.apellidoRazonSocial : currentProduct.detalle.CLIENNOMV + " " + currentProduct.detalle.CLIENAP1V + " " + currentProduct.detalle.CLIENAP2V
                      ),
                      React.createElement(
                        "td",
                        { colSpan: "2" },
                        detalle.NROPOLIZA
                      )
                    )
                  )
                )
              ),
              periodos && React.createElement(
                "div",
                { className: "col-md-12 d-flex justify-content-center" },
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
                        currentProduct.name
                      ),
                      periodos.map(function (period, i) {
                        return React.createElement(
                          "th",
                          { className: "title-table", key: i },
                          "Estado de p\xF3liza al ",
                          React.createElement("br", null),
                          React.createElement(
                            "em",
                            null,
                            period.periodo
                          )
                        );
                      })
                    )
                  ),
                  React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "td",
                        null,
                        React.createElement(
                          "button",
                          { className: "btn btn-link" },
                          React.createElement("img", { width: "20px", src: "../img/home/printer.svg" })
                        )
                      ),
                      periodos.map(function (period, i) {
                        return React.createElement(
                          "td",
                          { key: i },
                          React.createElement(
                            "button",
                            { className: "btn btn-link" },
                            React.createElement("img", {
                              width: "20px",
                              src: "../img/home/printer.svg"
                            })
                          )
                        );
                      })
                    )
                  )
                )
              )
            )
          );
        } else {
          return React.createElement(
            "div",
            { className: "col-md-11 d-flex justify-content-center" },
            React.createElement(Loader, { width: "2rem", height: "2rem" }),
            React.createElement("br", null)
          );
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var userService = new UserService();

        var _Store$getState = Store.getState(),
            auth = _Store$getState.auth;

        if (auth.authorized) {
          userService.getLoggedUser().then(function (user) {

            var segurosOnlineService = new SegurosOnlineService();
            var currentProduct = Store.getState().seguros.currentProduct;

            var current = _this2.state;
            var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

            segurosOnlineService.getImpresosPeriodos({
              RAMOPCOD: detalle.RAMOPCOD,
              POLIZANN: detalle.POLIZANN,
              POLIZSEC: detalle.POLIZSEC,
              CERTIPOL: detalle.CERTIPOL,
              CERTIANN: detalle.CERTIANN,
              CERTISEC: detalle.CERTISEC,
              CIAASCOD: detalle.CIAASCOD,
              SUPLENUM: detalle.SUPLENUM
            }).then(function (periodos) {
              _this2.setState(Object.assign({}, current, {
                user: user,
                periodos: periodos
              }));
            });
          });
        }
      }
    }]);

    return PrintAccountStatus;
  }(React.Component);

  function mapStateToProps(state) {
    return {
      product: Object.assign({}, state.seguros.currentProduct)
    };
  }

  return ReactRedux.connect(mapStateToProps, null)(PrintAccountStatus);
});