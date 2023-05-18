var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(["react", "../../common/dropdownContent"], function (React, DropDownContent) {
  var Accordion = require("react-bootstrap").Accordion;
  var Button = require("react-bootstrap").Button;

  var FormPoint5 = function (_React$Component) {
    _inherits(FormPoint5, _React$Component);

    function FormPoint5(props) {
      _classCallCheck(this, FormPoint5);

      var _this = _possibleConstructorReturn(this, (FormPoint5.__proto__ || Object.getPrototypeOf(FormPoint5)).call(this, props));

      _this._handleResults = function (id, result) {
        var form = {};
        _this.setState(_defineProperty({}, id, result));
        result.referencies = _this.referencies[id];
        form = result;
        _this.props.onResults(id, form);
      };

      var _ref = _this.props.formInfo ? _this.props.formInfo : "",
          _ref$obligatedSubject = _ref.obligatedSubject,
          obligatedSubject = _ref$obligatedSubject === undefined ? "" : _ref$obligatedSubject;

      _this.state = {
        obligatedSubject: { id: obligatedSubject, value: "", required: true }
      };
      _this.referencies = {
        obligatedSubject: React.createRef()
      };
      return _this;
    }

    _createClass(FormPoint5, [{
      key: "render",
      value: function render() {
        var readOnly = this.props.readOnly;

        return React.createElement(
          "div",
          null,
          React.createElement(
            "h5",
            null,
            "Declaraciones y autorizaciones"
          ),
          React.createElement(
            "form",
            null,
            React.createElement(
              "h6",
              null,
              "Declaraci\xF3n Jurada Sujeto Obligado Conforme UIF"
            ),
            React.createElement(
              "p",
              { className: "d-inline" },
              "En cumplimiento de las disposiciones emanadas de la UIF, que declaro conocer y aceptar, asumo bajo mi absoluta responsabilidad, que en caso de ser SUJETO OBLIGADO cumplo y cumplir\xE9 con las disposiciones vigentes en materia de Prevenci\xF3n de Lavado de Dinero y Financiaci\xF3n del Terrorismo. Sujeto Obligado"
            ),
            React.createElement(
              "div",
              { className: "form-group col-4 text-center d-inline-flex" },
              React.createElement(DropDownContent, {
                ref: this.referencies.obligatedSubject,
                list: this.props.booleanList,
                className: "input-background-color form-control  input-size",
                id: "obligatedSubject",
                name: "obligatedSubject",
                typeValue: "id",
                defaultValue: this.state.obligatedSubject.id,
                onResult: this._handleResults,
                disabled: readOnly,
                required: true
              })
            ),
            React.createElement(
              "p",
              null,
              React.createElement(
                "strong",
                null,
                "IMPORTANTE:"
              ),
              " En caso de contestar afirmativamente se deber\xE1 presentar la constancia de inscripci\xF3n ante la UIF como sujeto obligado."
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                Accordion,
                { key: 5 },
                React.createElement(
                  Accordion.Toggle,
                  { as: "h5", variant: "link", eventKey: "5", type: "submit" },
                  "Medios de pago habilitados"
                ),
                React.createElement(
                  Accordion.Collapse,
                  { eventKey: "5" },
                  React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "p",
                      null,
                      "Declaro saber que toda declaraci\xF3n o falsa reticencia de circunstancias por m\xED conocidas, a\xFAn hechas de buena fe, hacen nulo el contrato (Art. 5 de la ley 17.418) y habilita a la aseguradora a iniciar las acciones legales que correspondan. Autorizo a los m\xE9dicos o instituciones que me han asistido o examinado (o quienes lo hagan en el futuro) a proporcionar al asegurador los datos que posean o informes que conozcan sobre la salud o enfermedades padecidas por m\xED. Se deja constancia que de conformidad con lo dispuesto en el art\xEDculo 4 de la Ley de Seguros la presentaci\xF3n de la Solicitud de Seguro no implica la aceptaci\xF3n de la Solicitud por parte de la Compa\xF1\xEDa, sino hasta la emisi\xF3n de P\xF3liza y el pago de la prima correspondiente. Por tal motivo, se aclara que durante el periodo existente entre la presentaci\xF3n de la solicitud de seguro y la emisi\xF3n de la p\xF3liza no existir\xE1 cobertura.",
                      React.createElement(
                        "h6",
                        null,
                        "Declaraci\xF3n Jurada Sobre Licitud y Origen de Fondos"
                      ),
                      React.createElement(
                        "p",
                        { className: "m-0" },
                        "En cumplimiento de lo requerido por disposiciones legales emanadas de la Unidad de Informaci\xF3n financiera y de la Superintendencia de Seguros de la Naci\xF3n, las que declaro conocer y aceptar, o las que se dicten en el futuro, declaro bajo juramento que el origen de los fondos, bienes o activos con los que operar\xE9 en todos los productos solicitados, tiene su origen en actividades l\xEDcitas. Tomo conocimiento de que HSBC Seguros de Retiro (Argentina) S.A. podr\xE1 requerir mayor informaci\xF3n y/o documentaci\xF3n en caso de considerarlo necesario, comprometi\xE9ndome a suministrar la misma dentro de los plazos que exijan las disposiciones legales y/o la Compa\xF1\xEDa de Seguros"
                      ),
                      React.createElement(
                        "p",
                        null,
                        "A su vez, declaro/declaramos bajo juramento que los datos consignados en la presente solicitud son correctos y completos y hemos confeccionado la misma sin omitir ni falsear dato alguno que deba contener, siendo fiel expresi\xF3n de la verdad, asumiendo el compromiso de actualizar los datos que anteceden cuando se produzcan modificaciones sobre los mismos."
                      )
                    ),
                    React.createElement(
                      "h6",
                      null,
                      "Autorizaci\xF3n de Cesi\xF3n de Datos Personales"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "1. El Titular de los datos personales presta absoluta conformidad y autoriza expresamente a la ASEGURADORA a:",
                      React.createElement("br", null),
                      "a) Consultar, utilizar, suministrar o transferir a terceros la informaci\xF3n contenida en la presente solicitud, en virtud del cumplimiento de un contrato de prestaci\xF3n de servicios suscripto por la ASEGURADORA.",
                      React.createElement("br", null),
                      " b) Transferir a empresas vinculadas o no al Grupo HSBC, radicadas en la Rep\xFAblica Argentina o en el exterior, sus datos personales, ya sea para fines de evaluaci\xF3n crediticia, operativos, de almacenamiento de datos o de oferta de servicios y productos de las empresas del Grupo HSBC.",
                      React.createElement("br", null),
                      " c) Transferir sus datos personales e informaci\xF3n sobre productos contratados, cuando estos sean requeridos por autoridades impositivas y/o fiscales nacionales o extranjeras radicadas fuera del pa\xEDs, debidamente facultadas para ello.",
                      React.createElement("br", null),
                      " 2. El Titular de los datos personales puede revocar este consentimiento en cualquier momento, pero no tendr\xE1 efectos retroactivos."
                    ),
                    React.createElement(
                      "h6",
                      null,
                      "Protecci\xF3n de Datos Personales"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "En cumplimiento de lo establecido por el Art. 6 de la Ley 25.326, se informa que sus datos est\xE1n siendo recabados con los siguientes fines: para cotizar su seguro y de ser aceptada la propuesta para emitir su p\xF3liza y para todo aquello que sea necesario para cumplir con lo establecido en la normativa vigente en materia de Derecho de Seguros. Asimismo, le informamos que sus datos formar\xE1n parte de un banco de datos electr\xF3nico cuyo titular es HSBC Seguros de Retiro (Argentina) S.A. (Hip\xF3lito Bouchard 557, Piso 20, (C1106ABG), CABA). Los datos aqu\xED solicitados son obligatorios con el fin de poder cotizar correctamente su seguro y se considera que los mismos son exactos y veraces. Adem\xE1s, se le informa de la facultad de ejercer el derecho de acceso a sus datos personales en forma gratuita a intervalos no inferiores a seis meses, salvo que acredite un inter\xE9s leg\xEDtimo al efecto, y asimismo que tiene derecho, de ser procedente, a rectificar y/o suprimir dichos datos (arts. 14, 15 y 16 de la Ley N\xBA 25.326). Disposici\xF3n 10/2008 DNPDP: \u201CEl titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un inter\xE9s leg\xEDtimo al efecto conforme lo establecido en el art\xEDculo 14, inciso 3 de la Ley N\xBA 25.326\u201D.",
                      React.createElement("br", null),
                      " La DIRECCI\xD3N NACIONAL DE PROTECCI\xD3N DE DATOS PERSONALES, \xD3rgano de Control de la Ley N\xBA 25.326, tiene la atribuci\xF3n de atender las denuncias y reclamos que se interpongan con relaci\xF3n al incumplimiento de las normas sobre protecci\xF3n de datos personales\u201D."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "De conformidad con lo dispuesto por el art\xEDculo 1\" de la Resoluci\xF3n del Ministerio de Economia N\xB0 429/2000 (texto modificado por la Resoluci\xF3n N\xB0407/2001) se deja constancia que los \xFAnicos sistemas habilitados para pagar premios de contratos de seguros son los siguientes:"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "a) Entidades especializadas en cobranza, registro y procesamiento de pagos por medios electr\xF3nicos habilitados por la SUPERINTENDENCIA DE SEGUROS DE LA NACION"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "b) Entidades financieras sometidas al r\xE9gimen de la Ley N\xB021.526"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "c) Tarjetas de cr\xE9dito, d\xE9bito o compras emitidas en el marco de la Ley N\xB025.065."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "d) Medios electr\xF3nicos de cobro habilitados previamente por la SUPERINTENDENCIA DE SEGUROS DE LA NACI\xD3N a cada entidad de seguros, los que deber\xE1n funcionar en sus domicilios, puntos de venta o cobranza. En este caso, el pago deber\xE1 ser realizado mediante alguna de las siguientes formas: efectivo en moneda de curso legal, cheque cancelatorio Ley N\xB025.345 o cheque no a la orden librado por el asegurado o tomador a favor de la entidad aseguradora."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "Cuando la percepci\xF3n de premios se materialice a trav\xE9s del SISTEMA \xDANICO DE LA SEGURIDAD SOCIAL (SUSS) se considera cumplida la obligaci\xF3n establecida en el presente art\xEDculo"
                    ),
                    React.createElement(
                      "h6",
                      null,
                      "Autorizaci\xF3n de Deducci\xF3n "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "Las relaciones entre el Titular del medio de pago y el Asegurado deben ser exclusivamente relaciones familiares directas (Padre, Madre, Hijo, C\xF3nyuge o Conviviente, T\xEDo, Abuelo y Tutor), Se rechazar\xE1n las restantes relaciones, con excepci\xF3n de aquellas en donde a criterio de la aseguradora, existe inter\xE9s asegurable."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "1. La Entidad retendr\xE1 en los per\xEDodos antes establecidos el monto de dinero mencionado para efectuar el pago correspondiente que oportunamente remitir\xE1 a HSBC Seguros de Retiro (Argentina) S.A.",
                      " "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "2. La Entidad me reintegrar\xE1 cualquier deducci\xF3n que hubiera realizado y que no hubiese remitido a HSBC Seguros de Retiro (Argentina) S.A.",
                      " "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "3. HSBC Seguros de Retiro (Argentina) S.A. no responder\xE1 por las obligaciones establecidas en la p\xF3liza si la Entidad no realizara la emisi\xF3n de los fondos aplicables al pago del Seguro de Retiro en la fecha establecida.",
                      " "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "4. Las deducciones autorizadas cesar\xE1n cuando: a) Finalice mi relaci\xF3n con la Entidad. b) Notifique por escrito a la Entidad una cancelaci\xF3n a esta Autorizaci\xF3n. c) Se d\xE9 por finalizado el contrato de la Entidad con HSBC Seguros de Retiro (Argentina) S.A. En caso de que ocurra alguna de las situaciones enunciadas, HSBC Seguros de Retiro (Argentina) S.A. gestionar\xE1 la cobranza en forma autom\xE1tica en los t\xE9rminos y condiciones aplicables de la Compa\xF1\xEDa.",
                      " "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "5. La autorizaci\xF3n de deducci\xF3n voluntaria implica solamente la designaci\xF3n de un medio de pago y no me confiere derecho alguno sobre el Seguro de Retiro contratado salvo que yo sea el Tomador del Seguro de Retiro."
                    )
                  )
                )
              ),
              React.createElement(
                Accordion,
                { key: 6 },
                React.createElement(
                  Accordion.Toggle,
                  { as: "h5", variant: "link", eventKey: "6", type: "submit" },
                  "Entrega por medios electronicos"
                ),
                React.createElement(
                  Accordion.Collapse,
                  { eventKey: "6" },
                  React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "p",
                      null,
                      "En caso de que la solicitud resulte aprobada y que haya aceptado recibir por medio electr\xF3nico la p\xF3liza y cualquier otra documentaci\xF3n que la Aseguradora deba enviarse en virtud de la misma, ser\xE1n enviadas a la direcci\xF3n de correo electr\xF3nico informada en el Punto N\xB0 1.",
                      React.createElement("br", null),
                      " Asimismo, cualquier cambio de correo electr\xF3nico, deber\xE1 ser comunicado por mi parte a la Aseguradora."
                    )
                  )
                )
              ),
              React.createElement(
                Accordion,
                { key: 7 },
                React.createElement(
                  Accordion.Toggle,
                  { as: "h5", variant: "link", eventKey: "7", type: "submit" },
                  "Datos personales para incorporacion como cliente al grupo"
                ),
                React.createElement(
                  Accordion.Collapse,
                  { eventKey: "7" },
                  React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "p",
                      null,
                      "Informaci\xF3n a Terceros "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "El cliente autoriza a HSBC Bank Argentina S.A., HSBC Seguros de Vida (Argentina) S.A. y HSBC Seguros de Retiro (Argentina) S.A. (en forma conjunta, \"HSBC Argentina\") a:"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "1. a) Incorporar sus datos en cualquier base de datos de conformidad con la ley aplicable,",
                      " "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "b) Consultar, utilizar, suministrar o transferir la informaci\xF3n recolectada en el marco de la prestaci\xF3n de servicios por parte de HSBC Argentina a las compa\xF1ias que le prestan servicios, incluyendo aquellas especializadas en base de datos y servicios de evaluaci\xF3n crediticia, y"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "c) Utilizar los datos personales y cederlos a entidades, incluyendo prestadores de servicios, locales o en cualquier jurisdicci\xF3n extranjera, ya sea para fines de evaluaci\xF3n y otorgamiento de productos o servicios, evaluaci\xF3n y administraci\xF3n del riesgo crediticio, tareas operativas, de almacenamiento de datos o desarrollo de actividades necesarias o convenientes para mantener la relaci\xF3n comercial con el cliente."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "2. Asimismo, en caso de haberlo autorizado conforme aqu\xED consta, HSBC Argentina podr\xE1 suministrar los datos personales a otras empresas del Grupo HSBC y/o a terceras empresas vinculadas al mismo por acuerdos comerciales a fin de acceder a los distintos servicios ylo productos prestados por ellas."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "3. Transferir los datos personales e informaci\xF3n financiera cuando \xE9stos sean requeridos por autoridades fiscales locales y extranjeras debidamente facultadas para ello."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "4. Asimismo, se toma conocimiento que HSBC Argentina tratar\xE1 con confidencialidad los datos y que los mismos ser\xE1n usados de acuerdo con la finalidad para la que han sido recolectados pudiendo en cualquier momento ejercitar el derecho de acceso, rectificaci\xF3n, cancelaci\xF3n u oposici\xF3n mediante comunicaci\xF3n escrita remitida formalmente a contactenos@hsbc.com.ar"
                    ),
                    React.createElement(
                      "h6",
                      null,
                      "CUMPLIMIENTO IMPOSITIVO"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "El Titular reconoce que es exclusivamente responsable de comprender y cumplir con sus obligaciones impositivas (incluyendo, sin que la menci\xF3n sea limitativa, el pago de impuestos o la presentaci\xF3n de declaraciones juradas u otra documentaci\xF3n requerida relativa al pago de todos los impuestos pertinentes) en todas las jurisdicciones en las que surjan tales obligaciones y en relaci\xF3n con la apertura y uso de cuentas y/o Servicios prestados por HSBC Argentina y/o miembros del Grupo HSBC. Determinados pa\xEDses pueden tener legislaci\xF3n con efecto extraterritorial independientemente de su lugar de domicilio, residencia, ciudadan\xEDa o constituci\xF3n."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "El Titular reconoce que HSBC Argentina y/o cualquier miembro del Grupo HSBC no brinda asesoramiento impositivo, debiendo el Titular requerir asesoramiento legal y/o impositivo independiente, en caso de considerarlo necesario."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "El Titular reconoce que HSBC Argentina y/o cualquier miembro del Grupo HSBC no tiene responsabilidad alguna con respecto a sus obligaciones impositivas en cualquier jurisdicci\xF3n en la cual puedan surgir incluyendo sin l\xEDmite, cualquiera que se relacione espec\xEDficamente con la apertura y uso de cuentas y/o Servicios prestados por HSBC Argentina y/o miembros del Grupo HSBC."
                    )
                  )
                )
              ),
              React.createElement(
                Accordion,
                { key: 8 },
                React.createElement(
                  Accordion.Toggle,
                  { as: "h5", variant: "link", eventKey: "8", type: "submit" },
                  "Autocertificaci\xF3n de la residencia fiscal de individuos"
                ),
                React.createElement(
                  Accordion.Collapse,
                  { eventKey: "8" },
                  React.createElement(
                    React.Fragment,
                    null,
                    React.createElement(
                      "p",
                      null,
                      "En el marco de la Comunicaci\xF3n \"A\" 5588 del Banco Central de la Rep\xFAblica Argentina se regulan las acciones de cooperaci\xF3n en materia tributaria entre la Rep\xFAblica Argentina y otros pa\xEDses."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "En consecuencia, la Comunicaci\xF3n prev\xE9 que las entidades financieras deber\xE1n arbitrar las medidas necesarias para identificar a los titulares de cuentas considerando el Est\xE1ndar de la Organizaci\xF3n para la Cooperaci\xF3n y Desarrollo Econ\xF3micos (\"OCDE\") para el Intercambio Autom\xE1tico de Informaci\xF3n en Asuntos Fiscales y de las disposiciones de la Ley de cumplimiento fiscal de cuentas extranjeras (\"Foreign Account Tax Compliance Act\". \"FATCA\") de los Estados Unidos de Am\xE9rica."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "A tal fin, las autoridades fiscales requieren que HSBC recolecte y reporte cierta informaci\xF3n sobre el estado de la residencia fiscal de la cuenta del Titular. Las definiciones a fin de asistirlo en la identificaci\xF3n del Titular de la Cuenta, entre otras definiciones del presente formulario, se encuentran a disposici\xF3n en el Anexo \"Definiciones\"."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "Para los titulares de cuentas conjuntas o m\xFAltiples, utilice un formulario separado para cada persona"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "En caso que la informaci\xF3n declarada en el presente en relaci\xF3n a su residencia fiscal se modifique,"
                      ),
                      " ",
                      "deber\xE1 proporcionar a HSBC un nuevo Formulario \"Autocertificaci\xF3n de la Residencia Fiscal de Individuos\" actualizado dentro de los noventa (90) d\xEDas de ocurrido dicho cambio de circunstancia."
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "Tenga en cuenta:"
                      )
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "\u2022 Que si usted no es el Titular de la Cuenta"
                      ),
                      " ",
                      "pero est\xE1 completando el formulario en nombre del Titular, entonces deber\xE1 indicar su capacidad conforme la Parte 4 del presente formulario"
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "\u2022 No utilice este formulario en caso que el Titular de la Cuenta no sea un individuo.",
                        " "
                      ),
                      "En su lugar, deber\xE1 completar y proporcionar el Formulario \"Autocertificaci\xF3n de la Residencia Fiscal de entidades\""
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "\u2022 No utilice este formulario si es una Persona Controlante de una Empresa.",
                        " "
                      ),
                      "En su lugar deber\xE1 completar y proporcionar el Formulario \"Autocertificaci\xF3n de la Residencia Fiscal de la Persona Controlante\""
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "\u2022 Si usted es una persona estadounidense"
                      ),
                      " ",
                      "bajo las regulaciones de la autoridad fiscal de Estados Unidos de Am\xE9rica (IRS - Internal Revenue Service). deber\xE1 adicionalmente completar y proporcionar el Formulario W9."
                    ),
                    React.createElement(
                      "p",
                      null,
                      React.createElement(
                        "strong",
                        null,
                        "En caso que tenga alguna pregunta adicional sobre c\xF3mo completar el presente formulario o sobre c\xF3mo determinar su residencia fiscal deber\xE1 contactarse con su asesor fiscal o autoridad fiscal local."
                      )
                    ),
                    React.createElement(
                      "h6",
                      null,
                      "PARTE 3 AUTORIZACIONES Y COMPROMISOS"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "Entiendo que la informaci\xF3n suministrada por m\xED abarca la totalidad de los t\xE9rminos y condiciones que rigen la relaci\xF3n entre el Titular de la Cuenta y HSBC estableciendo como HSBC puedo utilizar y compartir la informaci\xF3n declarada con la Administraci\xF3n Federal de Ingresos P\xFAblicos (AFIP) Certifico que soy el Titular de la Cuenta lo me encuentro autorizado a firmar en nombre del Titular de la Cuenta) y de todos los ingresos a que se refiere al presente formulario. Declaro bajo mi conocimiento que todas aquellas declaraciones indicadas en el presente formulario son correctas y completas. Acuerdo para presentar un nuevo formulario dentro de los noventa (90) d\xEDas de ocurrida cualquier circunstancia que modifique o invalide las declaraciones indicadas en el presente formulario."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "En caso de suscribir el presente formulario en nombre del Titular de la Cuenta, por favor indicar la capacidad en la que suscribo lo mismo. En caso de contar con un poder, por favor adjuntar copia del mismo al presente formulario. Poder/Capacidad"
                    ),
                    React.createElement(
                      "h6",
                      null,
                      "Definiciones"
                    ),
                    React.createElement(
                      "p",
                      null,
                      "Esta es una selecci\xF3n de definiciones provistas para asistirlo en el completamiento del presente formulario. Podr\xE1 encontrar m\xE1s detalles en el sitio web de la OCDE en el siguiente link:",
                      " ",
                      React.createElement(
                        "a",
                        { href: "http://www.oecd.org/" },
                        "http://www.oecd.org/"
                      ),
                      " ",
                      ". Si tiene consultas respecto a estas definiciones o requiere a\xFAn mayor detalle por favor contacte a su asesor impositivo o Autoridad Impositiva Local."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CTitular de la cuenta\u201D El t\xE9rmino \u201CTitular de la Cuenta\u201D es la persona indicada o identificada como el titular de una cuenta financiera o tomadores de p\xF3lizas de seguros/retiro alcanzados y beneficiarios por fallecimiento de p\xF3lizas de seguros/ retiro alcanzados. Una persona que tenga una cuenta financiera en beneficio de otra persona como un agente, un custodio, un asesor de inversiones, un intermediario, o como tutor legal, no es entendida como el titular de la cuenta. En estas circunstancias, es otra la persona titular de la cuenta. Por ejemplo en el caso de una relaci\xF3n padre/hijo, donde el padre est\xE1 actuando como un tutor legal, el ni\xF1o es considerado como el titular de la cuenta. Con respecto a una cuenta de titularidad conjunta, cada cotitular es tratado como un titular de la cuenta."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CPersona Controlante\u201D Se trata de una persona f\xEDsica que ejerza el control sobre una entidad. Cuando esa entidad es tratada como una entidad pasiva no financiera (ENF Pasiva), la Entidad Financiera debe determinar si la Persona Controlante es reportable o no. El t\xE9rmino de Persona Controlante se corresponde con el de beneficiario final."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CEntidad\u201D El t\xE9rmino \u201CEntidad\u201D, es una persona jur\xEDdica o entidad jur\xEDdica, como una corporaci\xF3n, organizaci\xF3n, sociedad, fideicomiso o fundaci\xF3n."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CCuenta Financiera\u201D Una cuenta financiera es una cuenta en una instituci\xF3n financiera e incluye: Cuentas de Dep\xF3sito e Inversi\xF3n; Cuentas de Custodia; Contratos de seguro con capitalizaci\xF3n; y Planes de Pensi\xF3n, entre otros."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CCRS\u201D Common Reporting Standard. Intercambio Autom\xE1tico de Informaci\xF3n en Asuntos Fiscales de la OCDE."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CJurisdicci\xF3n Participante\u201D Una jurisdicci\xF3n participante significa una jurisdicci\xF3n con la que existe un acuerdo intergubernamental conforme al cual se proporcionar\xE1 la informaci\xF3n necesaria sobre el intercambio autom\xE1tico de informaci\xF3n de la cuenta financiera como se establece en la norma CRS."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CCuenta / producto declarable\u201D Cuenta o Producto cuyo titular es una Persona Declarable o una Empresa \u201CENF Pasiva\u201D con una o m\xE1s Personas Controlantes declarable.",
                      " "
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CJurisdicci\xF3n declarable\u201D Una Jurisdicci\xF3n declarable es otra jurisdicci\xF3n participante con la que existe la obligaci\xF3n de proporcionar informaci\xF3n de la cuenta financiera."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CPersona declarable\u201D CRS define al titular de la cuenta como la \u201CPersona declarable\u201D. Una persona declarable se define adem\xE1s como una persona (o entidad) que sea residente fiscal en una Jurisdicci\xF3n reportable bajo las leyes de dicha jurisdicci\xF3n."
                    ),
                    React.createElement(
                      "p",
                      null,
                      "\u201CNIF\u201D/\u201CTIN\u201D (incluyendo \u201Cfuncional equivalente\u201D) NIF es el N\xFAmero de Identificaci\xF3n Fiscal (tambi\xE9n conocido como TIN \u2013Tax Identification Number\u2013 por sus siglas en ingl\xE9s) o su equivalente en caso de no existir en una determinada jurisdicci\xF3n. Un TIN es una combinaci\xF3n \xFAnica de letras y n\xFAmeros asignados por una jurisdicci\xF3n a un Individuo o Entidad, utilizado para identificar al Individuo o Entidad a fines de la aplicaci\xF3n de las leyes impositivas de dicha jurisdicci\xF3n. Podr\xE1 encontrar mayor detalle de los TINs aceptables en el siguiente link",
                      " ",
                      React.createElement(
                        "a",
                        { href: "http://www.oecd.org/tax/transparency/" },
                        "http://www.oecd.org/tax/transparency/",
                        " "
                      ),
                      "automaticexchangeofinformation.htm Algunas jurisdicciones no emiten un TIN. Sin embargo, las mismas usualmente utilizan alg\xFAn otro n\xFAmero con un nivel de identificaci\xF3n similar (\u201Cfuncional equivalente\u201D), por ejemplo c\xF3digo/n\xFAmero de registraci\xF3n",
                      " "
                    )
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return FormPoint5;
  }(React.Component);

  return FormPoint5;
});