var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var ErrorUsuario = function (_React$Component) {
    _inherits(ErrorUsuario, _React$Component);

    function ErrorUsuario() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, ErrorUsuario);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ErrorUsuario.__proto__ || Object.getPrototypeOf(ErrorUsuario)).call.apply(_ref, [this].concat(args))), _this), _this.FORM_NAME = "ErrorUsuario", _this._handleBack = function () {
        _this.props.switch('home');
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ErrorUsuario, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "panel" },
              React.createElement(
                "div",
                { className: "panel-title" },
                "\xA1Lo sentimos!",
                React.createElement("br", null),
                React.createElement("br", null)
              ),
              React.createElement(
                "div",
                { className: "panel-container" },
                React.createElement(
                  "div",
                  null,
                  "Su usuario no se encuentra habilitado para realizar rescates, por favor comun\xEDcate con el centro de atenci\xF3n al cliente: 0800-333-0003",
                  React.createElement("br", null),
                  React.createElement("br", null),
                  "Muchas gracias.",
                  React.createElement("br", null),
                  React.createElement("br", null)
                ),
                React.createElement(
                  "div",
                  { className: "col-md-11 mb-3 text-center" },
                  React.createElement(
                    "button",
                    { className: "btn btn-hsbc right",
                      onClick: this._handleBack
                    },
                    "Continuar"
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return ErrorUsuario;
  }(React.Component);

  return ErrorUsuario;
});