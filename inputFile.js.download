var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
  var InputFile = function (_React$Component) {
    _inherits(InputFile, _React$Component);

    function InputFile(props) {
      _classCallCheck(this, InputFile);

      var _this = _possibleConstructorReturn(this, (InputFile.__proto__ || Object.getPrototypeOf(InputFile)).call(this, props));

      _this.validateFile = function (file) {
        var typeIsValid = file.type === "application/pdf";
        if (!typeIsValid) {
          alert("Sólo archivos PDF están permitidos");
        }
        var sizeIsValid = file.size / 1024 / 1024 < 2;
        if (!sizeIsValid) {
          alert("El tamaño del archivo no debe ser mayor a 2MB");
        }
        return typeIsValid && sizeIsValid;
      };

      _this._handleChangeInputFile = function (e) {
        if (e.persist) {
          e.persist();
        }

        var file = e.target.files[0];
        _this.setState({
          nameFile: file.name
        });
        var validFile = _this.validateFile(file);
        if (validFile) {
          var reader = new FileReader();
          reader.onloadend = function () {
            //   let data = {
            //     documentId: documentId,
            //     documentName: documentName,
            //     contentType: "application/pdf",
            //     fileName: `${user.id}@${documentName}`,
            //     payload: reader.result
            //   };
            //   let newAux = { ...uploading };
            //   newAux[keyFile]["isLoading"] = true;
            //   newAux[keyFile]["data"] = data;
            // setLoading({ ...newAux });

            //uploadFile(data);
          };
          reader.readAsDataURL(file);
        }
      };

      _this.state = {
        isLoading: false,
        nameFile: ""
      };
      return _this;
    }

    //   function uploadFile = async data => {
    //     let response = await uploadFileThunk(data);
    //     if (typeof response !== "undefined") {
    //       let message = `${response.data.message} ${response.documentName}`;
    //       enqueueSnackbar(message, {
    //         variant: "success"
    //       });
    //       let aux = { ...uploading };
    //       aux[`${data.documentId}`]["isLoading"] = false;
    //       aux[`${data.documentId}`]["thumbnail"] = response.data.thumbnail;

    //       setLoading({ ...aux });
    //     } else {
    //       let aux = { ...uploading };
    //       aux[`${data.documentId}`]["isLoading"] = false;
    //       setLoading({ ...aux });

    //       // enqueueSnackbar(response, {
    //       //   variant: "error",
    //       //   autoHideDuration: 5000
    //       // });
    //     }
    //   };

    _createClass(InputFile, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var style = {
          opacity: 0,
          minHeight: "50px",
          width: "200px",
          marginLeft: "0px",
          padding: "10px",
          marginTop: "-4rem"
        };
        var id = this.props.id;
        var nameFile = this.state.nameFile;

        return React.createElement(
          "div",
          { "class": "form-group" },
          React.createElement(
            "label",
            { className: "btn btn-dark", "for": "exampleFormControlFile1" },
            "Cargar archivo"
          ),
          React.createElement("input", {
            onChange: function onChange(e) {
              return _this2._handleChangeInputFile(e);
            },
            style: style,
            type: "file",
            "class": "form-control-file",
            id: id
          }),
          nameFile !== "" && React.createElement(
            "em",
            null,
            nameFile
          )
        );
      }
    }]);

    return InputFile;
  }(React.Component);

  return InputFile;
});