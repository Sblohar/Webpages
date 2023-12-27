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

         onCountryChange(countryid) {
      
}
});
