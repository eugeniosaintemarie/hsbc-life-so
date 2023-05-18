var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/search", "../common/errormessage", "../lib/utils", "../services/segurosOnlineService"], function (React, InputValidation, Search, Errormessage, Utils, SegurosOnlineService) {
  var ModalPepLowRisk = function (_React$Component) {
    _inherits(ModalPepLowRisk, _React$Component);

    function ModalPepLowRisk(props) {
      _classCallCheck(this, ModalPepLowRisk);

      var _this = _possibleConstructorReturn(this, (ModalPepLowRisk.__proto__ || Object.getPrototypeOf(ModalPepLowRisk)).call(this, props));

      _this._handleServiceList = function () {
        _this.setState({ errorActividad: "" });
        _this.segurosOnlineService.getActividades({
          TIPOACT: "O",
          ACTIVID: _this.state.actividad.value,
          CODACT: ""
        }).then(function (data) {
          if (data == undefined || data.Code != "NO_ERROR") {
            _this.setState({
              errorActividad: "Ha ocurrido un error al realizar la busqueda, intentá la modificación mas tarde"
            });
          } else {
            _this.activitiesList = data.Message.DATOS.ACTIVIDADES.ACTIVIDAD;
            _this.setState({ errorActividad: "" });
          }
        });
      };

      _this._handleClearList = function () {
        _this.activitiesList = [];
      };

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
      };

      _this._handleOnChangeRadio = function (e) {
        _this._handleResults(e.target.name, e.target.id);
      };

      _this._handleOnChangeRadioPEP = function (e) {
        _this._handleResults(e.target.name, e.target.id);
        _this.setState({
          errorPEP: ""
        });
      };

      _this._handleOnChangeCuil = function (id, result) {
        _this._handleResults(id, result);
        _this.setState({
          errorCuil: ""
        });
      };

      _this._handleOnChangeActivity = function (id, result) {
        _this._handleResults(id, result);
        _this.setState({
          errorActividad: ""
        });
      };

      _this._handleContinue = function () {
        if (_this.state.esPEP == "tarde") {
          _this.segurosOnlineService.setPEPLowRisk({ COD_EST: "P" });
          _this.props.handleClose();
        } else if (_this.state.esPEP == "no") {
          if (_this.state.cuil.value.length < 11) {
            _this.setState({ errorCuil: "El campo debe tener 11 dígitos" });
          } else if (!Utils.fValCUIT(_this.state.cuil.value)) {
            _this.setState({ errorCuil: "CUIL inválido" });
          } else {
            _this.setState({ errorCuil: "" });
            _this.segurosOnlineService.setPEPLowRisk({
              COD_EST: "N",
              NRO_CUI: _this.state.cuil.value
            });
            _this.props.handleClose();
          }
        } else {
          var valid = true;

          if (_this.state.cuil.value < 11) {
            _this.setState({ errorCuil: "El campo debe tener 11 dígitos" });
            valid = false;
          } else if (!Utils.fValCUIT(_this.state.cuil.value)) {
            _this.setState({ errorCuil: "CUIL inválido" });
            valid = false;
          } else {
            _this.setState({ errorCuil: "" });
          }

          if (_this.state.tipoPEP === "") {
            _this.setState({
              errorPEP: "Marque una opcion"
            });
            valid = false;
          }

          if (!_this.state.actividad.id || _this.state.actividad.id && _this.state.actividad.id === "") {
            _this.setState({
              errorActividad: "Seleccione una actividad"
            });
            valid = false;
          }

          if (valid) {
            _this.segurosOnlineService.setPEPLowRisk({
              COD_EST: "S",
              NRO_CUI: _this.state.cuil.value,
              REL_PEP: _this.state.tipoPEP,
              COD_ACT: _this.state.actividad.id
            });
            _this.props.handleClose();
          }
        }
      };

      _this.state = {
        cuil: {
          value: _this.props.doc.tipoDoc === 5 ? _this.props.doc.nroDoc : "",
          isValidate: false
        },
        actividad: { value: "" },
        showError: false,
        accept: false,
        esPEP: "",
        tipoPEP: "",
        spouseOrFamiliar: "",

        errorCuil: "",
        errorPEP: "",
        errorActividad: ""
      };

      _this.activitiesList = [];
      _this.firstLoad = true;

      _this.segurosOnlineService = new SegurosOnlineService();
      return _this;
    }

    _createClass(ModalPepLowRisk, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              null,
              React.createElement(
                "h2",
                { className: "text-danger" },
                React.createElement(
                  "u",
                  null,
                  "Cuestionario PEP - Persona Expuesta Pol\xEDticamente"
                )
              ),
              React.createElement(
                "p",
                null,
                "B\xEDenvenido!"
              ),
              React.createElement(
                "p",
                { className: "text-justify" },
                "Queremos informarte acerca de una actualizaci\xF3n en la normativa UIF (Unidad de Informaci\xF3n Financiera)",
                " ",
                React.createElement(
                  "strong",
                  null,
                  "N\xB0134/2018 y sus modificatorias en relaci\xF3n a la definici\xF3n y alcance de Personas Expuestas Pol\xEDticamente (PEP).",
                  React.createElement("br", null)
                ),
                "Como todos estamos alcanzados dentro de esta normativa, y con el objetivo de cumplimentar con esta regulaci\xF3n, te pedimos que leas atentamente el cambio normativo para poder comprender las modificaciones y completar el formulario ya sea por S\xED o por No."
              ),
              React.createElement(
                "h6",
                { className: "text-secondary" },
                "\xBFQu\xE9 es la UIF?"
              ),
              React.createElement(
                "p",
                { className: "text-justify" },
                "Es el organismo gubernamental que est\xE1 a cargo de prevenir el lavado de dinero y financiaci\xF3n del terrorismo. M\xE1s info",
                " ",
                React.createElement(
                  "a",
                  { href: "https://www.argentina.gob.ar/uif", target: "_blank" },
                  "Aqu\xED"
                ),
                ".",
                " "
              ),
              React.createElement(
                "h6",
                { className: "text-secondary" },
                "\xBFQu\xE9 es PEP?"
              ),
              React.createElement(
                "p",
                { className: "text-justify" },
                "PEP significa Persona Expuesta Pol\xEDticamente, es decir, alguien que ocupa un puesto pol\xEDtico o es familiar de alguien que lo haga. Si ten\xE9s duda de si sos o no un PEP, por favor verifica la presente resoluci\xF3n ",
                React.createElement(
                  "strong",
                  null,
                  "N\xB0134/2018."
                ),
                " M\xE1s info",
                " ",
                React.createElement(
                  "a",
                  {
                    href: "https://www.argentina.gob.ar/uif/declaraciones",
                    target: "_blank"
                  },
                  "Aqu\xED"
                ),
                ".",
                " "
              ),
              React.createElement(
                "p",
                { className: "text-justify" },
                "En base a lo le\xEDdo, por favor respond\xE9 las siguientes preguntas"
              )
            ),
            React.createElement(
              "div",
              { className: "mb-4" },
              React.createElement(
                "h6",
                { className: "text-secondary" },
                "1. \xBFSos persona pol\xEDticamente expuesta?"
              ),
              React.createElement(
                "p",
                { className: "text-justify ml-5" },
                "Son los individuos que desempe\xF1an o han desempe\xF1ado funciones p\xFAblicas destacadas. Por ejemplo: pol\xEDticos de alta jerarqu\xEDa, funcionarios gubernamentales, etc. Si sos o est\xE1s relacionado con alguna de estas personas con alg\xFAn grado de parentesco marc\xE1 SI."
              ),
              React.createElement(
                "div",
                { className: "text-center" },
                React.createElement(
                  "div",
                  { "class": "form-check form-check-inline" },
                  React.createElement("input", {
                    "class": "form-check-input",
                    type: "radio",
                    name: "esPEP",
                    id: "si",
                    onChange: this._handleOnChangeRadio
                  }),
                  React.createElement(
                    "label",
                    { "class": "form-check-label", "for": "si" },
                    "SI"
                  )
                ),
                React.createElement(
                  "div",
                  { "class": "form-check form-check-inline" },
                  React.createElement("input", {
                    "class": "form-check-input",
                    type: "radio",
                    name: "esPEP",
                    id: "no",
                    onChange: this._handleOnChangeRadio
                  }),
                  React.createElement(
                    "label",
                    { "class": "form-check-label", "for": "no" },
                    "NO"
                  )
                ),
                React.createElement(
                  "div",
                  { "class": "form-check form-check-inline" },
                  React.createElement("input", {
                    "class": "form-check-input",
                    type: "radio",
                    name: "esPEP",
                    id: "tarde",
                    onChange: this._handleOnChangeRadio
                  }),
                  React.createElement(
                    "label",
                    { "class": "form-check-label", "for": "tarde" },
                    "CONTESTAR M\xC1S TARDE"
                  )
                )
              )
            ),
            this.state.esPEP === "si" || this.state.esPEP === "no" ? React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                  "div",
                  { className: "col-12" },
                  React.createElement(
                    "h6",
                    { className: "text-secondary" },
                    "2. Ingres\xE1 aqu\xED tu CUIL"
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "row ml-2 mb-4" },
                React.createElement(
                  "div",
                  { className: "col-4" },
                  React.createElement(InputValidation, {
                    id: "cuil",
                    name: "cuil",
                    minLength: "0",
                    maxLength: "11",
                    requiredStr: "Respuesta incompleta",
                    charactersStr: "",
                    value: this.state.cuil.value,
                    className: "input-background-color form-control",
                    onResult: this._handleOnChangeCuil,
                    disabled: this.props.doc.tipoDoc === 5 ? true : false
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                      "div",
                      null,
                      this.state.errorCuil
                    )
                  )
                )
              )
            ) : "",
            this.state.esPEP === "si" ? React.createElement(
              "div",
              null,
              React.createElement(
                "h6",
                { className: "text-secondary" },
                "3. \xBFCu\xE1l es tu relaci\xF3n con la Persona Expuesta Pol\xEDticamente?"
              ),
              React.createElement(
                "div",
                { className: "ml-2 mb-4 ml-4" },
                React.createElement(
                  "div",
                  { "class": "form-check" },
                  React.createElement("input", {
                    "class": "form-check-input",
                    type: "radio",
                    name: "tipoPEP",
                    id: "C",
                    onChange: this._handleOnChangeRadioPEP
                  }),
                  React.createElement(
                    "label",
                    { "class": "form-check-label", "for": "C" },
                    "C\xF3nyuge o Conviviente"
                  )
                ),
                React.createElement(
                  "div",
                  { "class": "form-check" },
                  React.createElement("input", {
                    "class": "form-check-input",
                    type: "radio",
                    name: "tipoPEP",
                    id: "F",
                    onChange: this._handleOnChangeRadioPEP
                  }),
                  React.createElement(
                    "label",
                    { "class": "form-check-label", "for": "exampleRadios2" },
                    "Familiar directo"
                  )
                ),
                React.createElement(
                  "div",
                  { "class": "form-check" },
                  React.createElement("input", {
                    "class": "form-check-input",
                    type: "radio",
                    name: "tipoPEP",
                    id: "P",
                    onChange: this._handleOnChangeRadioPEP
                  }),
                  React.createElement(
                    "label",
                    { "class": "form-check-label", "for": "exampleRadios3" },
                    "Soy Persona Pol\xEDticamente Expuesta"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "alert alert-danger" },
                  React.createElement(
                    "div",
                    null,
                    this.state.errorPEP
                  )
                )
              )
            ) : "",
            this.state.esPEP === "si" && this.state.tipoPEP != "" ? React.createElement(
              "div",
              null,
              React.createElement(
                "h6",
                { className: "text-secondary" },
                this.state.esPEP === "si" && this.state.tipoPEP === "P" ? "4. Por favor indique su actividad/cargo que lo identifica como PEP:" : "4. Por favor indique la actividad/cargo que ocupa su cónyuge/conviviente/familiar directo"
              ),
              React.createElement(
                "div",
                { className: "row ml-2 mb-4" },
                React.createElement(
                  "div",
                  { className: "col-6 mt-1" },
                  React.createElement(Search, {
                    classNameAd: "hide",
                    ref: "0",
                    id: "actividad",
                    name: "actividad",
                    disabled: false,
                    minLength: "5",
                    maxLength: "70",
                    value: this.state.actividad.value,
                    className: "input-background-color form-control ",
                    onResult: this._handleOnChangeActivity,
                    dataList: this.activitiesList,
                    handleSeviceList: this._handleServiceList,
                    clearList: this._handleClearList,
                    onKeyPress: function onKeyPress(e) {
                      if (!e.key.match(/^[\D]+$/im)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                      "div",
                      null,
                      this.state.errorActividad
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-4 text-danger" },
                  React.createElement(
                    "p",
                    null,
                    "Ingrese las primeras 5 letras de su cargo y seleccione del listado"
                  )
                )
              )
            ) : "",
            React.createElement(Errormessage, {
              className: "text-danger text-left ml-4",
              show: this.state.showError,
              text: "Los E-mails ingresados no coinciden"
            }),
            React.createElement(
              "div",
              { className: "text-right" },
              React.createElement(
                "button",
                {
                  onClick: this._handleContinue,
                  type: "button",
                  disabled: this.state.esPEP === "" ? true : false,
                  className: "btn btn-danger m-2"
                },
                "Continuar"
              )
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.firstLoad = false;
      }
    }]);

    return ModalPepLowRisk;
  }(React.Component);

  return ModalPepLowRisk;
});