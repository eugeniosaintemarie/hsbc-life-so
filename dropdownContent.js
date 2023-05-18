var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-dom"], function (React, ReactDOM) {
  var DropDownContent = function (_React$Component) {
    _inherits(DropDownContent, _React$Component);

    function DropDownContent(props) {
      _classCallCheck(this, DropDownContent);

      var _this = _possibleConstructorReturn(this, (DropDownContent.__proto__ || Object.getPrototypeOf(DropDownContent)).call(this, props));

      _this.values = {};

      _this.handleClick = function (e) {
        if (e.currentTarget.id == "applicantPayment") {
          var result = {
            id: e.target.lastChild.value,
            value: e.target.lastChild.textContent,
            required: _this.props.required ? true : false
          };
          _this.props.onResult(_this.props.name, result);
        }
        if (e.currentTarget.id == "applicantGender") {
          var result = {
            id: e.target.value,
            value: e.target.selectedOptions[0].textContent,
            required: _this.props.required ? true : false
          };
          _this.props.onResult(_this.props.name, result);
        }if (e.currentTarget.id == "applicantCivilStatus") {
          var result = {
            id: e.target.value,
            value: e.target.selectedOptions[0].textContent,
            required: _this.props.required ? true : false
          };
          _this.props.onResult(_this.props.name, result);
        }
      };

      _this._handleOnChange = function (e) {
        //validacion realizada unicamente para los prefijos telefonicos (retiro colectivo) y devolver los 3 valores prefijo,codigo y descripcion
        if (_this.props.prefix) {
          var result = {
            id: e.target.value,
            code: _this._findCodeDefault(e.target.value),
            value: _this.values[e.target.value],
            required: _this.props.required ? true : false
          };
        } else {
          var result = {
            id: e.target.value,
            value: _this.values[e.target.value],
            required: _this.props.required ? true : false
          };
        }
        _this.defaultValue = e.target.value;
        _this.setState({
          showValidate: false
        });
        _this.props.onResult(_this.props.name, result);
      };

      _this._onFocus = function (e) {
        _this.setState({
          showValidate: e
        });
      };

      _this._findValueDefault = function (value) {

        if (_this.props.typeValue == "value") {
          if (value == "") {
            return undefined;
          }
          return _this._findIdDefault(value);
        } else {
          if (value == "") {
            return undefined;
          } else if (isNaN(value)) {
            return value;
          } else {
            return parseInt(value);
          }
        }
      };

      _this._findNameDefault = function (id) {
        var _this$props = _this.props,
            _this$props$idObject = _this$props.idObject,
            idObject = _this$props$idObject === undefined ? "id" : _this$props$idObject,
            _this$props$nameObjec = _this$props.nameObject,
            nameObject = _this$props$nameObjec === undefined ? "name" : _this$props$nameObjec;

        if (_this.props.list.length > 0) {
          if (!isNaN(id)) {
            var aux = _this.props.list.find(function (obj) {
              return parseInt(obj[idObject]) == parseInt(id);
            });
            return !aux ? "" : aux[nameObject];
          } else {
            var _aux = _this.props.list.find(function (obj) {
              return obj[idObject].toString().toUpperCase() == id.toString().toUpperCase();
            });
            return !_aux ? "" : _aux[nameObject];
          }
        }
        return id;
      };

      _this._findIdDefault = function (value) {
        var _this$props2 = _this.props,
            _this$props2$idObject = _this$props2.idObject,
            idObject = _this$props2$idObject === undefined ? "id" : _this$props2$idObject,
            _this$props2$nameObje = _this$props2.nameObject,
            nameObject = _this$props2$nameObje === undefined ? "name" : _this$props2$nameObje;

        if (_this.props.list.length > 0) {
          var aux = _this.props.list.find(function (obj) {
            return obj[nameObject].toString().toUpperCase() == value.toString().toUpperCase();
          });
          return !aux ? "" : aux[idObject];
        }
        return value;
      };

      _this._findCodeDefault = function (prefix) {
        var _this$props3 = _this.props,
            idObject = _this$props3.idObject,
            list = _this$props3.list;

        if (list.length > 0) {
          var aux = list.find(function (obj) {
            return obj[idObject].toString().toUpperCase() == prefix.toString().toUpperCase();
          });
          if (aux) {
            return aux["COD_TAR"] ? aux["COD_TAR"] : aux["CODIGO"] ? aux["CODIGO"] : "";
          }
        }
        return prefix;
      };

      _this.state = {
        showValidate: false
      };
      return _this;
    }

    _createClass(DropDownContent, [{
      key: "_renderCurrencies",
      value: function _renderCurrencies() {
        var _this2 = this;

        var _props = this.props,
            _props$idObject = _props.idObject,
            idObject = _props$idObject === undefined ? "id" : _props$idObject,
            _props$nameObject = _props.nameObject,
            nameObject = _props$nameObject === undefined ? "name" : _props$nameObject;


        return Object.keys(this.props.list).map(function (currency) {
          var value = void 0;
          if (isNaN(_this2.props.list[currency][idObject])) {
            value = _this2.props.list[currency][idObject];
          } else {
            value = parseInt(_this2.props.list[currency][idObject]);
          }

          _this2.values[value] = _this2.props.list[currency][nameObject];

          if (_this2.props.defaultByLabel === _this2.props.list[currency][nameObject] && !_this2.defaultValue) {
            _this2.defaultValue = value;
          }
          return React.createElement(
            "option",
            { value: value, key: currency },
            _this2.props.list[currency][nameObject]
          );
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            className = _props2.className,
            id = _props2.id,
            name = _props2.name,
            _props2$showPlaceHold = _props2.showPlaceHolder,
            showPlaceHolder = _props2$showPlaceHold === undefined ? true : _props2$showPlaceHold,
            placeHolder = _props2.placeHolder,
            disabled = _props2.disabled,
            _props2$defaultValue = _props2.defaultValue,
            defaultValue = _props2$defaultValue === undefined ? "" : _props2$defaultValue,
            changeValue = _props2.changeValue,
            _props2$noAvilable = _props2.noAvilable,
            noAvilable = _props2$noAvilable === undefined ? false : _props2$noAvilable;


        var options = this._renderCurrencies();
        if (changeValue) {
          this.defaultValue = defaultValue;
        }
        if (noAvilable == true) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "select",
              { className: className, disabled: true },
              " "
            )
          );
        }
        return React.createElement(
          "div",
          { className: this.props.supClassName ? this.props.supClassName : "" },
          React.createElement(
            "select",
            {
              disabled: disabled,
              defaultValue: defaultValue != "" ? this._findValueDefault(defaultValue) : "default",
              className: className + " " + (!this.state.showValidate ? "" : "input-invalid"),
              id: id,
              name: name,
              onChange: this._handleOnChange,
              onClick: this.handleClick,
              value: this.defaultValue || this._findValueDefault(defaultValue)
            },
            showPlaceHolder == true ? React.createElement(
              "option",
              { disabled: true, value: "default" },
              placeHolder ? placeHolder : "Seleccioná una opción..."
            ) : "",
            options
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _props3 = this.props,
            typeValue = _props3.typeValue,
            _props3$defaultValue = _props3.defaultValue,
            defaultValue = _props3$defaultValue === undefined ? "default" : _props3$defaultValue,
            prefix = _props3.prefix;

        if (typeValue) {
          //validacion realizada unicamente para los prefijos telefonicos (retiro colectivo) y devolver los 3 valores prefijo,codigo y descripcion
          if (prefix) {
            this.props.onResult(this.props.name, {
              id: defaultValue,
              code: this._findCodeDefault(defaultValue),
              value: this._findNameDefault(defaultValue),
              required: this.props.required ? true : false
            });
          } else if (typeValue == "id") {
            this.props.onResult(this.props.name, {
              id: defaultValue,
              value: this._findNameDefault(defaultValue),
              required: this.props.required ? true : false
            });
          } else {
            this.props.onResult(this.props.name, {
              id: this._findIdDefault(defaultValue),
              value: defaultValue,
              required: this.props.required ? true : false
            });
          }
        }
      }
    }]);

    return DropDownContent;
  }(React.Component);

  return DropDownContent;
});