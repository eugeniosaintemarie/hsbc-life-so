var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/inputvalidation", "../../common/inputSearch", "../../common/dropdownContent", "../../common/datepicker", "../../common/loader", "../../services/abmNominaService", "../../lib/utils"], function (React, InputValidation, InputSearch, DropDownContent, DatePicker, Loader, AbmNominaService, Utils) {
  var FormIndividualNominee = function (_React$Component) {
    _inherits(FormIndividualNominee, _React$Component);

    function FormIndividualNominee(props) {
      _classCallCheck(this, FormIndividualNominee);

      var _this = _possibleConstructorReturn(this, (FormIndividualNominee.__proto__ || Object.getPrototypeOf(FormIndividualNominee)).call(this, props));

      _this._handleForm = function () {
        if (_this.props.plans.accPer.some(function (e) {
          return e == _this.ramoCod;
        })) {
          _this.setState({
            inputClasses: {
              name: "form-group col-4 text-center",
              surname: "form-group col-4 text-center",
              cuil: "form-group col-4 text-center",
              sexo: "form-group col-4 text-center",
              profeCod: "form-group col-4 text-center",
              saldoDeuda: "disappear",
              sumAseg: "form-group col-4 text-center",
              sueldo: "disappear",
              fecIng: "disappear",
              fecNac: "form-group col-4 text-center",
              email: "form-group col-4 text-center",
              emailVer: "form-group col-4 text-center"
            }, containerSize: "double_row"
          });
        }
        if (_this.props.plans.salDeu.some(function (e) {
          return e == _this.ramoCod;
        })) {
          _this.setState({
            inputClasses: {
              name: "form-group col-3 text-center",
              surname: "form-group col-3 text-center",
              cuil: "form-group col-3 text-center",
              sexo: "form-group col-3 text-center",
              profeCod: "disappear",
              saldoDeuda: "form-group col-3 text-center",
              sumAseg: "disappear",
              sueldo: "disappear",
              fecIng: "disappear",
              fecNac: "form-group col-3 text-center",
              email: "form-group col-3 text-center",
              emailVer: "form-group col-3 text-center"
            }, containerSize: "simple_row"
          });
        }
        if (_this.props.plans.vidaObl.some(function (e) {
          return e == _this.ramoCod;
        })) {
          _this.setState({
            inputClasses: {
              name: "form-group col-4 text-center",
              surname: "form-group col-4 text-center",
              cuil: "form-group col-4 text-center",
              sexo: "form-group col-3 text-center",
              profeCod: "disappear",
              saldoDeuda: "disappear",
              sumAseg: "disappear",
              sueldo: "disappear",
              fecIng: "disappear",
              fecNac: "form-group col-3 text-center",
              email: "form-group col-3 text-center",
              emailVer: "form-group col-3 text-center"
            }, containerSize: "simple_row"
          });
        }
        if (_this.ramoCod == _this.props.plans.vidaCe13) {
          _this.setState({
            inputClasses: {
              name: "form-group col-3 text-center",
              surname: "form-group col-3 text-center",
              cuil: "form-group col-3 text-center",
              sexo: "form-group col-3 text-center",
              profeCod: "disappear",
              saldoDeuda: "disappear",
              sumAseg: "form-group col-3 text-center",
              sueldo: "disappear",
              fecIng: "disappear",
              fecNac: "form-group col-3 text-center",
              email: "form-group col-3 text-center",
              emailVer: "form-group col-3 text-center"
            }, containerSize: "simple_row"
          });
        }
        if (_this.ramoCod == _this.props.plans.vidaCe15) {
          _this.setState({
            inputClasses: {
              name: "form-group col-3 text-center",
              surname: "form-group col-3 text-center",
              cuil: "form-group col-3 text-center",
              sexo: "form-group col-3 text-center",
              profeCod: "disappear",
              saldoDeuda: "disappear",
              sumAseg: "disappear",
              sueldo: "form-group col-3 text-center",
              fecIng: "disappear",
              fecNac: "form-group col-3 text-center",
              email: "form-group col-3 text-center",
              emailVer: "form-group col-3 text-center"
            }, containerSize: "simple_row"
          });
        }
        if (_this.props.plans.vidaColecOp.some(function (e) {
          return e == _this.ramoCod;
        })) {
          _this.setState({
            inputClasses: {
              name: "form-group col-4 text-center",
              surname: "form-group col-4 text-center",
              cuil: "form-group col-4 text-center",
              sexo: "form-group col-4 text-center",
              profeCod: "disappear",
              saldoDeuda: "disappear",
              sumAseg: "disappear",
              sueldo: "form-group col-4 text-center",
              fecIng: "form-group col-4 text-center",
              fecNac: "form-group col-4 text-center",
              email: "form-group col-4 text-center",
              emailVer: "form-group col-4 text-center"
            }, containerSize: "double_row"
          });
        }
      };

      _this._handleResults = function (id, result) {
        var _this$setState, _this$setState2, _this$setState6, _this$setState7;

        switch (id) {
          case "fecNac":
            var nacIsValid = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(result.value);
            !nacIsValid && _this.fNac == true ? _this.setState((_this$setState = {}, _defineProperty(_this$setState, id, result), _defineProperty(_this$setState, "errorFecNac", "Fecha inválida"), _this$setState)) : _this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, id, result), _defineProperty(_this$setState2, "errorFecNac", ""), _this$setState2));
            _this.fNac = true;
            break;
          case "cuil":
            result.value > 0 && result.value < 10000000000 ? _this.setState(_defineProperty({ errorCuil: "El campo debe tener 11 dígitos" }, id, result)) : !Utils.fValCUIT(result.value) && result.value > 0 ? _this.setState(_defineProperty({ errorCuil: "CUIL inválido" }, id, result)) : _this.setState(_defineProperty({ errorCuil: "" }, id, result));
            break;
          case "fecIng":
            var IngIsValid = /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(result.value);
            !IngIsValid && _this.fIng == true ? _this.setState((_this$setState6 = {}, _defineProperty(_this$setState6, id, result), _defineProperty(_this$setState6, "errorFecIng", "Fecha inválida"), _this$setState6)) : _this.setState((_this$setState7 = {}, _defineProperty(_this$setState7, id, result), _defineProperty(_this$setState7, "errorFecIng", ""), _this$setState7));
            _this.fIng = true;
            break;
          default:
            _this.setState(_defineProperty({}, id, result));
        }
        result.refe = _this.refes[id];
        _this.forms[id] = result;
        _this.props.onResult(_this.props.id, _this.forms);
      };

      _this._handleDateResults = function (id, result) {
        var data = { value: result /*,isValidate: false*/ };
        _this._handleResults(id, data);
      };

      _this._handleOnClick = function () {
        if (_this.state.profeCod.isValidate == false) {
          _this.props.showError("Para realizar la busqueda de la actividad se necesitan por lo menos 5 caracteres");
        } else {
          _this.props.showError("");
          _this.setState({ loader: true });
          _this.abmNominaService.getActividadesColectivo({
            CIAASCOD: _this.props.product.cup.CIAASCOD,
            PRODUCTO: _this.props.product.ramopcod,
            PROFECOD: "",
            PROFEDES: _this.state.profeCod.value
          }).then(function (data) {
            if (data == undefined || data.Code != "NO_ERROR") {
              _this.props.showError("Ha ocurrido un error al realizar la busqueda, intentá la modificación mas tarde");
              _this.setState({ loader: false });
            } else {
              _this.activitiesList = data.Message.DATOS.ACTIVIDADES.ACTIVIDAD;
              _this.setState({ loader: false });
            }
          });
        }
      };

      var NOMINAS = _this.props.selectedNominee;
      var _NOMINAS$CLIENOM = NOMINAS.CLIENOM,
          CLIENOM = _NOMINAS$CLIENOM === undefined ? "" : _NOMINAS$CLIENOM,
          _NOMINAS$CLIENAP = NOMINAS.CLIENAP1,
          CLIENAP1 = _NOMINAS$CLIENAP === undefined ? "" : _NOMINAS$CLIENAP,
          _NOMINAS$DOCUMDAT = NOMINAS.DOCUMDAT,
          DOCUMDAT = _NOMINAS$DOCUMDAT === undefined ? "" : _NOMINAS$DOCUMDAT,
          _NOMINAS$SEXO = NOMINAS.SEXO,
          SEXO = _NOMINAS$SEXO === undefined ? "" : _NOMINAS$SEXO,
          _NOMINAS$FECNAC = NOMINAS.FECNAC,
          FECNAC = _NOMINAS$FECNAC === undefined ? "" : _NOMINAS$FECNAC,
          _NOMINAS$FECING = NOMINAS.FECING,
          FECING = _NOMINAS$FECING === undefined ? "" : _NOMINAS$FECING,
          _NOMINAS$PROFECOD = NOMINAS.PROFECOD,
          PROFECOD = _NOMINAS$PROFECOD === undefined ? "" : _NOMINAS$PROFECOD,
          _NOMINAS$SALDODEUDA = NOMINAS.SALDODEUDA,
          SALDODEUDA = _NOMINAS$SALDODEUDA === undefined ? "" : _NOMINAS$SALDODEUDA,
          _NOMINAS$COBERTURAS = NOMINAS.COBERTURAS,
          COBERTURAS = _NOMINAS$COBERTURAS === undefined ? "" : _NOMINAS$COBERTURAS,
          _NOMINAS$SUELDO = NOMINAS.SUELDO,
          SUELDO = _NOMINAS$SUELDO === undefined ? "" : _NOMINAS$SUELDO,
          _NOMINAS$EMAIL = NOMINAS.EMAIL,
          EMAIL = _NOMINAS$EMAIL === undefined ? "" : _NOMINAS$EMAIL,
          _NOMINAS$EMAILVER = NOMINAS.EMAILVER,
          EMAILVER = _NOMINAS$EMAILVER === undefined ? "" : _NOMINAS$EMAILVER;


      _this.state = {
        loader: false,
        containerSize: "",
        inputClasses: {
          name: "",
          surname: "",
          cuil: "",
          sexo: "",
          profeCod: "",
          saldoDeuda: "",
          sumAseg: "",
          sueldo: "",
          fecIng: "",
          fecNac: "",
          email: "",
          emailVer: ""
        },
        name: { value: CLIENOM, isValidate: false },
        surname: { value: CLIENAP1, isValidate: false },
        cuil: { value: DOCUMDAT, isValidate: false },
        sexo: { id: SEXO, value: SEXO },
        fecIng: { value: FECING, isValidate: false },
        fecNac: { value: FECNAC, isValidate: false },
        profeCod: { value: PROFECOD, isValidate: false },
        saldoDeuda: { value: SALDODEUDA, isValidate: false },
        sumAseg: { value: !COBERTURAS.COBERTURA ? COBERTURAS : COBERTURAS.COBERTURA[0].SUMAASEG, isValidate: false },
        sueldo: { value: SUELDO, isValidate: false },
        email: { value: EMAIL, isValidate: false },
        emailVer: { value: EMAILVER, isValidate: false },
        errorCuil: "",
        errorFecIng: "",
        errorFecNac: "",
        errorEmailVer: ""
      };

      _this.forms = {};
      _this.ramoCod = _this.props.ramoCod;
      _this.activitiesList = [];
      _this.profDescrip = "";
      _this.abmNominaService = new AbmNominaService();
      _this.fNac = false;
      _this.fIng = false;

      _this.refes = {
        //Input
        name: React.createRef(),
        surname: React.createRef(),
        cuil: React.createRef(),
        profeCod: React.createRef(),
        saldoDeuda: React.createRef(),
        sumAseg: React.createRef(),
        sueldo: React.createRef(),
        email: React.createRef(),
        emailVer: React.createRef(),

        //DropDown
        sexo: React.createRef(),

        //Datepicker
        fecIng: React.createRef(),
        fecNac: React.createRef()
      };
      return _this;
    }

    _createClass(FormIndividualNominee, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        // Condicion para que se ejecute solo en los ramos que corresponde
        if (this.props.plans.accPer.some(function (e) {
          return e == _this2.ramoCod;
        }) && this.props.selectedNominee.PROFECOD != undefined) {
          var profDescrip = "";
          this._handleResults("profeCod", { id: this.props.selectedNominee.PROFECOD }); // Guarda el Id de la profesion por si no se modifica
          this.setState({ loader: true });
          this.abmNominaService.getActividadesColectivo({
            CIAASCOD: this.props.product.cup.CIAASCOD,
            PRODUCTO: this.props.product.ramopcod,
            PROFECOD: this.props.selectedNominee.PROFECOD,
            PROFEDES: ""
          }).then(function (data) {
            if (data == undefined || data.Code != "NO_ERROR") {
              _this2.props.showError("Ha ocurrido un error, intentá la modificación mas tarde");
              _this2.setState({ loader: false });
            } else {
              profDescrip = data.Message.DATOS.ACTIVIDADES.ACTIVIDAD[0].DESCRIPCIONC;
              _this2.setState({ loader: false, profeCod: { value: profDescrip, isValidate: true } });
            }
          });
        }
        this._handleForm();
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;

        var _props = this.props,
            id = _props.id,
            _props$onlyView = _props.onlyView,
            onlyView = _props$onlyView === undefined ? false : _props$onlyView;


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
                { className: this.state.inputClasses.name },
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
                    pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
                    invalidStr: "El campo no tiene formato correcto",
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
                { className: this.state.inputClasses.surname },
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
                    disabled: this.props.isEdit,
                    minLength: "2",
                    maxLength: "40",
                    invalidStr: "El campo no tiene formato correcto",
                    pattern: "^(?!DESCONOCIDO$)(?!OTROS$)(?!NO POSEE$)(?!NO APLICA$)(?!SIN NOMBRE$)(?!DESCONOCIDO $)(?!OTROS $)(?!NO POSEE $)(?!NO APLICA $)(?!SIN NOMBRE $)(?!.*(.)\\1{2})[A-Z\xD1]+ ?[[A-Z\xD1]+ ?([[A-Z\xD1]+)?$",
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
                { className: this.state.inputClasses.cuil },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "cuil" },
                  "Cuil"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(InputValidation, {
                    ref: this.refes.cuil,
                    id: "cuil",
                    name: "cuil",
                    disabled: this.props.isEdit,
                    minLength: "0",
                    maxLength: "11",
                    pattern: "^[\\d]{11}$",
                    value: this.state.cuil.value,
                    className: "input-background-color form-control input-size text-center",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (isNaN(e.key)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                      "div",
                      null,
                      this.state.errorCuil
                    )
                  )
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.sexo },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "sexo" },
                  "Sexo"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(DropDownContent, {
                    ref: this.refes.sexo,
                    list: [{ id: 'M', name: 'MASCULINO' }, { id: 'F', name: 'FEMENINO' }],
                    className: "input-background-color form-control input-size",
                    id: "sexo",
                    name: "sexo",
                    disabled: onlyView,
                    typeValue: "id",
                    defaultValue: this.state.sexo.value,
                    defaultName: true,
                    onResult: this._handleResults
                  })
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.fecNac },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "fecNac" },
                  "Fecha de nacimiento"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(DatePicker, {
                    ref: this.refes.fecNac,
                    className: "input-background-color form-control input-size",
                    name: "fecNac",
                    id: "fecNac",
                    pattern: "^\\[0-9]{2}[-|\\/]{1}[0-9]{2}[-|\\/]{1}[0-9]{4}$",
                    minLength: "0",
                    disabled: onlyView,
                    value: this.state.fecNac.value,
                    formatValue: true,
                    formatType: "YYYY/MM/DD",
                    maxDate: this.props.plans.vidaColecOp.some(function (e) {
                      return e == _this3.ramoCod;
                    }) ? minAge = new Date(new Date().getFullYear() - 15, new Date().getMonth(), new Date().getDate()) : yesterday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                    onResult: this._handleDateResults
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                      "div",
                      null,
                      this.state.errorFecNac
                    )
                  )
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.profeCod },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "profeCod" },
                  "Actividad"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(InputSearch, {
                    classNameAd: "hide",
                    ref: this.refes.profeCod,
                    id: "profeCod",
                    name: "profeCod",
                    disabled: onlyView,
                    minLength: "5",
                    maxLength: "70",
                    value: this.state.profeCod.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    dataList: this.activitiesList,
                    onClick: this._handleOnClick,
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
                { className: this.state.inputClasses.saldoDeuda },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "saldoDeuda" },
                  "Saldo deuda"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(InputValidation, {
                    ref: this.refes.saldoDeuda,
                    id: "saldoDeuda",
                    name: "saldoDeuda",
                    disabled: onlyView,
                    minLength: "0",
                    maxLength: "30",
                    invalidStr: "Debe tener un maximo de 7 digitos y 2 decimales",
                    pattern: "^\\d+,\\d\\d$",
                    value: this.state.saldoDeuda.value,
                    className: "input-background-color form-control input-size text-center",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (!e.key.match(/^\d?,?$/m)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true
                  })
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.sumAseg },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "sumAseg" },
                  "Suma asegurada"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(InputValidation, {
                    ref: this.refes.sumAseg,
                    id: "sumAseg",
                    name: "sumAseg",
                    disabled: onlyView,
                    minLength: "0",
                    maxLength: "30",
                    invalidStr: "Debe tener un maximo de 7 digitos y 2 decimales",
                    pattern: "^\\d+,\\d\\d$",
                    value: this.state.sumAseg.value,
                    className: "input-background-color form-control input-size text-center",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (!e.key.match(/^\d?,?$/m)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true
                  })
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.sueldo },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "sueldo" },
                  "Sueldo"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(InputValidation, {
                    ref: this.refes.sueldo,
                    id: "sueldo",
                    name: "sueldo",
                    disabled: onlyView,
                    minLength: "0",
                    maxLength: "10",
                    pattern: "^\\d+,\\d\\d$",
                    value: this.state.sueldo.value,
                    invalidStr: "Debe tener un maximo de 7 digitos y 2 decimales",
                    className: "input-background-color form-control input-size text-center",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (!e.key.match(/^\d?,?$/m)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true
                  })
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.fecIng },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "fecIng" },
                  "Fecha de ingreso"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(DatePicker, {
                    ref: this.refes.fecIng,
                    className: "input-background-color form-control input-size",
                    name: "fecIng",
                    id: "fecIng",
                    pattern: "^\\[0-9]{2}[-|\\/]{1}[0-9]{2}[-|\\/]{1}[0-9]{4}$",
                    minLength: "0",
                    disabled: onlyView,
                    requiredStr: "Instituci\xF3n requerido",
                    nvalidStr: "El campo no tiene formato correcto",
                    value: this.state.fecIng.value,
                    formatValue: true,
                    formatType: "YYYY/MM/DD",
                    maxDate: yesterday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
                    onResult: this._handleDateResults
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                      "div",
                      null,
                      this.state.errorFecIng
                    )
                  )
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.email },
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
                    maxLength: "50",
                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                    invalidStr: "El campo no tiene formato correcto",
                    value: this.state.email.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (e.key.match(/^\s$/m)) {
                        e.preventDefault();
                      }
                    },
                    upperCase: true
                  })
                )
              ),
              React.createElement(
                "div",
                { className: this.state.inputClasses.email },
                React.createElement(
                  "label",
                  { className: "font-size-ddben-beneficiary", htmlFor: "emailVer" },
                  "Reescriba correo electr\xF3nico"
                ),
                React.createElement(
                  "div",
                  { className: "" },
                  React.createElement(InputValidation, {
                    classNameAd: "hide",
                    ref: this.refes.emailVer,
                    id: "emailVer",
                    name: "emailVer",
                    disabled: onlyView,
                    minLength: "0",
                    maxLength: "50",
                    pattern: "[A-z0-9._%+-]+@[A-z0-9.-]+\\.[A-z]{2,3}$",
                    value: this.state.emailVer.value,
                    className: "input-background-color form-control input-size",
                    onResult: this._handleResults,
                    onKeyPress: function onKeyPress(e) {
                      if (e.key.match(/^\s$/m)) {
                        e.preventDefault();
                      }
                    },
                    blockPasted: true,
                    upperCase: true
                  }),
                  React.createElement(
                    "div",
                    { className: "alert alert-danger" },
                    React.createElement(
                      "div",
                      null,
                      this.state.errorEmailVer
                    )
                  )
                )
              )
            ),
            React.createElement("div", { className: this.state.containerSize }),
            " "
          ),
          React.createElement(
            "div",
            null,
            this.state.loader && React.createElement(Loader, { width: "2rem", height: "2rem", fullscreen: true, text: "Cargando" })
          )
        );
      }
    }]);

    return FormIndividualNominee;
  }(React.Component);

  return FormIndividualNominee;
});