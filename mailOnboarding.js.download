var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../common/inputvalidation", "../common/errormessage", "../services/segurosOnlineService"], function (React, InputValidation, Errormessage, SegurosOnlineService) {
    var MailOnboarding = function (_React$Component) {
        _inherits(MailOnboarding, _React$Component);

        function MailOnboarding(props) {
            _classCallCheck(this, MailOnboarding);

            var _this = _possibleConstructorReturn(this, (MailOnboarding.__proto__ || Object.getPrototypeOf(MailOnboarding)).call(this, props));

            _this._handleResults = function (id, result) {
                var _this$setState;

                _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, "error", false), _this$setState));
            };

            _this._handlePass = function (id, result) {
                if (!_this.firstLoad) {
                    if (_this.state.passwordRepeat.value === result.value && _this.state.passwordRepeat.isValidate) {
                        _this.setState({
                            passOK: true,
                            showError: false
                        });
                    } else {
                        _this.setState({
                            passOK: false,
                            showError: true,
                            txtError: 'Las contraseñas no coinciden'
                        });
                    }
                }
                _this._handleResults(id, result);
            };

            _this._handlePassRepeat = function (id, result) {
                if (!_this.firstLoad) {
                    if (_this.state.password.value === result.value) {
                        _this.setState({
                            passOK: true,
                            showError: false
                        });
                    } else {
                        _this.setState({
                            passOK: false,
                            showError: true,
                            txtError: 'Las contraseñas no coinciden'
                        });
                    }
                }
                _this._handleResults(id, result);
            };

            _this._handleMail = function (id, result) {
                _this._handleResults(id, result);
                if (!_this.firstLoad) {
                    if (_this.state.confirmEmail.value === result.value && _this.state.confirmEmail.isValidate) {
                        _this.setState({
                            emailOK: true,
                            showError: false
                        });
                    } else {
                        _this.setState({
                            emailOK: false,
                            showError: true,
                            txtError: "Los E-mails ingresados no coinciden"
                        });
                    }
                }
            };

            _this._handleOtroMail = function (id, result) {
                _this._handleResults(id, result);
                if (!_this.firstLoad) {
                    if (_this.state.email.value === result.value && _this.state.email.isValidate) {
                        _this.setState({
                            emailOK: true,
                            showError: false
                        });
                    } else {
                        _this.setState({
                            emailOK: false,
                            showError: true,
                            txtError: "Los E-mails ingresados no coinciden"
                        });
                    }
                }
            };

            _this._handleOnClickCheck = function (e) {
                _this.setState({
                    accept: e.target.checked
                });
            };

            _this._handleContinue = function () {

                _this.setState({
                    accept: false
                });

                var listPol = _this.props.listPol;

                _this._procesarMasivo(listPol, function () {
                    _this.props.handleClose();
                });
            };

            _this._procesarMasivo = function (list, response) {
                var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                var e = list[index];
                if (!e.tieneMail) {
                    var productos = [];
                    var producto = {};
                    producto.CIAASCOD = e.detalle.CIAASCOD;
                    producto.RAMOPCOD = e.detalle.RAMOPCOD;
                    producto.POLIZANN = e.detalle.POLIZANN;
                    producto.POLIZSEC = e.detalle.POLIZSEC;
                    producto.CERTIPOL = e.detalle.CERTIPOL;
                    producto.CERTIANN = e.detalle.CERTIANN;
                    producto.CERTISEC = e.detalle.CERTISEC;
                    producto.SWSUSCRI = "2";
                    producto.MAIL = _this.state.email.value; //MAIL NUEVO
                    producto["SW-CLAVE"] = "U";
                    producto.CONFORME = "S";
                    producto.CLAVE = _this.state.password.value;

                    productos.push(producto);

                    _this.segurosOnlineService.procesarImpresosMasivo({ EPOLIZA: productos }).then(function (e) {
                        if (list.length > index + 1) {
                            index++;
                            _this._procesarMasivo(list, response, index);
                        } else {
                            _this.segurosOnlineService.setPolXEmailMasivo({ COD_EST: 'S' }).then(function (e) {
                                response();
                            });
                        };
                    });
                } else {
                    if (list.length > index + 1) {
                        index++;
                        _this._procesarMasivo(list, response, index);
                    } else {
                        _this.segurosOnlineService.setPolXEmailMasivo({ COD_EST: 'S' }).then(function (e) {
                            response();
                        });
                    };
                }
            };

            _this._handleNo = function () {
                _this.segurosOnlineService.setPolXEmailMasivo({ COD_EST: 'N' });
                _this.props.handleClose();
            };

            _this._handleAskLater = function () {
                _this.segurosOnlineService.setPolXEmailMasivo({ COD_EST: 'P' });
                _this.props.handleClose();
            };

            _this._showTyC = function (show) {
                _this.setState({
                    showTyC: show
                });
            };

            _this.state = {
                email: { value: _this.props.email, isValidate: false },
                confirmEmail: { value: _this.props.email, isValidate: false },
                password: {},
                passwordRepeat: {},
                emailOK: _this.props.email !== '' ? true : false,
                passOK: false,
                showError: false,
                txtError: '',
                passError: '',
                passRepetError: '',
                accept: false,
                showTyC: false
            };

            _this.firstLoad = true;

            _this.segurosOnlineService = new SegurosOnlineService();
            return _this;
        }

        _createClass(MailOnboarding, [{
            key: "render",
            value: function render() {
                var _this2 = this;

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: !this.state.showTyC ? '' : 'd-none' },
                        React.createElement(
                            "h2",
                            { className: "text-danger" },
                            "Env\xEDo de documentaci\xF3n por mail"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Contas con p\xF3lizas donde no se inform\xF3 una direcci\xF3n de correo electr\xF3nico. "
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Presto conformidad para recibir la p\xF3liza, sus endosos, los informes sobre el estado de la p\xF3liza y/o cualquier otro notificaci\xF3n relacionado con todas mis p\xF3lizas, mediante correo electr\xF3nico dirigido a las siguiente direcci\xF3n:"
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-2" },
                            React.createElement(
                                "div",
                                { className: "col-4 col-sm-3" },
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
                                { className: "col-6 col-sm-4" },
                                React.createElement(InputValidation, {
                                    id: "email",
                                    name: "email",
                                    minLength: "5",
                                    maxLength: "50",
                                    value: this.state.email.value,
                                    requiredStr: "Email requerido",
                                    invalidStr: "El campo no tiene formato de correo",
                                    charactersStr: "",
                                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                                    className: "input-background-color form-control w-100 ",
                                    onResult: this._handleMail })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-2" },
                            React.createElement(
                                "div",
                                { className: "col-4 col-sm-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "email" },
                                    "Confirmaci\xF3n de Mail"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 col-sm-4" },
                                React.createElement(InputValidation, {
                                    id: "confirmEmail",
                                    name: "confirmEmail",
                                    minLength: "5",
                                    maxLength: "50",
                                    value: this.state.confirmEmail.value,
                                    requiredStr: "Confirmacion Email requerido",
                                    invalidStr: "El campo no tiene formato de correo",
                                    charactersStr: "",
                                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                                    className: "input-background-color form-control w-100 ",
                                    onResult: this._handleOtroMail })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-2" },
                            React.createElement(
                                "div",
                                { className: "col-4 col-sm-3" },
                                React.createElement(
                                    "label",
                                    {
                                        htmlFor: "password",
                                        className: "form-check-label" },
                                    "Contrase\xF1a Nueva"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 col-sm-4" },
                                React.createElement(InputValidation, {
                                    id: "password",
                                    name: "password",
                                    type: "password",
                                    minLength: "6",
                                    maxLength: "10",
                                    requiredStr: "Password requerido",
                                    className: "form-control",
                                    onResult: this._handlePass,
                                    onKeyPress: function onKeyPress(e) {
                                        regExp = new RegExp('[A-Za-z0-9]+');
                                        if (!regExp.test(e.key)) {
                                            e.preventDefault();
                                            _this2.setState({
                                                passError: 'Ingrese solo letras y numeros'
                                            });
                                        } else {
                                            _this2.setState({
                                                passError: ''
                                            });
                                        }
                                    } }),
                                React.createElement(
                                    "div",
                                    { className: "alert alert-danger" },
                                    this.state.passError
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-2" },
                            React.createElement(
                                "div",
                                { className: "col-4 col-sm-3" },
                                React.createElement(
                                    "label",
                                    {
                                        htmlFor: "passwordRepeat",
                                        className: "form-check-label" },
                                    "Repita contrase\xF1a"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 col-sm-4" },
                                React.createElement(InputValidation, {
                                    id: "passwordRepeat",
                                    name: "passwordRepeat",
                                    type: "password",
                                    minLength: "6",
                                    maxLength: "10",
                                    requiredStr: "Password requerido",
                                    className: "form-control",
                                    onResult: this._handlePassRepeat,
                                    onKeyPress: function onKeyPress(e) {
                                        regExp = new RegExp('[A-Za-z0-9]+');
                                        if (!regExp.test(e.key)) {
                                            e.preventDefault();
                                            _this2.setState({
                                                passRepetError: 'Ingrese solo letras y numeros'
                                            });
                                        } else {
                                            _this2.setState({
                                                passRepetError: ''
                                            });
                                        }
                                    } }),
                                React.createElement(
                                    "div",
                                    { className: "alert alert-danger" },
                                    this.state.passRepetError
                                )
                            )
                        ),
                        React.createElement(Errormessage, { className: "text-danger text-left ml-4", show: this.state.showError, text: this.state.txtError }),
                        React.createElement(
                            "div",
                            { className: "custom-control custom-checkbox d-inline" },
                            React.createElement("input", { type: "checkbox", className: "ng-tns-c3-0", id: "terminosHSBC", name: "terminosHSBC", onClick: this._handleOnClickCheck, required: true }),
                            React.createElement(
                                "label",
                                { className: "ng-tns-c3-0 ml-2", htmlFor: "terminosHSBC" },
                                "He le\xEDdo y acepto los",
                                React.createElement(
                                    "span",
                                    null,
                                    " "
                                ),
                                React.createElement(
                                    "a",
                                    { className: "ng-tns-c3-0", target: "_blank", style: { textDecoration: "underline" },
                                        onClick: function onClick(e) {
                                            _this2._showTyC(true);
                                        } },
                                    "T\xE9rminos y condiciones de contrataci\xF3n y de HSBC"
                                )
                            )
                        ),
                        React.createElement(
                            "p",
                            { className: "text-secondary font-weight-bolder" },
                            "Record\xE1 que podes solicitar en cualquier momento a HSBC LIFE un ejemplar en original de la documentaci\xF3n recibida electr\xF3nicamente"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Ten\xE9 en cuenta que cuando se realice el envio de la documentaci\xF3n por correo electronico la misma se encontrara encriptada con la contrase\xF1a que acabas de confirmar"
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Podes actualizar el correo donde recib\xEDs la documentaci\xF3n en el men\xFA de \u201Cimpresos por mail\u201D"
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "button",
                                { onClick: this._handleAskLater,
                                    type: "button",
                                    className: "btn btn-danger m-2" },
                                "Preguntar m\xE1s adelante"
                            ),
                            React.createElement(
                                "button",
                                { onClick: this._handleNo,
                                    type: "button",
                                    className: "btn btn-danger m-2" },
                                "No me interesa"
                            ),
                            React.createElement(
                                "button",
                                { onClick: this._handleContinue,
                                    type: "button",
                                    disabled: this.state.accept ? this.state.emailOK && this.state.passOK ? false : true : true,
                                    className: "btn btn-success m-2" },
                                "Continuar"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: this.state.showTyC ? '' : 'd-none' },
                        React.createElement(
                            "label",
                            { htmlFor: "terminosyCondiciones" },
                            "T\xE9rminos y condiciones:"
                        ),
                        React.createElement(
                            "div",
                            { "class": "alert alert-secondary", role: "alert" },
                            React.createElement(
                                "p",
                                null,
                                React.createElement(
                                    "strong",
                                    null,
                                    "Acceso."
                                ),
                                React.createElement("br", null),
                                "  ",
                                React.createElement("br", null),
                                "LA AGENCIA DE ACCESO A LA INFORMACI\xD3N P\xDABLICA, en su car\xE1cter de \xD3rgano de Control de la Ley N\xB0 25.326, tiene la atribuci\xF3n de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protecci\xF3n de datos personales. ",
                                React.createElement("br", null),
                                "Usted, previa acreditaci\xF3n de su identidad, tiene derecho a solicitar y obtener informaci\xF3n de sus datos personales incluidos en los bancos de datos p\xFAblicos, o privados destinados a proveer informes. HSBC debe proporcionar la informaci\xF3n solicitada dentro de los diez d\xEDas corridos de haber sido intimado fehacientemente. Vencido el plazo sin que se satisfaga el pedido, o si evacuado el informe, \xE9ste se estimara insuficiente, quedar\xE1 expedita la acci\xF3n de protecci\xF3n de los datos personales o de h\xE1beas data prevista en esta ley.",
                                React.createElement("br", null),
                                "El derecho de acceso a que se refiere este art\xEDculo s\xF3lo puede ser ejercido en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un inter\xE9s leg\xEDtimo al efecto. El ejercicio del derecho al cual se refiere este art\xEDculo en el caso de datos de personas fallecidas le corresponder\xE1 a sus sucesores universales.",
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "Destino de los datos que nos proporciona"
                                ),
                                React.createElement("br", null),
                                " ",
                                React.createElement("br", null),
                                "En cumplimiento de lo establecido por el Art. 6 de la Ley 25.326, le informamos:",
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "a)"
                                ),
                                " que sus datos est\xE1n siendo recabados para actualizar su correo electr\xF3nico en nuestros sistemas, y de este modo, poder enviarle informaci\xF3n de sus p\xF3lizas v\xEDa e-mail.",
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "b)"
                                ),
                                " que sus datos formar\xE1n parte de un banco de datos electr\xF3nicos cuyo titular es HSBC Seguros de Vida (Argentina) S.A., HSBC Seguros de Retiro (Argentina) S.A. y HSBC Bank Argentina S.A. (en forma conjunta, \u201CHSBC Argentina\u201D).",
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "Autorizaci\xF3n."
                                ),
                                React.createElement("br", null),
                                " ",
                                React.createElement("br", null),
                                "Aceptando estos t\xE9rminos condiciones usted autoriza, en los t\xE9rminos de la Ley Nro. 25.326 de Protecci\xF3n de datos Personales, a HSBC Seguros de Vida (Argentina) S.A., HSBC Seguros de Retiro (Argentina) S.A. y HSBC Bank Argentina S.A. (en forma conjunta, \u201CHSBC Argentina\u201D) a:",
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "a)"
                                ),
                                " incorporar sus datos en cualquier base de datos del grupo HSBC de conformidad con la ley aplicable,",
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "b)"
                                ),
                                " consultar, utilizar, suministrar o transferir la informaci\xF3n recolectada en el marco de la prestaci\xF3n de servicios por parte de HSBC Argentina a las compa\xF1\xEDas que le prestan servicios,",
                                React.createElement("br", null),
                                React.createElement(
                                    "strong",
                                    null,
                                    "c)"
                                ),
                                " utilizar los datos personales y cederlos a entidades, incluyendo prestadores de servicios, locales o en cualquier jurisdicci\xF3n extranjera, ya sea para fines de evaluaci\xF3n y otorgamiento de productos o servicios, tareas operativas, de almacenamiento de datos o desarrollo de actividades necesarias o convenientes para mantener la relaci\xF3n comercial con Usted.",
                                React.createElement("br", null),
                                React.createElement("br", null),
                                "Asimismo, HSBC Argentina podr\xE1 suministrar los datos personales a otras empresas del grupo HSBC y/o a terceras empresas vinculadas al mismo por acuerdos comerciales a fin de acceder a los distintos servicios y/o productos prestados por ellas. HSBC tratar\xE1 con confidencialidad los datos requeridos y que los mismos ser\xE1n usados de acuerdo con la finalidad para la que han sido recolectados, pudiendo en cualquier momento ejercitar el derecho de acceso, rectificaci\xF3n, cancelaci\xF3n u oposici\xF3n mediante comunicaci\xF3n escrita remitida formalmente a: ",
                                React.createElement(
                                    "a",
                                    { href: "mailto:contactenos@hsbc.com.ar" },
                                    "contactenos@hsbc.com.ar"
                                ),
                                "."
                            )
                        ),
                        React.createElement(
                            "button",
                            { onClick: function onClick(e) {
                                    _this2._showTyC(false);
                                },
                                type: "button",
                                className: "btn btn-danger mt-3 " },
                            "Volver"
                        )
                    )
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.firstLoad = false;
            }
        }]);

        return MailOnboarding;
    }(React.Component);

    return MailOnboarding;
});