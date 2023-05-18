var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../redux/store", "../common/loader"], function (React, UserService, Store, Loader) {
  var Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home(props) {
      _classCallCheck(this, Home);

      var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

      _this.FORM_NAME = "Home";

      _this.state = {
        isLoaded: false,
        loader: false,
        detalleRiesgo: null
      };
      return _this;
    }

    _createClass(Home, [{
      key: "render",
      value: function render() {
        var _state = this.state,
            isLoaded = _state.isLoaded,
            detalleRiesgo = _state.detalleRiesgo,
            currentProduct = _state.currentProduct;


        if (!isLoaded) {
          return React.createElement(
            "div",
            { style: { bottom: "5rem" }, className: " m-0 position-relative bottom-10 col-md-10 d-flex justify-content-center mt-5 pt-5" },
            React.createElement(Loader, null)
          );
        }

        var currentProductStore = Store.getState().seguros.currentProduct;
        var detalleStore = currentProductStore.detalle ? currentProductStore.detalle : currentProductStore.cup;
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        if (currentProductStore && currentProduct && detalle.NROPOLIZA !== detalleStore.NROPOLIZA) {
          this.componentWillMount();
        }

        var isCollective = currentProduct.TIPOPRODU === 'L' || currentProduct.TIPOPRODU === 'O' || currentProduct.TIPOPRODU === 'X';

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "alert border p-1 bg-light" },
            React.createElement(
              "button",
              { type: "button", className: "close", "data-dismiss": "alert" },
              "\xD7"
            ),
            React.createElement(
              "small",
              { className: "text-muted" },
              "Si no visualiz\xE1s alguna de tus p\xF3lizas por favor comunicate con el centro de atenci\xF3n al cliente al 0800-333-0003. ",
              React.createElement("br", null),
              " Muchas gracias"
            )
          ),
          React.createElement(
            "div",
            { className: "list-container" },
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
                    "P\xF3liza"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Tomador"
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
                    null,
                    isCollective ? currentProduct.cup.NROPOLIZA : currentProduct.detalle.NROPOLIZA
                  ),
                  React.createElement(
                    "td",
                    null,
                    isCollective ? currentProduct.apellidoRazonSocial : currentProduct.detalle.TOMADOR ? currentProduct.detalle.TOMADOR : currentProduct.detalle.TOMARIES
                  )
                )
              )
            )
          ),
          !isCollective && detalleRiesgo && React.createElement(
            "div",
            { className: "col-md-12 remove-left-padding" },
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
                    "BENEFICIARIOS"
                  )
                ),
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    null,
                    "Nombre"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Tipo Doc"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Nro Doc"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Relaci\xF3n"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Orden"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "%"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                detalleRiesgo.beneficiarios && detalleRiesgo.beneficiarios.map(function (beneficiario) {
                  return React.createElement(
                    "tr",
                    { key: beneficiario.BENEDOC },
                    React.createElement(
                      "td",
                      null,
                      beneficiario.BENENOMB
                    ),
                    React.createElement(
                      "td",
                      null,
                      beneficiario.BENETIPDOC
                    ),
                    React.createElement(
                      "td",
                      null,
                      beneficiario.BENEDOC
                    ),
                    React.createElement(
                      "td",
                      null,
                      beneficiario.BENERELA
                    ),
                    React.createElement(
                      "td",
                      null,
                      beneficiario.BENEORD
                    ),
                    React.createElement(
                      "td",
                      null,
                      beneficiario.BENEPORC
                    )
                  );
                })
              )
            )
          ),
          !isCollective && detalleRiesgo && detalleRiesgo.coberturas && detalleRiesgo.coberturas.length > 0 && React.createElement(
            "div",
            { className: "col-md-12 remove-left-padding" },
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
                    { colSpan: "3", className: "main-header" },
                    "COBERTURAS"
                  )
                ),
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    null,
                    "Descripci\xF3n"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Suma Asegurada"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "C\xF3nyugue"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                detalleRiesgo.coberturas.map(function (cobertura) {

                  return React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "td",
                      null,
                      cobertura.COBERDES
                    ),
                    React.createElement(
                      "td",
                      null,
                      cobertura.CAPITASEG
                    ),
                    React.createElement(
                      "td",
                      null,
                      cobertura.CONYUGE
                    )
                  );
                })
              )
            )
          )
        );
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;

        var userService = new UserService();
        var currentProduct = Store.getState().seguros.currentProduct;


        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var isCollective = false;

        if (currentProduct.TIPOPRODU && (currentProduct.TIPOPRODU === 'L' || currentProduct.TIPOPRODU === 'O' || currentProduct.TIPOPRODU === 'X')) {
          isCollective = true;
        } else if (currentProduct.detalle && currentProduct.detalle.TIPOPRODU && (currentProduct.detalle.TIPOPRODU === "L" || currentProduct.detalle.TIPOPRODU === "O")) {
          isCollective = true;
        }

        if (detalle) {
          if (isCollective) {
            this.setState({
              isLoaded: true,
              currentProduct: currentProduct
            });
          } else {
            userService.getDetalleRiesgo(detalle.RAMOPCOD, detalle.POLIZANN, detalle.POLIZSEC, detalle.CERTIPOL, detalle.CERTIANN, detalle.CERTISEC, detalle.CIAASCOD).then(function (data) {
              _this2.setState({ isLoaded: false });
              _this2.setState({
                isLoaded: true,
                detalleRiesgo: data,
                currentProduct: currentProduct
              });
            });
          }
        }
      }
    }]);

    return Home;
  }(React.Component);

  return Home;
});