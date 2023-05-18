var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var ErrorList = function (_React$Component) {
    _inherits(ErrorList, _React$Component);

    function ErrorList(props) {
      _classCallCheck(this, ErrorList);

      var _this = _possibleConstructorReturn(this, (ErrorList.__proto__ || Object.getPrototypeOf(ErrorList)).call(this, props));

      _this._showError = function () {
        var array = _this.props.list;
        if (_this.props.show) {
          return React.createElement(
            "div",
            { className: _this.props.className },
            array.map(function (item) {
              return React.createElement(
                "ul",
                null,
                item
              );
            })
          );
        } else {
          return "";
        }
      };

      return _this;
    }

    _createClass(ErrorList, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "div",
          null,
          this._showError()
        );
      }
    }]);

    return ErrorList;
  }(React.Component);

  return ErrorList;
});