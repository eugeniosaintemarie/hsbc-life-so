var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./additionPdfColectivo"], function (React, AdditionPdfColectivo) {
  var ProcessOKVD = function (_React$Component) {
    _inherits(ProcessOKVD, _React$Component);

    function ProcessOKVD(props) {
      _classCallCheck(this, ProcessOKVD);

      var _this = _possibleConstructorReturn(this, (ProcessOKVD.__proto__ || Object.getPrototypeOf(ProcessOKVD)).call(this, props));

      _this.state = {
        showComponent: false
      };
      _this._handleShowAdditionPdf = _this._handleShowAdditionPdf.bind(_this);
      return _this;
    }

    _createClass(ProcessOKVD, [{
      key: "_handleShowAdditionPdf",
      value: function _handleShowAdditionPdf() {
        this.setState({
          showComponent: true
        });
      }
    }, {
      key: "render",
      value: function render() {
        var product = this.props.product;


        if (this.state.showComponent) return React.createElement(AdditionPdfColectivo, { product: product, handleSetRequestNumber: this.props.handleSetRequestNumber });else {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "mt-3 mb-3" },
              React.createElement(
                "h2",
                { className: "subtitle-inside mb-5" },
                product.TIP_PRO === "AP" ? "Solicitud de Accidentes Personales" : product.TIP_PRO === "SE" && product.TPR_DA1 === "R" ? "Solicitud de Sepelio (Reintegro de Gastos)" : product.TIP_PRO === "SE" && product.TPR_DA1 === "P" ? "Solicitud de Sepelio (Prestación de Servicios)" : product.TIP_PRO === "MS" || product.TIP_PRO === "EC" || product.TIP_PRO === "CU" ? "Solicitud de Vida Colectivo" : product.TIP_PRO === "SE" ? "Solicitud de Sepelio" : "Solicitud de Vida Colectivo"
              ),
              React.createElement(
                "h6",
                { className: "mb-2 font-italic processOkTitle" },
                this.props.itsSave ? "¡Su solicitud se guardo con éxito!" : "¡Su solicitud se recibió con éxito!"
              ),
              React.createElement(
                "h6",
                { className: "mb-0 font-italic " },
                this.props.itsSave ? "" : "La misma esta siendo procesada."
              )
            ),
            React.createElement(
              "div",
              { className: "text-center mt-4" },
              React.createElement(
                "button",
                {
                  className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this.props.itsSave ? this.props.handleShowAdditionRequestColectivo : this._handleShowAdditionPdf
                },
                "Aceptar"
              )
            )
          );
        }
      }
    }]);

    return ProcessOKVD;
  }(React.Component);

  return ProcessOKVD;
});