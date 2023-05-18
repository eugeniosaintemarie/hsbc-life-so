'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', './baseService', "../lib/utils.js"], function (React, ReactDOM, BaseService, Utils) {
    var LoginService = function (_BaseService) {
        _inherits(LoginService, _BaseService);

        function LoginService() {
            _classCallCheck(this, LoginService);

            return _possibleConstructorReturn(this, (LoginService.__proto__ || Object.getPrototypeOf(LoginService)).apply(this, arguments));
        }

        _createClass(LoginService, [{
            key: 'callWithCallback',
            value: function callWithCallback(method, url, parameters, callBack, contentType) {
                var _this2 = this;

                var promise = new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();

                    xhr.addEventListener("load", function () {});

                    if (method == "POST") {
                        var formData = new URLSearchParams();

                        for (var key in parameters) {
                            formData.append(key, parameters[key]);
                        }

                        var headers = {};
                        if (contentType == 'JSON') {
                            headers = {
                                method: method,
                                body: JSON.stringify(parameters)
                            };
                        } else {
                            headers = {
                                method: method,
                                body: formData.toString(),
                                credentials: "same-origin",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            };
                        }

                        fetch(_this2.path + url, headers).then(function (res) {
                            callBack(res, res.url);
                        }).catch(function (e) {
                            $(document).trigger("ErrorService", xhr.statusText);
                        });
                    }
                });
            }
        }, {
            key: 'isJSON',
            value: function isJSON(str) {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
        }, {
            key: 'loginPaso1',
            value: function loginPaso1(param, callBack) {
                return this.callWithCallback('POST', 'app/pages/j_security_check', param, callBack);
            }
        }, {
            key: 'loginPaso2',
            value: function loginPaso2(param, callBack) {
                return this.callWithCallback('POST', 'app/pages/secondStep', param, callBack);
            }
        }, {
            key: 'guardarPreguntaYRespuestaSecreta',
            value: function guardarPreguntaYRespuestaSecreta(param, callBack) {
                return this.callWithCallback('POST', 'app/pages/guardarPreguntaYRespuestaSecreta', param, callBack);
            }
        }, {
            key: 'getIdentificador',
            value: function getIdentificador() {
                var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                return this.call('POST', 'app/pages/obtenerIdentificador', param);
            }
        }, {
            key: 'savePassword',
            value: function savePassword(param, callBack) {
                return this.callWithCallback('POST', 'Login/savePassword', param, callBack, 'JSON');
            }
        }, {
            key: 'getProvincias',
            value: function getProvincias() {
                return this.call('POST', 'Login/getProvincias', {}, 'JSON', null, 'JSON', '');
            }
        }, {
            key: 'getCanalesCobro',
            value: function getCanalesCobro() {
                return this.call('POST', 'Login/getCanalesCobro', { COBROCOD: 4 }, 'JSON', null, 'JSON', '');
            }
        }, {
            key: 'verificarPositiveID',
            value: function verificarPositiveID(params) {
                return this.call('POST', 'Login/verificarPositiveID', params, 'JSON', null, 'TEXT', '');
            }
        }, {
            key: 'logOut',
            value: function logOut() {
                return this.call('GET', 'app/pages/logout', {}, 'JSON', null, 'TEXT', '');
            }
        }]);

        return LoginService;
    }(BaseService);

    return LoginService;
});