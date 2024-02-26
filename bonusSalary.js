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

      var _ref = _this.props.formInfo ? _this.props.formInfo : _this.props.recSolData ? _this.props.recSolData : "",
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
        gmultipValidation: false,
        formValues: false,
        formModify: {
          id: "2"
        },
        disableElementos: false,
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
            listPoliza = _props.listPoliza,
            grupoPoliza = _props.grupoPoliza,
            listSubGrupos = _props.listSubGrupos;


        if (this.props.isConyuge && this.props.notConyuge) {
          var capitalMaximoConyu = listSubGrupos[0].GCAPIMAX;
          var capitalMinimoConyu = listSubGrupos[0].GCAPIMIN;

          var sumaAseguradaConyu;
          var porcentaje = listSubGrupos[0].GRUPOPOR / 100;

          if (this.state.sumAssured * porcentaje < capitalMaximoConyu && this.state.sumAssured * porcentaje > capitalMinimoConyu) {
            sumaAseguradaConyu = this.state.sumAssured * porcentaje;
          } else if (this.state.sumAssured * porcentaje >= capitalMaximoConyu) {
            sumaAseguradaConyu = capitalMaximoConyu;
          } else if (this.state.sumAssured * porcentaje <= capitalMinimoConyu) {
            sumaAseguradaConyu = capitalMinimoConyu;
          }
        }

        return React.createElement(
          "div",
          null,
          this.props.isModify ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "form-check row justify-content-md-center col-md-3 " },
              React.createElement(
                "label",
                { className: "form-check-label", htmlFor: "flexRadioDefault1" },
                "Modifica"
              )
            ),
            React.createElement(
              "div",
              { className: "form-check row justify-content-md-center col-md-3 text-center" },
              React.createElement("input", {
                className: "form-check-input",
                onClick: this._handleFormModify,
                type: "radio",
                checked: this.state.formModify.id == "1" ? true : false,
                onResult: this._handleResults,
                name: "formModify",
                id: "1",
                disabled: this.state.disableElementos
              }),
              React.createElement(
                "label",
                { className: "form-check-label", htmlFor: "flexRadioDefault1" },
                "SI"
              )
            ),
            React.createElement(
              "div",
              { className: "form-check row justify-content-md-center col-md-3 text-center", style: { "margin-bottom": "0.7rem" } },
              React.createElement("input", {
                onClick: this._handleFormModify,
                className: "form-check-input",
                checked: this.state.formModify.id == "2" ? true : false,
                type: "radio",
                onResult: this._handleResults,
                name: "formModify",
                id: "2",
                disabled: this.state.disableElementos
              }),
              React.createElement(
                "label",
                { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                "NO"
              )
            )
          ) : "",
          React.createElement(
            "h4",
            null,
            " MULTIPLO DE SUELDOS"
          ),
          this.props.isModify ? React.createElement(
            "div",
            { className: "d-flex align-items-center" },
            React.createElement(
              "div",
              { className: "d-flex align-items-center mb-2" },
              React.createElement(
                "p",
                { className: "mb-0 font-weight-bold" },
                "Multiplo actual:"
              ),
              React.createElement(
                "div",
                { className: "col-md-3" },
                React.createElement(InputValidation, {
                  classNameAd: "hide",
                  id: "currentSalary",
                  name: "currentSalary",
                  type: "text",
                  inputMode: "numeric",
                  value: this.props.multiplo,
                  className: "input-background-color form-control input-size text-center",
                  onResult: this._handleResults,
                  disabled: true
                })
              )
            ),
            React.createElement(
              "div",
              { className: "d-flex align-items-center mb-2" },
              React.createElement(
                "p",
                { className: "mb-0 font-weight-bold" },
                "Sueldo actual:"
              ),
              React.createElement(
                "div",
                { className: "col-md-5" },
                React.createElement(InputValidation, {
                  classNameAd: "hide",
                  id: "currentApplicantSalary",
                  name: "currentApplicantSalary",
                  type: "text",
                  inputMode: "numeric",
                  value: this.props.sueldo.toLocaleString("es-AR"),
                  className: "input-background-color form-control input-size text-center",
                  onResult: this._handleResults,
                  disabled: true
                })
              )
            )
          ) : React.createElement(
            React.Fragment,
            null,
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
              grupoPoliza.GMULTIP1 != "0" ? React.createElement(
                "div",
                { className: "form-check row justify-content-md-center col-md-3 text-center" },
                React.createElement("input", {
                  className: "form-check-input",
                  onClick: this.handleCalculations,
                  onChange: this._handleOption,
                  checked: this.state.salary.id == grupoPoliza.GMULTIP1 ? true : false,
                  type: "radio",
                  onResult: this._handleResults,
                  name: "salary",
                  id: grupoPoliza.GMULTIP1
                }),
                React.createElement(
                  "label",
                  { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                  grupoPoliza.GMULTIP1
                )
              ) : "",
              grupoPoliza.GMULTIP2 != "0" ? React.createElement(
                "div",
                { className: "col-5 col-md-6 p-0 text-right" },
                React.createElement("input", {
                  onClick: this.handleCalculations,
                  className: "form-check-input",
                  onChange: this._handleOption,
                  checked: this.state.salary.id == grupoPoliza.GMULTIP2 ? true : false,
                  type: "radio",
                  onResult: this._handleResults,
                  name: "salary",
                  id: grupoPoliza.GMULTIP2
                }),
                React.createElement(
                  "label",
                  { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                  grupoPoliza.GMULTIP2
                )
              ) : "",
              grupoPoliza.GMULTIP3 != "0" ? React.createElement(
                "div",
                { className: "col-5 col-md-6 p-0 text-right" },
                React.createElement("input", {
                  onClick: this.handleCalculations,
                  className: "form-check-input",
                  onChange: this._handleOption,
                  checked: this.state.salary.id == grupoPoliza.GMULTIP3 ? true : false,
                  type: "radio",
                  onResult: this._handleResults,
                  name: "salary",
                  id: grupoPoliza.GMULTIP3
                }),
                React.createElement(
                  "label",
                  { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                  grupoPoliza.GMULTIP3
                )
              ) : ""
            )
          ),
          this.props.isModify ? React.createElement(
            React.Fragment,
            null,
            this.state.checkModify ? React.createElement(
              React.Fragment,
              null,
              this.state.gmultipValidation ? React.createElement(
                React.Fragment,
                null,
                !this.state.disableElementos ? React.createElement(
                  "p",
                  null,
                  "No es posible modificar tu m\xFAltiplo seg\xFAn los par\xE1metros de tu p\xF3liza"
                ) : ""
              ) : React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "div",
                  { className: "form-check row " },
                  React.createElement(
                    "p",
                    null,
                    " ",
                    React.createElement(
                      "strong",
                      null,
                      "Modifica"
                    ),
                    " la cantidad de sueldos a asegurar"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "mt-4" },
                  grupoPoliza.GMULTIP1 != "0" ? React.createElement(
                    "div",
                    { className: "form-check row justify-content-md-center col-md-3 text-center" },
                    React.createElement("input", {
                      className: "form-check-input",
                      onClick: this.handleCalculations,
                      onChange: this._handleOption,
                      checked: this.state.salary.id == grupoPoliza.GMULTIP1 ? true : false,
                      type: "radio",
                      onResult: this._handleResults,
                      name: "salary",
                      id: grupoPoliza.GMULTIP1,
                      disabled: this.state.disableElementos
                    }),
                    React.createElement(
                      "label",
                      { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                      grupoPoliza.GMULTIP1
                    )
                  ) : "",
                  grupoPoliza.GMULTIP2 != "0" ? React.createElement(
                    "div",
                    { className: "col-5 col-md-6 p-0 text-right" },
                    React.createElement("input", {
                      onClick: this.handleCalculations,
                      className: "form-check-input",
                      onChange: this._handleOption,
                      checked: this.state.salary.id == grupoPoliza.GMULTIP2 ? true : false,
                      type: "radio",
                      onResult: this._handleResults,
                      name: "salary",
                      id: grupoPoliza.GMULTIP2,
                      disabled: this.state.disableElementos
                    }),
                    React.createElement(
                      "label",
                      { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                      grupoPoliza.GMULTIP2
                    )
                  ) : "",
                  grupoPoliza.GMULTIP3 != "0" ? React.createElement(
                    "div",
                    { className: "col-5 col-md-6 p-0 text-right" },
                    React.createElement("input", {
                      onClick: this.handleCalculations,
                      className: "form-check-input",
                      onChange: this._handleOption,
                      checked: this.state.salary.id == grupoPoliza.GMULTIP3 ? true : false,
                      type: "radio",
                      onResult: this._handleResults,
                      name: "salary",
                      id: grupoPoliza.GMULTIP3,
                      disabled: this.state.disableElementos
                    }),
                    React.createElement(
                      "label",
                      { className: "form-check-label", htmlFor: "flexRadioDefault2" },
                      grupoPoliza.GMULTIP3
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
                          disabled: this.state.disableElementos,
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
              )
            ) : ""
          ) : React.createElement(
            React.Fragment,
            null,
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
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.isModify) {
          var keys = Object.keys(this.props.grupoPoliza);
          var cont = 0;
          var multipValue = 0;

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              if (key.startsWith("GMULTIP")) {
                if (this.props.grupoPoliza[key] == 0) {
                  cont++;
                } else {
                  multipValue = this.props.grupoPoliza[key];
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (cont === 2 && this.props.multiplo === multipValue) {
            this.setState({
              gmultipValidation: true,
              salary: {
                id: this.props.multiplo
              }
            });

            this.props.onResults("gmultipValidation", true);
          }
        }

        if (this.props.recSolData !== undefined) {
          var formValues = this.props.recSolData;

          if (this.props.disableElements !== undefined) {
            this.setState({ disableElementos: this.props.disableElements });
          }

          this.setState({
            formValues: formValues,
            formModify: {
              id: formValues.sumAsegModify === "S" ? "1" : "2"
            },
            checkModify: formValues.sumAsegModify === "S" ? true : false
          });
        }
      }
    }]);

    return BonusSalary;
  }(React.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this._handleFormModify = function (e) {
      if (e.target.id == "2") {
        _this2.setState({ checkModify: false });
      } else _this2.setState({ checkModify: true });

      _this2._handleResults(e.target.name, { id: e.target.id });
    };

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
      _this2.handleCalculations(valor);
    };

    this.handleCalculations = function (e, test) {
      var salary = void 0;

      if (e && e.type == "click") {
        salary = e.target.id;
      } else salary = _this2.state.salary.id;

      if (test) {
        result = salary * _this2.state.val !== undefined ? _this2.state.val : _this2.state.applicantSalary.value;
      } else {
        result = typeof e === "string" || typeof e === "number" ? salary * e : salary * _this2.state.applicantSalary.value;
      }

      if (result > _this2.props.grupoPoliza.GCAPIMAX) {
        _this2.setState({ checkValueMax: true });
        _this2.setState({ checkValueMin: false });
      } else if (result < _this2.props.grupoPoliza.GCAPIMIN) {
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

      if (_this2.props.isModify) {
        _this2.props.handleCheckDdjj(result, _this2.props.listPoliza.REQUISITOS);
      }
    };
  };

  return BonusSalary;
});