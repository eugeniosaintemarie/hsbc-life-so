var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../services/userService", "../services/segurosOnlineService", "../controller/retiroNominaController", "../redux/store"], function (React, UserService, SegurosOnlineService, RetiroNominaController, Store) {
  var MyProducts = function (_React$Component) {
    _inherits(MyProducts, _React$Component);

    function MyProducts(props) {
      _classCallCheck(this, MyProducts);

      var _this = _possibleConstructorReturn(this, (MyProducts.__proto__ || Object.getPrototypeOf(MyProducts)).call(this, props));

      _this.isLoaded = false;
      _this.FORM_NAME = "MyProducts";

      _this.goToProduct = function (product) {
        _this.props.switch(product);
      };

      _this.afterMount = function (user, products, productsCollective, productNotIssued, nominas) {
        _this.isLoaded = true;
        _this.setState({
          user: user,
          products: products,
          productsCollective: productsCollective,
          productNotIssued: productNotIssued,
          nominas: nominas
        });
        //Soluciona error si el usuario solo tiene formularios en retiro colectivo y en vida colectivo
        classItem = document.querySelectorAll(".menu-active");
        classItem[0].id = "productoSeleccionado";
        document.getElementById("productoSeleccionado").click();
      };

      _this.state = {
        currentProduct: "",
        misformularios: []
      };
      return _this;
    }

    _createClass(MyProducts, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var _state = this.state,
            user = _state.user,
            products = _state.products,
            productsCollective = _state.productsCollective,
            productNotIssued = _state.productNotIssued;

        var currentProduct = Store.getState().seguros.currentProduct;
        var productsInd = true;
        if (!this.isLoaded) {
          return React.createElement("div", null);
        }
        var misformularios = this.props.misformularios;

        var productsMap = productsCollective instanceof Array ? productsCollective : Object.keys(productsCollective);

        return React.createElement(
          "div",
          { className: "myproducts-navbar" },
          productsInd && React.createElement(
            "div",
            null,
            products && products.productosIndividuales && products.productosIndividuales.length > 0 ? React.createElement(
              "div",
              null,
              React.createElement(
                "h5",
                null,
                "Mis productos individuales"
              ),
              React.createElement(
                "ul",
                { className: "list-group" },
                products && products.productosIndividuales.map(function (product) {
                  return React.createElement(
                    "li",
                    {
                      className: "list-group-item list-group-item-action",
                      key: product.detalle.NROPOLIZA,
                      onClick: function onClick() {
                        return _this2.goToProduct(product);
                      }
                    },
                    currentProduct.detalle && currentProduct.detalle.NROPOLIZA == product.detalle.NROPOLIZA ? React.createElement("div", { className: "menu-active" }) : "",
                    React.createElement(
                      "div",
                      { className: "myproducts-list" },
                      React.createElement(
                        "strong",
                        null,
                        product.detalle.RAMOPDES
                      ),
                      React.createElement("br", null),
                      product.detalle.NROPOLIZA
                    )
                  );
                })
              )
            ) : "",
            productsMap && productsMap.length > 0 ? React.createElement(
              "div",
              null,
              React.createElement(
                "h5",
                null,
                "Mis productos colectivos"
              ),
              React.createElement(
                "ul",
                { className: "list-group" },
                productsMap.map(function (productData) {
                  var product = productsCollective instanceof Array ? productData : productsCollective[productData];
                  var detalle = product.detalle ? product.detalle : product.cup;
                  var currentProductDetalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

                  if (!detalle) {
                    return;
                  }

                  return React.createElement(
                    "li",
                    {
                      className: "list-group-item list-group-item-action",
                      key: detalle.NROPOLIZA,
                      onClick: function onClick() {
                        return _this2.goToProduct(product);
                      }
                    },
                    detalle && currentProductDetalle && currentProductDetalle.NROPOLIZA == detalle.NROPOLIZA ? React.createElement("div", { className: "menu-active" }) : "",
                    React.createElement(
                      "div",
                      { className: "myproducts-list" },
                      React.createElement(
                        "strong",
                        null,
                        detalle && detalle.RAMOPDES ? detalle.RAMOPDES : ""
                      ),
                      React.createElement("br", null),
                      detalle && detalle.NROPOLIZA ? detalle.NROPOLIZA : ""
                    )
                  );
                })
              )
            ) : "",
            " ",
            productNotIssued && productNotIssued.length > 0 ? React.createElement(
              "div",
              null,
              React.createElement(
                "h5",
                null,
                "Mis productos no emitidos"
              ),
              React.createElement(
                "ul",
                { className: "list-group" },
                productNotIssued.map(function (productData) {
                  var product = productNotIssued instanceof Array ? productData : productNotIssued[productData];
                  var detalle = product.detalle ? product.detalle : product.cup;
                  var currentProductDetalle = currentProduct.detalle ? currentProduct.detalle : currentProduct.cup;

                  if (!detalle) {
                    return;
                  }

                  return React.createElement(
                    "li",
                    {
                      className: "list-group-item list-group-item-action",
                      key: detalle.NROPOLIZA,
                      onClick: function onClick() {
                        return _this2.goToProduct(product);
                      }
                    },
                    detalle && currentProductDetalle && currentProductDetalle.NROPOLIZA == detalle.NROPOLIZA ? React.createElement("div", { className: "menu-active" }) : "",
                    React.createElement(
                      "div",
                      { className: "myproducts-list" },
                      React.createElement(
                        "strong",
                        null,
                        detalle && detalle.RAMOPDES ? detalle.RAMOPDES : ""
                      ),
                      React.createElement("br", null),
                      detalle && detalle.NROPOLIZA ? detalle.NROPOLIZA : ""
                    )
                  );
                })
              )
            ) : "",
            misformularios && misformularios.length > 0 ? React.createElement(
              "div",
              null,
              React.createElement(
                "h5",
                null,
                "Mis productos colectivos"
              ),
              React.createElement(
                "ul",
                { className: "list-group" },
                misformularios.map(function (productData) {
                  var product = productData.COD_PRO + "-" + productData.POL_ANN.toString().padStart(2, "0") + "-" + productData.POL_SEC.toString().padStart(6, "0") + " -" + productData.CER_POL.toString().padStart(4, "0") + "-" + productData.CER_ANN.toString().padStart(4, "0") + "-" + productData.CER_SEC.toString().padStart(6, "0");
                  var productDes = productData.COD_PRO + "-" + productData.POL_ANN.toString().padStart(2, "0") + "-" + productData.POL_SEC.toString().padStart(6, "0");
                  var productdetails = Object.assign({}, productData, {
                    NROPOLIZA: product
                  });
                  var beneficiaryForm = {
                    detalle: productdetails,
                    appointBeneficiary: true
                  };
                  var aggregatesForm = {
                    detalle: productdetails,
                    additionRequest: true
                  };
                  var lifeForm = {
                    detalle: productdetails,
                    additionRequestColectivo: true
                  };
                  return React.createElement(
                    "li",
                    {
                      className: "list-group-item list-group-item-action",
                      key: productData.CER_POL,
                      onClick: productData.NRO_SOL == undefined ? function () {
                        return _this2.goToProduct(beneficiaryForm);
                      } : productData.COD_PRO.slice(0, 1) == "C" ? function () {
                        return _this2.goToProduct(lifeForm);
                      } : function () {
                        return _this2.goToProduct(aggregatesForm);
                      }
                    },
                    currentProduct.detalle && (currentProduct.detalle.NROPOLIZA == lifeForm.detalle.NROPOLIZA || currentProduct.detalle.NROPOLIZA == beneficiaryForm.detalle.NROPOLIZA || currentProduct.detalle.NROPOLIZA == aggregatesForm.detalle.NROPOLIZA) ? React.createElement("div", { className: "menu-active" }) : "",
                    React.createElement(
                      "div",
                      { className: "myproducts-list" },
                      React.createElement(
                        "strong",
                        null,
                        productData.DES_PRO
                      ),
                      React.createElement("br", null),
                      productDes
                    )
                  );
                })
              )
            ) : ""
          )
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var controller = new RetiroNominaController();
        var branches = {
          multipleSalary: [],
          capitalScale: [],
          burial: [],
          uniformCapital: [],
          personalAccidents: [],
          mandatoryLife: []
        };
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this3 = this;

        var userService = new UserService();
        var segurosOnlineService = new SegurosOnlineService();

        userService.getLoggedUser().then(function (user) {
          userService.getCustomerProducts().then(function (products) {
            userService.buscarClientes().then(function (productsCollective) {
              segurosOnlineService.getBuscarPrecarga().then(function (productNotIssued) {
                _this3.afterMount(user, products, productsCollective, productNotIssued, null);
              });
            });
          });
        });
      }
    }]);

    return MyProducts;
  }(React.Component);

  return MyProducts;
});