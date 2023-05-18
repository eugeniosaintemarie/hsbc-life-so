var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-bootstrap", "../components/adhecionVidaColectivo/individualCollection"], function (React, ReactBootstrap, IndividualCollection) {
  var FormaPago = function (_React$PureComponent) {
    _inherits(FormaPago, _React$PureComponent);

    function FormaPago() {
      _classCallCheck(this, FormaPago);

      return _possibleConstructorReturn(this, (FormaPago.__proto__ || Object.getPrototypeOf(FormaPago)).apply(this, arguments));
    }

    _createClass(FormaPago, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            refProps = _props.refProps,
            _handleResults = _props._handleResults,
            validationBrand = _props.validationBrand;


        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h5",
            { className: "mb-2 mt-2" },
            "Forma de pago"
          ),
          React.createElement(IndividualCollection, {
            formInfo: refProps.formInfo,
            listTipoYear: refProps.listTipoYear,
            onResults: _handleResults,
            validationBrand: validationBrand,
            paymentType: refProps.paymentType,
            brand: refProps.brand,
            readOnly: refProps.readOnly
          })
        );
      }
    }]);

    return FormaPago;
  }(React.PureComponent);

  return FormaPago;
});