var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../libs/react/js/react-input-mask.min", "../common/myVirtualKeyboard"], function (React, InputMask, VirtualKeyboard) {
  var InputValidationImage = function (_React$PureComponent) {
    _inherits(InputValidationImage, _React$PureComponent);

    function InputValidationImage(props) {
      _classCallCheck(this, InputValidationImage);

      var _this = _possibleConstructorReturn(this, (InputValidationImage.__proto__ || Object.getPrototypeOf(InputValidationImage)).call(this, props));

      _this.renderValidated = "";

      _this._setInvalid = function () {
        _this.setState({ isValidate: false });
      };

      _this._handleOnChange = function (e) {
        if (e == undefined) {
          return;
        }
        if (!(_this.props.blockPasted && e.nativeEvent.inputType == "insertFromPaste")) {
          if (_this.props.upperCase) {
            _this.value = e.target.value.toString().toUpperCase();
          } else {
            _this.value = e.target.value;
          }

          if (_this.props.notNecessary) {
            _this.used = false;
          } else {
            _this.used = true;
          }

          _this.renderValidated = _this._validation();

          _this.setState({
            value: _this.value,
            used: _this.used,
            isValidate: _this.isValidate
          });

          if (_this.props.fomatText != "") {
            //Validacion para proyecto retiro colectivo
            change = {
              value: _this.value,
              isValidate: _this.isValidate,
              formatText: _this.props.formatText,
              required: _this.props.required ? true : false
            };
          } else {
            change = {
              value: _this.value,
              isValidate: _this.isValidate
            };
          }

          _this.props.onResult(_this.props.name, change);
        }
      };

      _this._onFocus = function (e) {
        _this.used = true;
        /**se modifica para poder hacer la validacion y que resalte el campo cuil de conyuge */
        if (_this.props.id == "applicantCUILConyuge") {
          _this._validation("conyuge");
        }

        _this.setState({
          value: _this.value,
          used: _this.used,
          isValidate: _this.isValidate
        });
      };

      _this.state = {
        value: "",
        used: false,
        isValidate: false,
        viewKeyboard: _this.props.viewKeyboard
      };

      _this.isValidate = false;
      _this.value = "";
      _this.used = false;
      return _this;
    }

    _createClass(InputValidationImage, [{
      key: "_validation",
      value: function _validation(flag) {
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
              className: this.props.classNameAd,
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
          /**estas lineas se crean para la historia 538, segun validacion de servicio remarcar el campo cuil */
          if (this.props.id == "applicantCUILConyuge" && this.value !== "" && flag == "conyuge") {
            validation = true;
          }

          if (validation) {
            this.isValidate = false;
            return React.createElement(
              "div",
              { className: "alert alert-danger positionController" },
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
            minLength = _props.minLength,
            maxLength = _props.maxLength,
            type = _props.type,
            autoFocus = _props.autoFocus,
            readOnly = _props.readOnly,
            classNameContainer = _props.classNameContainer,
            _props$showErrorValid = _props.showErrorValidation,
            showErrorValidation = _props$showErrorValid === undefined ? true : _props$showErrorValid,
            onKeyPress = _props.onKeyPress,
            onKeyDown = _props.onKeyDown,
            inputMode = _props.inputMode,
            placeholder = _props.placeholder,
            mask = _props.mask,
            upperCase = _props.upperCase,
            _props$disabled = _props.disabled,
            disabled = _props$disabled === undefined ? false : _props$disabled,
            src = _props.src,
            alt = _props.alt,
            onMemory = _props.onMemory;


        if (value != null) {
          if (upperCase) {
            this.value = value.toString().toUpperCase();
          } else {
            this.value = value;
          }
        }

        var isValid = this.state.used && !this.state.isValidate;
        //sé modifico para agregar input-invalid css class y autoFocus cuando se requiera con el automcplete off

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: className },
            React.createElement(InputMask, {
              type: type ? type : "text",
              autoComplete: "off",
              className: "hsbc-input-test",
              id: id,
              autoFocus: autoFocus ? true : false,
              name: name,
              value: this.value,
              minLength: minLength,
              maxLength: maxLength,
              onChange: this._handleOnChange,
              onMemory: this.props.onMemory,
              readOnly: readOnly,
              onKeyPress: onKeyPress,
              onKeyDown: onKeyDown,
              inputMode: inputMode,
              placeholder: placeholder,
              mask: mask,
              disabled: disabled
            }),
            this.state.viewKeyboard && React.createElement(VirtualKeyboard, { onResult: this._handleOnChange }),
            React.createElement("img", { src: src, className: "hsbc-input-icon", alt: alt, onClick: this.props.onClick })
          ),
          this.renderValidated
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.onResult(this.props.name, {
          value: this.value,
          isValidate: this.value != "" ? true : false,
          required: this.props.required ? true : false
        });
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        if (props.viewKeyboard != state.viewKeyboard) {
          return { viewKeyboard: props.viewKeyboard };
        }
        return null;
      }
    }]);

    return InputValidationImage;
  }(React.PureComponent);

  return InputValidationImage;
});