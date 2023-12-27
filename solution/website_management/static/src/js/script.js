odoo.define("website_management.register", function (require) {
    "use strict";
    const publicWidget = require('web.public.widget');

    publicWidget.registry.register_form1 = publicWidget.Widget.extend({
        selector: '.register_form1',
        events: {
            'change #country_id': '_onCountryChange',
        },
        init: function () {
            this._super.apply(this, arguments);
            this.updateSelection();
        },

        function onCountryChange(countryID) {
               $('#state_id option').removeClass('d-none');
                $('#state_id').val('');

    if ($('#country_id').val() == "") {
        document.getElementById("country_id").style.border = "1px solid red";
    } else {
        document.getElementById("country_id").style.border = "";
        $('#state_id option').each(function () {
            var optionCountryId = $(this).attr('country');
            if (optionCountryId !== countryID && optionCountryId !== "") {
                $(this).addClass('d-none');
            }
        });
    }
}
});
