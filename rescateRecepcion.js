var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var RescateRecepcion = function (_React$Component) {
    _inherits(RescateRecepcion, _React$Component);

    function RescateRecepcion() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, RescateRecepcion);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RescateRecepcion.__proto__ || Object.getPrototypeOf(RescateRecepcion)).call.apply(_ref, [this].concat(args))), _this), _this.FORM_NAME = "RescateRecepcion", _this._handleBack = function () {
        _this.props.switch('home');
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(RescateRecepcion, [{
      key: "render",
      value: function render() {
        var campMotivo = this.props.clienteNeg.MOTIVO;
        var codsMotivos = [1, 3, 4, 5, 6, 7, 11, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 32, 33, 34, 39, 40, 41, 45, 46, 48, 49];

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { "class": "panel" },
            React.createElement(
              "div",
              { "class": "panel-title" },
              React.createElement(
                "strong",
                null,
                "Su rescate se recibi\xF3 con \xE9xito, el mismo est\xE1 siendo procesado. ",
                React.createElement("br", null),
                React.createElement("br", null)
              )
            ),
            React.createElement(
              "div",
              { "class": "panel-container" },
              React.createElement(
                "div",
                null,
                "En virtud de lo expuesto manifiesto que una vez acreditado el importe mencionado en la cuenta antedicha, HSBC Seguros de Vida (Argentina) S.A. habr\xE1 dado cumplimiento a todas sus obligaciones emergentes del rescate parcial solicitado, y por lo tanto, absolutamente nada m\xE1s tendr\xE9 que reclamar a la Compa\xF1\xEDa que pudiera invocarse o reconozca su causa en dicho rescate parcial."
              ),
              codsMotivos.includes(campMotivo) ? React.createElement(
                "div",
                { "class": "panel-title" },
                React.createElement("br", null),
                React.createElement(
                  "strong",
                  { "class": "font-italic" },
                  "Estimado Cliente, por favor le solicitamos contactarse al Centro de Atenci\xF3n al Cliente 0800-333-0003 a fin de que esta compa\xF1\xEDa pueda actualizar su legajo, en funci\xF3n de dar cumplimiento a Ley 25.246 y la Resoluci\xF3n 28/2018, sus modificaciones y complementarias."
                ),
                React.createElement("br", null),
                React.createElement("br", null)
              ) : "",
              React.createElement(
                "div",
                { "class": "col-md-11 mb-3 text-center" },
                React.createElement(
                  "button",
                  { className: "btn btn-hsbc right", onClick: this._handleBack },
                  "Continuar"
                )
              )
            )
          )
        );
      }
    }]);

    return RescateRecepcion;
  }(React.Component);

  return RescateRecepcion;
});