var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/modalReactBootstrap", "../../common/tablaCamposNomina", "../../controller/nominaController"], function (React, ModalReactBootstrap, TablaCamposNomina, NominaController) {
  var NominaCompletaStep1 = function (_React$Component) {
    _inherits(NominaCompletaStep1, _React$Component);

    function NominaCompletaStep1(props) {
      _classCallCheck(this, NominaCompletaStep1);

      var _this = _possibleConstructorReturn(this, (NominaCompletaStep1.__proto__ || Object.getPrototypeOf(NominaCompletaStep1)).call(this, props));

      _this.FORM_NAME = "nominaCompletaStep1";

      _this._handleBack = function () {
        _this.props.switch("home");
      };

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          cantModal: 0,
          showModal: !current
        });
      };

      _this._handleSubmit = function () {
        if (_this._verifyFields()) {
          _this.setState({
            showErrorNotCompleted: false
          });
          _this.props.switch(_this.state.sigProceso);
        } else {
          _this.setState({
            showErrorNotCompleted: true
          });
        }
      };

      _this._handleCamposNomina = function (campos) {
        _this.state.camposNomina = campos;
      };

      _this._handleContinue = function () {
        _this.setState({
          showModal: true
        });
        _this.state.modal.title = "Contanos el formato de tu nomina";
        var resultado;
        var camposCopia = _this.state.camposNomina;
        var camposFilter = _this.state.camposNomina.filter(function (e) {
          return e.modal.texto != "";
        });
        var options = "";

        // Guardo el value del input anterior
        for (var j = 0; j < camposCopia.length; j++) {
          if (_this.state.cantModal != 0 && camposCopia[j].nombre == camposFilter[_this.state.cantModal - 1].nombre) {
            resultado = document.getElementById("modalFormatoNomina" + (_this.state.cantModal - 1)); //Obtengo la opcion que eligio en el popup
            // cargo el texto a mostrar
            camposCopia[j].formato.texto = JSON.parse(resultado.value).texto;
            // cargo el regex a utilizar
            camposCopia[j].formato.regex = JSON.parse(resultado.value).regex;
            _this.setState({
              camposNomina: camposCopia
            });
          }
        }
        // Armo el html del input para dar formato al campo
        var selectView = "";
        if (_this.state.cantModal < camposFilter.length) {

          if (camposFilter[_this.state.cantModal].nombre == "sueldo" || camposFilter[_this.state.cantModal].nombre == "Suma asegurada") {
            selectView = selectView + "style=display:none";
          }
          camposFilter[_this.state.cantModal].formato.options.forEach(function (optionValue) {
            options += "<option value='" + JSON.stringify(optionValue) + "'> " + optionValue.texto + "</option>";
          });
          _this.state.modal.contentHTML = "<div class='col-md 12 text-justify'>" + camposFilter[_this.state.cantModal].modal.texto + "<br></br><div class='col-md 12'>" + "<select class='form-control' id='modalFormatoNomina" + _this.state.cantModal + "'" + selectView + ">" + options + "</select>" + "</div>" + "</div>";
          _this.state.cantModal++;
        } else {
          // Fin del proceso
          _this.setState({
            showModal: false,
            botonText: "Continuar",
            finProcesoFormatos: true
          });
          _this.props.camposNomina(_this.state.camposNomina);
          _this.props.switch("nominaCompleta2");
        }
      };

      _this.state = {
        listExcel: [],
        filename: "",
        showModal: false,
        cantModal: 0,
        finProcesoFormatos: false,
        botonText: "Comenzar proceso",
        camposNomina: [],
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "Nomina de asegurados",
          size: "md"
        }
      };
      _this.fileExcel = null;
      _this.nominaController = new NominaController();
      return _this;
    }

    _createClass(NominaCompletaStep1, [{
      key: "render",
      value: function render() {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            "h4",
            { className: "subtitle-inside" },
            "Informa n\xF3mina completa"
          ),
          React.createElement(
            "small",
            { className: "subtitle-inside font-weight-normal" },
            "Descargue el instructivo de carga de N\xF3minas, haciendo click",
            " ",
            React.createElement(
              "a",
              {
                href: "https://www.segurosonline.hsbc.com.ar/oficina-gateway/getPDF/SOABMNomInstructivo.pdf",
                target: "_blank"
              },
              "aqu\xED"
            ),
            " "
          ),
          React.createElement(
            "div",
            { className: "col-md-12" },
            "Vamos a validar el formato de los siguientes campos para interpretar correctamente el archivo que vas a cargar"
          ),
          React.createElement("br", null),
          React.createElement(
            "div",
            { className: "col-md-6" },
            React.createElement(TablaCamposNomina, {
              funcionResults: this._handleCamposNomina,
              camposNomina: this.state.camposNomina
            })
          ),
          React.createElement(
            "div",
            { className: "container remove-left-padding profile-container" },
            React.createElement(
              "div",
              { className: "col-12 mt-4" },
              React.createElement(
                "div",
                { className: "form-group row text-center mt-5" },
                React.createElement(
                  "div",
                  { className: "col-md-12" },
                  React.createElement(
                    "button",
                    {
                      onClick: this._handleContinue,
                      className: "btn btn-hsbc"
                    },
                    this.state.botonText
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-12" },
                  React.createElement(
                    "button",
                    { onClick: this._handleBack, className: "btn btn-light" },
                    "Cancelar"
                  )
                )
              )
            )
          ),
          React.createElement(ModalReactBootstrap, {
            accept: this._handleContinue,
            title: this.state.modal.title,
            show: this.state.showModal,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML
          })
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        this.nominaController.getNomina(this.props.grupo, function (response) {
          if (typeof response == "string") {
            _this2.props.payrollInError(response);
          }
        });
      }
    }]);

    return NominaCompletaStep1;
  }(React.Component);

  return NominaCompletaStep1;
});