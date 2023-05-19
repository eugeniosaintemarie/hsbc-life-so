function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

define(['../../services/loginService'], function (LoginService) {
  var userReducer = function todos() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      //agregar funcionalidad
      case "LOGIN":
        var rest = _objectWithoutProperties(state, []);

        return Object.assign({}, rest, {
          authorized: true,
          reload: false
        });
      case "LOGOUT":
        var rest = _objectWithoutProperties(state, []);

        var newState = Object.assign({}, rest, {
          authorized: false,
          reload: true
        });
        var ws = new LoginService();
        ws.logOut();
        // .then(() => {
        //   let fullpath = window.location.href;
        //   fullpath = fullpath.split("pages");
        //   window.location.href = fullpath[0] + "pages/paso1.html";
        // });
        return newState;
      default:
        return state;
      case "RELOAD_FALSE":
        var rest = _objectWithoutProperties(state, []);

        return Object.assign({}, rest, {
          reload: false
        });
    }
  };
  return userReducer;
});