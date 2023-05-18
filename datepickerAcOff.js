var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../libs/react/js/react-input-mask.min"], function (React, InputMask) {
  var DatePickerAcOff = function (_React$Component) {
    _inherits(DatePickerAcOff, _React$Component);

    function DatePickerAcOff(props) {
      _classCallCheck(this, DatePickerAcOff);

      var _this = _possibleConstructorReturn(this, (DatePickerAcOff.__proto__ || Object.getPrototypeOf(DatePickerAcOff)).call(this, props));

      _this._onFocus = function (e) {
        $("#" + _this.props.id).addClass("input-invalid");
      };

      _this._formatFechaString = function (date) {
        var _this$props$formatTyp = _this.props.formatType,
            formatType = _this$props$formatTyp === undefined ? "" : _this$props$formatTyp;


        var day = void 0;
        var month = void 0;
        var year = void 0;

        var dateString = date.toString();

        if (formatType == "YYYY/MM/DD") {
          day = dateString.substring(6);
          month = dateString.substring(4, 6);
          year = dateString.substring(0, 4);
        } else {
          day = dateString.substring(0, 2);
          month = dateString.substring(2, 4);
          year = dateString.substring(4);
        }
        return day + "/" + month + "/" + year;
      };

      _this._loadDatePicker = function () {
        var self = _this;
        var _this$props = _this.props,
            _this$props$maxDate = _this$props.maxDate,
            maxDate = _this$props$maxDate === undefined ? self.props.maxDate : _this$props$maxDate,
            _this$props$minDate = _this$props.minDate,
            minDate = _this$props$minDate === undefined ? "" : _this$props$minDate,
            _this$props$value = _this$props.value,
            value = _this$props$value === undefined ? "" : _this$props$value,
            _this$props$format = _this$props.format,
            format = _this$props$format === undefined ? "dd/mm/yy" : _this$props$format,
            _this$props$formatVal = _this$props.formatValue,
            formatValue = _this$props$formatVal === undefined ? false : _this$props$formatVal,
            _this$props$id = _this$props.id,
            id = _this$props$id === undefined ? "" : _this$props$id,
            _this$props$mask = _this$props.mask,
            mask = _this$props$mask === undefined ? "00/00/0000" : _this$props$mask,
            _this$props$placeHold = _this$props.placeHolder,
            placeHolder = _this$props$placeHold === undefined ? "DD/MM/AAAA" : _this$props$placeHold;

        var htmlElement = $("#" + id);

        var valueDefault = formatValue == true ? value != "" ? _this._formatFechaString(value) : value : value;
        var dataPicker = {
          dateFormat: format,
          yearRange: "c-100:c+20",
          maxDate: maxDate,
          minDate: minDate,
          changeMonth: true,
          changeYear: true,
          monthNamesShort: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
          dayNamesMin: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "S&aacuteb"],
          onClose: function onClose(e) {
            var _self$props = self.props,
                id = _self$props.id,
                valueIsObject = _self$props.valueIsObject,
                onResult = _self$props.onResult,
                required = _self$props.required;

            var input = document.getElementById(id);
            var inputDate = e;
            self.setState({ value: inputDate });

            // Fecha escrita en el input
            var fecha = e.split("/");
            var dia = parseInt(fecha[0], 10);
            var mes = parseInt(fecha[1], 10) - 1;
            var anio = parseInt(fecha[2], 10);
            var date = new Date(anio, mes, dia);

            // Fecha del dia actual
            var fechaAct = maxDate.split("/");
            var diaAct = parseInt(fechaAct[0], 10);
            var mesAct = parseInt(fechaAct[1], 10) - 1;
            var anioAct = parseInt(fechaAct[2], 10);
            var dateAct = new Date(anioAct, mesAct, diaAct);

            var regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;

            if (!regexFecha.test(e)) {
              htmlElement.addClass("input-invalid");
            } else if (date.getFullYear() !== anio || date.getMonth() !== mes || date.getDate() !== dia) {
              htmlElement.addClass("input-invalid");
            } else if (date > dateAct) {
              self.setState({ value: maxDate });
              inputDate = maxDate;
              input.value = maxDate;
            } else {
              htmlElement.removeClass("input-invalid");
            }

            //Validacion para que funcione onFocus retiro colectivo
            var isRequired = required ? true : false;
            if (valueIsObject) {
              onResult(id, {
                value: inputDate,
                required: isRequired
              });
            } else {
              onResult(id, inputDate);
            }

            input.blur();
          }
        };
        htmlElement.datepicker(dataPicker);
        htmlElement.mask(mask, { placeholder: placeHolder });
        htmlElement.datepicker("setDate", valueDefault);
      };

      _this.state = {
        value: "",
        reloadable: false
      };
      return _this;
    }

    _createClass(DatePickerAcOff, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.reloadable) {
          this.setState({
            reloadable: true
          });
        }

        //adecuado para tener varios datepickers
        this._loadDatePicker();
        var _props = this.props,
            _props$value = _props.value,
            value = _props$value === undefined ? "" : _props$value,
            _props$formatValue = _props.formatValue,
            formatValue = _props$formatValue === undefined ? false : _props$formatValue;

        var valueDefault = formatValue == true ? value != "" ? this._formatFechaString(value) : value : value;
        //Validacion para que funcione onFocus retiro colectivo
        if (this.props.valueIsObject) {
          this.props.onResult(this.props.name, {
            value: valueDefault,
            required: this.props.required ? true : false
          });
        } else {
          this.props.onResult(this.props.name, valueDefault);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _props2 = this.props,
            disabled = _props2.disabled,
            className = _props2.className,
            id = _props2.id,
            name = _props2.name;


        if (this.state.reloadable) {
          this._loadDatePicker();
        }

        return React.createElement(InputMask, {
          type: "text",
          autocomplete: "cc-csc",
          disabled: disabled,
          className: className,
          id: id,
          name: name,
          maxLength: "10",
          onKeyPress: function onKeyPress(e) {
            if (e.key === "Enter") {
              e.target.blur();
            } else if (!e.key.match(/^\d?\/?$/im)) {
              e.preventDefault();
            }
          }
        });
      }
    }]);

    return DatePickerAcOff;
  }(React.Component);

  return DatePickerAcOff;
});