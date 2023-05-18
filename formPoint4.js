var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./beneficiary/ddbenCrudMenu", "../../common/dropdownContent"], function (React, DdbenCrudMenu, DropDownContent) {
  var FormPoint4 = function (_React$Component) {
    _inherits(FormPoint4, _React$Component);

    function FormPoint4(props) {
      _classCallCheck(this, FormPoint4);

      var _this = _possibleConstructorReturn(this, (FormPoint4.__proto__ || Object.getPrototypeOf(FormPoint4)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      _this._handleResultTable = function (list, validation) {
        _this.props.onResults("listBenef", { list: list, isValidate: validation });
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$beneficiaryType = _ref.beneficiaryType,
          beneficiaryType = _ref$beneficiaryType === undefined ? "" : _ref$beneficiaryType;

      _this.state = {
        beneficiaryType: { id: beneficiaryType, value: "", required: true }
      };
      _this.referencies = {
        beneficiaryType: React.createRef()
      };
      return _this;
    }

    _createClass(FormPoint4, [{
      key: "render",
      value: function render() {
        var readOnly = this.props.readOnly;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            { className: "form-row form-height mb-2" },
            React.createElement(
              "div",
              {
                className: "form-group col-12 text-center",
                style: { maxWidth: "40%", margin: "auto" }
              },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorTypeDoc"
                },
                "Tipo de Beneficiarios"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.beneficiaryType,
                list: [{ id: "1", name: "HEREDEROS LEGALES" }, { id: "2", name: "DESIGNACIÓN DE BENEFICIARIOS" }],
                className: "input-background-color form-control input-size",
                id: "beneficiaryType",
                name: "beneficiaryType",
                typeValue: "id",
                defaultValue: this.state.beneficiaryType.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.beneficiaryType.id == "2" ? React.createElement(DdbenCrudMenu, {
            applicantData: this.props.applicantData,
            product: this.props.product,
            handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary,
            user: this.props.user,
            onResults: this._handleResultTable,
            beneficiaryList: this.props.formInfo.beneficiaryList,
            readOnly: readOnly
          }) : ""
        );
      }
    }]);

    return FormPoint4;
  }(React.Component);

  return FormPoint4;
});