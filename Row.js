var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../../lib/utils"], function (React, Utils) {
  var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row(props) {
      _classCallCheck(this, Row);

      return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));
    }

    _createClass(Row, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            id = _props.id,
            benef = _props.benef,
            checked = _props.checked,
            onChange = _props.onChange,
            value = _props.value;


        return React.createElement(
          "tr",
          null,
          React.createElement(
            "td",
            { className: "text-center" },
            React.createElement("input", {
              id: id,
              type: "checkbox",
              checked: checked,
              onChange: onChange,
              value: value
            })
          ),
          React.createElement(
            "td",
            null,
            benef.NOMINAS.BENNOMBRE + " " + benef.NOMINAS.APEBENE,
            " "
          ),
          React.createElement(
            "td",
            null,
            Utils.formatFechaString(benef.NOMINAS.FNACIMIE)
          ),
          React.createElement(
            "td",
            null,
            this.props.listTipoDoc(benef.NOMINAS.TIPDOCBENE) + " " + benef.NOMINAS.NUMDOCBENE
          ),
          React.createElement(
            "td",
            null,
            this.props.listParentesco(benef.NOMINAS.RELBECOD)
          )
        );
      }
    }]);

    return Row;
  }(React.Component);

  return Row;
});