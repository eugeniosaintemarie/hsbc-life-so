var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../../lib/utils", "./beneficiaryTable", "../../../common/errormessage", "../../../controller/endososController", "../../../common/modalReactBootstrap"], function (React, Utils, BeneficiaryTable, Errormessage, EndososController, ModalReactBootstrap) {
    var BeneficiaryEndoso = function (_React$Component) {
        _inherits(BeneficiaryEndoso, _React$Component);

        function BeneficiaryEndoso(props) {
            _classCallCheck(this, BeneficiaryEndoso);

            var _this = _possibleConstructorReturn(this, (BeneficiaryEndoso.__proto__ || Object.getPrototypeOf(BeneficiaryEndoso)).call(this, props));

            _this._handleCancelOnClick = function () {
                _this.props.cancel();
            };

            _this._handleUpdateOnClick = function () {
                var listBenef = _this.props.endosoData.data.DATOBENE.BENEF;
                var error = _this.state.showError;
                var currencyError = 0;
                var higher = void 0;
                if (error == false) {
                    if (listBenef.length > 0) {

                        listBenef.map(function (e, index) {
                            Object.keys(e).map(function (value) {
                                if (value != 'BENPISO' && value != 'BENDEPTO' && value != 'BENPAISTELEF' && value != 'BENPREFINTTELE' && value != 'BENCARTELEF' && value != 'BENNUMTELEF' && value != 'BENEMAIL') {
                                    if (value == 'BENLOCALIDAD' && e['BENPROVINCIA'] != 1) {
                                        if (e[value] != undefined && e[value].toString().trim() === '') {
                                            _this.setState({
                                                showError: true,
                                                textError: 'El beneficiario en la posicion ' + (index + 1) + " tiene uno o mas datos incorrectoes, por favor modifiquelo para poder continuar"
                                            });
                                            error = true;
                                        }
                                    } else {
                                        if (e[value] != undefined && e[value].toString().trim() === '') {
                                            _this.setState({
                                                showError: true,
                                                textError: 'El beneficiario en la posicion ' + (index + 1) + " tiene uno o mas datos incorrectos, por favor modifiquelo para poder continuar"
                                            });
                                            error = true;
                                        }
                                    }
                                }
                            });
                        });

                        if (parseInt(listBenef[0].BENEFORD) != 1) {
                            _this.setState({
                                showError: true,
                                textError: 'El primer orden ingresado deber ser 1'
                            });
                            error = true;
                        } else {
                            var ord = 2;
                            var prevOrd = void 0;
                            listBenef.map(function (e) {
                                if (error == false) {
                                    var aux = parseInt(e.BENEFORD);
                                    if (aux > 1) {
                                        if (aux != ord) {
                                            if (aux != prevOrd) {
                                                _this.setState({
                                                    showError: true,
                                                    textError: 'La prioridad siguiente a la N° ' + prevOrd + ' no es correlativa.'
                                                });
                                                error = true;
                                            } else {
                                                ord = aux;
                                            }
                                        } else {
                                            ord++;
                                        }
                                    }
                                    prevOrd = aux;
                                }
                            });
                        }

                        if (error == false) {
                            var orders = {};
                            listBenef.map(function (e) {
                                var ord = parseInt(e.BENEFORD);
                                if (orders[ord]) {
                                    orders[ord] = parseInt(e.BENEPORC) + parseInt(orders[ord]);
                                } else {
                                    orders[ord] = parseInt(e.BENEPORC);
                                }
                            });

                            Object.keys(orders).map(function (currency) {
                                if (error == false) {
                                    if (orders[currency] < 100) {
                                        higher = false;
                                        error = true;
                                        currencyError = currency;
                                    } else if (orders[currency] > 100) {
                                        higher = true;
                                        error = true;
                                        currencyError = currency;
                                    }
                                }
                            });
                            if (error == true) {
                                _this.setState({
                                    showError: true,
                                    textError: higher ? 'La prioridad ' + currencyError + ' supera el %100' : 'La prioridad ' + currencyError + ' no llega a cubrir el %100'
                                });
                            } else {
                                _this.props.update();
                            }
                        }
                    } else {
                        _this.setState({
                            showError: true,
                            textError: 'No se ingreso ningun beneficiario'
                        });
                    }
                }
            };

            _this._haldleButtonNew = function (e) {
                _this.props.switch('new', 'new');
            };

            _this._haldleButtonView = function (e) {
                var cant = 0;
                Object.keys(_this.props.listSelected).map(function (currency) {
                    if (_this.props.listSelected[currency] == true) {
                        cant++;
                    }
                });
                if (cant == 0) {
                    _this.setState({
                        currentView: 'beneficiary',
                        showError: true,
                        textError: 'Seleccione un beneficiario para modificar'
                    });
                } else if (cant == 1) {
                    _this.props.switch('view', 'view');
                } else {
                    _this.setState({
                        currentView: 'beneficiary',
                        showError: true,
                        textError: 'Solo se puede modificar una Beneficiario a la vez'
                    });
                }
            };

            _this._haldleButtonModify = function (e) {
                var cant = 0;
                Object.keys(_this.props.listSelected).map(function (currency) {
                    if (_this.props.listSelected[currency] == true) {
                        cant++;
                    }
                });
                if (cant == 0) {
                    _this.setState({
                        currentView: 'beneficiary',
                        showError: true,
                        textError: 'Seleccione un beneficiario para modificar'
                    });
                } else if (cant == 1) {
                    _this.props.switch('modify', 'modify');
                } else {
                    _this.setState({
                        currentView: 'beneficiary',
                        showError: true,
                        textError: 'Solo se puede modificar una Beneficiario a la vez'
                    });
                }
            };

            _this._haldleDeleteRow = function () {
                var select = false;
                Object.keys(_this.props.listSelected).map(function (currency) {
                    if (_this.props.listSelected[currency] == true) {
                        select = true;
                    }
                });

                if (select) {
                    _this.setState({
                        showModal: true,
                        modal: {
                            component: null,
                            title: 'Alerta',
                            contentHTML: '¿Esta seguro que desea eliminar los beneficiarios seleccionados?',
                            html: true,
                            size: "md",
                            accept: _this._handleAccept
                        }
                    });
                } else {
                    _this.setState({
                        currentView: 'beneficiary',
                        showError: true,
                        textError: 'Seleccione un beneficiario para modificar'
                    });
                }
            };

            _this._handleModalIsOpen = function (e) {
                var current = _this.state.showModal;
                _this.setState({ noVisible: false });
                /*       this.props.isEdited =true */
                _this.setState({
                    showModal: !current,
                    showError: false,
                    textError: ''
                });
            };

            _this._handleAccept = function (e) {
                _this.props.deleteResult();
                _this._handleModalIsOpen();
            };

            _this._handleOnResult = function (list) {
                _this.props.selectedResult(list);
            };

            _this.state = {
                beneficiarioOpt: '',
                showError: false,
                textError: '',
                noVisible: true,
                showModal: false,
                modal: {
                    title: "",
                    component: null,
                    size: "md",
                    html: false,
                    accept: null
                }
            };

            _this.endososController = new EndososController();
            return _this;
        }

        _createClass(BeneficiaryEndoso, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    this.props.onlyView != true ? React.createElement(
                        "p",
                        { className: "m-3" },
                        "Hac\xE9 clic en el bot\xF3n 'Nuevo' para agregar un beneficiario. Si deseas modificar datos o borrar un beneficiario ya ingresado en la lista, seleccion\xE1 haciendo clic sobre el mismo y utiliz\xE1 los botones 'Modificar' o 'Eliminar'. "
                    ) : '',
                    React.createElement(
                        "p",
                        { className: "m-3" },
                        React.createElement(
                            "b",
                            null,
                            "Lista de designaci\xF3n de Beneficiarios"
                        )
                    ),
                    React.createElement(BeneficiaryTable, {
                        list: this.props.endosoData.data.DATOBENE.BENEF,
                        selectedResult: this._handleOnResult,
                        listSelected: this.props.listSelected }),
                    this.props.onlyView == true ? React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "button",
                            { onClick: this._haldleButtonView, type: "button", className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2" },
                            "Ver"
                        )
                    ) : React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "button",
                            { onClick: this._haldleButtonNew, type: "button", className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2 " },
                            "Nuevo"
                        ),
                        React.createElement(
                            "button",
                            { onClick: this._haldleButtonModify, type: "button", className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2" },
                            "Modificar"
                        ),
                        React.createElement(
                            "button",
                            { onClick: this._haldleDeleteRow, type: "button", className: "btn btn-danger m-2 btn-sm rounded p-0 pl-2 pr-2" },
                            "Eliminar"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(Errormessage, { className: "text-danger", show: this.state.showError, text: this.state.textError })
                    ),
                    this.props.onlyView == true ? React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-light  m-2 p-1 pr-2 pl-2 ",
                                type: "button",
                                onClick: this._handleCancelOnClick },
                            "Volver"
                        )
                    ) : React.createElement(
                        "div",
                        { className: "text-center" },
                        React.createElement(
                            "button",
                            {
                                disabled: !this.props.isEdited && this.state.noVisible,
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
                    React.createElement(ModalReactBootstrap, {
                        title: this.state.modal.title,
                        show: this.state.showModal,
                        size: this.state.modal.size,
                        isOpen: this._handleModalIsOpen,
                        component: this.state.modal.component,
                        html: this.state.modal.html,
                        contentHTML: this.state.modal.contentHTML,
                        accept: this.state.modal.accept
                    })
                );
            }
        }]);

        return BeneficiaryEndoso;
    }(React.Component);

    return BeneficiaryEndoso;
});