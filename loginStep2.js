var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputMaskValidation", "../common/dropdownContent", "../common/loader", "../controller/loginController"], function (React, InputMaskValidation, DropDownContent, Loader, LoginController) {
  var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm(props) {
      _classCallCheck(this, LoginForm);

      var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
        _this.props.onResult(id, result);
      };

      _this._handleMaskDni = function () {
        var idn = _this.state.rccUltimo.idn;
        if (idn) {
          return idn.replace(/[9]/g, "\\9").replace(/X/g, "9");
        }
      };

      _this.state = {
        listTipoDoc: [],
        tipoDoc: {},
        nroDoc: {},
        identifier: {},
        rccUltimo: {}
      };
      return _this;
    }

    _createClass(LoginForm, [{
      key: "render",
      value: function render() {
        var _state = this.state,
            tipoDoc = _state.tipoDoc,
            nroDoc = _state.nroDoc;


        var submitDisabled = (typeof tipoDoc.value !== "undefined" && typeof nroDoc.value !== "undefined" && nroDoc.value.search("_") == -1 ? false : true) || this.props.isSubmitting;
        if (this.state.listTipoDoc.length && this.state.identifier.DOCUMTIP) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "hsbc-title-step offset-1" },
              " Paso 2"
            ),
            React.createElement(
              "h2",
              { className: "hsbc-subtitle" },
              "Inici\xE1 sesi\xF3n ingresando tu documento:"
            ),
            React.createElement("div", { className: "hsbc-divider" }),
            React.createElement(
              "form",
              { noValidate: true, onSubmit: this.props.onSubmit },
              React.createElement(
                "div",
                { className: "form-group offset-1" },
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "label",
                    {
                      htmlFor: "tipoEmail",
                      className: "col-form-label smallFont"
                    },
                    "Tipo de documento:"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "lessPadding" },
                  React.createElement(DropDownContent, {
                    list: this.state.listTipoDoc,
                    className: "input-background-color lessPadding form-control",
                    id: "tipoDoc",
                    name: "tipoDoc",
                    idObject: "POV_COD_TDO",
                    nameObject: "POV_DES_TDO",
                    typeValue: "id",
                    defaultValue: this.state.identifier.DOCUMTIP,
                    onResult: this._handleResults,
                    disabled: true
                  })
                )
              ),
              React.createElement(
                "div",
                { className: "form-group offset-1" },
                React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "label",
                    {
                      htmlFor: "doc",
                      className: "col-form-label smallFont"
                    },
                    "Documento:"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "lessPadding" },
                  React.createElement(InputMaskValidation, {
                    id: "nroDoc",
                    name: "nroDoc",
                    type: "nroDoc",
                    autoFocus: true,
                    requiredStr: "DNI requerido",
                    charactersStr: "",
                    invalidStr: "El campo no tiene formato",
                    className: "input-background-color lessPadding form-control",
                    mask: this._handleMaskDni(),
                    alwaysShowMask: true,
                    onResult: this._handleResults
                  })
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                  "div",
                  null,
                  this.props.isSubmitting && React.createElement(Loader, null),
                  React.createElement(
                    "button",
                    _defineProperty({
                      type: "submit",
                      id: "btn-submit",
                      className: "btn btn-primary btn-hsbc",
                      disabled: submitDisabled
                    }, "className", "btn hsbc-btn-red " + (submitDisabled ? "disabled" : "")),
                    this.props.isSubmitting ? "Iniciando Sesion" : "Iniciar Sesion"
                  )
                )
              )
            )
          );
        } else {
          return React.createElement(
            "div",
            { className: " col-md-10 d-flex justify-content-center mt-5 pt-5" },
            React.createElement(Loader, { width: "6rem", height: "6rem" }),
            React.createElement("br", null)
          );
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var controller = new LoginController();
        controller.getIdentificador().then(function (data) {
          var rccUltimo = JSON.parse(data.RCCULTIMO);

          _this2.setState({
            identifier: data,
            rccUltimo: rccUltimo
          });

          var rcc = {
            rcc1: rccUltimo.rcc1,
            rcc2: rccUltimo.rcc2,
            rcc3: rccUltimo.rcc3
          };

          _this2.props.onResult("rcc", rcc);
        });

        controller.getTiposDocumento().then(function (data) {
          _this2.setState({
            listTipoDoc: data
          });
        });
      }
    }]);

    return LoginForm;
  }(React.Component);

  return LoginForm;
});