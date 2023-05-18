var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux", "./layout", "../lib/utils"], function (React, ReactRedux, Layout, Utils) {
    var Container = function (_React$Component) {
        _inherits(Container, _React$Component);

        function Container(props) {
            _classCallCheck(this, Container);

            var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

            _this._reload = function () {
                _this.props.logOut();
                return React.createElement(
                    "div",
                    null,
                    "Cargando"
                );
            };

            _this.state = {};
            return _this;
        }

        _createClass(Container, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    this.props.auth.reload == false ? React.createElement(Layout, {
                        assignBackground: this.props.assignBackground,
                        removeBackground: this.props.removeBackground }) : this._reload()
                );
            }
        }]);

        return Container;
    }(React.Component);

    function mapStateToProps(state) {
        return {
            auth: Object.assign({}, state.auth)
        };
    }

    function mapDispatchToProps(dispatch) {
        return {
            logOut: function logOut() {
                return dispatch({ type: "RELOAD_FALSE" });
            },
            login: function login() {
                return dispatch({ type: "LOGIN" });
            }
        };
    }

    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Container);
});