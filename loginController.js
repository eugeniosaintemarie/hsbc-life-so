var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../services/loginService', '../services/segurosOnlineService'], function (React, ReactDOM, LoginService, SegurosOnlineService) {
    var LoginController = function (_React$Component) {
        _inherits(LoginController, _React$Component);

        function LoginController() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, LoginController);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginController.__proto__ || Object.getPrototypeOf(LoginController)).call.apply(_ref, [this].concat(args))), _this), _this.loginService = new LoginService(), _this.segurosOnlineService = new SegurosOnlineService(), _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(LoginController, [{
            key: 'loginPaso1',
            value: function loginPaso1(user, pass, callBack) {
                param = {
                    j_username: user,
                    j_password: pass
                };

                return this.loginService.loginPaso1(param, callBack);
            }
        }, {
            key: 'loginPaso2',
            value: function loginPaso2(tipoDoc, rcc1, rcc2, rcc3, doc, callBack) {
                param = {
                    tipoDoc: tipoDoc,
                    rcc1: doc[rcc1],
                    rcc2: doc[rcc2],
                    rcc3: doc[rcc3],
                    doc: doc
                };
                return this.loginService.loginPaso2(param, callBack);
            }
        }, {
            key: 'getIdentificador',
            value: function getIdentificador() {
                return this.loginService.getIdentificador();
            }
        }, {
            key: 'getTiposDocumento',
            value: function getTiposDocumento() {
                return this.segurosOnlineService.getTiposDocumento({ COD_APP: "SO", COD_PRO: "" });
            }
        }, {
            key: 'recoveryPassword',
            value: function recoveryPassword(typeDoc, numDoc, mail, respose, callBack, service) {

                var params = {
                    "FUNCION": "SETBLANQUEO",
                    "DOCUMTIP": typeDoc,
                    "DOCUMDAT": numDoc,
                    "MAIL": mail,
                    "RESPUESTA": respose
                };
                if (service == "Respuesta") {
                    this.segurosOnlineService.recuperarPassword(params).then(function (data) {
                        if (data.CODRESULTADO == 'ERROR') {
                            if (CODERROR = 'mcteMsg_DATOSINVALIDOS') {
                                callBack('DATOSINVALIDOS');
                            }
                        } else if (data.CODRESULTADO == 'OK') {
                            if (CODERROR = 'mcteMsg_OK') {
                                callBack('OK');
                            }
                        }
                    });
                } else {
                    this.segurosOnlineService.recuperarPassUsuNom(params).then(function (data) {
                        if (data.CODRESULTADO == 'ERROR') {
                            if (CODERROR = 'mcteMsg_DATOSINVALIDOS') {
                                callBack('DATOSINVALIDOS');
                            }
                        } else if (data.CODRESULTADO == 'OK') {
                            if (CODERROR = 'mcteMsg_OK') {
                                callBack('OK');
                            }
                        }
                    });
                }
            }
        }, {
            key: 'getQuestion',
            value: function getQuestion(mail, numDoc, typeDoc, callBack) {
                var params = {
                    "MAIL": mail,
                    "DOCUMDAT": numDoc,
                    "DOCUMTIP": typeDoc
                };
                this.segurosOnlineService.obtenerPregunta(params).then(function (data) {
                    callBack(data);
                    // if (data.result == 'OK') {
                    //         callBack(data);   
                    // } else {
                    //         callBack('ERROR')
                    // }
                });
            }
        }, {
            key: 'registerUser',
            value: function registerUser(typeDoc, numDoc, mail, callBack) {
                var params = {
                    "FUNCION": "REGISTRACION",
                    "DOCUMTIP": typeDoc,
                    "DOCUMDAT": numDoc,
                    "MAIL": mail,
                    "CONFORMIDAD": "S"
                };
                this.segurosOnlineService.registrarUsuario(params).then(function (data) {
                    callBack(data);
                });
            }
        }, {
            key: 'savePassword',
            value: function savePassword(mail, password, callBack) {
                var params = {
                    'PASSWORD': password
                };

                this.loginService.savePassword(params, callBack);
            }
        }, {
            key: 'getQuestions',
            value: function getQuestions(callBack) {
                this.segurosOnlineService.getObtenerPreguntas().then(function (data) {
                    callBack(data);
                });
            }
        }, {
            key: 'guardarPreguntaYRespuestaSecreta',
            value: function guardarPreguntaYRespuestaSecreta(question, anwser, callBack) {
                param = {
                    PREGUNTA: question,
                    RESPUESTA: anwser
                };
                return this.loginService.guardarPreguntaYRespuestaSecreta(param, callBack);
            }
        }, {
            key: 'getSitioHab',
            value: function getSitioHab(callBack) {
                this.segurosOnlineService.getSitioHab().then(function (data) {
                    callBack(data.VAL_PAR);
                });
            }
        }]);

        return LoginController;
    }(React.Component);

    return LoginController;
});