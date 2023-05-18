function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

define([], function () {
    var productsReducer = function todos() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        switch (action.type) {
            //agregar funcionalidad
            case "SET_PRODUCTS":
                var rest = _objectWithoutProperties(state, []);

                return Object.assign({}, rest, action.payload);

            default:
                return state;
        }
    };
    return productsReducer;
});