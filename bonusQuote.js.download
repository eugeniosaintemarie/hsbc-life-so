var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "./bonus/bonusUniformCapital", "./bonus/bonusCapital", "./bonus/bonusSalary", "../../common/modalReactBootstrap", "../../common/loader"], function (React, Loadsh, BonusUniformCapital, BonusCapital, BonusSalary, Modal, Loader) {
  var BonusQuote = function (_React$Component) {
    _inherits(BonusQuote, _React$Component);

    function BonusQuote(props) {
      _classCallCheck(this, BonusQuote);

      var _this = _possibleConstructorReturn(this, (BonusQuote.__proto__ || Object.getPrototypeOf(BonusQuote)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.props.onResults(id, result);
      };

      _this.handleCheckDdjj = function (poliza, requisito) {
        _this.props.handleCheckDdjj(poliza, requisito);
      };

      _this.state = {
        currentForm: "loader",
        modal: {
          component: "",
          title: "",
          size: "md",
          classAccept: "",
          textBtnAccept: "",
          textBtnCancel: ""
        }
      };
      return _this;
    }

    _createClass(BonusQuote, [{
      key: "render",
      value: function render() {
        var currentForm = this.state.currentForm;

        switch (currentForm) {
          case "bonusSalary":
            return React.createElement(BonusSalary, {
              formInfo: this.props.formInfo,
              handleCheckDdjj: this.handleCheckDdjj,
              data: this.props.data,
              isConyuge: this.props.isConyuge,
              notConyuge: this.props.notConyuge,
              applicantData: this.formData,
              onResults: this._handleResults,
              readOnly: this.props.readOnly,
              listPoliza: this.props.listPoliza
            });
          case "bonusUniformCapital":
            return React.createElement(BonusUniformCapital, {
              formInfo: this.props.formInfo,
              data: this.props.data,
              handleCheckDdjj: this.handleCheckDdjj,
              applicantData: this.formData,
              isConyuge: this.props.isConyuge,
              notConyuge: this.props.notConyuge,
              onResults: this._handleResults,
              readOnly: this.props.readOnly,
              listPoliza: this.props.listPoliza
            });
          case "bonusCapital":
            return React.createElement(BonusCapital, {
              formInfo: this.props.formInfo,
              data: this.props.data,
              handleCheckDdjj: this.handleCheckDdjj,
              isConyuge: this.props.isConyuge,
              notConyuge: this.props.notConyuge,
              applicantData: this.formData,
              onResults: this._handleResults,
              readOnly: this.props.readOnly,
              listPoliza: this.props.listPoliza
            });
          case "loader":
            return React.createElement(
              "div",
              { className: "col-md-11 d-flex justify-content-center" },
              React.createElement(Loader, { width: "4rem", height: "4rem" })
            );

        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.product.TIP_PRO == "MS") {
          this.setState({ currentForm: "bonusSalary" });
        } else if (this.props.product.TIP_PRO == "CU") {
          this.setState({ currentForm: "bonusUniformCapital" });
        } else if (this.props.product.TIP_PRO == "EC") {
          this.setState({ currentForm: "bonusCapital" });
        }
      }
    }]);

    return BonusQuote;
  }(React.Component);

  return BonusQuote;
});