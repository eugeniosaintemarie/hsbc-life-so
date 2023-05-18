var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../lib/utils', '../services/userService', '../services/endososService', '../services/segurosOnlineService', "../redux/store"], function (React, ReactDOM, Utils, UserService, EndososService, SegurosOnlineService, Store) {
    var EndososController = function (_React$Component) {
        _inherits(EndososController, _React$Component);

        function EndososController() {
            var _ref;

            var _temp, _this, _ret;

            _classCallCheck(this, EndososController);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EndososController.__proto__ || Object.getPrototypeOf(EndososController)).call.apply(_ref, [this].concat(args))), _this), _this.userService = new UserService(), _this.endosoService = new EndososService(), _this.segurosOnlineService = new SegurosOnlineService(), _this.segurosData = Store.getState().seguros, _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(EndososController, [{
            key: 'getPolizaEnable',
            value: function getPolizaEnable() {
                var MENSASUS = this.segurosData.currentProduct.detalle.MENSASUS;

                return MENSASUS;
            }
        }, {
            key: 'getPolizaParams',
            value: function getPolizaParams() {
                var currentProduct = this.segurosData.currentProduct;
                var product = {};
                var isCollective = currentProduct.TIPOPRODU === 'L' || currentProduct.TIPOPRODU === 'O';
                if (isCollective) {
                    product = currentProduct.cup;
                } else {
                    product = currentProduct.detalle;
                }
                var _product = product,
                    CIAASCOD = _product.CIAASCOD,
                    RAMOPCOD = _product.RAMOPCOD,
                    POLIZANN = _product.POLIZANN,
                    POLIZSEC = _product.POLIZSEC,
                    CERTIPOL = _product.CERTIPOL,
                    CERTIANN = _product.CERTIANN,
                    CERTISEC = _product.CERTISEC;


                var params = {
                    'CIAASCOD': CIAASCOD,
                    'RAMOPCOD': RAMOPCOD,
                    'POLIZANN': POLIZANN,
                    'POLIZSEC': POLIZSEC,
                    'CERTIPOL': CERTIPOL,
                    'CERTIANN': CERTIANN,
                    'CERTISEC': CERTISEC
                };
                return params;
            }
        }, {
            key: 'getConsEndoso',
            value: function getConsEndoso(callBack) {
                var _this2 = this;

                var params = this.getPolizaParams();
                this.endosoService.getConsEndoso(params).then(function (data) {
                    if (data.Code == "NO_ERROR") {
                        var _data$Message$CAMPOS = data.Message.CAMPOS,
                            RECIBEENDOSO = _data$Message$CAMPOS.RECIBEENDOSO,
                            ULTENDOSO = _data$Message$CAMPOS.ULTENDOSO,
                            DATOBENE = _data$Message$CAMPOS.DATOBENE;

                        var MENSASUS = _this2.getPolizaEnable();
                        var listFill = [];
                        DATOBENE.BENEF.forEach(function (e) {
                            if (e.NUMDOCBENE.trim() != '') {
                                e.BENEPORC = parseFloat(e.BENEPORC.substring(e.BENEPORC.length - 2, -2));
                                e.BENEFORD = parseInt(e.BENEFORD.replace("0", ""));
                                e.TIPDOCBENE = parseInt(e.TIPDOCBENE.replace("0", ""));
                                e.NUMDOCBENE = parseInt(e.NUMDOCBENE);
                                e.FNACIMIE = parseInt(e.FNACIMIE);
                                e.BENNACIONAL = parseInt(e.BENNACIONAL);
                                e.BENPROVINCIA = parseInt(e.BENPROVINCIA);

                                listFill.push(e);
                            }
                        });

                        listFill.sort(function (a, b) {
                            return a.BENEFORD - b.BENEFORD;
                        });
                        data.Message.CAMPOS.DATOBENE.BENEF = listFill;

                        var action = '';

                        if (MENSASUS == '54' || MENSASUS == '53' || MENSASUS == '03' || MENSASUS == '04' || MENSASUS == '10' || MENSASUS == '52') {
                            action = 'noAvailable';
                        } else {
                            if (RECIBEENDOSO == 'S' && ULTENDOSO == 'S') {
                                action = 'updateOK';
                            } else if (RECIBEENDOSO == 'S' && ULTENDOSO == 'N') {
                                action = 'error';
                            } else if (RECIBEENDOSO == 'N' && ULTENDOSO == 'S') {
                                action = 'onlyView';
                            } else if (RECIBEENDOSO == 'N' && ULTENDOSO == 'N') {
                                action = 'noAvailable';
                            } else if (RECIBEENDOSO == 'X' && ULTENDOSO == 'S') {
                                action = 'noBeneficiary';
                            } else if (RECIBEENDOSO == 'X' && ULTENDOSO == 'N') {
                                action = 'error';
                            }
                        }
                        callBack({
                            action: action,
                            data: data.Message.CAMPOS
                        });
                    } else {
                        callBack(data.Code);
                    }
                });
            }
        }, {
            key: 'bajaEndoso',
            value: function bajaEndoso(callBack) {
                var params = this.getPolizaParams();

                this.endosoService.getBajaEndoso(params).then(function (data) {
                    if (data.Code == "NO_ERROR") {
                        callBack(data.Message.DATOS);
                    } else {
                        callBack(data.Code);
                    }
                });
            }
        }, {
            key: 'altaEndoso',
            value: function altaEndoso(type, sendData, callBack) {
                var paramsHeader = this.getPolizaParams();
                var paramsType = {};

                if (type == 'beneficiary') {
                    sendData.map(function (e) {
                        var day = e.FNACIMIE.toString().substring(6);
                        var month = e.FNACIMIE.toString().substring(4, 6);
                        var year = e.FNACIMIE.toString().substring(0, 4);
                        e.FNACIMIE = parseInt(day + month + year);

                        delete e['questionFND'];
                    });

                    paramsType = {
                        SITUCMOT: 16,
                        DATOBENE: sendData
                    };
                } else if (type == 'address') {

                    var codePhone = sendData.coutryCodeAis.split('-');

                    paramsType = {
                        SITUCMOT: 18,
                        EMAILCOD: sendData.email,
                        TLFPAIS: codePhone[0],
                        TLFPREFI: codePhone[1],
                        TLFPREFN: sendData.codeArea,
                        TLFNUME: sendData.phoneNumber,
                        // PAISTELCELU: data.email,
                        // PREFINTTELCELU: data.email,
                        // CARCELU: data.email,
                        // NUMCELU: data.email,
                        DOMICDOM: sendData.street,
                        DOMICDNU: sendData.numberStreet,
                        DOMICPIS: sendData.floor,
                        DOMICDEPTO: sendData.dept,
                        CPACODPO: parseInt(sendData.zipCode),
                        PROVICOD: parseInt(sendData.state),
                        DOMICLOC: sendData.locality
                        // TITULCOD: data.email,
                        // TITULOTR: data.email
                    };
                } else if (type == 'payment') {

                    paramsType = {
                        SITUCMOT: 15,
                        TIPOCOBR: sendData.TIPOCOBR,
                        NROCOBRO: sendData.NROCOBRO,
                        FECVTOTARJ: parseInt(sendData.FECVTOTARJ),
                        NOMCOBR: sendData.NOMCOBR,
                        APELLCOBR: sendData.APELLCOBR,
                        TIPDOCCOBR: parseInt(sendData.TIPDOCCOBR),
                        NUMDOCCOBR: parseInt(sendData.NUMDOCCOBR),
                        TOMEDPAG: sendData.TOMEDPAG,
                        COBROCOD: parseInt(sendData.COBROCOD)
                    };
                }

                var params = Object.assign({}, paramsHeader, paramsType);

                this.endosoService.getAltaEndoso(params).then(function (data) {
                    if (data.Code == "NO_ERROR") {
                        if (data.Message.CAMPOS.MOTIVOERR == '') {
                            callBack('OK');
                        } else {
                            callBack(data.Message.CAMPOS.MOTIVOERR);
                        }
                    } else {
                        callBack(data.Message);
                    }
                });
            }
        }, {
            key: 'getTarjetas',
            value: function getTarjetas(callBack) {
                return this.endosoService.getTarjetas({}).then(function (data) {
                    callBack(data.Message.REGS.REG);
                });
            }
        }, {
            key: 'getCodDocByNumber',
            value: function getCodDocByNumber(codDoc) {
                switch (codDoc) {
                    case '1':
                        return '50'; //DNI
                    case '2':
                        return '53'; //LE
                    case '3':
                        return '52'; //LC
                    default:
                        return '50';
                }
            }
        }, {
            key: 'getDatosFinancieros',
            value: function getDatosFinancieros(callBack) {
                this.endosoService.getDatosFinancieros().then(function (data) {
                    if (data.Code == "NO_ERROR") {
                        var json = Utils.xmlToJson(data.Message.Response.BusDataSeg);
                        if (json.BusDataSeg.productDetails) {
                            callBack(json.BusDataSeg.productDetails);
                        } else {
                            callBack("empty");
                        }
                    } else {
                        callBack(data.Code);
                    }
                });
            }
        }, {
            key: 'getTipoDocumento',
            value: function getTipoDocumento(callBack) {
                this.segurosOnlineService.getTiposDocumento().then(function (data) {
                    callBack(data);
                });
            }
        }, {
            key: 'getParentescoList',
            value: function getParentescoList(callBack) {
                this.endosoService.getParentescoList().then(function (data) {
                    callBack(data.Message.DATOS.PARENTEZCOS.PARENTEZCO);
                });
            }
        }, {
            key: 'getWsFormBeneficiary',
            value: function getWsFormBeneficiary(callBack) {
                var _this3 = this;

                var ws = {};
                this.segurosOnlineService.getTiposDocumento({ "COD_APP": "OV", "COD_PRO": "" }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listTipoDoc = data;
                    return _this3.endosoService.getParentescoList();
                    // } else {
                    //     callBack(data.Code);
                    // }
                }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listParentestco = data.Message.DATOS.PARENTEZCOS.PARENTEZCO;
                    return _this3.endosoService.getPaisesList();
                    // } else {
                    //     callBack(data.Code);
                    // }
                }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listPaises = data.Message.DATOS.PAISES.PAIS;
                    return _this3.endosoService.getProvinciaList();
                    // } else {
                    //     callBack(data.Code);
                    // }
                }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listProvincia = data.Message.REGS.REG;
                    return _this3.endosoService.getPrefTelPaises();
                    // } else {
                    // callBack(data.Code);
                    // }
                }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listPrefTelPaises = data.Message.DATOS.PAISES.PAIS.map(function (e) {
                        e.SHOWDESC = e.PREFIJO.replace(' ', '') + ' - ' + e.DESCRIPCION;
                        return e;
                    });
                    callBack(ws);
                    // } else {
                    // callBack(data.Code);
                    // }
                }).catch(function (value) {
                    console.error('Error al obtener WS');
                });
            }
        }, {
            key: 'getLocalidadForm',
            value: function getLocalidadForm(codProv, callBack) {
                this.endosoService.getLocalidadList({ 'PROVICOD': codProv, 'CALLELOC': '' }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    var listLoc = data.Message.REGS.REG.map(function (e) {
                        return {
                            CODPOS: e.CODPOS + "-" + e.CALLE,
                            CALLE: e.CALLE
                        };
                    });
                    callBack(listLoc);
                    // } else {
                    // callBack(data.Code);
                    // }
                }).catch(function (value) {
                    console.error('Error al obtener WS');
                });
            }
        }, {
            key: 'getClienteSuscrito',
            value: function getClienteSuscrito(callBack) {
                var _this4 = this;

                var seguros = this.userService.getLoggedUser().then(function (data) {
                    var CLITIP = data.CLITIP;

                    if (CLITIP != 'J') {
                        // si no es persona juridica
                    	callBack('clientOK');
                    } else {
                        callBack('noPersonFisica');
                    }
                });
            }
        }, {
            key: 'getConsultaEndosos',
            value: function getConsultaEndosos(callBack) {
                var params = this.getPolizaParams();
                this.endosoService.getConsultaEndosos(params).then(function (data) {
                    // if  {
                    callBack(data.Message.DATOS);
                    // } else {
                    // callBack(data.Code);
                    // }
                }).catch(function (value) {
                    console.error('Error al obtener WS');
                });
            }
        }, {
            key: 'validateBeneficiary',
            value: function validateBeneficiary(dataBenef, callBack) {
                if (dataBenef.RELBECOD.toUpperCase() == 'AB' || dataBenef.RELBECOD.toUpperCase() == 'AL' || dataBenef.RELBECOD.toUpperCase() == 'C' || dataBenef.RELBECOD.toUpperCase() == 'CO' || dataBenef.RELBECOD.toUpperCase() == 'CA' || dataBenef.RELBECOD.toUpperCase() == 'CV' || dataBenef.RELBECOD.toUpperCase() == 'EO' || dataBenef.RELBECOD.toUpperCase() == 'EA' || dataBenef.RELBECOD.toUpperCase() == 'HO' || dataBenef.RELBECOD.toUpperCase() == 'HA' || dataBenef.RELBECOD.toUpperCase() == 'P' || dataBenef.RELBECOD.toUpperCase() == 'M' || dataBenef.RELBECOD.toUpperCase() == 'NO' || dataBenef.RELBECOD.toUpperCase() == 'NA') {

                    if (dataBenef.BENESPEP.toUpperCase() == 'S') {

                        this.getRecupClixPol(function (data) {
                            var CATEGCLI = data.CATEGCLI;

                            if (CATEGCLI == '12' || CATEGCLI == '13') {
                                // Es PEP
                                callBack('beneficiary');
                            } else {
                                callBack('noPep');
                            }
                        });
                    } else {
                        callBack('beneficiary');
                    }
                } else {
                    // callBack('noDirectFamily'); // descomentar por la primera etapa
                    callBack('noPep');
                }
            }
        }, {
            key: 'sendValidationEmail',
            value: function sendValidationEmail(callBack) {
                this.endosoService.envioCodigoVerificacion().then(function (validacion) {
                    if (validacion.CODRESULTADO == "OK") {
                        callBack(true);
                    } else {
                        //ERROR AL CONSULTAR SERVICIO ENVIO MAIL
                    }
                });
            }
        }, {
            key: 'verificarCodigoEmail',
            value: function verificarCodigoEmail(cod, callBack) {
                var params = { codigo: cod };
                this.endosoService.verificarCodigo(params).then(function (data) {
                    callBack(data.result);
                });
            }
        }, {
            key: 'getWsFormAddress',
            value: function getWsFormAddress(callBack) {
                var _this5 = this;

                var ws = {};
                this.endosoService.getPaisesList().then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listPaises = data.Message.DATOS.PAISES.PAIS;
                    return _this5.endosoService.getProvinciaList();
                    // } else {
                    //     callBack(data.Code);
                    // }
                }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listProvincia = data.Message.REGS.REG;
                    return _this5.endosoService.getPrefTelPaises();
                    // } else {
                    // callBack(data.Code);
                    // }
                }).then(function (data) {
                    // if (data.Code == "NO_ERROR") {
                    ws.listPrefTelPaises = data.Message.DATOS.PAISES.PAIS.map(function (e) {
                        var desc = '+' + e.PREFIJO.replace(' ', '');
                        var cod = e.CODIGO + '-' + e.PREFIJO;
                        return {
                            SHOWDESC: desc,
                            CODIGO: cod
                        };
                    });
                    callBack(ws);
                    // } else {
                    // callBack(data.Code);
                    // }
                }).catch(function (value) {
                    console.error('Error al obtener WS');
                });
            }
        }, {
            key: 'getRecupClixPol',
            value: function getRecupClixPol(callBack) {
                var params = this.getPolizaParams();
                this.endosoService.getRecupClixPol(params).then(function (data) {
                    callBack(data.Message.CAMPOS);
                });
            }
        }, {
            key: 'getMailClient',
            value: function getMailClient(callBack) {
                this.userService.getLoggedUser().then(function (data) {
                    var MAIL = data.MAIL;

                    callBack(MAIL);
                });
            }
        }, {
            key: 'typeDocByNumber',
            value: function typeDocByNumber(typeDoc) {
                switch (typeDoc) {
                    case 1:
                        return 'D';
                    case 2:
                        return 'E';
                    case 3:
                        return 'C';
                    case 6:
                        return 'I';
                    case 47:
                        return 'P';

                    case 4:
                        return 'T';
                    case 5:
                        return 'L';
                    // case 5: tipoCuit = 'D'; break; no se el numero
                    default:
                        return '';
                }
            }
        }, {
            key: 'buildJsonFileRepo',
            value: function buildJsonFileRepo(dataEndoso, questions, callBack) {
                var _this6 = this;

                var userLogged = {};
                var customerProductsData = {};
                var pdf = void 0;

                var params = this.getPolizaParams();

                // fecha de hoy
                var date = new Date();

                var day = date.getDate();
                var month = date.getMonth() + 1;
                var year = date.getFullYear();

                var listBen = dataEndoso.DATOBENE.BENEF;
                var benSend = {};

                for (var i = 0; i <= 4; i++) {
                    var _aux;

                    var nroBen = i + 1;
                    var aux = (_aux = {}, _defineProperty(_aux, 'BE' + nroBen + '_ORD', !listBen[i] ? '' : listBen[i].BENEFORD), _defineProperty(_aux, 'BE' + nroBen + '_POR', !listBen[i] ? '' : listBen[i].BENEPORC), _defineProperty(_aux, 'BE' + nroBen + '_REL', !listBen[i] ? '' : listBen[i].RELBECOD), _defineProperty(_aux, 'BE' + nroBen + '_DEP', !listBen[i] ? '' : listBen[i].RELBEDEP), _defineProperty(_aux, 'BE' + nroBen + '_TDO', !listBen[i] ? '' : this.typeDocByNumber(listBen[0].TIPDOCBENE)), _defineProperty(_aux, 'BE' + nroBen + '_NDO', !listBen[i] ? '' : listBen[i].NUMDOCBENE), _defineProperty(_aux, 'BE' + nroBen + '_TCU', ''), _defineProperty(_aux, 'BE' + nroBen + '_CUI', ''), _defineProperty(_aux, 'BE' + nroBen + '_TIT', ''), _defineProperty(_aux, 'BE' + nroBen + '_TID', ''), _defineProperty(_aux, 'BE' + nroBen + '_APE', !listBen[i] ? '' : listBen[i].APEBENE), _defineProperty(_aux, 'BE' + nroBen + '_NOM', !listBen[i] ? '' : listBen[i].BENNOMBRE), _defineProperty(_aux, 'BE' + nroBen + '_OCU', ''), _defineProperty(_aux, 'BE' + nroBen + '_TNA', ''), _defineProperty(_aux, 'BE' + nroBen + '_NOA', ''), _defineProperty(_aux, 'BE' + nroBen + '_TNO', ''), _defineProperty(_aux, 'BE' + nroBen + '_NOO', ''), _defineProperty(_aux, 'BE' + nroBen + '_FNA', !listBen[i] ? '' : listBen[i].FNACIMIE), _defineProperty(_aux, 'BE' + nroBen + '_SEX', !listBen[i] ? '' : listBen[i].BENSEXO), _defineProperty(_aux, 'BE' + nroBen + '_ECI', ''), _defineProperty(_aux, 'BE' + nroBen + '_PEP', !listBen[i] ? '' : listBen[i].BENESPEP), _defineProperty(_aux, 'BE' + nroBen + '_NAC', !listBen[i] ? '' : listBen[i].BENNACIONAL), _defineProperty(_aux, 'BE' + nroBen + '_LNA', ''), _defineProperty(_aux, 'BE' + nroBen + '_DOM', !listBen[i] ? '' : listBen[i].BENCALLE), _defineProperty(_aux, 'BE' + nroBen + '_NRO', !listBen[i] ? '' : !listBen[i] ? '' : listBen[i].BENNUMERO), _defineProperty(_aux, 'BE' + nroBen + '_PIS', !listBen[i] ? '' : listBen[i].BENPISO), _defineProperty(_aux, 'BE' + nroBen + '_DTO', !listBen[i] ? '' : listBen[i].BENDEPTO), _defineProperty(_aux, 'BE' + nroBen + '_TOR', ''), _defineProperty(_aux, 'BE' + nroBen + '_BAR', ''), _defineProperty(_aux, 'BE' + nroBen + '_CPO', !listBen[i] ? '' : listBen[i].BENCPOSTAL), _defineProperty(_aux, 'BE' + nroBen + '_LOC', !listBen[i] ? '' : listBen[i].BENLOCALIDAD), _defineProperty(_aux, 'BE' + nroBen + '_PRO', !listBen[i] ? '' : listBen[i].BENPROVINCIA), _defineProperty(_aux, 'BE' + nroBen + '_PAI', 'ARGENTINA'), _defineProperty(_aux, 'BE' + nroBen + '_EMA', !listBen[i] ? '' : listBen[i].BENEMAIL), _defineProperty(_aux, 'BE' + nroBen + '_TEL', !listBen[i] ? '' : listBen[i].BENPAISTELEF + listBen[0].BENCARTELEF + listBen[0].BENNUMTELEF), _defineProperty(_aux, 'BE' + nroBen + '_CEL', ''), _defineProperty(_aux, 'BE' + nroBen + '_TRE', !listBen[i] ? '' : ''), _defineProperty(_aux, 'BE' + nroBen + '_TIE', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question3), _defineProperty(_aux, 'BE' + nroBen + '_MO1', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question4 == 'Por ser incapacitado' ? 'S' : 'N'), _defineProperty(_aux, 'BE' + nroBen + '_MO2', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question4 == 'Por ser indigente' ? 'S' : 'N'), _defineProperty(_aux, 'BE' + nroBen + '_MO3', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question4 == 'Por convivir' ? 'S' : 'N'), _defineProperty(_aux, 'BE' + nroBen + '_MO4', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question4 == 'Por ser mi pareja' ? 'S' : 'N'), _defineProperty(_aux, 'BE' + nroBen + '_MO5', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question4 == 'Otros motivos' ? 'S' : 'N'), _defineProperty(_aux, 'BE' + nroBen + '_DE3', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question5), _defineProperty(_aux, 'BE' + nroBen + '_DE4', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question6), _defineProperty(_aux, 'BE' + nroBen + '_DE5', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question9), _defineProperty(_aux, 'BE' + nroBen + '_FAM', !listBen[i] ? '' : !listBen[i].questionFND ? '' : listBen[i].questionFND.question10), _aux);

                    benSend = Object.assign({}, benSend, aux);
                };

                var json = Object.assign({
                    RES_FEC: '' + day + month + year,
                    RES_OFI: 'SEGUROS ONLINE',
                    NR1_PZA: params,
                    FIS_TDO: this.typeDocByNumber(userLogged.TIPODOCU),
                    FIS_NDO: userLogged.NUMEDOCU,
                    FIS_TCU: this.typeDocByNumber(userLogged.TIPODOCU),
                    FIS_CUI: userLogged.NUMEDOCU,
                    FIS_APE: userLogged.CLIENAP1 + ' ' + userLogged.CLIENAP2,
                    FIS_NOM: userLogged.CLIENNOM,
                    BEN_OPC: 'D'
                }, benSend, { //datos beneficiarios
                    CON_ECO: questions ? questions.question1 ? questions.question1 : '' : '',
                    DET_CAP: questions ? questions.question2 ? questions.question2 : '' : '',
                    DAC_TRE: '',
                    DAC_REL: '',
                    DAC_APE: '',
                    DAC_NOM: '',
                    DAC_DEF: '',
                    DAC_TIE: '',
                    DAC_MO1: '',
                    DAC_MO2: '',
                    DAC_MO3: '',
                    DAC_DE3: '',
                    DAC_MO4: '',
                    DAC_DE4: '',
                    DAC_MO5: '',
                    DAC_DE5: ''
                });
                this.endosoService.conseguirPDF(json).then(function (base64) {
                    pdf = base64;
                    paramHeader = {
                        NRO_OPE: '0',
                        COD_PRO: customerProductsData.RAMOPCOD,
                        NRO_POL: customerProductsData.NROPOLIZA,
                        ASE_TDO: _this6.typeDocByNumber(userLogged.TIPODOCU),
                        ASE_NDO: userLogged.NUMEDOCU,
                        ASE_APE: userLogged.CLIENAP1 + ' ' + userLogged.CLIENAP2,
                        ASE_NOM: userLogged.CLIENNOM
                    };

                    return _this6.endosoService.getOpEndosoArchivoCabecera(paramHeader);
                }).then(function (dataHeader) {
                    if (dataHeader.Code == 'NO_ERROR') {
                        var nroOpe = dataHeader.Message.REGS.REG[0].NRO_OPE;

                        paramsBody = {
                            NRO_OPE: nroOpe,
                            TIP_ARC: 'application/pdf',
                            COD_USU: 'USREN',
                            APE_USU: 'ENDOSOS',
                            NOM_USU: '',
                            CON_ARC: pdf
                        };

                        _this6.endosoService.getOpEndosoArchivoCabecera(paramsBody).then(function (dataBody) {
                            if (dataBody.Code == 'NO_ERROR') {
                                if (dataBody.Message.REGS.REG[0].NRO_ARC > 0) {
                                    callBack('OK');
                                }
                            }
                        });
                    }
                });
            }
        }]);

        return EndososController;
    }(React.Component);

    return EndososController;
});