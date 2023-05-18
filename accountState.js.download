var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../redux/store", "../controller/impresosController", "../common/modalReactBootstrap"], function (React, Store, ImpresosController, ModalReactBootstrap) {
    var Accordion = require("react-bootstrap").Accordion;
    var Card = require("react-bootstrap").Card;
    var Button = require("react-bootstrap").Button;

    var AccountState = function (_React$Component) {
        _inherits(AccountState, _React$Component);

        function AccountState(props) {
            _classCallCheck(this, AccountState);

            var _this = _possibleConstructorReturn(this, (AccountState.__proto__ || Object.getPrototypeOf(AccountState)).call(this, props));

            _this.FORM_NAME = "EstadoCuenta";
            _this.controller = new ImpresosController();
            _this.currentProductStore = Store.getState().seguros.currentProduct;

            _this.getImpresoPeriodo = function (e) {
                _this.controller.getImpresoPeriodo(e.target.value, _this.currentProductStore.impresos ? _this.currentProductStore.impresos : _this.currentProductStore.cPza);
            };

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModalSuccess;
                _this.setState({
                    showModalSuccess: !current
                });
            };

            _this._handleNewsletter = function (e) {
                var id = e.target.id;
                if (_this.currentProductStore.detalle.TIPOPRODU == "C") {
                    window.open("https://www.argentina.hsbc.com.ar/GSP/images/NewsletterVida" + id + ".pdf", "_blank");
                } else {
                    window.open("https://www.argentina.hsbc.com.ar/GSP/images/NewsletterRetiro" + id + ".pdf", "_blank");
                }
            };

            _this._handleReporteInversiones = function (e) {
                if (_this.currentProductStore.detalle.TIPOPRODU == "C") {
                    window.open("https://www.argentina.hsbc.com.ar/GSP/images/ReportedeInversionesVida.pdf", "_blank");
                } else {
                    window.open("https://www.argentina.hsbc.com.ar/GSP/images/ReportedeInversionesRetiro.pdf", "_blank");
                }
            };

            _this.state = {
                showModalSuccess: false,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false
                }
            };

            $(document).bind("ErrorImpresos", function () {
                _this.setState({
                    showModalSuccess: true,
                    modal: {
                        component: null,
                        contentHTML: "El resumen de cuenta seleccionado aún no se encuentra disponible. Por favor comunicate con el centro de atención al cliente 0800-333-0003",
                        html: true,
                        title: "Estado de cuenta",
                        size: "md"
                    }
                });
            });
            return _this;
        }

        _createClass(AccountState, [{
            key: "getStateYear",
            value: function getStateYear(periodos) {
                var _this2 = this;

                return Object.keys(periodos).map(function (currency, i) {
                    var aux = React.createElement(
                        Card,
                        { className: "col-md-12", key: i },
                        React.createElement(
                            Accordion.Toggle,
                            {
                                as: Card.Header,
                                variant: "link",
                                eventKey: currency
                            },
                            "Res\xFAmenes ",
                            periodos[currency].year + " "
                        ),
                        React.createElement(
                            Accordion.Collapse,
                            { eventKey: currency },
                            React.createElement(
                                Card.Body,
                                { className: "custom-padding-card-body" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-12  bg-white rounded shadow-sm" },
                                    _this2.getDownloadStatus(periodos[currency].periodo)
                                )
                            )
                        )
                    );
                    return aux;
                });
            }
        }, {
            key: "getDownloadStatus",
            value: function getDownloadStatus(periodo) {
                var _this3 = this;

                return periodo.map(function (currency, i) {
                    var aux = React.createElement(
                        "div",
                        {
                            className: "media text-muted border-bottom border-gray d-flex justify-content-between",
                            key: i
                        },
                        React.createElement(
                            "div",
                            { className: "container pt-3 " },
                            React.createElement(
                                "p",
                                { className: "media-body pb-3 mb-0 small lh-125" },
                                "Estado de la p\xF3liza al ",
                                currency.date
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "d-flex justify-content-between" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-hsbc btn-sm btn-download-account-state ml-1 mr-1",
                                    type: "button",
                                    value: currency.date,
                                    onClick: _this3.getImpresoPeriodo
                                },
                                "Descargar"
                            ),
                            React.createElement(
                                "button",
                                {
                                    id: currency.id,
                                    type: "button",
                                    className: "btn btn-hsbc btn-sm btn-download-account-state ml-1 mr-1",
                                    onClick: _this3._handleNewsletter
                                },
                                "Newsletter"
                            )
                        )
                    );

                    return aux;
                });
            }
        }, {
            key: "render",
            value: function render() {
                var hoyDate = new Date();
                var anio = hoyDate.getFullYear();

                periodos = [];
                if (hoyDate.getMonth() >= 6) {
                    periodos.push({
                        year: anio,
                        periodo: [{ date: "30-06-" + anio, id: 1 }]
                    });

                    periodos.push({
                        year: anio - 1,
                        periodo: [{ date: "31-12-" + (anio - 1), id: 2 }, { date: "30-06-" + (anio - 1), id: 3 }]
                    });
                } else {
                    periodos.push({
                        year: anio - 1,
                        periodo: [{ date: "31-12-" + (anio - 1), id: 1 }, { date: "30-06-" + (anio - 1), id: 2 }]
                    });

                    periodos.push({
                        year: anio - 2,
                        periodo: [{ date: "31-12-" + (anio - 2), id: 3 }]
                    });
                }

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "h4",
                        { className: "subtitle-inside float-left mt-2" },
                        "Estado de cuenta"
                    ),
                    React.createElement(
                        "div",
                        { className: " mr-5 pb-2 float-right" },
                        React.createElement(
                            "a",
                            {
                                style: { font: "inherit" },
                                href: "#",
                                onClick: this._handleReporteInversiones
                            },
                            React.createElement(
                                "button",
                                { className: "btn btn-light" },
                                "Reporte de inversiones"
                            )
                        )
                    ),
                    React.createElement(
                        Accordion,
                        { defaultActiveKey: "0" },
                        this.getStateYear(periodos)
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
                );
            }
        }]);

        return AccountState;
    }(React.Component);

    return AccountState;
});