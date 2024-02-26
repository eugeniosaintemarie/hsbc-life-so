var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/buttonLoading", "../lib/utils"], function (React, ButtonLoading, Utils) {
  var ConsultaNovedades = function (_React$Component) {
    _inherits(ConsultaNovedades, _React$Component);

    function ConsultaNovedades(props) {
      _classCallCheck(this, ConsultaNovedades);

      var _this = _possibleConstructorReturn(this, (ConsultaNovedades.__proto__ || Object.getPrototypeOf(ConsultaNovedades)).call(this, props));

      _this.handleDownloadExcel = function () {
        var tabla = document.getElementById("tabla");

        var tableExport = new TableExport(tabla, {
          exportButtons: false,
          filename: "NovedadesNom-" + _this.state.nroPoliza,
          sheetname: "Novedades"
        });

        var datos = tableExport.getExportData();
        var preferenciasDocumento = datos.tabla.xlsx;

        tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);
      };

      _this.state = {
        altaTempranaLoading: false,
        list: [],
        nroPoliza: ""
      };
      return _this;
    }

    _createClass(ConsultaNovedades, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Consulta las novedades"
          ),
          React.createElement(
            "p",
            null,
            React.createElement(
              "strong",
              null,
              "Haciendo clic"
            ),
            " en el bot\xF3n ",
            React.createElement(
              "strong",
              null,
              "Descargar reporte"
            ),
            " podr\xE1s descargar un archivo .xls con la informaci\xF3n de todas las novedades de tu p\xF3liza ."
          ),
          React.createElement(
            "div",
            { className: "pb-4" },
            React.createElement(
              ButtonLoading,
              {
                className: "ml-1 btn btn-hsbc right",
                onClick: this.handleDownloadExcel
              },
              "Descargar reporte"
            )
          ),
          React.createElement(
            "div",
            { className: "col-md-12 remove-left-padding" },
            React.createElement(
              "h5",
              null,
              "Novedades de n\xF3mina"
            ),
            this.props.listNovedades ? React.createElement(
              "table",
              { className: "table table-sm table-bordered", id: "tabla" },
              React.createElement(
                "thead",
                null,
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    null,
                    "Tipo de documento"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "N\xFAmero de documento"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Apellido y nombre"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Grupo"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Fecha"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Novedad"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Motivo"
                  )
                )
              ),
              React.createElement(
                "tbody",
                null,
                this.props.listNovedades.map(function (novedad, i) {
                  return React.createElement(
                    "tr",
                    { key: i },
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      novedad.DOCUMDAB
                    ),
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      novedad.DOCUMDAT
                    ),
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      novedad.CLIENAP1 + " " + novedad.CLIENNOM
                    ),
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      novedad.GRUPODES
                    ),
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      Utils.formatFechaString(novedad.GRABAFEC)
                    ),
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      novedad.GRUPOERR
                    ),
                    React.createElement(
                      "td",
                      { style: { "vertical-align": "middle" } },
                      novedad.CODDESCR
                    )
                  );
                })
              )
            ) : ""
          ),
          React.createElement(
            "div",
            { className: "text-center center" },
            React.createElement(
              "button",
              {
                className: "btn btn btn-light border-dark right",
                onClick: this.props.goToNomina },
              "Volver"
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var poliza = this.props.nroPoliza;
        poliza = poliza.replace("/", "");
        poliza = poliza.replace(/ /g, "-");

        this.setState({
          nroPoliza: poliza
        });
      }
    }]);

    return ConsultaNovedades;
  }(React.Component);

  return ConsultaNovedades;
});