odoo.define('website_rdc.Sales_order', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.sale_order1 = publicWidget.Widget.extend({
        selector: '.sale_order1',
        events: {
            'input #internalReferenceSearch': '_searchReference',
        },

        start: function () {
           debugger
        },

        _searchReference: function (ev) {
            const searchValue = ev.target.value.toLowerCase();

            this.$('.main1').each(function () {
                const internalReference = $(this).find('.name').text().toLowerCase();
                const internal = internalReference.includes(searchValue);
                $(this).toggle(internal);
            });
        },
    });
});
