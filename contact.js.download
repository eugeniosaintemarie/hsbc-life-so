var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../services/segurosOnlineService", "../redux/store", "../common/inputvalidation", "../common/inputvalidationExt", "../common/textareavalidation", "../common/modalReactBootstrap"], function (React, UserService, SegurosOnlineService, Store, InputValidation, InputValidationExt, TextareaValidation, ModalReactBootstrap) {
  var contacto = function (_React$Component) {
    _inherits(contacto, _React$Component);

    function contacto(props) {
      _classCallCheck(this, contacto);

      var _this = _possibleConstructorReturn(this, (contacto.__proto__ || Object.getPrototypeOf(contacto)).call(this, props));

      _this.FORM_NAME = "Contacto";
      _this.isLoaded = false;

      _this._handleResults = function (id, result) {
        var data = _defineProperty({}, id, result);
        var form = Object.keys(_this.state.form);
        form = form.find(function (el) {
          return el === id;
        });
        if (typeof form !== "undefined") {
          var current = _this.state;
          var old = _this.state.form;
          _this.setState(Object.assign({}, current, {
            form: Object.assign({}, old, data)
          }));
        }
      };

      _this._handleSubmit = function () {
        var user = _this.state.user;
        var _this$state$form = _this.state.form,
            phone = _this$state$form.phone,
            from = _this$state$form.from,
            to = _this$state$form.to,
            localidad = _this$state$form.localidad,
            provincia = _this$state$form.provincia,
            motivo = _this$state$form.motivo,
            poliza = _this$state$form.poliza,
            mensaje = _this$state$form.mensaje;


        if (motivo.isValidate && poliza !== '') {

          var segurosOnlineService = new SegurosOnlineService();

          _this.setState({
            error: {
              motivo: false,
              poliza: false
            }
          });

          segurosOnlineService.sendContacto({
            apellido: user.CLIENAP1 + " " + user.CLIENAP2,
            descripcion: mensaje ? mensaje.value : '',

            entre: from,
            hasta: to,
            localidad: localidad ? localidad.value : '',
            motivo: motivo.value,
            nombre: user.CLIENNOM,

            poliza: poliza,
            provincia: provincia ? provincia.value : '',
            telefono: phone ? phone.value : ''

          }).then(function (response) {
            //  this.props.onSearchTermChange(motivo);
            _this.setState({
              form: { email: "", phone: "", from: "1", to: "24", localidad: "", provincia: "", motivo: "", poliza: "", mensaje: "" },
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: 'La consulta se ha enviado correctamente.',
                html: true,
                title: "Contacto",
                size: "md"
              }
            });
          });
        } else {
          _this.setState({
            error: {
              motivo: true,
              poliza: true
            }
          });
        }

        return '';
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
        _this.props.handleClose();
      };

      _this.state = {
        data: null,
        form: { email: "", phone: "", from: "1", to: "24", localidad: "", provincia: "", motivo: "", poliza: "", mensaje: "" },
        error: { motivo: false, poliza: false },
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };

      return _this;
    }

    _createClass(contacto, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var motivo = this.state.form.motivo;

        var submitDisabled = typeof motivo.isValidate !== "undefined" && motivo.isValidate ? false : true;
        this.props.isSubmitting;

        var firstPoliza = null;
        var _state = this.state,
            user = _state.user,
            productos = _state.productos,
            productsCollective = _state.productsCollective;


        if (!user) {
          return React.createElement("div", null);
        }

        var productsMap = productsCollective instanceof Array ? productsCollective : Object.keys(productsCollective);

        return React.createElement(
          "div",
          { className: "container remove-left-padding profile-container" },
          React.createElement(
            "div",
            { className: "row" },
            React.createElement(
              "div",
              { className: "panel offset-md-1 col-md-10" },
              React.createElement(
                "div",
                { className: "panel-title" },
                React.createElement(
                  "h5",
                  null,
                  "Contacto"
                ),
                React.createElement(
                  "p",
                  null,
                  "Complet\xE1 los siguientes datos de contacto:"
                )
              ),
              React.createElement(
                "div",
                { className: "panel-container" },
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                      "label",
                      { htmlFor: "estado" },
                      "Email*"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8" },
                    React.createElement(InputValidation, {
                      id: "email",
                      name: "email",
                      type: "email",
                      className: "form-control",
                      onResult: this._handleResults,
                      value: user.MAIL,
                      readOnly: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                      "label",
                      { htmlFor: "pregunta-personal" },
                      "T\xE9lefono para contactar"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(InputValidationExt, {
                      id: "phone",
                      name: "phone",
                      type: "number",
                      requireStr: "Telefono requerido",
                      pattern: "[0-9]*",
                      className: "form-control",
                      onResult: this._handleResults,
                      value: this.state.form.phone.value ? this.state.form.phone.value : ''
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-row " },
                  React.createElement(
                    "div",
                    { className: "col-md-4 mb-3 " },
                    React.createElement(
                      "label",
                      null,
                      "Horario de preferencia para ser contactado"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(
                      "form",
                      { className: "form-inline row pl-2" },
                      React.createElement(
                        "label",
                        null,
                        "Entre las"
                      ),
                      "\xA0\xA0 ",
                      React.createElement(
                        "select",
                        { value: this.state.form.from,
                          className: "input-background-color form-control",
                          onChange: function onChange(e) {
                            return _this2._handleResults('from', e.target.value);
                          } },
                        React.createElement(
                          "option",
                          { value: "1" },
                          "1"
                        ),
                        React.createElement(
                          "option",
                          { value: "2" },
                          "2"
                        ),
                        React.createElement(
                          "option",
                          { value: "3" },
                          "3"
                        ),
                        React.createElement(
                          "option",
                          { value: "4" },
                          "4"
                        ),
                        React.createElement(
                          "option",
                          { value: "5" },
                          "5"
                        ),
                        React.createElement(
                          "option",
                          { value: "6" },
                          "6"
                        ),
                        React.createElement(
                          "option",
                          { value: "7" },
                          "7"
                        ),
                        React.createElement(
                          "option",
                          { value: "8" },
                          "8"
                        ),
                        React.createElement(
                          "option",
                          { value: "9" },
                          "9"
                        ),
                        React.createElement(
                          "option",
                          { value: "10" },
                          "10"
                        ),
                        React.createElement(
                          "option",
                          { value: "11" },
                          "11"
                        ),
                        React.createElement(
                          "option",
                          { value: "12" },
                          "12"
                        ),
                        React.createElement(
                          "option",
                          { value: "13" },
                          "13"
                        ),
                        React.createElement(
                          "option",
                          { value: "14" },
                          "14"
                        ),
                        React.createElement(
                          "option",
                          { value: "15" },
                          "15"
                        ),
                        React.createElement(
                          "option",
                          { value: "16" },
                          "16"
                        ),
                        React.createElement(
                          "option",
                          { value: "17" },
                          "17"
                        ),
                        React.createElement(
                          "option",
                          { value: "18" },
                          "18"
                        ),
                        React.createElement(
                          "option",
                          { value: "19" },
                          "19"
                        ),
                        React.createElement(
                          "option",
                          { value: "20" },
                          "20"
                        ),
                        React.createElement(
                          "option",
                          { value: "21" },
                          "21"
                        ),
                        React.createElement(
                          "option",
                          { value: "22" },
                          "22"
                        ),
                        React.createElement(
                          "option",
                          { value: "23" },
                          "23"
                        ),
                        React.createElement(
                          "option",
                          { value: "24" },
                          "24"
                        )
                      ),
                      "\xA0\xA0 y\xA0\xA0 \xA0\xA0 ",
                      React.createElement(
                        "select",
                        { value: this.state.form.to,
                          className: "input-background-color form-control",
                          onChange: function onChange(e) {
                            return _this2._handleResults('to', e.target.value);
                          } },
                        React.createElement(
                          "option",
                          { value: "1" },
                          "1"
                        ),
                        React.createElement(
                          "option",
                          { value: "2" },
                          "2"
                        ),
                        React.createElement(
                          "option",
                          { value: "3" },
                          "3"
                        ),
                        React.createElement(
                          "option",
                          { value: "4" },
                          "4"
                        ),
                        React.createElement(
                          "option",
                          { value: "5" },
                          "5"
                        ),
                        React.createElement(
                          "option",
                          { value: "6" },
                          "6"
                        ),
                        React.createElement(
                          "option",
                          { value: "7" },
                          "7"
                        ),
                        React.createElement(
                          "option",
                          { value: "8" },
                          "8"
                        ),
                        React.createElement(
                          "option",
                          { value: "9" },
                          "9"
                        ),
                        React.createElement(
                          "option",
                          { value: "10" },
                          "10"
                        ),
                        React.createElement(
                          "option",
                          { value: "11" },
                          "11"
                        ),
                        React.createElement(
                          "option",
                          { value: "12" },
                          "12"
                        ),
                        React.createElement(
                          "option",
                          { value: "13" },
                          "13"
                        ),
                        React.createElement(
                          "option",
                          { value: "14" },
                          "14"
                        ),
                        React.createElement(
                          "option",
                          { value: "15" },
                          "15"
                        ),
                        React.createElement(
                          "option",
                          { value: "16" },
                          "16"
                        ),
                        React.createElement(
                          "option",
                          { value: "17" },
                          "17"
                        ),
                        React.createElement(
                          "option",
                          { value: "18" },
                          "18"
                        ),
                        React.createElement(
                          "option",
                          { value: "19" },
                          "19"
                        ),
                        React.createElement(
                          "option",
                          { value: "20" },
                          "20"
                        ),
                        React.createElement(
                          "option",
                          { value: "21" },
                          "21"
                        ),
                        React.createElement(
                          "option",
                          { value: "22" },
                          "22"
                        ),
                        React.createElement(
                          "option",
                          { value: "23" },
                          "23"
                        ),
                        React.createElement(
                          "option",
                          { value: "24" },
                          "24"
                        )
                      ),
                      "\xA0\xA0 \xA0\xA0",
                      React.createElement(
                        "label",
                        { className: "ml-2" },
                        "hs"
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                      "label",
                      { htmlFor: "pregunta-personal" },
                      "Localidad"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(InputValidationExt, {
                      id: "localidad",
                      name: "localidad",
                      type: "text",
                      className: "input-background-color form-control col-md-12",
                      onResult: this._handleResults,
                      value: this.state.form.localidad.value ? this.state.form.localidad.value : ''
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                      "label",
                      { htmlFor: "pregunta-personal" },
                      "Provincia"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(InputValidationExt, {
                      id: "provincia",
                      name: "provincia",
                      type: "text",
                      className: "input-background-color form-control col-md-12",
                      onResult: this._handleResults,
                      value: this.state.form.provincia.value ? this.state.form.provincia.value : ''
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                      "label",
                      { htmlFor: "pregunta-personal" },
                      "Motivo*"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(InputValidationExt, {
                      id: "motivo",
                      name: "motivo",
                      type: "text",
                      className: "input-background-color form-control col-md-12 " + (this.state.error.motivo ? "input-invalid" : ""),
                      onResult: this._handleResults,
                      requireStr: "Motivo requerido",
                      value: this.state.form.motivo.value ? this.state.form.motivo.value : ''
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row" },
                  React.createElement(
                    "div",
                    { className: "col-md-4" },
                    React.createElement(
                      "label",
                      { htmlFor: "pregunta-personal" },
                      "P\xF3liza*"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(
                      "select",
                      { name: "poliza", id: "poliza",
                        className: "input-background-color form-control",
                        onChange: function onChange(e) {
                          return _this2._handleResults('poliza', e.target.value);
                        } },
                      productos && productos.productosIndividuales && productos.productosIndividuales.map(function (producto) {
                        if (!firstPoliza) {
                          firstPoliza = producto.detalle.NROPOLIZA;
                        };
                        return React.createElement(
                          "option",
                          { value: producto.detalle.NROPOLIZA, key: producto.detalle.NROPOLIZA },
                          producto.detalle.RAMOPDES
                        );
                      }),
                      productsMap.map(function (productoData) {
                        var producto = productsCollective[productoData];
                        if (!firstPoliza) {
                          firstPoliza = producto.cup.NROPOLIZA;
                        };
                        return producto.cup ? React.createElement(
                          "option",
                          { value: producto.cup.NROPOLIZA, key: producto.cup.NROPOLIZA },
                          producto.cup.NROPOLIZA + ' - ' + producto.apellidoRazonSocial
                        ) : '';
                      })
                    ),
                    this.state.form.poliza === '' ? this._handleResults('poliza', firstPoliza) : ''
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-row " },
                  React.createElement(
                    "div",
                    { className: "col-md-4 mb-3 align-self-center" },
                    React.createElement(
                      "label",
                      null,
                      "Mensaje-Descripci\xF3n"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "col-md-8 mb-3" },
                    React.createElement(TextareaValidation, {
                      id: "mensaje",
                      name: "mensaje",
                      type: "text",
                      className: "input-background-color form-control ml-1 col-md-12",
                      onResult: this._handleResults,
                      value: this.state.form.mensaje.value ? this.state.form.mensaje.value : ''
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group row center right container-buttons-contact" },
                  React.createElement(
                    "div",
                    { className: "col-md-12 center mb-3 text-center" },
                    React.createElement(
                      "button",
                      {
                        disabled: submitDisabled,
                        className: "btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleSubmit
                      },
                      "Enviar"
                    )
                  )
                )
              )
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModalSuccess,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML
          })
        );
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this3 = this;

        var userService = new UserService();

        var _Store$getState = Store.getState(),
            auth = _Store$getState.auth;

        // if (auth.authorized) {


        userService.getLoggedUser().then(function (user) {
          userService.getCustomerProducts().then(function (productos) {
            userService.buscarClientes().then(function (productsCollective) {
              _this3.setState({
                productos: productos,
                productsCollective: productsCollective,
                user: user
              });
            });
          });
        });
        //  }
      }
    }]);

    return contacto;
  }(React.Component);

  return contacto;
});