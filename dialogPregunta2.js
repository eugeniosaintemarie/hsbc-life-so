var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./inputvalidation"], function (React, InputValidation) {
  var DialogPregunta2 = function (_React$Component) {
    _inherits(DialogPregunta2, _React$Component);

    function DialogPregunta2(props) {
      _classCallCheck(this, DialogPregunta2);

      return _possibleConstructorReturn(this, (DialogPregunta2.__proto__ || Object.getPrototypeOf(DialogPregunta2)).call(this, props));
    }

    _createClass(DialogPregunta2, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "row align-items-center mt-2 ml-2 mr-2 mb-1" },
            React.createElement(
              "div",
              { className: "col-5 col-lg-3" },
              React.createElement(
                "label",
                {
                  className: "form-check-label",
                  htmlFor: "answerPersonal" },
                this.props.title
              )
            ),
            React.createElement(
              "div",
              { className: "col" },
              React.createElement(
                "label",
                {
                  className: "form-check-label",
                  htmlFor: "answerPersonal" },
                this.props.question
              )
            )
          ),
          React.createElement(
            "div",
            { className: "row align-items-center m-2" },
            React.createElement(
              "div",
              { className: "col-5 col-lg-3" },
              React.createElement(
                "label",
                {
                  className: "form-check-label",
                  htmlFor: "answerPersonal" },
                this.props.respuestaInputLabel
              )
            ),
            React.createElement(
              "div",
              { className: "col-6 col-lg-4 col-xl-3" },
              React.createElement(InputValidation, {
                id: "answerPersonal",
                name: "answerPersonal",
                minLength: this.props.minLength,
                maxLength: this.props.maxLength,
                requiredStr: "escriba una respuesta",
                charactersStr: "repuesta incompleta",
                pattern: this.props.pattern,
                className: "input-background-color form-control w-100 ",
                onResult: this.props._handleResults })
            )
          )
        );
      }
    }]);

    return DialogPregunta2;
  }(React.Component);

  return DialogPregunta2;
});