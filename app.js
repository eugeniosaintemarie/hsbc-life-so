requirejs(["react", "react-dom", "react-redux", "../dist/segurosOnline/container", "../dist/redux/store", "../dist/lib/utils"], function (React, ReactDOM, ReactRedux, Container, Store, Utils) {
  var assignBackground = function assignBackground() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("backFixed");
    body.classList.add("backFixed");
  };

  var removeBackground = function removeBackground() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("backFixed");
  };
  //funcionalidad de salto de página al iniciar el proyecto, existe también en el component login
  Utils.checkCurrentPage();
  //ReactDOM lo utilizamos sólo una vez qué es por dónde entra react al DOM , evitar llamar la librería dentros de otros componentes
  ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: Store },
    React.createElement(Container, {
      assignBackground: assignBackground,
      removeBackground: removeBackground
    })
  ), document.getElementById("default"));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/hsbc-life-so/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}