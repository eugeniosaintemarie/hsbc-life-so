var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/presentadoAnte", "../common/errormessage"], function (React, InputValidation, PresentadoAnte, Errormessage) {
  var AltaIndividual = function (_React$Component) {
    _inherits(AltaIndividual, _React$Component);

    function AltaIndividual(props) {
      _classCallCheck(this, AltaIndividual);

      var _this = _possibleConstructorReturn(this, (AltaIndividual.__proto__ || Object.getPrototypeOf(AltaIndividual)).call(this, props));

      _this._nuevoButton = function () {
        var current = _this.state.nuevo;
        var currentState = _this.state;

        _this.setState(Object.assign({}, currentState, {
          nuevo: !current
        }));
      };

      _this._handleResults = function (id, result) {
        var data = _defineProperty({}, id, result);
        var form = Object.keys(_this.state.form);
        form = form.find(function (el) {
          return el === id;
        });

        if (typeof form !== "undefined") {
          var current = _this.state;
          var old = _this.state.form;
          _this.setState(Object.assign({}, current, {
            form: Object.assign({}, old, data)
          }));
        }
      };

      _this.validarInput = function () {
        var estado = "Alta Temprana";
        var cuil = _this.state.form.cuil.value;
        var apellido = _this.state.form.apellido.value;
        var nombre = _this.state.form.nombre.value;

        if (cuil != "" && cuil.length == 11 && apellido != undefined && nombre != undefined) {
          var jsonNomina = { TIPDOCU: 5, CUIL: cuil, NOMBRE: nombre, APELLIDO: apellido, ESTADO: estado };
          _this.props._handleButtonAgregar(jsonNomina);
          _this.setState({ validation: true });
          _this._nuevoButton();
        } else {
          _this.setState({ validation: false });
        }
      };

      _this._tableExcel = function () {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "table",
            { className: "table table-sm table-bordered" },
            React.createElement(
              "thead",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  { colSpan: "8", className: "main-header" },
                  "Nomina correspondiente al grupo"
                )
              ),
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th",
                  null,
                  "Apellido y Nombre"
                ),
                React.createElement(
                  "th",
                  null,
                  "N\xFAmero de Documento"
                ),
                React.createElement(
                  "th",
                  null,
                  "Estado"
                ),
                _this.props.validation ? React.createElement(
                  "th",
                  null,
                  "Resultado"
                ) : ""
              )
            ),
            React.createElement(
              "tbody",
              null,
              _this.props.nominas.map(function (e) {
                return React.createElement(
                  "tr",
                  { key: e.__rowNum__ },
                  React.createElement(
                    "td",
                    null,
                    e.APELLIDO + " " + e.NOMBRE
                  ),
                  React.createElement(
                    "td",
                    null,
                    e.CUIL
                  ),
                  React.createElement(
                    "td",
                    null,
                    e.ESTADO
                  ),
                  _this.props.validation ? e.VALIDACION ? _this._caseValidationResult(e) : React.createElement(
                    "td",
                    null,
                    React.createElement("div", {
                      className: "spinner-border spinner-border-sm position-spinner  ",
                      role: "status"
                    })
                  ) : ""
                );
              })
            )
          )
        );
      };

      _this.state = {
        nuevo: false,
        form: { nombre: "", apellido: "", cuil: "" },
        validation: true
      };
      return _this;
    }

    _createClass(AltaIndividual, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Ingres\xE1 la n\xF3mina para Constancia de cobertura altas tempranas"
          ),
          React.createElement(
            React.Fragment,
            null,
            this._tableExcel(),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "row justify-content-md-center mt-2" },
                this.state.nuevo == false ? React.createElement(
                  "button",
                  {
                    className: "ml-3 btn btn-hsbc-yellow mt-2 ",
                    onClick: this._nuevoButton
                  },
                  "Nuevo"
                ) : React.createElement(
                  "div",
                  { className: "form-container" },
                  React.createElement(
                    "h5",
                    { className: "form-title" },
                    "Nuevo nominado"
                  ),
                  React.createElement(
                    "form",
                    { noValidate: true },
                    React.createElement(
                      "div",
                      { className: "form-group row" },
                      React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(
                          "label",
                          {
                            htmlFor: "apellido",
                            className: "col-form-label text-md-left" },
                          "Apellido"
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(
                          "label",
                          {
                            htmlFor: "apellido",
                            className: "col-form-label text-md-left" },
                          "Nombre"
                        )
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(
                          "label",
                          {
                            htmlFor: "cuil",
                            className: "col-form-label text-md-left" },
                          "CUIL"
                        )
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "form-group row" },
                      React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(InputValidation, {
                          id: "apellido",
                          name: "apellido",
                          type: "text",
                          minLength: "2",
                          maxLength: "30",
                          requiredStr: "Apellido requerido",
                          className: "form-control",
                          upperCase: true,
                          onResult: this._handleResults })
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(InputValidation, {
                          id: "nombre",
                          name: "nombre",
                          type: "text",
                          minLength: "2",
                          maxLength: "30",
                          requiredStr: "Nombre requerido",
                          className: "form-control",
                          upperCase: true,
                          onResult: this._handleResults })
                      ),
                      React.createElement(
                        "div",
                        { className: "col-md-4" },
                        React.createElement(InputValidation, {
                          id: "cuil",
                          name: "cuil",
                          type: "text",
                          minLength: "11",
                          maxLength: "11",
                          requiredStr: "cuil requerido",
                          className: "form-control",
                          upperCase: true,
                          onKeyPress: function onKeyPress(e) {
                            if (isNaN(e.key)) {
                              e.preventDefault();
                            }
                          },
                          onResult: this._handleResults })
                      )
                    ),
                    React.createElement(
                      "p",
                      { "class": "advertencia" },
                      "Todos los campos son obligatorios"
                    ),
                    this.state.validation == false ? "" : ""
                  ),
                  React.createElement(
                    "div",
                    { className: "row justify-content-md-center mt-2" },
                    React.createElement(
                      "button",
                      {
                        className: "ml-3 btn btn-hsbc-yellow mt-2",
                        onClick: this.validarInput
                      },
                      "Agregar"
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "justify-content-md-center" },
                React.createElement("br", null),
                React.createElement(PresentadoAnte, { setPresentado: this.props.setPresentado, _handleHideError: this.props._handleHideError }),
                React.createElement("br", null),
                this.props.nominas.length > 0 ? !this.props.validation ? React.createElement(
                  "div",
                  { className: "row justify-content-md-center mt-2" },
                  React.createElement(
                    "button",
                    {
                      className: "btn btn btn-danger border-dark right mt-2 mr-3",
                      onClick: this.props._handleImprimirButton
                    },
                    "Imprimir"
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "btn btn-light  m-1 p-1 pr-2 pl-2",
                      type: "button",
                      onClick: this.props._handleButtonCancel
                    },
                    "Cancelar"
                  )
                ) : "" : ""
              )
            )
          )
        );
      }
    }]);

    return AltaIndividual;
  }(React.Component);

  return AltaIndividual;
});