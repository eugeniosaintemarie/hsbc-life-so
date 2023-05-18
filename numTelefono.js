var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-bootstrap", "./inputvalidation"], function (React, ReactBootstrap, InputValidation) {
  var NumTelefono = function (_React$PureComponent) {
    _inherits(NumTelefono, _React$PureComponent);

    function NumTelefono(props) {
      _classCallCheck(this, NumTelefono);

      var _this = _possibleConstructorReturn(this, (NumTelefono.__proto__ || Object.getPrototypeOf(NumTelefono)).call(this, props));

      _this.state = {
        value: 0
      };

      return _this;
    }

    _createClass(NumTelefono, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            className = _props.className,
            classNameDiv = _props.classNameDiv,
            valueArea = _props.valueArea,
            valueTel = _props.valueTel,
            refArea = _props.refArea,
            refTelefono = _props.refTelefono,
            onResult = _props.onResult,
            readOnly = _props.readOnly,
            idProps = _props.idProps,
            size = _props.size,
            label = _props.label;


        return React.createElement(
          "div",
          { className: "form-group text-center col-" + size },
          React.createElement(
            "label",
            {
              className: "font-size-ddben-beneficiary"
            },
            label
          ),
          React.createElement(
            "div",
            { className: "form-row mt- col-xs-4" },
            React.createElement(
              "div",
              { className: "col-4" },
              React.createElement(InputValidation, {
                ref: refArea,
                classNameAd: "hide",
                id: idProps + "AreaTel",
                name: idProps + "AreaTel",
                minLength: "1",
                maxLength: "6",
                value: valueArea,
                className: "input-background-color form-control input-size",
                formatText: "Codigo de Area Solicitante: La longitud tiene que ser mayor a 1.",
                onResult: onResult,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "col-8" },
              React.createElement(InputValidation, {

                ref: refTelefono,
                classNameAd: "hide",
                id: idProps + "Telephone",
                name: idProps + "Telephone",
                minLength: "6",
                maxLength: "12",
                value: valueTel,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Tel\xE9fono Solicitante: La longitud tiene que ser mayor a 6.",
                onResult: onResult,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly,
                required: true
              })
            )
          )
        );
      }
    }]);

    return NumTelefono;
  }(React.PureComponent);

  return NumTelefono;
});