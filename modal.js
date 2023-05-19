var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  "use strict";

  var Modal = function (_React$Component) {
    _inherits(Modal, _React$Component);

    function Modal() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Modal);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Modal.__proto__ || Object.getPrototypeOf(Modal)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (form, previusForm) {
        _this.props.onResult();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Modal, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            id = _props.id,
            title = _props.title,
            content = _props.content,
            textBtnAccept = _props.textBtnAccept,
            textBtnCancel = _props.textBtnCancel,
            _props$displayButtons = _props.displayButtons,
            displayButtons = _props$displayButtons === undefined ? false : _props$displayButtons,
            className = _props.className;

        var hide = {
          display: "none"
        };
        var show = {
          display: "block",
          zIndex: 1072
        };

        return React.createElement(
          "div",
          {
            className: "modal fade",
            id: id,
            style: hide,
            tabIndex: "-1",
            role: "dialog",
            "aria-labelledby": id,
            "aria-hidden": "true",
            "data-backdrop": "false"
          },
          React.createElement(
            "div",
            { className: "modal-dialog " + className, role: "document" },
            React.createElement(
              "div",
              { className: "modal-content" },
              React.createElement(
                "div",
                { className: "modal-header" },
                React.createElement(
                  "h5",
                  { className: "modal-title", id: "exampleModalLabel" },
                  title
                ),
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "close",
                    "data-dismiss": "modal",
                    "aria-label": "Close"
                  },
                  React.createElement(
                    "span",
                    { "aria-hidden": "true" },
                    "\xD7"
                  )
                )
              ),
              React.createElement("div", {
                className: "modal-body",
                dangerouslySetInnerHTML: { __html: content }
              }),
              displayButtons ? React.createElement(
                "div",
                { className: "modal-footer" },
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-secondary",
                    "data-dismiss": "modal"
                  },
                  textBtnCancel
                ),
                React.createElement(
                  "button",
                  {
                    type: "button",
                    className: "btn btn-primary",
                    onClick: this._handleOnClick
                  },
                  textBtnAccept
                )
              ) : ""
            )
          )
        );
      }
    }]);

    return Modal;
  }(React.Component);

  return Modal;
});