var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-bootstrap"], function (React, ReactBootstrap) {
  var NumericInput = function (_React$PureComponent) {
    _inherits(NumericInput, _React$PureComponent);

    function NumericInput(props) {
      _classCallCheck(this, NumericInput);

      var _this = _possibleConstructorReturn(this, (NumericInput.__proto__ || Object.getPrototypeOf(NumericInput)).call(this, props));

      _this.state = {
        value: 0,
        pass: false,
        used: false,
        isValidate: false
      };
      _this.isValidate = false;
      _this.value = "";
      _this.used = false;

      return _this;
    }

    _createClass(NumericInput, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            className = _props.className,
            id = _props.id,
            name = _props.name,
            min = _props.min,
            max = _props.max,
            classNameDiv = _props.classNameDiv,
            onClickEvent = _props.onClickEvent,
            valueProps = _props.valueProps,
            passProps = _props.passProps;


        this.setState({
          value: valueProps
        });

        var isValid = this.state.used && !this.state.isValidate;
        return React.createElement(
          "div",
          { "class": "d-flex align-items-end" },
          React.createElement(
            "div",
            { className: "col-xs-2" },
            React.createElement("input", {
              "class": "form-control",
              type: "text",
              className: className,
              id: id,
              name: name,
              disabled: "true",
              value: valueProps,
              pass: passProps
            })
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "btn-group btn-group-sm" },
              React.createElement(
                "button",
                { id: id + "-", name: name + "-", type: "button", className: "btn btn-danger", value: "-",
                  onClick: function onClick(e) {
                    e.preventDefault();

                    if (valueProps - 1 >= Number(min)) {
                      onClickEvent(e);
                    }
                  } },
                "-"
              ),
              React.createElement(
                "button",
                { id: id + "+", name: name + "+", type: "button", className: "btn btn-danger", value: "+",
                  onClick: function onClick(e) {
                    e.preventDefault();
                    if (valueProps + 1 <= Number(max)) {
                      onClickEvent(e);
                    } else if (passProps) {
                      onClickEvent(e);
                    }
                  } },
                "+"
              )
            )
          )
        );
      }
    }]);

    return NumericInput;
  }(React.PureComponent);

  return NumericInput;
});