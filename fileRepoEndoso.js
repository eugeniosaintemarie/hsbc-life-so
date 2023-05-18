var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils"], function (React, Utils) {
    var FileRepoEndoso = function (_React$Component) {
        _inherits(FileRepoEndoso, _React$Component);

        function FileRepoEndoso(props) {
            _classCallCheck(this, FileRepoEndoso);

            var _this = _possibleConstructorReturn(this, (FileRepoEndoso.__proto__ || Object.getPrototypeOf(FileRepoEndoso)).call(this, props));

            _this._handleOnClick = function () {
                _this.props.switch('endosoMain');
            };

            _this.state = {
                table: []
            };
            return _this;
        }

        _createClass(FileRepoEndoso, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "b",
                                null,
                                "Su endoso se recibi\xF3 con \xE9xito, el mismo esta siendo procesado."
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                type: "button",
                                onClick: this._handleOnClick },
                            "Aceptar"
                        )
                    )
                );
            }
        }]);

        return FileRepoEndoso;
    }(React.Component);

    return FileRepoEndoso;
});