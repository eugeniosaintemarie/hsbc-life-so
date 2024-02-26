var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var AdditionRequest = function (_React$Component) {
        _inherits(AdditionRequest, _React$Component);

        function AdditionRequest(props) {
            _classCallCheck(this, AdditionRequest);

            var _this = _possibleConstructorReturn(this, (AdditionRequest.__proto__ || Object.getPrototypeOf(AdditionRequest)).call(this, props));

            _this.state = {
                printButtonLoading: false
            };
            return _this;
        }

        _createClass(AdditionRequest, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        { className: "container-fluid" },
                        React.createElement(
                            "div",
                            { className: "col-md-12" },
                            React.createElement(
                                "div",
                                { className: "alert border bg-light row " },
                                React.createElement("div", { className: "alert-benef" }),
                                React.createElement(
                                    "div",
                                    { className: "col-md-7 " },
                                    React.createElement(
                                        "small",
                                        { className: "text-body pl-4 " },
                                        "Fuiste invitado por tu empleador a adherirte a esta p\xF3liza. Hac\xE9 click para completar la solicitud."
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-5" },
                                    React.createElement(
                                        "button",
                                        { className: "btn btn-danger border-dark right", onClick: this.props.handleShowAdditionManager },
                                        "Completar solicitud"
                                    ),
                                    React.createElement(
                                        "button",
                                        { type: "button", className: "close", "data-dismiss": "alert" },
                                        "\xD7"
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return AdditionRequest;
    }(React.Component);

    return AdditionRequest;
});