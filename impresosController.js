var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', '../lib/utils', "../common/fileManager", "../services/segurosOnlineService"], function (React, Utils, FileManager, SegurosOnlineService) {
    var ImpresosController = function (_React$Component) {
        _inherits(ImpresosController, _React$Component);

        function ImpresosController() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, ImpresosController);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImpresosController.__proto__ || Object.getPrototypeOf(ImpresosController)).call.apply(_ref, [this].concat(args))), _this), _this.totalBadCalls = 0, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(ImpresosController, [{
            key: 'getImpresoPeriodo',
            value: function getImpresoPeriodo(periodo, param) {
                var _this2 = this;

                var segurosOnlineService = new SegurosOnlineService();

                // Obtengo la fecha de periodo
                var arrayFecha = periodo.split("-");

                // Le doy el formato que corresponde
                var periodoFecha = arrayFecha[2] + arrayFecha[1] + arrayFecha[0];

                var mkMensajeError = function mkMensajeError(num, service, json) {
                    return function mensajeError() {
                        if (num == 4) {
                            DialogUtils.createWarningDialog("", "Por favor, intente nuevamente.").show();
                        } else {
                            Utils.imprimirPDF(json, service, "Semestral.pdf", mkMensajeError(num + 1, service, json));
                        }
                    };
                };

                if (param.TIPOPRODU) {
                    if (param.TIPOPRODU == "") { // Antes (param.TIPOPRODU == "R" || param.TIPOPRODU == "O")
                        segurosOnlineService.getImprimirCertificadoRetiroSemestral({
                            "PERIODO": periodoFecha,
                            "RAMOPCOD": param.RAMOPCOD,
                            "POLIZANN": param.POLIZANN,
                            "POLIZSEC": param.POLIZSEC,
                            "CERTIPOL": param.CERTIPOL,
                            "CERTIANN": param.CERTIANN,
                            "CERTISEC": param.CERTISEC,
                            "CIAASCOD": param.CIAASCOD
                        }).then(function (data) {
                            if (data && data instanceof Blob && data.size > 0) {
                                _this2.downloadPDF(data, periodoFecha);
                            } else {
                                $(document).trigger("ErrorImpresos", 'No data');
                            }
                        }).catch(function (ex) {
                            $(document).trigger("ErrorImpresos", 'No data');
                        });
                    } else {
                        segurosOnlineService.getImpresosPeriodos({
                            "periodo": periodoFecha,
                            "poliza": {
                                "TIPOPRODU": param.TIPOPRODU,
                                "RAMOPCOD": param.RAMOPCOD,
                                "POLIZANN": param.POLIZANN,
                                "POLIZSEC": param.POLIZSEC,
                                "CERTIPOL": param.CERTIPOL,
                                "CERTIANN": param.CERTIANN,
                                "CERTISEC": param.CERTISEC,
                                "CIAASCOD": param.CIAASCOD
                            }
                        }).then(function (data) {
                            if (data && data instanceof Blob && data.size > 0) {
                                _this2.downloadPDF(data, periodoFecha);
                            } else {
                                _this2.replyImpresosPeriodos(periodo, param);
                            }
                        }).catch(function (ex) {
                            _this2.replyImpresosPeriodos(periodo, param);
                        });;
                    }
                } else {
                    if (param.RAMOPCOD.substr(0, 1) == "R") {
                    	segurosOnlineService.getImpresosPeriodos({
                            "periodo": periodoFecha,
                            "poliza": {
                                "TIPOPRODU": "O",
                                "RAMOPCOD": param.RAMOPCOD,
                                "POLIZANN": param.POLIZANN,
                                "POLIZSEC": param.POLIZSEC,
                                "CERTIPOL": param.CERTIPOL,
                                "CERTIANN": param.CERTIANN,
                                "CERTISEC": param.CERTISEC,
                                "CIAASCOD": param.CIAASCOD
                            }
                        }).then(function (data) {
                            if (data && data instanceof Blob && data.size > 0) {
                                _this2.downloadPDF(data, periodoFecha);
                            } else {
                                _this2.replyImpresosPeriodos(periodo, param);
                            }
                        }).catch(function (ex) {
                            _this2.replyImpresosPeriodos(periodo, param);
                        });;
                    }
                }
            }
        }, {
            key: 'replyImpresosPeriodos',
            value: function replyImpresosPeriodos(periodo, param) {

                if (this.totalBadCalls < 2) {
                    this.getImpresoPeriodo(periodo, param);
                    this.totalBadCalls++;
                } else {
                    $(document).trigger("ErrorImpresos", 'No data');
                    this.totalBadCalls = 0;
                }
            }
        }, {
            key: 'downloadPDF',
            value: function downloadPDF(data, periodoFecha) {
                var fileManager = new FileManager();

                fileManager.downloadPDF(data, "Semestral-" + periodoFecha + ".pdf");
            }
        }]);

        return ImpresosController;
    }(React.Component);

    return ImpresosController;
});