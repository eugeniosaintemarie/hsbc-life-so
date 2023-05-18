var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../../common/inputvalidation", "../../common/loader", "../../controller/beneficiariosController", "../../common/errormessage", "../../common/modalReactBootstrap"], function (React, ReactRedux, InputValidation, Loader, BeneficiariosController, Errormessage, ModalReactBootstrap) {
  var IdentityValidationBeneficiary = function (_React$Component) {
    _inherits(IdentityValidationBeneficiary, _React$Component);

    function IdentityValidationBeneficiary(props) {
      _classCallCheck(this, IdentityValidationBeneficiary);

      var _this = _possibleConstructorReturn(this, (IdentityValidationBeneficiary.__proto__ || Object.getPrototypeOf(IdentityValidationBeneficiary)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
      };

      _this._handleCancelOnClick = function () {
        _this.props.handlerSwitch("ListBeneficiaries");
      };

      _this._handleConfirmOnClick = function (e) {
        _this.setState({ submitting: true });
        _this.controller.verificarCodigoEmail(_this.state.code.value, function (data) {
          if (data == "pass") {
            _this.setState({ loaded: false });
            //Registrar datos en el AIS
            _this.props.accept();
          } else if (data == "OK") {
            _this.setState({
              count: _this.state.count + 1,
              showError: true,
              textError: "Código incorrecto Intento " + _this.state.count + " de 3",
              submitting: false
              //Intento fallido
            });
          } else if (data == "logOut" || data == "BL") {
            _this.setState({
              showModal: true,
              modal: {
                component: null,
                contentHTML: "Has superado la cantidad máxima de intentos. Tu usuario ha sido bloqueado.",
                html: true,
                title: "Modificación de beneficiarios",
                size: "md"
              },
              submitting: false
            });
            _this.props.logout();
          } else if (data == "ERROR") {
            _this.props.error();
          }
        });
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this.state = {
        loaded: false,
        code: "",
        count: 1,
        showError: false,
        textError: "",
        submitting: false,
        showModal: false,
        modal: {
          title: "",
          contentHTML: "",
          component: null,
          size: "md",
          html: false
        }
      };

      _this.controller = new BeneficiariosController();
      return _this;
    }

    _createClass(IdentityValidationBeneficiary, [{
      key: "render",
      value: function render() {
        var submitDisabled = this.state.submitting;

        if (this.state.loaded == false) {
          return React.createElement(
            "div",
            { className: "d-flex justify-content-center" },
            React.createElement(Loader, {
              className: "text-secondary ml-0",
              width: "5rem",
              height: "5rem"
            })
          );
        }
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "" },
            React.createElement(
              "div",
              { className: "col" },
              React.createElement(
                "p",
                { className: "m-3" },
                React.createElement(
                  "b",
                  null,
                  "Se ha enviado un mail con un c\xF3digo de seguridad a tu casilla de mail registrada"
                )
              ),
              React.createElement(
                "p",
                { className: "m-3" },
                "Ingres\xE1 el c\xF3digo de validaci\xF3n para confirmar la modificaci\xF3n"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "m-3" },
            React.createElement(
              "div",
              { className: "col-8" },
              React.createElement(InputValidation, {
                id: "code",
                name: "code",
                minLength: "0",
                maxLength: "40",
                requiredStr: "",
                charactersStr: "",
                className: "input-background-color form-control ",
                onResult: this._handleResults
              })
            )
          ),
          React.createElement(
            "div",
            { className: "text-center" },
            React.createElement(Errormessage, {
              className: "text-danger",
              show: this.state.showError,
              text: this.state.textError
            })
          ),
          React.createElement(
            "div",
            { className: "text-center" },
            React.createElement(
              "button",
              {
                className: "btn btn-dark  m-2 p-1 pr-2 pl-2 " + (submitDisabled ? "disabled" : ""),
                type: "button",
                disabled: submitDisabled,
                onClick: this._handleConfirmOnClick
              },
              this.state.submitting ? React.createElement("div", { className: "spinner-border spinner-border-sm position-spinner mr-2 " }) : "",
              "Confirmar"
            ),
            React.createElement(
              "button",
              {
                className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                type: "button",
                onClick: this._handleCancelOnClick
              },
              "Cancelar"
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModal,
              size: this.state.modal.size,
              isOpen: this._handleModalIsOpen,
              component: this.state.modal.component,
              html: this.state.modal.html,
              contentHTML: this.state.modal.contentHTML
            })
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.controller = new BeneficiariosController();
        this.controller.sendValidationEmail(function (data) {
          if (data) {
            _this2.setState({
              loaded: true
            });
          }
        });
      }
    }]);

    return IdentityValidationBeneficiary;
  }(React.Component);

  function mapStateToProps(state) {
    return {};
  }

  function mapDispatchToProps(dispatch) {
    return {
      logout: function logout() {
        return dispatch({ type: "LOGOUT" });
      }
    };
  }
  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(IdentityValidationBeneficiary);
});