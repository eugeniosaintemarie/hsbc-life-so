var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./ingresarNomina", "./nominaCompletaStep1", "./nominaCompletaStep2", "./nominaIndividualStep1", "./payrollLoadFail", "../../common/loader"], function (React, IngresarNomina, NominaCompletaStep1, NominaCompletaStep2, NominaIndividualStep1, PayrollLoadFail, Loader) {
  var AbmNominaMain = function (_React$Component) {
    _inherits(AbmNominaMain, _React$Component);

    function AbmNominaMain(props) {
      _classCallCheck(this, AbmNominaMain);

      var _this = _possibleConstructorReturn(this, (AbmNominaMain.__proto__ || Object.getPrototypeOf(AbmNominaMain)).call(this, props));

      _this._saveGroup = function (fecha, codigo, desc) {
        _this.setState({
          group: {
            fecvig: fecha,
            grupocod: codigo,
            grupodes: desc
          }
        });
      };

      _this._handleSwitch = function (view) {
        view == "home" ? _this.props.handleShowAbmNomina() : _this.setState({ currentView: view });
      };

      _this._startLoading = function () {
        _this.setState({
          loaderActive: true,
          loaderCount: _this.state.loaderCount + 1
        });
      };

      _this._stopLoading = function () {
        _this.setState({
          loaderCount: _this.state.loaderCount - 1
        });
        if (_this.state.loaderCount == 0) {
          _this.setState({ loaderActive: false });
        }
      };

      _this._handleCamposNomina = function (campos) {
        _this.setState({
          camposNomina: campos
        });
      };

      _this._handlePayrollErrorValidation = function (errorType) {
        _this.setState({
          currentView: "payrollLoadFail",
          payrollErrorValidation: errorType
        });
      };

      _this._caseForm = function () {
        var currentView = _this.state.currentView;


        switch (currentView) {
          case "main":
            return React.createElement(IngresarNomina, {
              "switch": _this._handleSwitch,
              startLoading: _this._startLoading,
              stopLoading: _this._stopLoading,
              saveGroupData: _this._saveGroup
            });
          case "nominaCompleta":
            return React.createElement(NominaCompletaStep1, {
              camposNomina: _this._handleCamposNomina,
              "switch": _this._handleSwitch,
              payrollInError: _this._handlePayrollErrorValidation,
              startLoading: _this._startLoading,
              stopLoading: _this._stopLoading,
              grupo: _this.state.group
            });
          case "nominaCompleta2":
            return React.createElement(NominaCompletaStep2, {
              camposNomina: _this.state.camposNomina,
              "switch": _this._handleSwitch,
              startLoading: _this._startLoading,
              stopLoading: _this._stopLoading,
              grupo: _this.state.group,
              product: _this.props.product,
              user: _this.props.user
            });
          case "nominaAbm":
            return React.createElement(NominaIndividualStep1, {
              camposNomina: _this._handleCamposNomina,
              "switch": _this._handleSwitch,
              payrollInError: _this._handlePayrollErrorValidation,
              startLoading: _this._startLoading,
              stopLoading: _this._stopLoading,
              grupo: _this.state.group,
              product: _this.props.product,
              user: _this.props.user
            });
          case "payrollLoadFail":
            return React.createElement(PayrollLoadFail, {
              "switch": _this._handleSwitch,
              typeError: _this.state.payrollErrorValidation
            });
        }
      };

      _this.state = {
        currentView: "main",
        payrollErrorValidation: "",
        loaderActive: false,
        loaderCount: 0,
        camposNomina: [],
        group: {}
      };
      return _this;
    }

    _createClass(AbmNominaMain, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          this.state.loaderActive && React.createElement(Loader, { width: "2rem", height: "2rem", fullscreen: true, text: "Cargando" }),
          this._caseForm()
        );
      }
    }]);

    return AbmNominaMain;
  }(React.Component);

  return AbmNominaMain;
});