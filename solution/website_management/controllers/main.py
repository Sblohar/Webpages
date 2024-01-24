
from odoo import http
from odoo import Command
from odoo.http import request, route
import json


class CustomController(http.Controller):

    @http.route(['/register_user'], type='http', auth='public', website=True)
    def render_custom_user_(self, **kw):
        domain = []

        state = request.env['res.country.state'].sudo().search(domain)
        countries = request.env['res.country'].sudo().search(domain)
        partners = request.env['res.partner'].sudo().search(domain)

        email_list = []
        for partner in partners:
            email_list.append(partner.email)

        vals = {
            'states': state,
            'country': countries,
            'email': email_list,

        }

        return http.request.render('website_management.test_homepage', vals)

    @http.route(['/new_orders'], type='http', auth='public', website=True)
    def render_order_sale_(self, **kw):
        domain = []
        customer = request.env['res.partner'].sudo().search(domain)
        product = request.env['product.product'].sudo().search(domain)

        vals = {
            'customer': customer,
            'product': product,
        }

        return http.request.render('website_management.order_new_sales', vals)

    @http.route(['/create_record'], type='http', auth='public', website=True, csrf=False)
    def create_record(self, **post):
        first_name = post.get('first_name')
        last_name = post.get('last_name')

        partner_id = request.env['res.partner'].sudo().create({
            'name': f"{first_name} {last_name}",
        })

        return request.redirect('/website_management/contact_info/%s' % partner_id.id)

    # @http.route(['/confirm_order'], type='http', auth='public', website=True)
    # def create_confirm_order(self, **post):
    #     print("tttttttttttttttttttttttttt")
    #
    #     customer_id = post.get('customer_id')
    #     quantity = int(post.get('quantity', 0))
    #     product_id = int(post.get('product_id', 0))
    #
    #     print(post)
    #
    #     sale_order = request.env['sale.order'].sudo().create({
    #         'partner_id': int(customer_id),
    #         'order_line': [
    #             Command.create({
    #                 'product_id': product_id,
    #                 'product_uom_qty': quantity,
    #            })
    #
    #         ]
    #
    #     })
    #
    #     return request.redirect('/website_management/order_new_sales/%s' % sale_order.id)
    #
    #     # return json.dumps({
    #     #     'status': 200
    #     # })
    @http.route(['/new_confirm_order'], type='http', auth='public', methods=['POST'], website=True,  csrf=False)
    def create_confirm_order(self, **kw):

        customer_id = kw.get('customer_id')
        # # order_lines = kw.get('order_line', [])
        #
        # print(kw)
        #
        vals = {
            'partner_id': int(customer_id),
        }

        data = kw

        order_lines = {}
        for key, value in data.items():
            if key.startswith('order_line'):
                _, index, property_name = key.split('[')
                index = int(index[:-1])
                property_name = property_name[:-1]
                if index not in order_lines:
                    order_lines[index] = {}

                order_lines[index][property_name] = value
        for index, order_data in order_lines.items():
            print(f"Order Line {index}: {order_data}")

        print('order_data', order_data)

        order_lines = []
        product_id = int(order_data.get('product_id'))
        product_uom_qty = int(order_data.get('product_uom_qty', 0))

        # order_line = {
        #     'product_id': product_id,
        #     'product_uom_qty': product_uom_qty,
        # }
        #
        # order_lines.append(order_line)

        # vals = {
            # 'order_line': order_line,
        # }


        sale_order = request.env['sale.order'].sudo().create({
            # 'partner_id': int(customer_id),
            'partner_id': int(customer_id),
            'order_line': [
                Command.create({
                    'product_id': product_id,
                    'product_uom_qty': product_uom_qty,
                })
            ]
        })

        # return request.redirect('/website_management/order_new_sales/%s' % sale_order.id)
        return json.dumps({'sale_order': sale_order.id})
        # return request.redirect('/'% sale_order.id)






















