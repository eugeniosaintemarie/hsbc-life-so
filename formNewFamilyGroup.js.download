var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../../common/inputvalidation", "../../../../common/dropdownContent", "../../../../controller/endososController", "../../../../controller/beneficiariosController", "../../../../common/loader", "../../../../common/datepicker"], function (React, InputValidation, DropDownContent, EndososController, BeneficiariosController, Loader, DatePicker) {
  var FormNewFamilyGroup = function (_React$Component) {
    _inherits(FormNewFamilyGroup, _React$Component);

    function FormNewFamilyGroup(props) {
      var _this$refes;

      _classCallCheck(this, FormNewFamilyGroup);

      var _this = _possibleConstructorReturn(this, (FormNewFamilyGroup.__proto__ || Object.getPrototypeOf(FormNewFamilyGroup)).call(this, props));

      _this._handleResults = function (id, result) {
        _this.setState(_defineProperty({}, id, result));
        result.refe = _this.refes[id];
        _this.forms[id] = result;
        _this.props.onResult(_this.props.id, _this.forms);
      };

      _this._handleBirthDayResults = function (id, result) {
        var data = { value: result };
        _this._handleResults(id, data);
      };

      var _ref = _this.props.selectedItem ? _this.props.selectedItem : {},
          _ref$NOMINAS = _ref.NOMINAS,
          NOMINAS = _ref$NOMINAS === undefined ? {} : _ref$NOMINAS;

      var _NOMINAS$BENNOMBRE = NOMINAS.BENNOMBRE,
          BENNOMBRE = _NOMINAS$BENNOMBRE === undefined ? "" : _NOMINAS$BENNOMBRE,
          _NOMINAS$APEBENE = NOMINAS.APEBENE,
          APEBENE = _NOMINAS$APEBENE === undefined ? "" : _NOMINAS$APEBENE,
          _NOMINAS$TIPDOCBENE = NOMINAS.TIPDOCBENE,
          TIPDOCBENE = _NOMINAS$TIPDOCBENE === undefined ? "" : _NOMINAS$TIPDOCBENE,
          _NOMINAS$NUMDOCBENE = NOMINAS.NUMDOCBENE,
          NUMDOCBENE = _NOMINAS$NUMDOCBENE === undefined ? "" : _NOMINAS$NUMDOCBENE,
          _NOMINAS$RELBECOD = NOMINAS.RELBECOD,
          RELBECOD = _NOMINAS$RELBECOD === undefined ? "" : _NOMINAS$RELBECOD,
          _NOMINAS$FNACIMIE = NOMINAS.FNACIMIE,
          FNACIMIE = _NOMINAS$FNACIMIE === undefined ? "" : _NOMINAS$FNACIMIE;


      _this.state = {
        loaded: false,
        name: { value: BENNOMBRE, isValidate: false },
        surname: { value: APEBENE, isValidate: false },
        typeDoc: { id: TIPDOCBENE, value: "" },
        dniNumber: { value: NUMDOCBENE, isValidate: false },
        relationShip: { id: RELBECOD, value: "" },
        birthday: { value: FNACIMIE }
      };

      _this.beneficiariosController = new BeneficiariosController();
      _this.endososController = new EndososController();
      _this.forms = {};

      _this.refes = (_this$refes = {
        name: React.createRef(),
        surname: React.createRef(),
        typeDoc: React.createRef(),
        dniNumber: React.createRef(),
        relationShip: React.createRef()
      }, _defineProperty(_this$refes, "birthday" + _this.props.id, React.createRef()), _defineProperty(_this$refes, "InputValidation", React.createRef()), _this$refes);

      _this.locationLoad = false;
      return _this;
    }

    _createClass(FormNewFamilyGroup, [{
      key: "render",
      value: function render() {
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
                { className: "form-row " },
                React.createElement(
                  "div",
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "surname"
                    },
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
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "birthday" + id
                    },
                    "Fec.Nacimiento"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DatePicker, {
                      ref: this.refes["birthday" + id],
                      className: "input-background-color form-control input-size",
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
                  { className: "form-group col-3 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "relationShip"
                    },
                    "Relacion/Parentesco"
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
                      idObject: "GRUPOCOD",
                      nameObject: "GRUPODES",
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
                { className: "form-row form-height" },
                React.createElement(
                  "div",
                  { className: "form-group col-2 text-center" },
                  React.createElement(
                    "label",
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "typeDoc"
                    },
                    "Tipo Documento"
                  ),
                  React.createElement(
                    "div",
                    { className: "" },
                    React.createElement(DropDownContent, {
                      ref: this.refes.typeDoc,
                      list: this.props.listTipoDoc,
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
                    {
                      className: "font-size-ddben-beneficiary",
                      htmlFor: "dniNumber"
                    },
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
              )
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
        //     let listParentestco = listPoliza.GRUPOS.GRUPO.filter(e=>parseInt(e.GRUPOCOD) != 1)
        //     this.endososController.getWsFormBeneficiary((ws) => {
        this.setState({
          //         listTipoDoc: ws.listTipoDoc,
          //         listParentestco, 
          loaded: true
        });
        //     });
      }
    }]);

    return FormNewFamilyGroup;
  }(React.Component);

  return FormNewFamilyGroup;
});