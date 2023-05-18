var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "../../../common/inputvalidation", "../../../common/dropdownContent", "../../../common/errormessage", "../../../controller/endososController"], function (React, Utils, InputValidation, DropDownContent, Errormessage, EndososController) {
    var NoDirectFamilyBeneficiary = function (_React$Component) {
        _inherits(NoDirectFamilyBeneficiary, _React$Component);

        function NoDirectFamilyBeneficiary(props) {
            _classCallCheck(this, NoDirectFamilyBeneficiary);

            var _this = _possibleConstructorReturn(this, (NoDirectFamilyBeneficiary.__proto__ || Object.getPrototypeOf(NoDirectFamilyBeneficiary)).call(this, props));

            _initialiseProps.call(_this);

            var _this$props = _this.props,
                _this$props$questions = _this$props.questionsTomador,
                questionsTomador = _this$props$questions === undefined ? {} : _this$props$questions,
                _this$props$questions2 = _this$props.questionsBenef,
                questionsBenef = _this$props$questions2 === undefined ? {} : _this$props$questions2;
            var _questionsTomador$que = questionsTomador.question1,
                question1 = _questionsTomador$que === undefined ? '' : _questionsTomador$que,
                _questionsTomador$que2 = questionsTomador.question2,
                question2 = _questionsTomador$que2 === undefined ? '' : _questionsTomador$que2;
            var _questionsBenef$quest = questionsBenef.question3,
                question3 = _questionsBenef$quest === undefined ? '' : _questionsBenef$quest,
                _questionsBenef$quest2 = questionsBenef.question4,
                question4 = _questionsBenef$quest2 === undefined ? '' : _questionsBenef$quest2,
                _questionsBenef$quest3 = questionsBenef.question5,
                question5 = _questionsBenef$quest3 === undefined ? '' : _questionsBenef$quest3,
                _questionsBenef$quest4 = questionsBenef.question6,
                question6 = _questionsBenef$quest4 === undefined ? '' : _questionsBenef$quest4,
                _questionsBenef$quest5 = questionsBenef.question7,
                question7 = _questionsBenef$quest5 === undefined ? '' : _questionsBenef$quest5,
                _questionsBenef$quest6 = questionsBenef.question8,
                question8 = _questionsBenef$quest6 === undefined ? '' : _questionsBenef$quest6,
                _questionsBenef$quest7 = questionsBenef.question9,
                question9 = _questionsBenef$quest7 === undefined ? '' : _questionsBenef$quest7,
                _questionsBenef$quest8 = questionsBenef.question10,
                question10 = _questionsBenef$quest8 === undefined ? '' : _questionsBenef$quest8;


            _this.state = {
                question1: { value: question1, isValidate: question1 != '' ? true : false }, // input
                question2: { value: question2, isValidate: question2 != '' ? true : false }, // input
                question3: { value: question3, isValidate: question3 != '' ? true : false }, // input
                question5: { value: question5, isValidate: question5 != '' ? true : false }, // input
                question6: { value: question6, isValidate: question6 != '' ? true : false }, // input
                question8: { value: question8, isValidate: question8 != '' ? true : false }, // input
                question9: { value: question9, isValidate: question9 != '' ? true : false }, // input
                question10: { value: question10, isValidate: question10 != '' ? true : false }, // input

                question4: { id: '', value: question4 },
                question7: { id: '', value: question7 },

                showError: false,
                textError: false
            };

            _this.endososController = new EndososController();
            return _this;
        }

        _createClass(NoDirectFamilyBeneficiary, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "p",
                        { className: "text-danger m-3" },
                        "Usted ha indicado que el beneficiario es un familiar no directo. Para proceder al alta del mismo es necesario que complete la siguiente informaci\xF3n."
                    ),
                    React.createElement(
                        "h3",
                        { className: "m-4" },
                        "Complete el siguiente formulario"
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question1" },
                                "\xBFQu\xE9 consecuencia econ\xF3mica provocar\xEDa en sus beneficiarios un eventual siniestro?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question1",
                                name: "question1",
                                minLength: "0",
                                maxLength: "100",
                                requiredStr: "Respuesta incompleta",
                                value: this.state.question1.value,
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                upperCase: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question2" },
                                "\xBFEn funci\xF3n de qu\xE9 par\xE1metro fue determinado el capital asegurado?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question2",
                                name: "question2",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question2.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                upperCase: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question3" },
                                "\xBFHace cu\xE1nto tiempo que conoce al beneficiario declarado?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question3",
                                name: "question3",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question3.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                upperCase: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question4" },
                                "\xBFPor qu\xE9 lo ha designado como beneficiario?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(DropDownContent, {
                                list: [{ id: 'incapacitado', name: 'Por ser incapacitado' }, { id: 'indigente', name: 'Por ser indigente' }, { id: 'convivir', name: 'Por convivir' }, { id: 'pareja', name: 'Por ser mi pareja' }, { id: 'otros', name: 'Otros motivos' }],
                                className: "input-background-color form-control",
                                id: "question4",
                                name: "question4",
                                defaultValue: this.state.question4.value,
                                defaultName: true,
                                onResult: this._handleResults })
                        )
                    ),
                    this.state.question4 && this.state.question4.id == 'convivir' ? React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question5" },
                                "\xBFHace cu\xE1ntos a\xF1os conviven?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question5",
                                name: "question5",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question5.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                onKeyPress: function onKeyPress(e) {
                                    if (isNaN(e.key)) {
                                        e.preventDefault();
                                    }
                                },
                                upperCase: true })
                        )
                    ) : '',
                    this.state.question4 && this.state.question4.id == 'pareja' ? React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question6" },
                                "Duraci\xF3n de la relaci\xF3n"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question6",
                                name: "question6",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question6.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                upperCase: true })
                        )
                    ) : '',
                    this.state.question4 && this.state.question4.id == 'pareja' ? React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question7" },
                                "\xBFConviven?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(DropDownContent, {
                                list: [{ id: 'N', name: 'NO' }, { id: 'S', name: 'SI' }],
                                className: "input-background-color form-control",
                                id: "question7",
                                name: "question7",
                                defaultValue: this.state.question7.value,
                                defaultName: true,
                                onResult: this._handleResults })
                        )
                    ) : '',
                    this.state.question4 && this.state.question4.id == 'pareja' && this.state.question7 && this.state.question7.id == 'S' ? React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question8" },
                                "\xBFHace cu\xE1ntos a\xF1os conviven?"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question8",
                                name: "question8",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question8.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                onKeyPress: function onKeyPress(e) {
                                    if (isNaN(e.key)) {
                                        e.preventDefault();
                                    }
                                },
                                upperCase: true })
                        )
                    ) : '',
                    this.state.question4 && this.state.question4.id == 'otros' ? React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question9" },
                                "Aclarar"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question9",
                                name: "question9",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question9.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                upperCase: true })
                        )
                    ) : '',
                    React.createElement(
                        "div",
                        { className: "row align-items-center m-3" },
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(
                                "label",
                                { className: "form-check-label", htmlFor: "question10" },
                                "\xBFPor qu\xE9 motivos no designa como beneficiario(s) a su(s) familiar(es)?:"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-6" },
                            React.createElement(InputValidation, {
                                id: "question10",
                                name: "question10",
                                minLength: "0",
                                maxLength: "100",
                                value: this.state.question10.value,
                                requiredStr: "Respuesta incompleta",
                                charactersStr: "",
                                className: "input-background-color form-control ",
                                onResult: this._handleResults,
                                upperCase: true })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-dark  m-2 p-1 pr-2 pl-2",
                                type: "button",
                                onClick: this._handleUpdateOnClick },
                            "Actualizar"
                        ),
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                type: "button",
                                onClick: this._handleCancelOnClick },
                            "Cancelar"
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(Errormessage, { className: "text-danger", show: this.state.showError, text: this.state.textError })
                    )
                );
            }
        }]);

        return NoDirectFamilyBeneficiary;
    }(React.Component);

    var _initialiseProps = function _initialiseProps() {
        var _this2 = this;

        this._handleResults = function (id, result) {
            _this2.setState(_defineProperty({}, id, result));
        };

        this._handleCancelOnClick = function () {
            _this2.props.switch('modifyBack');
        };

        this._handleUpdateOnClick = function () {
            var _state = _this2.state,
                question1 = _state.question1,
                question2 = _state.question2,
                question3 = _state.question3,
                question4 = _state.question4,
                question5 = _state.question5,
                question6 = _state.question6,
                question7 = _state.question7,
                question8 = _state.question8,
                question9 = _state.question9,
                question10 = _state.question10;


            var validateOK = true;

            if (question1.isValidate == true && question1.value != '' && question2.isValidate == true && question2.value != '' && question3.isValidate == true && question3.value != '' && question10.isValidate == true && question10.value != '' && question4.value != '') {

                if (question4.id == 'convivir') {
                    if (question5.isValidate != true) {
                        validateOK = false;
                    }
                }
                if (question4.id == 'pareja') {
                    if (question6.isValidate != true) {
                        validateOK = false;
                    }
                }
                if (question4.value == 'pareja') {
                    if (question7.value == '') {
                        validateOK = false;
                    }
                }
                if (question4.id == 'pareja' && question7.id == 'S') {
                    if (question8.isValidate != true) {
                        validateOK = false;
                    }
                }
                if (question4.id == 'otros') {
                    if (question9.isValidate != true) {
                        validateOK = false;
                    }
                }
            } else {
                validateOK = false;
            }

            if (validateOK == true) {

                var questions = {
                    question1: question1.value,
                    question2: question2.value,
                    question3: question3.value,
                    question4: question4.value,
                    question5: question5.value,
                    question6: question6.value,
                    question7: question7.value,
                    question8: question8.value,
                    question9: question9.value,
                    question10: question10.value
                };
                _this2.props.onResult(questions);
            } else {
                _this2.setState({
                    showError: true,
                    textError: 'Complete todos los campos'
                });
            }
        };
    };

    return NoDirectFamilyBeneficiary;
});