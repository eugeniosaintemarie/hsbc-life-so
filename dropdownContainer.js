var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './dropdownContent'], function (React, ReactDOM, DropDownContent) {
  var DropDownContainer = function (_React$Component) {
    _inherits(DropDownContainer, _React$Component);

    function DropDownContainer(props) {
      _classCallCheck(this, DropDownContainer);

      var _this = _possibleConstructorReturn(this, (DropDownContainer.__proto__ || Object.getPrototypeOf(DropDownContainer)).call(this, props));

      _this.state = {};
      return _this;
    }

    _createClass(DropDownContainer, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            className = _props.className,
            id = _props.id,
            name = _props.name,
            onResult = _props.onResult,
            defaultByLabel = _props.defaultByLabel,
            idObject = _props.idObject,
            nameObject = _props.nameObject,
            showPlaceHolder = _props.showPlaceHolder,
            placeHolder = _props.placeHolder,
            _props$disabled = _props.disabled,
            disabled = _props$disabled === undefined ? false : _props$disabled;

        return React.createElement(
          'div',
          null,
          React.createElement(DropDownContent, {
            list: this.props.dataList,
            className: className,
            id: id,
            name: name,
            onResult: onResult,
            defaultByLabel: defaultByLabel,
            idObject: idObject,
            nameObject: nameObject,
            showPlaceHolder: showPlaceHolder,
            placeHolder: placeHolder,
            disabled: disabled })
        );
      }
    }]);

    return DropDownContainer;
  }(React.Component);

  return DropDownContainer;
});