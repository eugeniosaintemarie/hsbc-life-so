var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var InputFile2 = function (_React$Component) {
    _inherits(InputFile2, _React$Component);

    function InputFile2(props) {
      _classCallCheck(this, InputFile2);

      var _this = _possibleConstructorReturn(this, (InputFile2.__proto__ || Object.getPrototypeOf(InputFile2)).call(this, props));

      _this._handleOnChange = function (e) {
        _this.setState({
          filename: e.target.files[0].name
        });
      };

      _this.state = {
        filename: ""
      };
      return _this;
    }

    _createClass(InputFile2, [{
      key: "render",
      value: function render() {
        var filename = this.state.filename;


        return React.createElement(
          React.Fragment,
          null,
          React.createElement("input", {
            type: "file",
            className: "custom-file-input",
            id: "InputFile",
            onChange: this.props.onChange
          }),
          React.createElement(
            "label",
            { className: "custom-file-label", htmlFor: "InputFile" },
            this.props.filename
          )
        );
      }
    }]);

    return InputFile2;
  }(React.Component);

  return InputFile2;
});