var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../libs/react/js/react-input-mask.min"], function (React, InputMask) {
  var Search = function (_React$PureComponent) {
    _inherits(Search, _React$PureComponent);

    function Search(props) {
      _classCallCheck(this, Search);

      var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

      _this.renderValidated = "";

      _this._setInvalid = function () {
        _this.setState({ isValidate: false });
      };

      _this._handleId = function (descrip) {
        var foundItem = _this.props.dataList.find(function (item) {
          if (!item.DESCRIPCION) {
            if (descrip == item.DESCRIPCIONC) {
              return item;
            }
          } else if (descrip == item.DESCRIPCION) {
            return item;
          }
        });
        return foundItem ? foundItem.CODIGO : "";
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
            isValidate: _this.isValidate,
            showValidate: false
          });
          change = {
            value: _this.value,
            isValidate: _this.isValidate,
            id: _this._handleId(_this.value),
            required: _this.props.required ? true : false
          };
          _this.props.onResult(_this.props.name, change);

          if (_this.props.defaultID && _this.props.defaultID != "" && _this.fistChange) {
            _this.fistChange = false;
            _this.props.onResult(_this.props.name, {
              value: "",
              isValidate: false,
              id: "",
              required: _this.props.required ? true : false
            });
            _this.props.clearList();
          } else {
            if (e.target.value.length >= 4 && !_this.callWS) {
              _this.callWS = true;
              _this.props.handleSeviceList("", e.target.value);
              document.getElementById(_this.props.id).focus();
            } else {
              if (e.target.value.length < 4) {
                _this.callWS = false;
                _this.props.clearList();
              }
            }
          }
        }
      };

      _this._onFocus = function (e) {
        _this.setState({
          showValidate: e
        });
      };

      _this._findNameDefault = function (value) {
        if (_this.value != "" && _this.value != _this.props.defaultID) {
          //ver si arregla el fix de ocupacion
          _this.handleSave();
        }
        var _this$props = _this.props,
            _this$props$idObject = _this$props.idObject,
            idObject = _this$props$idObject === undefined ? "id" : _this$props$idObject,
            _this$props$nameObjec = _this$props.nameObject,
            nameObject = _this$props$nameObjec === undefined ? "name" : _this$props$nameObjec;

        if (_this.props.dataList.length > 0) {
          var aux = _this.props.dataList.find(function (obj) {
            return obj[idObject].toString().toUpperCase() == value.toString().toUpperCase();
          });
          return !aux ? "" : aux[nameObject];
        }
        return value;
      };

      _this.handleSave = function () {
        _this.props.onResult(_this.props.name, {
          value: _this.value,
          isValidate: true,
          id: _this._handleId(_this.value),
          required: _this.props.required ? true : false
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
      _this.callWS = false;

      _this.fistChange = true;
      return _this;
    }

    _createClass(Search, [{
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
        var _this2 = this;

        var _props = this.props,
            className = _props.className,
            id = _props.id,
            name = _props.name,
            _props$value = _props.value,
            value = _props$value === undefined ? "" : _props$value,
            minLength = _props.minLength,
            maxLength = _props.maxLength,
            autoFocus = _props.autoFocus,
            readOnly = _props.readOnly,
            _props$classNameConta = _props.classNameContainer,
            classNameContainer = _props$classNameConta === undefined ? "" : _props$classNameConta,
            onKeyPress = _props.onKeyPress,
            mask = _props.mask,
            upperCase = _props.upperCase,
            defaultID = _props.defaultID,
            _props$disabled = _props.disabled,
            disabled = _props$disabled === undefined ? false : _props$disabled,
            dataList = _props.dataList,
            idObject = _props.idObject;


        if (value !== "") {
          if (upperCase) {
            this.value = value.toString().toUpperCase();
          } else {
            this.value = value;
          }
        } else {
          this.value = this._findNameDefault(defaultID);
        }

        var isValid = this.state.used && !this.state.isValidate;
        //sé modifico para agregar input-invalid css class y autoFocus cuando se requiera con el automcplete off


        return React.createElement(
          "div",
          { className: classNameContainer },
          React.createElement(InputMask, {
            type: "search",
            className: className + " " + (!this.state.showValidate ? "" : "input-invalid"),
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
                {
                  key: key,
                  value: _this2.props.nameObject ? item[_this2.props.nameObject] : item.DESCRIPCION
                },
                _this2.props.nameObject ? item[_this2.props.nameObject] : item.DESCRIPCION
              );
            })
          ),
          this.renderValidated
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.defaultID) {
          this.props.handleSeviceList(this.props.defaultID, "");
        }
      }
    }]);

    return Search;
  }(React.PureComponent);

  return Search;
});