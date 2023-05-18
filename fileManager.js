var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['react'], function (React) {
  var FileManager = function (_React$Component) {
    _inherits(FileManager, _React$Component);

    function FileManager() {
      _classCallCheck(this, FileManager);

      return _possibleConstructorReturn(this, (FileManager.__proto__ || Object.getPrototypeOf(FileManager)).apply(this, arguments));
    }

    _createClass(FileManager, [{
      key: "downloadPDF",
      value: function downloadPDF(data, filename) {

        if (data instanceof Blob && data.size > 0 && data.type.toLocaleUpperCase().indexOf("PDF") > -1) {
          if (window.navigator.msSaveOrOpenBlob) {
            //IE10+
            window.navigator.msSaveOrOpenBlob(data, filename);
          } else {
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

          return true;
        } else {
          return false;
        }
      }
    }]);

    return FileManager;
  }(React.Component);

  return FileManager;
});