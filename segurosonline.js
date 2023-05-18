function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

define([], function () {
  var segurosOnline = function todos() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      //agregar funcionalidad
      case "SET_CURRENT_PRODUCT":
        var rest = _objectWithoutProperties(state, []);

        return Object.assign({}, rest, {
          currentProduct: action.payload
        });
      // case "SET_USER":
      //   var { ...rest } = state;

      //   return {
      //     ...rest,
      //     userData: action.payload
      //   };

      default:
        return state;
    }
  };
  return segurosOnline;
});