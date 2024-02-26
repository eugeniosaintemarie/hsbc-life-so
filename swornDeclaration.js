var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/modalReactBootstrap", "../../common/errormessage"], function (React, ModalReactBootstrap, Errormessage) {
  var SwornDeclaration = function (_React$Component) {
    _inherits(SwornDeclaration, _React$Component);

    function SwornDeclaration(props) {
      _classCallCheck(this, SwornDeclaration);

      var _this = _possibleConstructorReturn(this, (SwornDeclaration.__proto__ || Object.getPrototypeOf(SwornDeclaration)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      _this._handleShowDocuments = function (e) {
        var filesList = [];
        var array = [];
        if (_this.state.fileU) {
          filesList.push(_this.state.fileUno.name);
          array = filesList.map(function (item, i) {
            return React.createElement(
              "ul",
              { key: i },
              React.createElement(
                "li",
                { className: "float-none" },
                item.name
              )
            );
          });
        } else if (_this.state.fileD) {
          filesList.push(_this.state.fileDos.name);
          array = filesList.map(function (item, i) {
            return React.createElement(
              "ul",
              { key: i },
              React.createElement(
                "li",
                { className: "float-none" },
                item.name
              )
            );
          });
        }

        return array;
      };

      _this._handleAddDocument = function (e) {
        if (e.target.id == "adjuntarUno") {
          _this.setState({ fileU: true });
        } else {
          _this.setState({ fileD: true });
        }
      };

      _this._handleClickSearch = function (e) {
        if (e.target.id == "botonUno") {
          document.getElementById("pdf1").click();
        } else {
          document.getElementById("pdf2").click();
        }
      };

      _this.handleModalIsOpen = function (e) {
        var current = _this.state.showModalSuccess;
        _this.setState({
          showModalSuccess: !current
        });
      };

      _this._handleCheck = function (e, fileName, callback) {
        _this.setState({ cont: 1 });
        var self = _this;
        var reader = new FileReader();
        var palabraBuscada = fileName.split(".pdf")[0];
        if (!palabraBuscada.includes("Declaracion Jurada II") && !palabraBuscada.includes("Declaracion Jurada I")) {
          callback("error");
        } else {
          if (e.target.id == "pdf1") {
            if (palabraBuscada == "Declaracion Jurada I" || palabraBuscada.includes("Declaracion Jurada I(")) {
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = function () {
                var pdfData = reader.result;
                self.setState({ fileUno: { name: fileName, data: pdfData } });
                self._handleResults("pdf1", self.state.fileUno);
              };
              callback("exito");
            } else {
              e.target.value = "";
              _this.setState({
                showModalSuccess: true,
                modal: {
                  title: "Error",
                  component: null,
                  size: "md",
                  html: true,
                  contentHTML: "Por favor ingrese la declaracion jurada I",
                  textClose: "Entendido"
                }
              });
            }
          } else if (e.target.id == "pdf2") {
            if (palabraBuscada.includes("Declaracion Jurada II") || palabraBuscada.includes("Declaracion Jurada II(")) {
              reader.readAsDataURL(e.target.files[0]);
              reader.onload = function () {
                var pdfData = reader.result;
                self.setState({ fileDos: { name: fileName, data: pdfData } });
                self._handleResults("pdf2", self.state.fileDos);
              };
              callback("exito");
            } else {
              e.target.value = "";
              _this.setState({
                showModalSuccess: true,
                modal: {
                  title: "Error",
                  component: null,
                  size: "md",
                  html: true,
                  contentHTML: "Por favor ingrese la declaracion jurada II",
                  textClose: "Entendido"
                }
              });
            }
          }
        }
      };

      _this._handleFile = function (e) {
        if (e.target.files != undefined) {
          var fileName = e.target.files[0].name;
          var fileSize = e.target.files[0].size;
          //10485760 Bytes son 10 MB
          if (fileName.toLowerCase().slice(-3) == "pdf") {
            _this._handleCheck(e, fileName, function (callback) {
              if (callback == "exito") {
                if (fileSize > 10485760) {
                  _this.setState({
                    showModalSuccess: true,
                    modal: {
                      title: "Error",
                      component: null,
                      size: "md",
                      html: true,
                      contentHTML: "El archivo que intenta subir tiene un tamaño mayor al permitido. Se permite hasta 10MB por archivo",
                      textClose: "Entendido"
                    }
                  });
                }
              } else {
                e.target.value = "";
                _this.setState({
                  showModalSuccess: true,
                  modal: {
                    title: "Error",
                    component: null,
                    size: "md",
                    html: true,
                    contentHTML: "El archivo que intenta subir no tiene el mismo nombre que el archivo descargado",
                    textClose: "Entendido"
                  }
                });
              }
            });
          } else {
            e.target.value = "";
            _this.setState({
              showModalSuccess: true,
              modal: {
                title: "Error",
                component: null,
                size: "md",
                html: true,
                contentHTML: "El archivo que intenta subir no tiene el formato correcto ",
                textClose: "Entendido"
              }
            });
          }
        }
      };

      _this.state = {
        fileUno: { name: "", data: "" },
        fileDos: { name: "", data: "" },
        fileD: false,
        fileU: false,
        showModalSuccess: false,
        control: false,
        modal: {
          title: "",
          component: null,
          size: "md",
          html: false,
          textClose: ""
        }
      };
      _this.referencies = {
        pdf1: React.createRef(),
        pdf2: React.createRef()
      };
      return _this;
    }

    _createClass(SwornDeclaration, [{
      key: "render",
      value: function render() {
        var _props = this.props,
            fileDDJJ1 = _props.fileDDJJ1,
            fileDDJJ2 = _props.fileDDJJ2;

        return React.createElement(
          "form",
          null,
          React.createElement(
            "div",
            { className: "m-1" },
            React.createElement(
              "h6",
              null,
              "Para avanzar con la adhesi\xF3n a tu p\xF3liza colectiva deber\xE1s descargar en tu dispositivo y completar la declaraci\xF3n Jurada I y II y luego subirla en formato PDF"
            )
          ),
          React.createElement(
            "div",
            { className: "form-row" },
            React.createElement(
              "div",
              { className: "col-lg-4 mb-3 " },
              React.createElement(
                "label",
                { className: "redVertical" },
                "Adjuntar Documentos"
              )
            ),
            React.createElement(
              "div",
              { className: "container" },
              React.createElement(
                "div",
                { className: "form-group row mb-0" },
                React.createElement(
                  "div",
                  { className: "col-lg-9" },
                  React.createElement(
                    "ul",
                    { className: "text-danger" },
                    React.createElement(
                      "li",
                      null,
                      "Tene en cuenta que el nombre del archivo que subas debe ser igual al que se descarg\xF3"
                    )
                  )
                )
              )
            ),
            React.createElement(
              "div",
              { className: "container border border-dark mb-2", style: {
                  width: "42rem" } },
              React.createElement(
                "div",
                { className: "row justify-content-between" },
                React.createElement(
                  "p",
                  null,
                  "Descarga la declaraci\xF3n Jurada I y luego de completarla subila ac\xE1"
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    "a",
                    { className: " btn btn-danger m-1 text-white d-flex justify-content-center align-items-center",
                      href: "/seguros-gateway/getPDF/Declaracion Jurada I.pdf",
                      download: true,
                      target: "_blank",
                      type: "button"
                    },
                    "Declaracion Jurada I"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6 align-self-center position-relative", style: { left: "3rem" } },
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      id: "botonUno",
                      className: "btn btn-danger ml-2",
                      onClick: this._handleClickSearch
                    },
                    "Adjuntar",
                    React.createElement("img", {
                      className: "ml-2",
                      src: "../img/descarga.png",
                      width: "20",
                      height: "20"
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "row mt-2" },
                React.createElement(
                  "div",
                  { className: "col-md-4 " },
                  React.createElement(
                    "label",
                    null,
                    "Documentos Adjuntos:"
                  )
                ),
                this.state.fileU ? this._handleShowDocuments() : "",
                React.createElement(
                  "div",
                  { id: "docUno", htmlFor: "pdf1", className: "col-md-7 " },
                  React.createElement("input", { className: "d-none",
                    type: "file",
                    accept: ".pdf",
                    id: "pdf1",
                    ref: this.referencies.pdf1,
                    onChange: this._handleFile
                  }),
                  this.state.fileUno.name || fileDDJJ1.name
                )
              )
            ),
            this.props.showDdjjS ? React.createElement(
              "div",
              { className: "container border border-dark mt-2", style: {
                  width: "42rem" } },
              React.createElement(
                "div",
                { className: "row justify-content-between" },
                React.createElement(
                  "p",
                  null,
                  "Descarga la declaraci\xF3n Jurada II y luego de completarla subila ac\xE1"
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6" },
                  React.createElement(
                    "a",
                    { className: " btn btn-danger m-1 text-white d-flex justify-content-center align-items-center",
                      href: "/seguros-gateway/getPDF/Declaracion Jurada II.pdf",
                      download: true,
                      target: "_blank",
                      type: "button"
                    },
                    "Declaracion Jurada II"
                  )
                ),
                React.createElement(
                  "div",
                  { className: "col-md-6 align-self-center position-relative", style: { left: "3rem" } },
                  React.createElement(
                    "button",
                    {
                      type: "button",
                      id: "botonDos",
                      className: "btn btn-danger ml-2",
                      onClick: this._handleClickSearch
                    },
                    "Adjuntar",
                    React.createElement("img", {
                      className: "ml-2",
                      src: "../img/descarga.png",
                      width: "20",
                      height: "20"
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "row mt-2" },
                React.createElement(
                  "div",
                  { className: "col-md-4 " },
                  React.createElement(
                    "label",
                    { htmlFor: "pdf2" },
                    "Documentos Adjuntos:"
                  )
                ),
                React.createElement(
                  "div",
                  null,
                  this.state.fileD ? this._handleShowDocuments() : ""
                ),
                React.createElement(
                  "div",
                  { htmlFor: "pdf2", id: "docDos", className: "col-md-7 " },
                  React.createElement("input", { className: "d-none",
                    type: "file",
                    accept: ".pdf",
                    id: "pdf2",
                    ref: this.referencies.pdf2,
                    onChange: this._handleFile
                  }),
                  this.state.fileDos.name || fileDDJJ2.name
                )
              )
            ) : " ",
            React.createElement(
              "div",
              { "class": "col-md-12 offset-md-0 DDJJleyenda" },
              React.createElement(
                "p",
                { "class": "font-italic" },
                this.props.leyenda
              )
            )
          ),
          React.createElement(ModalReactBootstrap, {
            title: this.state.modal.title,
            show: this.state.showModalSuccess,
            size: this.state.modal.size,
            isOpen: this.handleModalIsOpen,
            component: this.state.modal.component,
            html: this.state.modal.html,
            contentHTML: this.state.modal.contentHTML,
            textClose: this.state.modal.textClose
          }),
          React.createElement(Errormessage, {
            className: "text-danger text-center",
            show: this.state.showError,
            text: this.state.textError
          })
        );
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.fileDDJJ1.name != "") {
          document.getElementById("botonUno").disabled = true;
          this.setState({ fileU: true });
        }
        if (this.props.fileDDJJ2.name != "") {
          document.getElementById("botonDos").disabled = true;
          this.setState({ fileD: true });
        }
      }
    }]);

    return SwornDeclaration;
  }(React.Component);

  return SwornDeclaration;
});