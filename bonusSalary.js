var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../common/inputvalidation"], function (React, InputValidation) {
  var BonusSalary = function (_React$Component) {
    _inherits(BonusSalary, _React$Component);

    function BonusSalary(props) {
      _classCallCheck(this, BonusSalary);

      var _this = _possibleConstructorReturn(this, (BonusSalary.__proto__ || Object.getPrototypeOf(BonusSalary)).call(this, props));

      _initialiseProps.call(_this);

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$salary = _ref.salary,
          salary = _ref$salary === undefined ? "" : _ref$salary,
          _ref$applicantSalary = _ref.applicantSalary,
          applicantSalary = _ref$applicantSalary === undefined ? "" : _ref$applicantSalary;

      _this.state = {
        salary: { id: salary },
        applicantSalary: {
          value: applicantSalary,
          required: true
        },
        val: "",
        checkValueMin: false,
        checkValueMax: false,
        sumAssured: 0,
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
        applicantSalary: React.createRef()
      };
      return _this;
    }

    _createClass(BonusSalary, [{
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

          if (this.state.sumAssured / 2 < capitalMaximoConyu && this.state.sumAssured / 2 > capitalMinimoConyu) {
            sumaAseguradaConyu = this.state.sumAssured / 2;
          } else if (this.state.sumAssured / 2 >= capitalMaximoConyu) {
            sumaAseguradaConyu = capitalMaximoConyu;
          } else if (this.state.sumAssured / 2 <= capitalMinimoConyu) {
            sumaAseguradaConyu = capitalMinimoConyu;
          }
        }

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            null,
            " MULTIPLO DE SUELDOS"
          ),
          React.createElement(
            "div",
            { className: "form-check row " },
            React.createElement(
              "p",
              null,
              "Selecciona la cantidad de sueldos a asegurar"
            )
          ),
          React.createElement(
            "div",
            { className: "mt-4" },
            listPoliza.MULTIPL1 != "0" ? React.createElement(
              "div",
              { className: "form-check row justify-content-md-center col-md-3 text-center" },
              React.createElement("input", {
                className: "form-check-input",
                onClick: this.handleCalculations,
                onChange: this._handleOption,
                checked: this.state.salary.id == listPoliza.MULTIPL1 ? true : false,
                type: "radio",
                onResult: this._handleResults,
                name: "salary",
                id: listPoliza.MULTIPL1
              }),
              React.createElement(
                "label",
                { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                listPoliza.MULTIPL1
              )
            ) : "",
            listPoliza.MULTIPL2 != "0" ? React.createElement(
              "div",
              { className: "col-5 col-md-6 p-0 text-right" },
              React.createElement("input", {
                onClick: this.handleCalculations,
                className: "form-check-input",
                onChange: this._handleOption,
                checked: this.state.salary.id == listPoliza.MULTIPL2 ? true : false,
                type: "radio",
                onResult: this._handleResults,
                name: "salary",
                id: listPoliza.MULTIPL2
              }),
              React.createElement(
                "label",
                { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                listPoliza.MULTIPL2
              )
            ) : "",
            listPoliza.MULTIPL3 != "0" ? React.createElement(
              "div",
              { className: "col-5 col-md-6 p-0 text-right" },
              React.createElement("input", {
                onClick: this.handleCalculations,
                className: "form-check-input",
                onChange: this._handleOption,
                checked: this.state.salary.id == listPoliza.MULTIPL3 ? true : false,
                type: "radio",
                onResult: this._handleResults,
                name: "salary",
                id: listPoliza.MULTIPL3
              }),
              React.createElement(
                "label",
                { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                listPoliza.MULTIPL3
              )
            ) : ""
          ),
          this.state.checkValueMax ? React.createElement(
            "div",
            { className: "text-danger font-size float-right col-5 small" },
            "*  La suma asegurada supera el valor permitido"
          ) : " ",
          this.state.checkValueMin ? React.createElement(
            "div",
            { className: "text-danger font-size float-right col-5 small" },
            "*  La suma asegurada es inferior el valor permitido"
          ) : " ",
          React.createElement(
            "form",
            null,
            React.createElement(
              "div",
              { className: "form-row mt-2 form-height" },
              React.createElement(
                "div",
                { className: "form-group col-7" },
                React.createElement(
                  "label",
                  { className: "mt-2font-size",
                    htmlFor: "applicantSalary"
                  },
                  " Ingresa tu sueldo bruto"
                ),
                React.createElement(
                  "div",
                  { className: "col-md-5" },
                  React.createElement(InputValidation, {
                    ref: this.referencies.applicantSalary,
                    classNameAd: "hide",
                    id: "applicantSalary",
                    name: "applicantSalary",
                    type: "text",
                    inputMode: "numeric",
                    minLength: "0",
                    maxLength: "10",
                    checkValue: this.state.checkValueMin || this.state.checkValueMax,
                    value: this.state.applicantSalary.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    disabled: readOnly,
                    required: true,
                    onKeyPress: function onKeyPress(e) {
                      var keyCode = e.keyCode || e.which;
                      var keyValue = String.fromCharCode(keyCode);
                      var regex = /^[0-9]+$/;

                      if (e.key === "e" || e.key === "E" || !regex.test(keyValue)) {
                        e.preventDefault();
                      }
                    }
                  })
                )
              )
            )
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
                      listPoliza.MONENCOD === 1 ? "$ " + Number(this.state.sumAssured).toLocaleString("es-AR") : listPoliza.MONENCOD === 2 ? "U$S " + Number(this.state.sumAssured).toLocaleString("es-AR") : ""
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
                      listPoliza.MONENCOD === 1 ? "$ " + this.state.monthlyPremium.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : listPoliza.MONENCOD === 2 ? "U$S " + this.state.monthlyPremium.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
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
        if (this.state.applicantSalary && this.state.salary) {
          this.handleCalculations();
        }
      }
    }]);

    return BonusSalary;
  }(React.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._handleResults = function (id, result) {
      var form = {};
      _this2.setState(_defineProperty({}, id, result));
      result.referencies = _this2.referencies[id];
      form = result;

      if (id !== "salary") {
        _this2.handleTop(result.value);
      }

      _this2.props.onResults(id, form);
    };

    this._handleOption = function (e) {
      _this2._handleResults(e.target.name, { id: e.target.id });
    };

    this.handleTop = function (valor) {
      _this2.state.val = valor;
      _this2.handleCalculations("", "test");
    };

    this.handleCalculations = function (e, test) {
      var salary = void 0;

      if (e && e.type == "click") {
        salary = e.target.id;
      } else salary = _this2.state.salary.id;

      if (test) {
        result = salary * _this2.state.val !== undefined ? _this2.state.val : _this2.state.applicantSalary.value;
      } else {
        result = salary * _this2.state.applicantSalary.value;
      }

      if (result > _this2.props.listPoliza.CAPITMAX) {
        _this2.setState({ checkValueMax: true });
        _this2.setState({ checkValueMin: false });
      } else if (result < _this2.props.listPoliza.CAPITMIN) {
        _this2.setState({ checkValueMin: true });
        _this2.setState({ checkValueMax: false });
      } else {
        var premium = result * (_this2.props.listPoliza.TASA / 1000);

        _this2.setState({
          sumAssured: result,
          checkValueMax: false,
          checkValueMin: false,
          monthlyPremium: premium
        });
      }

      _this2.props.handleCheckDdjj(result, _this2.props.listPoliza.REQUISITOS);
    };
  };

  return BonusSalary;
});