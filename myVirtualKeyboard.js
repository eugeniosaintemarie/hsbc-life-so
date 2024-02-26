var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var myVirtualKeyboard = function (_React$Component) {
    _inherits(myVirtualKeyboard, _React$Component);

    function myVirtualKeyboard(props) {
      _classCallCheck(this, myVirtualKeyboard);

      var _this = _possibleConstructorReturn(this, (myVirtualKeyboard.__proto__ || Object.getPrototypeOf(myVirtualKeyboard)).call(this, props));

      _this.handleKeyClick = function (key) {

        if (key === 'Enter') {
          _this.handleEnterKey();
        } else if (key === "Ctrl" || key === "Alt" || key === '<' || key === '>') {} else if (key === ' ') {
          _this.handleSpaceKey();
          _this.props.onResult({ target: { value: key }, nativeEvent: { inputType: "myVirtualKeyboard" } });
        } else if (key === 'Caps Lock') {
          _this.handleCapsLock();
        } else if (key === '<i className="fa-solid fa-delete-left"></i>') {
          _this.handleDeleteKey();
        } else if (key === 'Shift') {
          _this.handleShiftKey();
        } else if (key === 'Tab') {
          _this.handleTabKey();
        } else {
          _this.handleRegularKey(key);
        }
      };

      _this._handleCallOnResult = function (key) {
        _this.props.onResult({ target: { value: key }, nativeEvent: { inputType: "myVirtualKeyboard" } });
      };

      _this.handleSpaceKey = function () {
        var newContent = _this.state.inputText + "\xA0";
        _this.setState({ inputText: newContent });
        _this._handleCallOnResult(newContent);
      };

      _this.handleEnterKey = function () {
        var newContent = _this.state.inputText + '\n';
        _this.setState({ inputText: newContent });
        _this._handleCallOnResult(newContent);
      };

      _this.handleCapsLock = function () {
        var updatedCaps = !_this.state.isCaps;
        _this.setState({ isCaps: updatedCaps });
        var keys = document.querySelectorAll('.key');
        keys.forEach(function (key) {
          var firstSpanElement = key.querySelector('span:first-child');
          if (firstSpanElement) {
            var keyText = firstSpanElement.innerText.toLowerCase();
            if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].includes(keyText)) {
              firstSpanElement.innerText = updatedCaps && _this.state.isShift || !updatedCaps && !_this.state.isShift ? keyText.toLowerCase() : keyText.toUpperCase();
            }
            if (keyText === 'caps lock') {
              firstSpanElement.parentElement.style.backgroundColor = updatedCaps ? '#a1a1a1' : '#ffffff';
            }
          }
        });
      };

      _this.handleTabKey = function () {
        var newContent = _this.state.inputText + ' ';
        _this.setState({ inputText: newContent });
        _this._handleCallOnResult(newContent);
      };

      _this.handleDeleteKey = function () {
        if (_this.state.inputText.length === 0) {
          return;
        }
        var newContent = _this.state.inputText.slice(0, _this.state.inputText.length - 1);
        _this.setState({ inputText: newContent });
        _this._handleCallOnResult(newContent);
      };

      _this.handleShiftKey = function () {
        var updatedShift = !_this.state.isShift;
        _this.setState({ isShift: updatedShift });
        var keys = document.querySelectorAll('.key');
        keys.forEach(function (key) {
          var firstSpanElement = key.querySelector('span:first-child');
          if (firstSpanElement) {
            var keyText = firstSpanElement.innerText.toLowerCase();
            if (!['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].includes(keyText)) {
              firstSpanElement.innerText = updatedShift && _this.state.isCaps || !updatedShift && !_this.state.isCaps ? keyText.toLowerCase() : keyText.toUpperCase();
            }
            if (keyText === 'shift') {
              firstSpanElement.parentElement.style.backgroundColor = updatedShift ? '#a1a1a1' : '#ffffff';
            }
          }
        });
      };

      _this.handleRegularKey = function (key) {
        var keys = key.split(/[._]/);
        var newContent = void 0;
        if (keys.length > 1) {
          if (_this.state.isShift) {
            if (keys.length === 3) {
              if (keys[0] === '>') newContent = _this.state.inputText + '>';else newContent = _this.state.inputText + '_';
            } else newContent = _this.state.inputText + keys[0];
          } else {
            if (keys.length === 3) {
              if (keys[0] === '>') newContent = _this.state.inputText + '.';else newContent = _this.state.inputText + '-';
            } else newContent = _this.state.inputText + keys[1];
          }
        } else {
          var character = _this.state.isShift && _this.state.isCaps || !_this.state.isShift && !_this.state.isCaps ? key.toLowerCase() : key.toUpperCase();
          newContent = _this.state.inputText + character;
        }
        _this.setState({ inputText: newContent });
        _this._handleCallOnResult(newContent);
      };

      _this.state = {
        inputText: "",
        isCaps: false,
        isShift: false,
        selectedContent: ""
      };
      return _this;
    }

    _createClass(myVirtualKeyboard, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(
          "div",
          { className: "keyboard" },
          React.createElement(
            "div",
            { className: "keyboardcontainer" },
            React.createElement(
              "div",
              { className: "containerkeyboard" },
              React.createElement(
                "div",
                { className: "rowKeyboard" },
                ['~.`', '!.1', '@.2', '#.3', '$.4', '%.5', '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=', '<i className="fa-solid fa-delete-left"></i>'].map(function (keyvalue) {
                  return React.createElement(
                    "div",
                    { key: keyvalue, className: "key",
                      onClick: function onClick() {
                        return _this2.handleKeyClick(keyvalue);
                      } },
                    keyvalue.includes('.') ? keyvalue.split('.').map(function (part, index) {
                      return React.createElement(
                        "span",
                        { key: index },
                        part
                      );
                    }) : keyvalue === '<i className="fa-solid fa-delete-left"></i>' ? React.createElement("i", { className: "fa-solid fa-delete-left" }) : React.createElement(
                      "span",
                      null,
                      keyvalue
                    )
                  );
                })
              ),
              React.createElement(
                "div",
                { className: "rowKeyboard" },
                ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\'].map(function (keyvalue) {
                  return React.createElement(
                    "div",
                    { key: keyvalue, className: "key",
                      onClick: function onClick() {
                        return _this2.handleKeyClick(keyvalue);
                      } },
                    keyvalue.includes('_') ? keyvalue.split('_').map(function (part, index) {
                      return React.createElement(
                        "span",
                        { key: index },
                        part
                      );
                    }) : React.createElement(
                      "span",
                      null,
                      keyvalue
                    )
                  );
                })
              ),
              React.createElement(
                "div",
                { className: "rowKeyboard" },
                ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':_;', "\"_'", 'Enter'].map(function (keyvalue) {
                  return React.createElement(
                    "div",
                    { key: keyvalue, className: "key",
                      onClick: function onClick() {
                        return _this2.handleKeyClick(keyvalue);
                      } },
                    keyvalue.includes('_') ? keyvalue.split('_').map(function (part, index) {
                      return React.createElement(
                        "span",
                        { key: index },
                        part
                      );
                    }) : React.createElement(
                      "span",
                      null,
                      keyvalue
                    )
                  );
                })
              ),
              React.createElement(
                "div",
                { className: "rowKeyboard" },
                ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<_,', '>_.', '?_/', 'Shift'].map(function (keyvalue, index) {
                  return React.createElement(
                    "div",
                    { key: index, className: "key",
                      onClick: function onClick() {
                        return _this2.handleKeyClick(keyvalue);
                      } },
                    keyvalue.includes('_') ? keyvalue.split('_').map(function (part, index) {
                      return React.createElement(
                        "span",
                        { key: index },
                        part
                      );
                    }) : React.createElement(
                      "span",
                      null,
                      keyvalue
                    )
                  );
                })
              ),
              React.createElement(
                "div",
                { className: "rowKeyboard" },
                ['Ctrl', 'Alt', ' ', 'Ctrl', 'Alt', '<', '>'].map(function (keyvalue, index) {
                  return React.createElement(
                    "div",
                    { key: index, className: "key",
                      onClick: function onClick() {
                        return _this2.handleKeyClick(keyvalue);
                      } },
                    React.createElement(
                      "span",
                      null,
                      keyvalue
                    )
                  );
                })
              )
            )
          )
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
    }]);

    return myVirtualKeyboard;
  }(React.Component);

  ;

  return myVirtualKeyboard;
});