define([], function () {
  var initialState = {
    auth: {
      authorized: false,
      isSubmitting: false,
      reload: false
    },
    seguros: {
      currentProduct: null,
      userData: null
    }
  };

  return initialState;
});