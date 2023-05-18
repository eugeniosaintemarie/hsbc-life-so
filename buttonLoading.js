var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  "use strict";

  var ButtonLoading = function (_React$Component) {
    _inherits(ButtonLoading, _React$Component);

    function ButtonLoading(props) {
      _classCallCheck(this, ButtonLoading);

      return _possibleConstructorReturn(this, (ButtonLoading.__proto__ || Object.getPrototypeOf(ButtonLoading)).call(this, props));
    }

    _createClass(ButtonLoading, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            children = _props.children,
            className = _props.className,
            disabled = _props.disabled,
            _props$loading = _props.loading,
            loading = _props$loading === undefined ? false : _props$loading,
            onClick = _props.onClick;

        return React.createElement(
          "button",
          { disabled: disabled, className: className, onClick: onClick },
          loading ? React.createElement("i", { className: "fa fa-circle-notch fa-spin mr-1" }) : "",
          children
        );
      }
    }]);

    return ButtonLoading;
  }(React.Component);

  return ButtonLoading;
});