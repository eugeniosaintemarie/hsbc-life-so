var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../lib/utils', "../services/segurosOnlineService", "../services/userService", "../common/inputvalidationExt", "../common/radioGroupAccountExt", "../redux/store", "../common/modal", "../common/modalReactBootstrap"], function (React, ReactDOM, Utils, SegurosOnlineService, UserService, InputValidationExt, RadioGroupAccountExt, Store, Modal, ModalReactBootstrap) {
    var RescateCobro = function (_React$Component) {
        _inherits(RescateCobro, _React$Component);

        function RescateCobro(props) {
            _classCallCheck(this, RescateCobro);

            var _this = _possibleConstructorReturn(this, (RescateCobro.__proto__ || Object.getPrototypeOf(RescateCobro)).call(this, props));

            _this.FORM_NAME = 'Medio Cobro';

            _this._handleResults = function (id, result) {
                var data = _defineProperty({}, id, result);
                var form = Object.keys(_this.state.form);
                form = form.find(function (el) {
                    return el === id;
                });
                if (typeof form !== "undefined") {
                    var current = _this.state;
                    var old = _this.state.form;
                    _this.setState(Object.assign({}, current, {
                        form: Object.assign({}, old, data)
                    }));
                }
            };

            _this._handleResultsRadio = function (data) {
                if (data.other != true) {
                    var cuenta = Object.values(data.productArrangement.FinSvceArr.AcctIntTrnsfNum.AcctNum)[0].trim();
                    var tipoCuenta = Object.values(data.productArrangement.Prod.InstCde)[0];

                    _this.setState({
                        tipoCuenta: tipoCuenta,
                        cuentaSeleccionada: cuenta,
                        checkOtraCuenta: false,
                        disabledOtraCuenta: true,
                        checked: false
                    });
                } else {
                    _this.setState({
                        checkOtraCuenta: true,
                        disabledOtraCuenta: false,
                        checked: true
                    });
                }
            };

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModalSuccess;
                _this.setState({
                    showModalSuccess: !current
                });
            };

            _this._handleResultRadio = function (id, result) {
                var _this$setState;

                _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, 'error', false), _defineProperty(_this$setState, 'txtError', ''), _this$setState));
            };

            _this._handleBack = function () {
                _this.props.switch('home');
            };

            _this._handleSubmit = function () {
                var _this$state$form = _this.state.form,
                    numeroCBU = _this$state$form.numeroCBU,
                    titularCUIT = _this$state$form.titularCUIT,
                    cuentaTitular = _this$state$form.cuentaTitular;
                var _this$state = _this.state,
                    dataUser = _this$state.dataUser,
                    tipoCuenta = _this$state.tipoCuenta;


                var userService = new UserService();
                var segurosOnlineService = new SegurosOnlineService();

                if (_this.state.checkOtraCuenta == false) {
                    _this.props.addTipoCuenta(tipoCuenta);
                    _this.props.addCUIT(titularCUIT);
                    _this.props.addTitular({
                        value: (dataUser.CLIENNOM ? dataUser.CLIENNOM + " " : "") + (dataUser.CLIENAP1 ? dataUser.CLIENAP1 + " " : "") + (dataUser.CLIENAP2 ? dataUser.CLIENAP2 : "")
                    });
                    _this.props.addCuenta(_this.state.cuentaSeleccionada);
                    //avanza a pantalla rescateInfoAdicional con nro de cuenta
                    _this.props.switch('rescateInfoAdicional');
                } else {

                    // PRIMERA CONDICION SE DEBE ELEGIR SI ES TITULAR O COTITULAR (NO AMBOS O NINGUNO)
                    if (_this.state.valueSelectTitular == 'S' && _this.state.valueSelectCoTitular == 'S' || _this.state.valueSelectTitular == 'N' && _this.state.valueSelectCoTitular == 'N') {
                        //ERROR DE DEFINICION DE TITULAR O COTITULAR, SE DEBE ELEGIR UNA DE LAS DOS.
                        _this.setState({
                            showModalSuccess: true,
                            modal: {
                                component: null,
                                contentHTML: 'Debes ingresar una cuenta en la que seas titular o cotitular.',
                                html: true,
                                title: "Rescates",
                                size: "md"
                            }
                        });
                    } else {
                        param = {
                            TrgtCbu: numeroCBU.value
                        };

                        segurosOnlineService.getInfoTitularCuenta(param).then(function (data) {

                            //VALIDACION DNI TITULAR COTITULAR Y USUARIO BLOQUEADO
                            if (data.Code == "NO_ERROR") {
                                var json = Utils.xmlToJson(data.Message.Response.responseParam);

                                if (Object.values(json.responseParam.MsgUsageSeg.RspInfo.RspType) == "OK") {
                                    //VALIDAR CUIT/CUIL
                                    var vExisteCUI = false;

                                    if (json.responseParam.BusDataSeg.Ownership.TaxIds instanceof Array) {
                                        for (var i = 0; i < json.responseParam.BusDataSeg.Ownership.TaxIds.length; i++) {
                                            if (_this.state.form.titularCUIT.value == Object.values(json.responseParam.BusDataSeg.Ownership.TaxIds[i])) {
                                                vExisteCUI = true;
                                            }
                                        }
                                    } else {
                                        if (_this.state.form.titularCUIT.value == Object.values(json.responseParam.BusDataSeg.Ownership.TaxIds)[0]) {
                                            vExisteCUI = true;
                                        }
                                    }

                                    if (vExisteCUI) {
                                        _this.setState({
                                            cuentaTitular: Object.values(json.responseParam.BusDataSeg.Ownership.OwnName)[0]
                                        });

                                        _this.props.addTipoCuenta(Object.values(json.responseParam.BusDataSeg.Ownership.Acct.Type.ShortDesc)[0]);
                                        _this.props.addNroCuenta(Object.values(json.responseParam.BusDataSeg.Ownership.Acct.Nmbr)[0]);
                                        _this.props.addNumeroCBU(_this.state.form.numeroCBU);
                                        _this.props.addCUIT(titularCUIT);
                                        _this.props.addTitular({
                                            value: Object.values(json.responseParam.BusDataSeg.Ownership.OwnName)[0]
                                        });
                                        setTimeout(function () {
                                            //Start the timer
                                            this.props.switch('rescateInfoAdicional'); //After 1 second, set render to true
                                        }.bind(_this), 1000);
                                    } else {
                                        //PANTALLA ERROR CUENTA NO COINCIDE CBU CON EL TITULAR
                                        //ERROR CON EL SERVICIO
                                        _this.setState({
                                            showModalSuccess: true,
                                            modal: {
                                                component: null,
                                                contentHTML: 'La cuenta ingresada no corresponde al tomador de la poliza.',
                                                html: true,
                                                title: "Rescates",
                                                size: "md"
                                            }
                                        });
                                    }
                                } else {
                                    //PANTALLA ERROR CUENTA NO COINCIDE CBU CON EL TITULAR
                                    //ERROR CON EL SERVICIO
                                    _this.setState({
                                        showModalSuccess: true,
                                        modal: {
                                            component: null,
                                            contentHTML: 'La cuenta ingresada no corresponde al tomador de la poliza.',
                                            html: true,
                                            title: "Rescates",
                                            size: "md"
                                        }
                                    });
                                }
                            } else {
                                //ERROR CON EL SERVICIO
                                _this.setState({
                                    showModalSuccess: true,
                                    modal: {
                                        component: null,
                                        contentHTML: 'Error al consultar el servicio de validacion de CBU.',
                                        html: true,
                                        title: "Rescates",
                                        size: "md"
                                    }
                                });
                            }
                        });
                    }
                }
            };

            _this.state = {
                listRadio: [],
                mensajeError: "",
                radioSelected: {},
                form: { numeroCBU: 0, titularCUIT: 0 },
                cuentaTitular: "",
                cuentaSeleccionada: null,
                valueSelectTitular: "S",
                valueSelectCoTitular: "N",
                numeroCBU: "",
                titularCBU: "",
                checked: true,
                checkOtraCuenta: true,
                disabledOtraCuenta: false,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false
                }
            };

            _this.handleChangeTitular = _this.handleChangeTitular.bind(_this);
            _this.handleChangeCoTitular = _this.handleChangeCoTitular.bind(_this);
            //    this._handleChangeCUIT = this._handleChangeCUIT.bind(this);

            return _this;
        }

        _createClass(RescateCobro, [{
            key: 'handleChangeTitular',
            value: function handleChangeTitular(event) {
                this.setState({
                    valueSelectTitular: event.target.value
                });
            }
        }, {
            key: 'handleChangeCoTitular',
            value: function handleChangeCoTitular(event) {
                this.setState({
                    valueSelectCoTitular: event.target.value
                });
            }

            /*   _handleChangeCUIT
               handleChangeTitular(event) {
                   this.setState({
                       valueSelectTitular: event.target.value
                   });
               }   */

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
            key: 'sleep',
            value: function sleep(time) {
                return new Promise(function (resolve) {
                    return setTimeout(resolve, time);
                });
            }
        }, {
            key: 'render',
            value: function render() {
                var _state$form = this.state.form,
                    numeroCBU = _state$form.numeroCBU,
                    titularCUIT = _state$form.titularCUIT;


                var submitDisabled = (typeof numeroCBU.isValidate !== "undefined" && numeroCBU.isValidate || this.state.disabledOtraCuenta == true ? false : true) || (typeof titularCUIT.isValidate !== "undefined" && titularCUIT.isValidate ? false : true) || this.props.isSubmitting;

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'panel d-block' },
                            React.createElement(
                                'div',
                                { className: 'panel-title' },
                                React.createElement(
                                    'h2',
                                    { className: 'text-left text-dark' },
                                    'Medio Cobro'
                                ),
                                React.createElement('hr', { className: 'red' })
                            ),
                            React.createElement(
                                'div',
                                { className: 'panel-container' },
                                React.createElement(
                                    'div',
                                    { align: 'left' },
                                    React.createElement(
                                        'div',
                                        null,
                                        React.createElement(
                                            'table',
                                            { className: 'table' },
                                            React.createElement(
                                                'tbody',
                                                null,
                                                React.createElement(
                                                    'tr',
                                                    null,
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        'Cuenta'
                                                    )
                                                ),
                                                React.createElement(
                                                    'tr',
                                                    null,
                                                    React.createElement(
                                                        'td',
                                                        null,
                                                        React.createElement(RadioGroupAccountExt, {
                                                            list: this.state.listRadio,
                                                            className: 'input-background-color',
                                                            id: 'radioSelected',
                                                            name: 'radioSelected',
                                                            onResult: this._handleResultsRadio,
                                                            otherEnabled: true,
                                                            onClick: this._handleOnChange,
                                                            checked: this.state.checked,
                                                            otherLabel: 'Ingresar cuenta'
                                                        })
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                this.state.checkOtraCuenta && React.createElement(
                                    'div',
                                    { className: 'form-group row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-4' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Numero de CBU'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-8' },
                                        React.createElement(InputValidationExt, {
                                            id: 'numeroCBU',
                                            name: 'numeroCBU'
                                            //   value={this.state.numeroCBU}
                                            , type: 'number',
                                            pattern: '[0-9]*',
                                            minLength: '10',
                                            maxLength: '22',
                                            requiredStr: 'CBU requerido',
                                            disabled: this.state.disabledOtraCuenta,
                                            className: 'form-control',
                                            onResult: this._handleResults
                                        })
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'form-group row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-4' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'CUIT titular cta.'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-8' },
                                        React.createElement(InputValidationExt, {
                                            id: 'titularCUIT',
                                            name: 'titularCUIT'
                                            //      value={this.state.titularCBU}
                                            , type: 'number',
                                            pattern: '[0-9]*',
                                            minLength: '11',
                                            maxLength: '11'
                                            //     onChange={this._handleChangeCUIT}
                                            , requiredStr: 'CUIT requerido',
                                            className: 'form-control',
                                            onResult: this._handleResults
                                        })
                                    )
                                ),
                                this.state.checkOtraCuenta && React.createElement(
                                    'div',
                                    { className: 'form-group row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-4' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Titular de la cuenta'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-8' },
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'cuentaTitular',
                                            id: 'cuentaTitular',
                                            className: 'form-control',
                                            value: this.state.cuentaTitular,
                                            disabled: 'disabled'
                                        })
                                    )
                                ),
                                this.state.checkOtraCuenta && React.createElement(
                                    'div',
                                    { className: 'form-group row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-4' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Es usted titular de esta cuenta?'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-8' },
                                        React.createElement(
                                            'select',
                                            { value: this.state.valueSelectTitular, onChange: this.handleChangeTitular,
                                                name: 'titularSelect',
                                                id: 'titularSelect',
                                                disabled: this.state.disabledOtraCuenta,
                                                className: 'form-control'
                                            },
                                            React.createElement(
                                                'option',
                                                { value: 'S' },
                                                'Si'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: 'N' },
                                                'No'
                                            )
                                        )
                                    )
                                ),
                                this.state.checkOtraCuenta && React.createElement(
                                    'div',
                                    { className: 'form-group row' },
                                    React.createElement(
                                        'div',
                                        { className: 'col-4' },
                                        React.createElement(
                                            'label',
                                            null,
                                            'Es usted Cotitular de esta cuenta?'
                                        )
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'col-8' },
                                        React.createElement(
                                            'select',
                                            { value: this.state.valueSelectCoTitular, onChange: this.handleChangeCoTitular,
                                                className: 'form-control',
                                                disabled: this.state.disabledOtraCuenta },
                                            React.createElement(
                                                'option',
                                                { value: 'S' },
                                                'Si'
                                            ),
                                            React.createElement(
                                                'option',
                                                { value: 'N' },
                                                'No'
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { align: 'right' },
                                    React.createElement(
                                        'button',
                                        {
                                            disabled: submitDisabled,
                                            className: 'btn btn-hsbc right ' + (submitDisabled ? 'disabled' : ""),
                                            onClick: this._handleSubmit },
                                        'Actualizar'
                                    ),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn btn-light border-dark right ml-2', onClick: this._handleBack },
                                        'Cancelar'
                                    )
                                )
                            )
                        ),
                        React.createElement(ModalReactBootstrap, {
                            title: this.state.modal.title,
                            show: this.state.showModalSuccess,
                            size: this.state.modal.size,
                            isOpen: this._handleModalIsOpen,
                            component: this.state.modal.component,
                            html: this.state.modal.html,
                            contentHTML: this.state.modal.contentHTML
                        })
                    )
                );
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                var _Store$getState = Store.getState(),
                    auth = _Store$getState.auth;

                var userService = new UserService();
                var segurosOnlineService = new SegurosOnlineService();
                var user = this.state.user;
                segurosOnlineService;

                userService.getLoggedUser().then(function (dataUser) {
                    segurosOnlineService.getRetrieveAccountOwnerInformation().then(function (data) {
                        if (data.Message.Code != "NO_ERROR") {
                            // // let json = Utils.xmlToJson(data.Message.Response.BusDataSeg)

                            // if (json.BusDataSeg && json.BusDataSeg.productDetails) {
                            //     this.setState({
                            //         dataUser: dataUser,
                            //         listRadio: json.BusDataSeg.productDetails
                            //     });
                            // // }
                        } else {
                            _this2.setState({
                                mensajeError: data.Message.Code
                            });
                        }
                    });
                });
            }
        }]);

        return RescateCobro;
    }(React.Component);

    return RescateCobro;
});