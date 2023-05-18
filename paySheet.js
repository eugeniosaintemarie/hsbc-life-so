var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/inputFile"], function (React, InputValidation, InputFile) {
  var PaySheet = function (_React$Component) {
    _inherits(PaySheet, _React$Component);

    function PaySheet(props) {
      _classCallCheck(this, PaySheet);

      var _this = _possibleConstructorReturn(this, (PaySheet.__proto__ || Object.getPrototypeOf(PaySheet)).call(this, props));

      _this._handleResults = function () {};

      return _this;
    }

    _createClass(PaySheet, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          { className: "container remove-left-padding profile-container" },
          React.createElement(
            "div",
            { className: "panel col-md-10" },
            React.createElement(
              "div",
              { className: "panel-title" },
              React.createElement(
                "h4",
                { className: "subtitle-inside" },
                "Carga de N\xF3mina"
              )
            ),
            React.createElement(
              "div",
              { className: "panel-container" },
              React.createElement(
                "h6",
                null,
                "Equivalencias"
              ),
              React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                  "div",
                  { className: "col-md-4" },
                  React.createElement(
                    "label",
                    { "for": "estado" },
                    "Tipo de documento"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(
                    "select",
                    {
                      name: "pregunta-personal",
                      id: "pregunta-personal",
                      className: "form-control"
                    },
                    React.createElement(
                      "option",
                      { value: "dni" },
                      "DNI"
                    ),
                    React.createElement(
                      "option",
                      { value: "otro" },
                      "Otro"
                    )
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement(
                  "div",
                  { className: "col-md-4" },
                  React.createElement(
                    "label",
                    { "for": "pregunta-personal" },
                    "N\xFAmero"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(InputValidation, {
                    id: "number",
                    name: "number",
                    type: "text",
                    minLength: "8",
                    maxLength: "8",
                    charactersStr: "",
                    className: "form-control",
                    onResult: this._handleResults
                  })
                )
              ),
              React.createElement(
                "h6",
                null,
                "Ingreso de n\xF3mina"
              ),
              React.createElement(
                "div",
                { className: "form-group row" },
                React.createElement("em", null),
                React.createElement(
                  "div",
                  { className: "col-md-8" },
                  React.createElement(InputFile, { id: "cargarNomina" })
                )
              ),
              React.createElement(
                "div",
                { className: "panel-actions text-center center" },
                React.createElement(
                  "button",
                  { className: "btn btn-hsbc left ml-2 " },
                  "Cargar"
                ),
                React.createElement(
                  "button",
                  { className: "btn btn btn-light border-dark right ml-2" },
                  "Cancelar"
                )
              )
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {}
    }]);

    return PaySheet;
  }(React.Component);

  return PaySheet;
});