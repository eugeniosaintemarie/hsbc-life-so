var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-bootstrap"], function (React) {
  var Accordion = require("react-bootstrap").Accordion;
  var Card = require("react-bootstrap").Card;
  var Button = require("react-bootstrap").Button;

  var SiniestroModal2 = function (_React$Component) {
    _inherits(SiniestroModal2, _React$Component);

    function SiniestroModal2() {
      _classCallCheck(this, SiniestroModal2);

      return _possibleConstructorReturn(this, (SiniestroModal2.__proto__ || Object.getPrototypeOf(SiniestroModal2)).apply(this, arguments));
    }

    _createClass(SiniestroModal2, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "p",
            { className: "text-justify" },
            "En caso de sufrir un siniestro pod\xE9s iniciar tu denuncia ingresando a ",
            React.createElement(
              "a",
              { href: "https://www.segurosonline.hsbc.com.ar/siniestros-gateway/app/pages/siniestros.html", "class": "advertencia", target: "_blank" },
              "E-claims"
            )
          )
        );
      }
    }]);

    return SiniestroModal2;
  }(React.Component);

  return SiniestroModal2;
});