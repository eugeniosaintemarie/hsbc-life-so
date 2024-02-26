var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var ProgressBar = function (_React$Component) {
        _inherits(ProgressBar, _React$Component);

        function ProgressBar(props) {
            _classCallCheck(this, ProgressBar);

            var _this = _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).call(this, props));

            _this.state = {
                progress: 0,
                preValue: 0
            };
            return _this;
        }

        _createClass(ProgressBar, [{
            key: "componentDidUpdate",
            value: function componentDidUpdate(prevProps, prevState) {
                if (prevProps.progress !== this.props.progress) {
                    this.setState({ preValue: this.props.progress });
                    // Simulando un progreso gradual
                    if (this.state.progress < 100) {
                        this.setState({ progress: this.state.preValue * 100 / this.props.nominaLenght });
                    }
                }
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(
                    "div",
                    { className: "progress" },
                    React.createElement(
                        "span",
                        null,
                        "Cargando:"
                    ),
                    React.createElement(
                        "div",
                        {
                            className: "progress-bar",
                            role: "progressbar",
                            style: { width: this.state.progress + "%" },
                            "aria-valuenow": this.state.progress,
                            "aria-valuemin": "0",
                            "aria-valuemax": "100"
                        },
                        this.props.progress + "/" + this.props.nominaLenght
                    )
                );
            }
        }]);

        return ProgressBar;
    }(React.Component);

    return ProgressBar;
});