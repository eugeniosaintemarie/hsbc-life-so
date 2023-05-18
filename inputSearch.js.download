var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../libs/react/js/react-input-mask.min"], function (React, InputMask) {
  var InputSearch = function (_React$PureComponent) {
    _inherits(InputSearch, _React$PureComponent);

    function InputSearch(props) {
      _classCallCheck(this, InputSearch);

      var _this = _possibleConstructorReturn(this, (InputSearch.__proto__ || Object.getPrototypeOf(InputSearch)).call(this, props));

      _this.renderValidated = "";

      _this._setInvalid = function () {
        _this.setState({ isValidate: false });
      };

      _this._handleId = function (descrip) {
        var id = "";
        _this.props.dataList.map(function (item) {
          if (descrip == item.DESCRIPCIONC) {
            id = item.CODIGO;
          }
        });
        return id;
      };

      _this._handleOnClick = function () {
        _this.props.onClick();
        document.getElementById(_this.props.id).focus();
      };

      _this._handleOnChange = function (e) {
        if (!(_this.props.blockPasted && e.nativeEvent.inputType == "insertFromPaste")) {
          if (_this.props.upperCase) {
            _this.value = e.target.value.toString().toUpperCase();
          } else {
            _this.value = e.target.value;
          }
          _this.used = true;
          _this.renderValidated = _this._validation();
          _this.setState({
            value: _this.value,
            used: _this.used,
            isValidate: _this.isValidate
          });
          change = {
            value: _this.value,
            isValidate: _this.isValidate,
            id: _this._handleId(_this.value)
          };
          _this.props.onResult(_this.props.name, change);
        }
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

      _this.isValidate = false;
      _this.value = "";
      _this.used = false;
      return _this;
    }

    _createClass(InputSearch, [{
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

      //devuelve el codigo del item seleccionado de la lista


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
            mask = _props.mask,
            upperCase = _props.upperCase,
            _props$disabled = _props.disabled,
            disabled = _props$disabled === undefined ? false : _props$disabled,
            onClick = _props.onClick,
            dataList = _props.dataList;


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
          "div",
          { className: classNameContainer },
          React.createElement(InputMask, {
            type: "search",
            className: className + " " + (showErrorValidation ? !isValid ? "" : "input-invalid" : ""),
            autoComplete: "off",
            id: id,
            autoFocus: autoFocus ? true : false,
            name: name,
            value: this.value,
            minLength: minLength,
            maxLength: maxLength,
            onChange: this._handleOnChange,
            readOnly: readOnly,
            onKeyPress: onKeyPress,
            mask: mask,
            disabled: this.props.disabled,
            list: "dataListId"
          }),
          React.createElement(
            "datalist",
            { id: "dataListId" },
            dataList.map(function (item, key) {
              return React.createElement(
                "option",
                { key: key, value: item.DESCRIPCIONC },
                item.DESCRIPCIONC
              );
            })
          ),
          React.createElement(
            "span",
            { className: "input-group-append", role: "right-icon" },
            React.createElement(
              "button",
              { className: "btn-outline-secondary act-search", type: "button", onClick: this._handleOnClick },
              React.createElement("i", { className: "fa fa-search" })
            )
          ),
          this.renderValidated
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.onResult(this.props.name, {
          value: this.value,
          isValidate: this.value != "" ? true : false
          // id: "id"
        });
      }
    }]);

    return InputSearch;
  }(React.PureComponent);

  return InputSearch;
});