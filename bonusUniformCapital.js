var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "../../../controller/retiroNominaController"], function (React, Loadsh) {
  var BonusUniformCapital = function (_React$Component) {
    _inherits(BonusUniformCapital, _React$Component);

    function BonusUniformCapital(props) {
      _classCallCheck(this, BonusUniformCapital);

      var _this = _possibleConstructorReturn(this, (BonusUniformCapital.__proto__ || Object.getPrototypeOf(BonusUniformCapital)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$applicantPlus = _ref.applicantPlus,
          applicantPlus = _ref$applicantPlus === undefined ? "" : _ref$applicantPlus;

      _this.state = {
        applicantPlus: {
          id: "",
          value: applicantPlus,
          required: true
        },
        bonus: 0,
        monthlyPremium: 0,
        modal: {
          component: "",
          title: "",
          size: "md",
          classAccept: "",
          textBtnAccept: "",
          textBtnCancel: ""
        }
      };

      _this.referencies = {
        applicantPlus: React.createRef()
      };
      return _this;
    }

    _createClass(BonusUniformCapital, [{
      key: "render",
      value: function render() {
        var listPoliza = this.props.listPoliza;


        if (this.props.isConyuge && this.props.notConyuge) {
          var capitalMaximoConyu = listPoliza.GRUPOS.GRUPO.find(function (e) {
            return parseInt(e.GRUPOCOD) == 50;
          }).GCAPIMAX;
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            null,
            " CAPITAL UNIFORME"
          ),
          React.createElement(
            "div",
            { className: "panel d-block mt-2" },
            React.createElement(
              "div",
              { className: "panel-container" },
              React.createElement(
                "div",
                { className: "panel" },
                React.createElement(
                  "div",
                  { "class": "alert border p-2 bg-light" },
                  "Titular",
                  React.createElement(
                    "div",
                    { className: "d-flex mt-3 mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Suma Asegurada: "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      listPoliza.MONENCOD === 1 ? "$ " + listPoliza.CAPITMAX.toLocaleString("es-AR") : listPoliza.MONENCOD === 2 ? "U$S " + listPoliza.CAPITMAX.toLocaleString("es-AR") : ""
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "d-flex mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Tasa de prima mensual (\u2030): "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      listPoliza.TASA.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "d-flex mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Prima mensual estimada: "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      listPoliza.MONENCOD === 1 ? "$ " + (listPoliza.CAPITMAX * (listPoliza.TASA / 1000)).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : listPoliza.MONENCOD === 2 ? "U$S " + (listPoliza.CAPITMAX * (listPoliza.TASA / 1000)).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
                    )
                  )
                )
              ),
              this.props.isConyuge && this.props.notConyuge ? React.createElement(
                "div",
                { className: "panel-container" },
                React.createElement(
                  "div",
                  { "class": "alert border p-2 bg-light" },
                  "C\xF3nyuge/Conviviente",
                  React.createElement(
                    "div",
                    { className: "d-flex mb-3 mt-4 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Suma Asegurada: "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      listPoliza.MONENCOD === 1 ? "$ " + capitalMaximoConyu.toLocaleString("es-AR") : listPoliza.MONENCOD === 2 ? "U$S " + capitalMaximoConyu.toLocaleString("es-AR") : ""
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "d-flex mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Tasa de prima mensual (\u2030): "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      listPoliza.TASA.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "d-flex mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Prima mensual estimada:"
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      listPoliza.MONENCOD === 1 ? "$ " + (capitalMaximoConyu * listPoliza.TASA / 1000).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : listPoliza.MONENCOD === 2 ? "U$S " + (capitalMaximoConyu * listPoliza.TASA / 1000).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
                    )
                  )
                ),
                React.createElement(
                  "p",
                  { className: "m-3 font-italic" },
                  "El monto que refleja este calculo inicial es estimativo, no constituye una oferta ni tampoco incluye impuestos que pudieron aplicar y otros eventuales gastos que requiera la poliza."
                )
              ) : ""
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.props.handleCheckDdjj(this.props.listPoliza.CAPITMAX, this.props.listPoliza.REQUISITOS);
      }
    }]);

    return BonusUniformCapital;
  }(React.Component);

  return BonusUniformCapital;
});