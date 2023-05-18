var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var PaginatedView = function (_React$Component) {
    _inherits(PaginatedView, _React$Component);

    function PaginatedView(props) {
      _classCallCheck(this, PaginatedView);

      var _this = _possibleConstructorReturn(this, (PaginatedView.__proto__ || Object.getPrototypeOf(PaginatedView)).call(this, props));

      _this._getHandleSelectorEnd = function (activepage, maximo) {
        var value = activepage;
        if (activepage < maximo) value++;
        return value;
      };

      _this._getHandleSelectorStart = function (activepage) {
        var value = activepage;
        if (activepage > 0) value--;
        return value;
      };

      _this._setLimits = function () {
        var limits = [100, 300, 600, 900, 1200];

        var list = limits.filter(function (item) {
          if (item < _this.props.total) return item;
        });
        return list;
      };

      _this._setLimits = function () {
        var total = _this.props.total;
        var flag = 0;
        var limits = [100, 300, 600, 900, 1200];
        var list = limits.filter(function (limit) {
          if (limit < total) return limit;else if (limit >= total && flag == 0) {
            flag = 1;
            return limit;
          }
        });
        return list;
      };

      _this._getPageSelector = function (total, rows) {
        var selectors = total / rows;
        var lista = [];
        if (selectors > 1) {
          lista.push(React.createElement(
            "button",
            { className: "paginator-btn", onClick: _this.props.selectpage, key: 0, value: 1 },
            "<<"
          ));
          lista.push(React.createElement(
            "button",
            { className: "paginator-btn", onClick: _this.props.selectpage, key: 1, value: _this._getHandleSelectorStart(_this.props.activepage) },
            "<"
          ));
          for (var i = 0; i < selectors; i++) {
            lista.push(React.createElement(
              "button",
              { className: "paginator-btn", onClick: _this.props.selectpage, key: i + 2, value: i + 1 },
              i + 1
            ));
          }
          lista.push(React.createElement(
            "button",
            { className: "paginator-btn", onClick: _this.props.selectpage, key: selectors + 2, value: _this._getHandleSelectorEnd(_this.props.activepage, selectors) },
            ">"
          ));
          lista.push(React.createElement(
            "button",
            { className: "paginator-btn", onClick: _this.props.selectpage, key: selectors + 3, value: ~~selectors + 1 },
            ">>"
          ));
        }
        return lista;
      };

      _this.state = {
        rowsLimit: _this._setLimits()

      };
      return _this;
    }

    _createClass(PaginatedView, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement(
          "tfoot",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              { colSpan: "100%" },
              React.createElement(
                "div",
                { className: "paginador" },
                React.createElement(
                  "div",
                  null,
                  this.props.activepage,
                  " - ",
                  this.props.selected,
                  " de ",
                  this.props.total,
                  " elementos"
                ),
                React.createElement(
                  "div",
                  null,
                  this.state.rowsLimit.map(function (limit, i) {
                    return React.createElement(
                      React.Fragment,
                      { key: i },
                      i == 0 ? " " : "|",
                      React.createElement(
                        "button",
                        { className: "paginator-btn",
                          key: i, onClick: _this2.props.setrows, value: limit
                        },
                        limit
                      )
                    );
                  })
                ),
                React.createElement(
                  "div",
                  null,
                  this._getPageSelector(this.props.total, this.props.rows)
                )
              )
            )
          )
        );
      }
    }]);

    return PaginatedView;
  }(React.Component);

  return PaginatedView;
});