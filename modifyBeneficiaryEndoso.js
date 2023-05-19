var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "./formBeneficiary", "../../../common/errormessage"], function (React, Utils, FormBeneficiary, Errormessage) {
    var ModifyBeneficiaryEndoso = function (_React$Component) {
        _inherits(ModifyBeneficiaryEndoso, _React$Component);

        function ModifyBeneficiaryEndoso(props) {
            _classCallCheck(this, ModifyBeneficiaryEndoso);

            var _this = _possibleConstructorReturn(this, (ModifyBeneficiaryEndoso.__proto__ || Object.getPrototypeOf(ModifyBeneficiaryEndoso)).call(this, props));

            _this._handleChange = function (id, result) {
                _this.resultBenef = result;
            };

            _this._showForm = function () {
                var _this$props = _this.props,
                    _this$props$dateBenef = _this$props.dateBenef,
                    dateBenef = _this$props$dateBenef === undefined ? {} : _this$props$dateBenef,
                    _this$props$onlyView = _this$props.onlyView,
                    onlyView = _this$props$onlyView === undefined ? false : _this$props$onlyView;

                return React.createElement(
                    "div",
                    null,
                    React.createElement("hr", null),
                    React.createElement(FormBeneficiary, {
                        id: 1,
                        onResult: _this._handleChange,
                        orderList: _this.props.orderList,
                        data: dateBenef,
                        onlyView: onlyView })
                );
            };

            _this._handleCancelOnClick = function () {
                // this.props.cancel();
                _this.props.switch('beneficiary');
            };

            _this._handleUpdateOnClick = function () {
                var validationOK = true;
                var benef = _this.resultBenef;
                Object.keys(benef).map(function (e) {
                    if (e != 'numberFloor' && e != 'numberDepart') {
                        if (benef[e].isValidate == false || benef[e].value == undefined || benef[e].value == '') {
                            if (e == 'location') {
                                if (benef['state'].value != 'CAPITAL FEDERAL') {
                                    benef[e].refe.current._onFocus(true);
                                    benef[e].refe.current._setInvalid ? benef[e].refe.current._setInvalid() : '';
                                    validationOK = false;
                                }
                            } else {
                                benef[e].refe.current._onFocus(true);
                                benef[e].refe.current._setInvalid ? benef[e].refe.current._setInvalid() : '';
                                validationOK = false;
                            }
                        }
                    }
                });

                if (validationOK == false) {
                    _this.setState({
                        textError: "Revisar los campos marcados en rojo",
                        validationOK: false
                    });
                } else {

                    var birthday = _this.resultBenef['birthday' + 1].value.split('/');
                    birthday = birthday[2] + birthday[1] + birthday[0];

                    var dataSend = {
                        APEBENE: _this.resultBenef.surname.value,
                        TIPDOCBENE: parseInt(_this.resultBenef.typeDoc.id),
                        NUMDOCBENE: parseInt(_this.resultBenef.dniNumber.value),
                        BENEPORC: parseFloat(_this.resultBenef.perc.value),
                        BENEFORD: parseInt(_this.resultBenef.order.value),
                        RELBECOD: _this.resultBenef.relationShip.id,
                        RELBEDEP: _this.resultBenef.depFinancial.id,
                        FNACIMIE: parseInt(birthday),
                        BENNOMBRE: _this.resultBenef.name.value,
                        BENNACIONAL: parseInt(_this.resultBenef.nationality.id),
                        BENCALLE: _this.resultBenef.street.value,
                        BENNUMERO: _this.resultBenef.numberStreet.value,
                        BENPISO: _this.resultBenef.numberFloor.value,
                        BENDEPTO: _this.resultBenef.numberDepart.value,
                        BENCPOSTAL: _this.resultBenef.zipCode.value,
                        BENPROVINCIA: parseInt(_this.resultBenef.state.id),
                        BENLOCALIDAD: _this.resultBenef.location.value,
                        BENPAISTELEF: _this.resultBenef.codeCoutry.id.length == 1 ? '0' + _this.resultBenef.codeCoutry.id : _this.resultBenef.codeCoutry.id,
                        BENPREFINTTELEF: _this.resultBenef.codeCoutry.value.split('-')[0].replace(' ', ''),
                        BENCARTELEF: _this.resultBenef.areaCode.value,
                        BENNUMTELEF: _this.resultBenef.telephone.value,
                        BENEMAIL: _this.resultBenef.email.value,
                        BENESPEP: _this.resultBenef.pep.id,
                        BENSEXO: _this.resultBenef.sex.id
                    };

                    var _this$props$dateBenef2 = _this.props.dateBenef,
                        dateBenef = _this$props$dateBenef2 === undefined ? {} : _this$props$dateBenef2;

                    if (dateBenef.questionFND) {
                        dataSend.questionFND = _this.props.dateBenef.questionFND;
                    }

                    _this.props.modifyResult(dataSend);
                }
            };

            _this.state = { validationOK: true,
                textError: '' };
            _this.resultBenef = {};
            return _this;
        }

        _createClass(ModifyBeneficiaryEndoso, [{
            key: "render",
            value: function render() {
                var _props$onlyView = this.props.onlyView,
                    onlyView = _props$onlyView === undefined ? false : _props$onlyView;

                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "h3",
                        null,
                        this.props.flag == 'modify' ? "Modificar Beneficiario" : "Nuevo Beneficiario",
                        " "
                    ),
                    this._showForm(),
                    React.createElement(
                        "div",
                        { className: "container" },
                        onlyView == false ? React.createElement(
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
                        ) : React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(
                                "button",
                                {
                                    className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                                    type: "button",
                                    onClick: this._handleCancelOnClick },
                                "Volver"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "text-center" },
                            React.createElement(Errormessage, { className: "text-danger", show: !this.state.validationOK, text: this.state.textError })
                        )
                    )
                );
            }
        }]);

        return ModifyBeneficiaryEndoso;
    }(React.Component);

    return ModifyBeneficiaryEndoso;
});