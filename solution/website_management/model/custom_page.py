# -*- coding: utf-8 -*-

from odoo import fields, models, api


class CustomModel(models.Model):
    _name = 'custom.website'
    _description = 'Custom website'

    name = fields.Char(string='Name')



