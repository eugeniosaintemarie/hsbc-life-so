var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/errormessage", "./terminosCondiciones", "../common/modalReactBootstrap", "../common/dropdownContainer", "../controller/loginController"], function (React, InputValidation, Errormessage, TerminosCondiciones, ModalReactBootstrap, DropdownContainer, LoginController) {
    var RegisterUserLogin = function (_React$Component) {
        _inherits(RegisterUserLogin, _React$Component);

        function RegisterUserLogin(props) {
            _classCallCheck(this, RegisterUserLogin);

            var _this = _possibleConstructorReturn(this, (RegisterUserLogin.__proto__ || Object.getPrototypeOf(RegisterUserLogin)).call(this, props));

            _this._handleResults = function (id, result) {
                var _this$setState;

                _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, "error", false), _defineProperty(_this$setState, "txtError", ''), _this$setState));
            };

            _this._handleOnChangeCheckbox = function (e) {
                _this._handleResults(e.target.id, e.target.checked);
            };

            _this._handleOnChangeRadio = function (e) {
                _this._handleResults(e.target.name, e.target.id);
            };

            _this._handleClickTerminos = function (e) {
                e.preventDefault();

                _this.setState({
                    showModalSinister: true,
                    modal: {
                        component: React.createElement(TerminosCondiciones, null),
                        title: "Sobre los Términos y Condiciones",
                        contentHTML: '',
                        html: false,
                        size: "lg"
                    }
                });
            };

            _this._enableButton = function () {
                var _this$state = _this.state,
                    email = _this$state.email,
                    typeDoc = _this$state.typeDoc,
                    nroDoc = _this$state.nroDoc,
                    repeatEmail = _this$state.repeatEmail,
                    personalData = _this$state.personalData,
                    tycSegurosOnline = _this$state.tycSegurosOnline,
                    tycHSBCSeguros = _this$state.tycHSBCSeguros;


                if (email.isValidate && typeDoc.value != '' && nroDoc.isValidate && repeatEmail.isValidate && personalData != '' && tycSegurosOnline != false && tycHSBCSeguros != false && repeatEmail.value === email.value) {

                    if (_this.state.displayError) {
                        _this.setState({
                            displayError: false
                        });
                    }

                    return false;
                } else {
                    if (repeatEmail.value !== undefined && email.value !== undefined && repeatEmail.value !== '' && email.value !== '' && email.value !== repeatEmail.value) {
                        if (!_this.state.displayError) {
                            _this.setState({
                                displayError: true,
                                errorMsg: 'El email y su confirmación no coinciden.'
                            });
                        }
                    } else if (_this.state.displayError) {
                        _this.setState({
                            displayError: false
                        });
                    }
                }

                return true;
            };

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModalSinister;
                _this.setState({
                    showModalSinister: !current
                });

                if (_this.state.userRegistered) {
                    _this.props.close();
                }
            };

            _this._sendRegisterForm = function () {

                var controller = new LoginController();
                var _this$state2 = _this.state,
                    email = _this$state2.email,
                    typeDoc = _this$state2.typeDoc,
                    nroDoc = _this$state2.nroDoc,
                    repeatEmail = _this$state2.repeatEmail,
                    personalData = _this$state2.personalData,
                    tycSegurosOnline = _this$state2.tycSegurosOnline,
                    tycHSBCSeguros = _this$state2.tycHSBCSeguros;


                controller.registerUser(typeDoc.id, nroDoc.value, repeatEmail.value, function (result) {

                    if (result.CODRESULTADO === 'OK') {
                        _this.setState({
                            showModalSinister: true,
                            modal: {
                                title: "Registración exitosa",
                                contentHTML: 'La registración se ha realizado exitosamente.',
                                html: true,
                                component: null,
                                size: "md",
                                responseModal: null,
                                hiddenButtonClose: false
                            }
                        });

                        _this.setState({ userRegistered: true });
                    } else {
                        var errorMsg = '';

                        switch (result.CODERROR) {
                            case "existeDoc":
                                errorMsg = "Los datos ingresados ya se encuentran registrados con otra combinación de datos, por favor verificalos.";
                                break;

                            case "existeMail":
                                errorMsg = "Los datos ingresados ya se encuentran registrados con otra combinación de datos, por favor verificalos.";
                                break;

                            case "mcteMsg_NOEXISTEUSRSQL":
                                errorMsg = "Los datos que ingresaste no corresponden a ningún cliente suscripto en HSBC Seguros On Line";
                                break;

                            case "EXISTEUSR":
                                errorMsg = "Los datos ingresados ya se encuentran registrados con otra combinación de datos, por favor verificalos";
                                break;

                            case "mcteMsg_NOPRODNBWS_HAB":
                                errorMsg = "No se han encontrado pólizas de los productos incluídos en el servicio de HSBC Seguros On Line.";
                                break;

                            case "mcteMsg_NOPRODNBWS":
                                errorMsg = "El cliente no posee pólizas vigentes en la compañía por lo que no es posible continuar con la solicitud de alta.";
                                break;

                            default:
                                errorMsg = "Hubo un error en el servicio.";

                        }

                        _this.setState({
                            showModalSinister: true,
                            modal: {
                                title: "Registración fallida",
                                contentHTML: errorMsg,
                                html: true,
                                size: "lg",
                                responseModal: null,
                                hiddenButtonClose: false,
                                component: null
                            }
                        });
                    }
                });
            };

            _this.state = {
                userRegistered: false,
                displayError: false,
                errorMsg: '',
                listTipoDoc: {},
                typeDoc: {},
                nroDoc: {},
                email: {},
                repeatEmail: {},
                personalData: '',
                tycSegurosOnline: false,
                tycHSBCSeguros: false,
                showModalSinister: false,
                modal: {
                    title: "",
                    component: null,
                    contentHTML: '',
                    html: false,
                    size: "md",
                    responseModal: null,
                    hiddenButtonClose: false
                }
            };
            return _this;
        }

        _createClass(RegisterUserLogin, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "p",
                        null,
                        "Una vez que completes los datos solicitados te llegar\xE1 a tu casilla de e-mail una contrase\xF1a de ingreso inicial con la cual tendr\xE1s que ingresar a HSBC Seguros On Line para completar por Primera y \xDAnica Vez los datos que te identifican como cliente."
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-2" },
                        React.createElement(
                            "div",
                            { className: "col-5 col-lg-3" },
                            React.createElement(
                                "label",
                                {
                                    className: "form-check-label",
                                    htmlFor: "typeDoc" },
                                "Tipo de documento"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 col-lg-3" },
                            React.createElement(DropdownContainer, {
                                dataList: this.state.listTipoDoc,
                                className: "input-background-color form-control",
                                id: "typeDoc",
                                name: "typeDoc",
                                idObject: "POV_COD_TDO",
                                nameObject: "POV_DES_TDO",
                                onResult: this._handleResults })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-2" },
                        React.createElement(
                            "div",
                            { className: "col-5 col-lg-3" },
                            React.createElement(
                                "label",
                                {
                                    className: "form-check-label",
                                    htmlFor: "nroDoc" },
                                "N\xB0 de documento"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 col-lg-3" },
                            React.createElement(InputValidation, {
                                id: "nroDoc",
                                name: "nroDoc",
                                minLength: "0",
                                maxLength: "100",
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control w-100 ",
                                onResult: this._handleResults })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-2" },
                        React.createElement(
                            "div",
                            { className: "col-5 col-lg-3" },
                            React.createElement(
                                "label",
                                {
                                    className: "form-check-label",
                                    htmlFor: "email" },
                                "E-mail"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 col-lg-3" },
                            React.createElement(InputValidation, {
                                id: "email",
                                name: "email",
                                minLength: "5",
                                maxLength: "50",
                                requiredStr: "Email requerido",
                                invalidStr: "El campo no tiene formato de correo",
                                charactersStr: "",
                                pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                                className: "input-background-color form-control w-100 ",
                                onResult: this._handleResults })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-2" },
                        React.createElement(
                            "div",
                            { className: "col-5 col-lg-3" },
                            React.createElement(
                                "label",
                                {
                                    className: "form-check-label",
                                    htmlFor: "repeatEmail" },
                                "Confirmacion de e-mail"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 col-lg-3" },
                            React.createElement(InputValidation, {
                                id: "repeatEmail",
                                name: "repeatEmail",
                                minLength: "5",
                                maxLength: "50",
                                requiredStr: "Email requerido",
                                invalidStr: "El campo no tiene formato de correo",
                                charactersStr: "",
                                pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                                className: "input-background-color form-control w-100 ",
                                onResult: this._handleResults })
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "p",
                        null,
                        "Presto conformidad para ceder los datos personales incluidos en este formulario a las dem\xE1s Compa\xF1\xEDas que integran el Grupo HSBC, a efectos de recibir informaci\xF3n acerca de sus productos por este medio."
                    ),
                    React.createElement(
                        "div",
                        { className: "m-2" },
                        React.createElement(
                            "div",
                            { className: "custom-control custom-radio custom-control-inline" },
                            React.createElement("input", { onChange: this._handleOnChangeRadio, type: "radio", id: "yes", name: "personalData", className: "custom-control-input" }),
                            React.createElement(
                                "label",
                                { className: "custom-control-label", htmlFor: "yes" },
                                "Si"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "custom-control custom-radio custom-control-inline" },
                            React.createElement("input", { onChange: this._handleOnChangeRadio, type: "radio", id: "no", name: "personalData", className: "custom-control-input" }),
                            React.createElement(
                                "label",
                                { className: "custom-control-label", htmlFor: "no" },
                                "No"
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "div",
                        { className: "row m-2" },
                        React.createElement(
                            "div",
                            { className: "custom-control custom-checkbox d-inline" },
                            React.createElement("input", { onChange: this._handleOnChangeCheckbox, type: "checkbox", className: "custom-control-input", id: "tycSegurosOnline", name: "tycSegurosOnline", onClick: function (e) {
                                    e ? this._handleResults(e.target.id, e.target.checked) : '';
                                }.bind(this), required: true }),
                            React.createElement(
                                "label",
                                { className: "custom-control-label", htmlFor: "tycSegurosOnline" },
                                React.createElement(
                                    "a",
                                    { href: "#", onClick: this._handleClickTerminos },
                                    "Acepto t\xE9rminos y condiciones de Seguros On Line"
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row m-2" },
                        React.createElement(
                            "div",
                            { className: "custom-control custom-checkbox d-inline" },
                            React.createElement("input", { onChange: this._handleOnChangeCheckbox, type: "checkbox", className: "custom-control-input", id: "tycHSBCSeguros", name: "tycHSBCSeguros", onClick: function (e) {
                                    e ? this._handleResults(e.target.id, e.target.checked) : '';
                                }.bind(this), required: true }),
                            React.createElement(
                                "label",
                                { className: "custom-control-label", htmlFor: "tycHSBCSeguros" },
                                React.createElement(
                                    "a",
                                    { href: "/seguros-gateway/getPDF/TyC.pdf", target: "blank" },
                                    "Acepto t\xE9rminos y condiciones de HSBC Seguros"
                                )
                            )
                        )
                    ),
                    React.createElement(Errormessage, { className: "text-danger", show: this.state.displayError, text: this.state.errorMsg }),
                    "Es necesario que leas y confirmes los t\xE9rminos y condiciones de uso del servicio.",
                    React.createElement("br", null),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "button",
                            { onClick: this.props.close,
                                type: "button",
                                className: "btn btn-danger m-2", "data-dismiss": "modal" },
                            "Cancelar"
                        ),
                        React.createElement(
                            "button",
                            { onClick: this._sendRegisterForm,
                                type: "button",
                                disabled: this._enableButton(),
                                className: "btn btn-success m-2" },
                            "Continuar"
                        )
                    ),
                    React.createElement(ModalReactBootstrap, {
                        title: this.state.modal.title,
                        show: this.state.showModalSinister,
                        size: this.state.modal.size,
                        isOpen: this._handleModalIsOpen,
                        contentHTML: this.state.modal.contentHTML,
                        html: this.state.modal.html,
                        component: this.state.modal.component,
                        responseModal: true,
                        hiddenButtonClose: false })
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                var controller = new LoginController();

                controller.getTiposDocumento().then(function (data) {
                    _this2.setState({
                        listTipoDoc: data
                    });
                });
            }
        }]);

        return RegisterUserLogin;
    }(React.Component);

    return RegisterUserLogin;
});