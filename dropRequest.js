var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/segurosOnlineService", "../redux/store", "../common/inputvalidation", "../common/inputvalidationExt", "../common/dropdownContent", "../common/modalReactBootstrap", "../controller/vidaColectivoController", "../lib/utils"], function (React, SegurosOnlineService, Store, InputValidation, InputValidationExt, DropDownContent, ModalReactBootstrap, VidaColectivoController, Utils) {
    var DropRequest = function (_React$Component) {
        _inherits(DropRequest, _React$Component);

        function DropRequest(props) {
            _classCallCheck(this, DropRequest);

            var _this = _possibleConstructorReturn(this, (DropRequest.__proto__ || Object.getPrototypeOf(DropRequest)).call(this, props));

            _this.FORM_NAME = "DropRequest";

            _this.handleClickPendientes = function () {
                var producto = _this.state.producto;

                _this.setState({
                    showModalPendiente: true,
                    modalPendiente: {
                        title: "",
                        component: null,
                        textBtnAccept: "Si",
                        textBtnCancel: "No",
                        size: "md",
                        html: true,
                        contentHTML: "\xBFEstas seguro que desea dar de baja la p\xF3liza " + producto
                    }
                });
            };

            _this.getValoresMotivo = function () {
                _this.vidaColectivoController.getMotivosBaja(function (data) {
                    _this.setState({
                        listMotivos: data.Message.REGS.REG
                    });
                });
            };

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

            _this._handleResultsMotivo = function (id, result) {
                var data = _defineProperty({}, id, result);
                var form = Object.keys(_this.state.form);
                form = form.find(function (el) {
                    return el === id;
                });

                var filterMotivo = _this.state.listMotivos.filter(function (e) {
                    return e.COD_MOT === Number(result.id);
                });

                if (typeof form !== "undefined") {
                    var current = _this.state;
                    var old = _this.state.form;

                    _this.setState(Object.assign({}, current, {
                        form: Object.assign({}, old, data),
                        motivoSelectedOtr: filterMotivo[0].OTR_MOT
                    }));
                }
            };

            _this.handleModalPendienteIsOpen = function (e) {
                var current = _this.state.showModalPendiente;

                _this.setState({
                    showModalPendiente: !current
                });
            };

            _this._aceptarButton = function () {
                _this.setState({
                    requestSent: true
                });

                var list = {
                    TIP_PRO: _this.state.produTipo,
                    COD_PRO: _this.state.listProdu.RAMOPCOD,
                    POL_ANN: _this.state.listProdu.POLIZANN,
                    POL_SEC: _this.state.listProdu.POLIZSEC,
                    CER_POL: _this.state.listProdu.CERTIPOL,
                    CER_ANN: _this.state.listProdu.CERTIANN,
                    CER_SEC: _this.state.listProdu.CERTISEC,
                    COD_MOT: Number(_this.state.form.motivo.id),
                    TEL_CON: _this.state.form.telefono.value,
                    HOR_CON: _this.state.form.horario.value,
                    OTR_MOT: _this.state.form.OTR.value || _this.state.form.OTR

                };

                _this.vidaColectivoController.setSolicitudBaja(list, function (data) {
                    _this.setState({
                        setSolicitudStatus: data.Message.REGS.REG
                    });
                });
            };

            _this._handleActualizarImpresos = function () {
                var _this$state$form = _this.state.form,
                    motivo = _this$state$form.motivo,
                    telefono = _this$state$form.telefono,
                    horario = _this$state$form.horario;


                if (!_this.state.disabled) {
                    if (motivo === '' || telefono.value === '' || horario.value === '') {
                        _this.setState({
                            showErrorNotCompleted: true,
                            showErrorNotConfirmed: false
                        });

                        return;
                    } else if (!_this.state.checked) {
                        _this.setState({
                            showErrorNotCompleted: false,
                            showErrorNotConfirmed: true
                        });

                        return;
                    }
                }

                _this.handleClickPendientes();

                _this.setState({
                    showErrorNotCompleted: false,
                    showErrorNotConfirmed: false
                });
            };

            _this.state = {
                requestSent: false,
                listMotivos: [],
                motivoSelectedOtr: "",
                listChecked: [],
                setSolicitudStatus: "",
                disabled: null,
                form: { motivo: "", telefono: "", horario: "", OTR: "" },
                invalidInputMotivo: "form-control",
                invalidInputTelefono: "form-control",
                invalidInputHorario: "form-control",
                checked: false,
                producto: "",
                listProdu: {},
                produTipo: {},
                showModal: false,
                showModalPendiente: false,
                modalPendiente: {
                    component: null,
                    contentHTML: "",
                    html: true,
                    title: "",
                    size: "md",
                    accept: null,
                    disBtnAccept: false,
                    hiddenButtonClose: true
                },
                modal: {
                    component: null,
                    contentHTML: "",
                    html: true,
                    title: "",
                    size: "md",
                    accept: null,
                    disBtnAccept: true
                }
            };

            segurosOnlineService = new SegurosOnlineService();

            _this.handleOptionChecked = _this.handleOptionChecked.bind(_this);
            _this.vidaColectivoController = new VidaColectivoController();
            return _this;
        }

        _createClass(DropRequest, [{
            key: "handleOptionChecked",
            value: function handleOptionChecked(event) {
                if (event.target.checked === true) {
                    this.setState({
                        checked: true
                    });
                } else {
                    this.setState({
                        checked: false
                    });
                }
            }
        }, {
            key: "render",
            value: function render() {
                var currentProduct = Store.getState().seguros.currentProduct;

                var tipoproduct = void 0;
                var certisec = void 0;

                if (currentProduct.detalle == "" || currentProduct.detalle == null) {
                    tipoproduct = currentProduct.TIPOPRODU;
                    certisec = currentProduct.certisec;
                } else {
                    tipoproduct = currentProduct.detalle.TIPOPRODU;
                    certisec = currentProduct.detalle.CERTISEC;
                }

                if (tipoproduct === "R" || tipoproduct === "O" && certisec > 0) {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "h6",
                                    null,
                                    "Solicitud de rescate parcial o total"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    "Para poder efectuar el rescate deber\xE1s enviar un email a la casilla segurosderetiro@hsbc.com.ar con el texto debajo detallado, reemplazando Apellido_Y_Nombre, Numero_De_CUIL y Numero_De_Poliza con tu informaci\xF3n."
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "\"Yo, Apellido_Y_Nombre, CUIL Numero_De_CUIL, en mi car\xE1cter de asegurado activo de la p\xF3liza Numero_De_Poliza declaro que la informaci\xF3n consignada en lo solicitado mediante el formulario es fidedigno y corresponde a una solicitud de Rescate de Fondos.\""
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "Asimismo declaro conocer, comprender y aceptar que a pedido de la compa\xF1\xEDa, y de ser necesario, se presentara documentaci\xF3n original o adicional."
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    React.createElement(
                                        "div",
                                        null,
                                        "Documentaci\xF3n a adjuntar en el mail"
                                    ),
                                    React.createElement(
                                        "div",
                                        null,
                                        "- Solicitud de Rescate de los Fondos"
                                    ),
                                    React.createElement(
                                        "div",
                                        null,
                                        "- Adjuntar foto del documento de identidad (Hoja 1 y 2)."
                                    )
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "Una vez iniciado el tr\xE1mite, en el plazo de 10 a 15 d\xEDas h\xE1biles recibir\xE1s la acreditaci\xF3n en tu cuenta bancaria."
                                ),
                                React.createElement(
                                    "p",
                                    null,
                                    "Descarg\xE1 el pdf seg\xFAn el ramo de tu p\xF3liza:"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    null,
                                    "RE05/RC05 - PDF Rescate en Pesos _"
                                ),
                                React.createElement(
                                    "a",
                                    { href: "/seguros-gateway/getPDF/retiro_rescate_PESOS_TOFILL.pdf", rel: "noreferrer", download: true, target: "_blank" },
                                    React.createElement(
                                        "button",
                                        { "class": "btn  btn-hsbc" },
                                        "Descargar..."
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "label",
                                    null,
                                    "RE07/ RC07 - PDF Rescates en D\xF3lares (paga en pesos) _"
                                ),
                                React.createElement(
                                    "a",
                                    { href: "/seguros-gateway/getPDF/retiro_rescate_USD_PESOS_TOFILL.pdf", rel: "noreferrer", download: true, target: "_blank" },
                                    React.createElement(
                                        "button",
                                        { "class": "btn  btn-hsbc" },
                                        "Descargar..."
                                    )
                                )
                            )
                        )
                    );
                } else if (tipoproduct === "O" && certisec === 0) {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "h6",
                                    null,
                                    "Solicitud de baja de la poliza"
                                )
                            ),
                            React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "p",
                                    null,
                                    "Para proceder a la baja de la p\xF3liza colectiva, todas las cuentas deber\xE1n estar sin saldo, en este caso, se puede tramitar la anulaci\xF3n de la misma enviando un mail a la casilla segurosderetiro@hsbc.com.ar y detellando en el asunto: BAJA DE POLIZA"
                                )
                            )
                        )
                    );
                } else if (tipoproduct === "C" || tipoproduct === "M" || tipoproduct === "L") {
                    if (this.state.requestSent === false) {
                        return React.createElement(
                            "div",
                            { className: "container remove-left-padding profile-container" },
                            React.createElement(
                                "h4",
                                { "class": "subtitle-inside" },
                                "Solicitud de Baja"
                            ),
                            React.createElement(
                                "div",
                                { className: "panel col-md-10" },
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-4" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Motivo"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-8" },
                                        React.createElement(DropDownContent, {
                                            list: this.state.listMotivos,
                                            className: "form-control",
                                            id: "motivo",
                                            name: "motivo",
                                            showPlaceHolder: true,
                                            placeHolder: "Seleccione...",
                                            idObject: "COD_MOT",
                                            nameObject: "DES_MOT",
                                            requiredStr: "Seleccione un motivo por favor",
                                            onResult: this._handleResultsMotivo,
                                            disabled: false
                                        })
                                    )
                                ),
                                this.state.motivoSelectedOtr === "S" ? React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "div",
                                        { className: "form-group row" },
                                        React.createElement(
                                            "div",
                                            { className: "col-md-4" },
                                            React.createElement(
                                                "label",
                                                null,
                                                "Motivo de Anulacion"
                                            )
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "col-md-8" },
                                            React.createElement(InputValidation, {
                                                id: "OTR",
                                                name: "OTR",
                                                type: "text",
                                                className: "form-control",
                                                maxLength: "100",
                                                requiredStr: "El motivo de anulacion es requerido",
                                                onResult: this._handleResults
                                            })
                                        )
                                    )
                                ) : "",
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-4" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Telefono de Contacto"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-8" },
                                        React.createElement(InputValidationExt, {
                                            id: "telefono",
                                            name: "telefono",
                                            type: "number",
                                            pattern: "[0-9]*",
                                            minLength: "6",
                                            maxLength: "12",
                                            className: "form-control",
                                            requiredStr: "Telefono de Contacto es requerido",
                                            onResult: this._handleResults
                                        })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-4" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Horario para Contactar"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-8" },
                                        React.createElement(InputValidation, {
                                            id: "horario",
                                            name: "horario",
                                            type: "text",
                                            className: "form-control",
                                            maxLength: "30",
                                            requiredStr: "Horario para Contactar es requerido",
                                            onResult: this._handleResults
                                        })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "radio" },
                                        React.createElement(
                                            "label",
                                            { className: "col-md-11" },
                                            React.createElement("input", { type: "checkbox", id: "conformidad", checked: this.state.checked, onChange: this.handleOptionChecked, onClick: this.handleOptionChecked }),
                                            "\xA0\xA0\xA0\xA0 Declaro que deseo dar de baja a mi poliza y estoy de acuerdo con los terminos y condiciones que seran afectados por la anulacion de la misma"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "alert alert-danger" },
                                    this.state.showErrorNotCompleted && "Por favor, completá los campos indicados para poder continuar...",
                                    this.state.showErrorNotConfirmed && "Debe aceptar la conformidad para enviar el mensaje."
                                ),
                                React.createElement(
                                    "div",
                                    { className: "panel-actions text-center center" },
                                    React.createElement(
                                        "button",
                                        {
                                            className: 'btn btn-hsbc left ml-2',
                                            onClick: this._handleActualizarImpresos
                                        },
                                        "Enviar"
                                    )
                                )
                            ),
                            React.createElement(ModalReactBootstrap, {
                                title: this.state.modalPendiente.title,
                                show: this.state.showModalPendiente,
                                size: this.state.modalPendiente.size,
                                isOpen: this.handleModalPendienteIsOpen,
                                component: this.state.modalPendiente.component,
                                html: this.state.modalPendiente.html,
                                contentHTML: this.state.modalPendiente.contentHTML,
                                accept: this._aceptarButton,
                                textBtnAccept: this.state.modalPendiente.textBtnAccept,
                                textBtnCancel: this.state.modalPendiente.textBtnCancel,
                                hiddenButtonClose: this.state.modalPendiente.hiddenButtonClose
                            })
                        );
                    } else {
                        return React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "h5",
                                { className: "bg-white" },
                                "Tu solicitud de baja fue enviada.",
                                React.createElement("br", null),
                                "Estaremos proces\xE1ndolo a la brevedad."
                            )
                        );
                    }
                }
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.getValoresMotivo();
                this.setState({ producto: this.props.handleShowDropRequest.polizaComp });

                if (!this.props.handleShowDropRequest.detalle) {
                    this.setState({
                        listProdu: this.props.handleShowDropRequest.cup,
                        produTipo: this.props.handleShowDropRequest.TIPOPRODU
                    });
                } else if (!this.props.handleShowDropRequest.cup) {
                    this.setState({
                        listProdu: this.props.handleShowDropRequest.detalle,
                        produTipo: this.props.handleShowDropRequest.detalle.TIPOPRODU
                    });
                }
            }
        }]);

        return DropRequest;
    }(React.Component);

    return DropRequest;
});