var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

define([], function () {
  return {
    fValCUIT: function fValCUIT(CUIT) {
      var vCUIT = CUIT.toString();
      var v2 = 0;
      var v3 = 0;
      if (!isNaN(vCUIT)) {
        v2 = (Number(vCUIT.substr(0, 1)) * 5 + Number(vCUIT.substr(1, 1)) * 4 + Number(vCUIT.substr(2, 1)) * 3 + Number(vCUIT.substr(3, 1)) * 2 + Number(vCUIT.substr(4, 1)) * 7 + Number(vCUIT.substr(5, 1)) * 6 + Number(vCUIT.substr(6, 1)) * 5 + Number(vCUIT.substr(7, 1)) * 4 + Number(vCUIT.substr(8, 1)) * 3 + Number(vCUIT.substr(9, 1)) * 2) % 11;
        v3 = 11 - v2;
        switch (v3) {
          case 11:
            v3 = 0;
            break;
        }
        return Number(vCUIT.substr(10, 1)) == v3;
      } else {
        return false;
      }
    },
    fAgeCalc2: function fAgeCalc2(date) {
      var year = Number(date.toString().substring(6));
      var month = Number(date.toString().substring(3, 5)) - 1;
      var day = Number(date.toString().substring(0, 2));

      var birthday = new Date(year, month, day);
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs);
      return ageDate.getUTCFullYear() - 1970;
    },
    fAgeCalc: function fAgeCalc(birthday) {
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs);
      return ageDate.getUTCFullYear() - 1970;
    },
    fdifCalc: function fdifCalc(birthday) {
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs);

      return new Date(ageDifMs - new Date(1970, 0, 1).getTime());
    },
    fGetCacheRnd: function fGetCacheRnd() {
      return Math.floor(Math.random() * 10000000000000 + 1);
    },
    formatDateToNumber: function formatDateToNumber(date) {
      var newDate = new Date(date);
      var day = newDate.getDate().toString().padStart(2, "0");
      var month = (newDate.getMonth() + 1).toString().padStart(2, "0");
      var year = newDate.getFullYear().toString();
      return Number(year + month + day);
    },
    FormatDate: function FormatDate(date, format) {
      var date = new Date(date),
          dateFormatted = "";

      switch (format) {
        case "dd":
          dateFormatted = date.getDate();
          break;
        case "MMMM yyyy":
          dateFormatted = (date.getMonth() < 10 ? "0" : "") + date.getMonth() + "/" + date.getFullYear();
          break;
        case "HH:mm":
          dateFormatted = (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
          break;
      }
      return dateFormatted;
    },
    formatFechaString: function formatFechaString(date, format) {
      //NumbertoString
      var resp = "";

      if (date) {
        var day = date.toString().substring(6);
        var month = date.toString().substring(4, 6);
        var year = date.toString().substring(0, 4);

        if (format) {
          var simbolDate = format.includes("/") ? "/" : format.includes("-") ? "-" : false;
          var newFormat = simbolDate ? format.replace(simbolDate, "").replace(simbolDate, "") : format;

          if (newFormat.length > 6) {
            resp = format.replace("DD", day).replace("MM", month).replace("AAAA", year);
          } else {
            resp = format.replace("DD", day).replace("MM", month).replace("AA", year.slice(-2));
          }
        } else {
          resp = day + "/" + month + "/" + year;
        }
      }

      return resp;
    },
    formatDateStringMonthYear: function formatDateStringMonthYear(date) {
      //NumbertoString
      var resp = "";
      if (date) {
        var month = date.toString().substring(4);
        var year = date.toString().substring(0, 4);
        resp = month + "/" + year;
      }
      return resp;
    },
    formatFechaNumber: function formatFechaNumber(date, format) {
      //si format = undefined -> "dd/MM/yyyy" to yyyyMMdd
      // every format to yyymmdd

      var today = new Date();
      var response = 0;
      var simbolDate = date.includes("/") ? "/" : date.includes("-") ? "-" : false;

      if (Number.isInteger(date)) {
        response = Number(date);
      } else if (date && simbolDate) {
        var d = "";
        var m = "";
        var y = "";

        if (format) {
          var copyFormat = format.replace(simbolDate, "").replace(simbolDate, "");
          var newDate = date.split(simbolDate);
          var newFormat = "";

          if (copyFormat.startsWith("A") && copyFormat.length > 6) {
            newFormat = copyFormat.substring(0, 1) + copyFormat.substring(4, 5) + copyFormat.substring(6, 7);
          } else {
            newFormat = copyFormat.substring(0, 1) + copyFormat.substring(2, 3) + copyFormat.substring(4, 5);
          }

          d = newDate[newFormat.indexOf("D")];
          m = newDate[newFormat.indexOf("M")];
          y = newDate[newFormat.indexOf("A")];

          if (y.length < 4) {
            var anio = Number(today.getFullYear().toString().slice(-2));

            if (Number(y) > anio) {
              y = "19" + y;
            } else {
              y = "20" + y;
            }
          }
        } else {
          var _date$split = date.split(simbolDate);

          var _date$split2 = _slicedToArray(_date$split, 3);

          d = _date$split2[0];
          m = _date$split2[1];
          y = _date$split2[2];
        }

        var year = y;
        var month = m.length == 1 ? "0" + m : m;
        var day = d.length == 1 ? "0" + d : d;

        response = Number(year + month + day);

        if (y == undefined) {
          response = Number(month + day);
        }
      } else if (!isNaN(date)) {
        response = Number(date);
      }

      return response;
    },

    formatFixedString: function formatFixedString(date) {
      //corrige  d/m/yyyy a dd/mm/yyyy
      var srtDate = "";
      if (date != "" && date.includes("/")) {
        var _date$split3 = date.split("/"),
            _date$split4 = _slicedToArray(_date$split3, 3),
            d = _date$split4[0],
            m = _date$split4[1],
            y = _date$split4[2];

        var year = y;
        var month = m.length == 1 ? "0" + m : m;
        var day = d.length == 1 ? "0" + d : d;
        srtDate = day + "/" + month + "/" + year;
      }
      return srtDate;
    },
    addDays: function addDays(date, days) {
      //("date" = formato Date, "days" = dias a sumar o restar(en negativo))
      var newDate = date ? date : new Date();
      newDate.setDate(newDate.getDate() + days);
      return newDate;
    },
    dateToString: function dateToString(date) {
      //("date" = formato Date,
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    },
    diffDays: function diffDays(from, to) {
      //yyyyMMdd
      var sFrom = from.toString();
      var sTo = to.toString();
      var fday = sFrom.toString().substring(6);
      var fmonth = sFrom.toString().substring(4, 6);
      var fyear = sFrom.toString().substring(0, 4);
      var tday = sTo.toString().substring(6);
      var tmonth = sTo.toString().substring(4, 6);
      var tyear = sTo.toString().substring(0, 4);
      return (Date.UTC(tyear, tmonth, tday) - Date.UTC(fyear, fmonth, fday)) / 86400000;
    },
    formatPolizaDate: function formatPolizaDate(yyyymmdd) {
      var day = yyyymmdd.toString().substring(6);
      var month = yyyymmdd.toString().substring(4, 6);
      var year = yyyymmdd.toString().substring(0, 4);
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    },
    checkCurrentPage: function checkCurrentPage() {
      var perfEntries = performance.getEntriesByType("navigation");
      var pathname = window.location.pathname;
      var fullpath = window.location.href;
      fullpath = fullpath.split("pages");
      var origin = fullpath[0];
      var host = window.location.origin;
      for (var i = 0; i < perfEntries.length; i++) {
        var p = perfEntries[i];
        if (p.type === "reload") {
          localStorage.removeItem("currentStep");
          window.location.href = fullpath[0] + "pages/paso1.html";
        }

        if (p.type === "navigate" && host + pathname === origin + "pages/paso1.html") {
          var obj = { nextStep: "paso2.html", currentPath: pathname };
          return obj;
        }
        if (p.type === "navigate" && host + pathname === origin + "pages/paso2.html") {
          var _obj = { nextStep: "final", currentPath: pathname };
          return _obj;
        }
      }
    },
    getUrlParameter: function getUrlParameter(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
      ////AP es MA04 y si es Family es MF08
    },
    imprimirPDF: function imprimirPDF(data, servicio, filename, errorCallback, _successCallback) {
      var successCallback = function successCallback(data) {
        filename = filename || "download.pdf";
        if (data.size != 0) {
          if (window.navigator.msSaveOrOpenBlob) {
            //IE10+
            window.navigator.msSaveOrOpenBlob(data, filename);
          } else {
            //Others
            var url = URL.createObjectURL(data);
            var fakeAnchor = document.createElement("a");
            fakeAnchor.href = url;
            fakeAnchor = filename;
            document.body.appendChild(fakeAnchor);
            fakeAnchor.click();
            setTimeout(function () {
              document.body.removeChild(fakeAnchor);
              window.URL.revokeObjectURL(url);
            }, 0);
          }
        }
      };

      errorCallback = errorCallback || function () {};
      // successCallback = _successCallback || successCallback;

      if (_successCallback) {
        successCallback = _successCallback;
      }

      var path = this.urlConstantes() + servicio;
      // concateno los parametros al json enviado al backend

      var config = {
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        handleAs: "blob",
        data: JSON.stringify(data),
        method: "POST"
      };
      var promise = xhr(path, config);
      promise.then(successCallback, errorCallback);
      return promise;
    },
    urlConstantes: function urlConstantes() {
      var urlConstantes = "";
      CONTEXT_ROOT = "/seguros-gateway/";

      urlConstantes = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + CONTEXT_ROOT;

      return urlConstantes;
    },
    xmlToJson: function xmlToJson(xml) {
      if (typeof xml === "string") {
        xml = new DOMParser().parseFromString(xml, "text/xml");
      }
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) {
        // element
        // do attributes
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) {
        // text
        obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof obj[nodeName] == "undefined") {
            obj[nodeName] = this.xmlToJson(item);
          } else {
            if (typeof obj[nodeName].push == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
    },
    zfill: function zfill(number, width) {
      var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "0";

      var numberOutput = number; /* Valor absoluto del número */
      var length = number.toString().length; /* Largo del número */
      var zero = fill; /* String de cero */

      if (width <= length) {
        if (number < 0) {
          return "-" + numberOutput.toString();
        } else {
          return numberOutput.toString();
        }
      } else {
        if (number < 0) {
          return "-" + zero.repeat(width - length) + numberOutput.toString();
        } else {
          return zero.repeat(width - length) + numberOutput.toString();
        }
      }
    },
    isEmpty: function isEmpty(obj) {
      // null and undefined are "empty"
      if (obj == null) return true;

      // Assume if it has a length property with a non-zero value
      // that that property is correct.
      if (obj.length > 0) return false;
      if (obj.length === 0) return true;

      // If it isn't an object at this point
      // it is empty, but it can't be anything *but* empty
      // Is it empty?  Depends on your application.
      if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") return true;

      // Otherwise, does it have any properties of its own?
      // Note that this doesn't handle
      // toString and valueOf enumeration bugs in IE < 9
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
      }

      return true;
    },
    JSON2CSV: function JSON2CSV(data) {
      var str = "";
      var allRows = data.split(/\r?\n|\r/);
      var line = "";
      // str += line + '\r\n';
      for (var i = 0; i < allRows.length; i++) {
        if (allRows[i] !== "") {
          str += allRows[i] + '\r\n';
        }
      }
      return str;
    },
    json2xml: function json2xml(o, tab) {
      var toXml = function toXml(v, name, ind) {
        var xml = "";
        if (v instanceof Array) {
          for (var i = 0, n = v.length; i < n; i++) {
            xml += ind + toXml(v[i], name, ind + "\t") + "\n";
          }
        } else if ((typeof v === "undefined" ? "undefined" : _typeof(v)) == "object") {
          var hasChild = false;
          xml += ind + "<" + name;
          for (var m in v) {
            if (m.charAt(0) == "@") xml += " " + m.substr(1) + '="' + v[m].toString() + '"';else hasChild = true;
          }
          xml += hasChild ? ">" : "/>";
          if (hasChild) {
            for (var m in v) {
              if (m == "#text") xml += v[m];else if (m == "#cdata") xml += "<![CDATA[" + v[m] + "]]>";else if (m.charAt(0) != "@") xml += toXml(v[m], m, ind + "\t");
            }
            xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">";
          }
        } else {
          xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
        }
        return xml;
      },
          xml = "";
      for (var m in o) {
        xml += toXml(o[m], m, "");
      }return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
    }
  };
});