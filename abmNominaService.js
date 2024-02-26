'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './baseService'], function (React, ReactDOM, BaseService) {
    var AbmNominaService = function (_BaseService) {
        _inherits(AbmNominaService, _BaseService);

        function AbmNominaService() {
            _classCallCheck(this, AbmNominaService);

            return _possibleConstructorReturn(this, (AbmNominaService.__proto__ || Object.getPrototypeOf(AbmNominaService)).apply(this, arguments));
        }

        _createClass(AbmNominaService, [{
            key: 'traerCondicionesPoliza',
            value: function traerCondicionesPoliza(param) {
                return this.call('POST', 'NominaDeAsegurados/traerCondicionesPoliza', param, 'JSON', true);
            }
        }, {
            key: 'traerNumeroCotizacionColectivo',
            value: function traerNumeroCotizacionColectivo(param) {
                return this.call('POST', 'NominaDeAsegurados/traerNumeroCotizacionColectivo', param, 'JSON', true);
            }
        }, {
            key: 'enviarNomina',
            value: function enviarNomina(param) {
                return this.call('POST', 'NominaDeAsegurados/enviarNomina', param, 'JSON', true);
            }
        }, {
            key: 'logAltasTempranas',
            value: function logAltasTempranas(param) {
                return this.call('POST', 'NominaDeAsegurados/logAltasTempranas', param, 'JSON', true);
            }
        }, {
            key: 'getImprimirAltasTempranas',
            value: function getImprimirAltasTempranas(param) {
                return this.call('POST', 'NominaDeAsegurados/impAltasTempranas', param, 'JSON', true);
            }
        }, {
            key: 'validarNomina',
            value: function validarNomina(param) {
                return this.call('POST', 'NominaDeAsegurados/validarNomina', param, 'JSON', true);
            }
        }, {
            key: 'recuperoNomina',
            value: function recuperoNomina(param) {
                return this.call('POST', 'NominaDeAsegurados/recuperoNomina', param, 'JSON', true);
            }
        }, {
            key: 'controlNominas',
            value: function controlNominas(param) {
                return this.call('POST', 'NominaDeAsegurados/controlNominas', param, 'JSON', true);
            }
        }, {
            key: 'getActividadesColectivo',
            value: function getActividadesColectivo(param) {
                return this.call('POST', 'NominaDeAsegurados/getActividadesColectivo', param, 'JSON', true);
            }
        }, {
            key: 'consultaEnviadas',
            value: function consultaEnviadas(param) {
                return this.call('POST', 'NominaDeAsegurados/consultaEnviadas', param, 'JSON', true);
            }
        }, {
            key: 'detalleEnviadas',
            value: function detalleEnviadas(param) {
                return this.call('POST', 'NominaDeAsegurados/detalleEnviadas', param, 'JSON', true);
            }
        }, {
            key: 'getEmailEnvio',
            value: function getEmailEnvio(param) {
                return this.call('POST', 'NominaDeAsegurados/getEmailEnvio', param, 'JSON', true);
            }
        }, {
            key: 'enviarEmail',
            value: function enviarEmail(param) {
                return this.call('POST', 'NominaDeAsegurados/enviarEmail', param, 'JSON', true);
            }
        }, {
            key: 'getPolDispABM',
            value: function getPolDispABM(param) {
                return this.call('POST', 'NominaDeAsegurados/getPolDispABM', param, 'JSON', true);
            }
        }]);

        return AbmNominaService;
    }(BaseService);

    ;

    return AbmNominaService;
});