var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "../../../common/inputvalidation", "../../../common/dropdownContent", "../../../common/loader", "../../../controller/endososController", "../../../common/errormessage"], function (React, Utils, InputValidation, DropDownContent, Loader, EndososController, Errormessage) {
    var AddressEndoso = function (_React$Component) {
        _inherits(AddressEndoso, _React$Component);

        function AddressEndoso(props) {
            _classCallCheck(this, AddressEndoso);

            var _this = _possibleConstructorReturn(this, (AddressEndoso.__proto__ || Object.getPrototypeOf(AddressEndoso)).call(this, props));

            _this._handleResults = function (id, result) {
                var _this$setState;

                _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, "error", false), _defineProperty(_this$setState, "txtError", ''), _this$setState));
            };

            _this._handleProvinciaResult = function (id, result) {
                _this._handleResults(id, result);
                if (result.value) {
                    if (_this.locationLoad == false) {
                        _this.endososController.getLocalidadForm(result.id, function (list) {
                            _this.setState({
                                listLocalidad: list
                            });
                        });
                        _this.locationLoad = true;
                    } else {
                        _this.endososController.getLocalidadForm(result.id, function (list) {
                            _this.setState({
                                listLocalidad: list
                            });
                            _this._handleResults('zipCode', { value: '', isValidate: false });
                        });
                    }
                }
            };

            _this._handleLocalidadResults = function (id, result) {
                _this._handleResults(id, result);
                if (result.id != '') {
                    var _id = result.id.split("-");
                    _this._handleResults('zipCode', { value: _id[0], isValidate: true });
                }
            };

            _this._handleUpdateOnClick = function () {
                var _this$state = _this.state,
                    particularPhoneCoutryCode = _this$state.particularPhoneCoutryCode,
                    state = _this$state.state,
                    locality = _this$state.locality,
                    email = _this$state.email,
                    particularPhoneNumber = _this$state.particularPhoneNumber,
                    codeArea = _this$state.codeArea,
                    street = _this$state.street,
                    numberStreet = _this$state.numberStreet,
                    dept = _this$state.dept,
                    floor = _this$state.floor,
                    zipCode = _this$state.zipCode;


                if (particularPhoneNumber.isValidate == true && codeArea.isValidate == true && street.isValidate == true && numberStreet.isValidate == true && zipCode.isValidate == true) {

                    var addressData = {
                        coutryCodeAis: particularPhoneCoutryCode.id,
                        coutryCode: particularPhoneCoutryCode.value,
                        state: state.id,
                        locality: locality.value,
                        email: email.value,
                        phoneNumber: particularPhoneNumber.value,
                        codeArea: codeArea.value,
                        street: street.value,
                        numberStreet: numberStreet.value,
                        dept: dept.value,
                        floor: floor.value,
                        zipCode: zipCode.value
                    };

                    _this.endososController.altaEndoso('address', addressData, function (data) {
                        if (data === 'OK') {
                            _this.props.switch('addressOK');
                        } else {
                            _this.setState({
                                showError: true,
                                textError: data
                            });
                        }
                    });
                } else {
                    _this.setState({
                        showError: true,
                        textError: 'Complete los campos obligatorios'
                    });
                }
            };

            _this._handleCancelOnClick = function () {
                _this.props.refresh();
                _this.props.switch('main');
            };

            _this._loadLocality = function () {
                if (!_this.state.locality.id || _this.state.locality.id == '' || _this.state.locality.id == 'locality') {
                    return true;
                } else {
                    if (_this.state.listLocalidad.length > 0) {
                        return true;
                    }
                }
                return false;
            };

            var _this$props$clixPolDa = _this.props.clixPolData,
                DOMICPRE = _this$props$clixPolDa.DOMICPRE,
                DOMICTLF = _this$props$clixPolDa.DOMICTLF,
                DOMICDOM = _this$props$clixPolDa.DOMICDOM,
                DOMICDNU = _this$props$clixPolDa.DOMICDNU,
                DOMICPIS = _this$props$clixPolDa.DOMICPIS,
                DOMICPTA = _this$props$clixPolDa.DOMICPTA,
                PAISCCOD = _this$props$clixPolDa.PAISCCOD,
                PROVICOD = _this$props$clixPolDa.PROVICOD,
                DOMICPOB = _this$props$clixPolDa.DOMICPOB,
                DOMICCPO = _this$props$clixPolDa.DOMICCPO;


            var telephone = DOMICTLF.substr(10);
            var areaCode = DOMICPRE;
            var aux = DOMICTLF.replace(/ /g, '').split("-");

            if (aux.length == 4) {
                telephone = aux[3];
                areaCode = aux[2];
            }

            _this.state = {
                listPaises: {},
                listProvincia: {},
                listPrefTelPaises: {},
                listLocalidad: {},

                particularPhoneCoutryCode: { id: aux[0] + '-' + aux[1], value: '+' + aux[1] },
                // country: { id: PAISCCOD, value: "" },
                state: { id: PROVICOD, value: "" },
                locality: { id: '', value: DOMICPOB },

                email: { value: '', isValidate: false },
                particularPhoneNumber: { value: telephone, isValidate: false },
                codeArea: { value: areaCode, isValidate: false },
                street: { value: DOMICDOM, isValidate: false },
                numberStreet: { value: DOMICDNU, isValidate: false },
                dept: { value: DOMICPTA, isValidate: false },
                floor: { value: DOMICPIS, isValidate: false },
                zipCode: { value: DOMICCPO, isValidate: false },
                // barrio: { value: 'BENCARTELEF', isValidate: false },

                loaded: false,
                showError: false,
                textError: ''
            };

            _this.endososController = new EndososController();
            _this.locationLoad = false;
            return _this;
        }

        _createClass(AddressEndoso, [{
            key: "render",
            value: function render() {
                var _props$onlyView = this.props.onlyView,
                    onlyView = _props$onlyView === undefined ? false : _props$onlyView;


                if (this.state.loaded == true) {
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "email" },
                                    "Direcci\xF3n de correo electr\xF3nico"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                React.createElement("input", {
                                    id: "email",
                                    name: "email",
                                    disabled: true,
                                    value: this.state.email.value,
                                    className: "input-background-color form-control w-100 "
                                })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "particularPhoneCoutryCode" },
                                    "Tel\xE9fono particular"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 d-flex" },
                                React.createElement(
                                    "div",
                                    { className: "w-25" },
                                    React.createElement(DropDownContent, {
                                        list: this.state.listPrefTelPaises,
                                        className: "input-background-color form-control p-2",
                                        id: "particularPhoneCoutryCode",
                                        name: "particularPhoneCoutryCode",
                                        disabled: onlyView,
                                        idObject: "CODIGO",
                                        nameObject: "SHOWDESC",
                                        typeValue: "value",
                                        defaultValue: this.state.particularPhoneCoutryCode.value,
                                        defaultName: true,
                                        onResult: this._handleResults })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "w-25" },
                                    React.createElement(InputValidation, {
                                        id: "codeArea",
                                        name: "codeArea",
                                        disabled: onlyView,
                                        minLength: "0",
                                        maxLength: "10",
                                        requiredStr: "Respuesta incompleta",
                                        charactersStr: "",
                                        value: this.state.codeArea.value,
                                        className: "input-background-color form-control w-100 ",
                                        onResult: this._handleResults,
                                        upperCase: true })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "w-50" },
                                    React.createElement(InputValidation, {
                                        id: "particularPhoneNumber",
                                        name: "particularPhoneNumber",
                                        disabled: onlyView,
                                        minLength: "0",
                                        maxLength: "10",
                                        requiredStr: "Respuesta incompleta",
                                        charactersStr: "",
                                        value: this.state.particularPhoneNumber.value,
                                        className: "input-background-color form-control w-100 ",
                                        onResult: this._handleResults,
                                        upperCase: true })
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "street" },
                                    "Calle"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                React.createElement(InputValidation, {
                                    id: "street",
                                    name: "street",
                                    disabled: onlyView,
                                    minLength: "0",
                                    maxLength: "40",
                                    requiredStr: "Respuesta incompleta",
                                    charactersStr: "",
                                    value: this.state.street.value,
                                    className: "input-background-color form-control ",
                                    onResult: this._handleResults,
                                    upperCase: true })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "numberStreet" },
                                    "N\xFAmero"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                React.createElement(InputValidation, {
                                    id: "numberStreet",
                                    name: "numberStreet",
                                    disabled: onlyView,
                                    minLength: "0",
                                    maxLength: "5",
                                    requiredStr: "Respuesta incompleta",
                                    charactersStr: "",
                                    value: this.state.numberStreet.value,
                                    className: "input-background-color form-control ",
                                    onResult: this._handleResults,
                                    upperCase: true })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "dept" },
                                    "Piso"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-2" },
                                React.createElement(InputValidation, {
                                    id: "floor",
                                    name: "floor",
                                    disabled: onlyView,
                                    minLength: "0",
                                    maxLength: "4",
                                    requiredStr: "",
                                    charactersStr: "",
                                    showErrorValidation: false,
                                    value: this.state.floor.value,
                                    className: "input-background-color form-control ",
                                    onResult: this._handleResults,
                                    upperCase: true })
                            ),
                            React.createElement(
                                "div",
                                { className: "col-1 offset-1" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "floor" },
                                    "Dpto"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-2" },
                                React.createElement(InputValidation, {
                                    id: "dept",
                                    name: "dept",
                                    disabled: onlyView,
                                    minLength: "0",
                                    maxLength: "4",
                                    requiredStr: "",
                                    charactersStr: "",
                                    showErrorValidation: false,
                                    value: this.state.dept.value,
                                    className: "input-background-color form-control ",
                                    onResult: this._handleResults,
                                    upperCase: true })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "state" },
                                    "Provincia"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                React.createElement(DropDownContent, {
                                    className: "input-background-color form-control ",
                                    list: this.state.listProvincia,
                                    idObject: "COD_PRV",
                                    nameObject: "DES_PRV",
                                    id: "state",
                                    name: "state",
                                    disabled: onlyView,
                                    typeValue: "id",
                                    defaultValue: this.state.state.id,
                                    onResult: this._handleProvinciaResult })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "locality" },
                                    "Localidad"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                this._loadLocality() ? React.createElement(DropDownContent, {
                                    list: this.state.listLocalidad,
                                    className: "input-background-color form-control ",
                                    id: "locality",
                                    name: "locality",
                                    disabled: onlyView != true ? Utils.isEmpty(this.state.listLocalidad) : onlyView,
                                    noAvilable: this.state.state.value == 'CAPITAL FEDERAL',
                                    idObject: "CODPOS",
                                    nameObject: "CALLE",
                                    typeValue: "value",
                                    defaultValue: this.state.locality.value,
                                    defaultName: true,
                                    onResult: this._handleLocalidadResults }) : ''
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "row align-items-center m-3" },
                            React.createElement(
                                "div",
                                { className: "col-3" },
                                React.createElement(
                                    "label",
                                    {
                                        className: "form-check-label",
                                        htmlFor: "zipCode" },
                                    "C.P."
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                React.createElement(InputValidation, {
                                    id: "zipCode",
                                    name: "zipCode",
                                    disabled: onlyView,
                                    minLength: "0",
                                    maxLength: "8",
                                    value: this.state.zipCode.value,
                                    requiredStr: "Respuesta incompleta",
                                    charactersStr: "",
                                    className: "input-background-color form-control ",
                                    onResult: this._handleResults,
                                    upperCase: true })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(Errormessage, { className: "text-danger", show: this.state.showError, text: this.state.textError })
                        ),
                        onlyView == false ? React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: this._handleUpdateOnClick },
                                "Actualizar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                    type: "button",
                                    onClick: this._handleCancelOnClick },
                                "Cancelar"
                            )
                        ) : React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                    type: "button",
                                    onClick: this._handleCancelOnClick },
                                "Volver"
                            )
                        )
                    );
                } else {
                    return React.createElement(
                        "div",
                        { className: "col-md-11 d-flex justify-content-center" },
                        React.createElement(Loader, { width: "4rem", height: "4rem" })
                    );
                }
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                this.endososController.getWsFormAddress(function (ws) {
                    _this2.setState({
                        listPaises: ws.listPaises,
                        listProvincia: ws.listProvincia,
                        listPrefTelPaises: ws.listPrefTelPaises,
                        loaded: true
                    });
                });
                this.endososController.getMailClient(function (data) {
                    _this2.setState({
                        email: { value: data, isValidate: false }
                    });
                });
            }
        }]);

        return AddressEndoso;
    }(React.Component);

    return AddressEndoso;
});