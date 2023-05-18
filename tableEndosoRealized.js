var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "../../../common/modalReactBootstrap"], function (React, Utils, ModalReactBootstrap) {
    var TableEndosoRealized = function (_React$Component) {
        _inherits(TableEndosoRealized, _React$Component);

        function TableEndosoRealized(props) {
            _classCallCheck(this, TableEndosoRealized);

            var _this = _possibleConstructorReturn(this, (TableEndosoRealized.__proto__ || Object.getPrototypeOf(TableEndosoRealized)).call(this, props));

            _this._handleButtonDelete = function () {
                _this.setState({
                    showModal: true,
                    modal: {
                        component: null,
                        title: 'Alerta',
                        contentHTML: '¿Esta seguro que desea eliminar el endoso seleccionados?',
                        html: true,
                        size: "md",
                        accept: _this._handleAccept
                    }
                });
            };

            _this._handleAccept = function (e) {
                _this.props.delete();
                _this._handleModalIsOpen();
            };

            _this._handleButtonView = function () {

                switch (parseInt(_this.props.endosoData.SITUCMOT)) {
                    case 18:
                        _this.props.switch('addressView');
                        break;
                    case 16:
                        _this.props.switch('beneficiaryView');
                        break;
                    case 15:
                        _this.props.switch('paymentMethodView');
                        break;
                }
            };

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModal;
                _this.setState({
                    showModal: !current,
                    showError: false,
                    textError: ''
                });
            };

            _this.state = {
                showModal: false,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false,
                    accept: null
                }
            };
            return _this;
        }

        _createClass(TableEndosoRealized, [{
            key: "_showSitu",
            value: function _showSitu(situ) {
                switch (parseInt(situ)) {
                    case 18:
                        return 'Cambio de domicilio';
                    case 16:
                        return 'Cambio de beneficiario';
                    case 15:
                        return 'Cambio de medio de pago';
                    default:
                        return 'Caso no definido';
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _props$endosoData = this.props.endosoData,
                    SITUCMOT = _props$endosoData.SITUCMOT,
                    FECEMIS = _props$endosoData.FECEMIS;


                var date = FECEMIS.toString();

                var day = date.substring(0, 2);
                var month = date.substring(2, 4);
                var year = date.substring(4);

                var bithDay = day + '/' + month + '/' + year;

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "row d-flex justify-content-center" },
                        React.createElement(
                            "div",
                            { className: "col-12" },
                            React.createElement(
                                "table",
                                { className: "table table-sm table-bordered" },
                                React.createElement(
                                    "thead",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            null,
                                            "Tipo de Endoso"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Fecha de creaci\xF3n"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Estado"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Acciones"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "td",
                                            null,
                                            this._showSitu(SITUCMOT)
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            bithDay
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            "Pendiente"
                                        ),
                                        React.createElement(
                                            "td",
                                            null,
                                            React.createElement("i", { onClick: this._handleButtonView, className: "fas fa-eye cursor-pointer mr-4 " }),
                                            React.createElement("i", { onClick: this._handleButtonDelete, className: "fas fa-trash-alt cursor-pointer" })
                                        )
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
                        contentHTML: this.state.modal.contentHTML,
                        accept: this.state.modal.accept
                    })
                );
            }
        }]);

        return TableEndosoRealized;
    }(React.Component);

    return TableEndosoRealized;
});