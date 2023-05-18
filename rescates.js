var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../services/segurosOnlineService", "../redux/store", "../common/modalReactBootstrap"], function (React, ReactRedux, SegurosOnlineService, Store, ModalReactBootstrap) {
    var Rescates = function (_React$Component) {
        _inherits(Rescates, _React$Component);

        function Rescates(props) {
            _classCallCheck(this, Rescates);

            var _this = _possibleConstructorReturn(this, (Rescates.__proto__ || Object.getPrototypeOf(Rescates)).call(this, props));

            _this._getTipoRescate = function (type) {
                switch (type) {
                    case 1:
                        return 'Siniestro';
                    case 2:
                        return 'Rescate Parcial';
                    case 3:
                        return 'Rescate Total';
                    default:
                        return type;
                }
            };

            _this._handleModalIsOpen = function (e) {
                _this.setState({
                    showModalSuccess: false
                });
            };

            _this._getTipoEstado = function (type) {
                switch (type) {
                    case 'C':
                        return 'Cobrado';
                    case 'L':
                        return 'Liquidación';
                    case 'P':
                        return 'Pendiente';
                    default:
                        return type;
                }
            };

            _this._formatMoney = function (order) {
                var numberFormatMoney = order.IMPORTE.toLocaleString('de-DE', { style: 'decimal', decimal: '3' });
                return numberFormatMoney;
            };

            _this._handleShowModal = function (siniestros) {
                var component = React.createElement(
                    "div",
                    null,
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
                                    "N\xFAmero"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Estado"
                                ),
                                React.createElement(
                                    "th",
                                    null,
                                    "Importe"
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            siniestros.ORDENES.ORDEN.map(function (orden, i) {
                                return React.createElement(
                                    "tr",
                                    { key: i },
                                    React.createElement(
                                        "td",
                                        null,
                                        orden.NUMEROOP
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        _this._getTipoEstado(orden.ESTADOOP)
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        _this._formatMoney(orden)
                                    )
                                );
                            })
                        )
                    )
                );

                _this.setState({
                    showModalSuccess: true,
                    modal: {
                        component: component,
                        title: "Detalle de pago",
                        size: "md"
                    }
                });
            };

            _this.state = {
                rescatesSearching: false,
                showModalSuccess: false,
                gridContent: null,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false
                }
            };
            return _this;
        }

        _createClass(Rescates, [{
            key: "getRescates",
            value: function getRescates() {
                var _this2 = this;

                this.setState({
                    rescatesSearching: true,
                    gridContent: null
                });
                var segurosOnlineService = new SegurosOnlineService();
                var currentProduct = Store.getState().seguros.currentProduct;

                if (currentProduct) {
                    var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
                    segurosOnlineService.getSiniestros({
                        CIAASCOD: detalle.CIAASCOD,
                        RAMOPCOD: detalle.RAMOPCOD,
                        POLIZANN: detalle.POLIZANN,
                        POLIZSEC: detalle.POLIZSEC,
                        CERTIPOL: detalle.CERTIPOL,
                        CERTIANN: detalle.CERTIANN,
                        CERTISEC: detalle.CERTISEC
                    }).then(function (data) {
                        //if (data && data.Message !== "" && data.Message.CAMPOS.SINIESTROS.SINIESTRO && data.Message.CAMPOS.CANTREG > 0 && data.Code == "NO_ERROR") {
                        //  this.setState({
                        //    gridContent: data.Message.CAMPOS.SINIESTROS.SINIESTRO
                        //  })
                        //}
                        if (data && data.length > 0) {
                            _this2.setState({
                                gridContent: data
                            });
                        }
                        _this2.setState({
                            rescatesSearching: false
                        });
                    });
                }
            }
        }, {
            key: "formatDate",
            value: function formatDate(date) {
                date = date.toString();
                if (date.length == 8) {
                    year = date.substring(0, 4);
                    month = date.substring(4, 6);
                    day = date.substring(6);
                    return day + '/' + month + '/' + year;
                } else if (date.length == 4) {
                    year = date.substring(0, 2);
                    month = date.substring(2, 3);
                    day = date.substring(3, 4);
                    return '0' + day + '/0' + month + '/20' + year;
                }
            }
        }, {
            key: "render",
            value: function render() {
                var _this3 = this;

                var _state = this.state,
                    gridContent = _state.gridContent,
                    rescatesSearching = _state.rescatesSearching;


                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "h4",
                        { className: "subtitle-inside" },
                        "Rescates"
                    ),
                    React.createElement(
                        "div",
                        { className: "container remove-left-padding" },
                        rescatesSearching && React.createElement(
                            "div",
                            { className: "mt-3" },
                            "Buscando rescates..."
                        ),
                        gridContent && !rescatesSearching && React.createElement(
                            "div",
                            { className: "col-md-12 d-flex justify-content-left remove-left-padding" },
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
                                            "Fecha de Rescates"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Nro. de Rescate"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Estado"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Tipo"
                                        ),
                                        React.createElement(
                                            "th",
                                            null,
                                            "Orden de Pago"
                                        )
                                    )
                                ),
                                React.createElement(
                                    "tbody",
                                    null,
                                    gridContent.map(function (siniestro, i) {
                                        return React.createElement(
                                            "tr",
                                            { key: i },
                                            React.createElement(
                                                "td",
                                                null,
                                                _this3.formatDate(siniestro.FECSINIE)
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                siniestro.SINIENUM
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                siniestro.ESTADSIN
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                _this3._getTipoRescate(siniestro.SINIEEXP)
                                            ),
                                            React.createElement(
                                                "td",
                                                null,
                                                siniestro.CANTORD === 0 ? 0 : React.createElement("i", { onClick: function onClick(e) {
                                                        _this3._handleShowModal(siniestro);
                                                    }, "class": "fas fa-search cursor" })
                                            )
                                        );
                                    })
                                )
                            )
                        ),
                        !rescatesSearching && gridContent == null && React.createElement(
                            "div",
                            { className: "mt-3" },
                            "No se registran rescates"
                        )
                    ),
                    React.createElement(
                        "p",
                        null,
                        "Los montos detallados en el importe de la Orden de Pago corresponde al valor de rescate bruto solicitado por el cliente. Al mencionado valor al momento de efectuarse la transferencia se le aplican las quitas por rescates detalladas en las condiciones contractuales y deducciones impositivas aplicables correspondientes."
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
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                this.getRescates();
            }
        }]);

        return Rescates;
    }(React.Component);

    function mapStateToProps(state) {
        return {
            product: Object.assign({}, state.seguros.currentProduct)
        };
    }

    return ReactRedux.connect(mapStateToProps, null)(Rescates);
});