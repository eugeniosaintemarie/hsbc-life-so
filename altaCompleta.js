var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputFile2", "../common/presentadoAnte"], function (React, InputFile2, PresentadoAnte) {
  var AltaCompleta = function (_React$Component) {
    _inherits(AltaCompleta, _React$Component);

    function AltaCompleta(props) {
      _classCallCheck(this, AltaCompleta);

      var _this = _possibleConstructorReturn(this, (AltaCompleta.__proto__ || Object.getPrototypeOf(AltaCompleta)).call(this, props));

      _this._caseValidationResult = function (e) {
        switch (e.VALIDACION) {
          case "OK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check text-success" })
            );
          case "ADD":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check text-success" })
            );
          case "NOEXIST":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0No es un integrante de la nomina vigente"
            );
          case "ERROR":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" })
            );
          case "DOCOK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check mr-1 text-success" }),
              "\xA0DNI registrado con ",
              e.DATOSREGISTRO.MAIL,
              ", ",
              React.createElement("br", null),
              " se enviar\xE1 el mail a dicha casilla de correo y a la ingresada"
            );
          case "NODESIGNA":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0",
              e.MOTIVO
            );
          case "MAILOK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times mr-1 text-danger" }),
              "\xA0No es posible enviar mail a este usuario,",
              React.createElement("br", null),
              " el mail esta registrado con otro DNI"
            );
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
                  { colSpan: "12", className: "main-header" },
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

      return _this;
    }

    _createClass(AltaCompleta, [{
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
            "div",
            { className: "mb-2 mt-2" },
            React.createElement(
              "div",
              { "class": "form-check form-check-inline" },
              React.createElement("input", {
                "class": "form-check-input",
                type: "radio",
                name: "vigencia",
                id: "vigActual",
                onChange: this.props.handleCheckbox,
                checked: this.props.disableCheck ? this.props.disableCheck : this.props.checkVigAct
              }),
              React.createElement(
                "label",
                { "class": "form-check-label", "for": "si" },
                "Vigencia mes en curso"
              )
            ),
            this.props.disableCheck ? "" : React.createElement(
              "div",
              { "class": "form-check form-check-inline ml-4" },
              React.createElement("input", {
                "class": "form-check-input",
                type: "radio",
                name: "vigencia",
                id: "vigAdelantado",
                onChange: this.props.handleCheckbox
              }),
              React.createElement(
                "label",
                { "class": "form-check-label", "for": "si" },
                "Vigencia mes adelantado"
              )
            )
          ),
          React.createElement("br", null),
          this.props.showSuccessMsg ? React.createElement(
            "div",
            null,
            " ",
            React.createElement(
              "p",
              { className: "font-italic font-weight-bold  mt-5" },
              "\xA1El proceso se ha realizado con \xE9xito!"
            ),
            " ",
            React.createElement(
              "p",
              { className: "font-italic font-weight-bold" },
              "Se ha enviado un mail a los nominados solicitando designen a sus beneficiarios."
            ),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "text-center justify-content-md-center mt-3" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn btn-light border-dark right mt-2",
                    onClick: this.props.goToNomina
                  },
                  "Aceptar"
                )
              )
            )
          ) : this.props.showErrorsMsg ? React.createElement(
            "div",
            null,
            " ",
            React.createElement(
              "p",
              { className: "font-italic font-weight-bold  mt-5" },
              "\xA1Ocurri\xF3 un error!"
            ),
            " ",
            React.createElement(
              "p",
              { className: "font-italic font-weight-bold" },
              "No se ha realizado el proceso correctamente."
            ),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "text-center justify-content-md-center mt-3" },
                React.createElement(
                  "button",
                  {
                    className: "btn btn btn-light border-dark right mt-2",
                    onClick: this.props.goToNomina
                  },
                  "Aceptar"
                )
              )
            )
          ) : React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "em",
              null,
              "Seleccion\xE1 el archivo de la nomina para la Constancia de cobertura altas tempranas ingresar"
            ),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                  "div",
                  { className: "custom-file col-md-5" },
                  React.createElement(InputFile2, {
                    onChange: this.props.fileChangedHandler,
                    filename: this.props.filename
                  })
                ),
                React.createElement(
                  "button",
                  {
                    className: "ml-3 btn btn-hsbc mt-2",
                    onClick: this.props._handleButtonProcess
                  },
                  "Procesar"
                )
              )
            ),
            this.props.listExcel.length < 1 ? React.createElement(
              "div",
              null,
              React.createElement(
                "div",
                null,
                React.createElement(
                  "p",
                  { className: "font-italic font-weight-bold" },
                  "Ten\xE9 en cuenta que el archivo debe contener los siguientes campos con el formato detallado:"
                ),
                React.createElement(
                  "p",
                  null,
                  "NOMBRE: no debe tener caracteres especiales como *, -, ?",
                  " ",
                  React.createElement("br", null),
                  "APELLIDO: no debe tener caracteres especiales como *, -, ?",
                  " ",
                  React.createElement("br", null),
                  "CUIL: 11 caracteres sin guiones"
                )
              ),
              React.createElement(
                "div",
                null,
                React.createElement(
                  "p",
                  null,
                  "Aqu\xED puedes observar un ejemplo:"
                ),
                React.createElement(
                  "div",
                  { style: { width: "100%" } },
                  React.createElement("img", { style: { width: "85%" }, src: "../img/altasTempranas/excelExample.png" })
                )
              ),
              React.createElement(
                "button",
                {
                  className: "ml-3 btn btn-hsbc mt-2",
                  onClick: this.props.showAltaCompleta
                },
                "Volver"
              )
            ) :
            // <div className="row justify-content-md-center mt-2">
            this._tableExcel()
            // </div>
            ,
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "justify-content-md-center" },
                this.props.listExcel.length > 0 ? !this.props.validation ? React.createElement(
                  "div",
                  null,
                  React.createElement(PresentadoAnte, { setPresentado: this.props.setPresentado }),
                  React.createElement("br", null),
                  React.createElement(
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
                  )
                ) : "" : ""
              )
            )
          )
        );
      }
    }]);

    return AltaCompleta;
  }(React.Component);

  return AltaCompleta;
});