var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-redux"], function (React, ReactRedux) {
  var NavBar = function (_React$Component) {
    _inherits(NavBar, _React$Component);

    function NavBar(props) {
      _classCallCheck(this, NavBar);

      var _this = _possibleConstructorReturn(this, (NavBar.__proto__ || Object.getPrototypeOf(NavBar)).call(this, props));

      _this.menu = function () {
        if (_this.props.auth.authorized || _this.props.GSP) {
          return React.createElement(
            "div",
            { className: "float-right pr-5" },
            React.createElement(
              "a",
              {
                href: "#",
                onClick: _this.props.handleShowNovedades,
                className: "btn btn-link"
              },
              "Novedades"
            ),
            React.createElement(
              "a",
              {
                href: "#",
                onClick: _this.props.handleShowProfile,
                className: "btn btn-link"
              },
              "Mis Datos"
            ),
            React.createElement(
              "a",
              {
                href: "#",
                onClick: _this.props.handleShowContact,
                className: "btn btn-link text-left"
              },
              "Contacto",
              React.createElement("br", null),
              React.createElement(
                "small",
                null,
                "Ayuda y Soporte"
              )
            ),
            React.createElement(
              "button",
              {
                className: "btn btn-link",
                onClick: function onClick() {
                  _this.props.logout();
                }
              },
              "Salir"
            )
          );
        }
        return "";
      };

      return _this;
    }

    _createClass(NavBar, [{
      key: "render",
      value: function render() {
        return React.createElement(
          "nav",
          { className: "navbar navbar-light bg-light" },
          React.createElement(
            "a",
            { className: "navbar-brand", href: "#" },
            React.createElement("img", { src: "https://argentina.hsbc.com.ar/OBD%20VIDA/images/hsbc_vida_logo.png", alt: "logo" })
          ),
          this.menu()
        );
      }
    }]);

    return NavBar;
  }(React.Component);

  function mapStateToProps(state) {
    return {
      auth: Object.assign({}, state.auth)
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      logout: function logout() {
        return dispatch({ type: "LOGOUT" });
      }
    };
  }

  return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(NavBar);
});