var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/segurosOnlineService", "../services/abmNominaService", "../services/userService", "../redux/store", "loadsh", "../lib/utils"], function (React, SegurosOnlineService, AbmNominaService, UserService, Store, Loadsh, Utils) {
  var NominaController = function (_React$Component) {
    _inherits(NominaController, _React$Component);

    function NominaController() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, NominaController);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = NominaController.__proto__ || Object.getPrototypeOf(NominaController)).call.apply(_ref, [this].concat(args))), _this), _this.segurosOnlineService = new SegurosOnlineService(), _this.abmNominaService = new AbmNominaService(), _this.userService = new UserService(), _this.segurosData = Store.getState().seguros, _this.indexOfAll = function (arr, val) {
        return arr.reduce(function (acc, el, i) {
          return el === val ? [].concat(_toConsumableArray(acc), [i]) : acc;
        }, []);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(NominaController, [{
      key: "getTiposDocumento",
      value: function getTiposDocumento(callBack) {
        this.segurosOnlineService.getTiposDocumento({ COD_APP: "SO", COD_PRO: "" }).then(function (data) {
          callBack(data);
        });
      }
    }, {
      key: "handleXLS",
      value: function handleXLS(file, callBack) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: "binary"
          });

          workbook.SheetNames.forEach(function (sheetName) {
            listxls = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            var trimedList = [];
            listxls.forEach(function (row) {
              var newObj = [];
              Object.keys(row).map(function (field) {
                newObj[field.trim()] = row[field];
              });

              trimedList.push(newObj);
            });
            callBack(trimedList);
          });
        };
        reader.onerror = function (ex) {};
        reader.readAsBinaryString(file);
      }
    }, {
      key: "handleXLSValidated",
      value: function handleXLSValidated(file, callBack, validation) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: "binary"
          });

          workbook.SheetNames.forEach(function (sheetName) {
            listxls = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (listxls.length <= 2000) {
              var trimedList = [];
              listxls.forEach(function (row) {
                var newObj = [];
                Object.keys(row).map(function (field) {
                  newObj[field.trim()] = row[field];
                });

                trimedList.push(newObj);
              });
              callBack(trimedList);
            } else {
              validation();
            }
          });
        };
        reader.onerror = function (ex) {};
        reader.readAsBinaryString(file);
      }
    }, {
      key: "handleXLSValidatedCopyExcel",
      value: function handleXLSValidatedCopyExcel(file, callBack, validation) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: "binary"
          });

          workbook.SheetNames.forEach(function (sheetName) {
            listxls = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (listxls.length <= 2000) {
              var trimedList = [];
              listxls.forEach(function (row) {
                var newObj = [];
                Object.keys(row).map(function (field) {
                  newObj[field.trim()] = row[field];
                });

                trimedList.push(newObj);
              });
              callBack(trimedList);
            } else {
              validation();
            }
          });
        };
        reader.onerror = function (ex) {};
        // reader.readAsBinaryString(file);
      }
    }, {
      key: "handlePromiseXLSX",
      value: function handlePromiseXLSX(file) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.onload = function (e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
              type: "binary"
            });

            var hojas = workbook.SheetNames;
            var listExcel = [];

            hojas.forEach(function (hoja) {
              listxls = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[hoja]);

              listxls.forEach(function (row) {
                var newObj = {};

                for (var key in row) {
                  if (row.hasOwnProperty(key)) {
                    var newKey = key.trim().replace(/\s/g, "");
                    var value = row[key];

                    newObj[newKey] = value;
                  }
                }

                listExcel.push(newObj);
              });
            });

            resolve(listExcel);
          };

          reader.onerror = function (ex) {};
          reader.readAsBinaryString(file);
        });
      }
    }, {
      key: "validateField",
      value: function validateField(listFiels, numberOfFields, salaryState, edadMin, edadMax, callBackError, callBackSuccess) {
        var _this2 = this;

        var listError = [];
        var listCabeceraError = [];
        var listUpperCase = [];

        listFiels.map(function (field, i) {
          listStringError = [];
          var cont = 0;
          var obj = {};
          var isValid = true;
          Object.keys(field).map(function (e) {
            // Validar las cabeceras
            if (e.toUpperCase() === "CUIL") {
              cont++;
              var regex = /-/gi;
              obj[e.toUpperCase()] = field[e].toString();
              var editedCuil = field[e].toString().replace(regex, "");
              // Valida si hay algun error en la informacion del excel
              if (field[e].toString().indexOf("-") != -1) {
                listStringError.push("El CUIL no debe contener guiones");
                isValid = false;
              }
              if (isNaN(editedCuil)) {
                listStringError.push("El CUIL debe ser numerico");
                isValid = false;
              }
              if (editedCuil.length !== 11) {
                listStringError.push("El CUIL debe tener 11 caracteres");
                isValid = false;
              }
            } else if (e.toUpperCase() === "APELLIDO" || e.toUpperCase() === "NOMBRE") {
              cont++;
              field[e] = field[e].toString().trim();
              obj[e.toUpperCase()] = field[e].toString();
              var patron = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s']+$/;
              if (!patron.test(field[e])) {
                listStringError.push("El " + e + " no debe contener caracteres especiales");
                isValid = false;
              }
            } else if (e.toUpperCase() === "MAIL") {
              cont++;
              field[e] = field[e].toString().trim();
              obj[e.toUpperCase()] = field[e].toString();
              var patronEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
              if (!patronEmail.test(field[e])) {
                listStringError.push("El formato del EMAIL no es correcto");
                isValid = false;
              }
            } else if (e.toUpperCase() === "FECHA DE NACIMIENTO") {
              cont++;
              var formattedDate = _this2.fechaDeExcel(field[e], "DD/MM/AAAA") || _this2.fechaDeExcel(field[e], "D/M/AAAA");
              var age = Utils.fAgeCalc2(formattedDate);
              obj[e.toUpperCase().trim().replace(/\s/g, "_")] = formattedDate;
              var datePattern = /^\d{2}\/\d{2}\/\d{4}$/g;
              if (!datePattern.test(formattedDate)) {
                listStringError.push("El formato de la FECHA DE NACIMIENTO no es correcto");
                isValid = false;
              } else if (age < edadMin || age > edadMax) {
                listStringError.push("La edad tiene que ser entre " + edadMin + " y " + edadMax + " años");
                isValid = false;
              }
            } else if (e.toUpperCase() === "SUELDO") {
              cont++;
              var salaryPattern = /^\d*\.?\d*$/g;
              if (!salaryPattern.test(field[e])) {
                listStringError.push("El formato de SUELDO no es correcto");
                isValid = false;
              } else if (Number(field[e]) < 0) {
                listStringError.push("El SUELDO tiene que ser mayor o igual a 0");
                isValid = false;
              }
              field[e] = parseFloat(field[e]).toFixed(2);
              obj[e.toUpperCase().trim()] = field[e];

              //ignora si existe otra cabecera en blanco
            } else if (e.toUpperCase().substring(0, 7) != "__EMPTY") {
              // Si la cabecera no es correcta la guarda en la lista
              listCabeceraError.push(e);
            }
          });
          obj.rowNum = i;
          if (cont != numberOfFields) {
            if (!salaryState) {
              //intenga cargar nomina en un producto !==CE15
              listStringError.push("No podemos validar tu n\xF3mina porque estas cargando un reporte incorrecto.\n            Por favor, revis\xE1 el formato y aseg\xFArate de que tenga las caracter\xEDsticas que se detallan en esta pantalla. ");
              isValid = false;
            } else {
              listStringError.push("Se deben completar todos los campos");
              isValid = false;
            }
          }

          if (isValid) listUpperCase.push(obj);
          // Valida si hay alguna cabecera incorrecta
          if (listCabeceraError.length == 0) {
            // Valda si encontro algun error en los campos del excel
            if (listStringError.length > 0) {
              listError.push({
                row: obj.rowNum + 2,
                listError: listStringError
              });
            }

            // Envia la lista con errores de los campos
            if (listError.length > 0) {
              callBackError(listError);
            } else {
              // convertir keys a UpperCase
              listUpperCase.forEach(function (field) {
                var aux = {};
                Object.keys(field).map(function (e) {
                  if (e != "rowNum") aux[e.toUpperCase()] = field[e].trim();
                });
                aux.rowNum = field.rowNum;
                return aux;
              });
              // manda los campos para que se muestren en la tabla
              callBackSuccess(listUpperCase);
            }
          } else {
            // envia la lista con errores en la cabecera
            callBackError(listCabeceraError);
          }
        });
      }
    }, {
      key: "fechaDeExcel",
      value: function fechaDeExcel(days, fecha) {
        if (isNaN(days) || fecha === "AAAAMMDD") {
          return days;
        }

        var date = new Date(1900, 0, 1);

        date.setDate(date.getDate() + days - 2);

        // Consigo los valores del valor ingresado para ver si es una fecha válida
        var dia = date.getDate() < 10 ? "0" + date.getDate().toString() : date.getDate().toString();
        var mes = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
        var anio = date.getFullYear().toString();

        fecha = fecha.replace(/DD/g, dia);
        fecha = fecha.replace(/MM/g, mes);

        if (fecha.indexOf("AAAA") >= 0) {
          fecha = fecha.replace(/AAAA/g, anio);
        } else if (fecha.indexOf("AA") >= 0) {
          fecha = fecha.replace(/AA/g, anio.substr(2, 2));
        }

        return fecha;
      }
    }, {
      key: "validateFieldWithFormats",
      value: function validateFieldWithFormats(listFields, camposNomina, callBackError, callBackSuccess) {
        var _this3 = this;

        var listError = [];
        var listCabeceraError = [];
        var listCuils = [];

        listFields.map(function (field, rowNum) {
          var numberProperty = camposNomina.filter(function (campo) {
            return campo.nombre === "Suma asegurada" || campo.nombre === "Sueldo";
          });
          var properties = Object.keys(field);
          var keyFecha = properties.find(function (key) {
            return key.toUpperCase().trim().includes("FECHA");
          });

          if (keyFecha.toUpperCase().includes("FECHA") && !keyFecha.toUpperCase().includes("DE")) {
            field[keyFecha.replace(" ", " DE ")] = field[keyFecha];

            delete field[keyFecha];
          }

          listStringError = [];

          if (numberProperty.length > 0 && numberProperty[0].formato.texto === "10000,00") {
            var property = properties.find(function (property) {
              return property.toLowerCase() === numberProperty[0].nombre.toLowerCase();
            });

            if (property && typeof field[property] !== "string") {
              field[property] = field[property].toString().replace(".", ",");
            }
          }

          camposNomina.map(function (campo) {
            // tengo que recorrer por los campos de la nomina, porque sino no puede verificar si falta alguno
            // Object.keys(field).map((key, row) => {
            // Validar las cabeceras si son de las solicitadas
            var key = Object.keys(field).find(function (key) {
              return key.toUpperCase().trim() === campo.nombre.toUpperCase().trim();
            });

            if (key !== undefined) {
              // Valida si hay algun error en la informacion del excel
              var formato = new RegExp(campo.formato.regex, "i");
              var valorKey = field[key].toString().trim();
              // el unico que no es requerido es el email
              if (key.toUpperCase().trim() === "CUIL") {
                if (listCuils.includes(valorKey.trim())) {
                  listStringError.push("El CUIL " + valorKey + " se encuentra duplicado");
                } else if (formato.test(valorKey)) {
                  listCuils.push(valorKey.trim());
                } else {
                  listStringError.push("El formato del campo " + key + " no es correcto");
                }
              } else if ((valorKey === undefined || valorKey === "") && key.toUpperCase().trim() !== "MAIL" && key.toUpperCase().trim() !== "SEXO" && key.toUpperCase().trim() !== "ACTIVIDAD") {
                listStringError.push("El campo " + key + " es obligatorio");
              } else if (key.toUpperCase().substr(0, 5) !== "FECHA" && !formato.test(valorKey)) {
                listStringError.push("El formato del campo " + key + " no es correcto");
              } else if (key.toUpperCase().substr(0, 5) === "FECHA" && !formato.test(_this3.fechaDeExcel(valorKey, campo.formato.texto))) {
                listStringError.push("El formato del campo " + key + " no es correcto");
              } else if (key.toUpperCase().trim() === "NOMBRE" && valorKey.length >= 30) {
                listStringError.push("El formato del campo " + key + " debe ser menor a 30 caracteres");
              }
            } else {
              // Si la cabecera no es correcta la guarda en la lista
              if (campo.nombre.toUpperCase().trim() !== "MAIL" && campo.nombre.toUpperCase().trim() !== "SEXO" && campo.nombre.toUpperCase().trim() !== "ACTIVIDAD") {
                listStringError.push("El campo " + campo.nombre + " es obligatorio");
              }
            }
          });

          // Valida si hay alguna cabecera incorrecta
          if (listCabeceraError.length == 0) {
            // Valda si encontro algun error en los campos del excel
            if (listStringError.length > 0) {
              listError.push({
                row: rowNum + 2,
                listError: listStringError
              });
            }
            // Envia la lista con errores de los campos
            callBackError(listError);

            // convertir keys a UpperCase
            var listUpperCase = listFields.map(function (field) {
              var aux = {};
              Object.keys(field).map(function (e) {
                aux[e.toUpperCase()] = field[e];
              });
              return aux;
            });
            // manda los campos para que se muestren en la tabla
            callBackSuccess(listUpperCase);
          } else {
            // envia la lista con errores en la cabecera
            callBackError(listCabeceraError);
          }
        });
      }
    }, {
      key: "sendNomina",
      value: function sendNomina(list, product, callback, user, form) {
        var _this4 = this;

        var producto = product.cup ? product.cup : product;
        var error = [];
        list.map(function (benef) {
          if (benef.VALIDACION != "NOMAIL") {
            _this4.segurosOnlineService.designarBeneficiario({
              MAIL: benef.MAIL,
              DATOSREGISTRO: benef.DATOSREGISTRO,
              VALIDACION: benef.VALIDACION,
              FORM: form,
              POLIZA: {
                COD_PRO: producto.RAMOPCOD,
                POL_ANN: producto.POLIZANN,
                POL_SEC: producto.POLIZSEC,
                CER_POL: producto.CERTIPOL,
                CER_ANN: producto.CERTIANN,
                CER_SEC: producto.CERTISEC,
                TOM_TDO: user.TIPODOCU.toString(),
                TOM_NDO: user.NUMEDOCU.toString(),
                TOM_APE: user.CLIENAP1
              }
            }).then(function (data) {
              if (data.GRABANOM != "NO_ERROR") callback.apply(undefined, error.concat([data]));else callback(error);
            });
          }
        });
      }
    }, {
      key: "sendPendientes",
      value: function sendPendientes(list, form, callback) {
        var _this5 = this;

        var error = [];
        list.map(function (benef) {
          _this5.segurosOnlineService.designarBeneficiario({
            MAIL: benef.DIR_EMA,
            DATOSREGISTRO: {
              ASE_APE: benef.ASE_APE,
              ASE_NOM: benef.ASE_NOM,
              MAIL: benef.DIR_EMA,
              NRO_DOC: benef.NRO_DOC,
              TIP_DOC: benef.TIP_DOC
            },
            VALIDACION: "OK",
            FORM: form,
            POLIZA: {
              COD_PRO: benef.COD_PRO,
              POL_ANN: benef.POL_ANN,
              POL_SEC: benef.POL_SEC,
              CER_POL: benef.CER_POL,
              CER_ANN: benef.CER_ANN,
              CER_SEC: benef.CER_SEC,
              TOM_TDO: benef.TOM_TDO.toString(),
              TOM_NDO: benef.TOM_NDO.toString(),
              TOM_APE: benef.TOM_APE
            }
          }).then(function (data) {
            if (data.GRABANOM != "NO_ERROR") callback.apply(undefined, error.concat([data]));else callback(error);
          });
        });
      }
    }, {
      key: "arrayFilteredFields",
      value: function arrayFilteredFields() {
        var currentProduct = this.segurosData.currentProduct;

        var plans = {
          accPer: ["CAP1", "CAP2", "CAP3", "CAP5", "CA01", "CA11", "CA12", "CA13", "CA21"],
          salDeu: ["CD11", "CD21", "CD22", "CD23", "CD24"],
          vidaObl: ["CE11", "CE17", "CE21", "CE23", "CE27", "CM01", "CM11", "CO11", "CS11", "CS13"],
          vidaColecOp: ["CT01", "CT11"],
          vidaCe15: "CE15",
          vidaCe13: "CE13"
        };
        var discardedArray = [];
        var discardedCommon = ["DATOSREGISTRO", "EDAD", "MODIFNOM", "CLIENAP2", "GRABAFEC", "DOCUMTIP", "DOCUMDATT", "TOPCONVE", "id", "DOCUMTIPT", "SWSELEC", "VALIDACION"];
        var filterArray = [];
        if (plans.accPer.some(function (e) {
          return e === currentProduct.ramopcod;
        })) {
          discardedArray = ["FECING", "SUELDO", "SALDODEUDA"];
        }
        if (plans.salDeu.some(function (e) {
          return e === currentProduct.ramopcod;
        })) {
          discardedArray = ["FECING", "PROFECOD", "COBERTURAS", "SUELDO"];
        }
        if (plans.vidaObl.some(function (e) {
          return e === currentProduct.ramopcod;
        })) {
          discardedArray = ["FECING", "PROFECOD", "COBERTURAS", "SUELDO", "SALDODEUDA"];
        }
        if (plans.vidaColecOp.some(function (e) {
          return e === currentProduct.ramopcod;
        })) {
          discardedArray = ["PROFECOD", "COBERTURAS", "SALDODEUDA"];
        }
        if (plans.vidaCe15 === currentProduct.ramopcod) {
          discardedArray = ["FECING", "PROFECOD", "COBERTURAS", "SALDODEUDA"];
        }
        if (plans.vidaCe13 === currentProduct.ramopcod) {
          discardedArray = ["FECING", "PROFECOD", "SUELDO", "SALDODEUDA"];
        }
        filterArray = discardedCommon.concat(discardedArray);
        return filterArray;
      }
    }, {
      key: "reqEnvioListaNomina",
      value: function reqEnvioListaNomina(list, product, context) {
        var _this6 = this;

        var nomina = list.map(function (item) {
          var newItem = {
            EDAD: 0,
            MAIL: item.MAIL ? item.MAIL : item.EMAIL ? item.EMAIL : "",
            PROFECOD: item.PROFECOD,
            SEXO: context == "ABM" ? item.SEXO : "",
            DOCUMTIP: context == "ABM" ? item.DOCUMTIP : 5, //CUIL
            DOCUMDAT: context == "ABM" ? item.DOCUMDAT : item.CUIL,
            CLIENAP1: context == "ABM" ? item.CLIENAP1 : item.APELLIDO.toUpperCase(),
            CLIENAP2: "",
            CLIENNOM: context == "ABM" ? item.CLIENOM : item.NOMBRE.toUpperCase(),
            FECNAC: context == "ABM" ? item.FECNAC : item.FECHA_DE_NACIMIENTO,
            FECING: context == "ABM" ? item.FECING : item["FECHA DE INGRESO"] ? Number(_this6.fechaDeExcel(item["FECHA DE INGRESO"], "AAAAMMDD")) : 0,
            SUELDO: item.SUELDO,
            SWSELEC: context == "ABM" ? item.SWSELECT : "T",
            TOPCONVE: "",
            DOCUMTIPT: 0,
            DOCUMDATT: context == "ABM" ? item.DOCUMDATT : "",
            CONYUGE: "",
            MODIFNOM: context == "ABM" ? item.MODIFNOM == "A" ? item.MODIFNOM : "M" : "",
            GRABAANN: 0,
            GRABAMES: 0,
            GRABADIA: 0
          };
          switch (product.ramopcod.substr(0, 2)) {
            case "CO":
            case "CE":
              {
                newItem.COBERTURA = [{
                  COBERCOD: 100,
                  SUMAASEG: 0
                }];
              }
              break;
            case "CT":
              {
                newItem.COBERTURA = [{
                  COBERCOD: 100,
                  SUMAASEG: context == "ABM" ? parseInt(item.COBERTURAS.COBERTURA[0].SUMAASEG) : item["SUMA ASEGURADA"] ? parseInt(item["SUMA ASEGURADA"]) : 0
                }];
              }
              break;
            case "CA":
              {
                newItem.COBERTURA = [{
                  COBERCOD: 300,
                  SUMAASEG: context == "ABM" ? parseInt(item.COBERTURAS.COBERTURA[0].SUMAASEG) : item["SUMA ASEGURADA"] ? parseInt(item["SUMA ASEGURADA"]) : 0
                }];
              }
              break;
          }
          return newItem;
        });
        return nomina;
      }
    }, {
      key: "reqEnvioNomina",
      value: function reqEnvioNomina(currentProduct, codigo, numero, cantidad, grupo, isLast) {
        var req = {
          PRODUCTO: currentProduct.ramopcod,
          SUBPRODUCTO: currentProduct.ramopcod == "CE01" ? "CEX1" : currentProduct.ramopcod,
          CODIGO: codigo,
          NUMERO: numero,
          CANTIDAD: cantidad,
          ESTADOMSG: isLast ? "OK" : "",
          POLIZANN: currentProduct.polizann,
          POLIZSEC: currentProduct.polizsec,
          EXPEDNUM: grupo.grupocod,
          FECVIG: grupo.fecvig
        };
        return req;
      }
    }, {
      key: "logImpresoAltasTempranas",
      value: function logImpresoAltasTempranas(poliza) {
        //let paramLog = poliza;
        this.abmNominaService.logAltasTempranas(poliza);
      }
    }, {
      key: "sendNominaAsegurados",
      value: function sendNominaAsegurados(listNomina, grupo, callback, context) {
        var _this7 = this;

        var limite = 30;
        var currentProduct = this.segurosData.currentProduct;

        var reqList = this.reqEnvioListaNomina(listNomina, currentProduct, context);

        this.abmNominaService.traerNumeroCotizacionColectivo({
          PRODUCTO: currentProduct.ramopcod,
          SUBPRODUCTO: currentProduct.ramopcod == "CE01" ? "CEX1" : currentProduct.ramopcod
        }).then(function (data) {
          var nroCotizCol = data.Message.DATOS;
          var segmentedList = Loadsh.chunk(reqList, limite); //divide en 30

          var _loop = function _loop(i, _p) {
            _p = _p.then(function () {
              return new Promise(function (resolve) {
                var isLast = i === segmentedList.length - 1 ? true : false;
                var reqHeader = _this7.reqEnvioNomina(currentProduct, nroCotizCol.CODIGO, nroCotizCol.NUMERO, segmentedList[i].length, grupo, isLast);
                var listaSinGuiones = segmentedList[i].map(function (el) {
                  var DOCUMDAT = void 0;
                  if (typeof el.DOCUMDAT === "number") {
                    DOCUMDAT = el.DOCUMDAT.toString();
                  } else if (typeof el.DOCUMDAT === "string") {
                    DOCUMDAT = el.DOCUMDAT.replaceAll("-", "");
                  }
                  return Object.assign({}, el, { DOCUMDAT: DOCUMDAT });
                });
                _this7.abmNominaService.enviarNomina(Object.assign({ NOMINA: listaSinGuiones }, reqHeader)).then(function (errorSend) {
                  resolve();
                  if (isLast) {
                    if (errorSend.Code != "NO_ERROR") {
                      callback(errorSend.Code, {
                        CANTERROR: 0,
                        LISTAERRORES: { LISTAERROR: [] }
                      });
                    } else if (errorSend.Message.Request.ESTADOMSG && errorSend.Message.Request.ESTADOMSG == "OK") {
                      _this7.abmNominaService.validarNomina({
                        //USUARCOD:,
                        RAMOPCOD: currentProduct.ramopcod,
                        POLIZANN: currentProduct.polizann,
                        POLIZSEC: currentProduct.polizsec,
                        CODNOMINA: [{
                          CODIGO: nroCotizCol.CODIGO,
                          NUMERO: nroCotizCol.NUMERO
                        }],
                        FECVIG: grupo.fecvig

                      }).then(function (errorVal) {
                        if (errorVal.Code == "BUSINESS_VALIDATION_ERROR") {
                          callback(errorVal.Code, {
                            CANTERROR: 1,
                            LISTAERRORES: { LISTAERROR: [] }
                          });
                        } else if (errorVal.Code == "NO_ERROR" && errorVal.Message.DATOS.CANTERR != 0) {
                          callback(null, errorVal.Message.DATOS);
                        } else {
                          _this7.userService.getLoggedUser().then(function (userdata) {
                            _this7.abmNominaService
                            //COD_PAR: para productos CO ABMEMAVOB, para el resto ABMEMAVOT
                            .getEmailEnvio({
                              COD_PAR: currentProduct.ramopcod.substring(0, 2) == "CO" ? "ABMEMAVOB" : "ABMEMAVOT"
                            }).then(function (responseEmail) {
                              var user = _this7.typeDocByNumber(userdata.TIPODOCU) + " " + userdata.NUMEDOCU + " " + "(" + userdata.MAIL + ")";
                              var poliza = currentProduct.ramopcod + "-" + currentProduct.polizann + "-" + currentProduct.polizsec;
                              var fechaVigencia = Utils.formatFechaString(grupo.fecvig);
                              var producto = "";
                              switch (currentProduct.ramopcod.substring(0, 2)) {
                                case "CO":
                                  producto = "(VIDA OBLIGATORIO)";
                                  break;
                                case "CE":
                                  producto = "(OPTATIVO EMPRESAS) ";
                                  break;
                                case "CA":
                                  producto = "(ACCIDENTES PERSONALES)";
                                  break;
                                case "CT":
                                  producto = "(CONTRATO DE TRABAJO)";
                                  break;
                              }

                              var headerTable = "";
                              Object.entries(listNomina[0]).map(function (e) {
                                if (!_this7.arrayFilteredFields().includes(e[0])) {
                                  //Filtra los campos que no van en la tabla
                                  if (e[0] === "COBERTURAS") {
                                    //Cambia el header de la tabla de COBERTURAS a SUMAASEG
                                    headerTable = headerTable + "SUMAASEG   \t";
                                  } else {
                                    headerTable = headerTable + e[0].padEnd(24, " ").substring(0, 20) + "\t";
                                  }
                                }
                              });

                              var bodyTable = "";
                              listNomina.map(function (item) {
                                Object.entries(item).map(function (aux) {
                                  if (!_this7.arrayFilteredFields().includes(aux[0])) {
                                    if (aux[0].substring(0, 3) === "FEC") {
                                      //Formatea los datos de la tabla que son fechas
                                      if (aux[1] < 10000000) {
                                        //Distingue si las fechas vienen desde carga de un archivo excel o manual
                                        bodyTable = bodyTable + _this7.fechaDeExcel(aux[1], "DD/MM/AAAA").padEnd(24, " ").substring(0, 20) + "\t";
                                      } else {
                                        bodyTable = bodyTable + Utils.formatFechaString(aux[1]).padEnd(24, " ").substring(0, 20) + "\t";
                                      }
                                    } else if (aux[0] === "COBERTURAS") {
                                      //Imprime el dato de suma asegurada correctamente
                                      console.log(aux[1], aux[1].SUMAASEG);
                                      bodyTable = bodyTable + aux[1].COBERTURA[0].SUMAASEG.toString().padEnd(24, " ").substring(0, 20) + "\t";
                                    } else if (aux[0] === "SEXO") {
                                      //Formatea el dato del sexo en la tabla
                                      bodyTable = bodyTable + (aux[1] === "M" ? "MASCULINO" : "FEMENINO").padEnd(24, " ").substring(0, 20) + "\t";
                                    } else if (aux[0].substring(0, 3) !== "FEC") {
                                      //Imprime todo el resto de datos que no necesitan formato, con esa condicion para que no duplique la fecha
                                      bodyTable = bodyTable + aux[1].toString().padEnd(24, " ").substring(0, 20) + "\t";
                                    }
                                  }
                                });
                                bodyTable = bodyTable + "\n";
                              });

                              var text = "Sres." + "\n\nAdjunto a la presente el ABM de nomina que hemos remitido a través de Seguros Online" + "\ncorrespondiente a la vigencia " + fechaVigencia + " de la póliza " + poliza + " " + producto + "\n\nEnviado por el usuario " + user + "\n\nDetalle\n\n" + headerTable + "\n" + bodyTable;

                              _this7.abmNominaService.enviarEmail({
                                prod: currentProduct.ramopcod.substring(0, 2),
                                bodyText: text
                              }).then(function () {
                                callback(null, errorVal.Message.DATOS);
                              });
                            });
                          });
                        }
                      });
                    } else if (errorSend.Message.Request.ESTADOMSG && errorSend.Message.Request.ESTADOMSG == "ER") {
                      callback(errorSend.Message.Request.ERRORMSG, {
                        CANTERROR: 0,
                        LISTAERRORES: { LISTAERROR: [] }
                      });
                    } else {
                      callback("500", {
                        CANTERROR: 0,
                        LISTAERRORES: { LISTAERROR: [] }
                      });
                    }
                  }
                });
              });
            });
            p = _p;
          };

          for (var i = 0, p = Promise.resolve(); i < segmentedList.length; i++) {
            _loop(i, p);
          }
        });
      }
    }, {
      key: "typeDocByNumber",
      value: function typeDocByNumber(typeDoc) {
        switch (typeDoc) {
          case 1:
            return "DNI";
          case 2:
            return "LE";
          case 3:
            return "LC";
          case 6:
            return "CI";
          case 47:
            return "P";
          case 4:
            return "CUIT";
          case 5:
            return "CUIL";
          default:
            return "";
        }
      }
    }, {
      key: "sendMailsNominaAbm",
      value: function sendMailsNominaAbm(lista, currentProduct, user, callbackErrorSendNomina) {
        var _this8 = this;

        var added = [];
        lista.forEach(function (item) {
          added.push({
            CUIL: item.DOCUMDAT,
            MAIL: item.MAIL || item.EMAIL,
            DOCUMTIP: item.DOCUMTIP,
            APELLIDO: item.CLIENAP1,
            NOMBRE: item.CLIENOM,
            FECHA_DE_NACIMIENTO: item.FECNAC,
            SUELDO: item.SUELDO
          });
        });
        this.validateNominaAsegurados(added, function (response) {
          var list = [];
          if (response.VALIDACION != "MAILOK" && response.VALIDACION != "NOEXIST") {
            list.push(response);
          }
          _this8.sendNomina(list, currentProduct, callbackErrorSendNomina, user, "ABM");
        });
      }
    }, {
      key: "validateNominaAbm",
      value: function validateNominaAbm(nomina) {
        var _this9 = this;

        return new Promise(function (resolve, reject) {
          var added = [];
          var list = [];

          nomina.forEach(function (item) {
            added.push({
              CUIL: item.DOCUMDAT,
              MAIL: item.MAIL !== undefined ? item.MAIL : item.EMAIL,
              DOCUMTIP: item.DOCUMTIP,
              APELLIDO: item.CLIENAP1,
              NOMBRE: item.CLIENOM,
              FECHA_DE_NACIMIENTO: item.FECNAC,
              SUELDO: item.SUELDO
            });
          });

          _this9.validateNominaAsegurados(added, function (response) {
            list.push(response);
            if (list.length === added.length) {
              for (var i = 0; i < nomina.length; i++) {
                nomina[i].VALIDACION = list[i].VALIDACION;

                if (list[i].VALIDACION === "DOCOK") {
                  nomina[i].DATOSREGISTRO = list[i].DATOSREGISTRO;
                }
              }

              resolve();
            }
          });
        });
      }
    }, {
      key: "validateNominaAsegurados",
      value: function validateNominaAsegurados(listExcel, response) {
        var _this10 = this;

        listExcel.map(function (e) {
          if (e.MAIL != undefined && e.MAIL != "") {
            e.CUIL = e.CUIL.toString().replace(/-/gi, ""); //Si el cuil tiene guiones se los saca
            e.NOMBRE = e.NOMBRE.toString().replace(/´/gi, "");
            e.APELLIDO = e.APELLIDO.toString().replace(/´/gi, "");
            _this10.segurosOnlineService.P_NBWS_ClienteSuscripto({
              MAIL: e.MAIL,
              DOCUMTIP: 1, // Codigo DNI
              DOCUMDAT: e.CUIL.substring(2, 10)
            }).then(function (clienteSuscriptoDNI) {
              if (clienteSuscriptoDNI.Code == "NO_ERROR") {
                var registryDataDNI = {
                  MAIL: e.MAIL,
                  NRO_DOC: e.CUIL.substring(2, 10),
                  TIP_DOC: "1",
                  ASE_APE: e.APELLIDO,
                  ASE_NOM: e.NOMBRE,
                  FEC_NAC: e.FECHA_DE_NACIMIENTO ? Utils.formatFechaNumber(e.FECHA_DE_NACIMIENTO) : 0,
                  ASE_SUE: e.SUELDO ? String(e.SUELDO).toUpperCase() : ""
                };
                if (
                //Si coincide DNI pero con otro correo
                clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                  e.VALIDACION = "DOCOK";
                  e.DATOSREGISTRO = registryDataDNI;
                  e.DATOSREGISTRO.MAIL = clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL;
                  response(e);
                } else if (
                //si coincide DNI con correo
                clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "S") {
                  e.VALIDACION = "OK";
                  e.DATOSREGISTRO = registryDataDNI;
                  response(e);
                } else {
                  //llamo al servicio por cuil
                  _this10.segurosOnlineService.P_NBWS_ClienteSuscripto({
                    MAIL: e.MAIL,
                    DOCUMTIP: 5, // Codigo CUIL
                    DOCUMDAT: e.CUIL
                  }).then(function (clienteSuscriptoCUIL) {
                    if (clienteSuscriptoCUIL.Code == "NO_ERROR") {
                      var registryDataCUIL = {
                        MAIL: e.MAIL,
                        NRO_DOC: e.CUIL,
                        TIP_DOC: "5",
                        ASE_APE: e.APELLIDO,
                        ASE_NOM: e.NOMBRE,
                        FEC_NAC: e.FECHA_DE_NACIMIENTO ? Utils.formatFechaNumber(e.FECHA_DE_NACIMIENTO) : 0,
                        ASE_SUE: e.SUELDO ? String(e.SUELDO).toUpperCase() : ""
                      };
                      if (
                      //si no coincide ni correo ni dni ni cuil
                      clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "N" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                        //es nuevo y se da de alta.
                        e.VALIDACION = "ADD";
                        e.DATOSREGISTRO = registryDataCUIL;
                        response(e);
                      } else if (
                      //si coincide solo correo pero no cuil ni dni
                      clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "N" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                        e.VALIDACION = "MAILOK";
                        response(e);
                      } else if (
                      //Si coincide CUIL pero no coincide mail
                      clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                        e.VALIDACION = "DOCOK";
                        e.DATOSREGISTRO = registryDataCUIL;
                        e.DATOSREGISTRO.MAIL = clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL;
                        response(e);
                      } else if (
                      //si coincide cuil+correo
                      clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "S") {
                        e.VALIDACION = "OK";
                        e.DATOSREGISTRO = registryDataCUIL;
                        response(e);
                      } else {
                        e.VALIDACION = "MAILOK";
                        response(e);
                      }
                    }
                  });
                }
              }
            });
          } else {
            e.VALIDACION = "NOMAIL";
            response(e);
          }
        });
      }
    }, {
      key: "validateNominaAdhesion",
      value: function validateNominaAdhesion(listExcel, response, product) {
        var _this11 = this;

        listExcel.map(function (e) {
          if (e.MAIL != undefined) {
            e.CUIL = e.CUIL.toString().replace(/-/gi, ""); //Si el cuil tiene guiones se los saca
            _this11.segurosOnlineService.getListaDesignacionDeBenef({
              RAMOPCOD: product.RAMOPCOD,
              POLIZANN: product.POLIZANN,
              POLIZSEC: product.POLIZSEC,
              CERTIPOL: product.CERTIPOL,
              CERTIANN: product.CERTIANN,
              CERTISEC: product.CERTISEC,
              DOCUMDAT: e.CUIL,
              DOCUMTIP: 5 //cuil
            }).then(function (data) {
              if (data.Message.Request.ERROR == "" || data.Message.Request.ESTADO == "OK") {
                var registryDataExi = {
                  MAIL: e.MAIL,
                  NRO_DOC: e.CUIL,
                  TIP_DOC: "5",
                  ASE_APE: e.APELLIDO,
                  ASE_NOM: e.NOMBRE,
                  FEC_NAC: e.FECHA_DE_NACIMIENTO ? Utils.formatFechaNumber(e.FECHA_DE_NACIMIENTO) : 0,
                  ASE_SUE: e.SUELDO ? e.SUELDO.toUpperCase() : ""
                };
                e.VALIDACION = "YAEXIST";
                e.DATOSREGISTRO = registryDataExi;
                response(e);
              } else {
                _this11.segurosOnlineService.P_NBWS_ClienteSuscripto({
                  MAIL: e.MAIL,
                  DOCUMTIP: 1, // Codigo DNI
                  DOCUMDAT: e.CUIL.substring(2, 10)
                }).then(function (clienteSuscriptoDNI) {
                  if (clienteSuscriptoDNI.Code == "NO_ERROR") {
                    var registryDataDNI = {
                      MAIL: e.MAIL,
                      NRO_DOC: e.CUIL.substring(2, 10),
                      TIP_DOC: "1",
                      ASE_APE: e.APELLIDO,
                      ASE_NOM: e.NOMBRE,
                      FEC_NAC: e.FECHA_DE_NACIMIENTO ? Utils.formatFechaNumber(e.FECHA_DE_NACIMIENTO) : 0,
                      ASE_SUE: e.SUELDO ? e.SUELDO.toUpperCase() : ""
                    };
                    if (
                    //Si coincide DNI pero con otro correo
                    clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                      e.VALIDACION = "DOCOK";
                      e.DATOSREGISTRO = registryDataDNI;
                      e.DATOSREGISTRO.MAIL = clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL;
                      response(e);
                    } else if (
                    //si coincide DNI con correo
                    clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "S") {
                      e.VALIDACION = "OK";
                      e.DATOSREGISTRO = registryDataDNI;
                      response(e);
                    } else {
                      //llamo al servicio por cuil
                      _this11.segurosOnlineService.P_NBWS_ClienteSuscripto({
                        MAIL: e.MAIL,
                        DOCUMTIP: 5, // Codigo CUIL
                        DOCUMDAT: e.CUIL
                      }).then(function (clienteSuscriptoCUIL) {
                        if (clienteSuscriptoCUIL.Code == "NO_ERROR") {
                          var registryDataCUIL = {
                            MAIL: e.MAIL,
                            NRO_DOC: e.CUIL,
                            TIP_DOC: "5",
                            ASE_APE: e.APELLIDO,
                            ASE_NOM: e.NOMBRE,
                            FEC_NAC: e.FECHA_DE_NACIMIENTO ? Utils.formatFechaNumber(e.FECHA_DE_NACIMIENTO) : 0,
                            ASE_SUE: e.SUELDO ? e.SUELDO.toUpperCase() : ""
                          };
                          if (
                          //si no coincide ni correo ni dni ni cuil
                          clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "N" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                            //es nuevo y se da de alta.
                            e.VALIDACION = "ADD";
                            e.DATOSREGISTRO = registryDataCUIL;
                            response(e);
                          } else if (
                          //si coincide solo correo pero no cuil ni dni
                          clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "N" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].MAIL == "" && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoDNI.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                            e.VALIDACION = "MAILOK";
                            response(e);
                          } else if (
                          //Si coincide CUIL pero no coincide mail
                          clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT == 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "N") {
                            e.VALIDACION = "DOCOK";
                            e.DATOSREGISTRO = registryDataCUIL;
                            e.DATOSREGISTRO.MAIL = clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL;
                            response(e);
                          } else if (
                          //si coincide cuil+correo
                          clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].MAIL != "" && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].DOCUMDAT != 0 && clienteSuscriptoCUIL.Message.CAMPOS.CAMPO[0].CORRECTO == "S") {
                            e.VALIDACION = "OK";
                            e.DATOSREGISTRO = registryDataCUIL;
                            response(e);
                          } else {
                            e.VALIDACION = "MAILOK";
                            response(e);
                          }
                        }
                      });
                    }
                  }
                });
              }
            });
          } else {
            e.VALIDACION = "NOMAIL";
            response(e);
          }
        });
      }
    }, {
      key: "getActivitiesFromExcel",
      value: function getActivitiesFromExcel(list) {
        var resp = list.map(function (item) {
          for (var key in item) {
            if (key !== key.toUpperCase()) {
              item[key.toUpperCase()] = item[key];

              delete item[key];
            }
          }

          return item.ACTIVIDAD;
        });

        resp = resp.filter(function (e) {
          return e !== undefined;
        });

        return [].concat(_toConsumableArray(new Set(resp)));
      }
    }, {
      key: "validateDesigBenef",
      value: function validateDesigBenef(documdat, response, product) {
        var _this12 = this;

        var e = {};

        this.segurosOnlineService.getListaDesigBenefNoVal({
          RAMOPCOD: product.RAMOPCOD,
          POLIZANN: product.POLIZANN,
          POLIZSEC: product.POLIZSEC,
          CERTIPOL: product.CERTIPOL,
          CERTIANN: product.CERTIANN,
          CERTISEC: product.CERTISEC,
          DOCUMDAT: documdat,
          DOCUMTIP: 5 //cuil
        }).then(function (data) {
          if (
          //si no encuentra por cuil
          data.Message.Request.ERROR != "" || data.Message.Request.ESTADO != "OK") {
            //buscar por dni
            _this12.segurosOnlineService.getListaDesigBenefNoVal({
              RAMOPCOD: product.RAMOPCOD,
              POLIZANN: product.POLIZANN,
              POLIZSEC: product.POLIZSEC,
              CERTIPOL: product.CERTIPOL,
              CERTIANN: product.CERTIANN,
              CERTISEC: product.CERTISEC,
              DOCUMDAT: documdat.substring(2, 10),
              DOCUMTIP: 1 //dni
            }).then(function (data) {
              if (data.Message.Request.ERROR != "" || data.Message.Request.ESTADO != "OK") {
                e.VALIDACION = "NOEXIST";
                response(e);
              } else if (data.Message.CAMPOS.PERMITE != "S") {
                e.VALIDACION = "NODESIGNA";
                e.MOTIVO = data.Message.CAMPOS.MOTIVO;
                response(e);
              } else {
                e.VALIDACION = "OK";
                response(e);
              }
            });
          } else if (data.Message.Request.ERROR == "" && data.Message.Request.ESTADO == "OK") {
            if (data.Message.CAMPOS.PERMITE != "S") {
              e.VALIDACION = "NODESIGNA";
              e.MOTIVO = data.Message.CAMPOS.MOTIVO;
              response(e);
            } else {
              e.VALIDACION = "OK";
              response(e);
            }
          }
        });
      }
    }, {
      key: "validateNomina",
      value: function validateNomina(listExcel, response, product) {
        var _this13 = this;

        listProcess = listExcel.map(function (e) {
          _this13.segurosOnlineService.P_NBWS_ClienteSuscripto({
            MAIL: e.MAIL,
            DOCUMTIP: 5, // Codigo CUIL
            DOCUMDAT: e.CUIL
          }).then(function (clienteSuscripto) {
            if (clienteSuscripto.Code == "NO_ERROR") {
              var _clienteSuscripto$Mes = clienteSuscripto.Message.CAMPOS.CAMPO[0],
                  MAIL = _clienteSuscripto$Mes.MAIL,
                  DOCUMDAT = _clienteSuscripto$Mes.DOCUMDAT,
                  CORRECTO = _clienteSuscripto$Mes.CORRECTO;

              if (MAIL != "" && DOCUMDAT != 0 && CORRECTO == "S") {
                //Si coinciden CUIL y MAIL
                //DEBE ENVIAR MAIL Y GRABAR
                e.VALIDACION = "OK";
                e.DATOSREGISTRO = {
                  MAIL: e.MAIL,
                  NRO_DOC: e.CUIL,
                  TIP_DOC: "5",
                  ASE_APE: e.APELLIDO,
                  ASE_NOM: e.NOMBRE
                };
                e.POLIZA = product;
                response(e);
              } else if (MAIL != "" && DOCUMDAT == 0 && CORRECTO == "N") {
                //Si encuentra CUIL pero no mail
                e.VALIDACION = "DOCOK"; //
                e.POLIZA = product;
                //registro benef
                e.DATOSREGISTRO = {
                  MAIL: MAIL,
                  NRO_DOC: e.CUIL,
                  TIP_DOC: "5",
                  ASE_APE: e.APELLIDO,
                  ASE_NOM: e.NOMBRE
                };
                response(e);
              } else {
                //Se deberia poder sacar esta condicion porque ya lo verifica si esta registrado
                //Busca por DNI
                _this13.segurosOnlineService.P_NBWS_ClienteSuscripto({
                  MAIL: e.MAIL,
                  DOCUMTIP: 1, // Codigo DNI
                  DOCUMDAT: e.CUIL.substring(2, 10)
                }).then(function (clienteSuscripto) {
                  if (clienteSuscripto.Code == "NO_ERROR") {
                    var _clienteSuscripto$Mes2 = clienteSuscripto.Message.CAMPOS.CAMPO[0],
                        _MAIL = _clienteSuscripto$Mes2.MAIL,
                        _DOCUMDAT = _clienteSuscripto$Mes2.DOCUMDAT,
                        _CORRECTO = _clienteSuscripto$Mes2.CORRECTO;
                    //Si encuentra por DNI pero correo no coincide

                    if (_MAIL != "" && _DOCUMDAT == 0 && _CORRECTO == "N") {
                      e.VALIDACION = "DOCOK";
                      e.POLIZA = product;
                      //Guarda Benef
                      e.DATOSREGISTRO = {
                        MAIL: _MAIL,
                        NRO_DOC: e.CUIL.substring(2, 10),
                        TIP_DOC: "1",
                        ASE_APE: e.APELLIDO,
                        ASE_NOM: e.NOMBRE
                      };
                      response(e);
                      //coincide DNI y correo
                    } else if (_MAIL != "" && _DOCUMDAT != 0 && _CORRECTO == "S") {
                      e.VALIDACION = "OK";
                      e.POLIZA = product;
                      e.DATOSREGISTRO = {
                        MAIL: _MAIL,
                        NRO_DOC: e.CUIL.substring(2, 10),
                        TIP_DOC: "1",
                        ASE_APE: e.APELLIDO,
                        ASE_NOM: e.NOMBRE
                      };
                      response(e);
                    } else if (_MAIL == "" && _DOCUMDAT == 0 && _CORRECTO == "N") {
                      //No lo encuentra, es nuevo y se da de alta
                      e.VALIDACION = "ADD";
                      e.POLIZA = product;
                      e.DATOSREGISTRO = {
                        MAIL: e.MAIL,
                        NRO_DOC: e.CUIL,
                        TIP_DOC: "5",
                        ASE_APE: e.APELLIDO,
                        ASE_NOM: e.NOMBRE
                      };
                      response(e);
                    } else if (_MAIL == "" && _DOCUMDAT != 0 && _CORRECTO == "N") {
                      //SI ENCUENTRA MAIL, PERO NO COINCIDE DNI
                      e.VALIDACION = "MAILOK";
                      response(e);
                    } else {
                      e.VALIDACION = "MAILOK";
                      response(e);
                    }
                  }
                });
              }
            }
          });
        });
      }
    }, {
      key: "getNomina",
      value: function getNomina(group, callback) {
        var _this14 = this;

        var currentProduct = this.segurosData.currentProduct;

        this.abmNominaService.controlNominas({
          //CIAASCOD:,
          //USUARCOD:,
          RAMOPCOD: currentProduct.ramopcod,
          POLIZANN: currentProduct.polizann,
          POLIZSEC: currentProduct.polizsec,
          EXPEDNUM: group.grupocod,
          FECHAVIG: group.fecvig
        }).then(function (respControl) {
          if (respControl.Message.DATOS.EXISTE == "S") {
            callback("payrollPending");
          } else if (respControl.Message.DATOS.EXISTE == "V") {
            callback("laterValidity");
          } else if (respControl.Message.Request.ESTADOMSG == "OK") {
            _this14.abmNominaService.recuperoNomina({
              //CIAASCOD:,
              //USUARCOD:,
              //CLIENAS:,
              //NIVELAS:,
              RAMOPCOD: currentProduct.ramopcod,
              POLIZANN: currentProduct.polizann,
              POLIZSEC: currentProduct.polizsec,
              EXPEDNUM: group.grupocod,
              EFECTANN: Number(group.fecvig.toString().substring(0, 4)), //corroborar que sean estos los datos correctos
              EFECTMES: Number(group.fecvig.toString().substring(4, 6)), //corroborar que sean estos los datos correctos
              EFECTDIA: Number(group.fecvig.toString().substring(6, 8)) //corroborar que sean estos los datos correctos
            }).then(function (data) {
              callback(data.Message);
            });
          } else {
            callback({
              DATOS: {
                NOMINAS: { NOMINA: [] },
                ERRORMSG: respControl.Message.Request.ERRORMSG,
                ESTADOMSG: respControl.Message.Request.ESTADOMSG
              }
            });
          }
        });
      }
    }, {
      key: "consultaEnviadas",
      value: function consultaEnviadas(fechaDesde, fechaHasta, callback) {
        var currentProduct = this.segurosData.currentProduct;

        this.abmNominaService.consultaEnviadas({
          RAMOPCOD: currentProduct.ramopcod,
          POLIZANN: currentProduct.polizann,
          POLIZSEC: currentProduct.polizsec,
          FECHADDE: fechaDesde,
          FECHAHTA: fechaHasta
        }).then(function (data) {
          if (data.Code == "NO_ERROR") {
            if (data.Message.CAMPOS.CANTOTAL >= 0) callback(data.Message.CAMPOS.REGS.REG, data.Message.CAMPOS.CANTOTAL);else callback("ERROR");
          } else callback("ERROR", data.Code);
        });
      }
    }, {
      key: "detalleEnviadas",
      value: function detalleEnviadas(item, callback) {
        this.abmNominaService.detalleEnviadas(item).then(function (data) {
          data.Code == "NO_ERROR" ? callback(data.Message.CAMPOS.REGS.REG) : callback("ERROR");
        });
      }
    }, {
      key: "getActividadesPorDesc",
      value: function getActividadesPorDesc(desc, callback) {
        var currentProduct = this.segurosData.currentProduct;

        this.abmNominaService.getActividadesColectivo({
          CIAASCOD: currentProduct.cup.CIAASCOD,
          PRODUCTO: currentProduct.ramopcod,
          PROFECOD: "",
          PROFEDES: desc
        }).then(function (data) {
          data && data.Message.DATOS.ACTIVIDADES.ACTIVIDAD ? callback(data.Message.DATOS.ACTIVIDADES.ACTIVIDAD) : callback([]);
        }).catch(callback([]));
      }
    }]);

    return NominaController;
  }(React.Component);

  return NominaController;
});