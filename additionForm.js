var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "loadsh", "./formPoint1", "./formPoint2", "./formPoint3", "./formPoint4", "./formPoint5", "../../controller/retiroNominaController", "../../common/modalReactBootstrap", "../../common/loader"], function (React, Loadsh, FormPoint1, FormPoint2, FormPoint3, FormPoint4, FormPoint5, RetiroNominaController, ModalReactBootstrap, Loader) {
  var AdditionForm = function (_React$Component) {
    _inherits(AdditionForm, _React$Component);

    function AdditionForm(props) {
      _classCallCheck(this, AdditionForm);

      var _this = _possibleConstructorReturn(this, (AdditionForm.__proto__ || Object.getPrototypeOf(AdditionForm)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.formData[id] = result;
      };

      _this._handleErrorsList = function (errorsList, emptyFields) {
        if (emptyFields) {
          return React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              null,
              errorsList[0]
            )
          );
        } else {
          var errors = errorsList.map(function (errorText) {
            return React.createElement(
              "ul",
              null,
              React.createElement(
                "li",
                null,
                errorText
              )
            );
          });
          return errors;
        }
      };

      _this._handleFormValidation = function (saveForm) {
        var field = _this.formData;
        var validated = true;
        var errorsList = [];
        var emptyFields = true;
        Object.keys(field).map(function (element) {
          //Se excluyen los campos que no son obligatorios y los que estan ocultos
          if (field[element].required && field[element].referencies.current != null) {
            //Se agrega parametro saveForm para utilizar la misma funcion para guardar y enviar el formulario
            if (field[element].value == "" && saveForm != "saveForm") {
              field[element].referencies.current._onFocus(true);
              errorsList[0] = "Complete los campos indicados";
              emptyFields = true;
              validated = false;
            } else {
              if (field[element].isValidate == false && field[element].value != "") {
                field[element].referencies.current._onFocus(true);
                if (field[element].formatText != undefined) {
                  errorsList.push(field[element].formatText);
                }
                emptyFields = false;
                validated = false;
              }
            }
            if (field["beneficiaryType"].id == "2" && (field["listBenef"].isValidate == false || field["listBenef"].list.length == 0)) {
              errorsList[1] = "Designación Beneficiarios: Agregue algún beneficiario o modifíquelo con la información brindada en la parte inferior de la tabla";
              emptyFields = false;
              validated = false;
            }
          }
        });
        if (!validated) {
          _this.setState({
            showModal: true,
            modal: {
              size: "md",
              title: "Validación de campos",
              component: _this._handleErrorsList(errorsList, emptyFields)
            }
          });
          return false;
        } else {
          return true;
        }
      };

      _this._handleErrorServices = function (errorText) {
        _this.setState({
          loading: false,
          showModal: true,
          modal: {
            size: "md",
            title: "Error de servicio",
            component: React.createElement(
              "p",
              null,
              errorText
            )
          }
        });
      };

      _this._handleSendForm = function () {
        if (_this._handleFormValidation()) {
          _this.setState({ loading: true });
          _this.controller.saveRequest(_this.formData, _this.props.recoverPayrollEmployees, function (saveData) {
            if (saveData != "ERROR") {
              var requestNumber = saveData.RESULTADO[0].RET;
              _this.props.handleSetRequestNumber(requestNumber, "C");
              _this.controller.changePayrollStatus(_this.props.recoverPayrollEmployees, "C", requestNumber, function (stateData) {
                if (stateData == "NO_ERROR") {
                  if (!(!_this.formData.photo || !_this.formData.photo.data)) {
                    _this.controller.fileHeader(_this.props.recoverPayrollEmployees, requestNumber, function (headerData) {
                      if (headerData == "NO_ERROR") {
                        _this.controller.saveDniImage(_this.props.recoverPayrollEmployees, _this.formData.photo.data, requestNumber, function (imageData) {
                          if (imageData == "NO_ERROR") {
                            _this.props.handleSwitch("sendOk");
                          } else {
                            _this._handleErrorServices("El servicio de guardado de imagen de DNI no esta disponible, por favor intentalo más tarde");
                          }
                        });
                      } else {
                        _this._handleErrorServices("El servicio de cabecera del archivo no esta disponible, por favor intentalo más tarde");
                      }
                    });
                  } else {
                    _this.props.handleSwitch("sendOk");
                  }
                } else {
                  _this._handleErrorServices("El servicio de cambio de estado del formulario no esta disponible, por favor intentalo más tarde");
                }
              });
            } else {
              _this._handleErrorServices("El servicio de guardado del formulario no esta disponible, por favor intentalo más tarde");
            }
          });
        }
      };

      _this._handleSaveForm = function () {
        if (_this._handleFormValidation("saveForm")) {
          _this.setState({ loading: false });
          _this.controller.saveRequest(_this.formData, _this.props.recoverPayrollEmployees, function (saveData) {
            if (saveData != "ERROR") {
              var requestNumber = saveData.RESULTADO[0].RET;
              _this.props.handleSetRequestNumber(requestNumber, "G");
              _this.controller.changePayrollStatus(_this.props.recoverPayrollEmployees, "G", requestNumber, function (stateData) {
                if (stateData == "NO_ERROR") {
                  if (!(!_this.formData.photo || !_this.formData.photo.data)) {
                    _this.controller.fileHeader(_this.props.recoverPayrollEmployees, requestNumber, function (headerData) {
                      if (headerData == "NO_ERROR") {
                        _this.controller.saveDniImage(_this.props.recoverPayrollEmployees, _this.formData.photo.data, requestNumber, function (imageData) {
                          if (imageData == "NO_ERROR") {
                            _this.props.handleSwitch("saveOk");
                          } else {
                            _this._handleErrorServices("El servicio de guardado de imagen de DNI no esta disponible, por favor intentalo más tarde");
                          }
                        });
                      } else {
                        _this._handleErrorServices("El servicio de cabecera del archivo no esta disponible, por favor intentalo más tarde");
                      }
                    });
                  } else {
                    _this.props.handleSwitch("saveOk");
                  }
                } else {
                  _this._handleErrorServices("El servicio de cambio de estado del formulario no esta disponible, por favor intentalo más tarde");
                }
              });
            } else {
              _this._handleErrorServices("El servicio de guardado del formulario no esta disponible, por favor intentalo más tarde");
            }
          });
        }
      };

      _this._handleCompareObjects = function (object1, object2) {
        var areEqual = true;
        var elementsObj1 = Object.keys(object1);
        var elementsObj2 = Object.keys(object2);
        if (elementsObj1.length == elementsObj2.length) {
          Object.keys(object1).map(function (item) {
            if (object1[item].value != object2[item].value || object1[item].id != object2[item].id) {
              areEqual = false;
            }
          });
        } else {
          areEqual = false;
        }
        return areEqual;
      };

      _this._handleBackButton = function () {
        if (_this._handleCompareObjects(_this.formData, _this.firstFormData)) {
          _this.props.handleShowAdditionRequest();
        } else {
          _this.setState({
            showModal: true,
            modal: {
              size: "md",
              title: "Volver",
              component: React.createElement(
                "p",
                null,
                "\xBFDeseas guardar los datos completados?"
              ),
              classAccept: "confirm-btn-modal",
              textBtnAccept: "Si",
              textBtnCancel: "No"
            }
          });
        }
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
        if (e.target.id == "cancelButtonModal") {
          _this.props.handleShowAdditionRequest();
        }
      };

      _this.state = {
        showModal: false,
        loading: false,
        modal: {
          component: "",
          title: "",
          size: "md",
          classAccept: "",
          textBtnAccept: "",
          textBtnCancel: ""
        }
      };

      _this.formData = {};
      _this.firstFormData = {};
      _this.controller = new RetiroNominaController();
      return _this;
    }

    _createClass(AdditionForm, [{
      key: "render",
      value: function render() {
        if (!this.state.loading) {
          return React.createElement(
            React.Fragment,
            null,
            this.props.readOnly ? "" : React.createElement(
              "h3",
              { className: "subtitle-inside" },
              "Solicitud de Retiro Colectivo \u2013 Adhesi\xF3n Individual"
            ),
            React.createElement(
              "div",
              { className: "d-none" },
              React.createElement(
                "h5",
                { className: "mb-2" },
                "Datos del contratante"
              ),
              React.createElement(FormPoint1, {
                formInfo: this.props.formInfo,
                docTypeList: this.props.docTypeList,
                provincesList: this.props.provincesList,
                prefixList: this.props.prefixList,
                booleanList: this.props.booleanList,
                countriesList: this.props.countriesList,
                sexoList: this.props.sexoList,
                ciutList: this.props.ciutList,
                afipActivitiesList: this.props.afipActivitiesList,
                civilStatusList: this.props.civilStatusList,
                onResults: this._handleResults,
                readOnly: this.props.readOnly
              })
            ),
            React.createElement(
              "h5",
              { className: "my-3" },
              "Datos del solicitante"
            ),
            React.createElement(FormPoint2, {
              formInfo: this.props.formInfo,
              dniImage: this.props.dniImage,
              docTypeList: this.props.docTypeList,
              provincesList: this.props.provincesList,
              prefixList: this.props.prefixList,
              booleanList: this.props.booleanList,
              countriesList: this.props.countriesList,
              sexoList: this.props.sexoList,
              ciutList: this.props.ciutList,
              activitiesList: this.props.activitiesList,
              depoActivitiesList: this.props.depoActivitiesList,
              civilStatusList: this.props.civilStatusList,
              statusList: this.props.statusList,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            React.createElement(
              "h5",
              { className: "mt-3" },
              "Preguntas"
            ),
            React.createElement(FormPoint3, {
              formInfo: this.props.formInfo,
              booleanList: this.props.booleanList,
              provincesList: this.props.provincesList,
              prefixList: this.props.prefixList,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            React.createElement(
              "h5",
              null,
              "Beneficiarios"
            ),
            React.createElement(FormPoint4, {
              formInfo: this.props.formInfo,
              applicantData: this.formData,
              product: this.props.product,
              handleShowAppointBeneficiary: this.props.handleShowAppointBeneficiary,
              user: this.props.user,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            React.createElement(FormPoint5, {
              formInfo: this.props.formInfo,
              booleanList: this.props.booleanList,
              onResults: this._handleResults,
              readOnly: this.props.readOnly
            }),
            this.props.readOnly ? "" : React.createElement(
              "div",
              { className: "row justify-content-md-center col-md-12 text-center" },
              React.createElement(
                "button",
                {
                  className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleSendForm
                },
                "Enviar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleSaveForm
                },
                "Guardar"
              ),
              React.createElement(
                "button",
                {
                  className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                  type: "button",
                  onClick: this._handleBackButton
                },
                "Volver"
              )
            ),
            React.createElement(ModalReactBootstrap, {
              title: this.state.modal.title,
              show: this.state.showModal,
              size: this.state.modal.size,
              component: this.state.modal.component,
              isOpen: this._handleModalIsOpen,
              accept: this.state.modal.textBtnAccept == "Si" ? this._handleSaveForm : false,
              classAccept: this.state.modal.classAccept,
              textBtnAccept: this.state.modal.textBtnAccept,
              textBtnCancel: this.state.modal.textBtnCancel
            })
          );
        } else {
          return React.createElement(
            "div",
            { className: "col-md-11 d-flex justify-content-center" },
            React.createElement(Loader, { width: "4rem", height: "4rem" })
          );
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.firstFormData = Loadsh.cloneDeep(this.formData);
      }
    }]);

    return AdditionForm;
  }(React.Component);

  return AdditionForm;
});