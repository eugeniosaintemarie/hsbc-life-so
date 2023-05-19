'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './baseService'], function (React, ReactDOM, BaseService) {
    var RetiroNominaService = function (_BaseService) {
        _inherits(RetiroNominaService, _BaseService);

        function RetiroNominaService() {
            _classCallCheck(this, RetiroNominaService);

            return _possibleConstructorReturn(this, (RetiroNominaService.__proto__ || Object.getPrototypeOf(RetiroNominaService)).apply(this, arguments));
        }

        _createClass(RetiroNominaService, [{
            key: 'recuperarNominaEmpleados',
            value: function recuperarNominaEmpleados(param) {
                return this.call('POST', 'RetCol/recuperarNominaEmpleados', param, 'JSON', true);
            }
        }, {
            key: 'grabarNominaEmpleados',
            value: function grabarNominaEmpleados(param) {
                return this.call('POST', 'RetCol/grabarNominaEmpleados', param, 'JSON', true);
            }
        }, {
            key: 'recSol',
            value: function recSol(param) {
                return this.call('POST', 'retiroColectivo/recSol', param, 'JSON', true);
            }
        }, {
            key: 'prefTelPaises',
            value: function prefTelPaises(param) {
                return this.call('POST', 'retiroColectivo/prefTelPaises', param, 'JSON', true);
            }
        }, {
            key: 'deportesActividades',
            value: function deportesActividades(param) {
                return this.call('POST', 'retiroColectivo/deportes_Actividades', param, 'JSON', true);
            }
        }, {
            key: 'paises',
            value: function paises(param) {
                return this.call('POST', 'retiroColectivo/paises', param, 'JSON', true);
            }
        }, {
            key: 'tratamientoTit',
            value: function tratamientoTit(param) {
                return this.call('POST', 'retiroColectivo/tratamientoTit', param, 'JSON', true);
            }
        }, {
            key: 'status',
            value: function status(param) {
                return this.call('POST', 'retiroColectivo/status', param, 'JSON', true);
            }
        }, {
            key: 'guardarSol',
            value: function guardarSol(param) {
                return this.call('POST', 'retiroColectivo/guardarSol', param, 'JSON', true);
            }
        }, {
            key: 'cambiarEstNominaEmpleados',
            value: function cambiarEstNominaEmpleados(param) {
                return this.call('POST', 'RetCol/cambiarEstNominaEmpleados', param, 'JSON', true);
            }
        }, {
            key: 'cabeceraArchivo',
            value: function cabeceraArchivo(param) {
                return this.call('POST', 'retiroColectivo/cabeceraArchivo', param, 'JSON', true);
            }
        }, {
            key: 'guardarArchivo',
            value: function guardarArchivo(param) {
                return this.call('POST', 'retiroColectivo/guardarArchivo', param, 'JSON', true);
            }
        }, {
            key: 'verificarImagenDni',
            value: function verificarImagenDni(param) {
                return this.call('POST', 'retiroColectivo/verificarImagenDni', param, 'JSON', true);
            }
        }, {
            key: 'envioAIS',
            value: function envioAIS(param) {
                return this.call('POST', 'retiroColectivo/envioAIS', param, 'JSON', true);
            }
        }, {
            key: 'generarPdfRetSol',
            value: function generarPdfRetSol(param) {
                return this.call('POST', 'retiroColectivo/generarPdfRetSol', param, 'JSON', true);
            }
        }, {
            key: 'generarPdfFormCrs',
            value: function generarPdfFormCrs(param) {
                return this.call('POST', 'retiroColectivo/generarPdfFormCrs', param, 'JSON', true);
            }
        }, {
            key: 'generarPdfTabletFatca',
            value: function generarPdfTabletFatca(param) {
                return this.call('POST', 'retiroColectivo/generarPdfTabletFatca', param, 'JSON', true);
            }
        }, {
            key: 'generarPdfTabletAddenda',
            value: function generarPdfTabletAddenda(param) {
                return this.call('POST', 'retiroColectivo/generarPdfTabletAddenda', param, 'JSON', true);
            }
        }, {
            key: 'getSucursales',
            value: function getSucursales(param) {
                return this.call('POST', 'vidaColectivo/getSucursales', param, 'JSON', true);
            }
        }, {
            key: 'getActividadesCol',
            value: function getActividadesCol(param) {
                return this.call('POST', 'vidaColectivo/getActividadesCol', param, 'JSON', true);
            }
        }, {
            key: 'getNBWSParamGrl',
            value: function getNBWSParamGrl(param) {
                return this.call('POST', 'RetCol/getNBWSParamGrl', param, 'JSON', true);
            }
        }, {
            key: 'getDatosPoliza',
            value: function getDatosPoliza(param) {
                return this.call('POST', 'VidCol/getDatosPoliza', param, 'JSON', true);
            }
        }, {
            key: 'sendApplication',
            value: function sendApplication(param) {
                return this.call('POST', 'vidaColectivo/enviarSolicitud', param, 'JSON', true);
            }
        }, {
            key: 'getExisteEnNomina',
            value: function getExisteEnNomina(param) {
                return this.call("POST", "VidCol/getExisteEnNomina", param, "JSON", true);
            }
        }, {
            key: 'getPDFFormWeb',
            value: function getPDFFormWeb(param) {
                return this.call("POST", 'vidaColectivo/getFormularioAse', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getValFormaCobro',
            value: function getValFormaCobro(param) {
                return this.call("POST", "vidaColectivo/getValFormaCobro", param, "JSON", true);
            }
        }, {
            key: 'setDesestimarFormWeb',
            value: function setDesestimarFormWeb(param) {
                return this.call("POST", "vidaColectivo/setDesestimarSol", param, "JSON", true);
            }
        }, {
            key: 'getReporteTom',
            value: function getReporteTom(param) {
                return this.call("POST", "VidCol/getReporteTom", param, "JSON", true, 'TEXT');
            }
        }]);

        return RetiroNominaService;
    }(BaseService);

    return RetiroNominaService;
});