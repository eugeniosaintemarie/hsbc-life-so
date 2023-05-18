var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var InputFileAddition = function (_React$Component) {
    _inherits(InputFileAddition, _React$Component);

    function InputFileAddition(props) {
      _classCallCheck(this, InputFileAddition);

      var _this = _possibleConstructorReturn(this, (InputFileAddition.__proto__ || Object.getPrototypeOf(InputFileAddition)).call(this, props));

      _this._handleOnChange = function (e) {
        var self = _this;
        var reader = new FileReader();
        var imageData = "";
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function () {
          imageData = reader.result;
          self.props.onResult(self.props.id, {
            data: imageData,
            value: self.props.fileName,
            required: self.props.required ? true : false
          });
        };
        _this.props.onChange(e);
        $("#label").removeClass("input-invalid");
      };

      _this._handleOnClick = function () {
        document.getElementById(_this.props.id).click();
      };

      _this._onFocus = function (e) {
        $("#label").addClass("input-invalid");
      };

      return _this;
    }

    _createClass(InputFileAddition, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            fileName = _props.fileName,
            id = _props.id,
            disabled = _props.disabled;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement("input", {
            type: "file",
            className: "d-none",
            id: id,
            onChange: this._handleOnChange,
            disabled: disabled
          }),
          React.createElement(
            "label",
            { className: "file-name-input-file", id: "label", htmlFor: id },
            fileName
          ),
          React.createElement(
            "span",
            { className: "input-group-append", role: "right-icon" },
            React.createElement(
              "button",
              {
                className: "btn-outline-secondary act-search",
                type: "button",
                onClick: this._handleOnClick,
                disabled: disabled
              },
              React.createElement("i", { className: "fa fa-search" })
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.disabled) {
          document.getElementById("label").setAttribute("style", "background-color: #e9ecef;");
        }
        this.props.onResult(this.props.id, {
          value: !this.props.fileName ? "" : this.props.fileName,
          required: this.props.required ? true : false
        });
      }
    }]);

    return InputFileAddition;
  }(React.Component);

  return InputFileAddition;
});