requirejs(["react", "react-dom", "react-redux", "../dist/segurosOnline/container", "../dist/redux/store", "../dist/lib/utils"], function (React, ReactDOM, ReactRedux, Container, Store, Utils) {
  var assignBackground = function assignBackground() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("backFixed");
    body.classList.remove("backLogin");
    body.classList.add("backFixed");
    body.classList.add("backLogin");
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

//PWA functionality start
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("https://eugeniosaintemarie.github.io/hsbc-life-so/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

function isIOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}

function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

if (isIOS() && isSafari()) {
  var hasSeenPopup = getCookie('hasSeenPopup');
  if (!hasSeenPopup) {
    var popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.bottom = "0";
    popup.style.width = "100%";
    popup.style.padding = "20px";
    popup.style.backgroundColor = "#ED1C24";
    popup.style.color = "white";
    popup.style.textAlign = "center";
    popup.innerHTML = "Para instalar HSBC Seguros Online, haz clic en el botón 'Compartir', y luego en 'Añadir a la pantalla de inicio' <button onclick='closePopup()'>Cerrar</button>";
    document.body.appendChild(popup);

    function closePopup() {
      document.body.removeChild(popup);
      setCookie('hasSeenPopup', true, 7);
    }
  }
}
//PWA functionality finish