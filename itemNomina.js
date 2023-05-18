var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var ItemNomina = function (_React$Component) {
    _inherits(ItemNomina, _React$Component);

    function ItemNomina(props) {
      _classCallCheck(this, ItemNomina);

      return _possibleConstructorReturn(this, (ItemNomina.__proto__ || Object.getPrototypeOf(ItemNomina)).call(this, props));
    }

    _createClass(ItemNomina, [{
      key: "render",
      value: function render() {

        return React.createElement(
          "tr",
          null,
          !this.props.checkRow && React.createElement(
            "td",
            null,
            React.createElement("input", { type: "checkbox", className: "checklist-table", key: this.props.nomina.key, name: this.props.name, onChange: this.props.checkhandler, checked: this.props.ischecked })
          ),
          React.createElement(
            "td",
            null,
            this.props.nomina.ASNRODOC
          ),
          React.createElement(
            "td",
            null,
            this.props.nomina.ASEGURADOR
          ),
          React.createElement(
            "td",
            null,
            this.props.nomina.CAPIASEG
          ),
          React.createElement(
            "td",
            null,
            this.props.nomina.FECNAC
          )
        );
      }
    }]);

    return ItemNomina;
  }(React.Component);

  return ItemNomina;
});