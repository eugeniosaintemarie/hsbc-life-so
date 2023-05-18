var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var PayrollLoadFail = function (_React$Component) {
    _inherits(PayrollLoadFail, _React$Component);

    function PayrollLoadFail(props) {
      _classCallCheck(this, PayrollLoadFail);

      var _this = _possibleConstructorReturn(this, (PayrollLoadFail.__proto__ || Object.getPrototypeOf(PayrollLoadFail)).call(this, props));

      _this._handleOnClick = function () {
        _this.props.switch("home");
      };

      return _this;
    }

    _createClass(PayrollLoadFail, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "mt-3 mb-3" },
            React.createElement(
              "h2",
              { className: "subtitle-inside mb-5" },
              "Informe n\xF3mina"
            ),
            React.createElement(
              "h6",
              { className: "mb-0 font-italic " },
              this.props.typeError == "payrollPending" ? "No es posible cargar una nómina ya que posee una nómina pendiente de proceso." : "La vigencia de la n\xF3mina que estas intentando subir es mayor a 30 d\xEDas respecto a la ultima facturaci\xF3n.\n Podes solicitar la excepci\xF3n para el procesamiento de este caso mediante tu ejecutivo de cuentas"
            )
          ),
          React.createElement(
            "div",
            { className: "text-center mt-4" },
            React.createElement(
              "button",
              {
                className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                type: "button",
                onClick: this._handleOnClick
              },
              "Aceptar"
            )
          )
        );
      }
    }]);

    return PayrollLoadFail;
  }(React.Component);

  return PayrollLoadFail;
});