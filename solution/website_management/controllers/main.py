from odoo import http
from odoo.http import request


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
