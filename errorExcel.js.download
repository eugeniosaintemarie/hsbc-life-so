var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var ErrorExcel = function (_React$Component) {
        _inherits(ErrorExcel, _React$Component);

        function ErrorExcel(props) {
            _classCallCheck(this, ErrorExcel);

            var _this = _possibleConstructorReturn(this, (ErrorExcel.__proto__ || Object.getPrototypeOf(ErrorExcel)).call(this, props));

            _this.listLineErr = function () {
                var listError = _this.props.listError;


                var aux = listError.map(function (e) {
                    return React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            e.row
                        ),
                        React.createElement(
                            "td",
                            { className: "text-left" },
                            _this.listStringErr(e.listError)
                        )
                    );
                });
                return aux;
            };

            _this.listStringErr = function (listError) {
                return Object.keys(listError).map(function (e) {
                    return React.createElement(
                        "li",
                        { "class": "mb-2" },
                        listError[e],
                        " ",
                        React.createElement("br", null)
                    );
                });
            };

            _this._renderListError = function () {
                return React.createElement(
                    "table",
                    { "class": "table table-bordered table-striped" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Linea"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Error"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        _this.listLineErr()
                    )
                );
            };

            _this._renderListCabeceraError = function () {
                return React.createElement(
                    "table",
                    { "class": "table" },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Nombre de cabecera incorrectas"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        _this.props.listError.map(function (e) {
                            return React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    e
                                )
                            );
                        })
                    )
                );
            };

            return _this;
        }

        _createClass(ErrorExcel, [{
            key: "render",
            value: function render() {
                if (this.props.listError[0].row) {
                    return this._renderListError();
                } else {
                    return this._renderListCabeceraError();
                }
            }
        }]);

        return ErrorExcel;
    }(React.Component);

    return ErrorExcel;
});