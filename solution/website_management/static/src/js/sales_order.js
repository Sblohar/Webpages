odoo.define('website_rdc.Sales_order', function (require) {
    'use strict';

    const publicWidget = require('web.public.widget');
    const Dialog = require('web.Dialog');

    publicWidget.registry.sale_order1 = publicWidget.Widget.extend({
        selector: '.sale_order1',
        events: {
            'input #internalReferenceSearch': '_searchReference',
            'click .btn-danger': '_addToCart',
            'click #confirm-btn': '_confirmOrder',
            'click .remove-btn': '_removeCart',
            'click #create_customer': '_createCustomer'
        },

        start: function () {
             this.$('#confirm-btn').prop('disabled', true);
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

     _addToCart: function(ev) {
            const $row = $(ev.currentTarget).closest('.main1');
            const internalReference = $row.find('.name').text();
            const price = $row.find('.price').text();
            const quantityInput = $row.find('.quantity input');
            const quantity = parseInt(quantityInput.val()) || 0;
            const $ordersTable = $('.order_sale_table');
        
            quantityInput.removeClass('error-border');
        
            const $alreadyStore = $ordersTable.find(`tr[prod_id="${$row.attr('prod_id')}"]`);
        
            if ($alreadyStore.length > 0) {
                const CurrentQ = parseInt($alreadyStore.find('td input').val()) || 0;
                const NewQ = CurrentQ + quantity;
                $alreadyStore.find('td input').val(NewQ);
            } else {
                if (quantity > 0) {
                    const newRow = `<tr prod_id=${$row.attr('prod_id')}>
                                        <td></td>
                                        <td>${internalReference}</td>
                                        <td>${price}</td>
                                        <td><input type="number" style="width: 60px;" value="${quantity}" required/></td>
                                        <td>
                                            <button class="btn btn-outline-danger border border-danger remove-btn">Remove</button>
                                        </td>
                                    </tr>`;
        
                    $ordersTable.append(newRow);
        
                    $ordersTable.find('tr').each(function(index) {
                        $(this).find('td:first').text(index + 0);
                    });
                } else {
                    quantityInput.addClass('error-border');
                }
        
                if (this.$('.order_sale_table tbody tr').length > 0) {
                    this.$('#confirm-btn').prop('disabled', false);
                }
            }
               quantityInput.val('');
        },

        _removeCart: function (ev) {
            const $row = $(ev.currentTarget).closest('tr');
            $row.remove();
        },

        _confirmOrder: function () {

              $('#customer_id').change(function() {
                $('#error_message').hide();
            });
             const customerId = $('#customer_id').val();
                if (!customerId) {
                      $('#error_message').text("Please select a customer.").show();
                    return;
                }

            const order_data = this._confirm_order_data();
                $.ajax("/new_confirm_order", {
                    data: order_data,
                    type: 'POST',
                    dataType: 'json',
                    success: function (data) {
                        debugger;
                        if(data){
                            alert("Order confirmed successfully");
                               $('#customer_id').val('');
                               $('.order_sale_table tbody').empty();

                               $('#error_message').hide();


                        }
                    },
                    error: function (error) {
                           alert("Failed to confirm order. Please try again.");
                    }
                });
        },

        _confirm_order_data: function () {
            let order_data = {};
            order_data['customer_id'] = $('#customer_id').val();
            order_data['order_line'] = [];

            $('.order_sale_table tbody tr').each(function (index) {
                let product_id = $(this).attr('prod_id');
                let quantity = $(this).find('td:nth-child(6) input').val() || 0;
                order_data['order_line'].push({
                    'product_id': product_id,
                    'product_uom_qty': quantity,
                });
            });

            return order_data;
        },




    });
});
