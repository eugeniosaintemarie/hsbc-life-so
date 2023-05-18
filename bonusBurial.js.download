var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../common/inputvalidation", "../../../common/inputvalidationExt", "../../../common/numericInput"], function (React, InputValidation, InputValidationExt, NumericInput) {
  var BonusBurial = function (_React$Component) {
    _inherits(BonusBurial, _React$Component);

    function BonusBurial(props) {
      _classCallCheck(this, BonusBurial);

      var _this = _possibleConstructorReturn(this, (BonusBurial.__proto__ || Object.getPrototypeOf(BonusBurial)).call(this, props));

      _this._getTotalParentescos = function () {
        var hijos = _this.props.formInfo.applicantHijos ? _this.props.formInfo.applicantHijos : 0;
        var conyugue = _this.props.formInfo.applicantConyuge ? _this.props.formInfo.applicantConyuge : 0;
        var padres = _this.props.formInfo.applicantParent ? _this.props.formInfo.applicantParent : 0;
        var total = parseInt(hijos, 10) + parseInt(conyugue, 10) + parseInt(padres, 10) + 1;

        _this.setState(function (prevState) {
          return { sumSons: parseInt(hijos, 10) };
        }, _this._handleResults("applicantHijos", {
          isValidate: true,
          required: false,
          value: parseInt(hijos, 10) }));

        _this.setState(function (prevState) {
          return { sumSpouse: parseInt(conyugue, 10) };
        }, _this._handleResults("applicantConyuge", {
          isValidate: true,
          required: false,
          value: parseInt(conyugue, 10) }));

        _this.setState(function (prevState) {
          return { sumParent: parseInt(padres, 10) };
        }, _this._handleResults("applicantParent", {
          isValidate: true,
          required: false,
          value: parseInt(padres, 10) }));

        _this.setState(function (prevState) {
          return { total: parseInt(total, 10) };
        }, _this._handleResults("applicantTotal", {
          isValidate: true,
          required: false,
          value: parseInt(total, 10) }));
      };

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
        console.log("objeto en handleresult", _defineProperty({}, id, result.value));
        _this.setState(_defineProperty({}, id, result.value));
        _this.handleSetTotal();
      };

      _this.handleSetTotal = function () {
        _this.setState({
          total: Number(_this.state.sumSons) + Number(_this.state.sumSpouse) + Number(_this.state.sumParent) + Number(_this.state.applicantTitular)
        });
      };

      _this.checkMaximo = function (e) {
        var sum = e.currentTarget.name.slice(0, -1);
        var sumMax = sum + "Max";
        var sumCheck = sum + "Check";

        if (_this.state[sumMax] < _this.state[sum] + 1 && e.target.value == "+") {
          _this.setState(_defineProperty({}, sumCheck, false));
        } else {
          _this.setState(_defineProperty({}, sumCheck, true));
          _this.handleCalculations(e);
        }
      };

      _this.handleCalculations = function (e) {
        var sum = e.currentTarget.id.slice(0, -1);
        var name = e.currentTarget.name.slice(0, -1);
        var resultado = 0;

        if (e.target.value == "+") {
          resultado = _this.state[name] + 1;
          _this.setState(function (prevState) {
            return _defineProperty({}, name, prevState[name] + 1);
          }, _this.handleSetTotal);
        } else if (e.target.value == "-") {
          resultado = _this.state[name] - 1;
          _this.setState(function (prevState) {
            return _defineProperty({}, name, prevState[name] - 1);
          }, _this.handleSetTotal);
        }

        var result = {
          isValidate: true,
          required: false,
          value: resultado
        };

        _this._handleResults(sum, result);
      };

      var _ref3 = _this.props.formInfo ? _this.props.formInfo : "",
          _ref3$applicantTitula = _ref3.applicantTitular,
          applicantTitular = _ref3$applicantTitula === undefined ? "" : _ref3$applicantTitula,
          _ref3$applicantConyug = _ref3.applicantConyuge,
          applicantConyuge = _ref3$applicantConyug === undefined ? "" : _ref3$applicantConyug,
          _ref3$applicantHijos = _ref3.applicantHijos,
          applicantHijos = _ref3$applicantHijos === undefined ? "" : _ref3$applicantHijos,
          _ref3$applicantParent = _ref3.applicantParent,
          applicantParent = _ref3$applicantParent === undefined ? "" : _ref3$applicantParent;

      _this.state = {
        applicantTitular: 1,
        applicantConyuge: {
          id: "",
          value: 0
        },
        applicantHijos: {
          id: "",
          value: 0
        },
        applicantTotal: {
          id: "",
          value: 1
        },
        applicantParent: {
          id: "",
          value: 0
        },
        checkValue: false,
        bonusMonthly: _this.props.listPoliza.CAPITMAX * _this.props.listPoliza.TASA / 1000,
        sumSpouse: 0,
        sumParent: 0,
        sumSons: 0,
        total: 0,
        sumSpouseMax: 1,
        sumParentMax: 4,
        sumSonsMax: 6,
        sumSpouseCheck: true,
        sumParentCheck: true,
        sumSonsCheck: true,
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
        applicantTitular: React.createRef(),
        applicantConyuge: React.createRef(),
        applicantHijos: React.createRef(),
        applicantParent: React.createRef(),
        applicantTotal: React.createRef()
      };
      return _this;
    }

    _createClass(BonusBurial, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            readOnly = _props.readOnly,
            nameBurial = _props.nameBurial,
            group = _props.group;


        var grpCony = group[1] && group[1].GRUPOCOD == "0000000050" || group[2] && group[2].GRUPOCOD == "0000000050" || group[3] && group[3].GRUPOCOD == "0000000050" ? true : false;
        var grpHijM = group[1] && group[1].GRUPOCOD == "0000000002" || group[2] && group[2].GRUPOCOD == "0000000002" || group[3] && group[3].GRUPOCOD == "0000000002" ? true : false;
        var grpPaSu = group[1] && (group[1].GRUPOCOD == "0000000100" || group[1].GRUPOCOD == "0000000101") || group[2] && (group[2].GRUPOCOD == "0000000100" || group[2].GRUPOCOD == "0000000101") || group[3] && (group[3].GRUPOCOD == "0000000100" || group[3].GRUPOCOD == "0000000101") ? true : false;

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h4",
            null,
            " ",
            nameBurial
          ),
          React.createElement(
            "div",
            { className: "form-check row " },
            React.createElement(
              "p",
              null,
              "Seleccion\xE1 e indic\xE1 la cantidad de asegurados de tu poliza"
            )
          ),
          React.createElement(
            "form",
            null,
            React.createElement(
              "div",
              { className: "ml-5 d-flex justify-content-left" },
              React.createElement(
                "div",
                { className: "col-md-2" },
                React.createElement(InputValidation, {
                  ref: this.referencies.applicantTitular,
                  classNameAd: "hide",
                  id: "applicantTitular",
                  name: "applicantTitular",
                  minLength: "1",
                  maxLength: "11",
                  value: this.state.applicantTitular,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  onKeyDown: function onKeyDown(e) {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                    _this2.handleCalculations(e);
                  },
                  upperCase: true,
                  disabled: !readOnly

                })
              ),
              React.createElement(
                "label",
                {
                  className: "font-size text-center",
                  htmlFor: "applicantTitular"
                },
                "Titular"
              )
            ),
            grpCony ? React.createElement(
              "div",
              { className: "ml-5 d-flex justify-content-left" },
              React.createElement(
                "div",
                { className: "col-md-2" },
                React.createElement(NumericInput, {
                  id: "applicantConyuge",
                  name: "sumSpouse",
                  min: "0",
                  max: "1",
                  className: "input-background-color form-control input-size",
                  onClickEvent: this.checkMaximo,
                  valueProps: this.state.sumSpouse,
                  passProps: true
                })
              ),
              React.createElement(
                "span",
                null,
                this.state.sumSpouseCheck == false ? React.createElement(
                  "div",
                  { className: "row" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size text-center col-sm",
                      htmlFor: "applicantConyuge"
                    },
                    "Conyuge"
                  ),
                  React.createElement(
                    "label",
                    { className: "font-size col-lg-" },
                    "(M\xE1ximo ",
                    this.state.sumSpouseMax,
                    ")"
                  )
                ) : React.createElement(
                  "label",
                  {
                    className: "font-size text-center",
                    htmlFor: "applicantConyuge"
                  },
                  "Conyuge"
                )
              )
            ) : "",
            grpHijM ? React.createElement(
              "div",
              { className: "ml-5 d-flex justify-content-left" },
              React.createElement(
                "div",
                { className: "col-md-2" },
                React.createElement(NumericInput, {
                  id: "applicantHijos",
                  name: "sumSons",
                  min: "0",
                  max: "6",
                  className: "input-background-color form-control input-size",
                  onClickEvent: this.checkMaximo,
                  valueProps: this.state.sumSons,
                  passProps: true
                })
              ),
              React.createElement(
                "span",
                null,
                this.state.sumSonsCheck == false ? React.createElement(
                  "div",
                  { className: "row" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size text-center col-sm",
                      htmlFor: "applicantHijos"
                    },
                    "Hijos menores de 25 a\xF1os"
                  ),
                  React.createElement(
                    "label",
                    { className: "font-size col-lg-" },
                    "(M\xE1ximo ",
                    this.state.sumSonsMax,
                    ")"
                  )
                ) : React.createElement(
                  "label",
                  {
                    className: "font-size text-center",
                    htmlFor: "applicantHijos"
                  },
                  "Hijos menores de 25 a\xF1os"
                )
              )
            ) : "",
            grpPaSu ? React.createElement(
              "div",
              { className: "ml-5 d-flex justify-content-left" },
              React.createElement(
                "div",
                { className: "col-md-2" },
                React.createElement(NumericInput, {
                  id: "applicantParent",
                  name: "sumParent",
                  className: "input-background-color form-control input-size",
                  min: "0",
                  max: "4",
                  onClickEvent: this.checkMaximo,
                  valueProps: this.state.sumParent,
                  passProps: true
                })
              ),
              React.createElement(
                "span",
                null,
                this.state.sumParentCheck == false ? React.createElement(
                  "div",
                  { className: "row" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size text-center col-sm",
                      htmlFor: "applicantParent"
                    },
                    "Padres y Suegros"
                  ),
                  React.createElement(
                    "label",
                    { className: "font-size col-lg-" },
                    "(M\xE1ximo ",
                    this.state.sumParentMax,
                    ")"
                  )
                ) : React.createElement(
                  "label",
                  {
                    className: "font-size text-center",
                    htmlFor: "applicantParent"
                  },
                  "Padres y Suegros"
                )
              )
            ) : "",
            React.createElement(
              "div",
              { className: "ml-5 d-flex justify-content-left" },
              React.createElement(
                "div",
                { className: "col-md-2" },
                React.createElement(InputValidation, {
                  ref: this.referencies.applicantTotal,
                  classNameAd: "hide",
                  id: "applicantTotal",
                  name: "applicantTotal",
                  minLength: "1",
                  maxLength: "11",
                  value: this.state.total,
                  className: "input-background-color form-control input-size",
                  formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
                  onResult: this._handleResults,
                  upperCase: true,
                  disabled: !readOnly
                })
              ),
              React.createElement(
                "label",
                {
                  className: "font-size text-center",
                  htmlFor: "applicantTotal"
                },
                React.createElement(
                  "b",
                  null,
                  "Total Asegurable"
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
                  React.createElement(
                    "div",
                    { className: "d-flex mt-3 mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Prima mensual por persona: "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      this.props.listPoliza.MONENCOD === 1 ? "$ " + this.state.bonusMonthly.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : this.props.listPoliza.MONENCOD === 2 ? "U$S " + this.state.bonusMonthly.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "d-flex mb-3 justify-content" },
                    React.createElement(
                      "b",
                      { className: "col-6" },
                      "Prima mensual para el total de asegurables: "
                    ),
                    React.createElement(
                      "p",
                      { className: "col-5 col-md-2 p-0 text-right" },
                      this.props.listPoliza.MONENCOD === 1 ? "$ " + (this.state.bonusMonthly * this.state.total).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : this.props.listPoliza.MONENCOD === 2 ? "U$S " + (this.state.bonusMonthly * this.state.total).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : ""
                    )
                  )
                )
              )
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this._getTotalParentescos();

        if (this.props.formInfo.applicantConyuge != undefined) {
          if (this.props.formInfo.applicantConyuge != 0) {
            this.state.sumSpouse = this.props.formInfo.applicantConyuge;
          }
        } else {
          // this.state.sumSpouse=""
        }

        if (this.props.formInfo.applicantHijos != undefined) {
          if (this.props.formInfo.applicantHijos != 0) {
            this.state.sumSons = this.props.formInfo.applicantHijos;
          }
        } else {}

        if (this.props.formInfo.applicantParent != undefined) {
          if (this.props.formInfo.applicantParent != 0) {
            this.state.sumParent = this.props.formInfo.applicantParent;
          }
        }
      }
    }]);

    return BonusBurial;
  }(React.Component);

  return BonusBurial;
});