var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/inputvalidation", "../../common/inputValidationAcOff", "../../common/dropdownContent", "../../common/datepicker", "../../common/datepickerAcOff", "../../common/modalReactBootstrap", "../../controller/vidaColectivoController"], function (React, InputValidation, InputValidationAcOff, DropDownContent, DatePicker, DatePickerAcOff, ModalReactBootstrap, VidaColectivoController) {
  var FormPointConyuge = function (_React$Component) {
    _inherits(FormPointConyuge, _React$Component);

    function FormPointConyuge(props) {
      _classCallCheck(this, FormPointConyuge);

      var _this = _possibleConstructorReturn(this, (FormPointConyuge.__proto__ || Object.getPrototypeOf(FormPointConyuge)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
        if (id === "applicantEmailConyuge" && _this.state.applicantEmailConyuge.value) {
          _this._handleCheckEmail();
        }
        if (id == "formConyuge") {
          if (result.id == 2) {
            _this.state.noCheck = false; /**se utiliza para cambiar el check a no si antes ya habia guardado que si */
          } else {
            _this.state.noCheck = true;
          }
        }
        if (id === "applicantCUILConyuge" && result.value.length > 10) {
          _this.handleVerificationCuil(result.value);
        }
      };

      _this.handleVerificationCuil = function (cuil) {
        _this.vidaColectivoController.getExisteEnNomina(_this.props.product, cuil, function (data) {
          if (data === "S") {
            /**responde S si son iguales*/
            _this.setState({ validationConyuge: true });
            document.getElementById("applicantCUILConyuge").style.borderColor = "red";
          } else {
            _this.setState({ validationConyuge: false });
            document.getElementById("applicantCUILConyuge").style.borderColor = "";
          }
          _this.props.handleCheckConyuge(data);
        });
      };

      _this._newConyuge = function (e) {
        _this.props.handlerIsConyuge(e);
        _this._handleResults(e.target.name, { id: e.target.id });
      };

      _this._handleCheckEmail = function (e) {
        var emailConyuge = _this.props.applicantData.applicantEmailConyuge.value;
        var emailBeneficiary = _this.props.applicantData.applicantEmail.value;
        if (emailBeneficiary == emailConyuge) {
          _this.setState({ checkEmail: true });
        } else {
          _this.setState({ checkEmail: false });
        }
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$formConyuge = _ref.formConyuge,
          formConyuge = _ref$formConyuge === undefined ? "" : _ref$formConyuge,
          _ref$applicantCUILCon = _ref.applicantCUILConyuge,
          applicantCUILConyuge = _ref$applicantCUILCon === undefined ? "" : _ref$applicantCUILCon,
          _ref$applicantNameCon = _ref.applicantNameConyuge,
          applicantNameConyuge = _ref$applicantNameCon === undefined ? "" : _ref$applicantNameCon,
          _ref$applicantSurname = _ref.applicantSurnameConyuge,
          applicantSurnameConyuge = _ref$applicantSurname === undefined ? "" : _ref$applicantSurname,
          _ref$applicantDateBir = _ref.applicantDateBirthConyuge,
          applicantDateBirthConyuge = _ref$applicantDateBir === undefined ? "" : _ref$applicantDateBir,
          _ref$applicantEmailCo = _ref.applicantEmailConyuge,
          applicantEmailConyuge = _ref$applicantEmailCo === undefined ? "" : _ref$applicantEmailCo;

      _this.state = {
        formConyuge: {
          id: formConyuge
        },
        applicantCUILConyuge: {
          value: applicantCUILConyuge,
          required: true,
          isValidate: false
        },
        applicantNameConyuge: {
          value: applicantNameConyuge,
          isValidate: false,
          required: true
        },
        applicantSurnameConyuge: {
          value: applicantSurnameConyuge,
          isValidate: false,
          required: true
        },
        applicantDateBirthConyuge: {
          value: applicantDateBirthConyuge,
          isValidate: false,
          required: true
        },
        applicantEmailConyuge: {
          value: applicantEmailConyuge,
          isValidate: false,
          required: true
        },
        showModal: false,
        loading: false,
        checkEmail: false,
        noCheck: false,
        validationConyuge: false,
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null,
          disBtnAccept: true
        }
      };
      _this.vidaColectivoController = new VidaColectivoController();

      _this.referencies = {
        applicantCUILConyuge: React.createRef(),
        applicantNameConyuge: React.createRef(),
        applicantSurnameConyuge: React.createRef(),
        applicantDateBirthConyuge: React.createRef(),
        applicantEmailConyuge: React.createRef()
      };
      return _this;
    }

    _createClass(FormPointConyuge, [{
      key: "render",
      value: function render() {
        var _React$createElement, _React$createElement2;

        var readOnly = this.props.readOnly;

        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            { className: "form-check row justify-content-md-center col-md-3 " },
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "flexRadioDefault1" },
              "Adhiere"
            )
          ),
          React.createElement(
            "div",
            { className: "form-check row justify-content-md-center col-md-3 text-center" },
            React.createElement("input", (_React$createElement = {
              className: "form-check-input",
              onClick: this._newConyuge,
              checked: this.props.check ? true : null,
              type: "radio"
            }, _defineProperty(_React$createElement, "checked", this.state.formConyuge.id == "1" ? true : false), _defineProperty(_React$createElement, "onResult", this._handleResults), _defineProperty(_React$createElement, "name", "formConyuge"), _defineProperty(_React$createElement, "id", "1"), _React$createElement)),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "flexRadioDefault1" },
              "SI"
            )
          ),
          React.createElement(
            "div",
            { className: "form-check row justify-content-md-center col-md-3 text-center" },
            React.createElement("input", (_React$createElement2 = {
              onClick: this._newConyuge,
              className: "form-check-input",
              checked: this.props.check ? true : null,
              type: "radio"
            }, _defineProperty(_React$createElement2, "checked", this.state.formConyuge.id == "2" ? true : false), _defineProperty(_React$createElement2, "onResult", this._handleResults), _defineProperty(_React$createElement2, "name", "formConyuge"), _defineProperty(_React$createElement2, "id", "2"), _React$createElement2)),
            React.createElement(
              "label",
              { className: "form-check-label", htmlFor: "flexRadioDefault2" },
              "NO"
            )
          ),
          this.state.formConyuge.id == "1" && this.props.check || this.state.noCheck ? React.createElement(
            "div",
            null,
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-row mt-2 form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "applicantNameConyuge"
                    },
                    "Nombre"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.applicantNameConyuge,
                    classNameAd: "hide",
                    id: "applicantNameConyuge",
                    name: "applicantNameConyuge",
                    minLength: "2",
                    maxLength: "40",
                    pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                    value: this.state.applicantNameConyuge.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    formatText: "Nombre Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "applicantSurnameConyuge"
                    },
                    "Apellido"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.applicantSurnameConyuge,
                    classNameAd: "hide",
                    id: "applicantSurnameConyuge",
                    name: "applicantSurnameConyuge",
                    minLength: "2",
                    maxLength: "40",
                    pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                    value: this.state.applicantSurnameConyuge.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    formatText: "Apellido Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "applicantDateBirthConyuge"
                    },
                    "Fecha de Nacimiento"
                  ),
                  React.createElement(
                    "div",
                    { className: "dp-ddben" },
                    React.createElement(DatePickerAcOff //si es DataPicker da error ver
                    , { ref: this.referencies.applicantDateBirthConyuge,
                      id: "applicantDateBirthConyuge",
                      name: "applicantDateBirthConyuge",
                      value: this.state.applicantDateBirthConyuge.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      disabled: readOnly,
                      maxDate: this.props.fecha,
                      required: true,
                      valueIsObject: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "applicantEmailConyuge"
                    },
                    "Correo Electr\xF3nico"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.applicantEmailConyuge,
                    classNameAd: "hide",
                    id: "applicantEmailConyuge",
                    name: "applicantEmailConyuge",
                    minLength: "2",
                    maxLength: "40",
                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                    value: this.state.applicantEmailConyuge.value,
                    className: "input-background-color form-control input-size",
                    formatText: "Correo Electr\xF3nico Contratante: La informaci\xF3n ingresada no corresponde al formato de correo electr\xF3nico v\xE1lido.",
                    onResult: this._handleResults,
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                )
              ),
              React.createElement(
                "div",
                { className: "form-row mt-2 form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "applicantCUILConyuge"
                    },
                    "N\xFAmero de CUIL"
                  ),
                  React.createElement(InputValidationAcOff, {
                    ref: this.referencies.applicantCUILConyuge,
                    classNameAd: "hide",
                    id: "applicantCUILConyuge",
                    name: "applicantCUILConyuge",
                    minLength: "11",
                    maxLength: "11",
                    value: this.state.applicantCUILConyuge.value,
                    className: "input-background-color form-control input-size",
                    formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser 11.",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (isNaN(e.key)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                )
              ),
              this.state.checkEmail ? React.createElement(
                "div",
                { className: "form-group col-5 text-center" },
                React.createElement(
                  "p",
                  null,
                  "Debera escribir un mail diferente al del asegurado"
                )
              ) : "",
              this.state.validationConyuge ? React.createElement(
                "div",
                { className: "form-group col-5 text-center" },
                React.createElement(
                  "p",
                  { className: "alert-danger" },
                  React.createElement(
                    "b",
                    null,
                    "tenga en cuenta que su conyuge ya se encuentra  incluido en esta poliza colectiva como asegurado y no podr\xE1 ser incluido en este apartado"
                  )
                )
              ) : "",
              React.createElement(ModalReactBootstrap, {
                title: this.state.modal.title,
                show: this.state.showModal,
                size: this.state.modal.size,
                isOpen: this._handleModalIsOpen,
                component: this.state.modal.component,
                html: this.state.modal.html,
                contentHTML: this.state.modal.contentHTML,
                disBtnAccept: this.state.modal.disBtnAccept
              })
            )
          ) : ""
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.state.formConyuge.id == "") {
          var e = { target: { id: 2 } };
          this.setState({ formConyuge: { id: 2, referencies: undefined } });
          this.props.handlerIsConyuge(e);
          var result = { id: "2", referencies: undefined };

          this.setState({ formConyuge: result });
          result.referencies = this.referencies.formConyuge;
          this.props.onResults("formConyuge", result);

          this.state.noCheck = false; /**se utiliza para cambiar el check a no si antes ya habia guardado que si */
        }
      }
    }]);

    return FormPointConyuge;
  }(React.Component);

  return FormPointConyuge;
});