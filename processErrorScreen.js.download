var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var ProcessErrorScreen = function (_React$Component) {
    _inherits(ProcessErrorScreen, _React$Component);

    function ProcessErrorScreen(props) {
      _classCallCheck(this, ProcessErrorScreen);

      var _this = _possibleConstructorReturn(this, (ProcessErrorScreen.__proto__ || Object.getPrototypeOf(ProcessErrorScreen)).call(this, props));

      _this._handleOnClick = function () {
        _this.props.switch('home');
      };

      _this._textError = function () {
        var text = "No se pudo enviar la nómina ";
        if (_this.props.textError) text = _this.props.textError;
        return text;
      };

      return _this;
    }

    _createClass(ProcessErrorScreen, [{
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
              this.props.title
            ),
            React.createElement(
              "h6",
              { className: "mb-0 text-center" },
              this._textError(),
              " (",
              this.props.error,
              ")"
            )
          ),
          React.createElement(
            "div",
            { className: "text-center mt-5" },
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

    return ProcessErrorScreen;
  }(React.Component);

  return ProcessErrorScreen;
});