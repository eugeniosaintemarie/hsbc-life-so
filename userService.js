var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['./baseService', "../redux/store", "../lib/utils"], function (BaseService, Store, Utils) {
    var UserService = function (_BaseService) {
        _inherits(UserService, _BaseService);

        function UserService() {
            _classCallCheck(this, UserService);

            return _possibleConstructorReturn(this, (UserService.__proto__ || Object.getPrototypeOf(UserService)).apply(this, arguments));
        }

        _createClass(UserService, [{
            key: "getCustomerProducts",
            value: function getCustomerProducts() {
                var _this2 = this;

                return new Promise(function (resolve, reject) {
                    var products = _this2.getDataStored('products');
                    if (!Utils.isEmpty(products)) {
                        resolve(products);
                        return;
                    }

                    _this2.call('POST', 'Inicio/getProductosClientes', {}, 'JSON', true).then(function (data) {
                        Store.dispatch({ type: 'SET_PRODUCTS', payload: data });
                        resolve(data);
                    });
                });
            }
        }, {
            key: "buscarClientes",
            value: function buscarClientes() {
                var _this3 = this;

                return new Promise(function (resolve, reject) {
                    var products = _this3.getDataStored('productsCollective');
                    if (!Utils.isEmpty(products)) {
                        resolve(products);
                        return;
                    }

                    _this3.getLoggedUser().then(function (user) {
                        _this3.call('POST', 'Inicio/buscarClientes', {}, 'JSON', true).then(function (data) {
                            Store.dispatch({ type: 'SET_PRODUCTS_COLLECTIVE', payload: data });
                            resolve(data);
                        });
                    });
                });
            }
        }, {
            key: "getCustomer",
            value: function getCustomer() {

                return this.customerData;
            }
        }, {
            key: "getInsurancePolicies",
            value: function getInsurancePolicies() {
                return this.products;
            }
        }, {
            key: "getLoggedUser",
            value: function getLoggedUser() {
                var _this4 = this;

                return new Promise(function (resolve, reject) {
                    var user = _this4.getDataStored('user');
                    if (!Utils.isEmpty(user)) {
                        resolve(user);
                        return;
                    }

                    _this4.call('POST', 'app/pages/loggedUser').then(function (data) {

                        Store.dispatch({ type: 'SET_USER', payload: data });
                        resolve(data);
                    });
                });
            }
        }, {
            key: "getDetalleRiesgo",
            value: function getDetalleRiesgo(RAMOPCOD, POLIZANN, POLIZSEC, CERTIPOL, CERTIANN, CERTISEC, CIAASCOD) {
                var _this5 = this;

                return new Promise(function (resolve, reject) {
                    _this5.call('POST', 'Inicio/detalleRiesgo', {
                        'RAMOPCOD': RAMOPCOD,
                        'POLIZANN': POLIZANN,
                        'POLIZSEC': POLIZSEC,
                        'CERTIPOL': CERTIPOL,
                        'CERTIANN': CERTIANN,
                        'CERTISEC': CERTISEC,
                        'CIAASCOD': CIAASCOD
                    }, 'JSON', true).then(function (data) {
                        resolve(data);
                    });
                });
            }
        }, {
            key: "getDataStored",
            value: function getDataStored(id) {
                var store = Store.getState();

                if (store[id]) {
                    return store[id];
                }

                return null;
            }
        }, {
            key: "getLoggedUserOnly",
            value: function getLoggedUserOnly() {
                return this.call('POST', 'app/pages/loggedUser', {}, 'JSON', true, 'JSON', 'seguros-gateway/', false);
            }
        }]);

        return UserService;
    }(BaseService);

    return UserService;
});