from odoo import http
from odoo.http import request


class CustomController(http.Controller):
    @http.route('/custom/models', type='http', auth="public", website=True)
    def custom_models(self, **kw):
        custom_model_records = request.env['custom.website'].search([])
        return request.render('website_management.custom_model_template', {'records': custom_model_records})

