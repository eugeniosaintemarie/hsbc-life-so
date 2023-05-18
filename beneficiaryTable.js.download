var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "./rowTableBeneficiaryEndoso", "../../../controller/endososController"], function (React, Utils, RowTableBeneficiaryEndoso, EndososController) {
    var TableEndosoRealized = function (_React$Component) {
        _inherits(TableEndosoRealized, _React$Component);

        function TableEndosoRealized(props) {
            _classCallCheck(this, TableEndosoRealized);

            var _this = _possibleConstructorReturn(this, (TableEndosoRealized.__proto__ || Object.getPrototypeOf(TableEndosoRealized)).call(this, props));

            _this._handleOnChange = function (e) {
                var listSelected = _this.props.listSelected;
                listSelected[e.target.id] = e.target.checked;
                _this.props.selectedResult(listSelected);
            };

            _this.getParentName = function (code) {
                var parentName = 'SIN PARENTESCO';
                _this.state.listParentesco.map(function (e) {
                    if (e.CODIGO == code) {
                        parentName = e.DESCRIPCION;
                    }
                });

                return parentName;
            };

            _this._renderTable = function () {
                var list = _this.props.list;


                if (list.length > 0) {
                    var table = Object.keys(list).map(function (currency) {
                        return React.createElement(RowTableBeneficiaryEndoso, {
                            listParentesco: _this.getParentName,
                            key: currency,
                            benef: list[currency],
                            value: _this.props.listSelected ? _this.props.listSelected[currency] == true ? 'on' : 'off' : 'off',
                            checked: _this.props.listSelected ? _this.props.listSelected[currency] : false,
                            onChange: _this._handleOnChange,
                            id: currency });
                    });

                    return table;
                }
                return [];
            };

            _this.state = {
                table: [],
                listParentesco: []
            };
            return _this;
        }

        _createClass(TableEndosoRealized, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "row d-flex justify-content-center" },
                    React.createElement(
                        "div",
                        { className: "col-12 " },
                        React.createElement(
                            "table",
                            { className: "table table-bordered table-sm text-center table-text" },
                            React.createElement(
                                "thead",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "*"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "Prioridad"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "%"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "T.Doc."
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "N.Doc."
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "Apellido y Nombre"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "Fecha Nacimiento"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "Parentesco"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "D. Financ."
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
                );
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                var endososController = new EndososController();
                endososController.getParentescoList(function (data) {
                    _this2.setState({
                        listParentesco: data
                    });
                });
            }
        }]);

        return TableEndosoRealized;
    }(React.Component);

    return TableEndosoRealized;
});