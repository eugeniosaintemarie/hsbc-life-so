var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../lib/utils", "../../common/loader", "../../controller/beneficiariosController", "../../common/modalReactBootstrap", "../../common/fileManager"], function (React, Utils, Loader, BenefController, ModalReactBootstrap, FileManager) {
    var ProcessOK = function (_React$Component) {
        _inherits(ProcessOK, _React$Component);

        function ProcessOK(props) {
            _classCallCheck(this, ProcessOK);

            var _this = _possibleConstructorReturn(this, (ProcessOK.__proto__ || Object.getPrototypeOf(ProcessOK)).call(this, props));

            _this._handleOnClick = function () {
                _this.props.handleShowAppointBeneficiary();
            };

            _this._handleShowPdf = function () {
                var polizaformateada = _this.props.pdf.NROPOLIZA.split("-")[1] + "-" + _this.props.pdf.NROPOLIZA.split("-")[2];
                _this.beneficiarioController.getFormularioAsegurado(polizaformateada, _this.props.pdf, function (data) {
                    if (data) {
                        var filename = "SolicitudBen.pdf";
                        var fileManager = new FileManager();
                        var resultDownload = fileManager.downloadPDF(data, filename);
                        if (!resultDownload) {
                            _this.setState({
                                showModal: true,
                                modal: {
                                    title: "Error",
                                    component: null,
                                    size: "md",
                                    html: true,
                                    contentHTML: "Hubo inconvenientes en la descarga del pdf, por favor intente luego",
                                    textClose: "Entendido"
                                }
                            });
                        }
                    } else {
                        _this.setState({
                            showModal: true,
                            modal: {
                                title: "Error",
                                component: null,
                                size: "md",
                                html: true,
                                contentHTML: "Hubo inconvenientes al generar el pdf",
                                textClose: "Entendido"
                            }
                        });
                    }
                });
            };

            _this.handleModalIsOpen = function (e) {
                var current = _this.state.showModal;
                _this.setState({
                    showModal: !current
                });
            };

            _this.beneficiarioController = new BenefController();
            _this.state = {
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
            return _this;
        }

        _createClass(ProcessOK, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        { className: "col" },
                        React.createElement(
                            "div",
                            { className: "m-3" },
                            React.createElement(
                                "p",
                                { className: "processOkTitle" },
                                this.props.serviceError ? "Ha ocurrido un problema, por favor intentalo mas tarde." : "Tu solicitud se recibió con exito, la misma esta siendo procesada."
                            ),
                            React.createElement(
                                "p",
                                { className: "mb-0" },
                                this.props.serviceError ? "" : "Podés descargar tu formulario de designación de beneficiario aquí:"
                            ),
                            this.props.serviceError ? "" : React.createElement(
                                "button",
                                { className: "link-form-benef", onClick: this._handleShowPdf },
                                "Formulario de designaci\xF3n de beneficiario"
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "text-center mt-5" },
                        React.createElement(
                            "button",
                            {
                                className: "btn btn-light  m-2 p-1 pr-2 pl-2",
                                type: "button",
                                onClick: this._handleOnClick },
                            "Aceptar"
                        )
                    ),
                    React.createElement(ModalReactBootstrap, {
                        title: this.state.modal.title,
                        show: this.state.showModal,
                        size: this.state.modal.size,
                        isOpen: this.handleModalIsOpen,
                        component: this.state.modal.component,
                        html: this.state.modal.html,
                        contentHTML: this.state.modal.contentHTML,
                        textClose: this.state.modal.textClose
                    })
                );
            }
        }]);

        return ProcessOK;
    }(React.Component);

    return ProcessOK;
});