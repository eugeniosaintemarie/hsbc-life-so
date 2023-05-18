var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../common/inputvalidation", "../../../common/dropdownContent", "../../../controller/endososController", "../../../controller/beneficiariosController", "../../../common/loader", "../../../common/datepicker", "../../../common/datepickerAcOff", "../../../common/modalReactBootstrap"], function (React, InputValidation, DropDownContent, EndososController, BeneficiariosController, Loader, DatePicker, DatePickerAcOff, ModalReactBootstrap) {
  var FormIndividualBeneficiary = function (_React$Component) {
    _inherits(FormIndividualBeneficiary, _React$Component);

    function FormIndividualBeneficiary(props) {
      _classCallCheck(this, FormIndividualBeneficiary);

      var _this = _possibleConstructorReturn(this, (FormIndividualBeneficiary.__proto__ || Object.getPrototypeOf(FormIndividualBeneficiary)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
        result.refe = _this.refes[id];
        _this.forms[id] = result;

        _this.props.onResult(_this.props.id, _this.forms);
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;

        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._handleOpenModalPEP = function () {
        _this.setState({
          showModalSuccess: true,
          modal: {
            component: null,
            contentHTML: '<div style="margin: 0px -5px">Define la prioridad de cobro que se le asigna a cada beneficiario o grupo de beneficiarios (en caso de haber mas de uno para un mismo numero de orden) </div>',
            html: true,
            title: "Información",
            size: "lg"
          }
        });
      };

      _this._handleBirthDayResults = function (id, result) {
        var data = { value: result };
        _this._handleResults(id, data);
      };

      var _ref = _this.props.selectedItem ? _this.props.selectedItem : {},
          _ref$NOMINAS = _ref.NOMINAS,
          NOMINAS = _ref$NOMINAS === undefined ? {} : _ref$NOMINAS;

      var _NOMINAS$APEBENE = NOMINAS.APEBENE,
          APEBENE = _NOMINAS$APEBENE === undefined ? "" : _NOMINAS$APEBENE,
          _NOMINAS$TIPDOCBENE = NOMINAS.TIPDOCBENE,
          TIPDOCBENE = _NOMINAS$TIPDOCBENE === undefined ? "" : _NOMINAS$TIPDOCBENE,
          _NOMINAS$NUMDOCBENE = NOMINAS.NUMDOCBENE,
          NUMDOCBENE = _NOMINAS$NUMDOCBENE === undefined ? "" : _NOMINAS$NUMDOCBENE,
          _NOMINAS$BENEPORC = NOMINAS.BENEPORC,
          BENEPORC = _NOMINAS$BENEPORC === undefined ? "" : _NOMINAS$BENEPORC,
          _NOMINAS$BENEFORD = NOMINAS.BENEFORD,
          BENEFORD = _NOMINAS$BENEFORD === undefined ? "" : _NOMINAS$BENEFORD,
          _NOMINAS$RELBECOD = NOMINAS.RELBECOD,
          RELBECOD = _NOMINAS$RELBECOD === undefined ? "" : _NOMINAS$RELBECOD,
          _NOMINAS$FNACIMIE = NOMINAS.FNACIMIE,
          FNACIMIE = _NOMINAS$FNACIMIE === undefined ? "" : _NOMINAS$FNACIMIE,
          _NOMINAS$BENNOMBRE = NOMINAS.BENNOMBRE,
          BENNOMBRE = _NOMINAS$BENNOMBRE === undefined ? "" : _NOMINAS$BENNOMBRE,
          _NOMINAS$BENNUMTELEF = NOMINAS.BENNUMTELEF,
          BENNUMTELEF = _NOMINAS$BENNUMTELEF === undefined ? "" : _NOMINAS$BENNUMTELEF,
          _NOMINAS$BENEMAIL = NOMINAS.BENEMAIL,
          BENEMAIL = _NOMINAS$BENEMAIL === undefined ? "" : _NOMINAS$BENEMAIL;


      _this.state = {
        loaded: false,
        listTipoDoc: {},
        listParentestco: {},
        modal: {
          title: "",
          component: null,
          size: "lg",
          html: false
        },
        birthday: { value: FNACIMIE },
        dniNumber: { value: NUMDOCBENE, isValidate: false },
        name: { value: BENNOMBRE, isValidate: false },
        order: { id: BENEFORD, value: "" },
        perc: { value: BENEPORC, isValidate: false },
        surname: { value: APEBENE, isValidate: false },
        relationShip: { id: RELBECOD, value: "" },
        typeDoc: { id: TIPDOCBENE, value: "" },
        email: { value: BENEMAIL, isValidate: false },
        telephone: { value: BENNUMTELEF, isValidate: false }
      };

      _this.beneficiariosController = new BeneficiariosController();
      _this.endososController = new EndososController();
      _this.forms = {};

      _this.refes = _defineProperty({
        //Input
        surname: React.createRef(),
        name: React.createRef(),
        order: React.createRef(),
        perc: React.createRef(),
        dniNumber: React.createRef(),
        InputValidation: React.createRef(),
        telephone: React.createRef(),
        email: React.createRef(),
        //DropDown
        relationShip: React.createRef(),
        typeDoc: React.createRef()
      }, "birthday" + _this.props.id, React.createRef());

      _this.locationLoad = false;
      return _this;
    }

    _createClass(FormIndividualBeneficiary, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            id = _props.id,
            _props$onlyView = _props.onlyView,
            onlyView = _props$onlyView === undefined ? false : _props$onlyView;


        var fecha = this.state.birthday.value.toString();
        var anio = fecha.substr(0, 4);
        var mes = fecha.substr(4, 2);
        var dia = fecha.substr(6, 2);
        var fechaValue = dia + "/" + mes + "/" + anio;

        if (this.state.loaded) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-row " },
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "surname" },
                    "Apellido"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.surname,
                      id: "surname",
                      name: "surname",
                      disabled: onlyView,
                      minLength: "2",
                      maxLength: "40",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.surname.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "name" },
                    "Nombre"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.name,
                      id: "name",
                      name: "name",
                      disabled: onlyView,
                      minLength: "2",
                      maxLength: "30",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.name.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "typeDoc" },
                    "Tipo Documento"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.typeDoc,
                      list: this.state.listTipoDoc,
                      className: "input-background-color form-control  input-size",
                      id: "typeDoc",
                      name: "typeDoc",
                      disabled: onlyView,
                      idObject: "POV_COD_TDO",
                      nameObject: "POV_DES_TDO",
                      typeValue: "id",
                      defaultValue: this.state.typeDoc.id,
                      defaultName: true,
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "dniNumber" },
                    "N\xFAmero Documento"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.dniNumber,
                      id: "dniNumber",
                      name: "dniNumber",
                      disabled: onlyView,
                      minLength: "",
                      maxLength: "11",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.dniNumber.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "birthday" + id },
                    "Fecha de Nacimiento"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DatePickerAcOff, {
                      ref: this.refes["birthday" + id],
                      className: "input-background-color form-control input-size",
                      name: "birthday" + id,
                      id: "birthday" + id,
                      disabled: onlyView,
                      value: this.state.birthday.value,
                      formatValue: true,
                      formatType: "YYYY/MM/DD",
                      maxDate: this.props.fecha,
                      minDate: "01/01/1920",
                      onResult: this._handleBirthDayResults
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "form-row form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "relationShip" },
                    "Relacion/Parentesco"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.relationShip,
                      list: this.state.listParentestco,
                      className: "input-background-color form-control input-size",
                      id: "relationShip",
                      name: "relationShip",
                      disabled: onlyView,
                      idObject: "CODIGO",
                      nameObject: "DESCRIPCION",
                      typeValue: "id",
                      defaultValue: this.state.relationShip.id,
                      defaultName: true,
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "email" },
                    "E-mail"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.email,
                      id: "email",
                      name: "email",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "50",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.email.value,
                      className: "input-background-color form-control input-size",
                      pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                      onResult: this._handleResults,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "telephone" },
                    "Tel\xE9fono"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.telephone,
                      id: "telephone",
                      name: "telephone",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "10",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.telephone.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement("i", {
                    "class": "fas fa-info-circle pl-1",
                    onClick: this._handleOpenModalPEP
                  }),
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "order" },
                    "Orden"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.order,
                      list: this.props.orderList,
                      id: "order",
                      name: "order",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "2",
                      requiredStr: "",
                      charactersStr: "",
                      typeValue: "id",
                      defaultValue: this.state.order.id,
                      className: "input-background-color form-control input-size text-center",
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-1 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "perc" },
                    "%"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.perc,
                      id: "perc",
                      name: "perc",
                      type: "text",
                      inputMode: "numeric",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "3",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.perc.value,
                      className: "input-background-color form-control input-size text-center",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        var input = document.getElementById("perc");
                        var seleccionInicial = input.selectionStart;
                        var seleccionFinal = input.selectionEnd;

                        if (parseInt(e.target.value + e.key) > 100) {
                          if (seleccionInicial === seleccionFinal || seleccionInicial === 2 && seleccionFinal === 3 && e.key !== "0") {
                            e.preventDefault();
                          }
                        }

                        var keyCode = e.keyCode || e.which;
                        var keyValue = String.fromCharCode(keyCode);
                        var regex = /^[0-9]+$/;

                        if (e.key === "e" || e.key === "E" || !regex.test(keyValue)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true
                    })
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "mt-4" },
              React.createElement(
                "p",
                { className: "pNewIndividualBeneficiary", style: { fontSize: "0.5rem" } },
                React.createElement(
                  "b",
                  null,
                  "Se\xF1or asegurado"
                ),
                ": designar sus beneficiarios en la cobertura que esta contratando es un derecho que usted pose\xE9s. La no designaci\xF3n de beneficiarios,o su designaci\xF3n err\xF3nea puede implicar demoras en el tr\xE1mite de cobro del beneficio. As\xED mismo, usted tiene derecho a efectuar o modificar tu designaci\xF3n en cualquier momento, por escrito sin ninguna otra formalidad."
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
        var _this2 = this;

        this.endososController.getWsFormBeneficiary(function (ws) {
          _this2.setState({
            listTipoDoc: ws.listTipoDoc,
            listParentestco: ws.listParentestco,
            loaded: true
          });
        });
      }
    }]);

    return FormIndividualBeneficiary;
  }(React.Component);

  return FormIndividualBeneficiary;
});