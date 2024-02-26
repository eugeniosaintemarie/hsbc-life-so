var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/datepicker", "../../common/dropdownContent", "../../redux/store", "../../services/abmNominaService", "../../common/modalReactBootstrap", "../../lib/utils"], function (React, DatePicker, DropDownContent, Store, AbmNominaService, ModalReactBootstrap, Utils) {
    var IngresarNomina = function (_React$Component) {
        _inherits(IngresarNomina, _React$Component);

        function IngresarNomina(props) {
            _classCallCheck(this, IngresarNomina);

            var _this = _possibleConstructorReturn(this, (IngresarNomina.__proto__ || Object.getPrototypeOf(IngresarNomina)).call(this, props));

            _this.FORM_NAME = "main";

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModal;
                _this.setState({
                    showModal: !current
                });
            };

            _this._showModal = function () {
                _this.setState({
                    showModal: true,
                    modal: {
                        component: null,
                        contentHTML: "La fecha ingresada no es valida.",
                        html: true,
                        title: "Nomina de asegurados",
                        size: "md"
                    }
                });
            };

            _this._handleBack = function () {
                _this.props.switch('home');
            };

            _this._handleDateResults = function (id, result) {
                _this.props.startLoading();

                var abmNominaService = new AbmNominaService();

                var currentProduct = Store.getState().seguros.currentProduct;

                var numberDate = Number(result.id);
                var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
                var indexOptionDate = _this.props.optionsDate.findIndex(function (date) {
                    return date.FECEFESU === numberDate;
                });

                if (indexOptionDate === 1) {
                    abmNominaService.getPolDispABM({
                        RAMOPCOD: detalle.RAMOPCOD,
                        POLIZANN: detalle.POLIZANN,
                        POLIZSEC: detalle.POLIZSEC,
                        CERTIPOL: detalle.CERTIPOL,
                        CERTIANN: detalle.CERTIANN,
                        CERTISEC: detalle.CERTISEC,
                        FECEFECT: numberDate
                    }).then(function (response) {
                        if (response.Message.DATOS.MARCA === "OK") {
                            var _this$setState;

                            _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, Utils.formatFechaString(result.id)), _defineProperty(_this$setState, "disableOptions", false), _this$setState));
                        } else {
                            var _this$setState2;

                            _this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, id, Utils.formatFechaString(result.id)), _defineProperty(_this$setState2, "showModal", true), _defineProperty(_this$setState2, "modal", {
                                component: null,
                                contentHTML: "No es posible cargar esta nomina ya que la vigencia para la misma aun no se encuentra habilitada.",
                                html: true,
                                title: "Nomina de asegurados",
                                size: "md"
                            }), _defineProperty(_this$setState2, "sigProceso", ""), _defineProperty(_this$setState2, "disableOptions", true), _defineProperty(_this$setState2, "showErrorNotCompleted", false), _this$setState2));
                        }
                    });
                } else {
                    var _this$setState3;

                    _this.setState((_this$setState3 = {}, _defineProperty(_this$setState3, id, Utils.formatFechaString(result.id)), _defineProperty(_this$setState3, "disableOptions", false), _this$setState3));
                }
            };

            _this._handleResults = function (id, result) {
                _this.setState(_defineProperty({}, id, result));
            };

            _this._handleOnChangeRadio = function (e) {
                _this._handleResults(e.target.name, e.target.id);
            };

            _this._handleSubmit = function () {
                if (_this._verifyFields()) {
                    _this.setState({
                        showErrorNotCompleted: false
                    });
                    _this.props.saveGroupData(Number(_this.formatDate(_this.state.datePedido)), _this.state.group.id.padStart(10, "0"), _this.state.group.value);
                    _this.props.switch(_this.state.sigProceso);
                } else {
                    _this.setState({
                        showErrorNotCompleted: true
                    });
                }
            };

            _this.getGroups = function () {
                var abmNominaService = new AbmNominaService();

                var currentProduct = Store.getState().seguros.currentProduct;

                var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

                var fechvigen = _this.state.datePedido ? _this.formatDate(_this.state.datePedido) : _this.formatDate(_this.state.today);

                if (fechvigen && !_this.state.disableOptions) {
                    abmNominaService.traerCondicionesPoliza({
                        CIAASCOD: detalle.CIAASCOD,
                        RAMOPCOD: detalle.RAMOPCOD,
                        POLIZANN: detalle.POLIZANN,
                        POLIZSEC: detalle.POLIZSEC,
                        CERTIPOL: detalle.CERTIPOL,
                        CERTIANN: detalle.CERTIANN,
                        CERTISEC: detalle.CERTISEC,
                        FECHVIGEN: fechvigen
                    }).then(function (data) {
                        if (data && data.GRUPOS.GRUPO && data.GRUPOS.GRUPO.length > 0) {
                            var apiGroups = [];

                            data.GRUPOS.GRUPO.forEach(function (group) {
                                apiGroups.push({ id: group.GRUPOCOD, name: group.GRUPODES });
                            });

                            _this.setState({
                                groups: apiGroups
                            });

                            _this.props.stopLoading();
                        } else {
                            _this.setState({ groups: [] });
                            _this._showModal();

                            _this.props.stopLoading();
                        }
                    });
                } else {
                    _this.setState({ groups: [] });
                    _this.props.stopLoading();
                }
            };

            _this._verifyFields = function () {
                return ['nominaAbm', 'nominaCompleta'].includes(_this.state.sigProceso) && _this.state.group != "" && _this.state.datePedido != "";
            };

            var todayS = new Date();
            todayS = (todayS.getUTCDate() < 10 ? '0' : '') + todayS.getUTCDate().toString() + '/' + (todayS.getMonth() < 9 ? '0' : '') + (todayS.getMonth() + 1) + '/' + todayS.getFullYear();

            _this.state = {
                today: todayS,
                datePedido: '',
                group: '',
                groups: [],
                sigProceso: 'nominaCompleta',
                showErrorNotCompleted: false,
                disableOptions: false,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false
                },
                showModal: false
            };
            return _this;
        }

        _createClass(IngresarNomina, [{
            key: "formatDate",
            value: function formatDate(date) {
                var value;
                date = date.split('/');
                value = date[2] + date[1] + date[0];
                return parseInt(value);
            }
        }, {
            key: "render",
            value: function render() {
                var currentProduct = Store.getState().seguros.currentProduct;

                var ramo = currentProduct.ramopcod;
                var ramosPermitidos = ["CAP1", "CAP2", "CAP3", "CAP5", "CA01", "CA11", "CA12", "CA13", "CA21", "CE11", "CT01", "CT11", "CO11"];
                var enUnMes = new Date(new Date().setMonth(new Date().getMonth() + 1));

                if (!ramosPermitidos.some(function (e) {
                    return e == ramo;
                })) {
                    //FUERA DE SCOPE
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            "h4",
                            { className: "subtitle-inside" },
                            "Lo sentimos!"
                        ),
                        React.createElement(
                            "div",
                            { className: "container remove-left-padding profile-container" },
                            React.createElement(
                                "div",
                                { className: "col-12 mt-4" },
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-12" },
                                        React.createElement(
                                            "div",
                                            { className: "text-justify" },
                                            React.createElement(
                                                "label",
                                                null,
                                                "No es posible realizar la carga para este producto por este medio"
                                            ),
                                            React.createElement(
                                                "label",
                                                null,
                                                "Por favor comun\xEDcate con tu ejecutivo de cuentas para poder realizar la carga."
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group row text-center mt-5" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-12" },
                                        React.createElement(
                                            "button",
                                            { onClick: this._handleBack, className: "btn btn-light" },
                                            "Volver"
                                        )
                                    )
                                )
                            )
                        )
                    );
                } else {
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            "h4",
                            { className: "subtitle-inside" },
                            "Ingres\xE1 la n\xF3mina de asegurados"
                        ),
                        React.createElement(
                            "div",
                            { className: "container remove-left-padding profile-container" },
                            React.createElement(
                                "div",
                                { className: "col-12 mt-4" },
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Fecha pedido de actualizaci\xF3n:"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(DropDownContent, {
                                            list: this.props.optionsDate,
                                            className: "form-control",
                                            id: "datePedido",
                                            name: "datePedido",
                                            idObject: "FECEFESU",
                                            nameObject: "FECHA",
                                            defaultValue: '',
                                            defaultName: true,
                                            showPlaceHolder: true,
                                            placeHolder: "Seleccione...",
                                            onResult: this._handleDateResults
                                        }),
                                        React.createElement(
                                            "p",
                                            { className: "mt-3" },
                                            "Las fechas disponibles corresponden a las vigencias habilitadas. Cualquier duda contactarse con su ejecutivo de cuenta."
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(
                                            "label",
                                            null,
                                            "Grupos:"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(DropDownContent, {
                                            list: this.state.groups // TODO: VER QUE VA ACA
                                            , className: "form-control",
                                            id: "group",
                                            name: "group",
                                            defaultValue: '',
                                            defaultName: true,
                                            disabled: this.state.disableOptions,
                                            showPlaceHolder: true,
                                            placeHolder: "Seleccione...",
                                            onResult: this._handleResults })
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(
                                            "div",
                                            { className: "custom-control custom-radio custom-control-inline" },
                                            React.createElement("input", { onChange: this._handleOnChangeRadio, type: "radio", id: "nominaCompleta", name: "sigProceso", checked: this.state.sigProceso == "nominaCompleta", className: "float-right custom-control-input", disabled: this.state.disableOptions }),
                                            React.createElement(
                                                "label",
                                                { className: "custom-control-label", name: "sigProceso", htmlFor: "nominaCompleta" },
                                                React.createElement(
                                                    "small",
                                                    null,
                                                    "Informa n\xF3mina completa"
                                                )
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(
                                            "div",
                                            { className: "custom-control custom-radio custom-control-inline" },
                                            React.createElement("input", { onChange: this._handleOnChangeRadio, type: "radio", id: "nominaAbm", name: "sigProceso", className: "float-right custom-control-input", disabled: this.state.disableOptions }),
                                            React.createElement(
                                                "label",
                                                { className: "custom-control-label", name: "sigProceso", htmlFor: "nominaAbm" },
                                                React.createElement(
                                                    "small",
                                                    null,
                                                    "Informa Alta, Baja o Modificaci\xF3n Individual"
                                                )
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "alert alert-danger text-center" },
                                    this.state.showErrorNotCompleted && "Por favor, completá los campos indicados para poder continuar..."
                                ),
                                React.createElement(
                                    "div",
                                    { className: "form-group row text-center mt-5" },
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(
                                            "button",
                                            { onClick: this._handleBack, className: "btn btn-light" },
                                            "Cancelar"
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-md-6" },
                                        React.createElement(
                                            "button",
                                            { onClick: this._handleSubmit, className: "btn btn-hsbc", disabled: this.state.disableOptions },
                                            "Continuar"
                                        )
                                    )
                                )
                            )
                        ),
                        React.createElement(ModalReactBootstrap, {
                            title: this.state.modal.title,
                            show: this.state.showModal,
                            size: this.state.modal.size,
                            isOpen: this._handleModalIsOpen,
                            component: this.state.modal.component,
                            html: this.state.modal.html,
                            contentHTML: this.state.modal.contentHTML
                        })
                    );
                }
            }
        }, {
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps, prevState) {
                if (prevState.datePedido !== this.state.datePedido) {
                    this.getGroups();
                }
            }
        }]);

        return IngresarNomina;
    }(React.Component);

    return IngresarNomina;
});