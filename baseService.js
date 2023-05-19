"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../lib/utils.js"], function (React, Utils) {
  var BaseService = function (_React$Component) {
    _inherits(BaseService, _React$Component);

    function BaseService() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, BaseService);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BaseService.__proto__ || Object.getPrototypeOf(BaseService)).call.apply(_ref, [this].concat(args))), _this), _this.path = "/seguros-gateway/", _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BaseService, [{
      key: "isJSON",
      value: function isJSON(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
    }, {
      key: "call",
      value: function call(method, url, parameters, contentType, cache) {
        var _this2 = this;

        var returnType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'JSON';
        var redirect = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;

        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();

          xhr.addEventListener("load", function () {});

          if (method == "GET") {
            fetch(_this2.path + url, {
              method: method,
              //body: JSON.stringify(parameters)
            }).then(function (res) {
              return res.json();
            }).catch(function (e) {
              $(document).trigger("ErrorService", xhr.statusText);
            }).then(function (response) {
              try {
                var data = void 0;
                if (_this2.isJSON(response)) {
                  data = JSON.parse(response);
                } else {
                  data = response;
                }

                resolve(data);
              } catch (ex) {
                $(document).trigger("ErrorService", ex);
              }
            });
          }

          if (method == "POST") {

            var headers = {};
            if (contentType == 'JSON') {
              headers = {
                method: method,
                body: JSON.stringify(parameters)
              };
            } else {
              headers = {
                method: method,
                body: JSON.stringify(parameters),
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              };
            }

            var path = void 0;
            if (cache) {
              path = _this2.path + url + '?request.preventCache=' + Utils.fGetCacheRnd();
            } else {
              path = _this2.path + url;
            }

            fetch(path, headers).then(function (res) {
              if (res.redirected && redirect) {
                location.reload();
              } else {
                return returnType === 'JSON' ? res.json() : returnType === 'BLOB' ? res.blob() : res.text();
              }
            }).catch(function (e) {
              $(document).trigger("ErrorService", xhr.statusText);
            }).then(function (response) {
              try {
                var data = void 0;
                if (_this2.isJSON(response)) {
                  data = JSON.parse(response);
                } else {
                  data = response;
                }

                resolve(data);
              } catch (ex) {
                $(document).trigger("ErrorService", ex);
              }
            });
          }
        });
      }
    }]);

    return BaseService;
  }(React.Component);

  return BaseService;
});