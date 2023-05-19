'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './baseService', "../lib/utils", "../redux/store"], function (React, ReactDOM, BaseService, Utils, Store) {
    var EndososService = function (_BaseService) {
        _inherits(EndososService, _BaseService);

        function EndososService() {
            _classCallCheck(this, EndososService);

            return _possibleConstructorReturn(this, (EndososService.__proto__ || Object.getPrototypeOf(EndososService)).apply(this, arguments));
        }

        _createClass(EndososService, [{
            key: 'getConsultaEndosos',
            value: function getConsultaEndosos() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getConsultaEndosos', param, 'JSON', true);
            }
        }, {
            key: 'getAltaEndoso',
            value: function getAltaEndoso() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getAltaEndosos', param, 'JSON', true);
            }
        }, {
            key: 'getConsEndoso',
            value: function getConsEndoso() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getConsEndoso', param, 'JSON', true);
            }
        }, {
            key: 'getTarjetas',
            value: function getTarjetas() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getParTarjetas', param, 'JSON', true);
            }
        }, {
            key: 'getDatosFinancieros',
            value: function getDatosFinancieros() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getDatosFinancieros', param, 'JSON', true);
            }
        }, {
            key: 'getBajaEndoso',
            value: function getBajaEndoso() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getBajaEndoso', param, 'JSON', true);
            }
        }, {
            key: 'getParentescoList',
            value: function getParentescoList() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getParentescoList', param, 'JSON', true);
            }
        }, {
            key: 'getPaisesList',
            value: function getPaisesList() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getPaisesList', param, 'JSON', true);
            }
        }, {
            key: 'getProvinciaList',
            value: function getProvinciaList() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getProvinciaList', param, 'JSON', true);
            }
        }, {
            key: 'getLocalidadList',
            value: function getLocalidadList() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getLocalidadList', param, 'JSON', true);
            }
        }, {
            key: 'getPrefTelPaises',
            value: function getPrefTelPaises() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getPrefTelPaises', param, 'JSON', true);
            }
        }, {
            key: 'getClienteSuscrito',
            value: function getClienteSuscrito() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getClienteSuscrito', param, 'JSON', true);
            }
        }, {
            key: 'getRecupClixPol',
            value: function getRecupClixPol() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getRecupClixPol', param, 'JSON', true);
            }
        }, {
            key: 'envioCodigoVerificacion',
            value: function envioCodigoVerificacion() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/envioCodigoVerificacion', param, 'JSON', true);
            }
        }, {
            key: 'verificarCodigo',
            value: function verificarCodigo() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/verificarCodigo', param, 'JSON', true);
            }
        }, {
            key: 'conseguirPDF',
            value: function conseguirPDF() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/conseguirPDF', param, 'JSON', true);
            }
        }, {
            key: 'getOpEndosoArchivoCabecera',
            value: function getOpEndosoArchivoCabecera() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getOpEndosoArchivoCabecera', param, 'JSON', true);
            }
        }, {
            key: 'getOpEndosoArchivo',
            value: function getOpEndosoArchivo() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'Endosos/getOpEndosoArchivo', param, 'JSON', true);
            }
        }, {
            key: 'getDataStored',
            value: function getDataStored(id) {
                var store = Store.getState();

                if (store[id]) {
                    return store[id];
                }

                return null;
            }
        }]);

        return EndososService;
    }(BaseService);

    ;

    return EndososService;
});