var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./ingresarNomina", "./nominaCompletaStep1", "./nominaCompletaStep2", "./nominaIndividualStep1", "./payrollLoadFail", "./validityErrorScreen", "../../common/loader", "../../controller/vidaColectivoController", "../../controller/nominaController", "../../lib/utils"], function (React, IngresarNomina, NominaCompletaStep1, NominaCompletaStep2, NominaIndividualStep1, PayrollLoadFail, ValidityErrorScreen, Loader, VidaColectivoController, NominaController, Utils) {
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
          loaderCount: _this.state.loaderCount - 1,
          loaderActive: false
        });
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
              saveGroupData: _this._saveGroup,
              optionsDate: _this.state.optionsDate
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
              user: _this.props.user,
              desigBenefEnabled: _this.state.desigBenefEnabled
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
              user: _this.props.user,
              desigBenefEnabled: _this.state.desigBenefEnabled
            });
          case "payrollLoadFail":
            return React.createElement(PayrollLoadFail, {
              "switch": _this._handleSwitch,
              typeError: _this.state.payrollErrorValidation
            });
          case "validityErrorScreen":
            return React.createElement(ValidityErrorScreen, {
              "switch": _this._handleSwitch,
              cobroforError: _this.state.cobroforError
            });
        }
      };

      _this.state = {
        currentView: "main",
        payrollErrorValidation: "",
        loaderActive: false,
        cobroforError: false,
        desigBenefEnabled: null,
        loaderCount: 0,
        camposNomina: [],
        optionsDate: [],
        group: {}
      };

      _this.vidaController = new VidaColectivoController();
      _this.nominaController = new NominaController();
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
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        var currentProduct = this.props.product;
        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        this.vidaController.getDatosPoliza(detalle.POLIZSEC, detalle.POLIZANN, detalle.RAMOPCOD, function (response) {
          if (response !== "ERROR") {
            var dataPoliza = response.Message.DATOS;
            var FECEFESU = dataPoliza.FECEFESU;
            var COBROFOR = dataPoliza.COBROFOR;
            var FEC_HOY = dataPoliza.FEC_HOY;

            var listOptions = [];
            var dateEndoso = 0;
            var dateVigencia = 0;

            if (FECEFESU !== 0 && typeof FECEFESU === "number") {
              var date = Utils.formatPolizaDate(FECEFESU);

              if (COBROFOR === 1) {
                date.setMonth(date.getMonth() + COBROFOR);
                dateEndoso = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: FECEFESU, FECHA: Utils.formatFechaString(FECEFESU) + " - " + Utils.formatFechaString(dateEndoso) });

                date.setMonth(date.getMonth() + COBROFOR);
                dateVigencia = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: dateEndoso, FECHA: Utils.formatFechaString(dateEndoso) + " - " + Utils.formatFechaString(dateVigencia) });
              } else if (COBROFOR === 2 || COBROFOR === 3) {
                var numberDate = Number(FEC_HOY);

                date.setMonth(date.getMonth() + COBROFOR);
                dateEndoso = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: numberDate, FECHA: Utils.formatFechaString(numberDate) + " - " + Utils.formatFechaString(dateEndoso) });

                date.setMonth(date.getMonth() + COBROFOR);
                dateVigencia = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: dateEndoso, FECHA: Utils.formatFechaString(dateEndoso) + " - " + Utils.formatFechaString(dateVigencia) });
              } else if (COBROFOR === 4) {
                var _numberDate = Number(FEC_HOY);

                date.setMonth(date.getMonth() + 6);
                dateEndoso = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: _numberDate, FECHA: Utils.formatFechaString(_numberDate) + " - " + Utils.formatFechaString(dateEndoso) });

                date.setMonth(date.getMonth() + 6);
                dateVigencia = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: dateEndoso, FECHA: Utils.formatFechaString(dateEndoso) + " - " + Utils.formatFechaString(dateVigencia) });
              } else if (COBROFOR === 5) {
                var _numberDate2 = Number(FEC_HOY);

                date.setMonth(date.getMonth() + 12);
                dateEndoso = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: _numberDate2, FECHA: Utils.formatFechaString(_numberDate2) + " - " + Utils.formatFechaString(dateEndoso) });

                date.setMonth(date.getMonth() + 12);
                dateVigencia = Utils.formatDateToNumber(date);

                listOptions.push({ FECEFESU: dateEndoso, FECHA: Utils.formatFechaString(dateEndoso) + " - " + Utils.formatFechaString(dateVigencia) });
              } else if (COBROFOR === 6) {
                _this2.setState({
                  cobroforError: true,
                  currentView: "validityErrorScreen"
                });
              } else {
                _this2.setState({
                  cobroforError: true,
                  currentView: "validityErrorScreen"
                });
              }
            } else {
              _this2.setState({
                cobroforError: false,
                currentView: "validityErrorScreen"
              });
            }

            _this2.setState({
              optionsDate: listOptions
            });

            _this2.nominaController.validateDesigBenef("222222222", function (res) {
              if (res.VALIDACION === "NODESIGNA") {
                _this2.setState({
                  desigBenefEnabled: false
                });
              } else {
                _this2.setState({
                  desigBenefEnabled: true
                });
              }
            }, detalle);
          }
        });
      }
    }]);

    return AbmNominaMain;
  }(React.Component);

  return AbmNominaMain;
});