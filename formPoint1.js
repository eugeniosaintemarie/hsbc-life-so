var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/inputvalidation", "../../common/dropdownContent", "../../common/datepicker", "../../controller/endososController"], function (React, InputValidation, DropDownContent, DatePicker, EndososController) {
  var FormPoint1 = function (_React$Component) {
    _inherits(FormPoint1, _React$Component);

    function FormPoint1(props) {
      _classCallCheck(this, FormPoint1);

      var _this = _possibleConstructorReturn(this, (FormPoint1.__proto__ || Object.getPrototypeOf(FormPoint1)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      _this._handleProvinceResult = function (id, result) {
        _this._handleResults(id, result);
        //Validacion para que no llame el servicio al iniciar el componente
        if (result.id) {
          //Validacion para utilizar esta funcion en las dos direcciones de este formulario
          if (id == "contractorProvince") {
            if (result.id != 1) {
              _this.setState({ loadLocality: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality: false });
              });
              document.getElementById("contractorZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("contractorLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("contractorZipCode").removeAttribute("disabled");
              }
            }
          } else {
            if (result.id != 1) {
              _this.setState({ loadLocality2: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality2: false });
              });
              document.getElementById("legalRepreZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("legalRepreLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("legalRepreZipCode").removeAttribute("disabled");
              }
            }
          }
        }
      };

      _this._handleLocalityResult = function (id, result) {
        _this._handleResults(id, result);
        var aux = result.id.split("-");
        if (aux[1]) {
          //Validacion para utilizar esta funcion en las dos direcciones de este formulario
          if (id == "contractorLocality") {
            _this._handleResults("contractorZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          } else {
            _this._handleResults("legalRepreZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
        }
      };

      _this._handleFilterListTypeDoc = function (array) {
        var newArray = array.filter(function (item) {
          return item.POV_COD_TDO === "04" || item.POV_COD_TDO === "05";
        });
        return newArray;
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$contractorFloor = _ref.contractorFloor,
          contractorFloor = _ref$contractorFloor === undefined ? "" : _ref$contractorFloor,
          _ref$contractorDepto = _ref.contractorDepto,
          contractorDepto = _ref$contractorDepto === undefined ? "" : _ref$contractorDepto,
          _ref$contractorLocali = _ref.contractorLocality,
          contractorLocality = _ref$contractorLocali === undefined ? "" : _ref$contractorLocali,
          _ref$contractorPhone = _ref.contractorPhone,
          contractorPhone = _ref$contractorPhone === undefined ? "" : _ref$contractorPhone,
          _ref$contractorProvin = _ref.contractorProvince,
          contractorProvince = _ref$contractorProvin === undefined ? "" : _ref$contractorProvin,
          _ref$contractorAreaCo = _ref.contractorAreaCode,
          contractorAreaCode = _ref$contractorAreaCo === undefined ? "" : _ref$contractorAreaCo,
          _ref$contractorStreet = _ref.contractorStreet,
          contractorStreet = _ref$contractorStreet === undefined ? "" : _ref$contractorStreet,
          _ref$contractorZipCod = _ref.contractorZipCode,
          contractorZipCode = _ref$contractorZipCod === undefined ? "" : _ref$contractorZipCod,
          _ref$contractorPrefix = _ref.contractorPrefix,
          contractorPrefix = _ref$contractorPrefix === undefined ? "" : _ref$contractorPrefix,
          _ref$contractorStreet2 = _ref.contractorStreetNumber,
          contractorStreetNumber = _ref$contractorStreet2 === undefined ? "" : _ref$contractorStreet2,
          _ref$legalRepreFloor = _ref.legalRepreFloor,
          legalRepreFloor = _ref$legalRepreFloor === undefined ? "" : _ref$legalRepreFloor,
          _ref$legalRepreDepto = _ref.legalRepreDepto,
          legalRepreDepto = _ref$legalRepreDepto === undefined ? "" : _ref$legalRepreDepto,
          _ref$legalRepreLocali = _ref.legalRepreLocality,
          legalRepreLocality = _ref$legalRepreLocali === undefined ? "" : _ref$legalRepreLocali,
          _ref$legalReprePhone = _ref.legalReprePhone,
          legalReprePhone = _ref$legalReprePhone === undefined ? "" : _ref$legalReprePhone,
          _ref$legalRepreProvin = _ref.legalRepreProvince,
          legalRepreProvince = _ref$legalRepreProvin === undefined ? "" : _ref$legalRepreProvin,
          _ref$legalRepreAreaCo = _ref.legalRepreAreaCode,
          legalRepreAreaCode = _ref$legalRepreAreaCo === undefined ? "" : _ref$legalRepreAreaCo,
          _ref$legalRepreStreet = _ref.legalRepreStreet,
          legalRepreStreet = _ref$legalRepreStreet === undefined ? "" : _ref$legalRepreStreet,
          _ref$legalRepreZipCod = _ref.legalRepreZipCode,
          legalRepreZipCode = _ref$legalRepreZipCod === undefined ? "" : _ref$legalRepreZipCod,
          _ref$legalReprePrefix = _ref.legalReprePrefix,
          legalReprePrefix = _ref$legalReprePrefix === undefined ? "" : _ref$legalReprePrefix,
          _ref$legalRepreStreet2 = _ref.legalRepreStreetNumber,
          legalRepreStreetNumber = _ref$legalRepreStreet2 === undefined ? "" : _ref$legalRepreStreet2,
          _ref$contractorName = _ref.contractorName,
          contractorName = _ref$contractorName === undefined ? "" : _ref$contractorName,
          _ref$contractorActivi = _ref.contractorActivity,
          contractorActivity = _ref$contractorActivi === undefined ? "" : _ref$contractorActivi,
          _ref$contractorMail = _ref.contractorMail,
          contractorMail = _ref$contractorMail === undefined ? "" : _ref$contractorMail,
          _ref$contractNumber = _ref.contractNumber,
          contractNumber = _ref$contractNumber === undefined ? "" : _ref$contractNumber,
          _ref$contractorTypeDo = _ref.contractorTypeDoc,
          contractorTypeDoc = _ref$contractorTypeDo === undefined ? "" : _ref$contractorTypeDo,
          _ref$contractorDoc = _ref.contractorDoc,
          contractorDoc = _ref$contractorDoc === undefined ? "" : _ref$contractorDoc,
          _ref$legalRepreTypeDo = _ref.legalRepreTypeDoc,
          legalRepreTypeDoc = _ref$legalRepreTypeDo === undefined ? "" : _ref$legalRepreTypeDo,
          _ref$legalRepreSurnam = _ref.legalRepreSurname,
          legalRepreSurname = _ref$legalRepreSurnam === undefined ? "" : _ref$legalRepreSurnam,
          _ref$legalRepreBornPl = _ref.legalRepreBornPlace,
          legalRepreBornPlace = _ref$legalRepreBornPl === undefined ? "" : _ref$legalRepreBornPl,
          _ref$legalRepreCivilS = _ref.legalRepreCivilStatus,
          legalRepreCivilStatus = _ref$legalRepreCivilS === undefined ? "" : _ref$legalRepreCivilS,
          _ref$legalRepreSexo = _ref.legalRepreSexo,
          legalRepreSexo = _ref$legalRepreSexo === undefined ? "" : _ref$legalRepreSexo,
          _ref$legalRepreMail = _ref.legalRepreMail,
          legalRepreMail = _ref$legalRepreMail === undefined ? "" : _ref$legalRepreMail,
          _ref$legalRepreAge = _ref.legalRepreAge,
          legalRepreAge = _ref$legalRepreAge === undefined ? "" : _ref$legalRepreAge,
          _ref$legalRepreName = _ref.legalRepreName,
          legalRepreName = _ref$legalRepreName === undefined ? "" : _ref$legalRepreName,
          _ref$legalRepreBornDa = _ref.legalRepreBornDate,
          legalRepreBornDate = _ref$legalRepreBornDa === undefined ? "" : _ref$legalRepreBornDa,
          _ref$legalRepreTypeCu = _ref.legalRepreTypeCuit,
          legalRepreTypeCuit = _ref$legalRepreTypeCu === undefined ? "" : _ref$legalRepreTypeCu,
          _ref$legalRepreCuit = _ref.legalRepreCuit,
          legalRepreCuit = _ref$legalRepreCuit === undefined ? "" : _ref$legalRepreCuit,
          _ref$legalRepreDoc = _ref.legalRepreDoc,
          legalRepreDoc = _ref$legalRepreDoc === undefined ? "" : _ref$legalRepreDoc,
          _ref$contractDate = _ref.contractDate,
          contractDate = _ref$contractDate === undefined ? "" : _ref$contractDate,
          _ref$contractorMailCo = _ref.contractorMailCompliance,
          contractorMailCompliance = _ref$contractorMailCo === undefined ? "" : _ref$contractorMailCo,
          _ref$legalRepreMailCo = _ref.legalRepreMailCompliance,
          legalRepreMailCompliance = _ref$legalRepreMailCo === undefined ? "" : _ref$legalRepreMailCo,
          _ref$registrationDate = _ref.registrationDate,
          registrationDate = _ref$registrationDate === undefined ? "" : _ref$registrationDate;

      _this.state = {
        contractorName: {
          value: contractorName,
          isValidate: false,
          required: true
        },
        contractorTypeDoc: { id: contractorTypeDoc, value: "", required: true },
        contractorDoc: {
          value: contractorDoc,
          isValidate: false,
          required: true
        },
        registrationDate: { value: registrationDate, required: true },
        contractNumber: {
          value: contractNumber,
          isValidate: false,
          required: true
        },
        contractDate: { value: contractDate, required: true },
        contractorStreet: {
          value: contractorStreet,
          isValidate: false,
          required: true
        },
        contractorStreetNumber: {
          value: contractorStreetNumber,
          isValidate: false,
          required: true
        },
        contractorProvince: {
          id: contractorProvince,
          value: "",
          required: true
        },
        contractorLocality: {
          id: "",
          value: contractorLocality,
          required: true
        },
        contractorZipCode: {
          value: contractorZipCode,
          isValidate: false,
          required: true
        },
        contractorFloor: {
          value: contractorFloor,
          isValidate: false,
          required: true
        },
        contractorDepto: {
          value: contractorDepto,
          isValidate: false,
          required: true
        },
        contractorPrefix: {
          id: contractorPrefix,
          code: "",
          value: "",
          required: true
        },
        contractorAreaCode: {
          value: contractorAreaCode,
          isValidate: false,
          required: true
        },
        contractorPhone: {
          value: contractorPhone,
          isValidate: false,
          required: true
        },
        contractorMailCompliance: {
          id: contractorMailCompliance,
          value: "",
          required: true
        },
        contractorMail: {
          value: contractorMail,
          isValidate: false,
          required: true
        },
        contractorActivity: {
          id: contractorActivity,
          value: "",
          required: true
        },
        legalRepreName: {
          value: legalRepreName,
          isValidate: false,
          required: true
        },
        legalRepreSurname: {
          value: legalRepreSurname,
          isValidate: false,
          required: true
        },
        legalRepreStreet: {
          value: legalRepreStreet,
          isValidate: false,
          required: true
        },
        legalRepreStreetNumber: {
          value: legalRepreStreetNumber,
          isValidate: false,
          required: true
        },
        legalRepreProvince: {
          id: legalRepreProvince,
          value: "",
          required: true
        },
        legalRepreLocality: {
          id: "",
          value: legalRepreLocality,
          required: true
        },
        legalRepreZipCode: {
          value: legalRepreZipCode,
          isValidate: false,
          required: true
        },
        legalRepreFloor: {
          value: legalRepreFloor,
          isValidate: false,
          required: true
        },
        legalRepreDepto: {
          value: legalRepreDepto,
          isValidate: false,
          required: true
        },
        legalReprePrefix: {
          id: legalReprePrefix,
          code: "",
          value: "",
          required: true
        },
        legalRepreAreaCode: {
          value: legalRepreAreaCode,
          isValidate: false,
          required: true
        },
        legalReprePhone: {
          value: legalReprePhone,
          isValidate: false,
          required: true
        },
        legalRepreBornDate: { value: legalRepreBornDate, required: true },
        legalRepreAge: {
          value: legalRepreAge,
          isValidate: false,
          required: true
        },
        legalRepreNacionality: { id: "", value: "", required: true },
        legalRepreCivilStatus: {
          id: legalRepreCivilStatus,
          value: "",
          required: true
        },
        legalRepreBornPlace: {
          value: legalRepreBornPlace,
          isValidate: false,
          required: true
        },
        legalRepreSexo: { id: legalRepreSexo, value: "", required: true },
        legalRepreTypeDoc: { id: legalRepreTypeDoc, value: "", required: true },
        legalRepreDoc: {
          value: legalRepreDoc,
          isValidate: false,
          required: true
        },
        legalRepreTypeCuit: {
          id: legalRepreTypeCuit,
          value: "",
          required: true
        },
        legalRepreCuit: {
          value: legalRepreCuit,
          isValidate: false,
          required: true
        },
        legalRepreMailCompliance: {
          id: legalRepreMailCompliance,
          value: "",
          required: true
        },
        legalRepreMail: {
          value: legalRepreMail,
          isValidate: false,
          required: true
        },
        localitiesList: [],
        loadLocality: false,
        loadLocality2: false
      };

      _this.referencies = {
        contractorName: React.createRef(),
        contractorTypeDoc: React.createRef(),
        contractorDoc: React.createRef(),
        registrationDate: React.createRef(),
        contractNumber: React.createRef(),
        contractDate: React.createRef(),
        contractorStreet: React.createRef(),
        contractorStreetNumber: React.createRef(),
        contractorProvince: React.createRef(),
        contractorLocality: React.createRef(),
        contractorZipCode: React.createRef(),
        contractorFloor: React.createRef(),
        contractorDepto: React.createRef(),
        contractorPrefix: React.createRef(),
        contractorAreaCode: React.createRef(),
        contractorPhone: React.createRef(),
        contractorMailCompliance: React.createRef(),
        contractorMail: React.createRef(),
        contractorActivity: React.createRef(),
        legalRepreName: React.createRef(),
        legalRepreSurname: React.createRef(),
        legalRepreStreet: React.createRef(),
        legalRepreStreetNumber: React.createRef(),
        legalRepreProvince: React.createRef(),
        legalRepreLocality: React.createRef(),
        legalRepreZipCode: React.createRef(),
        legalRepreFloor: React.createRef(),
        legalRepreDepto: React.createRef(),
        legalReprePrefix: React.createRef(),
        legalRepreAreaCode: React.createRef(),
        legalReprePhone: React.createRef(),
        legalRepreBornDate: React.createRef(),
        legalRepreAge: React.createRef(),
        legalRepreNacionality: React.createRef(),
        legalRepreCivilStatus: React.createRef(),
        legalRepreBornPlace: React.createRef(),
        legalRepreSexo: React.createRef(),
        legalRepreTypeDoc: React.createRef(),
        legalRepreDoc: React.createRef(),
        legalRepreTypeCuit: React.createRef(),
        legalRepreCuit: React.createRef(),
        legalRepreMailCompliance: React.createRef(),
        legalRepreMail: React.createRef()
      };
      _this.endososController = new EndososController();
      return _this;
    }

    _createClass(FormPoint1, [{
      key: "render",
      value: function render() {
        var readOnly = this.props.readOnly;

        return React.createElement(
          "form",
          null,
          React.createElement(
            "div",
            { className: "form-row form-height mb-2" },
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorName"
                },
                "Raz\xF3n Social"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorName,
                classNameAd: "hide",
                id: "contractorName",
                name: "contractorName",
                minLength: "2",
                maxLength: "40",
                pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                value: this.state.contractorName.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                formatText: "Raz\xF3n Social: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                upperCase: true,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorTypeDoc"
                },
                "Tipo Documento"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.contractorTypeDoc,
                list: this._handleFilterListTypeDoc(this.props.docTypeList),
                className: "input-background-color form-control input-size",
                id: "contractorTypeDoc",
                name: "contractorTypeDoc",
                idObject: "POV_COD_TDO",
                nameObject: "POV_DES_TDO",
                typeValue: "id",
                defaultValue: this.state.contractorTypeDoc.id,
                onResult: this._handleResults,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorDoc"
                },
                "N\xFAmero Documento"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorDoc,
                classNameAd: "hide",
                id: "contractorDoc",
                name: "contractorDoc",
                minLength: "8",
                maxLength: "11",
                value: this.state.contractorDoc.value,
                className: "input-background-color form-control input-size text-center",
                formatText: "N\xFAmero Documento Contratante: La longitud tiene que ser mayor a 8.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
              })
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
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "registrationDate"
                },
                "Fecha Inscripcion Registral"
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DatePicker, {
                  ref: this.referencies.registrationDate,
                  id: "registrationDate",
                  name: "registrationDate",
                  value: this.state.registrationDate.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  valueIsObject: true
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractNumber"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractNumber,
                classNameAd: "hide",
                id: "contractNumber",
                name: "contractNumber",
                minLength: "1",
                maxLength: "5",
                value: this.state.contractNumber.value,
                className: "input-background-color form-control input-size text-center",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center " },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "ageBeneficiary"
                },
                "Fecha Contrato"
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DatePicker, {
                  ref: this.referencies.contractDate,
                  id: "contractDate",
                  name: "contractDate",
                  value: this.state.contractDate.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  valueIsObject: true
                })
              )
            )
          ),
          React.createElement(
            "h6",
            { className: "mt-3" },
            "Domicilio legal"
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorStreet"
                },
                "Calle"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorStreet,
                classNameAd: "hide",
                id: "contractorStreet",
                name: "contractorStreet",
                minLength: "2",
                maxLength: "40",
                value: this.state.contractorStreet.value,
                className: "input-background-color form-control input-size",
                formatText: "Calle Contratante: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (!e.key.match(/^[\D]+$/im)) {
                    e.preventDefault();
                  }
                },
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
                  htmlFor: "contractorStreetNumber"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorStreetNumber,
                classNameAd: "hide",
                id: "contractorStreetNumber",
                name: "contractorStreetNumber",
                minLength: "2",
                maxLength: "6",
                value: this.state.contractorStreetNumber.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Calle Contratante: La longitud tiene que ser mayor a 2.",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorProvince"
                },
                "Provincia"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.contractorProvince,
                list: this.props.provincesList,
                className: "input-background-color form-control input-size",
                id: "contractorProvince",
                name: "contractorProvince",
                idObject: "COD_PRV",
                nameObject: "DES_PRV",
                typeValue: "id",
                defaultValue: this.state.contractorProvince.id,
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
                  htmlFor: "contractorLocality"
                },
                "Localidad"
              ),
              this.state.loadLocality == true ? React.createElement(
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
                ref: this.referencies.contractorLocality,
                list: this.state.localitiesList,
                className: "input-background-color form-control input-size",
                id: "contractorLocality",
                name: "contractorLocality",
                idObject: "CODPOS",
                nameObject: "CALLE",
                noAvilable: this.state.contractorProvince.id == "1",
                typeValue: "id",
                defaultValue: this.state.contractorLocality.value,
                onResult: this._handleLocalityResult,
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
                  htmlFor: "contractorZipCode"
                },
                "C. P."
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorZipCode,
                classNameAd: "hide",
                id: "contractorZipCode",
                name: "contractorZipCode",
                minLength: "2",
                maxLength: "6",
                value: this.state.contractorZipCode.value,
                className: "input-background-color form-control input-size",
                formatText: "C\xF3digo Postal Contratante: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly
                //
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorFloor"
                },
                "Piso"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorFloor,
                classNameAd: "hide",
                id: "contractorFloor",
                name: "contractorFloor",
                minLength: "0",
                maxLength: "3",
                value: this.state.contractorFloor.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
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
                  htmlFor: "contractorDepto"
                },
                "Depto"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorDepto,
                classNameAd: "hide",
                id: "contractorDepto",
                name: "contractorDepto",
                minLength: "0",
                maxLength: "3",
                value: this.state.contractorDepto.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorPrefix"
                },
                "Tel\xE9fono Sede Social"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.contractorPrefix,
                list: this.props.prefixList,
                className: "input-background-color form-control  input-size",
                id: "contractorPrefix",
                name: "contractorPrefix",
                idObject: "PREFIJO",
                nameObject: "SHOWDESC",
                typeValue: "id",
                defaultValue: this.state.contractorPrefix.id,
                onResult: this._handleResults,
                disabled: readOnly,
                prefix: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorAreaCode"
                },
                "C\xF3digo \xC1rea"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorAreaCode,
                classNameAd: "hide",
                id: "contractorAreaCode",
                name: "contractorAreaCode",
                minLength: "0",
                maxLength: "6",
                value: this.state.contractorAreaCode.value,
                className: "input-background-color form-control input-size",
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
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorPhone"
                },
                "Tel\xE9fono"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorPhone,
                classNameAd: "hide",
                id: "contractorPhone",
                name: "contractorPhone",
                minLength: "6",
                maxLength: "12",
                value: this.state.contractorPhone.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Tel\xE9fono Contratante: La longitud tiene que ser mayor a 6.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row pt-2 form-height " },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "Presto conformidad para utilizar como modalidad de env\xEDo de p\xF3liza y dem\xE1s documentaci\xF3n susceptible y correo electr\xF3nico y recibir informaci\xF3n"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.contractorMailCompliance,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "contractorMailCompliance",
                name: "contractorMailCompliance",
                typeValue: "id",
                defaultValue: this.state.contractorMailCompliance.id,
                onResult: this._handleResults,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row form-height " },
            this.state.contractorMailCompliance.id == "S" ? React.createElement(
              "div",
              { className: "form-group col-6 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorMail"
                },
                "Correo Electr\xF3nico"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.contractorMail,
                classNameAd: "hide",
                id: "contractorMail",
                name: "contractorMail",
                minLength: "2",
                maxLength: "40",
                pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                value: this.state.contractorMail.value,
                className: "input-background-color form-control input-size",
                formatText: "Correo Electr\xF3nico Contratante: La informaci\xF3n ingresada no corresponde al formato de correo electr\xF3nico v\xE1lido.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly
              })
            ) : "",
            React.createElement(
              "div",
              { className: "form-group col-6 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "contractorActivity"
                },
                "Actividad Principal Realizada"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.contractorActivity,
                list: this.props.afipActivitiesList,
                className: "input-background-color form-control  input-size",
                id: "contractorActivity",
                name: "contractorActivity",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.contractorActivity.id,
                onResult: this._handleResults,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "h6",
            { className: "mt-3" },
            "Datos del representante legal"
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreName"
                },
                "Nombre"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreName,
                classNameAd: "hide",
                id: "legalRepreName",
                name: "legalRepreName",
                minLength: "2",
                maxLength: "40",
                pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                value: this.state.legalRepreName.value,
                className: "input-background-color form-control input-size",
                formatText: "Nombre Representante Legal: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (!e.key.match(/^[\D]+$/im)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreSurname"
                },
                "Apellido"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreSurname,
                classNameAd: "hide",
                id: "legalRepreSurname",
                name: "legalRepreSurname",
                minLength: "2",
                maxLength: "40",
                pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                value: this.state.legalRepreSurname.value,
                className: "input-background-color form-control input-size",
                formatText: "Apellido Representante Legal: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (!e.key.match(/^[\D]+$/im)) {
                    e.preventDefault();
                  }
                },
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
                  htmlFor: "legalRepreStreet"
                },
                "Calle"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreStreet,
                classNameAd: "hide",
                id: "legalRepreStreet",
                name: "legalRepreStreet",
                minLength: "2",
                maxLength: "20",
                value: this.state.legalRepreStreet.value,
                className: "input-background-color form-control input-size",
                formatText: "Calle Representante Legal: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
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
                  htmlFor: "legalRepreStreetNumber"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreStreetNumber,
                classNameAd: "hide",
                id: "legalRepreStreetNumber",
                name: "legalRepreStreetNumber",
                minLength: "2",
                maxLength: "6",
                value: this.state.legalRepreStreetNumber.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Calle Representante Legal: La longitud tiene que ser mayor a 2.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
              })
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
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreProvince"
                },
                "Provincia"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreProvince,
                list: this.props.provincesList,
                className: "input-background-color form-control input-size",
                id: "legalRepreProvince",
                name: "legalRepreProvince",
                idObject: "COD_PRV",
                nameObject: "DES_PRV",
                typeValue: "id",
                defaultValue: this.state.legalRepreProvince.id,
                onResult: this._handleProvinceResult,
                disabled: readOnly
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreLocality"
                },
                "Localidad"
              ),
              this.state.loadLocality2 == true ? React.createElement(
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
                ref: this.referencies.legalRepreLocality,
                list: this.state.localitiesList,
                className: "input-background-color form-control input-size",
                id: "legalRepreLocality",
                name: "legalRepreLocality",
                idObject: "CODPOS",
                nameObject: "CALLE",
                noAvilable: this.state.legalRepreProvince.id == "1",
                typeValue: "id",
                defaultValue: this.state.legalRepreLocality.value,
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
                  htmlFor: "legalRepreZipCode"
                },
                "C.P."
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreZipCode,
                classNameAd: "hide",
                id: "legalRepreZipCode",
                name: "legalRepreZipCode",
                minLength: "2",
                maxLength: "6",
                value: this.state.legalRepreZipCode.value,
                className: "input-background-color form-control input-size",
                formatText: "C\xF3digo Postal Representante Legal: La longitud tiene que ser mayor a 2.",
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
                  htmlFor: "legalRepreFloor"
                },
                "Piso"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreFloor,
                classNameAd: "hide",
                id: "legalRepreFloor",
                name: "legalRepreFloor",
                minLength: "0",
                maxLength: "3",
                value: this.state.legalRepreFloor.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
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
                  htmlFor: "legalRepreDepto"
                },
                "Depto"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreDepto,
                classNameAd: "hide",
                id: "legalRepreDepto",
                name: "legalRepreDepto",
                minLength: "0",
                maxLength: "3",
                value: this.state.legalRepreDepto.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalReprePrefix"
                },
                "Prefijo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalReprePrefix,
                list: this.props.prefixList,
                className: "input-background-color form-control  input-size",
                id: "legalReprePrefix",
                name: "legalReprePrefix",
                idObject: "PREFIJO",
                nameObject: "SHOWDESC",
                typeValue: "id",
                defaultValue: this.state.legalReprePrefix.id,
                onResult: this._handleResults,
                disabled: readOnly,
                prefix: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreAreaCode"
                },
                "C\xF3digo \xC1rea"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreAreaCode,
                classNameAd: "hide",
                id: "legalRepreAreaCode",
                name: "legalRepreAreaCode",
                minLength: "0",
                maxLength: "6",
                value: this.state.legalRepreAreaCode.value,
                className: "input-background-color form-control input-size",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalReprePhone"
                },
                "Tel\xE9fono"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalReprePhone,
                classNameAd: "hide",
                id: "legalReprePhone",
                name: "legalReprePhone",
                minLength: "6",
                maxLength: "12",
                value: this.state.legalReprePhone.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Tel\xE9fono Representante Legal: La longitud tiene que ser mayor a 6.",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreBornDate"
                },
                "Fecha de Nacimiento"
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DatePicker, {
                  ref: this.referencies.legalRepreBornDate,
                  id: "legalRepreBornDate",
                  name: "legalRepreBornDate",
                  value: this.state.legalRepreBornDate.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  valueIsObject: true
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreAge"
                },
                "Edad"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreAge,
                classNameAd: "hide",
                id: "legalRepreAge",
                name: "legalRepreAge",
                minLength: "0",
                maxLength: "3",
                value: this.state.legalRepreAge.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreNacionality"
                },
                "Nacionalidad"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreNacionality,
                list: this.props.countriesList,
                className: "input-background-color form-control  input-size",
                id: "legalRepreNacionality",
                name: "legalRepreNacionality",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.legalRepreNacionality.id,
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
                  htmlFor: "legalRepreCivilStatus"
                },
                "Estado Civil"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreCivilStatus,
                list: this.props.civilStatusList,
                className: "input-background-color form-control  input-size",
                id: "legalRepreCivilStatus",
                name: "legalRepreCivilStatus",
                typeValue: "id",
                defaultValue: this.state.legalRepreCivilStatus.id,
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
                  htmlFor: "legalRepreBornPlace"
                },
                "Ciudad de Nacimiento"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreBornPlace,
                classNameAd: "hide",
                id: "legalRepreBornPlace",
                name: "legalRepreBornPlace",
                minLength: "4",
                maxLength: "20",
                value: this.state.legalRepreBornPlace.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                formatText: "Ciudad de Nacimiento Representante Legal: La longitud debe ser mayor a 4.",
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
                  htmlFor: "legalRepreSexo"
                },
                "Sexo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreSexo,
                list: this.props.sexoList,
                className: "input-background-color form-control  input-size",
                id: "legalRepreSexo",
                name: "legalRepreSexo",
                typeValue: "id",
                defaultValue: this.state.legalRepreSexo.id,
                onResult: this._handleResults,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreTypeDoc"
                },
                "Tipo Documento"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreTypeDoc,
                list: this.props.docTypeList,
                className: "input-background-color form-control input-size",
                id: "legalRepreTypeDoc",
                name: "legalRepreTypeDoc",
                idObject: "POV_COD_TDO",
                nameObject: "POV_DES_TDO",
                typeValue: "id",
                defaultValue: this.state.legalRepreTypeDoc.id,
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
                  htmlFor: "legalRepreDoc"
                },
                "N\xFAmero Documento"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreDoc,
                classNameAd: "hide",
                id: "legalRepreDoc",
                name: "legalRepreDoc",
                minLength: "8",
                maxLength: "11",
                value: this.state.legalRepreDoc.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Documento Representante Legal: La longitud tiene que ser mayor a 8.",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreTypeCuit"
                },
                "CUIT/CUIL/CDI"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreTypeCuit,
                list: this.props.ciutList,
                className: "input-background-color form-control  input-size",
                id: "legalRepreTypeCuit",
                name: "legalRepreTypeCuit",
                typeValue: "id",
                defaultValue: this.state.legalRepreTypeCuit.id,
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
                  htmlFor: "legalRepreCuit"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreCuit,
                classNameAd: "hide",
                id: "legalRepreCuit",
                name: "legalRepreCuit",
                minLength: "8",
                maxLength: "11",
                value: this.state.legalRepreCuit.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero CUIT/CUIL/CDI Representante Legal: La longitud tiene que ser mayor a 8.",
                onResult: this._handleResults,
                onKeyPress: function onKeyPress(e) {
                  if (isNaN(e.key)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                disabled: readOnly
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row pt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "Presto conformidad para utilizar como modalidad de env\xEDo de p\xF3liza y dem\xE1s documentaci\xF3n susceptible y correo electr\xF3nico y recibir informaci\xF3n"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.legalRepreMailCompliance,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "legalRepreMailCompliance",
                name: "legalRepreMailCompliance",
                typeValue: "id",
                defaultValue: this.state.legalRepreMailCompliance.id,
                onResult: this._handleResults,
                disabled: readOnly
              })
            )
          ),
          this.state.legalRepreMailCompliance.id == "S" ? React.createElement(
            "div",
            { className: "form-row form-height " },
            React.createElement(
              "div",
              { className: "form-group col-6 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "legalRepreMail"
                },
                "Correo Electr\xF3nico"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.legalRepreMail,
                classNameAd: "hide",
                id: "legalRepreMail",
                name: "legalRepreMail",
                minLength: "2",
                maxLength: "40",
                pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                value: this.state.legalRepreMail.value,
                className: "input-background-color form-control input-size",
                formatText: "Correo Electr\xF3nico Representante Legal: La informaci\xF3n ingresada no corresponde al formato de correo electr\xF3nico v\xE1lido.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly
              })
            )
          ) : ""
        );
      }
    }]);

    return FormPoint1;
  }(React.Component);

  return FormPoint1;
});