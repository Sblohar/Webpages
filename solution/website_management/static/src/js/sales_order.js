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

           debugger
            const newRow = `<tr prod_id=${$row.attr('prod_id')}>
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

         _removeCart: function (ev){
            const $row = $(ev.currentTarget).closest('tr');
            $row.remove();
        },


        _confirmOrder: function (){
            let orders = this._confirm_order_data();
            debugger
            $.ajax("/confirm_order", {
                data: orders,
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                         debugger
                },
                error: function (error) {
                debugger
                }
            })
          },

//           _confirm_order_data: function () {
//               let order_data = {};
////                order_data['customer_id'] = $('#customer_id').val();
////                order_data['product_id'] = $('#product_id')[0].innerText;
////                order_data['quantity'] = $('#quantity')[0].lastElementChild.value;
//
//                order_data['customer_id'] = $('#customer_id').val();
//                order_data['orders_line'] = [];
//               var $element = $('.order_sale_table').find('tbody tr');
//
//             $element.each(function (index) {
//                var $el = $($('.orders_col')[index]);
//
//                    let product_id = $el.data('prod_id');
//                    let quantity = $(this).find('#quantity input').val();
//
//                    order_data['orders_line'].push({
//                        'product_id': product_id,
//                        'quantity': quantity
//                    });
//                });
//                      return order_data;
//
//            },

            _confirm_order_data: function () {
                let order_data = {};
                order_data['customer_id'] = $('#customer_id').val();
                order_data['order_line'] = [];

                 $('.order_sale_table tbody tr').each(function (index) {
                     let product_id = $(this).attr('prod_id');
                     let quantity = $('quantity').val();

                    order_data['order_line'].push({
                        'product_id': product_id,
                        'product_uom_qty': quantity
                    });
                });


    return order_data;
},



        });
});
