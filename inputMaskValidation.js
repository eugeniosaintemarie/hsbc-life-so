var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../libs/react/js/react-input-mask.min"], function (React, InputMask) {
  var InputMaskValidation = function (_React$PureComponent) {
    _inherits(InputMaskValidation, _React$PureComponent);

    function InputMaskValidation(props) {
      _classCallCheck(this, InputMaskValidation);

      var _this = _possibleConstructorReturn(this, (InputMaskValidation.__proto__ || Object.getPrototypeOf(InputMaskValidation)).call(this, props));

      _this.isValidate = false;
      _this.value = "";
      _this.used = false;
      _this.renderValidated = "";

      _this._handleOnChange = function (e) {
        _this.value = e.target.value;
        _this.used = true;
        _this.renderValidated = _this._validation();
        _this.setState({
          value: _this.value,
          used: _this.used,
          isValidate: _this.isValidate
        });
        change = {
          value: _this.value,
          isValidate: _this.isValidate
        };
        _this.props.onResult(_this.props.name, change);
      };

      _this._onFocus = function (e) {
        _this.used = true;
        _this.setState({
          value: _this.value,
          used: _this.used,
          isValidate: _this.isValidate
        });
      };

      _this.state = {
        value: "",
        used: false,
        isValidate: false
      };
      return _this;
    }

    _createClass(InputMaskValidation, [{
      key: "_validation",
      value: function _validation() {
        if (this.used === true) {
          validation = "";
          var required = React.createElement(
            "div",
            { key: 1 },
            this.props.requiredStr
          );
          var characters = React.createElement(
            "div",
            {
              key: 2
            },
            "La longitud m\xEDnima es de " + this.props.minLength + " caracteres."
          );
          var invalid = null;
          var regExp = null;

          if (this.props.pattern) {
            regExp = new RegExp(this.props.pattern, "g");
            invalid = React.createElement(
              "div",
              { key: 3 },
              this.props.invalidStr
            );
          }
          //sé modifico para mostrar un error a la vez en pantalla
          if (!this.value) {
            validation = [required];
          } else if (this.value !== "" && (this.value.length < parseInt(this.props.minLength) || this.value.length > parseInt(this.props.maxLength))) {
            validation = characters;
          } else if (regExp != null && !regExp.test(this.value)) {
            validation = invalid;
          }

          if (validation) {
            this.isValidate = false;
            return React.createElement(
              "div",
              { className: "alert alert-danger" },
              validation
            );
          }

          this.isValidate = true;
        }
      }

      // Actualiza el status del componentes y de su padre

    }, {
      key: "render",
      value: function render() {
        var _props = this.props,
            className = _props.className,
            id = _props.id,
            name = _props.name,
            value = _props.value,
            type = _props.type,
            autoFocus = _props.autoFocus,
            mask = _props.mask,
            alwaysShowMask = _props.alwaysShowMask;


        var isValid = this.state.used && !this.state.isValidate;
        //sé modifico para agregar input-invalid css class y autoFocus cuando se requiera con el automcplete off
        return React.createElement(
          "div",
          null,
          React.createElement(InputMask, {
            type: type ? type : "text",
            className: className + " " + (!isValid ? "" : "input-invalid"),
            autoComplete: "off",
            id: id,
            autoFocus: autoFocus ? true : false,
            name: name,
            value: value,
            onChange: this._handleOnChange,
            mask: mask,
            alwaysShowMask: alwaysShowMask
          }),
          this.renderValidated
        );
      }
    }]);

    return InputMaskValidation;
  }(React.PureComponent);

  return InputMaskValidation;
});