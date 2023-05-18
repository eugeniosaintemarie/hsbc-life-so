var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", '../../../controller/endososController'], function (React, Utils, EndososController) {
    var PaymentMethodView = function (_React$Component) {
        _inherits(PaymentMethodView, _React$Component);

        function PaymentMethodView(props) {
            _classCallCheck(this, PaymentMethodView);

            var _this = _possibleConstructorReturn(this, (PaymentMethodView.__proto__ || Object.getPrototypeOf(PaymentMethodView)).call(this, props));

            _this._handleCancel = function () {
                _this.props.switch('main');
            };

            _this._gerNameCard = function (COD_TAR) {
                var nameCard = '';
                _this.state.listTarj.map(function (e) {
                    if (e.COD_TAR === COD_TAR) {
                        nameCard = e.DES_TAR;
                    }
                });
                return nameCard;
            };

            _this.state = {
                listTarj: []
            };

            return _this;
        }

        _createClass(PaymentMethodView, [{
            key: "render",
            value: function render() {
                var _props$endosoData$dat = this.props.endosoData.data,
                    TIPOCOBR = _props$endosoData$dat.TIPOCOBR,
                    NROCOBRO = _props$endosoData$dat.NROCOBRO,
                    FECVTOTARJ = _props$endosoData$dat.FECVTOTARJ;


                var date = FECVTOTARJ.toString();

                var month = date.substring(2, 4);
                var year = date.substring(4);

                var cardDate = month + '/' + year;

                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        { className: "row mt-3" },
                        React.createElement(
                            "div",
                            { className: "col-5 offset-1" },
                            React.createElement(
                                "label",
                                { htmlFor: "type" },
                                "Tipo"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 pl-0" },
                            React.createElement("input", {
                                id: "type",
                                name: "type",
                                className: "input-background-color form-control",
                                value: "Tarjeta de crédito",
                                disabled: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row mt-3 " },
                        React.createElement(
                            "div",
                            { className: "col-5 offset-1" },
                            React.createElement(
                                "label",
                                { htmlFor: "creditcardnumber" },
                                "N\xFAmero de tarjeta"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 pl-0" },
                            React.createElement("input", {
                                id: "creditcardnumber",
                                name: "creditcardnumber",
                                className: "input-background-color form-control",
                                value: Utils.zfill(NROCOBRO.substr(-4), NROCOBRO.length, '*'),
                                disabled: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row mt-3" },
                        React.createElement(
                            "div",
                            { className: "col-5 offset-1" },
                            React.createElement(
                                "label",
                                { htmlFor: "brand" },
                                "Marca"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 pl-0" },
                            React.createElement("input", {
                                id: "brand",
                                name: "brand",
                                className: "input-background-color form-control",
                                value: this._gerNameCard(TIPOCOBR),
                                disabled: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row mt-3" },
                        React.createElement(
                            "div",
                            { className: "col-5 offset-1" },
                            React.createElement(
                                "label",
                                { htmlFor: "expirationDate" },
                                "Fecha de vencimiento"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6 pl-0" },
                            React.createElement("input", {
                                id: "expirationDate",
                                name: "expirationDate",
                                className: "input-background-color form-control",
                                value: cardDate,
                                disabled: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center mt-3" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-light m-2 p-1 pr-2 pl-2 ",
                                type: "button",
                                onClick: this._handleCancel },
                            "Volver"
                        )
                    )
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                var controllerEndosos = new EndososController();
                controllerEndosos.getTarjetas(function (data) {
                    _this2.setState({
                        listTarj: data
                    });
                });
            }
        }]);

        return PaymentMethodView;
    }(React.Component);

    return PaymentMethodView;
});