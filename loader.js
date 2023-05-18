var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader(props) {
      _classCallCheck(this, Loader);

      return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));
    }

    _createClass(Loader, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            text = _props.text,
            className = _props.className,
            width = _props.width,
            height = _props.height,
            fullscreen = _props.fullscreen,
            divClass = _props.divClass;

        text = typeof text !== "undefined" ? text : "Loading";
        className = typeof className !== "undefined" ? className : "text-secondary";
        width = typeof width !== "undefined" ? width : "2rem";
        height = typeof height !== "undefined" ? height : "2rem";
        var style = {
          height: height,
          width: width
        };
        return React.createElement(
          "div",
          {
            className: fullscreen ? "spinner-border-fullscreen" : !divClass ? "" : divClass
          },
          React.createElement("div", {
            className: "spinner-border " + className + " ",
            style: style,
            role: "status"
          }),
          React.createElement(
            "div",
            { className: fullscreen ? "spinner-text-fullscreen" : "sr-only" },
            text,
            "..."
          )
        );
      }
    }]);

    return Loader;
  }(React.Component);

  return Loader;
});