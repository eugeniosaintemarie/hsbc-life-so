var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../controller/nominaController", "../../common/dropdownContent"], function (React, NominaController, DropDownContent) {
  var ProfeModal = function (_React$Component) {
    _inherits(ProfeModal, _React$Component);

    function ProfeModal(props) {
      _classCallCheck(this, ProfeModal);

      var _this = _possibleConstructorReturn(this, (ProfeModal.__proto__ || Object.getPrototypeOf(ProfeModal)).call(this, props));

      _this._handleOnClickSearchActivities = function (text, id) {
        text && _this.nominaController.getActividadesPorDesc(text, function (data) {
          var rtas = Object.assign({}, _this.state.RESPUESTAS);
          rtas[id].list = data;
          rtas[id].name = _this.props.activities[id];
          _this.setState({
            RESPUESTAS: rtas
          });
        });
      };

      _this._handleOnResultInputs = function (e) {
        _this.setState(_defineProperty({}, e.target.name, e.target.value));
      };

      _this._handleOnResultDrop = function (id, result) {
        var rtas = Object.assign({}, _this.state.RESPUESTAS);
        rtas[id].newVal = result;
        _this.setState({
          RESPUESTAS: rtas
        });
        _this.props.getActivitiesModalData(rtas);
      };

      _this.state = {
        RESPUESTAS: _this.props.activities.map(function () {
          return { list: [] };
        })
      };

      _this.nominaController = new NominaController();
      _this.activities = _this.props.activities;
      return _this;
    }

    _createClass(ProfeModal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.props.activities.forEach(function (act) {
          _this2.setState(Object.assign({}, _this2.state, _defineProperty({}, act, act)));
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { className: "alert alert-secondary" },
              React.createElement(
                "strong",
                null,
                "Actividades"
              )
            ),
            React.createElement(
              "p",
              { className: "mb-4" },
              "Debes apretar el bot\xF3n ",
              React.createElement(
                "button",
                { className: "btn btn-link btn-hsbc btn-detail-prima input-size", style: { opacity: "1" }, disabled: true },
                React.createElement("img", { width: "16px", src: "../img/home/tick.svg" })
              ),
              " en cada caso para poder seleccionar una opci\xF3n"
            )
          ),
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "col-md-12" },
              this.activities.map(function (act, i) {
                return React.createElement(
                  "div",
                  { className: "text-center mt-3 mb-3" },
                  React.createElement(
                    "div",
                    { className: "form-inline justify-content-center  mt-2 mb-2" },
                    React.createElement("input", {
                      className: "form-control input-size text-center",
                      type: "text",
                      id: "idInput_" + i,
                      name: act,
                      value: _this3.state[act],
                      onChange: _this3._handleOnResultInputs
                    }),
                    React.createElement(
                      "button",
                      {
                        className: "btn btn-link btn-hsbc btn-detail-prima input-size",
                        onClick: function onClick() {
                          return _this3._handleOnClickSearchActivities(_this3.state[act], i);
                        }

                      },
                      React.createElement("img", { width: "16px", src: "../img/home/tick.svg" })
                    )
                  ),
                  React.createElement(
                    "div",
                    null,
                    React.createElement(DropDownContent, {
                      supClassName: "form-inline justify-content-center  mt-2 mb-2",
                      list: _this3.state.RESPUESTAS[i].list,
                      className: "col-md-8  input-background-color form-control input-size text-center ",
                      id: "idCbo_" + i,
                      name: i,
                      typeValue: "id",
                      idObject: "CODIGO",
                      nameObject: "DESCRIPCIONA",

                      onResult: _this3._handleOnResultDrop
                    })
                  )
                );
              })
            )
          )
        );
      }
    }]);

    return ProfeModal;
  }(React.Component);

  return ProfeModal;
});