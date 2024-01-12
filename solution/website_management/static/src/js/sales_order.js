odoo.define('website_rdc.Sales_order', function (require) {
    'use strict';

    const dom = require('web.dom');
    const publicWidget = require('web.public.widget');


    publicWidget.registry.sale_order1 = publicWidget.Widget.extend({
        selector: '.sale_order1',
        events: {
            'change #customer_id': '_onchangeCustomer'

        },

        start: function () {
            debugger
        },

         _onchangeCustomer: function(ev) {


          },

    })


});



