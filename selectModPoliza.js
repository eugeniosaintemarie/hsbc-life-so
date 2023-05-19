var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./tableEndosoRealized", "../../../common/loader", "../../../controller/endososController"], function (React, TableEndosoRealized, Loader, EndososController) {
    var SelectModPoliza = function (_React$Component) {
        _inherits(SelectModPoliza, _React$Component);

        function SelectModPoliza(props) {
            _classCallCheck(this, SelectModPoliza);

            var _this = _possibleConstructorReturn(this, (SelectModPoliza.__proto__ || Object.getPrototypeOf(SelectModPoliza)).call(this, props));

            _this._handleChange = function (event) {
                _this.setState({ valueOption: event.target.value });
            };

            _this._handleUpdateOnClick = function (event) {
                _this.props.switch(_this.state.valueOption);
            };

            _this._handleHistoryOnClick = function (event) {
                _this.props.switch('history');
            };

            _this._handleNoBeneficiary = function () {
                return React.createElement(
                    "div",
                    { className: "text-center p-0" },
                    React.createElement(TableEndosoRealized, {
                        "switch": _this.props.switch,
                        endosoData: _this.props.endosoData.data,
                        "delete": _this._deleteEndoso }),
                    React.createElement(
                        "div",
                        { className: "container-fluid" },
                        React.createElement(
                            "div",
                            { className: "row justify-content-center align-items-center" },
                            React.createElement(
                                "div",
                                { className: "col-6 text-left p-0" },
                                React.createElement(
                                    "small",
                                    null,
                                    "Seleccion\xE1 qu\xE9 modificaci\xF3n le quer\xE9s realizar a tu p\xF3liza"
                                )
                            ),
                            "u",
                            React.createElement(
                                "div",
                                { className: "col-6 align-self-center p-0" },
                                "   ",
                                React.createElement(
                                    "select",
                                    {
                                        className: "form-control",
                                        id: "poliza",
                                        name: "poliza",
                                        value: _this.state.valueOption,
                                        onChange: _this._handleChange },
                                    React.createElement(
                                        "option",
                                        { disabled: true, value: "default" },
                                        "Seleccion\xE1 una opci\xF3n..."
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "address" },
                                        "Domicilio"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "paymentMethod" },
                                        "Medio de Pago"
                                    )
                                )
                            )
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: _this._handleUpdateOnClick },
                                "Actualizar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                    type: "button" },
                                "Cancelar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: _this._handleHistoryOnClick },
                                "Historial Endosos"
                            )
                        )
                    )
                );
            };

            _this._handleOnlyView = function () {
                return React.createElement(
                    "div",
                    { className: "text-center p-0" },
                    React.createElement(TableEndosoRealized, {
                        "switch": _this.props.switch,
                        endosoData: _this.props.endosoData.data,
                        "delete": _this._deleteEndoso }),
                    React.createElement(
                        "p",
                        { className: "text-danger" },
                        "Tenes un endoso en proceso y debes esperar 24hs para cargar uno nuevo. Si deseas realizar otro por favor comun\xEDcate con el centro de atenci\xF3n al cliente 0800-333-0003"
                    ),
                    React.createElement(
                        "div",
                        { className: "container-fluid" },
                        React.createElement(
                            "div",
                            { className: "row justify-content-center align-items-center" },
                            React.createElement(
                                "div",
                                { className: "col-6 text-left p-0" },
                                React.createElement(
                                    "small",
                                    null,
                                    "Seleccion\xE1 qu\xE9 modificaci\xF3n le quer\xE9s realizar a tu p\xF3liza"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 align-self-center p-0" },
                                React.createElement(
                                    "select",
                                    {
                                        className: "form-control",
                                        id: "poliza",
                                        name: "poliza",
                                        value: _this.state.valueOption,
                                        onChange: _this._handleChange,
                                        disabled: true },
                                    React.createElement(
                                        "option",
                                        { disabled: true, value: "default" },
                                        "Seleccion\xE1 una opci\xF3n..."
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "address" },
                                        "Domicilio"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "beneficiary" },
                                        "Beneficiario"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "paymentMethod" },
                                        "Medio de Pago"
                                    )
                                )
                            )
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    disabled: true,
                                    onClick: _this._handleUpdateOnClick },
                                "Actualizar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                    type: "button" },
                                "Cancelar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: _this._handleHistoryOnClick },
                                "Historial Endosos"
                            )
                        )
                    )
                );
            };

            _this._handleUpdateOK = function () {
                return React.createElement(
                    "div",
                    { className: "text-center p-0" },
                    React.createElement(
                        "div",
                        { className: "container-fluid" },
                        React.createElement(
                            "div",
                            { className: "row justify-content-center align-items-center" },
                            React.createElement(
                                "div",
                                { className: "col-6 text-left p-0" },
                                React.createElement(
                                    "small",
                                    null,
                                    "Seleccion\xE1 qu\xE9 modificaci\xF3n le quer\xE9s realizar a tu p\xF3liza"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 align-self-center p-0" },
                                React.createElement(
                                    "select",
                                    {
                                        className: "form-control",
                                        id: "poliza",
                                        name: "poliza",
                                        value: _this.state.valueOption,
                                        onChange: _this._handleChange },
                                    React.createElement(
                                        "option",
                                        { disabled: true, value: "default" },
                                        "Seleccion\xE1 una opci\xF3n..."
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "address" },
                                        "Domicilio"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "beneficiary" },
                                        "Beneficiario"
                                    ),
                                    React.createElement(
                                        "option",
                                        { value: "paymentMethod" },
                                        "Medio de Pago"
                                    )
                                )
                            )
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: _this._handleUpdateOnClick },
                                "Actualizar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                    type: "button" },
                                "Cancelar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: _this._handleHistoryOnClick },
                                "Historial Endosos"
                            )
                        )
                    )
                );
            };

            _this._caseManager = function () {
                switch (_this.props.endosoData.action) {
                    case 'updateOK':
                        return _this._handleUpdateOK();
                    case 'onlyView':
                        return _this._handleOnlyView();
                    case 'noBeneficiary':
                        return _this._handleNoBeneficiary();
                    default:
                        return React.createElement(
                            "div",
                            { className: "col-md-11 d-flex justify-content-center" },
                            React.createElement(Loader, { width: "4rem", height: "4rem" })
                        );
                }
            };

            _this._deleteEndoso = function () {
                var endososController = new EndososController();
                endososController.bajaEndoso(function (data) {
                    _this.props.refresh();
                });
            };

            _this.state = {
                valueOption: 'default'
            };
            return _this;
        }

        _createClass(SelectModPoliza, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement("br", null),
                    this.props.polizaState == '02' ? React.createElement(
                        "p",
                        { className: "text-danger text-center" },
                        " Su p\xF3liza se encuentra pendiente de pago, por favor regularice su situaci\xF3n."
                    ) : '',
                    this._caseManager()
                );
            }
        }]);

        return SelectModPoliza;
    }(React.Component);

    return SelectModPoliza;
});