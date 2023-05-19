var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var MessageComponent = function (_React$Component) {
    _inherits(MessageComponent, _React$Component);

    function MessageComponent(props) {
      _classCallCheck(this, MessageComponent);

      return _possibleConstructorReturn(this, (MessageComponent.__proto__ || Object.getPrototypeOf(MessageComponent)).call(this, props));
    }

    _createClass(MessageComponent, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            title = _props.title,
            titleClass = _props.titleClass,
            body = _props.body,
            bodyClass = _props.bodyClass,
            button = _props.button,
            buttonClass = _props.buttonClass;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "p",
            {
              className: titleClass ? titleClass : "font-italic font-weight-bold  mt-5"
            },
            title
          ),
          React.createElement(
            "p",
            { className: bodyClass ? bodyClass : "font-italic font-weight-bold" },
            body
          ),
          React.createElement(
            "div",
            { className: "d-flex justify-content-center mt-5" },
            React.createElement(
              "button",
              {
                className: buttonClass ? buttonClass : "btn btn btn-light border-dark right mt-2",
                onClick: button
              },
              "Aceptar"
            )
          )
        );
      }
    }]);

    return MessageComponent;
  }(React.Component);

  return MessageComponent;
});