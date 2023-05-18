define(["redux", "redux-thunk", "./reducers/authReducer", "./reducers/segurosonline", "./reducers/loggedUserReducer", "./reducers/productsCollectiveReducer", "./reducers/productsReducer", "./reducers/clixPolReducer", "./initialState"], function (Redux, ReduxThunk, authReducer, segurosOnline, loggedUserReducer, productsCollectiveReducer, productsReducer, clixPolReducer, initialState) {
  var applyMiddleware = Redux.applyMiddleware,
      compose = Redux.compose;

  var thunk = require("redux-thunk").default;
  var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  var appReducer = Redux.combineReducers({
    auth: authReducer,
    seguros: segurosOnline,
    user: loggedUserReducer,
    productsCollective: productsCollectiveReducer,
    products: productsReducer,
    clixPol: clixPolReducer
  });

  var rootReducer = function rootReducer(state, action) {
    if (action.type === "LOGOUT") {
      state = initialState;
    }

    return appReducer(state, action);
  };
  var store = Redux.createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

  return store;
});