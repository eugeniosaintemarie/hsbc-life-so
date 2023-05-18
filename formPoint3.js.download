var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/inputvalidation", "../../common/dropdownContent", "../../common/datepicker", "../../controller/endososController"], function (React, InputValidation, DropDownContent, DatePicker, EndososController) {
  var FormPoint3 = function (_React$Component) {
    _inherits(FormPoint3, _React$Component);

    function FormPoint3(props) {
      _classCallCheck(this, FormPoint3);

      var _this = _possibleConstructorReturn(this, (FormPoint3.__proto__ || Object.getPrototypeOf(FormPoint3)).call(this, props));

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
          //Validacion para utilizar esta funcion en las tres direcciones de este formulario
          if (id == "previusProvince") {
            if (result.id != 1) {
              _this.setState({ loadLocality: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality: false });
              });
              document.getElementById("previusZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("previusLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("previusZipCode").removeAttribute("disabled");
              }
            }
          }
          if (id == "previusProvince2") {
            if (result.id != 1) {
              _this.setState({ loadLocality2: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality2: false });
              });
              document.getElementById("previusZipCode2").setAttribute("disabled", "");
            } else {
              _this._handleResults("previusLocality2", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("previusZipCode2").removeAttribute("disabled");
              }
            }
          }
          if (id == "previusProvince3") {
            if (result.id != 1) {
              _this.setState({ loadLocality3: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality3: false });
              });
              document.getElementById("previusZipCode3").setAttribute("disabled", "");
            } else {
              _this._handleResults("previusLocality3", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("previusZipCode3").removeAttribute("disabled");
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
          if (id == "previusLocality") {
            _this._handleResults("previusZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
          if (id == "previusLocality2") {
            _this._handleResults("previusZipCode2", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
          if (id == "previusLocality3") {
            _this._handleResults("previusZipCode3", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
        }
      };

      _this._handleOtherAddress = function (e) {
        if (e.target.id == "otherAddressButton") {
          _this.setState({ otherAddress: true });
        } else {
          _this.setState({ otherAddress2: true });
        }
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$previusFloor = _ref.previusFloor,
          previusFloor = _ref$previusFloor === undefined ? "" : _ref$previusFloor,
          _ref$previusDepto = _ref.previusDepto,
          previusDepto = _ref$previusDepto === undefined ? "" : _ref$previusDepto,
          _ref$previusLocality = _ref.previusLocality,
          previusLocality = _ref$previusLocality === undefined ? "" : _ref$previusLocality,
          _ref$previusProvince = _ref.previusProvince,
          previusProvince = _ref$previusProvince === undefined ? "" : _ref$previusProvince,
          _ref$previusStreet = _ref.previusStreet,
          previusStreet = _ref$previusStreet === undefined ? "" : _ref$previusStreet,
          _ref$previusZipCode = _ref.previusZipCode,
          previusZipCode = _ref$previusZipCode === undefined ? "" : _ref$previusZipCode,
          _ref$previusStreetNum = _ref.previusStreetNumber,
          previusStreetNumber = _ref$previusStreetNum === undefined ? "" : _ref$previusStreetNum,
          _ref$previusFloor2 = _ref.previusFloor2,
          previusFloor2 = _ref$previusFloor2 === undefined ? "" : _ref$previusFloor2,
          _ref$previusDepto2 = _ref.previusDepto2,
          previusDepto2 = _ref$previusDepto2 === undefined ? "" : _ref$previusDepto2,
          _ref$previusLocality2 = _ref.previusLocality2,
          previusLocality2 = _ref$previusLocality2 === undefined ? "" : _ref$previusLocality2,
          _ref$previusProvince2 = _ref.previusProvince2,
          previusProvince2 = _ref$previusProvince2 === undefined ? "" : _ref$previusProvince2,
          _ref$previusStreet2 = _ref.previusStreet2,
          previusStreet2 = _ref$previusStreet2 === undefined ? "" : _ref$previusStreet2,
          _ref$previusZipCode2 = _ref.previusZipCode2,
          previusZipCode2 = _ref$previusZipCode2 === undefined ? "" : _ref$previusZipCode2,
          _ref$previusStreetNum2 = _ref.previusStreetNumber2,
          previusStreetNumber2 = _ref$previusStreetNum2 === undefined ? "" : _ref$previusStreetNum2,
          _ref$previusFloor3 = _ref.previusFloor3,
          previusFloor3 = _ref$previusFloor3 === undefined ? "" : _ref$previusFloor3,
          _ref$previusDepto3 = _ref.previusDepto3,
          previusDepto3 = _ref$previusDepto3 === undefined ? "" : _ref$previusDepto3,
          _ref$previusLocality3 = _ref.previusLocality3,
          previusLocality3 = _ref$previusLocality3 === undefined ? "" : _ref$previusLocality3,
          _ref$previusProvince3 = _ref.previusProvince3,
          previusProvince3 = _ref$previusProvince3 === undefined ? "" : _ref$previusProvince3,
          _ref$previusStreet3 = _ref.previusStreet3,
          previusStreet3 = _ref$previusStreet3 === undefined ? "" : _ref$previusStreet3,
          _ref$previusZipCode3 = _ref.previusZipCode3,
          previusZipCode3 = _ref$previusZipCode3 === undefined ? "" : _ref$previusZipCode3,
          _ref$previusStreetNum3 = _ref.previusStreetNumber3,
          previusStreetNumber3 = _ref$previusStreetNum3 === undefined ? "" : _ref$previusStreetNum3,
          _ref$sinceDate = _ref.sinceDate,
          sinceDate = _ref$sinceDate === undefined ? "" : _ref$sinceDate,
          _ref$sinceDate2 = _ref.sinceDate2,
          sinceDate2 = _ref$sinceDate2 === undefined ? "" : _ref$sinceDate2,
          _ref$sinceDate3 = _ref.sinceDate3,
          sinceDate3 = _ref$sinceDate3 === undefined ? "" : _ref$sinceDate3,
          _ref$previusName = _ref.previusName,
          previusName = _ref$previusName === undefined ? "" : _ref$previusName,
          _ref$previusFirstName = _ref.previusFirstName,
          previusFirstName = _ref$previusFirstName === undefined ? "" : _ref$previusFirstName,
          _ref$previusMiddleNam = _ref.previusMiddleName,
          previusMiddleName = _ref$previusMiddleNam === undefined ? "" : _ref$previusMiddleNam,
          _ref$previusLastName = _ref.previusLastName,
          previusLastName = _ref$previusLastName === undefined ? "" : _ref$previusLastName,
          _ref$previusAddress = _ref.previusAddress,
          previusAddress = _ref$previusAddress === undefined ? "" : _ref$previusAddress,
          _ref$otherName = _ref.otherName,
          otherName = _ref$otherName === undefined ? "" : _ref$otherName,
          _ref$otherFirstName = _ref.otherFirstName,
          otherFirstName = _ref$otherFirstName === undefined ? "" : _ref$otherFirstName,
          _ref$otherMiddleName = _ref.otherMiddleName,
          otherMiddleName = _ref$otherMiddleName === undefined ? "" : _ref$otherMiddleName,
          _ref$otherLastName = _ref.otherLastName,
          otherLastName = _ref$otherLastName === undefined ? "" : _ref$otherLastName,
          _ref$holdMail = _ref.holdMail,
          holdMail = _ref$holdMail === undefined ? "" : _ref$holdMail,
          _ref$uueeResidense = _ref.uueeResidense,
          uueeResidense = _ref$uueeResidense === undefined ? "" : _ref$uueeResidense,
          _ref$greenCard = _ref.greenCard,
          greenCard = _ref$greenCard === undefined ? "" : _ref$greenCard;

      _this.state = {
        holdMail: { id: holdMail, value: "", required: true },
        greenCard: { id: greenCard, value: "", required: true },
        uueeResidense: { id: uueeResidense, value: "", required: true },
        previusAddress: { id: previusAddress, value: "", required: true },
        previusStreet: {
          value: previusStreet,
          isValidate: false,
          required: true
        },
        previusStreetNumber: {
          value: previusStreetNumber,
          isValidate: false,
          required: true
        },
        previusFloor: {
          value: previusFloor,
          isValidate: false,
          required: true
        },
        previusDepto: {
          value: previusDepto,
          isValidate: false,
          required: true
        },
        previusZipCode: {
          value: previusZipCode,
          isValidate: false,
          required: true
        },
        previusLocality: { id: "", value: previusLocality, required: true },
        previusProvince: { id: previusProvince, value: "", required: true },
        sinceDate: { value: sinceDate, isValidate: false, required: true },
        otherAddress: false,
        previusStreet2: {
          value: previusStreet2,
          isValidate: false,
          required: true
        },
        previusStreetNumber2: {
          value: previusStreetNumber2,
          isValidate: false,
          required: true
        },
        previusProvince2: { id: previusProvince2, value: "", required: true },
        previusLocality2: { id: "", value: previusLocality2, required: true },
        previusZipCode2: {
          value: previusZipCode2,
          isValidate: false,
          required: true
        },
        previusFloor2: {
          value: previusFloor2,
          isValidate: false,
          required: true
        },
        previusDepto2: {
          value: previusDepto2,
          isValidate: false,
          required: true
        },
        sinceDate2: { value: sinceDate2, isValidate: false, required: true },
        otherAddress2: false,
        previusStreet3: {
          value: previusStreet3,
          isValidate: false,
          required: true
        },
        previusStreetNumber3: {
          value: previusStreetNumber3,
          isValidate: false,
          required: true
        },
        previusProvince3: { id: previusProvince3, value: "", required: true },
        previusLocality3: { id: "", value: previusLocality3, required: true },
        previusZipCode3: {
          value: previusZipCode3,
          isValidate: false,
          required: true
        },
        previusFloor3: {
          value: previusFloor3,
          isValidate: false,
          required: true
        },
        previusDepto3: {
          value: previusDepto3,
          isValidate: false,
          required: true
        },
        sinceDate3: { value: sinceDate3, isValidate: false, required: true },
        previusName: { id: previusName, value: "", required: true },
        previusFirstName: {
          value: previusFirstName,
          isValidate: false,
          required: true
        },
        previusMiddleName: {
          value: previusMiddleName,
          isValidate: false,
          required: true
        },
        previusLastName: {
          value: previusLastName,
          isValidate: false,
          required: true
        },
        otherName: { id: otherName, value: "", required: true },
        otherFirstName: {
          value: otherFirstName,
          isValidate: false,
          required: true
        },
        otherMiddleName: {
          value: otherMiddleName,
          isValidate: false,
          required: true
        },
        otherLastName: {
          value: otherLastName,
          isValidate: false,
          required: true
        },
        localitiesList: [],
        loadLocality: false,
        loadLocality2: false,
        loadLocality3: false
      };

      _this.referencies = {
        holdMail: React.createRef(),
        greenCard: React.createRef(),
        uueeResidense: React.createRef(),
        previusAddress: React.createRef(),
        previusStreet: React.createRef(),
        previusStreetNumber: React.createRef(),
        previusFloor: React.createRef(),
        previusDepto: React.createRef(),
        previusZipCode: React.createRef(),
        previusLocality: React.createRef(),
        previusProvince: React.createRef(),
        sinceDate: React.createRef(),
        previusStreet2: React.createRef(),
        previusStreetNumber2: React.createRef(),
        previusFloor2: React.createRef(),
        previusDepto2: React.createRef(),
        previusZipCode2: React.createRef(),
        previusLocality2: React.createRef(),
        previusProvince2: React.createRef(),
        sinceDate2: React.createRef(),
        previusStreet3: React.createRef(),
        previusStreetNumber3: React.createRef(),
        previusFloor3: React.createRef(),
        previusDepto3: React.createRef(),
        previusZipCode3: React.createRef(),
        previusLocality3: React.createRef(),
        previusProvince3: React.createRef(),
        sinceDate3: React.createRef(),
        previusName: React.createRef(),
        previusFirstName: React.createRef(),
        previusMiddleName: React.createRef(),
        previusLastName: React.createRef(),
        otherName: React.createRef(),
        otherFirstName: React.createRef(),
        otherMiddleName: React.createRef(),
        otherLastName: React.createRef()
      };
      _this.endososController = new EndososController();
      return _this;
    }

    _createClass(FormPoint3, [{
      key: "render",
      value: function render() {
        var readOnly = this.props.readOnly;

        return React.createElement(
          "form",
          null,
          React.createElement(
            "div",
            { className: "form-row mt-3 form-height " },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "Retenci\xF3n de correspondencia (US Hold Mail,Casilla de correo postal en Estados Unidos)"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(DropDownContent, {
                ref: this.referencies.holdMail,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "holdMail",
                name: "holdMail",
                typeValue: "id",
                defaultValue: this.state.holdMail.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "\xBFPosee tarjeta verde/green card o residencia legal permanente en EE.UU.?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(DropDownContent, {
                ref: this.referencies.greenCard,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "greenCard",
                name: "greenCard",
                typeValue: "id",
                defaultValue: this.state.greenCard.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "\xBFProvee comprobante de residencia en EE.UU.?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(DropDownContent, {
                ref: this.referencies.uueeResidense,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "uueeResidense",
                name: "uueeResidense",
                typeValue: "id",
                defaultValue: this.state.uueeResidense.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "\xBFEl tiempo de residencia es menor a tres a\xF1os?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(DropDownContent, {
                ref: this.referencies.previusAddress,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "previusAddress",
                name: "previusAddress",
                typeValue: "id",
                defaultValue: this.state.previusAddress.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.previusAddress.id == "S" ? React.createElement(
            React.Fragment,
            null,
            this.state.otherAddress ? React.createElement(
              "h6",
              null,
              "Primer Domicilio"
            ) : "",
            React.createElement(
              "div",
              { className: "form-row form-height " },
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusStreet"
                  },
                  "Calle"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusStreet,
                  classNameAd: "hide",
                  id: "previusStreet",
                  name: "previusStreet",
                  minLength: "2",
                  maxLength: "20",
                  value: this.state.previusStreet.value,
                  className: "input-background-color form-control input-size",
                  formatText: "Calle Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                  onResult: this._handleResults,
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusStreetNumber"
                  },
                  "N\xFAmero"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusStreetNumber,
                  classNameAd: "hide",
                  id: "previusStreetNumber",
                  name: "previusStreetNumber",
                  minLength: "2",
                  maxLength: "6",
                  value: this.state.previusStreetNumber.value,
                  className: "input-background-color form-control input-size",
                  formatText: "N\xFAmero Calle Anterior: La longitud tiene que ser mayor a 2.",
                  onResult: this._handleResults,
                  onKeyPress: function onKeyPress(e) {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                  },
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusFloor"
                  },
                  "Piso"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusFloor,
                  classNameAd: "hide",
                  id: "previusFloor",
                  name: "previusFloor",
                  minLength: "0",
                  maxLength: "3",
                  value: this.state.previusFloor.value,
                  className: "input-background-color form-control input-size",
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
                    htmlFor: "previusDepto"
                  },
                  "Depto"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusDepto,
                  classNameAd: "hide",
                  id: "previusDepto",
                  name: "previusDepto",
                  minLength: "0",
                  maxLength: "3",
                  value: this.state.previusDepto.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  upperCase: true,
                  disabled: readOnly
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-row mt-2 mb-4  form-height " },
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusProvince"
                  },
                  "Provincia"
                ),
                React.createElement(DropDownContent, {
                  ref: this.referencies.previusProvince,
                  list: this.props.provincesList,
                  className: "input-background-color form-control input-size",
                  id: "previusProvince",
                  name: "previusProvince",
                  idObject: "COD_PRV",
                  nameObject: "DES_PRV",
                  typeValue: "id",
                  defaultValue: this.state.previusProvince.value,
                  onResult: this._handleProvinceResult,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusLocality"
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
                  ref: this.referencies.previusLocality,
                  list: this.state.localitiesList,
                  className: "input-background-color form-control input-size",
                  id: "previusLocality",
                  name: "previusLocality",
                  idObject: "CODPOS",
                  nameObject: "CALLE",
                  noAvilable: this.state.previusProvince.id == "1",
                  typeValue: "id",
                  defaultValue: this.state.previusLocality.value,
                  onResult: this._handleLocalityResult,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusZipCode"
                  },
                  "C. P."
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusZipCode,
                  classNameAd: "hide",
                  id: "previusZipCode",
                  name: "previusZipCode",
                  minLength: "2",
                  maxLength: "6",
                  value: this.state.previusZipCode.value,
                  className: "input-background-color form-control input-size",
                  formatText: "C\xF3digo Postal Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                  onResult: this._handleResults,
                  onKeyPress: function onKeyPress(e) {
                    if (isNaN(e.key)) {
                      e.preventDefault();
                    }
                  },
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "sinceDate"
                  },
                  "Desde"
                ),
                React.createElement(
                  "div",
                  { className: "dp-ddben" },
                  React.createElement(DatePicker, {
                    ref: this.referencies.sinceDate,
                    id: "sinceDate",
                    name: "sinceDate",
                    value: this.state.sinceDate.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    required: true,
                    valueIsObject: true
                  })
                )
              )
            ),
            this.state.otherAddress ? "" : React.createElement(
              "button",
              {
                className: "btn btn-danger btn-sm p-0 pl-2 pr-2 mb-3",
                id: "otherAddressButton",
                type: "button",
                onClick: this._handleOtherAddress
              },
              "Agregar otro domicilio"
            ),
            this.state.otherAddress ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "h6",
                null,
                "Segundo Domicilio"
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
                      htmlFor: "previusStreet2"
                    },
                    "Calle"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.previusStreet2,
                    classNameAd: "hide",
                    id: "previusStreet2",
                    name: "previusStreet2",
                    minLength: "2",
                    maxLength: "20",
                    value: this.state.previusStreet2.value,
                    className: "input-background-color form-control input-size",
                    formatText: "Segunda Calle Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                    onResult: this._handleResults,
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "previusStreetNumber2"
                    },
                    "N\xFAmero"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.previusStreetNumber2,
                    classNameAd: "hide",
                    id: "previusStreetNumber2",
                    name: "previusStreetNumber2",
                    minLength: "2",
                    maxLength: "6",
                    value: this.state.previusStreetNumber2.value,
                    className: "input-background-color form-control input-size",
                    formatText: "Segundo N\xFAmero Calle Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (isNaN(e.key)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "previusFloor2"
                    },
                    "Piso"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.previusFloor2,
                    classNameAd: "hide",
                    id: "previusFloor2",
                    name: "previusFloor2",
                    minLength: "0",
                    maxLength: "3",
                    value: this.state.previusFloor2.value,
                    className: "input-background-color form-control input-size",
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
                      htmlFor: "previusDepto2"
                    },
                    "Depto"
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.previusDepto2,
                    classNameAd: "hide",
                    id: "previusDepto2",
                    name: "previusDepto2",
                    minLength: "0",
                    maxLength: "3",
                    value: this.state.previusDepto2.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    upperCase: true,
                    disabled: readOnly
                  })
                )
              ),
              React.createElement(
                "div",
                { className: "form-row mb-4 form-height " },
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "previusProvince2"
                    },
                    "Provincia"
                  ),
                  React.createElement(DropDownContent, {
                    ref: this.referencies.previusProvince2,
                    list: this.props.provincesList,
                    className: "input-background-color form-control input-size",
                    id: "previusProvince2",
                    name: "previusProvince2",
                    idObject: "COD_PRV",
                    nameObject: "DES_PRV",
                    typeValue: "id",
                    defaultValue: this.state.previusProvince2.value,
                    onResult: this._handleProvinceResult,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-4 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "previusLocality2"
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
                    ref: this.referencies.previusLocality2,
                    list: this.state.localitiesList,
                    className: "input-background-color form-control input-size",
                    id: "previusLocality2",
                    name: "previusLocality2",
                    idObject: "CODPOS",
                    nameObject: "CALLE",
                    noAvilable: this.state.previusProvince2.id == "1",
                    typeValue: "id",
                    defaultValue: this.state.previusLocality2.value,
                    onResult: this._handleLocalityResult,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "previusZipCode2"
                    },
                    "C. P."
                  ),
                  React.createElement(InputValidation, {
                    ref: this.referencies.previusZipCode2,
                    classNameAd: "hide",
                    id: "previusZipCode2",
                    name: "previusZipCode2",
                    minLength: "2",
                    maxLength: "6",
                    value: this.state.previusZipCode2.value,
                    className: "input-background-color form-control input-size",
                    formatText: "Segundo C\xF3digo Postal Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (isNaN(e.key)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true,
                    disabled: readOnly,
                    required: true
                  })
                ),
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "sinceDate2"
                    },
                    "Desde"
                  ),
                  React.createElement(
                    "div",
                    { className: "dp-ddben" },
                    React.createElement(DatePicker, {
                      ref: this.referencies.sinceDate2,
                      id: "sinceDate2",
                      name: "sinceDate2",
                      value: this.state.sinceDate2.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      required: true,
                      valueIsObject: true
                    })
                  )
                )
              ),
              this.state.otherAddress2 ? "" : React.createElement(
                "button",
                {
                  className: "btn btn-danger btn-sm p-0 pl-2 pr-2 mb-3",
                  id: "otherAddressButton2",
                  type: "button",
                  onClick: this._handleOtherAddress
                },
                "Agregar otro domicilio"
              ),
              this.state.otherAddress2 ? React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "h6",
                  null,
                  "Tercer Domicilio"
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
                        htmlFor: "previusStreet3"
                      },
                      "Calle"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.previusStreet3,
                      classNameAd: "hide",
                      id: "previusStreet3",
                      name: "previusStreet3",
                      minLength: "2",
                      maxLength: "20",
                      value: this.state.previusStreet3.value,
                      className: "input-background-color form-control input-size",
                      formatText: "Tercer Calle Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                      onResult: this._handleResults,
                      upperCase: true,
                      disabled: readOnly,
                      required: true
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-4 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "previusStreetNumber3"
                      },
                      "N\xFAmero"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.previusStreetNumber3,
                      classNameAd: "hide",
                      id: "previusStreetNumber3",
                      name: "previusStreetNumber3",
                      minLength: "2",
                      maxLength: "6",
                      value: this.state.previusStreetNumber3.value,
                      className: "input-background-color form-control input-size",
                      formatText: "Tercer N\xFAmero Calle Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true,
                      disabled: readOnly,
                      required: true
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-2 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "previusFloor3"
                      },
                      "Piso"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.previusFloor3,
                      classNameAd: "hide",
                      id: "previusFloor3",
                      name: "previusFloor3",
                      minLength: "0",
                      maxLength: "3",
                      value: this.state.previusFloor3.value,
                      className: "input-background-color form-control input-size",
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
                        htmlFor: "previusDepto3"
                      },
                      "Depto"
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.previusDepto3,
                      classNameAd: "hide",
                      id: "previusDepto3",
                      name: "previusDepto3",
                      minLength: "0",
                      maxLength: "3",
                      value: this.state.previusDepto3.value,
                      className: "input-background-color form-control input-size",
                      onResult: this._handleResults,
                      upperCase: true,
                      disabled: readOnly
                    })
                  )
                ),
                React.createElement(
                  "div",
                  { className: "form-row mb-4 form-height " },
                  React.createElement(
                    "div",
                    { className: "form-group col-4 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "previusProvince3"
                      },
                      "Provincia"
                    ),
                    React.createElement(DropDownContent, {
                      ref: this.referencies.previusProvince3,
                      list: this.props.provincesList,
                      className: "input-background-color form-control input-size",
                      id: "previusProvince3",
                      name: "previusProvince3",
                      idObject: "COD_PRV",
                      nameObject: "DES_PRV",
                      typeValue: "id",
                      defaultValue: this.state.previusProvince3.value,
                      onResult: this._handleProvinceResult,
                      disabled: readOnly,
                      required: true
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-4 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "previusLocality3"
                      },
                      "Localidad"
                    ),
                    this.state.loadLocality3 == true ? React.createElement(
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
                      ref: this.referencies.previusLocality3,
                      list: this.state.localitiesList,
                      className: "input-background-color form-control input-size",
                      id: "previusLocality3",
                      name: "previusLocality3",
                      idObject: "CODPOS",
                      nameObject: "CALLE",
                      noAvilable: this.state.previusProvince3.id == "1",
                      typeValue: "id",
                      defaultValue: this.state.previusLocality3.value,
                      onResult: this._handleLocalityResult,
                      disabled: readOnly,
                      required: true
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-2 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "previusZipCode3"
                      },
                      "C. P."
                    ),
                    React.createElement(InputValidation, {
                      ref: this.referencies.previusZipCode3,
                      classNameAd: "hide",
                      id: "previusZipCode3",
                      name: "previusZipCode3",
                      minLength: "2",
                      maxLength: "6",
                      value: this.state.previusZipCode3.value,
                      className: "input-background-color form-control input-size",
                      formatText: "Tercer C\xF3digo Postal Solicitante Anterior: La longitud tiene que ser mayor a 2.",
                      onResult: this._handleResults,
                      onKeyPress: function onKeyPress(e) {
                        if (isNaN(e.key)) {
                          e.preventDefault();
                        }
                      },
                      upperCase: true,
                      disabled: readOnly,
                      required: true
                    })
                  ),
                  React.createElement(
                    "div",
                    { className: "form-group col-2 text-center" },
                    React.createElement(
                      "label",
                      {
                        className: "font-size-ddben-beneficiary",
                        htmlFor: "sinceDate3"
                      },
                      "Desde"
                    ),
                    React.createElement(
                      "div",
                      { className: "dp-ddben" },
                      React.createElement(DatePicker, {
                        ref: this.referencies.sinceDate3,
                        id: "sinceDate3",
                        name: "sinceDate3",
                        value: this.state.sinceDate3.value,
                        className: "input-background-color form-control input-size",
                        onResult: this._handleResults,
                        required: true,
                        valueIsObject: true
                      })
                    )
                  )
                )
              ) : ""
            ) : ""
          ) : "",
          React.createElement(
            "div",
            {
              className: "form-row mt-2 form-height",
              style: { height: "2.5rem" }
            },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "\xBFTiene nombre anterior?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(DropDownContent, {
                ref: this.referencies.previusName,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "previusName",
                name: "previusName",
                typeValue: "id",
                defaultValue: this.state.previusName.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.previusName.id == "S" ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "form-row mb-3  form-height " },
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusFirstName"
                  },
                  "Primer Nombre"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusFirstName,
                  classNameAd: "hide",
                  id: "previusFirstName",
                  name: "previusFirstName",
                  minLength: "2",
                  maxLength: "40",
                  pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                  value: this.state.previusFirstName.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  formatText: "Primer Nombre Anterior: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusMiddleName"
                  },
                  "Segundo Nombre"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusMiddleName,
                  classNameAd: "hide",
                  id: "previusMiddleName",
                  name: "previusMiddleName",
                  minLength: "2",
                  maxLength: "40",
                  pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                  value: this.state.previusMiddleName.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  formatText: "Segundo Nombre Anterior: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "previusLastName"
                  },
                  "Apellidos"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.previusLastName,
                  classNameAd: "hide",
                  id: "previusLastName",
                  name: "previusLastName",
                  minLength: "2",
                  maxLength: "40",
                  pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                  value: this.state.previusLastName.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  formatText: "Apellidos Anteriores: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              )
            )
          ) : "",
          React.createElement(
            "div",
            {
              className: "form-row mt-4 form-height",
              style: { height: "2.5rem" }
            },
            React.createElement(
              "div",
              { className: "form-group col-10 text-left" },
              React.createElement(
                "p",
                null,
                "\xBFEs conocido por otro nombre?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(DropDownContent, {
                ref: this.referencies.otherName,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "otherName",
                name: "otherName",
                typeValue: "id",
                defaultValue: this.state.otherName.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.otherName.id == "S" ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "form-row mb-3  form-height " },
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "otherFirstName"
                  },
                  "Primer Nombre"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.otherFirstName,
                  classNameAd: "hide",
                  id: "otherFirstName",
                  name: "otherFirstName",
                  minLength: "2",
                  maxLength: "40",
                  pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                  value: this.state.otherFirstName.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  formatText: "Otro Primer Nombre: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "otherMiddleName"
                  },
                  "Segundo Nombre"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.otherMiddleName,
                  classNameAd: "hide",
                  id: "otherMiddleName",
                  name: "otherMiddleName",
                  minLength: "2",
                  maxLength: "40",
                  pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                  value: this.state.otherMiddleName.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  formatText: "Otro Segundo Nombre: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              ),
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "otherLastName"
                  },
                  "Apellidos"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.otherLastName,
                  classNameAd: "hide",
                  id: "otherLastName",
                  name: "otherLastName",
                  minLength: "2",
                  maxLength: "40",
                  pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                  value: this.state.otherLastName.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  formatText: "Otros Apellidos: La longitud tiene que ser mayor a 2, no debe tener caracteres especiales, no debe tener espacios dobles, no puede tener 3 o m\xE1s letras consecutivas iguales, no puede ser Otros, Desconocido, No posee, No aplica o Sin nombre.",
                  upperCase: true,
                  disabled: readOnly,
                  required: true
                })
              )
            )
          ) : ""
        );
      }
    }]);

    return FormPoint3;
  }(React.Component);

  return FormPoint3;
});