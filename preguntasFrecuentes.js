var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react"], function (React) {
    var preguntasFrecuentes = function (_React$Component) {
        _inherits(preguntasFrecuentes, _React$Component);

        function preguntasFrecuentes() {
            _classCallCheck(this, preguntasFrecuentes);

            return _possibleConstructorReturn(this, (preguntasFrecuentes.__proto__ || Object.getPrototypeOf(preguntasFrecuentes)).apply(this, arguments));
        }

        _createClass(preguntasFrecuentes, [{
            key: "render",
            value: function render() {
                return React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                        "div",
                        { style: ({ width: "500px" }, { height: "475px" }, { overflow: "auto" }, { padding: "0px 10px" }) },
                        React.createElement(
                            "ul",
                            { id: "ul_faq" },
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "No puedo visualizar correctamente HSBC Seguros On Line"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Para poder utilizar correctamente el sitio deber\xE1s utilizar una versi\xF3n del navegador Microsoft Internet Explorer 7.0 o mayor con Service Pack 1.0."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi quiero sacar un Impreso de una de mis p\xF3lizas, c\xF3mo hago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Podr\xE1s sacar un Impreso ingresando desde el icono en la columna ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos"
                                    ),
                                    " que figura en la Home, o tambi\xE9n desde la solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos"
                                    ),
                                    " que se encuentra en el margen superior."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi quiero ver el detalle de Mis Pagos, c\xF3mo hago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Podr\xE1s ver el detalle ingresando desde el icono en la columna ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Pagos"
                                    ),
                                    " que figura en la Home, o tambi\xE9n desde la solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Pagos"
                                    ),
                                    " que se encuentra en el margen superior."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFTuve un Siniestro, c\xF3mo hago para hacer el seguimiento del mismo?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Para hacer el seguimiento de un Siniestro podr\xE1s hacerlo ingresando desde el icono en la columna ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Siniestros"
                                    ),
                                    " que figura en la Home, o tambi\xE9n desde la solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Siniestros"
                                    ),
                                    " que se encuentra en el margen superior."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi deseo recibir mis p\xF3lizas por e mail, puedo? \xBFY El Estado de P\xF3liza de Vida?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED. Deber\xE1s Suscribirte al servicio de env\xEDo por mail ingresando en el icono de la columna ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    " que figura en la Home, o desde la solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    " que se encuentra en el margen superior."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFEn el icono que lleva el nombre Mensaje, que informaci\xF3n veo?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Si la Compa\xF1\xEDa te envi\xF3 alg\xFAn mensaje sobre tus Pagos, Siniestros, etc... lo podr\xE1s leer desde el icono ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Mensajes"
                                    ),
                                    " que figura en la Home.",
                                    React.createElement("br", null),
                                    "Estos mensajes se refieren a Falta de Pago o Fin de Cobertura o en el caso de Siniestros que tiene la Orden de Pago disponible."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFEn el icono que lleva el nombre Detalle, que informaci\xF3n veo?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Podr\xE1s encontrar datos sobre tu p\xF3liza, el riesgo cubierto, las coberturas... y m\xE1s informaci\xF3n."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi deseo cambiar alg\xFAn dato de los que gener\xE9 en mi suscripci\xF3n a HSBC Seguros On Line, se puede hacer desde el sitio?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED. Ingresando a la solapa que dice ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Mis Datos"
                                    ),
                                    ", podr\xE1s cambiar tu contrase\xF1a, usuario y tu pregunta y respuesta personal."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "h2",
                                { "class": "titulos_faq" },
                                React.createElement(
                                    "font",
                                    { color: "red" },
                                    "Pagos"
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFQu\xE9 informaci\xF3n puedo visualizar en Pagos?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Visualizar\xE1s el detalle de los recibos de tus p\xF3lizas que ya has abonado y los que est\xE1n pendientes, y las fechas de vencimiento de cada uno. Podr\xE1s adicionalmente imprimir el Cup\xF3n de Pago en los casos que sean en Efectivo."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFPuedo saber el importe del recibo que debo pagar?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED. Hay una columna denominada ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Total Recibo"
                                    ),
                                    ", que indica el importe que deber\xE1s pagar."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFPor qu\xE9 aparece una columna que dice Cup\xF3n de Pago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xF3lo para las p\xF3lizas que se abonen en Efectivo, aparecer\xE1 un icono en la columna Cup\xF3n de Pago, desde donde podr\xE1s imprimir el mismo, que te servir\xE1 para pagar la cuota de tu seguro."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFMi p\xF3liza tiene una vigencia de m\xE1s de un a\xF1o y s\xF3lo me aparecen los recibos del a\xF1o pasado a hoy... por qu\xE9 puede ser esto?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Desde ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "HSBC Seguros On Line"
                                    ),
                                    " podr\xE1s visualizar los recibos del \xFAltimo a\xF1o, de tener consultas sobre recibos de a\xF1os anteriores no dudes en comunicarte con nuestro Centro de Atenci\xF3n al Cliente:",
                                    React.createElement(
                                        "ul",
                                        null,
                                        React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "strong",
                                                null,
                                                "HSBC Seguros(1):"
                                            ),
                                            " 0800-333-0003"
                                        )
                                    )
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFQu\xE9 puedo ver en la columna Estado?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "La columna Estado te informar\xE1 en que situaci\xF3n se encuentra cada recibo, si est\xE1 Cobrado o de no haberse podido efectuar el cobro aparecer\xE1 el estado Rechazado y desde el bot\xF3n de ayuda encontrar\xE1s el porqu\xE9 de dicho Rechazo. Si est\xE1 en Blanco, es porque a\xFAn no se ha recibido el pago."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFDeseo sacar mi Libre Deuda, la puedo imprimir desde HSBC Seguros On Line?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED. Accediendo a la solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Pagos"
                                    ),
                                    " encontrar\xE1s el icono para ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "imprimir tu Libre Deuda"
                                    ),
                                    ", o bien desde la solapa Impresos."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFTengo un Cup\xF3n de pago para abonar, d\xF3nde puedo efectuar el pago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Ingresando a la opci\xF3n ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Lugares de Pago"
                                    ),
                                    " del men\xFA encontrar\xE1s todos los lugares y medios donde podr\xE1s abonar tu cup\xF3n."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFActualmente abono mis cupones en efectivo y me gustar\xEDa poder pagarlo con mi Tarjeta de Cr\xE9dito, puedo cambiar la forma de pago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED, para realizar el cambio tendr\xE1s que comunicarte con nuestro Centro de Atenci\xF3n al Cliente:",
                                    React.createElement(
                                        "ul",
                                        null,
                                        React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "strong",
                                                null,
                                                "HSBC Seguros(1):"
                                            ),
                                            " 0800-333-0003"
                                        )
                                    )
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "h2",
                                { "class": "titulos_faq" },
                                React.createElement(
                                    "font",
                                    { color: "red" },
                                    "Impresos"
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFNo puedo visualizar bien los impresos... qu\xE9 hago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Para poder visualizar los documentos e imprimirlos debes tener instalado la versi\xF3n del Acrobat 7 o mayor."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFCu\xE1l es la caracter\xEDstica de cada uno de los impresos que aparece en la solapa Impresos?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    React.createElement(
                                        "ul",
                                        null,
                                        React.createElement(
                                            "li",
                                            null,
                                            React.createElement(
                                                "strong",
                                                null,
                                                "Estado de P\xF3liza:"
                                            ),
                                            " Este documento brinda informaci\xF3n sobre las coberturas adquiridas, los saldos de las diferentes cuentas/fondos y rendimientos de los mismos."
                                        )
                                    ),
                                    "Adicionalmente, dependiendo del producto adquirido, recibir\xE1s informaci\xF3n acerca de los movimientos de los fondos de inversi\xF3n."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "h2",
                                { "class": "titulos_faq" },
                                React.createElement(
                                    "font",
                                    { color: "red" },
                                    "Siniestros"
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi tuve un siniestro puedo ingresar mi denuncia desde HSBC Seguros On Line?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED. Busc\xE1 la opci\xF3n ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Denuncia On Line"
                                    ),
                                    " y acceder\xE1s al formulario para poder cargar tu Denuncia y al finalizar obtendr\xE1s un impreso con los datos cargados y tu n\xFAmero de Siniestro. Dependiendo del tipo de Siniestro podr\xE1s obtener la Orden de Reparaci\xF3n."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFEn la columna estado que significa Abierto y Terminado?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "El ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Estado Abierto"
                                    ),
                                    " aparece desde el momento en que declar\xE1s el siniestro e ingresa a la compa\xF1\xEDa y se encuentra en proceso.",
                                    React.createElement("br", null),
                                    "El ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Estado Terminado"
                                    ),
                                    " aparece cuando un Siniestro ya ha cumplido todo el proceso y se encuentra finalizado."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFEn la columna Orden de Pago dice En Proceso, que significa esa denominaci\xF3n?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Significa que la Orden de Pago a\xFAn est\xE1 pasando por las distintas instancias hasta que sea aprobada, definitivamente. Luego de ese estado pasar\xE1 a ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Lista para Cobrar/Retirar"
                                    ),
                                    ", donde ya estar\xE1 cumplido el pago de la Orden de Pago."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFTuve un Siniestro con mi Luneta y Parabrisas, estoy cubierto?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xF3lo teniendo contratada la cobertura adicional de ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Lunetas y Parabrisas"
                                    ),
                                    ", la misma est\xE1 disponible para coberturas de Terceros completos y Todo Riesgo con Franquicia, para veh\xEDculos de hasta 10 a\xF1os de antig\xFCedad. De cumplir \xE9stas condiciones se cubre valor reposici\xF3n y un evento por a\xF1o."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "h2",
                                { "class": "titulos_faq" },
                                React.createElement(
                                    "font",
                                    { color: "red" },
                                    "Impresos por e-mail"
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi deseo suscribirme al env\xEDo por e-mail de mi p\xF3liza, c\xF3mo hago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Ingresando a la Solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    ", completar\xE1s los datos y estar\xE1s recibiendo en tu e-mail un aviso inform\xE1ndote las actualizaciones de tus p\xF3lizas."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFSi deseo suscribirme al env\xEDo por e-mail del Estado de P\xF3liza de Vida, c\xF3mo hago?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Ingresando a la Solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    ", completar\xE1s los datos y estar\xE1s recibiendo en tu e-mail, un archivo con formato pdf y contrase\xF1a, que contendr\xE1 el impreso de tu Estado de P\xF3liza de Vida."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFCu\xE1ndo me estar\xE1 llegando los avisos a mi e-mail?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Al emitirse tu p\xF3liza, o al generarse un endoso o renovaci\xF3n."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFCu\xE1ndo me estar\xE1 llegando a mi e-mail el Estado de P\xF3liza de Vida?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "El Estado de P\xF3liza de Vida ser\xE1 de env\xEDo semestral."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFEstoy suscripto al env\xEDo por e-mail, tanto de mi Copia de P\xF3liza, como Estado de P\xF3liza, pero deseo volver a recibir estos impresos por correo tradicional a mi domicilio, qu\xE9 debo hacer?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "Ingresando a la solapa de ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    " podr\xE1s desuscribirte al servicio y el pr\xF3ximo env\xEDo lo estar\xE1s recibiendo en tu domicilio."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFEstoy recibiendo los Impresos por e-mail a una casilla de e-mail y deseo que me lleguen a otra, puedo cambiarla, y la contrase\xF1a con la cual abro los archivos adjuntos al e-mail?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED podr\xE1s realizar \xE9stos cambios ingresando a la solapa de ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    "."
                                )
                            ),
                            React.createElement("br", null),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    React.createElement(
                                        "a",
                                        { "class": "pregunta_faq" },
                                        "\xBFNo recuerdo mi clave para abrir el Estado de Cuenta de mi p\xF3liza de Vida que llega por e mail, puedo generar una nueva?"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { "class": "respuesta_faq" },
                                    "S\xED. Ingresando a la solapa ",
                                    React.createElement(
                                        "strong",
                                        null,
                                        "Impresos por e-mail"
                                    ),
                                    ", podr\xE1s generar una nueva clave con la cual abrir\xE1s los archivos en formato pdf."
                                )
                            ),
                            React.createElement("br", null)
                        )
                    ),
                    React.createElement(
                        "div",
                        { "class": "footer_faq" },
                        React.createElement(
                            "div",
                            null,
                            "(1) HSBC Seguros es una marca registrada de HSBC Seguros de Vida (Argentina) S.A."
                        ),
                        React.createElement(
                            "div",
                            null,
                            "\"HSBC Seguros de Vida (Argentina) S.A - HSBC Seguros de Retiro (Argentina) S.A. son sociedades diferentes con distinta responsabilidad patrimonial. En todos  los casos la responsabilidad de los accionistas est\xE1 limitada a su aporte de  capital\""
                        )
                    )
                );
            }
        }]);

        return preguntasFrecuentes;
    }(React.Component);

    return preguntasFrecuentes;
});