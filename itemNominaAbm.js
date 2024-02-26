var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../lib/utils"], function (React, Utils) {
  var ItemNominaAbm = function (_React$Component) {
    _inherits(ItemNominaAbm, _React$Component);

    function ItemNominaAbm(props) {
      _classCallCheck(this, ItemNominaAbm);

      var _this = _possibleConstructorReturn(this, (ItemNominaAbm.__proto__ || Object.getPrototypeOf(ItemNominaAbm)).call(this, props));

      _this._caseValidationResult = function (e) {
        switch (e.VALIDACION) {
          case "OK":
          case "ADD":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-check text-success" })
            );
          case "ERROR":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" })
            );
          case "D-ERROR":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times text-danger" }),
              "\xA0 El mail se encuentra duplicado en la n\xF3mina"
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
          case "MAILOK":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times mr-1 text-danger" }),
              "\xA0No es posible enviar mail a este usuario,",
              React.createElement("br", null),
              " el mail esta registrado con otro DNI"
            );
          case "NOMAIL":
            return React.createElement(
              "td",
              null,
              React.createElement("i", { className: "fas fa-times mr-1 text-danger" }),
              "\xA0No se ha ingresado un mail"
            );
        }
      };

      return _this;
    }

    _createClass(ItemNominaAbm, [{
      key: "render",
      value: function render() {
        var item = this.props.nomina;

        return React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            null,
            React.createElement("input", { type: "checkbox", className: "checklist-table", key: this.props.nomina.key, name: this.props.name, onChange: this.props.checkhandler, checked: this.props.ischecked })
          ),
          React.createElement(
            "td",
            null,
            this.props.getTipoDoc(item.DOCUMTIP)
          ),
          React.createElement(
            "td",
            null,
            item.DOCUMDAT
          ),
          React.createElement(
            "td",
            null,
            item.CLIENOM
          ),
          React.createElement(
            "td",
            null,
            item.CLIENAP1
          ),
          React.createElement(
            "td",
            null,
            Utils.formatFechaString(item.FECNAC.toString())
          ),
          this.props.isValid("Fecha de Ingreso") && React.createElement(
            "td",
            null,
            Utils.formatFechaString(item.FECING.toString())
          ),
          this.props.isValid("Sueldo") && React.createElement(
            "td",
            null,
            item.SUELDO
          ),
          this.props.isValid("Saldo Deuda") && React.createElement(
            "td",
            null,
            item.SUELDO
          ),
          this.props.isValid("Suma Asegurada") && React.createElement(
            "td",
            null,
            item.COBERTURAS.COBERTURA[0].SUMAASEG
          ),
          this.props.desigBenefEnabled ? this._caseValidationResult(item) : React.createElement(
            "td",
            null,
            React.createElement("i", { className: "fas fa-check text-success" })
          )
        );
      }
    }]);

    return ItemNominaAbm;
  }(React.Component);

  return ItemNominaAbm;
});