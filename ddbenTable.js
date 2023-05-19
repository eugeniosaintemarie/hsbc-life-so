var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "./ddbenRow"], function (React, DdbenRow) {
    var DdbenTable = function (_React$Component) {
        _inherits(DdbenTable, _React$Component);

        function DdbenTable(props) {
            _classCallCheck(this, DdbenTable);

            var _this = _possibleConstructorReturn(this, (DdbenTable.__proto__ || Object.getPrototypeOf(DdbenTable)).call(this, props));

            _this._handleOnChange = function (e) {
                var listSelected = _this.props.selectedList;
                listSelected[e.target.id] = e.target.checked;
                _this.props.selectedResult(listSelected);
            };

            _this._renderTable = function () {
                var list = _this.props.list;


                if (list.length > 0) {
                    var table = Object.keys(list).map(function (currency) {
                        return React.createElement(DdbenRow, {
                            listParentesco: _this.props.getParentName,
                            listTipoDoc: _this.props.getTipoDoc,
                            key: currency,
                            benef: list[currency],
                            value: _this.props.selectedList ? _this.props.selectedList[currency] ? 'on' : 'off' : 'off',
                            checked: _this.props.selectedList ? _this.props.selectedList[currency] : false,
                            onChange: _this._handleOnChange,
                            id: currency });
                    });
                    return table;
                }
                return [];
            };

            _this.state = {
                table: []
            };
            return _this;
        }

        _createClass(DdbenTable, [{
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
                                        "APELLIDOS Y NOMBRE"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "ORDEN"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "%"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "FECHA DE NAC."
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "TIPO Y N\xB0 DOCUMENTO"
                                    ),
                                    React.createElement(
                                        "th",
                                        { scope: "col" },
                                        "RELACION/PARENTESCO"
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
        }]);

        return DdbenTable;
    }(React.Component);

    return DdbenTable;
});