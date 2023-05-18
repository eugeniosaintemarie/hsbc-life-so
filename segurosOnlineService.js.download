'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './baseService'], function (React, ReactDOM, BaseService) {
    var SegurosOnlineService = function (_BaseService) {
        _inherits(SegurosOnlineService, _BaseService);

        function SegurosOnlineService() {
            _classCallCheck(this, SegurosOnlineService);

            return _possibleConstructorReturn(this, (SegurosOnlineService.__proto__ || Object.getPrototypeOf(SegurosOnlineService)).apply(this, arguments));
        }

        _createClass(SegurosOnlineService, [{
            key: 'getProductosClientes',
            value: function getProductosClientes(param) {
                return this.call('POST', 'Inicio/getProductosClientes', param, 'JSON', true);
            }
        }, {
            key: 'getBuscarClientes',
            value: function getBuscarClientes(param) {
                return this.call('POST', 'Inicio/buscarClientes', param, 'JSON', true);
            }
        }, {
            key: 'getRecuperarNominaEmpleados',
            value: function getRecuperarNominaEmpleados(param) {
                return this.call('POST', 'Inicio/recuperarNominaEmpleados', param, 'JSON', true);
            }
        }, {
            key: 'getDetalleRiesgo',
            value: function getDetalleRiesgo(param) {
                return this.call('POST', 'Inicio/detalleRiesgo', param, 'JSON', true);
            }
        }, {
            key: 'getBanners',
            value: function getBanners(param) {
                return this.call('POST', 'Publicador/getBanners', param, 'JSON', true);
            }
        }, {
            key: 'getDestacados',
            value: function getDestacados(param) {
                return this.call('POST', 'Publicador/getDestacados', param, 'JSON', true);
            }
        }, {
            key: 'getPolizasPorEmail',
            value: function getPolizasPorEmail(param) {
                return this.call('POST', 'ImpresosPorEmail/polizasPorEmail', param, 'JSON', true);
            }
        }, {
            key: 'getProcesarImpresosPorEmail',
            value: function getProcesarImpresosPorEmail(param) {
                return this.call('POST', 'ImpresosPorEmail/procesarImpresosPorEmail', param, 'JSON', true);
            }
        }, {
            key: 'getObtenerPregResp',
            value: function getObtenerPregResp(param) {
                return this.call('POST', 'MisDatos/obtenerPregResp', param, 'JSON', true);
            }
        }, {
            key: 'getObtenerPreguntas',
            value: function getObtenerPreguntas() {
                return this.call('POST', 'MisDatos/obtenerPreguntas', {}, 'JSON', true);
            }
        }, {
            key: 'sendActualizarDatos',
            value: function sendActualizarDatos(param) {
                return this.call('POST', 'MisDatos/actualizarDatos', param, 'JSON', true);
            }
        }, {
            key: 'sendActualizarContrasenia',
            value: function sendActualizarContrasenia(param) {
                return this.call('POST', 'MisDatos/actualizarContrasenia', param, 'JSON', true, 'TEXT');
            }
        }, {
            key: 'getDetalleEndoso',
            value: function getDetalleEndoso(param) {
                return this.call('POST', 'Impresos/detalleEndoso', param, 'JSON', true);
            }
        }, {
            key: 'getNominas',
            value: function getNominas(param) {
                return this.call('POST', 'NominaDeAsegurados/consultaNominas', param, 'JSON', true);
            }
        }, {
            key: 'getImprimirCertificadoAsegurados',
            value: function getImprimirCertificadoAsegurados(param) {
                return this.call('POST', 'NominaDeAsegurados/imprimirCertificado', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getImprimirAltasTempranas',
            value: function getImprimirAltasTempranas(param) {
                return this.call('POST', 'NominaDeAsegurados/impAltasTempranas', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getImprimirCertificadoRetiroSemestral',
            value: function getImprimirCertificadoRetiroSemestral(param) {
                return this.call('POST', 'Impresos/imprimirCertificadoRetiroSemestral', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getImprimirCertificado',
            value: function getImprimirCertificado(param) {
                return this.call('POST', 'Impresos/imprimirCertificado', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getimprimirCertIncorp',
            value: function getimprimirCertIncorp(param) {
                return this.call('POST', 'Impresos/imprimirCertIncorp', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getimprimirConstCobertura',
            value: function getimprimirConstCobertura(param) {
                return this.call('POST', 'Impresos/imprimirConstCobertura', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getImpresosPeriodos',
            value: function getImpresosPeriodos(param) {
                return this.call('POST', 'Impresos/impresosPeriodos', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getGridContent',
            value: function getGridContent(param) {
                return this.call('POST', 'SituacionCobranza/getGridContent', param, 'JSON', true);
            }
        }, {
            key: 'getSiniestros',
            value: function getSiniestros(param) {
                return this.call('POST', 'Siniestros/obtenerSiniestros', param, 'JSON', true);
            }
        }, {
            key: 'getDestacado',
            value: function getDestacado(param) {
                return this.call('POST', 'Publicador/getDestacado', param, 'JSON', true);
            }
        }, {
            key: 'getPDF',
            value: function getPDF(param) {
                return this.call('POST', 'SituacionCobranza/getPDF', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getCargarDatos',
            value: function getCargarDatos(param) {
                return this.call('POST', 'saldos/cargarDatos', param, 'JSON', true);
            }
        }, {
            key: 'getTiposDocumento',
            value: function getTiposDocumento(param) {
                return this.call('POST', 'getTiposDocumento', param, 'JSON', true);
            }
        }, {
            key: 'getSitioHab',
            value: function getSitioHab(param) {
                return this.call('POST', 'getSitioHab', param, 'JSON', true);
            }
        }, {
            key: 'getObtenerIdentificador',
            value: function getObtenerIdentificador(param) {
                return this.call('POST', 'app/pages/obtenerIdentificador', param);
            }
        }, {
            key: 'getLoggedUser',
            value: function getLoggedUser(param) {
                return this.call('POST', 'app/pages/loggedUser', param);
            }
        }, {
            key: 'getDetPrimas',
            value: function getDetPrimas(param) {
                return this.call('POST', 'Impresos/detPrimas', param, 'JSON', true);
            }
        }, {
            key: 'sendContacto',
            value: function sendContacto(param) {
                return this.call('POST', 'Contacto/enviar', param, 'JSON', true);
            }
        }, {
            key: 'get1551_RescatesMov999',
            value: function get1551_RescatesMov999(param) {
                return this.call('POST', 'RescateParcial/getRescatesMov999', param, 'JSON', true);
            }
        }, {
            key: 'get1552_Ajustes999',
            value: function get1552_Ajustes999(param) {
                return this.call('POST', 'RescateParcial/1552_Ajustes999', param, 'JSON', true);
            }
        }, {
            key: 'P_NBWS_ClienteSuscripto',
            value: function P_NBWS_ClienteSuscripto(param) {
                return this.call('POST', 'RescateParcial/getClienteSuscripto', param, 'JSON', true);
            }
        }, {
            key: 'get1133_CliNegativizados',
            value: function get1133_CliNegativizados(param) {
                return this.call('POST', 'RescateParcial/getClientesNegativizados', param, 'JSON', true);
            }
        }, {
            key: 'getDatosFinancieros',
            value: function getDatosFinancieros() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'endoso/getDatosFinancieros', param, 'JSON', true);
            }
        }, {
            key: 'getComprobanteDePago',
            value: function getComprobanteDePago(param) {
                return this.call('POST', 'SituacionCobranza/getComprobanteDePago', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getRetrieveAccountOwnerInformation',
            value: function getRetrieveAccountOwnerInformation(param) {
                return this.call('POST', 'Endosos/getDatosFinancieros', param, 'JSON', true);
            }
        }, {
            key: 'getRecupClixPol',
            value: function getRecupClixPol(param) {
                return this.call('POST', 'RescateParcial/getRecupClixPol', param, 'JSON', true);
            }
        }, {
            key: 'verificarCodigo',
            value: function verificarCodigo(param) {
                return this.call('POST', 'RescateParcial/verificarCodigo', param, 'JSON', true);
            }
        }, {
            key: 'getInfoTitularCuenta',
            value: function getInfoTitularCuenta(param) {
                return this.call('POST', 'RescateParcial/getInfoTitularCuenta', param, 'JSON', true);
            }
        }, {
            key: 'grabarRescate3100',
            value: function grabarRescate3100(param) {
                return this.call('POST', 'RescateParcial/grabarRescate3100', param, 'JSON', true);
            }
        }, {
            key: 'generarOrdenDePago3401',
            value: function generarOrdenDePago3401(param) {
                return this.call('POST', 'RescateParcial/generarOrdenDePago3401', param, 'JSON', true);
            }
        }, {
            key: 'generarAutorizacionPago3114',
            value: function generarAutorizacionPago3114(param) {
                return this.call('POST', 'RescateParcial/generarAutorizacionPago3114', param, 'JSON', true);
            }
        }, {
            key: 'getOpRescateArchivoCabecera',
            value: function getOpRescateArchivoCabecera(param) {
                return this.call('POST', 'RescateParcial/getOpRescateArchivoCabecera', param, 'JSON', true);
            }
        }, {
            key: 'getOpRescateArchivo',
            value: function getOpRescateArchivo(param) {
                return this.call('POST', 'RescateParcial/getOpRescateArchivo', param, 'JSON', true);
            }
        }, {
            key: 'envioCodigoVerificacion',
            value: function envioCodigoVerificacion(param) {
                return this.call('POST', 'RescateParcial/envioCodigoVerificacion', param, 'JSON', true);
            }
        }, {
            key: 'recuperarPassword',
            value: function recuperarPassword(param) {
                return this.call('POST', 'RecuperarPassword/recuperarPassword', param, 'JSON', true);
            }
        }, {
            key: 'recuperarPassUsuNom',
            value: function recuperarPassUsuNom(param) {
                return this.call('POST', 'RecuperarPassword/recPassUsuNom', param, 'JSON', true);
            }
        }, {
            key: 'obtenerPregunta',
            value: function obtenerPregunta(param) {
                return this.call('POST', 'RecuperarPassword/obtenerPregunta', param, 'JSON', true);
            }
        }, {
            key: 'registrarUsuario',
            value: function registrarUsuario(param) {
                //
                return this.call('POST', 'Registro/registrarUsuario', param, 'JSON', true);
            }
        }, {
            key: 'analizarCAI',
            value: function analizarCAI(param) {
                return this.call('POST', 'Login/analizarCAI', param, 'JSON', true);
            }
        }, {
            key: 'getPoliza',
            value: function getPoliza(param) {
                return this.call('POST', 'RescateParcial/getPoliza', param, 'JSON', true);
            }
        }, {
            key: 'recuperarBeneficiarios',
            value: function recuperarBeneficiarios(param) {
                return this.call('POST', 'ddben/recuperarBeneficiarios', param, 'JSON', true);
            }
        }, {
            key: 'getListaDesignacionDeBenef',
            value: function getListaDesignacionDeBenef(param) {
                return this.call('POST', 'ddben/getListaDesignacionDeBenef', param, 'JSON', true);
            }
        }, {
            key: 'getListaDesigBenefNoVal',
            value: function getListaDesigBenefNoVal(param) {
                return this.call('POST', 'ddben/getListaDesigBenefNoVal', param, 'JSON', true);
            }
        }, {
            key: 'envioBenefNomina',
            value: function envioBenefNomina(param) {
                return this.call('POST', 'ddben/envioBenefNomina', param, 'JSON', true);
            }
        }, {
            key: 'enviarMail',
            value: function enviarMail(param) {
                return this.call('POST', 'ddben/enviarMail', param, 'JSON', true);
            }
        }, {
            key: 'validarUsuario',
            value: function validarUsuario(param) {
                return this.call('POST', 'ddben/validarUsuario', param, 'JSON', true);
            }
        }, {
            key: 'designarBeneficiario',
            value: function designarBeneficiario(param) {
                return this.call('POST', 'ddben/designarBeneficiario', param, 'JSON', true);
            }
        }, {
            key: 'enviarBeneficiarioFileRepo',
            value: function enviarBeneficiarioFileRepo() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'ddben/enviarBeneficiarioFileRepo', param, 'JSON', true);
            }
        }, {
            key: 'envioCodigoVerificacion',
            value: function envioCodigoVerificacion() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'ddben/envioCodigoVerificacion', param, 'JSON', true);
            }
        }, {
            key: 'verificarCodigo',
            value: function verificarCodigo() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'ddben/verificarCodigo', param, 'JSON', true);
            }
        }, {
            key: 'getPolXEmailMasivo',
            value: function getPolXEmailMasivo(param) {
                return this.call('POST', 'Inicio/getPolXEmailMasivo', param, 'JSON', true);
            }
        }, {
            key: 'setPolXEmailMasivo',
            value: function setPolXEmailMasivo(param) {
                return this.call('POST', 'Inicio/setPolXEmailMasivo', param, 'JSON', true);
            }
        }, {
            key: 'procesarImpresosMasivo',
            value: function procesarImpresosMasivo(param) {
                return this.call('POST', 'ImpresosPorEmail/procesarImpresosMasivo', param, 'JSON', true);
            }
        }, {
            key: 'getPEPLowRisk',
            value: function getPEPLowRisk(param) {
                return this.call('POST', 'Inicio/getPEPLowRisk', param, 'JSON', true);
            }
        }, {
            key: 'setPEPLowRisk',
            value: function setPEPLowRisk(param) {
                return this.call('POST', 'Inicio/setPEPLowRisk', param, 'JSON', true);
            }
        }, {
            key: 'getActividades',
            value: function getActividades(param) {
                return this.call('POST', 'Inicio/getActividades', param, 'JSON', true);
            }
        }, {
            key: 'getBuscarPrecarga',
            value: function getBuscarPrecarga(param) {
                return this.call('POST', 'Inicio/buscarPrecarga', param, 'JSON', true);
            }
        }, {
            key: 'getFormularioTomador',
            value: function getFormularioTomador(param) {
                return this.call('POST', 'ddben/getFormularioTom', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getFormularioAsegurado',
            value: function getFormularioAsegurado(param) {
                return this.call('POST', 'ddben/getFormularioAse', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'getFormularioTomVida',
            value: function getFormularioTomVida(param) {
                return this.call('POST', 'vidaColectivo/getFormularioTom', param, 'JSON', true, 'BLOB');
            }
        }, {
            key: 'cambiarEst',
            value: function cambiarEst(param) {
                return this.call('POST', 'ddben/cambiarEst', param, 'JSON', true);
            }
        }, {
            key: 'getMotivosBaja',
            value: function getMotivosBaja(param) {
                return this.call('POST', 'SolBaj/getMotivosBaja', param, 'JSON', true);
            }
        }, {
            key: 'setSolicitudBaja',
            value: function setSolicitudBaja(param) {
                return this.call('POST', 'SolBaj/setSolicitudBaja', param, 'JSON', true);
            }
        }]);

        return SegurosOnlineService;
    }(BaseService);

    return SegurosOnlineService;
});