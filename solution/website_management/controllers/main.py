from odoo import http
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


    @http.route(['/create_record'], type='http', auth='public', website=True, csrf=False)
    def create_record(self, **post):
        first_name = post.get('first_name')
        last_name = post.get('last_name')

        partner_id = request.env['res.partner'].sudo().create({
            'name': f"{first_name} {last_name}",
        })

        return request.redirect('/website_management/contact_info/%s' % partner_id.id)















