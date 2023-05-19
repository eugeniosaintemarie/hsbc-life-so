var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-bootstrap"], function (React, ReactBootstrap) {
  var ModalReactBootstrap = function (_React$Component) {
    _inherits(ModalReactBootstrap, _React$Component);

    function ModalReactBootstrap(props) {
      _classCallCheck(this, ModalReactBootstrap);

      var _this = _possibleConstructorReturn(this, (ModalReactBootstrap.__proto__ || Object.getPrototypeOf(ModalReactBootstrap)).call(this, props));

      _this._handleClose = function () {
        _this.setState({ show: false });
      };

      _this._handleShow = function () {
        return _this.setState({ show: false });
      };

      _this.state = {
        show: false
      };
      return _this;
    }

    _createClass(ModalReactBootstrap, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            title = _props.title,
            _props$hiddenButtonCl = _props.hiddenButtonClose,
            hiddenButtonClose = _props$hiddenButtonCl === undefined ? false : _props$hiddenButtonCl,
            contentComponent = _props.contentComponent,
            textBtnAccept = _props.textBtnAccept,
            textBtnCancel = _props.textBtnCancel,
            _props$displayButtons = _props.displayButtons,
            displayButtons = _props$displayButtons === undefined ? false : _props$displayButtons,
            className = _props.className,
            show = _props.show,
            isOpen = _props.isOpen,
            size = _props.size,
            dialogClassName = _props.dialogClassName,
            accept = _props.accept,
            responseModal = _props.responseModal,
            classAccept = _props.classAccept,
            classCancel = _props.classCancel;

        var comp = this.props.component;
        if (comp) {
          comp.props = Object.assign({}, comp.props, {
            close: isOpen,
            responseModal: responseModal
          });
        }

        return React.createElement(
          ReactBootstrap.Modal,
          {
            show: show,
            size: size,
            className: className,
            onHide: isOpen,
            animation: true,
            dialogClassName: dialogClassName
          },
          React.createElement(
            ReactBootstrap.Modal.Header,
            { closeButton: true },
            React.createElement(
              ReactBootstrap.Modal.Title,
              null,
              title
            )
          ),
          React.createElement(
            ReactBootstrap.Modal.Body,
            null,
            !this.props.html && this.props.component !== null && comp,
            this.props.html && this.props.component === null && React.createElement("div", {
              className: "col-md-12 text-center",
              dangerouslySetInnerHTML: { __html: this.props.contentHTML }
            }),
            !this.props.html && this.props.component === null && React.createElement("h2", null)
          ),
          React.createElement(
            ReactBootstrap.Modal.Footer,
            null,
            !hiddenButtonClose && !accept ? React.createElement(
              ReactBootstrap.Button,
              { variant: "secondary", onClick: isOpen },
              "Cerrar"
            ) : React.createElement("br", null),
            accept ? React.createElement(
              "div",
              null,
              React.createElement(
                ReactBootstrap.Button,
                { className: classAccept ? classAccept : 'mr-2', variant: "primary", onClick: accept, disabled: this.props.disBtnAccept ? this.props.disBtnAccept : false },
                textBtnAccept ? textBtnAccept : "Aceptar"
              ),
              React.createElement(
                ReactBootstrap.Button,
                { className: classCancel ? classCancel : '', variant: "secondary", onClick: isOpen, id: "cancelButtonModal" },
                textBtnCancel ? textBtnCancel : "Cancelar"
              )
            ) : React.createElement("br", null)
          )
        );
      }
    }]);

    return ModalReactBootstrap;
  }(React.Component);

  return ModalReactBootstrap;
});