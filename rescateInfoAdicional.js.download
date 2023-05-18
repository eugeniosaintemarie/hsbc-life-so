var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react', 'react-dom', '../services/userService', "../common/inputvalidationExt", "../common/modal", "../services/segurosOnlineService", "../redux/store", "../common/modalReactBootstrap"], function (React, ReactDOM, UserService, InputValidationExt, Modal, SegurosOnlineService, Store, ModalReactBootstrap) {
  var RescateInfoAdicional = function (_React$Component) {
    _inherits(RescateInfoAdicional, _React$Component);

    function RescateInfoAdicional(props) {
      _classCallCheck(this, RescateInfoAdicional);

      var _this = _possibleConstructorReturn(this, (RescateInfoAdicional.__proto__ || Object.getPrototypeOf(RescateInfoAdicional)).call(this, props));

      _this.FORM_NAME = 'InfoAdicional';

      _this._handleBack = function () {
        _this.props.switch('home');
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._sendValidationEMail = function () {
        var segurosOnlineService = new SegurosOnlineService();
        segurosOnlineService.envioCodigoVerificacion().then(function (validacion) {
          if (validacion.CODRESULTADO == "OK") {
            _this._handleValidacionIdentidad();
          } else {
            //ERROR AL CONSULTAR SERVICIO ENVIO MAIL  */
            _this.setState({
              showModalSuccess: true,
              modal: {
                component: null,
                contentHTML: 'Error al adjuntar la informacion del rescate.',
                html: true,
                title: "Rescates",
                size: "md"
              }
            });
          }
        });
      };

      _this._handleValidacionIdentidad = function () {
        _this.props.switch('rescateValidacion');
      };

      _this._handleSubmit = function () {
        var ingresos = _this.state.form.ingresos;
        var currentProduct = Store.getState().seguros.currentProduct;

        var segurosOnlineService = new SegurosOnlineService();

        params1551 = {
          'CIAASCOD': currentProduct.detalle.CIAASCOD,
          'RAMOPCOD': currentProduct.detalle.RAMOPCOD,
          'POLIZANN': currentProduct.detalle.POLIZANN,
          'POLIZSEC': currentProduct.detalle.POLIZSEC,
          'CERTIPOL': currentProduct.detalle.CERTIPOL,
          'CERTIANN': currentProduct.detalle.CERTIANN,
          'CERTISEC': currentProduct.detalle.CERTISEC
        };

        if (_this.state.valuePep == 'S') {
          //Pantalla de error de usuario por ser PEP
          _this.props.switch('errorUsuario');
        } else {
          _this._sendValidationEMail();
          /*segurosOnlineService.get1551_RescatesMov999(params1551).then(mensaje1551 => {
              if (mensaje1551.Message.CAMPOS.INTERPERI == 0 ||
              mensaje1551.Message.CAMPOS.INTERPERI == "") {
              //Se envia mail y se redirige a la pantalla validacion
            } else {
              // 1 CLIENTE LOW O MEDIO (para estos productos verificar fondos y mov). IC06 – IC07 – IC08 – IJ06 – IJ07
              if (currentProduct.detalle.RAMOPCOD == "IC06" || currentProduct.detalle.RAMOPCOD == "IC07" ||
                currentProduct.detalle.RAMOPCOD == "IC08" || currentProduct.detalle.RAMOPCOD == "IJ06" ||
                currentProduct.detalle.RAMOPCOD == "IJ07") {
                  // CASO EN EL QUE NO SE TENGA FONDOS  
                if (mensaje1551.Message.CAMPOS.SALDOFONDO2 == 0 || mensaje1551.Message.CAMPOS.SALDOFONDO3 == 0) {
                  
                }
                  // CASO EN EL QUE SE TENGA FONDOS Y MOV MENOR A 10 USD
                if (mensaje1551.Message.CAMPOS.SALDOFONDO2 != 0 || mensaje1551.Message.CAMPOS.SALDOFONDO3 != 0) {
                  if (mensaje1551.Message.CAMPOS.INTERPERI < 10) {
                  
                  }
                    // CASO EN EL QUE SE TENGA FONDOS Y MOV MAYOR A 10 USD Y MENOR A 50 USD y NO SUPERAR EL 5% DE CUENTA AHORRO PLUS
                  var porcSaldoAhorroPlus = (mensaje1551.Message.CAMPOS.SALDOMVTE * 5) / 100;
                  if ((mensaje1551.Message.CAMPOS.INTERPERI > 10 &&
                    mensaje1551.Message.CAMPOS.INTERPERI < 50) &&
                    mensaje1551.Message.CAMPOS.INTERPERI <= porcSaldoAhorroPlus) {
                      
                  }
                    // CASO EN EL QUE SE TENGA FONDOS Y MOV MAYOR A 10 USD Y MENOR A 50 USD Y SUPERAR EL 5% DE CUENTA AHORRO PLUS
                  if ((mensaje1551.Message.CAMPOS.INTERPERI > 10 &&
                    mensaje1551.Message.CAMPOS.INTERPERI < 50) &&
                    mensaje1551.Message.CAMPOS.INTERPERI >= porcSaldoAhorroPlus) {
                    //PANTALLA ERROR USUARIO (registracion SQL)
                    this.props.switch('errorUsuario');
                  }
                }
              }
                // 1 CLIENTE LOW O MEDIO (para estos productos verificar fondos y mov). IC04 – IC05
              if (currentProduct.detalle.RAMOPCOD == "IC04" || currentProduct.detalle.RAMOPCOD == "IC05") {
                
              }
            }
          })*/
        }
      };

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

      _this.state = {
        form: { ingresos: 0 },
        valueRelacionDep: "",
        valuePep: "N",
        filePDF: null,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        }
      };
      _this.handleChangePep = _this.handleChangePep.bind(_this);
      _this.handleChangeRelacionDep = _this.handleChangeRelacionDep.bind(_this);
      return _this;
    }

    _createClass(RescateInfoAdicional, [{
      key: 'handleChangeRelacionDep',
      value: function handleChangeRelacionDep(event) {
        this.setState({
          valueRelacionDep: event.target.value
        });
      }
    }, {
      key: 'handleChangePep',
      value: function handleChangePep(event) {
        this.setState({
          valuePep: event.target.value
        });
      }
    }, {
      key: 'fileChangedHandler',
      value: function fileChangedHandler(event) {
        var selectedFile = event.target.files;
        var file = null;
        var fileBase64 = null;
        var fileName = "";
        //Check File is not Empty
        if (selectedFile.length > 0) {
          // Select the very first file from list
          var fileToLoad = selectedFile[0];
          fileName = fileToLoad.name;
          // FileReader function for read the file.
          var fileReader = new FileReader();
          // Onload of file read the file content
          fileReader.onload = function (fileLoadedEvent) {
            file = fileLoadedEvent.target.result;
            // Print data in console
          };
          // Convert data to base64
          fileBase64 = fileReader.readAsDataURL(fileToLoad);
        }

        this.setState({
          filePDF: fileBase64
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var ingresos = this.state.form.ingresos;


        var submitDisabled = (typeof ingresos.isValidate !== "undefined" && ingresos.isValidate ? false : true) || this.props.isSubmitting;

        return React.createElement(
          React.Fragment,
          null,
          React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: 'panel' },
              React.createElement(
                'div',
                { className: 'panel-title' },
                React.createElement(
                  'h2',
                  { className: 'text-left text-dark' },
                  'Por favor detalle la siguiente informaci\xF3n'
                ),
                React.createElement('hr', { className: 'red' })
              ),
              React.createElement(
                'div',
                { className: 'panel-container' },
                React.createElement(
                  'div',
                  { className: 'form-group row' },
                  React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                      'label',
                      null,
                      '\xBFCuales son los ingresos anuales que percibe?:'
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'col-md-8' },
                    React.createElement(InputValidationExt, {
                      id: 'ingresos',
                      name: 'ingresos',
                      type: 'number',
                      pattern: '[0-9]*',
                      minLength: '2',
                      maxLength: '10',
                      requiredStr: 'Ingreso requerido',
                      className: 'form-control',
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'form-group row' },
                  React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                      'label',
                      null,
                      'Indique su relaci\xF3n laboral'
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'col-md-8' },
                    React.createElement(
                      'select',
                      { value: this.state.valueRelacionDep, onChange: this.handleChangeRelacionDep,
                        className: 'form-control' },
                      React.createElement(
                        'option',
                        { value: 'RD' },
                        'Relaci\xF3n de dependencia'
                      ),
                      React.createElement(
                        'option',
                        { value: 'RI' },
                        'Responsable Inscripto'
                      ),
                      React.createElement(
                        'option',
                        { value: 'M' },
                        'Monotributista'
                      ),
                      React.createElement(
                        'option',
                        { value: 'A' },
                        'Aut\xF3nomo'
                      ),
                      React.createElement(
                        'option',
                        { value: 'J' },
                        'Jubilado'
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'form-group row' },
                  React.createElement(
                    'div',
                    { className: 'col-md-4' },
                    React.createElement(
                      'label',
                      null,
                      '\xBFEs usted una persona pol\xEDticamente expuesta?'
                    )
                  ),
                  React.createElement(
                    'div',
                    { className: 'col-md-8' },
                    React.createElement(
                      'select',
                      { value: this.state.valuePep, onChange: this.handleChangePep,
                        className: 'form-control' },
                      React.createElement(
                        'option',
                        { value: 'S' },
                        'Si'
                      ),
                      React.createElement(
                        'option',
                        { value: 'N' },
                        'No'
                      )
                    )
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'panel-actions text-center center' },
                  React.createElement(
                    'button',
                    {
                      disabled: submitDisabled,
                      className: 'btn btn-hsbc right ' + (submitDisabled ? 'disabled' : ""),
                      onClick: this._handleSubmit
                    },
                    'Continuar'
                  ),
                  React.createElement(
                    'button',
                    { className: 'btn btn btn-light border-dark right ml-2', onClick: this._handleBack },
                    'Cancelar'
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
          )
        );
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {}
    }]);

    return RescateInfoAdicional;
  }(React.Component);

  return RescateInfoAdicional;
});