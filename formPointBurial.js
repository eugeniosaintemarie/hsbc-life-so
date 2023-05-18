var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../common/inputvalidation", "../../../common/numTelefono", "../../../common/dropdownContent", "../../../controller/endososController", "../../../controller/retiroNominaController", "../../../common/datepicker", "../../../common/modalReactBootstrap"], function (React, InputValidation, NumTelefono, DropDownContent, EndososController, RetiroNominaController, DatePicker, ModalReactBootstrap) {
  var FormPointBurial = function (_React$Component) {
    _inherits(FormPointBurial, _React$Component);

    function FormPointBurial(props) {
      _classCallCheck(this, FormPointBurial);

      var _this = _possibleConstructorReturn(this, (FormPointBurial.__proto__ || Object.getPrototypeOf(FormPointBurial)).call(this, props));

      _this._handleClearList = function () {
        _this.setState({
          depoActivitiesList: []
        });
      };

      _this._handleResultsApplicantStatus = function (id, result) {
        _this.callRoleService = true;
        _this._handleResults(id, result);
      };

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      _this._handleModalIsOpen = function () {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handleLocalityResult = function (id, result) {
        _this._handleResults(id, result);
        var aux = result.id.split("-");
        if (aux[1]) {
          //Validacion para utilizar esta funcion en las tres direcciones de este formulario
          if (id == "applicantLocality") {
            _this._handleResults("applicantCP", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
        }
      };

      _this._handleProvinceResult = function (id, result) {
        _this._handleResults(id, result);
        //Validacion para que no llame el servicio al iniciar el componente
        if (result.id) {
          //Validacion para utilizar esta funcion en las cautro direcciones de este formulario 
          if (id == "applicantProvince") {
            if (result.id != 1) {
              _this.setState({ loadLocality: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {

                _this.setState({ localitiesList: list, loadLocality: false });
              });
              document.getElementById("applicantCP").setAttribute("disabled", "");
            } else {
              _this._handleResults("applicantLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.state.readOnly) {
                document.getElementById("applicantCP").removeAttribute("disabled");
              }
            }
          }
        }
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : _this.props.data,
          _ref$applicantTypeCCC = _ref.applicantTypeCCC,
          applicantTypeCCC = _ref$applicantTypeCCC === undefined ? "" : _ref$applicantTypeCCC,
          _ref$applicantCuilNum = _ref.applicantCuilNumber,
          applicantCuilNumber = _ref$applicantCuilNum === undefined ? "" : _ref$applicantCuilNum,
          _ref$applicantName = _ref.applicantName,
          applicantName = _ref$applicantName === undefined ? "" : _ref$applicantName,
          _ref$applicantSurname = _ref.applicantSurname,
          applicantSurname = _ref$applicantSurname === undefined ? "" : _ref$applicantSurname,
          _ref$applicantDateBir = _ref.applicantDateBirth,
          applicantDateBirth = _ref$applicantDateBir === undefined ? "" : _ref$applicantDateBir,
          _ref$applicantAreaTel = _ref.applicantAreaTel,
          applicantAreaTel = _ref$applicantAreaTel === undefined ? "" : _ref$applicantAreaTel,
          _ref$applicantTelepho = _ref.applicantTelephone,
          applicantTelephone = _ref$applicantTelepho === undefined ? "" : _ref$applicantTelepho,
          _ref$applicantEmail = _ref.applicantEmail,
          applicantEmail = _ref$applicantEmail === undefined ? "" : _ref$applicantEmail,
          _ref$applicantStreet = _ref.applicantStreet,
          applicantStreet = _ref$applicantStreet === undefined ? "" : _ref$applicantStreet,
          _ref$applicantNumber = _ref.applicantNumber,
          applicantNumber = _ref$applicantNumber === undefined ? "" : _ref$applicantNumber,
          _ref$applicantFloor = _ref.applicantFloor,
          applicantFloor = _ref$applicantFloor === undefined ? "" : _ref$applicantFloor,
          _ref$applicantDepartm = _ref.applicantDepartment,
          applicantDepartment = _ref$applicantDepartm === undefined ? "" : _ref$applicantDepartm,
          _ref$applicantCP = _ref.applicantCP,
          applicantCP = _ref$applicantCP === undefined ? "" : _ref$applicantCP,
          _ref$applicantProvinc = _ref.applicantProvince,
          applicantProvince = _ref$applicantProvinc === undefined ? "" : _ref$applicantProvinc,
          _ref$applicantLocalit = _ref.applicantLocality,
          applicantLocality = _ref$applicantLocalit === undefined ? "" : _ref$applicantLocalit,
          _ref$applicantIVA = _ref.applicantIVA,
          applicantIVA = _ref$applicantIVA === undefined ? "" : _ref$applicantIVA,
          _ref$applicantCityBor = _ref.applicantCityBorn,
          applicantCityBorn = _ref$applicantCityBor === undefined ? "" : _ref$applicantCityBor,
          _ref$applicantNationa = _ref.applicantNationality,
          applicantNationality = _ref$applicantNationa === undefined ? "" : _ref$applicantNationa,
          _ref$applicantGender = _ref.applicantGender,
          applicantGender = _ref$applicantGender === undefined ? "" : _ref$applicantGender,
          _ref$applicantCivilSt = _ref.applicantCivilStatus,
          applicantCivilStatus = _ref$applicantCivilSt === undefined ? "" : _ref$applicantCivilSt;

      _this.state = {
        applicantTypeCCC: {
          id: applicantTypeCCC,
          value: ""
        },
        applicantCuilNumber: {
          value: applicantCuilNumber,
          isValidate: false
        },
        applicantName: {
          value: applicantName,
          isValidate: false
        },
        applicantSurname: {
          value: applicantSurname,
          isValidate: false
        },
        applicantDateBirth: {
          value: applicantDateBirth,
          isValidate: false
        },
        applicantAreaTel: {
          value: applicantAreaTel,
          isValidate: false
        },
        applicantTelephone: {
          value: applicantTelephone,
          isValidate: false
        },
        applicantEmail: {
          value: applicantEmail,
          isValidate: false
        },
        applicantStreet: {
          value: applicantStreet,
          isValidate: false
        },
        applicantNumber: {
          value: applicantNumber,
          isValidate: false
        },
        applicantFloor: {
          value: applicantFloor,
          isValidate: false
        },
        applicantDepartment: {
          value: applicantDepartment,
          isValidate: false
        },
        applicantCP: {
          value: applicantCP,
          isValidate: false
        },

        applicantProvince: {
          id: applicantProvince,
          value: ""
        },

        applicantLocality: {
          id: "",
          value: applicantLocality
        },
        applicantIVA: {
          value: applicantIVA,
          isValidate: false
        },
        applicantCityBorn: { //esta especificado como ciudad en la historia sino cambiar por pais de nacimiento
          value: applicantCityBorn,
          isValidate: false
        },
        applicantNationality: {
          id: applicantNationality,
          value: "",
          isValidate: false
        },
        applicantGender: {
          id: applicantGender,
          value: "",
          isValidate: false
        },
        applicantCivilStatus: {
          id: applicantCivilStatus,
          value: "",
          isValidate: false
        },
        localitiesList: [],
        loadLocality: false,
        depoActivitiesList: [],
        modal: {
          component: null,
          contentHTML: "",
          html: true,
          title: "",
          size: "md",
          accept: null,
          disBtnAccept: true
        }
      };
      _this.endososController = new EndososController();
      _this.controller = new RetiroNominaController();
      _this.referencies = {
        applicantTypeCCC: React.createRef(),
        applicantCuilNumber: React.createRef(),
        applicantName: React.createRef(),
        applicantSurname: React.createRef(),
        applicantDateBirth: React.createRef(),
        applicantAreaTel: React.createRef(),
        applicantTelephone: React.createRef(),
        applicantEmail: React.createRef(),
        applicantStreet: React.createRef(),
        applicantNumber: React.createRef(),
        applicantFloor: React.createRef(),
        applicantDepartment: React.createRef(),
        applicantCP: React.createRef(),
        applicantProvince: React.createRef(),
        applicantLocality: React.createRef(),
        applicantIVA: React.createRef(),
        applicantCityBorn: React.createRef(),
        applicantNationality: React.createRef(),
        applicantGender: React.createRef(),
        applicantCivilStatus: React.createRef()

      };
      return _this;
    }

    _createClass(FormPointBurial, [{
      key: "render",
      value: function render() {
        var readOnly = this.props.readOnly;

        return React.createElement(
          "form",
          null,
          React.createElement(
            "div",
            { className: "form-row mt-2 form-height" },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantTypeCCC"
                },
                "CUIT/CUIL/CDI"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantTypeCCC,
                list: this.props.cuitList,
                className: "input-background-color form-control  input-size",
                id: "applicantTypeCCC",
                name: "applicantTypeCCC",
                typeValue: "id",
                defaultValue: this.state.applicantTypeCCC.id,
                onResult: this._handleResults,
                disabled: Object.keys(this.props.formInfo).length === 0 ? false : true

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCuilNumber"
                },
                "N\xFAmero de CUIL"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantCuilNumber,
                classNameAd: "hide",
                id: "applicantCuilNumber",
                name: "applicantCuilNumber",
                minLength: "8",
                maxLength: "11",
                value: this.state.applicantCuilNumber.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: Object.keys(this.props.formInfo).length === 0 ? false : true

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantName"
                },
                "Nombre"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantName,
                classNameAd: "hide",
                id: "applicantName",
                name: "applicantName",
                minLength: "2",
                maxLength: "40",
                pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                value: this.state.applicantName.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                formatText: "Nombre Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                upperCase: true,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantSurname"
                },
                "Apellido"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantSurname,
                classNameAd: "hide",
                id: "applicantSurname",
                name: "applicantSurname",
                minLength: "2",
                maxLength: "40",
                pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                value: this.state.applicantSurname.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                formatText: "Apellido Solicitante: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                upperCase: true,
                disabled: readOnly

              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2 form-height" },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                { className: "font-size-ddben-beneficiary", htmlFor: "applicantDateBirth" },
                "Fecha de Nac."
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DatePicker, {
                  ref: this.referencies.applicantDateBirth,
                  id: "applicantDateBirth",
                  name: "applicantDateBirth",
                  value: this.state.applicantDateBirth.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: Object.keys(this.props.formInfo).length === 0 ? false : true,

                  valueIsObject: true
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                { className: "font-size-ddben-beneficiary", htmlFor: "applicantEmail" },
                "Correo Electr\xF3nico"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantEmail,
                classNameAd: "hide",
                id: "applicantEmail",
                name: "applicantEmail",
                minLength: "2",
                maxLength: "40",
                pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                value: this.state.applicantEmail.value,
                className: "input-background-color form-control input-size",
                formatText: "Correo Electr\xF3nico Contratante: La informaci\xF3n ingresada no corresponde al formato de correo electr\xF3nico v\xE1lido.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: Object.keys(this.props.formInfo).length === 0 ? false : true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantIVA"
                },
                "Condicion IVA"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantIVA,
                classNameAd: "hide",
                id: "applicantIVA",
                name: "applicantIVA",
                minLength: "2",
                maxLength: "40",
                value: this.state.applicantIVA.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2 form-height" },
            React.createElement(
              "div",
              { className: "form-group col-5 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantStreet"
                },
                "Calle"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantStreet,
                classNameAd: "hide",
                id: "applicantStreet",
                name: "applicantStreet",
                minLength: "2",
                maxLength: "20",
                value: this.state.applicantStreet.value,
                className: "input-background-color form-control input-size",
                formatText: "Calle Solicitante: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantNumber"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantNumber,
                classNameAd: "hide",
                id: "applicantNumber",
                name: "applicantNumber",
                minLength: "2",
                maxLength: "6",
                value: this.state.applicantNumber.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Calle Solicitante: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantFloor"
                },
                "Piso"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantFloor,
                classNameAd: "hide",
                id: "applicantFloor",
                name: "applicantFloor",
                minLength: "0",
                maxLength: "3",
                value: this.state.applicantFloor.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                upperCase: true,
                notNecessary: true,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantDepartment"
                },
                "Depto"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantDepartment,
                classNameAd: "hide",
                id: "applicantDepartment",
                name: "applicantDepartment",
                minLength: "0",
                maxLength: "3",
                value: this.state.applicantDepartment.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                upperCase: true,
                notNecessary: true,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mb-3 form-height " },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantProvince"
                },
                "Provincia"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantProvince,
                list: this.props.provincesList,
                className: "input-background-color form-control input-size",
                id: "applicantProvince",
                name: "applicantProvince",
                idObject: "COD_PRV",
                nameObject: "DES_PRV",
                typeValue: "id",
                defaultValue: this.state.applicantProvince.id,
                onResult: this._handleProvinceResult,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantLocality"
                },
                "Localidad"
              ),
              this.state.loadLocality ? React.createElement(
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
              ) : React.createElement(DropDownContent, {
                ref: this.referencies.applicantLocality,
                list: this.state.localitiesList,
                className: "input-background-color form-control input-size",
                id: "applicantLocality",
                name: "applicantLocality",
                idObject: "CODPOS",
                nameObject: "CALLE",
                noAvilable: this.state.applicantProvince.id == "1",
                typeValue: "value",
                defaultValue: this.state.applicantLocality.value,
                onResult: this._handleLocalityResult,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCP"
                },
                "C. P."
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantCP,
                classNameAd: "hide",
                id: "applicantCP",
                name: "applicantCP",
                minLength: "2",
                maxLength: "6",
                value: this.state.applicantCP.value,
                className: "input-background-color form-control input-size",
                formatText: "C\xF3digo Postal Correspondencia: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
                //  
              })
            ),
            React.createElement(NumTelefono, {
              idProps: "applicant",
              label: "Tel\xE9fono (Area-N\xFAmero)",
              refArea: this.referencies.applicantAreaTel,
              refTelefono: this.referencies.applicantTelephone,
              valueArea: this.state.applicantAreaTel.value,
              valueTel: this.state.applicantTelephone.value,
              onResult: this._handleResults,
              readOnly: readOnly,
              size: "4"
            })
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2 form-height" },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantNationality"
                },
                "Nacionalidad"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantNationality,
                list: this.props.countriesList,
                className: "input-background-color form-control  input-size",
                id: "applicantNationality",
                name: "applicantNationality",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.applicantNationality.id,
                onResult: this._handleResults,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantGender"
                },
                "Sexo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantGender,
                list: this.props.sexoList,
                className: "input-background-color form-control  input-size",
                id: "applicantGender",
                name: "applicantGender",
                typeValue: "id",
                defaultValue: this.state.applicantGender.id,
                onResult: this._handleResults,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCivilStatus"
                },
                "Estado Civil"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantCivilStatus,
                list: this.props.civilStatusList,
                className: "input-background-color form-control  input-size",
                id: "applicantCivilStatus",
                name: "applicantCivilStatus",
                typeValue: "id",
                defaultValue: this.state.applicantCivilStatus.id,
                onResult: this._handleResults,
                disabled: readOnly

              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                { className: "font-size-ddben-beneficiary", htmlFor: "applicantCityBorn" },
                "Lugar de Nacimiento"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantCityBorn,
                classNameAd: "hide",
                id: "applicantCityBorn",
                name: "applicantCityBorn",
                minLength: "2",
                maxLength: "40",
                pattern: "(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                value: this.state.applicantCityBorn.value,
                className: "input-background-color form-control input-size",
                formatText: "Lugar de Nacimiento la Informaci\xF3n ingresada no corresponde a un formato valido.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly

              })
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModal,
            size: this.state.modal.size,
            isOpen: this._handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            disBtnAccept: this.state.modal.disBtnAccept
          })
        );
      }
    }]);

    return FormPointBurial;
  }(React.Component);

  return FormPointBurial;
});