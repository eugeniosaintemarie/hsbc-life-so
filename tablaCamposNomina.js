'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', "../redux/store", 'react-dom'], function (React, Store, ReactDOM) {
    var tablaCamposNomina = function (_React$Component) {
        _inherits(tablaCamposNomina, _React$Component);

        function tablaCamposNomina() {
            _classCallCheck(this, tablaCamposNomina);

            var _this = _possibleConstructorReturn(this, (tablaCamposNomina.__proto__ || Object.getPrototypeOf(tablaCamposNomina)).call(this));

            _this._handleResultsDropDown = function (id, result) {
                _this.setState(_defineProperty({}, id, result));
                _this.props.onResult(id, result);
            };

            _this._handleResultsRadio = function (result) {
                _this.props.onResult('pmSelected', result);
            };

            _this._handleChange = function (event) {
                _this.setState({ paymentMethod: event.target.value });
                _this.props.onResult('method', event.target.value);
            };

            _this._tableExcel = function () {
                var currentProduct = Store.getState().seguros.currentProduct;

                var ramo = currentProduct.ramopcod;
                var nombre = false;
                var apellido = false;
                var cuil = false;
                var sexo = false;
                var fechanac = false;
                var mail = false;
                var actividad = false;
                var saldodeuda = false;
                var sumaasegurado = false;
                var sueldo = false;
                var fechaingreso = false;
                var cantcampos = 0;

                switch (ramo) {
                    // Accidentes personales
                    case "CAP1":
                    case "CAP2":
                    case "CAP3":
                    case "CAP5":
                    case "CA01":
                    case "CA11":
                    case "CA12":
                    case "CA13":
                    case "CA21":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        actividad = true;
                        sumaasegurado = true;
                        mail = true;
                        cantcampos = 7;
                        break;
                    //Saldo Deudor    
                    case "CD11":
                    case "CD21":
                    case "CD22":
                    case "CD23":
                    case "CD24":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        saldodeuda = true;
                        mail = true;
                        cantcampos = 7;
                        break;
                    //Complejidad medica
                    case "CM01":
                    case "CM11":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        cantcampos = 6;
                        break;
                    //Sepelio
                    case "CS11":
                    case "CS13":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        cantcampos = 6;
                        break;
                    //Vida colectivo optativo
                    case "CE13":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        sumaasegurado = true;
                        cantcampos = 7;
                        break;
                    case "CE15":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        sueldo = true;
                        cantcampos = 7;
                        break;
                    case "CE11":
                    case "CE17":
                    case "CE21":
                    case "CE23":
                    case "CE27":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        cantcampos = 6;
                        break;
                    case "CT01":
                    case "CT11":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        sueldo = true;
                        fechaingreso = true;
                        cantcampos = 8;
                        break;
                    //Vida obligatorio
                    case "CO11":
                        nombre = true;
                        apellido = true;
                        cuil = true;
                        sexo = true;
                        fechanac = true;
                        mail = true;
                        cantcampos = 6;
                        break;
                }

                var campos = [];
                var regexTexto = "^([A-ZÑ]+\\ ?)+$";
                var regexMail = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$";

                var opcionesCuil = [{ texto: "XX-XXXXXXXX-X", regex: "^\\d{2}\\-\\d{8}\\-\\d$" }, { texto: "XXXXXXXXXXX", regex: "^\\d{11}$" }];

                var opcionesSexo = [{ texto: "Masculino/Femenino", regex: "^(Masculino|Femenino)$" }, { texto: "M/F", regex: "^(M|F)$" }, { texto: "Hombre/Mujer", regex: "^(Hombre|Mujer)$" }];

                var opcionesNumericos = [{ texto: "10000,00", regex: "^\\d+(\\,\\d+)?$" }, { texto: "10.000,00", regex: "^\\d{1,3}(\\.\\d{3})*(\\,\\d+)?$" }, { texto: "10000.00", regex: "^\\d+(\\.\\d+)?$" }, { texto: "10,000.00", regex: "^\\d{1,3}(\\,\\d{3})*(\\.\\d+)?$" }];
                var opcionesNumericos2 = [{ texto: "10000,00", regex: "^\\d+(\\,\\d+)?$" }];

                var opcionesFechas = [{ texto: "DD/MM/AAAA", regex: "^(\\d{2}\\/){2}\\d{4}$" }, { texto: "DD/MM/AA", regex: "^(\\d{2}\\/){2}\\d{2}$" }, { texto: "AAAA/MM/DD", regex: "^\\d{4}(\\/\\d{2}){2}$" }, { texto: "AA/MM/DD", regex: "^(\\d{2}\\/){2}\\d{2}$" }, { texto: "AAAA/DD/MM", regex: "^\\d{4}(\\/\\d{2}){2}$" }, { texto: "AA/DD/MM", regex: "^(\\d{2}\\/){2}\\d{2}$" }, { texto: "DD-MM-AAAA", regex: "^(\\d{2}\\-){2}\\d{4}$" }, { texto: "DD-MM-AA", regex: "^(\\d{2}\\-){2}\\d{2}$" }, { texto: "AAAA-MM-DD", regex: "^\\d{4}(\\-\\d{2}){2}$" }, { texto: "AA-MM-DD", regex: "^(\\d{2}\\-){2}\\d{2}$" }, { texto: "AAAA-DD-MM", regex: "^\\d{4}(\\-\\d{2}){2}$" }, { texto: "AA-DD-MM", regex: "^(\\d{2}\\-){2}\\d{2}$" }, { texto: "AAAAMMDD", regex: "^\\d{8}$" }];

                if (nombre) {
                    campos.push({
                        nombre: "Nombre",
                        formato: {
                            texto: "Texto",
                            regex: regexTexto,
                            options: []
                        },
                        modal: {
                            texto: ""
                        } });
                }
                if (apellido) {
                    campos.push({
                        nombre: "Apellido",
                        formato: {
                            texto: "Texto",
                            regex: regexTexto,
                            options: []
                        },
                        modal: {
                            texto: ""
                        } });
                }
                if (cuil) {
                    campos.push({
                        nombre: "Cuil",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesCuil

                        },
                        modal: {
                            texto: "Indicanos como es el formato del CUIT. Ejemplo: 27-26942180-5 o 27369421805"
                        } });
                }
                if (sexo) {
                    campos.push({
                        nombre: "Sexo",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesSexo
                        },
                        modal: {
                            texto: "Indicanos cómo esta identificado el sexo en tu nomina."
                        } });
                }
                if (fechanac) {
                    campos.push({
                        nombre: "Fecha de nacimiento",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesFechas
                        },
                        modal: {
                            texto: "Indicanos como es el formato de fecha de nacimiento en tu nómina. Siendo D para dia, M para mes, A para año. Ejemplo: 24/02/1991 seria DD/MM/AAAA"
                        } });
                }
                if (mail) {
                    campos.push({
                        nombre: "Mail",
                        formato: {
                            texto: "Formato mail",
                            regex: regexMail,
                            options: []
                        },
                        modal: {
                            texto: ""
                        } });
                }
                if (fechaingreso) {
                    campos.push({
                        nombre: "Fecha de ingreso",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesFechas
                        },
                        modal: {
                            texto: "Indicanos como es el formato de fecha de ingreso en tu nómina. Siendo D para dia, M para mes, A para año. Ejemplo: 24/02/1991 seria DD/MM/AAAA"
                        } });
                }
                if (actividad) {
                    campos.push({
                        nombre: "Actividad",
                        formato: {
                            texto: "Texto",
                            regex: regexTexto,
                            options: []
                        },
                        modal: {
                            texto: ""
                        } });
                }
                if (saldodeuda) {
                    campos.push({
                        nombre: "Saldo/Deuda",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesNumericos
                        },
                        modal: {
                            texto: "Indicanos como es el formato del Saldo deduda, detallando si utilizas coma o punto para separar los decimales o miles. Ejemplo 10000,00 o 10.000,00 o 10000.00"
                        } });
                }
                if (sumaasegurado) {
                    campos.push({
                        nombre: "Suma asegurada",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesNumericos2
                        },
                        modal: {
                            texto: "El formato que debes usar para el campo suma asegurada tiene que ser utilizando comas para separar decimales 10000,00"
                        } });
                }
                if (sueldo) {
                    campos.push({
                        nombre: "Sueldo",
                        formato: {
                            texto: "",
                            regex: "",
                            options: opcionesNumericos2
                        },
                        modal: {
                            texto: "El formato que debes usar para el campo sueldo tiene que ser utilizando comas para separar decimales 10000,00"

                        } });
                }
                if (_this.state.creacionCampos) {
                    _this.props.funcionResults(campos);
                    _this.setState({ creacionCampos: false });
                } else {
                    if (_this.props.camposNomina.length > 0) {
                        campos = _this.props.camposNomina;
                    }
                }

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'table',
                        { className: 'table table-sm table-bordered' },
                        React.createElement(
                            'thead',
                            null,
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    { colSpan: '6', className: 'main-header' },
                                    'Campos correspondientes a la nomina'
                                )
                            ),
                            React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                    'th',
                                    null,
                                    'Campo'
                                )
                            )
                        ),
                        React.createElement(
                            'tbody',
                            null,
                            campos.map(function (e) {
                                return React.createElement(
                                    'tr',
                                    null,
                                    React.createElement(
                                        'td',
                                        null,
                                        e.nombre
                                    )
                                );
                            })
                        )
                    )
                );
            };

            _this.state = {
                paymentMethod: 'cardCredit',
                listRadio: [],
                creacionCampos: true,
                apiMsg: 'Buscando Tarjetas HSBC…',
                apiCalled: false
            };
            return _this;
        }

        _createClass(tablaCamposNomina, [{
            key: 'render',
            value: function render() {
                return this._tableExcel();
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {}
        }]);

        return tablaCamposNomina;
    }(React.Component);

    return tablaCamposNomina;
});