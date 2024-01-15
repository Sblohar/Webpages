odoo.define('website_rdc.Sales_order', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');

    publicWidget.registry.sale_order1 = publicWidget.Widget.extend({
        selector: '.sale_order1',
        events: {
            'input #internalReferenceSearch': '_searchReference',
            'click .btn-danger': '_addToCart',
            'click #confirm-btn': '_confirmOrder',
            'click .remove-btn': '_removeCart',

        },

        start: function () {
           debugger
        },

        _searchReference: function (ev) {
           const searchValue = ev.target.value.toLowerCase();

           this.$('.main1').each(function () {
           const internalReference = $(this).find('.name').text().toLowerCase();
           const internal = internalReference.includes(searchValue);

            const nameSearch = $(this).find('.description').text().toLowerCase();
            const nameFound = nameSearch.includes(searchValue);

            $(this).toggle(internal || nameFound);
           });
        },

        _addToCart: function (ev) {
            const $row = $(ev.currentTarget).closest('.main1');
            const internalReference = $row.find('.name').text();
            const description = $row.find('.description').text();
            const price = $row.find('.price').text();
            const quantity = $row.find('.quantity input').val();
            const imagebox = $row.find('.image img').attr('src');

            const newRow = `<tr>
                                <td></td>
                                 <td><img src="${imagebox}" alt="Image" style="height:80px;"/></td>
                                <td>${internalReference}</td>
                                <td>${description}</td>
                                <td>${price}</td>
                                <td>${quantity}</td>
                                 <td>
                                    <button class="btn btn-outline-danger m-3 border border-danger remove-btn">Remove</button>
                                </td>
                            </tr>`;

            const $ordersTable = $('.orders table');
            $ordersTable.append(newRow);

            $ordersTable.find('tr').each(function (index) {
                $(this).find('td:first').text(index + 0);
            });
        },

        _confirmOrder: function (ev){
            alert("Order Confirmed !")

        },
        _removeCart: function (ev){
            const $row = $(ev.currentTarget).closest('tr');
            $row.remove();
        },
    });
});
