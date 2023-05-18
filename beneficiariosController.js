var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "react-dom", "../lib/utils", "../services/userService", "../services/endososService", "../services/segurosOnlineService", "../redux/store"], function (React, ReactDOM, Utils, UserService, EndososService, SegurosOnlineService, Store) {
  var BeneficiariosController = function (_React$Component) {
    _inherits(BeneficiariosController, _React$Component);

    function BeneficiariosController() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, BeneficiariosController);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BeneficiariosController.__proto__ || Object.getPrototypeOf(BeneficiariosController)).call.apply(_ref, [this].concat(args))), _this), _this.userService = new UserService(), _this.endosoService = new EndososService(), _this.segurosOnlineService = new SegurosOnlineService(), _this.segurosData = Store.getState().seguros, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BeneficiariosController, [{
      key: "getTipoDocumento",
      value: function getTipoDocumento(callBack) {
        this.segurosOnlineService.getTiposDocumento({ "COD_APP": "SO", "COD_PRO": "" }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getParentescoList",
      value: function getParentescoList(callBack) {
        this.endosoService.getParentescoList().then(function (data) {
          var array = data.Message.DATOS.PARENTEZCOS.PARENTEZCO.filter(function (item) {
            return item.CODIGO != "AC" && item.CODIGO != "EM" && item.CODIGO != "OT" && item.CODIGO != "UC" && item.CODIGO != "CV";
          });

          callBack(array);
        });
      }
    }, {
      key: "sendValidationEmail",
      value: function sendValidationEmail(callBack) {
        this.segurosOnlineService.envioCodigoVerificacion().then(function (validacion) {
          if (validacion.CODRESULTADO == "OK") {
            callBack(true);
          } else {
            //ERROR AL CONSULTAR SERVICIO ENVIO MAIL
          }
        });
      }
    }, {
      key: "verificarCodigoEmail",
      value: function verificarCodigoEmail(cod, callBack) {
        var params = {
          codigo: cod
        };

        this.segurosOnlineService.verificarCodigo(params).then(function (data) {
          if (data !== undefined) {
            callBack(data.result);
          } else {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "updateNominadeBeneficiarios",
      value: function updateNominadeBeneficiarios(product, itemList, userLogged, callBack) {
        var _this2 = this;

        var nominas = itemList.map(function (item) {
          return {
            ORDEN: Number(item.NOMINAS.ORDEN),
            DOCUMDATB: item.NOMINAS.DOCUMDAT,
            DOCUMTIPB: Number(item.NOMINAS.DOCUMTIP),
            CLIENAP: item.NOMINAS.CLIENAP,
            CLIENNOM: item.NOMINAS.CLIENNOM,
            PORCENT: item.NOMINAS.PORCENT / 100,
            EDAD: 0,
            RELACION: item.NOMINAS.RELACION,
            TELEFONO: item.NOMINAS.TELEFONO,
            EMAIL: item.NOMINAS.EMAIL,
            FECNACIM: item.NOMINAS.FECNACIM
          };
        });

        var beneficiaries = itemList.map(function (item) {
          return {
            BEN: {
              BEN_AYN: item.NOMINAS.CLIENAP + ' ' + item.NOMINAS.CLIENNOM,
              BEN_ORD: item.NOMINAS.ORDEN.toString(),
              BEN_POR: (item.NOMINAS.PORCENT / 100).toString(),
              BEN_FNA: Utils.formatFechaString(item.NOMINAS.FECNACIM),
              BEN_TDO: item.NOMINAS.DOCUMDESCRIP,
              BEN_NDO: item.NOMINAS.DOCUMDAT,
              BEN_REL: item.NOMINAS.RELBDESC,
              BEN_EMA: item.NOMINAS.EMAIL,
              BEN_TEL: item.NOMINAS.TELEFONO
            }
          };
        });

        var paramHeader = {
          NRO_OPE: '0',
          COD_PRO: product.COD_PRO,
          NRO_POL: product.NROPOLIZA.substr(5, 28).replace(/[ ]+/gi, ""),
          ASE_TDO: userLogged.TIPODOCU,
          ASE_NDO: userLogged.NUMEDOCU,
          ASE_APE: product.ASE_APE,
          ASE_NOM: product.ASE_NOM,
          TOM_TDO: product.TOM_TDO,
          TOM_NDO: product.TOM_NDO,
          TOM_APE: product.TOM_APE, TOM_NOM: ''
        };

        var paramBeneficiario = {
          DDBEN: {
            ASE: {
              ASE_APE: product.ASE_APE,
              ASE_NOM: product.ASE_NOM,
              ASE_TDO: userLogged.DOCDESCRIP,
              ASE_NDO: userLogged.NUMEDOCU.toString(),
              COD_PRO: product.COD_PRO,
              NRO_POL: product.NROPOLIZA.substr(5, 28).replace(/[ ]+/gi, ""),
              NRO_OPE: '0'
            },
            BENS: beneficiaries
          }
        };

        this.segurosOnlineService.enviarBeneficiarioFileRepo({
          paramsCabecera: paramHeader,
          paramsBeneficiario: paramBeneficiario
        }).then(function (data1) {
          if (data1 && data1.beneficiarioPDF) {
            _this2.segurosOnlineService.cambiarEst({
              COD_PRO: product.COD_PRO,
              POL_ANN: product.POL_ANN,
              POL_SEC: product.POL_SEC,
              CER_POL: product.CER_POL,
              CER_ANN: product.CER_ANN,
              CER_SEC: product.CER_SEC,
              TIP_DOC: product.TIP_DOC,
              NRO_DOC: product.NRO_DOC,
              DIR_EMA: product.DIR_EMA,
              COD_EST: "E",
              ASE_APE: product.ASE_APE,
              ASE_NOM: product.ASE_NOM,
              TOM_TDO: product.TOM_TDO,
              TOM_NDO: product.TOM_NDO,
              TOM_APE: product.TOM_APE
            }).then(function (data) {
              if (!(!data || !data.Code) && data.Code == "NO_ERROR") {
                callBack("NO_ERROR");
              } else {
                callBack("ERROR");
              }
            });

            callBack(data1.beneficiarioPDF);
          } else {
            callBack("ERROR");
          }
        });

        this.segurosOnlineService.envioBenefNomina({
          RAMOPCOD: product.COD_PRO,
          POLIZANN: product.POL_ANN,
          POLIZSEC: product.POL_SEC,
          CERTIPOL: product.CER_POL,
          CERTIANN: product.CER_ANN,
          CERTISEC: product.CER_SEC,
          DOCUMDAT: product.NRO_DOC,
          DOCUMTIP: Number(product.TIP_DOC),
          NOMINA: nominas
        }).then(function (data) {
          if (data == undefined || data.Code != "NO_ERROR") {
            callBack("ERROR");
          }
        });
      }
    }, {
      key: "imprimirCertIncorp",
      value: function imprimirCertIncorp(product, callback) {
        this.segurosOnlineService.getimprimirCertIncorp(product).then(function (data) {
          callback(data);
        });
      }
    }, {
      key: "listDesigBenef",
      value: function listDesigBenef(product, callback) {
        this.segurosOnlineService.getListaDesignacionDeBenef({
          RAMOPCOD: product.RAMOPCOD,
          POLIZANN: product.POLIZANN,
          POLIZSEC: product.POLIZSEC,
          CERTIPOL: product.CERTIPOL,
          CERTIANN: product.CERTIANN,
          CERTISEC: product.CERTISEC,
          DOCUMDAT: product.DOCUMDAT,
          DOCUMTIP: product.DOCUMTIP
        }).then(function (data) {
          if (data !== undefined) {
            callback(data.Message.Request.ERROR);
          } else {
            callback(data);
          }
        });
      }
    }, {
      key: "imprimirCertCober",
      value: function imprimirCertCober(product, callback) {
        this.segurosOnlineService.getimprimirConstCobertura(product).then(function (data) {
          callback(data);
        });
      }
    }, {
      key: "recuperarBeneficiarios",
      value: function recuperarBeneficiarios(product, callBack) {
        this.segurosOnlineService.recuperarBeneficiarios({
          CER_ANN: 0,
          CER_POL: 0,
          CER_SEC: 0,
          COD_PRO: product.RAMOPCOD,
          POL_ANN: product.POLIZANN,
          POL_SEC: product.POLIZSEC
        }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getFormularioTomador",
      value: function getFormularioTomador(list, nroPol, product, callBack) {
        this.segurosOnlineService.getFormularioTomador({
          "COD_PRO": product.RAMOPCOD,
          "NRO_POL": nroPol,
          "ASE_TDO": list.TIP_DOC,
          "ASE_NDO": list.NRO_DOC,
          "IDE_ARC": "PDF_GEN_BEN"
        }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "getFormularioAsegurado",
      value: function getFormularioAsegurado(nroPol, product, callBack) {
        this.segurosOnlineService.getFormularioAsegurado({
          "COD_PRO": product.COD_PRO,
          "NRO_POL": nroPol,
          "IDE_ARC": "PDF_GEN_BEN"
        }).then(function (data) {
          callBack(data);
        });
      }
    }]);

    return BeneficiariosController;
  }(React.Component);

  return BeneficiariosController;
});