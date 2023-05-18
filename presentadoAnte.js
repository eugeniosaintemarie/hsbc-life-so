var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./inputvalidation"], function (React, InputValidation) {
  var PresentadoAnte = function (_React$Component) {
    _inherits(PresentadoAnte, _React$Component);

    function PresentadoAnte(props) {
      _classCallCheck(this, PresentadoAnte);

      var _this = _possibleConstructorReturn(this, (PresentadoAnte.__proto__ || Object.getPrototypeOf(PresentadoAnte)).call(this, props));

      _this._handleResults = function (id, result) {
        var data = _defineProperty({}, id, result);
        var form = Object.keys(_this.state.form);
        form = form.find(function (el) {
          return el === id;
        });

        if (typeof form !== "undefined") {
          var current = _this.state;
          var old = _this.state.form;
          _this.setState(Object.assign({}, current, {
            form: Object.assign({}, old, data)
          }));
        }

        _this.props.setPresentado(result.value);
      };

      _this.state = {
        data: null,
        form: { presentadoValue: "" }
      };
      return _this;
    }

    _createClass(PresentadoAnte, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "border p-3" },
            React.createElement(
              "h6",
              { className: "subtitle-inside text-center" },
              "Para ser presentado ante"
            ),
            React.createElement("br", null),
            React.createElement(
              "div",
              { className: "" },
              React.createElement(
                "label",
                null,
                "Raz\xF3n social y CUIT:"
              ),
              React.createElement("br", null),
              React.createElement(InputValidation, {
                id: "presentadoValue",
                name: "presentadoValue",
                className: "input-background-color form-control w-50 ",
                onResult: this._handleResults
              })
            )
          )
        );
      }
    }]);

    return PresentadoAnte;
  }(React.Component);

  return PresentadoAnte;
});