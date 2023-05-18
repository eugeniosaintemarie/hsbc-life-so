var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "../../../controller/endososController", "../../../common/loader"], function (React, Utils, EndososController, Loader) {
    var HistoryBeneficiaryEndoso = function (_React$Component) {
        _inherits(HistoryBeneficiaryEndoso, _React$Component);

        function HistoryBeneficiaryEndoso(props) {
            _classCallCheck(this, HistoryBeneficiaryEndoso);

            var _this = _possibleConstructorReturn(this, (HistoryBeneficiaryEndoso.__proto__ || Object.getPrototypeOf(HistoryBeneficiaryEndoso)).call(this, props));

            _this._handleBackOnClick = function () {
                _this.props.switch('main');
            };

            _this.state = {
                dataHistory: {},
                loaded: false
            };
            return _this;
        }

        _createClass(HistoryBeneficiaryEndoso, [{
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
            key: "_renderTable",
            value: function _renderTable() {
                var _this2 = this;

                var dataHistory = this.state.dataHistory;

                var count = 0;
                return dataHistory.ENDOSOS.END.map(function (e) {

                    var date = e.ENDOFECH.toString();

                    var day = date.substring(6, 8);
                    var month = date.substring(4, 6);
                    var year = date.substring(0, 4);

                    var bithDay = day + '/' + month + '/' + year;

                    var row = React.createElement(
                        "tr",
                        { key: count },
                        React.createElement(
                            "td",
                            null,
                            _this2._showSitu(e.SITUCMOT)
                        ),
                        React.createElement(
                            "td",
                            null,
                            bithDay
                        ),
                        React.createElement(
                            "td",
                            null,
                            e.ESTADO
                        )
                    );
                    count++;
                    return row;
                });
            }
        }, {
            key: "render",
            value: function render() {
                var loaded = this.state.loaded;

                if (loaded == true) {
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(
                            "div",
                            { className: "row d-flex justify-content-center" },
                            React.createElement(
                                "div",
                                { className: "col-12 " },
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
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "tbody",
                                        null,
                                        this._renderTable()
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: this._handleBackOnClick },
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
                var _this3 = this;

                var endososController = new EndososController();
                endososController.getConsultaEndosos(function (data) {
                    _this3.setState({
                        dataHistory: data,
                        loaded: true
                    });
                });
            }
        }]);

        return HistoryBeneficiaryEndoso;
    }(React.Component);

    return HistoryBeneficiaryEndoso;
});