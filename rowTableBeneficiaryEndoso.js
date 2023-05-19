define(["react"], function (React) {
        "use strict";

        function RowTableBeneficiaryEndoso(props) {
                var benef = props.benef,
                    onChange = props.onChange,
                    id = props.id,
                    value = props.value,
                    _props$checked = props.checked,
                    checked = _props$checked === undefined ? false : _props$checked;


                var FNACIMIE = benef.FNACIMIE.toString();

                var day = FNACIMIE.substring(6);
                var month = FNACIMIE.substring(4, 6);
                var year = FNACIMIE.substring(0, 4);

                var bithDay = day + '/' + month + '/' + year;

                return React.createElement(
                        "tr",
                        null,
                        React.createElement(
                                "td",
                                { className: "text-center" },
                                React.createElement("input", { id: id, type: "checkbox", value: value, checked: checked, onChange: onChange })
                        ),
                        React.createElement(
                                "td",
                                null,
                                benef.BENEFORD
                        ),
                        React.createElement(
                                "td",
                                null,
                                benef.BENEPORC
                        ),
                        React.createElement(
                                "td",
                                null,
                                benef.TIPDOCBENE
                        ),
                        React.createElement(
                                "td",
                                null,
                                benef.NUMDOCBENE
                        ),
                        React.createElement(
                                "td",
                                null,
                                benef.BENNOMBRE + ' ' + benef.APEBENE,
                                " "
                        ),
                        React.createElement(
                                "td",
                                null,
                                bithDay
                        ),
                        React.createElement(
                                "td",
                                null,
                                props.listParentesco(benef.RELBECOD)
                        ),
                        React.createElement(
                                "td",
                                null,
                                benef.RELBEDEP
                        )
                );
        }
        return RowTableBeneficiaryEndoso;
});