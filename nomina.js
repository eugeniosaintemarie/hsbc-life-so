var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../lib/utils", "../common/datepicker", "../services/segurosOnlineService", "../common/modalReactBootstrap", "../redux/store", "../common/fileManager", "./nominas/tablaNomina", "../common/loader", "../common/buttonLoading", "../controller/nominaController", "./altasTempranas.js", "./consultaNovedades.js"], function (React, UserService, Utils, DatePicker, SegurosOnlineService, ModalReactBootstrap, Store, FileManager, TablaNomina, Loader, ButtonLoading, NominaController, AltasTempranas, ConsultaNovedades) {
  var Nomina = function (_React$Component) {
    _inherits(Nomina, _React$Component);

    function Nomina(props) {
      _classCallCheck(this, Nomina);

      var _this = _possibleConstructorReturn(this, (Nomina.__proto__ || Object.getPrototypeOf(Nomina)).call(this, props));

      _this._handleResults = function (id, result) {
        var current = _this.state;
        _this.setState(Object.assign({}, current, _defineProperty({}, id, result)), function () {});
      };

      _this._handlerLoadListChecked = function () {
        var lista = [];

        for (var index = 0; index < _this.state.nominas.ASEGURADOS.length; index++) {
          lista.push({ isChecked: false });
        };

        _this.setState({ listChecked: lista });
      };

      _this._handleShowAltasTempranas = function () {
        var current = _this.state.showAltasTempranas;
        var currentState = _this.state;
        var viewsToFalse = _this.props.setToFalse;

        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showAltasTempranas: !current
        }));
      };

      _this._handleShowNovedades = function () {
        var current = _this.state.showNovedades;
        var currentState = _this.state;
        var viewsToFalse = _this.props.setToFalse;

        _this.setState(Object.assign({}, currentState, viewsToFalse, {
          showNovedades: !current
        }));
      };

      _this._handleAltasTempranas = function () {
        _this.props.goToAltasTempranas();
      };

      _this._handleImpresionConstCobertura = function () {
        var lista = _this.state.listChecked.filter(function (item) {
          return item.isChecked;
        });
        var listDNI = [];
        if (lista.length == 0) {
          _this.setState({
            showAsegurados: true,
            modal: {
              component: null,
              contentHTML: 'Tenes que seleccionar uno o varios nominados para imprimir el certificado',
              html: true,
              title: "Nomina de asegurados",
              size: "md"
            }
          });
        } else if (lista.length == _this.state.listChecked.length) {
          _this._ImpresionConstCobertura([]);
        } else if (lista.length <= 92) {

          for (var i = 0; i < _this.state.listChecked.length; i++) {
            if (_this.state.listChecked[i].isChecked) listDNI.push(_this.state.nominas.ASEGURADOS[i].ASNRODOC);
          }
          _this._ImpresionConstCobertura(listDNI);
        } else {
          _this.setState({
            showAsegurados: true,
            modal: {
              component: null,
              contentHTML: 'El limite disponible para impresión parcial es de 92',
              html: true,
              title: "Constancia de cobertura",
              size: "md"
            }
          });
        }
      };

      _this._ImpresionConstCobertura = function (dniAsegurados) {
        //editar
        var segurosOnlineService = new SegurosOnlineService();
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        _this.setState({
          coberturaLoading: true
        });

        segurosOnlineService.getimprimirConstCobertura({
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          TIPODOC: _this.state.tipoDocumento,
          NRODOC: _this.state.nroDocumento,
          ENDOSO: _this.props.nroEndoso,
          ASEGURADOS: dniAsegurados
        }).then(function (data) {
          var filename = 'nomina de asegurados.pdf';
          var fileManager = new FileManager();

          var resultDownload = fileManager.downloadPDF(data, filename);

          if (!resultDownload) {
            _this.setState({
              coberturaLoading: false,
              showAsegurados: true,
              modal: {
                component: null,
                contentHTML: 'Disculpanos, ha surgido un error al descargar el formulario, por favor inténtelo mas tarde',
                html: true,
                title: "Nomina de asegurados",
                size: "md"
              }
            });
          } else {
            _this.setState({
              coberturaLoading: false
            });
          }
        });
      };

      _this._handleImpresionCertIncorp = function () {
        if (_this.props.reqSeguimiento && _this.props.reqSeguimiento.ESTADO.toUpperCase() == "PENDIENTE") {
          _this.setState({
            showAsegurados: true,
            modal: {
              component: null,
              contentHTML: 'No es posible imprimir el certificado de incorporación ya que la nomina se encuentra pendiente',
              html: true,
              title: "Nomina de asegurados",
              size: "md"
            }
          });
        } else {
          var lista = _this.state.listChecked.filter(function (item) {
            return item.isChecked;
          });
          if (lista.length == 0) {
            _this.setState({
              showAsegurados: true,
              modal: {
                component: null,
                contentHTML: 'Tenes que seleccionar uno o varios nominados para imprimir el certificado',
                html: true,
                title: "Nomina de asegurados",
                size: "md"
              }
            });
          } else {
            _this._ImpresionCertIncorp();
          }
        }
      };

      _this._downloadFailed = function () {
        _this.setState({
          incorporacionLoading: false,
          showAsegurados: true,
          modal: {
            component: null,
            contentHTML: 'Disculpanos, ha surgido un error al descargar el formulario, por favor inténtelo mas tarde',
            html: true,
            title: "Nomina de asegurados",
            size: "md"
          }
        });
      };

      _this._ImpresionCertIncorp = function () {
        var segurosOnlineService = new SegurosOnlineService();
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        var _loop = function _loop(i, _p) {
          if (_this.state.listChecked[i].isChecked) {
            _p = _p.then(function () {
              return new Promise(function (resolve) {
                return segurosOnlineService.getimprimirCertIncorp({
                  RAMOPCOD: detalle.RAMOPCOD,
                  POLIZANN: detalle.POLIZANN,
                  POLIZSEC: detalle.POLIZSEC,
                  CERTIPOL: detalle.CERTIPOL,
                  CERTIANN: detalle.CERTIANN,
                  CERTISEC: detalle.CERTISEC,
                  CIAASCOD: detalle.CIAASCOD,
                  TIPODOC: _this.state.tipoDocumento,
                  NRODOC: _this.state.nroDocumento,
                  ENDOSO: 9999,
                  DOCUMDAT: _this.state.nominas.ASEGURADOS[i].ASNRODOC
                }).then(function (data) {
                  var filename = 'Certificado Incorporacion - ' + detalle.NROPOLIZA + '.pdf';
                  var fileManager = new FileManager();
                  if (fileManager.downloadPDF(data, filename)) {
                    resolve();
                  } else _this._downloadFailed();
                });
              });
            });
          }

          p = _p;
        };

        for (var i = 0, p = Promise.resolve(); i < _this.state.listChecked.length; i++) {
          _loop(i, p);
        }
      };

      _this._handleImpresionCert = function () {

        var segurosOnlineService = new SegurosOnlineService();
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

        _this.setState({
          nominaLoading: true
        });

        segurosOnlineService.getImprimirCertificadoAsegurados({
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          TIPODOC: _this.state.tipoDocumento,
          NRODOC: _this.state.nroDocumento,
          ENDOSO: _this.props.nroEndoso
        }).then(function (data) {
          var filename = detalle.NROPOLIZA + '.pdf';
          var fileManager = new FileManager();

          var resultDownload = fileManager.downloadPDF(data, filename);

          if (!resultDownload) {
            _this.setState({
              nominaLoading: false,
              showAsegurados: true,
              modal: {
                component: null,
                contentHTML: 'Ha surgido un error al generar la nomina de asegurados',

                html: true,
                title: "Nomina de asegurados",
                size: "md"
              }
            });
          } else {
            _this.setState({
              nominaLoading: false
            });
          }
        });
      };

      _this._handleModalIsOpen = function (e) {
        var current = _this.state.showAsegurados;
        _this.setState({
          showAsegurados: !current
        });
      };

      _this._handleBack = function () {
        _this.props.reqSeguimiento ? _this.props.goBack() : _this.props.goTocopyPolicy();
      };

      _this._checkUltimoEndoso = function (detalle, nominas) {
        var today = Utils.formatFechaNumber(Utils.dateToString(new Date()));
        var segurosOnlineService = new SegurosOnlineService();

        segurosOnlineService.getDetalleEndoso({
          FECHADDE: today - 100000, // 10 años antes al dia actual
          FECHAHTA: today,
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC,
          CIAASCOD: detalle.CIAASCOD,
          SUPLENUM: detalle.SUPLENUM
        }).then(function (endorsementData) {
          if (endorsementData[0].ENDOSO == nominas.ENDOSO) {
            _this.setState({ ultimoEndoso: true });
          } else {
            _this.setState({ ultimoEndoso: false });
          }
        });
      };

      _this._detailFormatToNominaFormat = function (list) {
        var auxList = list.map(function (item) {
          var newItem = {
            ASEGURADOR: item.ASEGURADO,
            ASNRODOC: item.DOCUMDAT,
            ASTIPDOC: item.DOCUMTIP,
            CAPIASEG: item.CAPITAL,
            FECNAC: item.FECHA
          };
          return newItem;
        });
        return auxList;
      };

      _this.state = {
        nominas: null,
        tipoDocumento: 0,
        nroDocumento: 0,
        showAsegurados: false,
        showAltaTemprana: false,
        showAltasTempranas: false,
        showNovedades: false,
        detalleEndosos: {},
        listChecked: [],
        listNovedades: [],
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false
        },
        coberturaLoading: false,
        incorporacionLoading: false,
        nominaLoading: false,
        altaTempranaLoading: false,
        ultimoEndoso: false
      };
      _this.nominaController = new NominaController();
      return _this;
    }

    _createClass(Nomina, [{
      key: "getCodDocByNumber",
      value: function getCodDocByNumber(codDoc) {
        switch (String(codDoc)) {
          case '1':
            return 'DNI';
          case '2':
            return 'LE';
          case '3':
            return 'LC';
          case '4':
            return 'CUIT';
          case '5':
            return 'CUIL';
          case '47':
            return 'PASAPORTE';
          default:
            return 'DNI';
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var submitDisabled = this.state.nominas ? false : true;
        this.props.isSubmitting;
        return React.createElement(
          React.Fragment,
          null,
          this.state.showAltasTempranas && React.createElement(AltasTempranas, { isTomador: false, goToNomina: this._handleShowAltasTempranas, nroPoliza: this.props.nroPoliza, nroDocu: this.state.nroDocumento, tipoDocumento: this.state.tipoDocumento, nroEndoso: this.props.nroEndoso, asegurados: this.state.nominas.ASEGURADOS }),
          this.state.showNovedades && React.createElement(ConsultaNovedades, { goToNomina: this._handleShowNovedades, listNovedades: this.state.listNovedades, nroPoliza: this.props.nroPoliza }),
          !this.state.showAltasTempranas && !this.state.showNovedades && React.createElement(
            React.Fragment,
            null,
            React.createElement(
              "h4",
              { className: "subtitle-inside" },
              "N\xF3mina de Asegurados"
            ),
            React.createElement(
              "div",
              { className: "panel col-md-12" },
              React.createElement(
                "div",
                { className: "list-container " },
                React.createElement(
                  "table",
                  { className: "table table-sm table-bordered" },
                  React.createElement(
                    "thead",
                    null,
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "th",
                        null,
                        "N\xFAmero de P\xF3liza / Certificado"
                      ),
                      React.createElement(
                        "th",
                        null,
                        "Endoso"
                      ),
                      React.createElement(
                        "th",
                        null,
                        "Nombre y Apellido / Razon Social"
                      ),
                      React.createElement(
                        "th",
                        null,
                        "Tipo y Nro. Doc."
                      )
                    )
                  ),
                  React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "td",
                        null,
                        detalle.NROPOLIZA
                      ),
                      React.createElement(
                        "td",
                        null,
                        this.props.nroEndoso
                      ),
                      React.createElement(
                        "td",
                        null,
                        detalle.TOMADOR
                      ),
                      React.createElement(
                        "td",
                        null,
                        this.getCodDocByNumber(this.state.tipoDocumento),
                        "\xA0\xA0",
                        this.state.nroDocumento
                      )
                    )
                  )
                )
              ),
              !this.props.reqSeguimiento && !this.state.showAltasTempranas && !this.state.showNovedades && React.createElement(
                React.Fragment,
                null,
                React.createElement(
                  "h4",
                  null,
                  "\xBFQu\xE9 archivo quer\xE9s descargar?"
                ),
                React.createElement(
                  "div",
                  { className: "row col-md-11 pb-1 pt-1" },
                  React.createElement(
                    "div",
                    null,
                    React.createElement(
                      "h6",
                      null,
                      "Certificados individuales:"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "Record\xE1 que tenes que seleccionar los nominados sobre los que queres imprimir los certificados"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "pb-3 row col-md-11" },
                    React.createElement(
                      ButtonLoading,
                      {
                        disabled: submitDisabled || this.state.incorporacionLoading,
                        className: "ml-1 btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleImpresionCertIncorp,
                        loading: this.state.incorporacionLoading },
                      "Certificados Incorporaci\xF3n"
                    ),
                    React.createElement(
                      ButtonLoading,
                      {
                        disabled: submitDisabled || this.state.coberturaLoading,
                        className: "ml-1 btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleImpresionConstCobertura,
                        loading: this.state.coberturaLoading },
                      "Constancia de cobertura"
                    )
                  ),
                  React.createElement(
                    "div",
                    { className: "pb-3 row col-md-11" },
                    detalle.RAMOPCOD == "CO10" && this.state.ultimoEndoso ? React.createElement(
                      ButtonLoading,
                      {
                        disabled: submitDisabled || this.state.altaTempranaLoading,
                        className: "ml-1 btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleShowAltasTempranas,
                        loading: this.state.altaTempranaLoading },
                      "Constancia de altas tempranas"
                    ) : ""
                  ),
                  React.createElement(
                    "h6",
                    null,
                    "Certificados de toda la n\xF3mina:"
                  ),
                  React.createElement(
                    "p",
                    null,
                    "Record\xE1 que estos botones imprimir\xE1n los certificados de todos los integrantes de tu n\xF3mina"
                  ),
                  React.createElement(
                    "div",
                    { className: "pb-1" },
                    React.createElement(
                      ButtonLoading,
                      {
                        disabled: submitDisabled || this.state.nominaLoading,
                        className: "ml-1 btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleImpresionCert,
                        loading: this.state.nominaLoading },
                      "Certificado de N\xF3mina Completa"
                    )
                  ),
                  React.createElement("div", { className: "pb-4 row col-md-11" }),
                  React.createElement(
                    "h6",
                    null,
                    "Consulta de novedades de n\xF3mina"
                  ),
                  React.createElement(
                    "p",
                    null,
                    "Ingres\xE1 para ver las novedades de tu n\xF3mina"
                  ),
                  React.createElement(
                    "div",
                    { className: "pb-1" },
                    React.createElement(
                      ButtonLoading,
                      {
                        disabled: submitDisabled || this.state.showNovedades,
                        className: "ml-1 btn btn-hsbc right " + (submitDisabled ? "disabled" : ""),
                        onClick: this._handleShowNovedades,
                        loading: this.state.showNovedades },
                      "Novedades de N\xF3mina"
                    )
                  )
                )
              ),
              this.state.nominas !== null ? React.createElement(
                "div",
                { className: "col-md-12 remove-left-padding" },
                this.state.nominas && !this.state.showAltaTemprana && !this.state.showAltasTempranas && !this.state.showNovedades ? React.createElement(
                  "div",
                  null,
                  React.createElement(TablaNomina, {
                    checkRow: this.props.reqSeguimiento,
                    group: this.state.nominas.GRUPO,
                    listNominados: this.state.nominas.ASEGURADOS,
                    listchecked: this.state.listChecked,
                    updateLista: function updateLista(lista) {
                      _this2.setState({ listChecked: lista });
                    } }),
                  React.createElement(
                    "div",
                    { className: "row justify-content-md-center" },
                    React.createElement(
                      "button",
                      { className: "ml-1 btn btn-hsbc ", onClick: this._handleBack },
                      "Volver"
                    )
                  )
                ) : ''
              ) : React.createElement(
                "div",
                { className: "col d-flex justify-content-center" },
                React.createElement(Loader, { width: "4rem", height: "4rem" }),
                React.createElement("div", { className: "m-4" })
              ),
              React.createElement(ModalReactBootstrap, {
                title: this.state.modal.title,
                show: this.state.showAsegurados,
                size: this.state.modal.size,
                isOpen: this._handleModalIsOpen,
                component: this.state.modal.component,
                html: this.state.modal.html,
                contentHTML: this.state.modal.contentHTML
              })
            )
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        //this._handleSearch(this.state.from, this.state.to, this.state.type);
        var userService = new UserService();
        userService.getLoggedUser().then(function (data) {
          var NUMEDOCU = data.NUMEDOCU,
              TIPODOCU = data.TIPODOCU;

          _this3.setState({
            tipoDocumento: TIPODOCU,
            nroDocumento: NUMEDOCU
          });
        });
        var currentProduct = Store.getState().seguros.currentProduct;

        var detalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;
        var segurosOnlineService = new SegurosOnlineService();

        paramsConsNominas = {
          'CIAASCOD': detalle.CIAASCOD,
          'ENDOSO': this.props.nroEndoso,
          'RAMOPCOD': detalle.RAMOPCOD,
          'POLIZANN': detalle.POLIZANN,
          'POLIZSEC': detalle.POLIZSEC,
          'CERTIPOL': detalle.CERTIPOL,
          'CERTIANN': detalle.CERTIANN,
          'CERTISEC': detalle.CERTISEC
        };

        paramsGetNovedades = {
          SUPLENUM: this.props.nroEndoso,
          RAMOPCOD: detalle.RAMOPCOD,
          POLIZANN: detalle.POLIZANN,
          POLIZSEC: detalle.POLIZSEC,
          CERTIPOL: detalle.CERTIPOL,
          CERTIANN: detalle.CERTIANN,
          CERTISEC: detalle.CERTISEC
        };

        if (this.props.reqSeguimiento) {
          this.nominaController.detalleEnviadas(this.props.reqSeguimiento, function (data) {
            if (data != "ERROR") _this3.setState({
              nominas: { ASEGURADOS: _this3._detailFormatToNominaFormat(data) }
            });else {
              _this3.setState({
                nominas: { ASEGURADOS: [], errorNomina: true }
              });
            }
            _this3._handlerLoadListChecked();
          });
        } else {
          segurosOnlineService.getNominas(paramsConsNominas).then(function (consultaNominas) {
            _this3.setState({
              nominas: consultaNominas
            });
            _this3._checkUltimoEndoso(detalle, consultaNominas);
            _this3._handlerLoadListChecked();
          });
        }

        segurosOnlineService.getNovedadesPol(paramsGetNovedades).then(function (novedadesData) {
          _this3.setState({
            listNovedades: novedadesData.Message.DATOS.CAMPOS.CAMPO
          });
        });
      }
    }]);

    return Nomina;
  }(React.Component);

  return Nomina;
});