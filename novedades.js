var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "../common/loader", "../services/userService", "../services/segurosOnlineService", "../redux/store", "../common/datepicker", "../common/fileManager", "../common/modalReactBootstrap"], function (React, ReactRedux, Loader, UserService, SegurosOnlineService, Store, DatePicker, FileManager, ModalReactBootstrap) {
    var Novedades = function (_React$Component) {
        _inherits(Novedades, _React$Component);

        function Novedades(props) {
            _classCallCheck(this, Novedades);

            var _this = _possibleConstructorReturn(this, (Novedades.__proto__ || Object.getPrototypeOf(Novedades)).call(this, props));

            _this.userService = new UserService();
            _this.segurosOnlineService = new SegurosOnlineService();

            _this._handleModalIsOpen = function (e) {
                _this.setState({
                    showModalSuccess: false
                });
            };

            _this.state = {
                novedadesSearching: false,
                showModalSuccess: false,
                novedades: null,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false
                }
            };
            return _this;
        }

        _createClass(Novedades, [{
            key: "getNovedades",
            value: function getNovedades() {
                var _this2 = this;

                this.setState({
                    novedadesSearching: true,
                    novedades: null
                });

                this.userService.getLoggedUser().then(function (user) {
                    _this2.segurosOnlineService.getDestacados({
                        IDE_SIT: 0,
                        CLI_TIP: 'SO' + (user.CLITIP ? user.CLITIP : 'F'),
                        EXC_IDS: 0,
                        ROT_DES: 2
                    }).then(function (dataNovedades) {
                        if (dataNovedades && dataNovedades.length > 0) {
                            _this2.setState({
                                novedades: dataNovedades
                            });
                        }
                        _this2.setState({
                            novedadesSearching: false
                        });
                    });
                });
            }
        }, {
            key: "renderHtml",
            value: function renderHtml(elem) {
                return { __html: elem };
            }
        }, {
            key: "handleAbrirDestacado",
            value: function handleAbrirDestacado(idDestacado) {
                var _this3 = this;

                var destacado = {};

                this.segurosOnlineService.getDestacado({
                    IDE_DES: idDestacado
                }).then(function (data) {
                    if (data) {
                        destacado = data;
                    }
                    _this3.setState({
                        showModalSuccess: true,
                        modal: {
                            component: null,
                            contentHTML: destacado.DES_DSC_DES,
                            html: true,
                            title: "",
                            size: "xl"
                        }
                    });
                });
            }
        }, {
            key: "render",
            value: function render() {
                var _this4 = this;

                var _state = this.state,
                    novedades = _state.novedades,
                    novedadesSearching = _state.novedadesSearching;


                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            { className: "container" },
                            React.createElement(
                                "h5",
                                null,
                                "Novedades"
                            ),
                            novedadesSearching && React.createElement(
                                "div",
                                { className: "mt-4" },
                                "Buscando novedades..."
                            ),
                            novedades && !novedadesSearching && React.createElement(
                                "div",
                                { className: "mt-4" },
                                novedades.map(function (novedad, i) {
                                    if (i > 0) {
                                        return React.createElement(
                                            "div",
                                            { style: { 'cursor': 'pointer' }, key: i, onClick: _this4.handleAbrirDestacado.bind(_this4, novedad.DES_IDE_DES) },
                                            React.createElement("hr", null),
                                            React.createElement("div", { dangerouslySetInnerHTML: _this4.renderHtml(novedad.DES_TIT_DES) }),
                                            React.createElement("div", { dangerouslySetInnerHTML: _this4.renderHtml(novedad.DES_SUB_TIT) })
                                        );
                                    }
                                    return React.createElement(
                                        "div",
                                        { style: { 'cursor': 'pointer' }, key: i, onClick: _this4.handleAbrirDestacado.bind(_this4, novedad.DES_IDE_DES) },
                                        React.createElement("div", { dangerouslySetInnerHTML: _this4.renderHtml(novedad.DES_TIT_DES) }),
                                        React.createElement("div", { dangerouslySetInnerHTML: _this4.renderHtml(novedad.DES_SUB_TIT) })
                                    );
                                })
                            ),
                            (!novedades || novedades.length == 0) && !novedadesSearching && React.createElement(
                                "div",
                                { className: "mt-4" },
                                "No se encontraron novedades."
                            )
                        ),
                        React.createElement(ModalReactBootstrap, {
                            title: this.state.modal.title,
                            show: this.state.showModalSuccess,
                            size: this.state.modal.size,
                            isOpen: this._handleModalIsOpen,
                            component: this.state.modal.component,
                            html: this.state.modal.html,
                            contentHTML: this.state.modal.contentHTML })
                    )
                );
            }
        }, {
            key: "componentWillMount",
            value: function componentWillMount() {
                this.getNovedades();
            }
        }]);

        return Novedades;
    }(React.Component);

    return Novedades;
});