var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-bootstrap"], function (React, ReactBootstrap) {
  var SaldoCuentasMensaje = function (_React$PureComponent) {
    _inherits(SaldoCuentasMensaje, _React$PureComponent);

    function SaldoCuentasMensaje() {
      _classCallCheck(this, SaldoCuentasMensaje);

      return _possibleConstructorReturn(this, (SaldoCuentasMensaje.__proto__ || Object.getPrototypeOf(SaldoCuentasMensaje)).apply(this, arguments));
    }

    _createClass(SaldoCuentasMensaje, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            className = _props.className,
            id = _props.id,
            classNameDiv = _props.classNameDiv,
            onClick = _props.onClick;


        return React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            { className: "m-3 font-italic" },
            "Te informamos que moment\xE1neamente los saldos al cierre del mes no se encuentran disponibles debido a la actualizaci\xF3n por parte del sistema, los mismos podr\xE1n visualizarse a partir del sexto dia del mes corriente."
          ),
          React.createElement(
            "div",
            { align: "center", "class": "col-md6" },
            React.createElement(
              "button",
              {
                className: "btn btn btn-light border-dark ",
                onClick: onClick //{this._handleBack}
              },
              "Volver"
            )
          )
        );
      }
    }]);

    return SaldoCuentasMensaje;
  }(React.PureComponent);

  return SaldoCuentasMensaje;
});