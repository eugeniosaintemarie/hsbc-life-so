var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./additionPdfColectivo"], function (React, AdditionPdfColectivo) {
  var AdditionRequestColectivo = function (_React$Component) {
    _inherits(AdditionRequestColectivo, _React$Component);

    function AdditionRequestColectivo(props) {
      _classCallCheck(this, AdditionRequestColectivo);

      var _this = _possibleConstructorReturn(this, (AdditionRequestColectivo.__proto__ || Object.getPrototypeOf(AdditionRequestColectivo)).call(this, props));

      _this.state = {
        printButtonLoading: false
      };
      return _this;
    }

    _createClass(AdditionRequestColectivo, [{
      key: "render",
      value: function render() {
        var product = this.props.product;

        switch (product.COD_EST) {
          case 'E':
            if (product.TIP_SOL === "M") {
              return React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "div",
                  { className: "container-fluid" },
                  React.createElement(
                    "div",
                    { className: "col-md-15" },
                    React.createElement(
                      "div",
                      { className: "col-md-15 p-3" },
                      React.createElement(
                        "span",
                        { className: "text-body" },
                        "Hac\xE9 click para modificar tu p\xF3liza."
                      )
                    ),
                    React.createElement(
                      "div",
                      { className: "col-md-8" },
                      React.createElement(
                        "button",
                        {
                          className: "btn btn-danger border-dark right",
                          onClick: this.props.handleShowAdditionFormModify
                        },
                        "Modificar p\xF3liza"
                      )
                    )
                  )
                )
              );
            } else {
              return React.createElement(AdditionPdfColectivo, { product: this.props.product, handleSetRequestNumber: this.props.handleSetRequestNumber });
            }
          case 'D':
            return React.createElement(
              "div",
              { className: "col-md-16" },
              React.createElement(
                "p",
                { className: "font-weight-bold " },
                "La solicitud de adhesi\xF3n a la p\xF3liza ha sido desistida."
              )
            );
          case 'G':
            return React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                  "div",
                  { className: "col-md-15" },
                  React.createElement(
                    "div",
                    { className: "col-md-15 p-3" },
                    React.createElement(
                      "span",
                      { className: "text-body" },
                      product.TIP_SOL === "M" ? "Hacé click para modificar tu póliza." : "Hacé click para completar la solicitud de tu póliza."
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8" },
                    React.createElement(
                      "button",
                      {
                        className: "btn btn-danger border-dark right",
                        onClick: product.TIP_SOL === "M" ? this.props.handleShowAdditionFormModify : this.props.handleShowAdditionManagerColectivo
                      },
                      product.TIP_SOL === "M" ? "Modificar póliza" : "Completar solicitud"
                    )
                  )
                )
              )
            );
        }
      }
    }]);

    return AdditionRequestColectivo;
  }(React.Component);

  return AdditionRequestColectivo;
});