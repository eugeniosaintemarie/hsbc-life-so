var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../lib/utils", "../../common/inputvalidation", "../../common/dropdownContent", "../../controller/endososController", "../../controller/beneficiariosController", "../../common/loader", "../../common/modalReactBootstrap", "../../common/datepicker"], function (React, Utils, InputValidation, DropDownContent, EndososController, BeneficiariosController, Loader, ModalReactBootstrap, DatePicker) {
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

      _this._handleOpenModalPEP = function (text) {
        _this.setState({
          showModalSuccess: true,
          modal: {
            component: null,
            contentHTML: '<div style="margin: 0px -5px">' + text + '</div>',
            html: true,
            title: "Información",
            size: "lg"
          }
        });
      };

      var _ref = _this.props.selectedItem ? _this.props.selectedItem : {},
          _ref$NOMINAS = _ref.NOMINAS,
          NOMINAS = _ref$NOMINAS === undefined ? {} : _ref$NOMINAS;

      var _NOMINAS$CLIENAP = NOMINAS.CLIENAP,
          CLIENAP = _NOMINAS$CLIENAP === undefined ? "" : _NOMINAS$CLIENAP,
          _NOMINAS$DOCUMTIP = NOMINAS.DOCUMTIP,
          DOCUMTIP = _NOMINAS$DOCUMTIP === undefined ? "" : _NOMINAS$DOCUMTIP,
          _NOMINAS$DOCUMDAT = NOMINAS.DOCUMDAT,
          DOCUMDAT = _NOMINAS$DOCUMDAT === undefined ? "" : _NOMINAS$DOCUMDAT,
          _NOMINAS$PORCENT = NOMINAS.PORCENT,
          PORCENT = _NOMINAS$PORCENT === undefined ? "" : _NOMINAS$PORCENT,
          _NOMINAS$ORDEN = NOMINAS.ORDEN,
          ORDEN = _NOMINAS$ORDEN === undefined ? "" : _NOMINAS$ORDEN,
          _NOMINAS$RELACION = NOMINAS.RELACION,
          RELACION = _NOMINAS$RELACION === undefined ? "" : _NOMINAS$RELACION,
          _NOMINAS$CLIENNOM = NOMINAS.CLIENNOM,
          CLIENNOM = _NOMINAS$CLIENNOM === undefined ? "" : _NOMINAS$CLIENNOM,
          _NOMINAS$FECNACIM = NOMINAS.FECNACIM,
          FECNACIM = _NOMINAS$FECNACIM === undefined ? "" : _NOMINAS$FECNACIM,
          _NOMINAS$TELEFONO = NOMINAS.TELEFONO,
          TELEFONO = _NOMINAS$TELEFONO === undefined ? "" : _NOMINAS$TELEFONO,
          _NOMINAS$EMAIL = NOMINAS.EMAIL,
          EMAIL = _NOMINAS$EMAIL === undefined ? "" : _NOMINAS$EMAIL;


      _this.state = {
        loaded: false,
        listPrefTelPaises: {},
        modal: {
          title: "",
          component: null,
          size: "lg",
          html: false
        },

        dniNumber: { value: DOCUMDAT, isValidate: false },
        name: { value: CLIENNOM, isValidate: false },
        order: { id: ORDEN, value: "" },
        perc: { value: Number(PORCENT) / 100, isValidate: false },
        surname: { value: CLIENAP, isValidate: false },
        age: { value: FECNACIM ? Utils.formatFechaString(FECNACIM) : "", isValidate: false },
        relationShip: { id: RELACION, value: "" },
        typeDoc: { id: DOCUMTIP, value: "" },
        telephone: { value: TELEFONO, isValidate: false },
        email: { value: EMAIL, isValidate: false }
      };

      _this.beneficiariosController = new BeneficiariosController();
      _this.endososController = new EndososController();
      _this.forms = {};

      _this.refes = {
        //Input
        surname: React.createRef(),
        name: React.createRef(),
        order: React.createRef(),
        perc: React.createRef(),
        dniNumber: React.createRef(),
        age: React.createRef(),
        telephone: React.createRef(),
        email: React.createRef(),
        InputValidation: React.createRef(),

        //DropDown
        relationShip: React.createRef(),
        typeDoc: React.createRef()
      };

      _this.locationLoad = false;
      return _this;
    }

    _createClass(FormIndividualBeneficiary, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            id = _props.id,
            _props$onlyView = _props.onlyView,
            onlyView = _props$onlyView === undefined ? false : _props$onlyView;


        if (this.state.loaded) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-row form-height mb-2" },
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
                      classNameAd: "hide",
                      ref: this.refes.name,
                      id: "name",
                      name: "name",
                      disabled: onlyView,
                      minLength: "2",
                      maxLength: "30",
                      requiredStr: "",
                      charactersStr: "",
                      pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                      value: this.state.name.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (!e.key.match(/^[\D]+$/im)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true
                    })
                  )
                ),
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
                      classNameAd: "hide",
                      ref: this.refes.surname,
                      id: "surname",
                      name: "surname",
                      disabled: onlyView,
                      minLength: "2",
                      maxLength: "20",
                      requiredStr: " ",
                      pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                      charactersStr: "",
                      value: this.state.surname.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (!e.key.match(/^[\D]+$/im)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
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
                      list: this.props.listTipoDoc,
                      className: "input-background-color form-control input-size",
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
                  { className: "form-group col-3 text-center" },
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
                      minLength: "0",
                      maxLength: "11",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.dniNumber.value,
                      className: "input-background-color form-control input-size text-center",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "form-row mt-2  form-height " },
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center " },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "age" },
                    "Fecha de Nacimiento"
                  ),
                  React.createElement(
                    "div",
                    { className: "dp-ddben" },
                    React.createElement(DatePicker, {
                      ref: this.refes.age,
                      id: "age",
                      name: "age",
                      disabled: onlyView,
                      value: this.state.age.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      minDate: "01/01/1920"
                      // onKeyPress={(e) => {
                      //   if (isNaN(e.key)) {
                      //     e.preventDefault();
                      //   }
                      // }}
                      // upperCase
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center " },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "relationShip" },
                    "Relaci\xF3n/Parentesco"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.relationShip,
                      list: this.props.listParentesco,
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
                  { className: "form-group col-4 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "email" },
                    "Correo electr\xF3nico"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      classNameAd: "hide",
                      ref: this.refes.email,
                      id: "email",
                      name: "email",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "40",
                      pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.email.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      upperCase: true
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "form-row mt-2  form-height " },
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-ddben-beneficiary", htmlFor: "telephone" },
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
                      maxLength: "12",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.telephone.value,
                      className: "input-background-color form-control input-size text-center",
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
                  { className: "form-group col-4 text-center" },
                  React.createElement("i", {
                    "class": "fas fa-info-circle pl-1",
                    onClick: function onClick() {
                      return _this2._handleOpenModalPEP('Indicar el orden de prioridad para indemnización del capital asegurado para cada beneficiario. (define la prioridad de cobro, se puede designar a uno o mas personas en el mismo orden).');
                    }
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
                      onResult: this._handleResults,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center" },
                  React.createElement("i", {
                    "class": "fas fa-info-circle pl-1",
                    onClick: function onClick() {
                      return _this2._handleOpenModalPEP('Indicar el % para indemnización del capital asegurado para cada beneficiario. (la suma de los % asignados a cada benficiario de un mismo orden, debe ser 100%).');
                    }
                  }),
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
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "3",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.perc.value,
                      className: "input-background-color form-control input-size text-center",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        } else {
                          if (parseInt(e.target.value + e.key) < 1 || parseInt(e.target.value + e.key) > 100) {
                            e.preventDefault();
                          }
                        }
                      },
                      upperCase: true
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "mt-4" },
                React.createElement(
                  "p",
                  { className: "pNewIndividualBeneficiary" },
                  "Se\xF1or asegurado: designar tus beneficiarios en la cobertura que estas contratando es un derecho que vos pose\xE9s. La no designaci\xF3n de beneficiarios,o su designaci\xF3n err\xF3nea puede implicar demoras en el tr\xE1mite de cobro del beneficio. As\xED mismo, ten\xE9s derecho a efectuar o modificar tu designaci\xF3n en cualquier momento, por escrito sin ninguna otra formalidad."
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
        this.setState({ loaded: true });
      }
    }]);

    return FormIndividualBeneficiary;
  }(React.Component);

  return FormIndividualBeneficiary;
});