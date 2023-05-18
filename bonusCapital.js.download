var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../common/inputvalidation"], function (React, InputValidation) {
  var BonusCapital = function (_React$Component) {
    _inherits(BonusCapital, _React$Component);

    function BonusCapital(props) {
      _classCallCheck(this, BonusCapital);

      var _this = _possibleConstructorReturn(this, (BonusCapital.__proto__ || Object.getPrototypeOf(BonusCapital)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;

        _this.handleTop(result.value);
        _this.props.onResults(id, form);
      };

      _this.handleTop = function (valor) {
        var flag = false;

        if (!isNaN(valor)) {
          _this.state.val = valor;

          if (_this.state.applicantPlus.value.length <= Number(_this.state.maxLength)) {
            _this.state.applicantPlus.value = _this.state.val;
          }
        }

        if (Number(_this.state.val) <= _this.props.listPoliza.CAPITMAX && Number(_this.state.val) >= _this.props.listPoliza.CAPITMIN) {
          _this.setState({ checkValue: false });
          flag = true;
        } else {
          _this.setState({ checkValue: true });
        }

        if (_this.state.val.length > 3 && flag) {
          _this.props.handleCheckDdjj(_this.state.val, _this.props.listPoliza.REQUISITOS);
        }
      };

      _this.handleCalculations = function () {
        if (Number(_this.state.applicantPlus.value) <= _this.props.listPoliza.CAPITMAX && Number(_this.state.applicantPlus.value) >= _this.props.listPoliza.CAPITMIN) {
          _this.setState({ checkValue: false });
          flag = true;
        } else {
          _this.setState({ checkValue: true });
        }
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
        checkValue: false,
        val: applicantPlus ? applicantPlus : "",
        maxLength: "10",
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

    _createClass(BonusCapital, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            readOnly = _props.readOnly,
            listPoliza = _props.listPoliza;


        if (this.props.isConyuge && this.props.notConyuge) {
          var capitalMaximoConyu = listPoliza.GRUPOS.GRUPO.find(function (e) {
            return parseInt(e.GRUPOCOD) == 50;
          }).GCAPIMAX;
          var capitalMinimoConyu = listPoliza.GRUPOS.GRUPO.find(function (e) {
            return parseInt(e.GRUPOCOD) == 50;
          }).GCAPIMIN;

          var sumaAseguradaConyu;

          if (this.state.applicantPlus.value == "") {
            sumaAseguradaConyu = 0;
          } else if (this.state.applicantPlus.value / 2 < capitalMaximoConyu && this.state.applicantPlus.value / 2 > capitalMinimoConyu) {
            sumaAseguradaConyu = this.state.applicantPlus.value / 2;
          } else if (this.state.applicantPlus.value / 2 >= capitalMaximoConyu) {
            sumaAseguradaConyu = capitalMaximoConyu;
          } else if (this.state.applicantPlus.value / 2 <= capitalMinimoConyu) {
            sumaAseguradaConyu = capitalMinimoConyu;
          }
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            null,
            " ESCALA DE CAPITALES"
          ),
          React.createElement(
            "p",
            null,
            "Suma Asegurada Maxima : ",
            listPoliza.CAPITMAX.toLocaleString("es-AR")
          ),
          React.createElement(
            "p",
            null,
            "Suma Asegurada Minima: ",
            listPoliza.CAPITMIN.toLocaleString("es-AR")
          ),
          React.createElement(
            "label",
            { className: "font-size", htmlFor: "applicantPlus" },
            "Seleccione su suma asegurada entre el minimo y el maximo"
          ),
          React.createElement(
            "div",
            { className: "col-md-5" },
            React.createElement(InputValidation, {
              ref: this.referencies.applicantPlus,
              classNameAd: "hide",
              type: "text",
              id: "applicantPlus",
              name: "applicantPlus",
              maxLength: this.state.maxLength,
              value: this.state.applicantPlus.value,
              className: "input-background-color form-control input-size",
              onResult: this._handleResults,
              onKeyPress: function onKeyPress(e) {
                var keyCode = e.keyCode || e.which;
                var keyValue = String.fromCharCode(keyCode);
                var regex = /^[0-9]+$/;

                if (e.key === "e" || e.key === "E" || !regex.test(keyValue)) {
                  e.preventDefault();
                }
              },
              inputMode: "numeric",
              upperCase: true,
              disabled: readOnly,
              required: true,
              checkValue: this.state.checkValue
            })
          ),
          this.state.checkValue ? React.createElement(
            "div",
            { className: "text-danger font-size float-right col-5 small" },
            "* Por favor introducir un monto entre la suma asegurada minima y maxima"
          ) : " ",
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
                      listPoliza.MONENCOD === 1 ? "$ " + Number(this.state.applicantPlus.value).toLocaleString("es-AR") : listPoliza.MONENCOD === 2 ? "U$S " + Number(this.state.applicantPlus.value).toLocaleString("es-AR") : ""
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
                      listPoliza.MONENCOD === 1 ? "$ " + (this.state.applicantPlus.value * (listPoliza.TASA / 1000)).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : listPoliza.MONENCOD === 2 ? "U$S " + (this.state.applicantPlus.value * (listPoliza.TASA / 1000)).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
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
                      listPoliza.MONENCOD === 1 ? "$ " + sumaAseguradaConyu.toLocaleString("es-AR") : listPoliza.MONENCOD === 2 ? "U$S " + sumaAseguradaConyu.toLocaleString("es-AR") : ""
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
                      listPoliza.MONENCOD === 1 ? "$ " + (sumaAseguradaConyu * listPoliza.TASA / 1000).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : listPoliza.MONENCOD === 2 ? "U$S " + (sumaAseguradaConyu * listPoliza.TASA / 1000).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
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
        this.handleCalculations();
      }
    }]);

    return BonusCapital;
  }(React.Component);

  return BonusCapital;
});