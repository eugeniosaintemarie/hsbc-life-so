var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/inputFileAddition", "../../common/inputvalidation", "../../common/dropdownContent", "../../common/datepicker", "../../common/modalReactBootstrap", "../../common/search", "../../controller/retiroNominaController", "../../controller/endososController"], function (React, InputFileAddition, InputValidation, DropDownContent, DatePicker, ModalReactBootstrap, Search, RetiroNominaController, EndososController) {
  var FormPoint2 = function (_React$Component) {
    _inherits(FormPoint2, _React$Component);

    function FormPoint2(props) {
      _classCallCheck(this, FormPoint2);

      var _this = _possibleConstructorReturn(this, (FormPoint2.__proto__ || Object.getPrototypeOf(FormPoint2)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      _this._handleServiceList = function (code, description) {
        _this.controller.getDeportesActividades(code, description.toUpperCase(), function (data) {
          if (data == undefined) {
            // this.setState({
            //     errorActividad: "Ha ocurrido un error al realizar la busqueda, intentá la modificación mas tarde"
            // })
          } else {
            _this.setState({
              depoActivitiesList: data
            });
          }
        });
      };

      _this._handleClearList = function () {
        _this.setState({
          depoActivitiesList: []
        });
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
              document.getElementById("applicantZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("applicantLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("applicantZipCode").removeAttribute("disabled");
              }
            }
          }
          if (id == "mailProvince") {
            if (result.id != 1) {
              _this.setState({ loadLocality2: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality2: false });
              });
              document.getElementById("mailZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("mailLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("mailZipCode").removeAttribute("disabled");
              }
            }
          }
          if (id == "fiscalProvince") {
            if (result.id != 1) {
              _this.setState({ loadLocality3: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality3: false });
              });
              document.getElementById("fiscalZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("fiscalLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("fiscalZipCode").removeAttribute("disabled");
              }
            }
          }
          if (id == "companyProvince") {
            if (result.id != 1) {
              _this.setState({ loadLocality4: true });
              _this.endososController.getLocalidadForm(result.id, function (list) {
                _this.setState({ localitiesList: list, loadLocality4: false });
              });
              document.getElementById("companyZipCode").setAttribute("disabled", "");
            } else {
              _this._handleResults("companyLocality", {
                id: "1",
                value: "CAPITAL FEDERAL"
              });
              if (!_this.props.readOnly) {
                document.getElementById("companyZipCode").removeAttribute("disabled");
              }
            }
          }
        }
      };

      _this._handleLocalityResult = function (id, result) {
        _this._handleResults(id, result);
        var aux = result.id.split("-");
        if (aux[1]) {
          //Validacion para utilizar esta funcion en las tres direcciones de este formulario
          if (id == "applicantLocality") {
            _this._handleResults("applicantZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
          if (id == "mailLocality") {
            _this._handleResults("mailZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
          if (id == "fiscalLocality") {
            _this._handleResults("fiscalZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
          if (id == "companyLocality") {
            _this._handleResults("companyZipCode", {
              value: result.id.split("-")[0],
              isValidate: true
            });
          }
        }
      };

      _this._fileChangedHandler = function (oInput) {
        var _validFileExtensions = [".jpg", ".png"];
        var listFiles = oInput.target.files;
        if (listFiles.length == 1) {
          var file = listFiles[0];
          var fileName = file.name;
          if (fileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
              var sCurExtension = _validFileExtensions[j];
              if (fileName.substr(fileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                blnValid = true;
                break;
              }
            }
            if (blnValid && file.size < 2000000) {
              _this.setState({ fileName: fileName });
            } else {
              _this.setState({
                fileName: "",
                showModal: true,
                modal: {
                  component: null,
                  contentHTML: "Tienes que elegir una imagen de extensión .jpg o .png y el tamaño no debe ser mayor a 2MB",
                  html: true,
                  title: "Carga de foto del DNI",
                  size: "md"
                }
              });
              return false;
            }
          }
        }
      };

      _this._handleModalIsOpen = function () {
        var current = _this.state.showModal;
        _this.setState({
          showModal: !current
        });
      };

      _this._handleFilterCountryList = function (itsSecondNationality) {
        var firstNationality = _this.state.applicantNacionality.value;
        var secondNationality = _this.state.applicantSecondNacionality.value;
        var thirdNationality = _this.state.applicantThirdNacionality.value;
        var newList = [];
        if (itsSecondNationality) {
          newList = _this.props.countriesList.filter(function (item) {
            return item.DESCRIPCION != firstNationality && item.DESCRIPCION != thirdNationality;
          });
        } else {
          newList = _this.props.countriesList.filter(function (item) {
            return item.DESCRIPCION != firstNationality && item.DESCRIPCION != secondNationality;
          });
        }
        return newList;
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$applicantFloor = _ref.applicantFloor,
          applicantFloor = _ref$applicantFloor === undefined ? "" : _ref$applicantFloor,
          _ref$applicantDepto = _ref.applicantDepto,
          applicantDepto = _ref$applicantDepto === undefined ? "" : _ref$applicantDepto,
          _ref$applicantLocalit = _ref.applicantLocality,
          applicantLocality = _ref$applicantLocalit === undefined ? "" : _ref$applicantLocalit,
          _ref$applicantTel = _ref.applicantTel,
          applicantTel = _ref$applicantTel === undefined ? "" : _ref$applicantTel,
          _ref$applicantProvinc = _ref.applicantProvince,
          applicantProvince = _ref$applicantProvinc === undefined ? "" : _ref$applicantProvinc,
          _ref$applicantAreaCod = _ref.applicantAreaCode,
          applicantAreaCode = _ref$applicantAreaCod === undefined ? "" : _ref$applicantAreaCod,
          _ref$applicantStreet = _ref.applicantStreet,
          applicantStreet = _ref$applicantStreet === undefined ? "" : _ref$applicantStreet,
          _ref$applicantZipCode = _ref.applicantZipCode,
          applicantZipCode = _ref$applicantZipCode === undefined ? "" : _ref$applicantZipCode,
          _ref$applicantTelPref = _ref.applicantTelPrefix,
          applicantTelPrefix = _ref$applicantTelPref === undefined ? "" : _ref$applicantTelPref,
          _ref$applicantStreetN = _ref.applicantStreetNumber,
          applicantStreetNumber = _ref$applicantStreetN === undefined ? "" : _ref$applicantStreetN,
          _ref$mailFloor = _ref.mailFloor,
          mailFloor = _ref$mailFloor === undefined ? "" : _ref$mailFloor,
          _ref$mailDepto = _ref.mailDepto,
          mailDepto = _ref$mailDepto === undefined ? "" : _ref$mailDepto,
          _ref$mailLocality = _ref.mailLocality,
          mailLocality = _ref$mailLocality === undefined ? "" : _ref$mailLocality,
          _ref$mailProvince = _ref.mailProvince,
          mailProvince = _ref$mailProvince === undefined ? "" : _ref$mailProvince,
          _ref$mailStreet = _ref.mailStreet,
          mailStreet = _ref$mailStreet === undefined ? "" : _ref$mailStreet,
          _ref$mailZipCode = _ref.mailZipCode,
          mailZipCode = _ref$mailZipCode === undefined ? "" : _ref$mailZipCode,
          _ref$mailStreetNumber = _ref.mailStreetNumber,
          mailStreetNumber = _ref$mailStreetNumber === undefined ? "" : _ref$mailStreetNumber,
          _ref$fiscalFloor = _ref.fiscalFloor,
          fiscalFloor = _ref$fiscalFloor === undefined ? "" : _ref$fiscalFloor,
          _ref$fiscalDepto = _ref.fiscalDepto,
          fiscalDepto = _ref$fiscalDepto === undefined ? "" : _ref$fiscalDepto,
          _ref$fiscalLocality = _ref.fiscalLocality,
          fiscalLocality = _ref$fiscalLocality === undefined ? "" : _ref$fiscalLocality,
          _ref$fiscalProvince = _ref.fiscalProvince,
          fiscalProvince = _ref$fiscalProvince === undefined ? "" : _ref$fiscalProvince,
          _ref$fiscalStreet = _ref.fiscalStreet,
          fiscalStreet = _ref$fiscalStreet === undefined ? "" : _ref$fiscalStreet,
          _ref$fiscalZipCode = _ref.fiscalZipCode,
          fiscalZipCode = _ref$fiscalZipCode === undefined ? "" : _ref$fiscalZipCode,
          _ref$fiscalStreetNumb = _ref.fiscalStreetNumber,
          fiscalStreetNumber = _ref$fiscalStreetNumb === undefined ? "" : _ref$fiscalStreetNumb,
          _ref$companyFloor = _ref.companyFloor,
          companyFloor = _ref$companyFloor === undefined ? "" : _ref$companyFloor,
          _ref$companyDepto = _ref.companyDepto,
          companyDepto = _ref$companyDepto === undefined ? "" : _ref$companyDepto,
          _ref$companyLocality = _ref.companyLocality,
          companyLocality = _ref$companyLocality === undefined ? "" : _ref$companyLocality,
          _ref$companyProvince = _ref.companyProvince,
          companyProvince = _ref$companyProvince === undefined ? "" : _ref$companyProvince,
          _ref$companyStreet = _ref.companyStreet,
          companyStreet = _ref$companyStreet === undefined ? "" : _ref$companyStreet,
          _ref$companyZipCode = _ref.companyZipCode,
          companyZipCode = _ref$companyZipCode === undefined ? "" : _ref$companyZipCode,
          _ref$companyStreetNum = _ref.companyStreetNumber,
          companyStreetNumber = _ref$companyStreetNum === undefined ? "" : _ref$companyStreetNum,
          _ref$applicantTypeDoc = _ref.applicantTypeDoc,
          applicantTypeDoc = _ref$applicantTypeDoc === undefined ? "" : _ref$applicantTypeDoc,
          _ref$applicantSurname = _ref.applicantSurname,
          applicantSurname = _ref$applicantSurname === undefined ? "" : _ref$applicantSurname,
          _ref$ApplicantFileNum = _ref.ApplicantFileNumber,
          ApplicantFileNumber = _ref$ApplicantFileNum === undefined ? "" : _ref$ApplicantFileNum,
          _ref$applicantCivilSt = _ref.applicantCivilStatus,
          applicantCivilStatus = _ref$applicantCivilSt === undefined ? "" : _ref$applicantCivilSt,
          _ref$applicantSexo = _ref.applicantSexo,
          applicantSexo = _ref$applicantSexo === undefined ? "" : _ref$applicantSexo,
          _ref$applicantFax = _ref.applicantFax,
          applicantFax = _ref$applicantFax === undefined ? "" : _ref$applicantFax,
          _ref$applicantBornPla = _ref.applicantBornPlace,
          applicantBornPlace = _ref$applicantBornPla === undefined ? "" : _ref$applicantBornPla,
          _ref$applicantName = _ref.applicantName,
          applicantName = _ref$applicantName === undefined ? "" : _ref$applicantName,
          _ref$applicantBornDat = _ref.applicantBornDate,
          applicantBornDate = _ref$applicantBornDat === undefined ? "" : _ref$applicantBornDat,
          _ref$applicantCompany = _ref.applicantCompanyEntryDate,
          applicantCompanyEntryDate = _ref$applicantCompany === undefined ? "" : _ref$applicantCompany,
          _ref$applicantNif = _ref.applicantNif,
          applicantNif = _ref$applicantNif === undefined ? "" : _ref$applicantNif,
          _ref$applicantTypeCui = _ref.applicantTypeCuit,
          applicantTypeCuit = _ref$applicantTypeCui === undefined ? "" : _ref$applicantTypeCui,
          _ref$applicantCuit = _ref.applicantCuit,
          applicantCuit = _ref$applicantCuit === undefined ? "" : _ref$applicantCuit,
          _ref$applicantDoc = _ref.applicantDoc,
          applicantDoc = _ref$applicantDoc === undefined ? "" : _ref$applicantDoc,
          _ref$applicantExposed = _ref.applicantExposed,
          applicantExposed = _ref$applicantExposed === undefined ? "" : _ref$applicantExposed,
          _ref$applicantSameAdd = _ref.applicantSameAddress,
          applicantSameAddress = _ref$applicantSameAdd === undefined ? "" : _ref$applicantSameAdd,
          _ref$applicantThirdNa = _ref.applicantThirdNacionality,
          applicantThirdNacionality = _ref$applicantThirdNa === undefined ? "" : _ref$applicantThirdNa,
          _ref$applicantSecondN = _ref.applicantSecondNacionality,
          applicantSecondNacionality = _ref$applicantSecondN === undefined ? "" : _ref$applicantSecondN,
          _ref$applicantWorkTel = _ref.applicantWorkTel,
          applicantWorkTel = _ref$applicantWorkTel === undefined ? "" : _ref$applicantWorkTel,
          _ref$applicantSpecial = _ref.applicantSpecialClient,
          applicantSpecialClient = _ref$applicantSpecial === undefined ? "" : _ref$applicantSpecial,
          _ref$applicantWorkAre = _ref.applicantWorkAreaCode,
          applicantWorkAreaCode = _ref$applicantWorkAre === undefined ? "" : _ref$applicantWorkAre,
          _ref$applicantMultipl = _ref.applicantMultipleNacionality,
          applicantMultipleNacionality = _ref$applicantMultipl === undefined ? "" : _ref$applicantMultipl,
          _ref$applicantOccupat = _ref.applicantOccupation,
          applicantOccupation = _ref$applicantOccupat === undefined ? "" : _ref$applicantOccupat,
          _ref$applicantCompany2 = _ref.applicantCompany,
          applicantCompany = _ref$applicantCompany2 === undefined ? "" : _ref$applicantCompany2,
          _ref$applicanCel = _ref.applicanCel,
          applicanCel = _ref$applicanCel === undefined ? "" : _ref$applicanCel,
          _ref$applicantRole = _ref.applicantRole,
          applicantRole = _ref$applicantRole === undefined ? "" : _ref$applicantRole,
          _ref$applicanCelPrefi = _ref.applicanCelPrefix,
          applicanCelPrefix = _ref$applicanCelPrefi === undefined ? "" : _ref$applicanCelPrefi,
          _ref$applicantStatus = _ref.applicantStatus,
          applicantStatus = _ref$applicantStatus === undefined ? "" : _ref$applicantStatus,
          _ref$applicantWorkTel2 = _ref.applicantWorkTelPrefix,
          applicantWorkTelPrefix = _ref$applicantWorkTel2 === undefined ? "" : _ref$applicantWorkTel2,
          _ref$applicantCelArea = _ref.applicantCelAreaCode,
          applicantCelAreaCode = _ref$applicantCelArea === undefined ? "" : _ref$applicantCelArea,
          _ref$applicantTitle = _ref.applicantTitle,
          applicantTitle = _ref$applicantTitle === undefined ? "" : _ref$applicantTitle,
          _ref$applicantBornCou = _ref.applicantBornCountry,
          applicantBornCountry = _ref$applicantBornCou === undefined ? "" : _ref$applicantBornCou,
          _ref$applicantNaciona = _ref.applicantNacionality,
          applicantNacionality = _ref$applicantNaciona === undefined ? "" : _ref$applicantNaciona,
          _ref$applicantDiferen = _ref.applicantDiferentAddress,
          applicantDiferentAddress = _ref$applicantDiferen === undefined ? "" : _ref$applicantDiferen,
          _ref$unavailableReaso = _ref.unavailableReason,
          unavailableReason = _ref$unavailableReaso === undefined ? "" : _ref$unavailableReaso,
          _ref$applicantSalary = _ref.applicantSalary,
          applicantSalary = _ref$applicantSalary === undefined ? "" : _ref$applicantSalary,
          _ref$companyActivity = _ref.companyActivity,
          companyActivity = _ref$companyActivity === undefined ? "" : _ref$companyActivity,
          _ref$tinNumber = _ref.tinNumber,
          tinNumber = _ref$tinNumber === undefined ? "" : _ref$tinNumber,
          _ref$countryTin = _ref.countryTin,
          countryTin = _ref$countryTin === undefined ? "" : _ref$countryTin,
          _ref$unavailableNif = _ref.unavailableNif,
          unavailableNif = _ref$unavailableNif === undefined ? "" : _ref$unavailableNif;

      _this.state = {
        fileName: _this.props.dniImage,
        applicantName: {
          value: applicantName,
          isValidate: false,
          required: true
        },
        applicantSurname: {
          value: applicantSurname,
          isValidate: false,
          required: true
        },
        ApplicantFileNumber: {
          value: ApplicantFileNumber,
          isValidate: false,
          required: true
        },
        applicantTypeDoc: { id: applicantTypeDoc, value: "", required: true },
        applicantDoc: {
          value: applicantDoc,
          isValidate: false,
          required: true
        },
        applicantTypeCuit: { id: applicantTypeCuit, value: "", required: true },
        applicantCuit: {
          value: applicantCuit,
          isValidate: false,
          required: true
        },
        applicantTitle: { id: applicantTitle, value: "", required: true },
        applicantBornDate: { value: applicantBornDate, required: true },
        applicantCompanyEntryDate: {
          value: applicantCompanyEntryDate,
          required: true
        },
        applicantBornPlace: {
          value: applicantBornPlace,
          isValidate: false,
          required: true
        },
        applicantBornCountry: {
          id: applicantBornCountry,
          value: "",
          required: true
        },
        applicantNacionality: {
          id: applicantNacionality,
          value: "",
          required: true
        },
        applicantMultipleNacionality: {
          id: applicantMultipleNacionality,
          value: "",
          required: true
        },
        applicantSecondNacionality: {
          id: applicantSecondNacionality,
          value: "",
          required: true
        },
        applicantThirdNacionality: {
          id: applicantThirdNacionality,
          value: "",
          required: true
        },
        applicantSexo: { id: applicantSexo, value: "", required: true },
        applicantCivilStatus: {
          id: applicantCivilStatus,
          value: "",
          required: true
        },
        applicantStreet: {
          value: applicantStreet,
          isValidate: false,
          required: true
        },
        applicantStreetNumber: {
          value: applicantStreetNumber,
          isValidate: false,
          required: true
        },
        applicantProvince: { id: applicantProvince, value: "", required: true },
        applicantLocality: { id: "", value: applicantLocality, required: true },
        applicantZipCode: {
          value: applicantZipCode,
          isValidate: false,
          required: true
        },
        applicantFloor: {
          value: applicantFloor,
          isValidate: false,
          required: true
        },
        applicantDepto: {
          value: applicantDepto,
          isValidate: false,
          required: true
        },
        applicantTelPrefix: {
          id: applicantTelPrefix,
          code: "",
          value: "",
          required: true
        },
        applicantAreaCode: {
          value: applicantAreaCode,
          isValidate: false,
          required: true
        },
        applicantTel: {
          value: applicantTel,
          isValidate: false,
          required: true
        },
        applicantFax: {
          value: applicantFax,
          isValidate: false,
          required: true
        },
        applicanCelPrefix: {
          id: applicanCelPrefix,
          code: "",
          value: "",
          required: true
        },
        applicantCelAreaCode: {
          value: applicantCelAreaCode,
          isValidate: false,
          required: true
        },
        applicanCel: { value: applicanCel, isValidate: false, required: true },
        applicantWorkTelPrefix: {
          id: applicantWorkTelPrefix,
          code: "",
          value: "",
          required: true
        },
        applicantWorkAreaCode: {
          value: applicantWorkAreaCode,
          isValidate: false,
          required: true
        },
        applicantWorkTel: {
          value: applicantWorkTel,
          isValidate: false,
          required: true
        },
        applicantDiferentAddress: {
          id: applicantDiferentAddress,
          isValidate: false,
          required: true
        },
        mailStreet: { value: mailStreet, isValidate: false, required: true },
        mailStreetNumber: {
          value: mailStreetNumber,
          isValidate: false,
          required: true
        },
        mailProvince: { id: mailProvince, value: "", required: true },
        mailLocality: { id: "", value: mailLocality, required: true },
        mailZipCode: { value: mailZipCode, isValidate: false, required: true },
        mailFloor: { value: mailFloor, isValidate: false, required: true },
        mailDepto: { value: mailDepto, isValidate: false, required: true },
        applicantSalary: {
          value: applicantSalary,
          isValidate: false,
          required: true
        },
        applicantSpecialClient: {
          id: applicantSpecialClient,
          value: "",
          required: true
        },
        applicantExposed: { id: applicantExposed, value: "", required: true },
        applicantSameAddress: { id: applicantSameAddress, value: "", required: true },
        fiscalStreet: {
          value: fiscalStreet,
          isValidate: false,
          required: true
        },
        fiscalStreetNumber: {
          value: fiscalStreetNumber,
          isValidate: false,
          required: true
        },
        fiscalProvince: { id: fiscalProvince, value: "", required: true },
        fiscalLocality: { id: "", value: fiscalLocality, required: true },
        fiscalZipCode: {
          value: fiscalZipCode,
          isValidate: false,
          required: true
        },
        fiscalFloor: { value: fiscalFloor, isValidate: false, required: true },
        fiscalDepto: { value: fiscalDepto, isValidate: false, required: true },
        applicantNif: { id: applicantNif, value: "", required: true },
        tinNumber: { id: tinNumber, value: "", required: true },
        countryTin: { id: countryTin, value: "", required: true },
        unavailableNif: { id: unavailableNif, value: "", required: true },
        unavailableReason: {
          value: unavailableReason,
          isValidate: false,
          required: true
        },
        applicantOccupation: {
          id: applicantOccupation,
          value: "",
          required: true
        },
        applicantStatus: { id: applicantStatus, value: "", required: true },
        applicantRole: { id: applicantRole, value: "", required: true },
        applicantCompany: {
          value: applicantCompany,
          isValidate: false,
          required: true
        },
        companyActivity: {
          value: companyActivity,
          isValidate: false,
          required: true
        },
        salary: { value: "", isValidate: false, required: true },
        companyStreet: {
          value: companyStreet,
          isValidate: false,
          required: true
        },
        companyStreetNumber: {
          value: companyStreetNumber,
          isValidate: false,
          required: true
        },
        companyProvince: { id: companyProvince, value: "", required: true },
        companyLocality: { id: "", value: companyLocality, required: true },
        companyZipCode: {
          value: companyZipCode,
          isValidate: false,
          required: true
        },
        companyFloor: {
          value: companyFloor,
          isValidate: false,
          required: true
        },
        companyDepto: {
          value: companyDepto,
          isValidate: false,
          required: true
        },
        localitiesList: [],
        titleList: [],
        depoActivitiesList: [],
        roleList: [],
        loadLocality: false,
        loadLocality2: false,
        loadLocality3: false,
        loadLocality4: false,
        showModal: false,
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

      _this.referencies = {
        photo: React.createRef(),
        applicantName: React.createRef(),
        applicantSurname: React.createRef(),
        applicantTypeDoc: React.createRef(),
        applicantDoc: React.createRef(),
        applicantTypeCuit: React.createRef(),
        applicantCuit: React.createRef(),
        applicantTitle: React.createRef(),
        applicantBornDate: React.createRef(),
        applicantBornPlace: React.createRef(),
        applicantBornCountry: React.createRef(),
        applicantNacionality: React.createRef(),
        applicantMultipleNacionality: React.createRef(),
        applicantSecondNacionality: React.createRef(),
        applicantThirdNacionality: React.createRef(),
        applicantSexo: React.createRef(),
        applicantCivilStatus: React.createRef(),
        applicantCompanyEntryDate: React.createRef(),
        applicantStreet: React.createRef(),
        applicantStreetNumber: React.createRef(),
        applicantProvince: React.createRef(),
        applicantLocality: React.createRef(),
        applicantZipCode: React.createRef(),
        applicantFloor: React.createRef(),
        applicantDepto: React.createRef(),
        applicantTelPrefix: React.createRef(),
        applicantAreaCode: React.createRef(),
        applicantTel: React.createRef(),
        applicantFax: React.createRef(),
        applicanCelPrefix: React.createRef(),
        applicantCelAreaCode: React.createRef(),
        applicanCel: React.createRef(),
        applicantWorkTelPrefix: React.createRef(),
        applicantWorkAreaCode: React.createRef(),
        applicantWorkTel: React.createRef(),
        applicantDiferentAddress: React.createRef(),
        mailStreet: React.createRef(),
        mailStreetNumber: React.createRef(),
        mailProvince: React.createRef(),
        mailLocality: React.createRef(),
        mailZipCode: React.createRef(),
        mailFloor: React.createRef(),
        mailDepto: React.createRef(),
        applicantSalary: React.createRef(),
        applicantSpecialClient: React.createRef(),
        applicantExposed: React.createRef(),
        applicantSameAddress: React.createRef(),
        fiscalStreet: React.createRef(),
        fiscalStreetNumber: React.createRef(),
        fiscalProvince: React.createRef(),
        fiscalLocality: React.createRef(),
        fiscalZipCode: React.createRef(),
        fiscalFloor: React.createRef(),
        fiscalDepto: React.createRef(),
        applicantNif: React.createRef(),
        tinNumber: React.createRef(),
        countryTin: React.createRef(),
        unavailableNif: React.createRef(),
        unavailableReason: React.createRef(),
        applicantOccupation: React.createRef(),
        applicantStatus: React.createRef(),
        applicantRole: React.createRef(),
        applicantCompany: React.createRef(),
        companyActivity: React.createRef(),
        salary: React.createRef(),
        companyStreet: React.createRef(),
        companyStreetNumber: React.createRef(),
        companyProvince: React.createRef(),
        companyLocality: React.createRef(),
        companyZipCode: React.createRef(),
        companyFloor: React.createRef(),
        companyDepto: React.createRef(),
        ApplicantFileNumber: React.createRef()
      };
      _this.endososController = new EndososController();
      _this.controller = new RetiroNominaController();
      _this.callRoleService = true;
      return _this;
    }

    _createClass(FormPoint2, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var readOnly = this.props.readOnly;

        return React.createElement(
          "form",
          null,
          React.createElement(
            "h6",
            null,
            "Datos b\xE1sicos"
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                { className: "font-size-ddben-beneficiary", htmlFor: "photo" },
                "Foto de DNI"
              ),
              React.createElement(InputFileAddition, {
                ref: this.referencies.photo,
                onChange: this._fileChangedHandler,
                fileName: this.state.fileName,
                id: "photo",
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
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
                disabled: readOnly,
                required: true
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
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantDoc"
                },
                "Legajo"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.ApplicantFileNumber,
                classNameAd: "hide",
                id: "ApplicantFileNumber",
                name: "ApplicantFileNumber",
                value: this.state.ApplicantFileNumber.value,
                className: "input-background-color form-control input-size text-center",
                formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
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
                  htmlFor: "applicantTypeDoc"
                },
                "Tipo Documento"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantTypeDoc,
                list: this.props.docTypeList,
                className: "input-background-color form-control input-size",
                id: "applicantTypeDoc",
                name: "applicantTypeDoc",
                idObject: "POV_COD_TDO",
                nameObject: "POV_DES_TDO",
                typeValue: "id",
                defaultValue: this.state.applicantTypeDoc.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantDoc"
                },
                "N\xFAmero Documento"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantDoc,
                classNameAd: "hide",
                id: "applicantDoc",
                name: "applicantDoc",
                minLength: "8",
                maxLength: "11",
                value: this.state.applicantDoc.value,
                className: "input-background-color form-control input-size text-center",
                formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantTypeCuit"
                },
                "CUIT/CUIL/CDI"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantTypeCuit,
                list: this.props.ciutList,
                className: "input-background-color form-control  input-size",
                id: "applicantTypeCuit",
                name: "applicantTypeCuit",
                typeValue: "id",
                defaultValue: this.state.applicantTypeCuit.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCuit"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantCuit,
                classNameAd: "hide",
                id: "applicantCuit",
                name: "applicantCuit",
                minLength: "8",
                maxLength: "11",
                value: this.state.applicantCuit.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Documento Solicitante: La longitud tiene que ser mayor a 8.",
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
                  htmlFor: "applicantTitle"
                },
                "T\xEDtulo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantTitle,
                list: this.state.titleList,
                className: "input-background-color form-control  input-size",
                id: "applicantTitle",
                name: "applicantTitle",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.applicantTitle.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantSexo"
                },
                "Sexo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantSexo,
                list: this.props.sexoList,
                className: "input-background-color form-control  input-size",
                id: "applicantSexo",
                name: "applicantSexo",
                typeValue: "id",
                defaultValue: this.state.applicantSexo.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
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
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCompanyEntryDate"
                },
                "Fecha de Ingreso a Empresa"
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DatePicker, {
                  ref: this.referencies.applicantCompanyEntryDate,
                  id: "applicantCompanyEntryDate",
                  name: "applicantCompanyEntryDate",
                  value: this.state.applicantCompanyEntryDate.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  required: true,
                  valueIsObject: true
                })
              )
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
                  htmlFor: "applicantBornDate"
                },
                "Fecha de Nacimiento"
              ),
              React.createElement(
                "div",
                { className: "dp-ddben" },
                React.createElement(DatePicker, {
                  ref: this.referencies.applicantBornDate,
                  id: "applicantBornDate",
                  name: "applicantBornDate",
                  value: this.state.applicantBornDate.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  disabled: readOnly,
                  required: true,
                  valueIsObject: true
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantBornPlace"
                },
                "Ciudad de Nacimiento"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantBornPlace,
                classNameAd: "hide",
                id: "applicantBornPlace",
                name: "applicantBornPlace",
                minLength: "4",
                maxLength: "20",
                value: this.state.applicantBornPlace.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                formatText: "Ciudad de Nacimiento Solicitante: La longitud debe ser mayor a 4.",
                upperCase: true,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantBornCountry"
                },
                "Pa\xEDs de Nacimiento"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantBornCountry,
                list: this.props.countriesList,
                className: "input-background-color form-control  input-size",
                id: "applicantBornCountry",
                name: "applicantBornCountry",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.applicantBornCountry.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantNacionality"
                },
                "Nacionalidad"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantNacionality,
                list: this.props.countriesList,
                className: "input-background-color form-control  input-size",
                id: "applicantNacionality",
                name: "applicantNacionality",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.applicantNacionality.id,
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
              { className: "form-group col-4 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantMultipleNacionality"
                },
                "Nacionalidad M\xFAltiple"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantMultipleNacionality,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "applicantMultipleNacionality",
                name: "applicantMultipleNacionality",
                typeValue: "id",
                defaultValue: this.state.applicantMultipleNacionality.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            this.state.applicantMultipleNacionality.id == "S" ? React.createElement(
              React.Fragment,
              null,
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "applicantSecondNacionality"
                  },
                  "Segunda Nacionalidad"
                ),
                React.createElement(DropDownContent, {
                  ref: this.referencies.applicantSecondNacionality,
                  list: this._handleFilterCountryList(true),
                  className: "input-background-color form-control  input-size",
                  id: "applicantSecondNacionality",
                  name: "applicantSecondNacionality",
                  idObject: "CODIGO",
                  nameObject: "DESCRIPCION",
                  typeValue: "id",
                  defaultValue: this.state.applicantSecondNacionality.id,
                  onResult: this._handleResults,
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
                    htmlFor: "applicantThirdNacionality"
                  },
                  "Tercera Nacionalidad"
                ),
                React.createElement(DropDownContent, {
                  ref: this.referencies.applicantThirdNacionality,
                  list: this._handleFilterCountryList(false),
                  className: "input-background-color form-control  input-size",
                  id: "applicantThirdNacionality",
                  name: "applicantThirdNacionality",
                  idObject: "CODIGO",
                  nameObject: "DESCRIPCION",
                  typeValue: "id",
                  defaultValue: this.state.applicantThirdNacionality.id,
                  onResult: this._handleResults,
                  disabled: readOnly
                })
              )
            ) : ""
          ),
          React.createElement(
            "h6",
            { className: "mt-3" },
            "Domicilio real - correspondencia"
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
                  htmlFor: "applicantStreetNumber"
                },
                "N\xFAmero"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantStreetNumber,
                classNameAd: "hide",
                id: "applicantStreetNumber",
                name: "applicantStreetNumber",
                minLength: "2",
                maxLength: "6",
                value: this.state.applicantStreetNumber.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Calle Solicitante: La longitud tiene que ser mayor a 2.",
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
                disabled: readOnly,
                required: true
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
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantZipCode"
                },
                "C.P."
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantZipCode,
                classNameAd: "hide",
                id: "applicantZipCode",
                name: "applicantZipCode",
                minLength: "2",
                maxLength: "6",
                value: this.state.applicantZipCode.value,
                className: "input-background-color form-control input-size",
                formatText: "C\xF3digo Postal Solicitante: La longitud tiene que ser mayor a 2.",
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
                  htmlFor: "applicantDepto"
                },
                "Depto"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantDepto,
                classNameAd: "hide",
                id: "applicantDepto",
                name: "applicantDepto",
                minLength: "0",
                maxLength: "3",
                value: this.state.applicantDepto.value,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
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
                  htmlFor: "applicantTelPrefix"
                },
                "Prefijo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantTelPrefix,
                list: this.props.prefixList,
                className: "input-background-color form-control  input-size",
                id: "applicantTelPrefix",
                name: "applicantTelPrefix",
                idObject: "PREFIJO",
                nameObject: "SHOWDESC",
                typeValue: "id",
                defaultValue: this.state.applicantTelPrefix.id,
                onResult: this._handleResults,
                disabled: readOnly,
                prefix: true,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantAreaCode"
                },
                "C. \xC1rea"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantAreaCode,
                classNameAd: "hide",
                id: "applicantAreaCode",
                name: "applicantAreaCode",
                minLength: "0",
                maxLength: "6",
                value: this.state.applicantAreaCode.value,
                className: "input-background-color form-control input-size",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantTel"
                },
                "Tel\xE9fono"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantTel,
                classNameAd: "hide",
                id: "applicantTel",
                name: "applicantTel",
                minLength: "6",
                maxLength: "12",
                value: this.state.applicantTel.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Tel\xE9fono Solicitante: La longitud tiene que ser mayor a 6.",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantFax"
                },
                "Fax"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantFax,
                classNameAd: "hide",
                id: "applicantFax",
                name: "applicantFax",
                minLength: "6",
                maxLength: "12",
                value: this.state.applicantFax.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Fax Solicitante: La longitud tiene que ser mayor a 6.",
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
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-2 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicanCelPrefix"
                },
                "Prefijo Celular"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicanCelPrefix,
                list: this.props.prefixList,
                className: "input-background-color form-control  input-size",
                id: "applicanCelPrefix",
                name: "applicanCelPrefix",
                idObject: "PREFIJO",
                nameObject: "SHOWDESC",
                typeValue: "id",
                defaultValue: this.state.applicanCelPrefix.id,
                onResult: this._handleResults,
                disabled: readOnly,
                prefix: true,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantCelAreaCode"
                },
                "C. \xC1rea"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantCelAreaCode,
                classNameAd: "hide",
                id: "applicantCelAreaCode",
                name: "applicantCelAreaCode",
                minLength: "0",
                maxLength: "6",
                value: this.state.applicantCelAreaCode.value,
                className: "input-background-color form-control input-size",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicanCel"
                },
                "Celular"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicanCel,
                classNameAd: "hide",
                id: "applicanCel",
                name: "applicanCel",
                minLength: "6",
                maxLength: "12",
                value: this.state.applicanCel.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Celular Solicitante: La longitud tiene que ser mayor a 6.",
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
                  htmlFor: "applicantWorkTelPrefix"
                },
                "Prefijo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantWorkTelPrefix,
                list: this.props.prefixList,
                className: "input-background-color form-control  input-size",
                id: "applicantWorkTelPrefix",
                name: "applicantWorkTelPrefix",
                idObject: "PREFIJO",
                nameObject: "SHOWDESC",
                typeValue: "id",
                defaultValue: this.state.applicantWorkTelPrefix.id,
                onResult: this._handleResults,
                disabled: readOnly,
                prefix: true,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-1 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantWorkAreaCode"
                },
                "C. \xC1rea"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantWorkAreaCode,
                classNameAd: "hide",
                id: "applicantWorkAreaCode",
                name: "applicantWorkAreaCode",
                minLength: "0",
                maxLength: "6",
                value: this.state.applicantWorkAreaCode.value,
                className: "input-background-color form-control input-size",
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
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantWorkTel"
                },
                "Tel\xE9fono Laboral"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantWorkTel,
                classNameAd: "hide",
                id: "applicantWorkTel",
                name: "applicantWorkTel",
                minLength: "6",
                maxLength: "12",
                value: this.state.applicantWorkTel.value,
                className: "input-background-color form-control input-size",
                formatText: "N\xFAmero Tel\xE9fono Laboral Solicitante: La longitud tiene que ser mayor a 6.",
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
                { className: "mt-2" },
                "Desea declarar un domicilio de correspondencia diferente"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantDiferentAddress,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "applicantDiferentAddress",
                name: "applicantDiferentAddress",
                typeValue: "id",
                defaultValue: this.state.applicantDiferentAddress.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.applicantDiferentAddress.id == "S" ? React.createElement(
            React.Fragment,
            null,
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
                    htmlFor: "mailStreet"
                  },
                  "Calle"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.mailStreet,
                  classNameAd: "hide",
                  id: "mailStreet",
                  name: "mailStreet",
                  minLength: "2",
                  maxLength: "20",
                  value: this.state.mailStreet.value,
                  className: "input-background-color form-control input-size",
                  formatText: "Calle Correspondencia: La longitud tiene que ser mayor a 2.",
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
                    htmlFor: "mailStreetNumber"
                  },
                  "N\xFAmero"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.mailStreetNumber,
                  classNameAd: "hide",
                  id: "mailStreetNumber",
                  name: "mailStreetNumber",
                  minLength: "2",
                  maxLength: "6",
                  value: this.state.mailStreetNumber.value,
                  className: "input-background-color form-control input-size",
                  formatText: "N\xFAmero Calle Correspondencia: La longitud tiene que ser mayor a 2.",
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
                    htmlFor: "mailFloor"
                  },
                  "Piso"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.mailFloor,
                  classNameAd: "hide",
                  id: "mailFloor",
                  name: "mailFloor",
                  minLength: "0",
                  maxLength: "3",
                  value: this.state.mailFloor.value,
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
                    htmlFor: "mailDepto"
                  },
                  "Depto"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.mailDepto,
                  classNameAd: "hide",
                  id: "mailDepto",
                  name: "mailDepto",
                  minLength: "0",
                  maxLength: "3",
                  value: this.state.mailDepto.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  upperCase: true,
                  disabled: readOnly
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-row mb-3 form-height " },
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "mailProvince"
                  },
                  "Provincia"
                ),
                React.createElement(DropDownContent, {
                  ref: this.referencies.mailProvince,
                  list: this.props.provincesList,
                  className: "input-background-color form-control input-size",
                  id: "mailProvince",
                  name: "mailProvince",
                  idObject: "COD_PRV",
                  nameObject: "DES_PRV",
                  typeValue: "id",
                  defaultValue: this.state.mailProvince.id,
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
                    htmlFor: "mailLocality"
                  },
                  "Localidad"
                ),
                this.state.loadLocality2 ? React.createElement(
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
                  ref: this.referencies.mailLocality,
                  list: this.state.localitiesList,
                  className: "input-background-color form-control input-size",
                  id: "mailLocality",
                  name: "mailLocality",
                  idObject: "CODPOS",
                  nameObject: "CALLE",
                  noAvilable: this.state.mailProvince.id == "1",
                  typeValue: "value",
                  defaultValue: this.state.mailLocality.value,
                  onResult: this._handleLocalityResult,
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
                    htmlFor: "mailZipCode"
                  },
                  "C. P."
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.mailZipCode,
                  classNameAd: "hide",
                  id: "mailZipCode",
                  name: "mailZipCode",
                  minLength: "2",
                  maxLength: "6",
                  value: this.state.mailZipCode.value,
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
                  // required
                })
              )
            )
          ) : "",
          React.createElement(
            "h6",
            null,
            "Datos fiscales"
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
                  htmlFor: "applicantOccupation"
                },
                "Ocupaci\xF3n/Profesion"
              ),
              React.createElement(Search, {
                classNameAd: "hide",
                ref: this.referencies.applicantOccupation,
                id: "applicantOccupation",
                name: "applicantOccupation",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                disabled: readOnly,
                minLength: "5",
                maxLength: "70",
                typeValue: "id",
                value: this.state.applicantOccupation.value,
                defaultID: this.state.applicantOccupation.id,
                className: "input-background-color form-control input-size",
                onResult: this._handleResults,
                dataList: this.state.depoActivitiesList,
                handleSeviceList: function handleSeviceList(id, value) {
                  _this2._handleServiceList(id, value);
                },
                clearList: this._handleClearList,
                onKeyPress: function onKeyPress(e) {
                  if (!e.key.match(/^[\D]+$/im)) {
                    e.preventDefault();
                  }
                },
                upperCase: true,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantStatus"
                },
                "Status del Empleo"
              ),
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantStatus,
                list: this.props.statusList,
                className: "input-background-color form-control  input-size",
                id: "applicantStatus",
                name: "applicantStatus",
                idObject: "CODIGO",
                nameObject: "DESCRIPCION",
                typeValue: "id",
                defaultValue: this.state.applicantStatus.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "div",
              { className: "form-group col-3 text-center" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "applicantSalary"
                },
                "Ingreso Mensual Aproximado"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.applicantSalary,
                classNameAd: "hide",
                id: "applicantSalary",
                name: "applicantSalary",
                minLength: "3",
                maxLength: "7",
                value: this.state.applicantSalary.value,
                className: "input-background-color form-control input-size",
                formatText: "Ingreso Mensual Aproximado: La longitud tiene que ser mayor a 3.",
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
            )
          ),
          React.createElement(
            "div",
            { className: "form-row pt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-4 mt-2" },
              React.createElement(
                "p",
                null,
                "\xBFEs cliente especial (SCC)?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantSpecialClient,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "applicantSpecialClient",
                name: "applicantSpecialClient",
                typeValue: "id",
                defaultValue: this.state.applicantSpecialClient.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "b",
              { "class": "ml-5 pt-2" },
              "*Cliente de categor\xEDa especial"
            )
          ),
          React.createElement(
            "div",
            { "class": "form-row pt-2  form-height " },
            React.createElement(
              "div",
              { className: "form-group col-4" },
              React.createElement(
                "p",
                null,
                "\xBFEs persona politicamente expuesta?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantExposed,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "applicantExposed",
                name: "applicantExposed",
                typeValue: "id",
                defaultValue: this.state.applicantExposed.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "a",
              {
                href: "http://servicios.infoleg.gob.ar/infolegInternet/anexos/315000-319999/316668/texact.htm",
                target: "_blank",
                "class": "text-decoration-none ml-5 pt-2"
              },
              "\xBFQu\xE9 es Pep?"
            )
          ),
          React.createElement(
            "div",
            { className: "form-row mt-2 form-height" },
            React.createElement(
              "div",
              { className: "form-group col-10" },
              React.createElement(
                "p",
                null,
                "\xBFEs su domicilio fiscal el mismo que su domicilio actual?"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantSameAddress,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "applicantSameAddress",
                name: "applicantSameAddress",
                typeValue: "id",
                defaultValue: this.state.applicantSameAddress.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.applicantSameAddress.id == "N" ? React.createElement(
            React.Fragment,
            null,
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
                    htmlFor: "fiscalStreet"
                  },
                  "Calle"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.fiscalStreet,
                  classNameAd: "hide",
                  id: "fiscalStreet",
                  name: "fiscalStreet",
                  minLength: "2",
                  maxLength: "20",
                  value: this.state.fiscalStreet.value,
                  className: "input-background-color form-control input-size",
                  formatText: "Calle Correspondencia: La longitud tiene que ser mayor a 2.",
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
                    htmlFor: "fiscalStreetNumber"
                  },
                  "N\xFAmero"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.fiscalStreetNumber,
                  classNameAd: "hide",
                  id: "fiscalStreetNumber",
                  name: "fiscalStreetNumber",
                  minLength: "2",
                  maxLength: "6",
                  value: this.state.fiscalStreetNumber.value,
                  className: "input-background-color form-control input-size",
                  formatText: "N\xFAmero Calle Correspondencia: La longitud tiene que ser mayor a 2.",
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
                    htmlFor: "fiscalFloor"
                  },
                  "Piso"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.fiscalFloor,
                  classNameAd: "hide",
                  id: "fiscalFloor",
                  name: "fiscalFloor",
                  minLength: "0",
                  maxLength: "3",
                  value: this.state.fiscalFloor.value,
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
                    htmlFor: "fiscalDepto"
                  },
                  "Depto"
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.fiscalDepto,
                  classNameAd: "hide",
                  id: "fiscalDepto",
                  name: "fiscalDepto",
                  minLength: "0",
                  maxLength: "3",
                  value: this.state.fiscalDepto.value,
                  className: "input-background-color form-control input-size",
                  onResult: this._handleResults,
                  upperCase: true,
                  disabled: readOnly
                })
              )
            ),
            React.createElement(
              "div",
              { className: "form-row mb-3 form-height " },
              React.createElement(
                "div",
                { className: "form-group col-4 text-center" },
                React.createElement(
                  "label",
                  {
                    className: "font-size-ddben-beneficiary",
                    htmlFor: "fiscalProvince"
                  },
                  "Provincia"
                ),
                React.createElement(DropDownContent, {
                  ref: this.referencies.fiscalProvince,
                  list: this.props.provincesList,
                  className: "input-background-color form-control input-size",
                  id: "fiscalProvince",
                  name: "fiscalProvince",
                  idObject: "COD_PRV",
                  nameObject: "DES_PRV",
                  typeValue: "id",
                  defaultValue: this.state.fiscalProvince.id,
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
                    htmlFor: "fiscalLocality"
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
                  ref: this.referencies.fiscalLocality,
                  list: this.state.localitiesList,
                  className: "input-background-color form-control input-size",
                  id: "fiscalLocality",
                  name: "fiscalLocality",
                  idObject: "CODPOS",
                  nameObject: "CALLE",
                  noAvilable: this.state.fiscalProvince.id == "1",
                  typeValue: "value",
                  defaultValue: this.state.fiscalLocality.value,
                  onResult: this._handleLocalityResult,
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
                    htmlFor: "fiscalZipCode"
                  },
                  "C. P."
                ),
                React.createElement(InputValidation, {
                  ref: this.referencies.fiscalZipCode,
                  classNameAd: "hide",
                  id: "fiscalZipCode",
                  name: "fiscalZipCode",
                  minLength: "2",
                  maxLength: "6",
                  value: this.state.fiscalZipCode.value,
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
                  // required
                })
              )
            )
          ) : "",
          React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
              "div",
              { className: "form-group col-10" },
              React.createElement(
                "p",
                { className: "m-0" },
                "N\xFAmero de Idenfificaci\xF3n Fiscal (NIF/TIN)"
              ),
              React.createElement(
                "small",
                null,
                "*Si es residente fiscal argentino informar numero de CUIL"
              )
            ),
            React.createElement(
              "div",
              { className: "form-group col-2 text-center mt-2" },
              React.createElement(DropDownContent, {
                ref: this.referencies.applicantNif,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "applicantNif",
                name: "applicantNif",
                typeValue: "id",
                defaultValue: this.state.applicantNif.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            )
          ),
          this.state.applicantNif.id == "S" && React.createElement(
            "div",
            { className: "form-group col-6 text-center" },
            React.createElement(
              "label",
              {
                className: "font-size-ddben-beneficiary",
                htmlFor: "tinNumber"
              },
              "TIN"
            ),
            React.createElement(InputValidation, {
              ref: this.referencies.tinNumber,
              classNameAd: "hide",
              id: "tinNumber",
              name: "tinNumber",
              minLength: "6",
              maxLength: "12",
              value: this.state.tinNumber.value,
              className: "input-background-color form-control input-size",
              formatText: "Tin: La longitud tiene que ser mayor a 6.",
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
          this.state.applicantNif.id == "N" ? React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "div",
              { className: "form-row form-height" },
              React.createElement(
                "div",
                { className: "form-group col-10" },
                React.createElement(
                  "p",
                  null,
                  "El pa\xEDs de residencia fiscal no emite n\xFAmero de TIN a sus residentes"
                )
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center mt-2" },
                React.createElement(DropDownContent, {
                  ref: this.referencies.countryTin,
                  list: this.props.booleanList,
                  className: "input-background-color form-control  input-size",
                  id: "countryTin",
                  name: "countryTin",
                  typeValue: "id",
                  defaultValue: this.state.countryTin.id,
                  onResult: this._handleResults,
                  disabled: readOnly,
                  required: true
                })
              )
            ),
            this.state.countryTin.id == "N" && React.createElement(
              "div",
              {
                className: "form-row form-height ",
                style: { height: "2.5rem" }
              },
              React.createElement(
                "div",
                { className: "form-group col-10" },
                React.createElement(
                  "p",
                  null,
                  "N\xFAmero de TIN no disponible por otros motivos"
                )
              ),
              React.createElement(
                "div",
                { className: "form-group col-2 text-center mt-2" },
                React.createElement(DropDownContent, {
                  ref: this.referencies.unavailableNif,
                  list: this.props.booleanList,
                  className: "input-background-color form-control  input-size",
                  id: "unavailableNif",
                  name: "unavailableNif",
                  typeValue: "id",
                  defaultValue: this.state.unavailableNif.id,
                  onResult: this._handleResults,
                  disabled: readOnly,
                  required: true
                })
              )
            ),
            this.state.unavailableNif.id == "S" && React.createElement(
              "div",
              { className: "form-group col-6 text-center p-0" },
              React.createElement(
                "label",
                {
                  className: "font-size-ddben-beneficiary",
                  htmlFor: "unavailableReason"
                },
                "Motivo Indisponibilidad N\xFAmero TIN"
              ),
              React.createElement(InputValidation, {
                ref: this.referencies.unavailableReason,
                classNameAd: "hide",
                id: "unavailableReason",
                name: "unavailableReason",
                minLength: "4",
                maxLength: "30",
                value: this.state.unavailableReason.value,
                className: "input-background-color form-control input-size",
                formatText: "Motivo TIN No Disponible: La longitud tiene que ser mayor a 4.",
                onResult: this._handleResults,
                upperCase: true,
                disabled: readOnly,
                required: true
              })
            )
          ) : "",
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
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        this.controller.getTitle(function (titleList) {
          _this3.setState({ titleList: titleList });
        });
      }
    }]);

    return FormPoint2;
  }(React.Component);

  return FormPoint2;
});