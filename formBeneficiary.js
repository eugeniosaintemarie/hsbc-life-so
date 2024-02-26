var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "../../../common/inputvalidation", "../../../common/datepicker", "../../../common/dropdownContent", "../../../controller/endososController", "../../../common/loader", "../../../common/modalReactBootstrap"], function (React, Utils, InputValidation, DatePicker, DropDownContent, EndososController, Loader, ModalReactBootstrap) {
  var FormBeneficiary = function (_React$Component) {
    _inherits(FormBeneficiary, _React$Component);

    function FormBeneficiary(props) {
      _classCallCheck(this, FormBeneficiary);

      var _this = _possibleConstructorReturn(this, (FormBeneficiary.__proto__ || Object.getPrototypeOf(FormBeneficiary)).call(this, props));

      _initialiseProps.call(_this);

      var _this$props$data = _this.props.data,
          data = _this$props$data === undefined ? {} : _this$props$data;
      var _data$APEBENE = data.APEBENE,
          APEBENE = _data$APEBENE === undefined ? "" : _data$APEBENE,
          _data$TIPDOCBENE = data.TIPDOCBENE,
          TIPDOCBENE = _data$TIPDOCBENE === undefined ? "" : _data$TIPDOCBENE,
          _data$NUMDOCBENE = data.NUMDOCBENE,
          NUMDOCBENE = _data$NUMDOCBENE === undefined ? "" : _data$NUMDOCBENE,
          _data$BENEPORC = data.BENEPORC,
          BENEPORC = _data$BENEPORC === undefined ? "" : _data$BENEPORC,
          _data$BENEFORD = data.BENEFORD,
          BENEFORD = _data$BENEFORD === undefined ? "" : _data$BENEFORD,
          _data$RELBECOD = data.RELBECOD,
          RELBECOD = _data$RELBECOD === undefined ? "" : _data$RELBECOD,
          _data$RELBEDEP = data.RELBEDEP,
          RELBEDEP = _data$RELBEDEP === undefined ? "" : _data$RELBEDEP,
          _data$FNACIMIE = data.FNACIMIE,
          FNACIMIE = _data$FNACIMIE === undefined ? "" : _data$FNACIMIE,
          _data$BENNOMBRE = data.BENNOMBRE,
          BENNOMBRE = _data$BENNOMBRE === undefined ? "" : _data$BENNOMBRE,
          _data$BENNACIONAL = data.BENNACIONAL,
          BENNACIONAL = _data$BENNACIONAL === undefined ? "" : _data$BENNACIONAL,
          _data$BENCALLE = data.BENCALLE,
          BENCALLE = _data$BENCALLE === undefined ? "" : _data$BENCALLE,
          _data$BENNUMERO = data.BENNUMERO,
          BENNUMERO = _data$BENNUMERO === undefined ? "" : _data$BENNUMERO,
          _data$BENPISO = data.BENPISO,
          BENPISO = _data$BENPISO === undefined ? "" : _data$BENPISO,
          _data$BENDEPTO = data.BENDEPTO,
          BENDEPTO = _data$BENDEPTO === undefined ? "" : _data$BENDEPTO,
          _data$BENCPOSTAL = data.BENCPOSTAL,
          BENCPOSTAL = _data$BENCPOSTAL === undefined ? "" : _data$BENCPOSTAL,
          _data$BENPROVINCIA = data.BENPROVINCIA,
          BENPROVINCIA = _data$BENPROVINCIA === undefined ? "" : _data$BENPROVINCIA,
          _data$BENLOCALIDAD = data.BENLOCALIDAD,
          BENLOCALIDAD = _data$BENLOCALIDAD === undefined ? "" : _data$BENLOCALIDAD,
          _data$BENPAISTELEF = data.BENPAISTELEF,
          BENPAISTELEF = _data$BENPAISTELEF === undefined ? "" : _data$BENPAISTELEF,
          _data$BENPREFINTTELEF = data.BENPREFINTTELEF,
          BENPREFINTTELEF = _data$BENPREFINTTELEF === undefined ? "" : _data$BENPREFINTTELEF,
          _data$BENCARTELEF = data.BENCARTELEF,
          BENCARTELEF = _data$BENCARTELEF === undefined ? "" : _data$BENCARTELEF,
          _data$BENNUMTELEF = data.BENNUMTELEF,
          BENNUMTELEF = _data$BENNUMTELEF === undefined ? "" : _data$BENNUMTELEF,
          _data$BENEMAIL = data.BENEMAIL,
          BENEMAIL = _data$BENEMAIL === undefined ? "" : _data$BENEMAIL,
          _data$BENESPEP = data.BENESPEP,
          BENESPEP = _data$BENESPEP === undefined ? "" : _data$BENESPEP,
          _data$BENSEXO = data.BENSEXO,
          BENSEXO = _data$BENSEXO === undefined ? "" : _data$BENSEXO;

      _this.state = {
        loaded: false,

        listTipoDoc: {},
        listParentestco: [],
        listPaises: {},
        listProvincia: {},
        listLocalidad: {},
        listPrefTelPaises: {},

        birthday: { value: FNACIMIE, isvalidate: false },

        areaCode: { value: BENCARTELEF, isValidate: false },
        dniNumber: { value: NUMDOCBENE, isValidate: false },
        email: { value: BENEMAIL, isValidate: false },
        name: { value: BENNOMBRE, isValidate: false },
        numberDepart: { value: BENDEPTO, isValidate: false },
        numberFloor: { value: BENPISO, isValidate: false },
        numberStreet: { value: BENNUMERO, isValidate: false },
        order: { id: BENEFORD, value: "" },
        perc: { value: BENEPORC, isValidate: false },
        street: { value: BENCALLE, isValidate: false },
        surname: { value: APEBENE, isValidate: false },
        telephone: { value: BENNUMTELEF, isValidate: false },
        zipCode: { value: BENCPOSTAL, isValidate: false },

        pep: { id: BENESPEP, value: "S" },
        relationShip: { id: RELBECOD, value: "" },
        state: { id: BENPROVINCIA, value: "" },

        nationality: { id: BENNACIONAL, value: "" },
        location: { id: "", value: BENLOCALIDAD },
        codeCoutry: { id: BENPAISTELEF, value: "" },
        typeDoc: { id: TIPDOCBENE, value: "" },
        sex: { id: BENSEXO, value: "" },
        depFinancial: { id: RELBEDEP, value: "" },

        modal: {
          title: "",
          component: null,
          size: "lg",
          html: false
        }
      };

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
        street: React.createRef(),
        numberStreet: React.createRef(),
        numberFloor: React.createRef(),
        numberDepart: React.createRef(),
        zipCode: React.createRef(),
        areaCode: React.createRef(),
        telephone: React.createRef(),
        email: React.createRef(),

        //DropDown
        relationShip: React.createRef(),
        depFinancial: React.createRef(),
        sex: React.createRef(),
        typeDoc: React.createRef(),
        nationality: React.createRef(),
        state: React.createRef(),
        location: React.createRef(),
        codeCoutry: React.createRef(),
        pep: React.createRef()

      }, "birthday" + _this.props.id, React.createRef());

      _this.locationLoad = false;
      return _this;
    }

    _createClass(FormBeneficiary, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            id = _props.id,
            _props$onlyView = _props.onlyView,
            onlyView = _props$onlyView === undefined ? false : _props$onlyView;


        if (this.state.loaded == true) {
          return React.createElement(
            "div",
            null,
            React.createElement(
              "form",
              null,
              React.createElement(
                "div",
                { className: "form-row form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "surname" },
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
                    { className: "font-size-sm", htmlFor: "name" },
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
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "birthday" + id },
                    "Fecha de Nacimiento"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DatePicker, {
                      ref: this.refes["birthday" + id],
                      className: "input-background-color input-size form-control",
                      name: "birthday" + id,
                      id: "birthday" + id,
                      disabled: onlyView,
                      size: "small",
                      value: this.state.birthday.value,
                      formatValue: true,
                      formatType: "YYYY/MM/DD",
                      maxDate: today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                      minDate: minimo = new Date(1920, 0, 1),
                      onResult: this._handleBirthDayResults,
                      valueIsObject: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "relationShip" },
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
                )
              ),
              React.createElement(
                "div",
                { className: "form-row mt-0  form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "depFinancial" },
                    "Dep. Financiera"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.depFinancial,
                      list: [{ id: "N", name: "NO" }, { id: "S", name: "SI" }],
                      className: "input-background-color form-control  input-size",
                      id: "depFinancial",
                      name: "depFinancial",
                      disabled: onlyView,
                      typeValue: "id",
                      defaultValue: this.state.depFinancial.id,
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
                    { className: "font-size-sm", htmlFor: "sex" },
                    "Sexo"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.sex,
                      list: [{ id: "M", name: "Masculino" }, { id: "F", name: "Femenino" }],
                      className: "input-background-color form-control  input-size",
                      id: "sex",
                      name: "sex",
                      disabled: onlyView,
                      typeValue: "id",
                      defaultValue: this.state.sex.id,
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
                    { className: "font-size-sm", htmlFor: "typeDoc" },
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
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "dniNumber" },
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
                      className: "input-background-color form-control input-size",
                      onResult: this._handleDocumentosResult,
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
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "nationality" },
                    "Nacionalidad"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.nationality,
                      list: this.state.listPaises,
                      className: "input-background-color form-control  input-size",
                      id: "nationality",
                      name: "nationality",
                      disabled: onlyView,
                      idObject: "CODIGO",
                      nameObject: "DESCRIPCION",
                      typeValue: "id",
                      defaultValue: String("0" + this.state.nationality.id).slice(-2),
                      defaultName: true,
                      onResult: this._handleResults
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "form-row  form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "street" },
                    "Calle"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.street,
                      id: "street",
                      name: "street",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "40",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.street.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-1 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "numberStreet" },
                    "Nro"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.numberStreet,
                      id: "numberStreet",
                      name: "numberStreet",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "5",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.numberStreet.value,
                      className: "input-background-color form-control input-size  text-center",
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
                  { className: "form-group col-1 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "numberFloor" },
                    "Piso"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.numberFloor,
                      id: "numberFloor",
                      name: "numberFloor",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "4",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.numberFloor.value,
                      className: "input-background-color form-control input-size  text-center",
                      onResult: this._handleResults,
                      showErrorValidation: false,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-1 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "numberDepart" },
                    "Dpto"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.numberDepart,
                      id: "numberDepart",
                      name: "numberDepart",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "4",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.numberDepart.value,
                      className: "input-background-color form-control input-size text-center",
                      onResult: this._handleResults,
                      showErrorValidation: false,
                      upperCase: true
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "state" },
                    "Provincia"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.state,
                      list: this.state.listProvincia,
                      className: "input-background-color form-control input-size",
                      id: "state",
                      name: "state",
                      disabled: onlyView,
                      idObject: "COD_PRV",
                      nameObject: "DES_PRV",
                      typeValue: "id",
                      defaultValue: this.state.state.id,
                      onResult: this._handleProvinciaResult
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "location" },
                    "Localidad"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    this._loadLocality() ? React.createElement(DropDownContent, {
                      ref: this.refes.location,
                      list: this.state.listLocalidad,
                      disabled: onlyView == false ? Utils.isEmpty(this.state.listLocalidad) : true,
                      noAvilable: this.state.state.value == "CAPITAL FEDERAL",
                      className: "input-background-color form-control  input-size",
                      id: "location",
                      name: "location",
                      idObject: "CODPOS",
                      nameObject: "CALLE",
                      typeValue: "value",
                      defaultValue: this.state.location.value,
                      defaultName: true,
                      onResult: this._handleLocalidadResults
                    }) : React.createElement(
                      "select",
                      {
                        disabled: true,
                        defaultValue: "default",
                        className: "input-background-color form-control  input-size"
                      },
                      React.createElement(
                        "option",
                        { disabled: true, value: "default" },
                        "Cargando..."
                      )
                    )
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-1 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "zipCode" },
                    "C. P."
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.zipCode,
                      id: "zipCode",
                      name: "zipCode",
                      minLength: "0",
                      maxLength: "8",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.zipCode.value,
                      disabled: onlyView == false ? this.state.state.value.toUpperCase() != "CAPITAL FEDERAL" : true,
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
                )
              ),
              React.createElement(
                "div",
                { className: "form-row" },
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "codeCoutry" },
                    "Prefijo"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.codeCoutry,
                      list: this.state.listPrefTelPaises,
                      className: "input-background-color form-control  input-size",
                      id: "codeCoutry",
                      name: "codeCoutry",
                      disabled: onlyView,
                      idObject: "CODIGO",
                      nameObject: "SHOWDESC",
                      typeValue: "id",
                      defaultValue: this.state.codeCoutry.id,
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-1 text-center" },
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "areaCode" },
                    "C\xF3digo de \xE1rea"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(InputValidation, {
                      ref: this.refes.areaCode,
                      id: "areaCode",
                      name: "areaCode",
                      disabled: onlyView,
                      minLength: "0",
                      maxLength: "5",
                      requiredStr: "",
                      charactersStr: "",
                      value: this.state.areaCode.value,
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
                      onResult: this._handleMailResult,
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
                    { className: "font-size-sm", htmlFor: "pep" },
                    "\xBFEs PEP?"
                  ),
                  React.createElement(ModalReactBootstrap, {
                    title: this.state.modal.title,
                    show: this.state.showModalSuccess,
                    size: this.state.modal.size,
                    isOpen: this._handleModalIsOpen,
                    component: this.state.modal.component,
                    html: this.state.modal.html,
                    contentHTML: this.state.modal.contentHTML
                  }),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.pep,
                      list: [{ id: "N", name: "NO" }, { id: "S", name: "SI" }],
                      className: "input-background-color form-control  input-size",
                      id: "pep",
                      name: "pep",
                      disabled: onlyView,
                      typeValue: "id",
                      defaultValue: this.state.pep.id,
                      onResult: this._handleResults
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-1 text-center" },
                  React.createElement("i", {
                    "class": "fas fa-info-circle pl-1",
                    onClick: function onClick() {
                      return _this2._handleOpenModalOrder('Indicar el orden de prioridad para indemnización del capital asegurado para cada beneficiario. (define la prioridad de cobro, se puede designar a uno o mas personas en el mismo orden).');
                    }
                  }),
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "order" },
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
                  { className: "form-group col-1 text-center" },
                  React.createElement("i", {
                    "class": "fas fa-info-circle pl-1",
                    onClick: function onClick() {
                      return _this2._handleOpenModalOrder('Indicar el % para indemnización del capital asegurado para cada beneficiario. (la suma de los % asignados a cada benficiario de un mismo orden, debe ser 100%).');
                    }
                  }),
                  React.createElement(
                    "label",
                    { className: "font-size-sm", htmlFor: "perc" },
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
                          if (parseInt(e.target.value + e.key) > 100) {
                            e.preventDefault();
                          }
                        }
                      },
                      upperCase: true
                    })
                  )
                )
              )
            ),
            React.createElement(
              "p",
              { className: "m-3 font-italic" },
              "Si queres designar como beneficiario a un familiar no directo, amigo, o alguien cuyo vinculo no este dentro del campo \"Relacion/Parentesco\" por favor comunicate con el centro de atencion al cliente 0800-333-0003 para hacer dicha accion"
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
        var _this3 = this;

        var listParentestco = [];
        this.endososController.getWsFormBeneficiary(function (ws) {
          ws.listParentestco.map(function (item) {
            switch (item.CODIGO) {
              case "AB":
              case "AL":
              case "C":
              case "CO":
              case "CA":
              case "CV":
              case "EO":
              case "EA":
              case "HO":
              case "HA":
              case "P":
              case "M":
              case "NO":
              case "NA":
                listParentestco.push(item);
            }
          }), _this3.setState({
            listTipoDoc: ws.listTipoDoc,
            listPaises: ws.listPaises,
            listProvincia: ws.listProvincia,
            listPrefTelPaises: ws.listPrefTelPaises,
            listParentestco: listParentestco,
            loaded: true
          });
        });
      }
    }]);

    return FormBeneficiary;
  }(React.Component);

  var _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this._handleResults = function (id, result) {
      _this4.setState(_defineProperty({}, id, result));
      result.refe = _this4.refes[id];
      _this4.forms[id] = result;
      _this4.props.onResult(_this4.props.id, _this4.forms);
    };

    this._handleDocumentosResult = function (id, result) {
      var data;
      if (_this4.state.typeDoc.id == "4" || _this4.state.typeDoc.id == "5") {
        data = { value: result.value, isValidate: result.value.length == 11 };
      } else {
        data = { value: result.value, isValidate: result.value.length > 1 && result.value.length <= 11 };
      }
      _this4._handleResults(id, data);
    };

    this._handleMailResult = function (id, result) {
      var regex = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
      var data = { value: result.value, isValidate: regex.test(result.value) };

      _this4._handleResults(id, data);
    };

    this._handleBirthDayResults = function (id, result) {
      var hoy = new Date();
      var minimo = new Date(hoy.getFullYear() - 120, 1, 1);
      var maximo = new Date();
      var fechaIngresada = new Date(parseInt(String(result.value).substring(6, 10)), parseInt(String(result.value).substring(3, 5)), parseInt(String(result.value).substring(0, 2)));

      data = { value: result.value, isValidate: fechaIngresada > minimo && fechaIngresada < maximo };
      _this4._handleResults(id, data);
    };

    this._handleModalIsOpen = function (e) {
      var current = _this4.state.showModalSuccess;
      _this4.setState({
        showModalSuccess: !current
      });
    };

    this._handleOpenModalOrder = function (text) {
      _this4.setState({
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

    this._handleProvinciaResult = function (id, result) {
      _this4._handleResults(id, result);
      if (result.id) {
        if (_this4.locationLoad == false) {
          _this4.endososController.getLocalidadForm(result.id, function (list) {
            _this4.setState({
              listLocalidad: list
            });
          });
          _this4.locationLoad = true;
        } else {
          _this4.setState({
            listLocalidad: [],
            location: { id: "default", value: "" }
          });
          _this4.endososController.getLocalidadForm(result.id, function (list) {
            _this4.setState({
              listLocalidad: list
            });
            _this4._handleResults("zipCode", { value: "", isValidate: false });
          });
        }
        if (result.id == "1") {
          _this4._handleResults("location", { value: "CAPITAL FEDERAL", isValidate: true });
        }
      }
    };

    this._handleLocalidadResults = function (id, result) {
      _this4._handleResults(id, result);
      var aux = result.id.split("-");
      if (aux[1]) {
        _this4._handleResults("zipCode", {
          value: result.id.split("-")[0],
          isValidate: true
        });
      }
    };

    this._handleOpenModalPEP = function () {
      _this4.setState({
        showModalSuccess: true,
        modal: {
          component: null,
          contentHTML: '<div style="margin: 0px -5px">La Nómina de Personas Expuestas Políticamente se encuentra informada en Resolución UIF 134/2018 y sus respectivas modificatorias. Por favor ingrese al link&nbsp; <a className="link-info-modal" href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/315000-319999/316668/texact.htm" target="_blank">PEPS 134/2018</a>&nbsp; <a className="link-info-modal" href="http://servicios.infoleg.gob.ar/infolegInternet/anexos/320000-324999/320218/norma.htm" target="_blank">Modificatoria</a></div>',
          html: true,
          title: "Información",
          size: "lg"
        }
      });
    };

    this._loadLocality = function () {
      if (_this4.state.location.id == "" || _this4.state.location.id == "location") {
        return true;
      } else {
        if (_this4.state.listLocalidad.length > 0) {
          return true;
        }
      }
      return false;
    };
  };

  return FormBeneficiary;
});