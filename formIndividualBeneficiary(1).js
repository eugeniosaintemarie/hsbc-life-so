var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "../../../common/inputvalidation", "../../../common/dropdownContent", "../../../controller/endososController", "../../../controller/beneficiariosController", "../../../common/loader", "../../../common/datepicker", "../../../common/modalReactBootstrap"], function (React, Utils, InputValidation, DropDownContent, EndososController, BeneficiariosController, Loader, DatePicker, ModalReactBootstrap) {
  var FormIndividualBeneficiary = function (_React$Component) {
    _inherits(FormIndividualBeneficiary, _React$Component);

    function FormIndividualBeneficiary(props) {
      _classCallCheck(this, FormIndividualBeneficiary);

      var _this = _possibleConstructorReturn(this, (FormIndividualBeneficiary.__proto__ || Object.getPrototypeOf(FormIndividualBeneficiary)).call(this, props));

      _this._handleOpenModalPEP = function () {
        _this.setState({
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

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
        result.refe = _this.refes[id];
        _this.forms[id] = result;
        _this.props.onResult(_this.props.id, _this.forms);
      };

      _this._loadLocality = function () {
        if (_this.state.location.id == "" || _this.state.location.id == "location") {
          return true;
        } else {
          if (_this.state.listLocalidad.length > 0) {
            return true;
          }
        }
        return false;
      };

      _this._handleBirthDayResults = function (id, result) {
        data = { value: result };
        _this._handleResults(id, data);
      };

      _this._handleProvinciaResult = function (id, result) {
        _this._handleResults(id, result);
        if (result.id) {
          if (_this.locationLoad == false) {
            _this.endososController.getLocalidadForm(result.id, function (list) {
              _this.setState({
                listLocalidad: list
              });
            });
            _this.locationLoad = true;
          } else {
            _this.setState({
              listLocalidad: [],
              location: { id: "default", value: "" }
            });
            _this.endososController.getLocalidadForm(result.id, function (list) {
              _this.setState({
                listLocalidad: list
              });
              _this._handleResults("zipCode", { value: "", isValidate: false });
            });
          }
        }
      };

      _this._handleLocalidadResults = function (id, result) {
        _this._handleResults(id, result);
        var aux = result.id.split("-");
        if (aux[1]) {
          _this._handleResults("zipCode", {
            value: result.id.split("-")[0],
            isValidate: true
          });
        }
      };

      _this._hanldleSetAddress = function () {
        var _this$props$applicant = _this.props.applicantData,
            applicantStreet = _this$props$applicant.applicantStreet,
            applicantStreetNumber = _this$props$applicant.applicantStreetNumber,
            applicantFloor = _this$props$applicant.applicantFloor,
            applicantDepto = _this$props$applicant.applicantDepto,
            applicantProvince = _this$props$applicant.applicantProvince,
            applicantLocality = _this$props$applicant.applicantLocality,
            applicantZipCode = _this$props$applicant.applicantZipCode;

        _this.setState({ loaded: false });
        setTimeout(function () {
          _this._handleResults("street", { value: applicantStreet.value });
          _this._handleResults("numberStreet", {
            value: applicantStreetNumber.value
          });
          _this._handleResults("numberFloor", { value: applicantFloor.value });
          _this._handleResults("numberDepart", { value: applicantDepto.value });
          _this._handleResults("state", {
            id: applicantProvince.id,
            value: applicantProvince.value
          });
          _this._handleResults("location", {
            id: applicantLocality.id,
            value: applicantLocality.value
          });
          _this._handleResults("zipCode", { value: applicantZipCode.value });
          _this.setState({ loaded: true });
        }, 1);
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
          _NOMINAS$RELBEDEP = NOMINAS.RELBEDEP,
          RELBEDEP = _NOMINAS$RELBEDEP === undefined ? "" : _NOMINAS$RELBEDEP,
          _NOMINAS$FNACIMIE = NOMINAS.FNACIMIE,
          FNACIMIE = _NOMINAS$FNACIMIE === undefined ? "" : _NOMINAS$FNACIMIE,
          _NOMINAS$BENNOMBRE = NOMINAS.BENNOMBRE,
          BENNOMBRE = _NOMINAS$BENNOMBRE === undefined ? "" : _NOMINAS$BENNOMBRE,
          _NOMINAS$BENNACIONAL = NOMINAS.BENNACIONAL,
          BENNACIONAL = _NOMINAS$BENNACIONAL === undefined ? "" : _NOMINAS$BENNACIONAL,
          _NOMINAS$BENCALLE = NOMINAS.BENCALLE,
          BENCALLE = _NOMINAS$BENCALLE === undefined ? "" : _NOMINAS$BENCALLE,
          _NOMINAS$BENNUMERO = NOMINAS.BENNUMERO,
          BENNUMERO = _NOMINAS$BENNUMERO === undefined ? "" : _NOMINAS$BENNUMERO,
          _NOMINAS$BENPISO = NOMINAS.BENPISO,
          BENPISO = _NOMINAS$BENPISO === undefined ? "" : _NOMINAS$BENPISO,
          _NOMINAS$BENDEPTO = NOMINAS.BENDEPTO,
          BENDEPTO = _NOMINAS$BENDEPTO === undefined ? "" : _NOMINAS$BENDEPTO,
          _NOMINAS$BENCPOSTAL = NOMINAS.BENCPOSTAL,
          BENCPOSTAL = _NOMINAS$BENCPOSTAL === undefined ? "" : _NOMINAS$BENCPOSTAL,
          _NOMINAS$BENPROVINCIA = NOMINAS.BENPROVINCIA,
          BENPROVINCIA = _NOMINAS$BENPROVINCIA === undefined ? "" : _NOMINAS$BENPROVINCIA,
          _NOMINAS$BENLOCALIDAD = NOMINAS.BENLOCALIDAD,
          BENLOCALIDAD = _NOMINAS$BENLOCALIDAD === undefined ? "" : _NOMINAS$BENLOCALIDAD,
          _NOMINAS$BENPAISTELEF = NOMINAS.BENPAISTELEF,
          BENPAISTELEF = _NOMINAS$BENPAISTELEF === undefined ? "" : _NOMINAS$BENPAISTELEF,
          _NOMINAS$BENCARTELEF = NOMINAS.BENCARTELEF,
          BENCARTELEF = _NOMINAS$BENCARTELEF === undefined ? "" : _NOMINAS$BENCARTELEF,
          _NOMINAS$BENNUMTELEF = NOMINAS.BENNUMTELEF,
          BENNUMTELEF = _NOMINAS$BENNUMTELEF === undefined ? "" : _NOMINAS$BENNUMTELEF,
          _NOMINAS$BENEMAIL = NOMINAS.BENEMAIL,
          BENEMAIL = _NOMINAS$BENEMAIL === undefined ? "" : _NOMINAS$BENEMAIL,
          _NOMINAS$BENESPEP = NOMINAS.BENESPEP,
          BENESPEP = _NOMINAS$BENESPEP === undefined ? "" : _NOMINAS$BENESPEP,
          _NOMINAS$BENSEXO = NOMINAS.BENSEXO,
          BENSEXO = _NOMINAS$BENSEXO === undefined ? "" : _NOMINAS$BENSEXO;


      _this.state = {
        loaded: false,
        listTipoDoc: {},
        listParentestco: {},
        listPaises: {},
        listProvincia: {},
        listLocalidad: {},
        modal: {
          title: "",
          component: null,
          size: "lg",
          html: false
        },
        listPrefTelPaises: {},
        birthday: { value: FNACIMIE },
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
        depFinancial: { id: RELBEDEP, value: "" }
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

    _createClass(FormIndividualBeneficiary, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            id = _props.id,
            _props$onlyView = _props.onlyView,
            onlyView = _props$onlyView === undefined ? false : _props$onlyView;

        if (this.state.loaded) {
          return React.createElement(
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
              { className: "form-row form-height" },
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
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
                    value: this.state.birthday.value,
                    formatValue: true,
                    formatType: "YYYY/MM/DD",
                    maxDate: today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
                    minDate: "01/01/1920",
                    onResult: this._handleBirthDayResults
                  })
                )
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
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
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
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
                    idObject: "PREFIJO",
                    nameObject: "SHOWDESC",
                    typeValue: "id",
                    defaultValue: this.state.codeCoutry.id,
                    onResult: this._handleResults
                  })
                )
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
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
                    defaultValue: this.state.nationality.id,
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
                  { className: "font-size-sm", htmlFor: "pep" },
                  "\xBFEs PEP?"
                ),
                React.createElement("i", {
                  "class": "fas fa-info-circle pl-1",
                  onClick: this._handleOpenModalPEP
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
                    list: [{ id: "1", name: "1" }, { id: "2", name: "2" }, { id: "3", name: "3" }, { id: "4", name: "4" }, { id: "5", name: "5" }],
                    id: "order",
                    name: "order",
                    disabled: onlyView,
                    minLength: "0",
                    maxLength: "2",
                    requiredStr: "",
                    typeValue: "id",
                    charactersStr: "",
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
            ),
            React.createElement(
              "div",
              { className: "form-row mt-0  form-height" },
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
                    maxLength: "32",
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
                    maxLength: "6",
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
                    maxLength: "2",
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
                    maxLength: "2",
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
              { className: "form-row align-items-center my-2 pl-1" },
              React.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-danger p-1",
                  onClick: this._hanldleSetAddress
                },
                "Misma direcci\xF3n que el asegurado"
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
            listPaises: ws.listPaises,
            listProvincia: ws.listProvincia,
            listPrefTelPaises: ws.listPrefTelPaises,
            loaded: true
          });
        });
      }
    }]);

    return FormIndividualBeneficiary;
  }(React.Component);

  return FormIndividualBeneficiary;
});