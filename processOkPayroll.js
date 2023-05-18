var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../lib/utils", "../../common/modalReactBootstrap"], function (React, Utils, ModalReactBootstrap) {
  var ProcessOkPayroll = function (_React$Component) {
    _inherits(ProcessOkPayroll, _React$Component);

    function ProcessOkPayroll(props) {
      _classCallCheck(this, ProcessOkPayroll);

      var _this = _possibleConstructorReturn(this, (ProcessOkPayroll.__proto__ || Object.getPrototypeOf(ProcessOkPayroll)).call(this, props));

      _this._handleOnClick = function () {
        _this.props.switch('home');
      };

      return _this;
    }

    _createClass(ProcessOkPayroll, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.displayNone && this.props.displayNone();
      }
    }, {
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
              "Informe n\xF3mina completa"
            ),
            React.createElement(
              "h6",
              { className: "mb-2 font-italic processOkTitle" },
              "\xA1El proceso se ha realizado con \xE9xito!"
            ),
            React.createElement(
              "h6",
              { className: "mb-0 font-italic " },
              "La carga de esta nueva n\xF3mina no implica conformidad por parte de la Compa\xF1\xEDa",
              React.createElement("br", null),
              "por lo que deber\xE1 ser validada."
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

    return ProcessOkPayroll;
  }(React.Component);

  return ProcessOkPayroll;
});