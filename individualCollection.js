var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/datepicker", "../../common/inputvalidation", "../../common/dropdownContent"], function (React, DatePicker, InputValidation, DropDownContent) {
  var individualCollection = function (_React$Component) {
    _inherits(individualCollection, _React$Component);

    function individualCollection(props) {
      _classCallCheck(this, individualCollection);

      var _this = _possibleConstructorReturn(this, (individualCollection.__proto__ || Object.getPrototypeOf(individualCollection)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      _this._handleOption = function (e) {
        if (e.target.checked == null || !e.target.checked) {
          _this.setState({ notCheck: !_this.state.notCheck });
          _this._handleResults(e.target.name, { id: 0 });
        } else {
          _this.setState({ notCheck: !_this.state.notCheck });
          _this._handleResults(e.target.name, { id: e.target.id });
        }
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$applicantPayment = _ref.applicantPayment,
          applicantPayment = _ref$applicantPayment === undefined ? "" : _ref$applicantPayment,
          _ref$applicantBrand = _ref.applicantBrand,
          applicantBrand = _ref$applicantBrand === undefined ? "" : _ref$applicantBrand,
          _ref$applicantCardNum = _ref.applicantCardNumber,
          applicantCardNumber = _ref$applicantCardNum === undefined ? "" : _ref$applicantCardNum,
          _ref$applicantDateMon = _ref.applicantDateMonth,
          applicantDateMonth = _ref$applicantDateMon === undefined ? "" : _ref$applicantDateMon,
          _ref$applicantDateYea = _ref.applicantDateYear,
          applicantDateYear = _ref$applicantDateYea === undefined ? "" : _ref$applicantDateYea,
          _ref$applicantOwner = _ref.applicantOwner,
          applicantOwner = _ref$applicantOwner === undefined ? "" : _ref$applicantOwner;

      _this.state = {
        showModal: false,
        loading: false,
        value: "",
        // currentTime:new Date(),
        listTipoMonth: [{ id: "1", name: "01" }, { id: "2", name: "02" }, { id: "3", name: "03" }, { id: "4", name: "04" }, { id: "5", name: "05" }, { id: "6", name: "06" }, { id: "7", name: "07" }, { id: "8", name: "08" }, { id: "9", name: "09" }, { id: "10", name: "10" }, { id: "11", name: "11" }, { id: "12", name: "12" }],
        notCheck: false,
        applicantPayment: {
          id: applicantPayment,
          value: "",
          required: true
        },
        applicantBrand: {
          id: applicantBrand,
          value: "",
          code: "",
          required: true
        },
        applicantCardNumber: {
          id: "",
          value: applicantCardNumber,
          required: true
        },
        applicantDateMonth: {
          id: "",
          value: applicantDateMonth,
          required: true
        },
        applicantDateYear: {
          id: "",
          value: applicantDateYear,
          required: true
        },
        applicantOwner: {
          id: applicantOwner,
          value: "",
          required: true
        }

      };
      _this.referencies = {
        applicantOwner: React.createRef(),
        applicantPayment: React.createRef(),
        applicantBrand: React.createRef(),
        applicantCardNumber: React.createRef(),
        applicantDateMonth: React.createRef(),
        applicantDateYear: React.createRef()
      };
      return _this;
    }

    _createClass(individualCollection, [{
      key: "render",
      value: function render() {
        var readOnly = this.props.readOnly;

        return React.createElement(
          "form",
          { className: "containter" },
          React.createElement(
            "div",
            { className: "form-group col-10 text-center " },
            React.createElement(
              "label",
              {
                className: "font-size-ddben-beneficiary",
                htmlFor: "applicantPayment"
              },
              "Medio del Pago del servicio"
            ),
            React.createElement(DropDownContent, {
              ref: this.referencies.applicantPayment,
              list: this.props.paymentType,
              className: "input-background-color form-control  input-size",
              id: "applicantPayment",
              name: "applicantPayment",
              typeValue: "id",
              value: this.state.applicantPayment.value,
              defaultValue: this.state.applicantPayment.id,
              onResult: this._handleResults,
              disabled: readOnly,
              required: true
            })
          ),
          React.createElement(
            "div",
            { className: "row mt-1" },
            React.createElement(
              "div",
              { className: "col-4 text-center " },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantBrand"
                },
                "Marca"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantBrand,
                list: this.props.brand,
                className: "input-background-color form-control  input-size",
                id: "applicantBrand",
                name: "applicantBrand",
                typeValue: "id",
                idObject: "IDE_TAR",
                nameObject: "DES_TAR",
                codObject: "COD_TAR",
                defaultValue: this.state.applicantBrand.id,
                onResult: this._handleResults,
                disabled: readOnly,
                prefix: true,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "f col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCardNumber"
                },
                "Numero de Tarjeta"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantCardNumber,
                classNameAd: "hide",
                id: "applicantCardNumber",
                name: "applicantCardNumber",
                maxLength: "16",
                value: this.state.applicantCardNumber.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser 16.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                required: true,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "f col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantDateMonth"
                },
                "Mes de Vto."
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DropDownContent, {
                  list: this.state.listTipoMonth,
                  ref: this.referencies.applicantDateMonth,
                  id: "applicantDateMonth",
                  name: "applicantDateMonth",
                  typeValue: "value",
                  defaultValue: this.state.applicantDateMonth.value,
                  placeHolder: "seleccione un mes",
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  required: true,
                  valueIsObject: true
                })
              )
            ),
            React.createElement(
              "div",
              { className: "f col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantDateYear"
                },
                "A\xF1o de Vto."
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DropDownContent, {
                  list: this.props.listTipoYear,
                  ref: this.referencies.applicantDateYear,
                  id: "applicantDateYear",
                  name: "applicantDateYear",
                  typeValue: "value",
                  defaultValue: this.state.applicantDateYear.value == 0 ? "" : this.state.applicantDateYear.value,
                  placeHolder: "selecione un a\xF1o",
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  required: true,
                  valueIsObject: true
                })
              )
            )
          ),
          this.props.validationBrand !== "" ? React.createElement(
            "div",
            { className: "text-danger font-size form-group small" },
            React.createElement("br", null),
            React.createElement(
              "p",
              null,
              this.props.validationBrand
            )
          ) : "",
          React.createElement(
            "div",
            { className: "radio mt-2" },
            React.createElement(
              "label",
              null,
              React.createElement("input", {
                ref: this.referencies.applicantOwner,
                onClick: this._handleOption,
                type: "checkbox",
                id: "1",
                name: "applicantOwner",
                required: true,
                onResult: this._handleResults,
                checked: this.state.notCheck ? true : null
              }),
              "\xA0\xA0\xA0 Declaro ser el titular del medio de pago"
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        // var currentTime = new Date();
        // this.state.listTipoYear.map((element,i)=>{
        //   element.name=currentTime.getFullYear()+i
        // })
        // for(let i=0;i<20;i++){
        //   date.push(currentTime.getFullYear()+i)
        // }
        if (this.props.formInfo.applicantOwner == 1) {
          this.setState({ notCheck: true });
          this._handleResults("applicantOwner", {
            id: 1,
            isValidate: true
          });
        } else {
          this._handleResults("applicantOwner", {
            id: 0,
            isValidate: true
          });
        }
        if (this.props.formInfo.applicantPayment == "TC") {
          this._handleResults("applicantPayment", {
            id: "TC",
            value: "TARJETA DE CREDITO",
            required: true
          });
        }
      }
    }]);

    return individualCollection;
  }(React.Component);

  return individualCollection;
});