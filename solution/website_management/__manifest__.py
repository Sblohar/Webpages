{
    'name': "Website Management",
    'summary': "",
    'description': "",

    'author': "",
    'website': "",
    'sequence': 100,

    'category': "Extra",
    'version': "1.0",
    'depends': ['base', 'web', 'website'],
    'data': [
           # 'security/ir.model.access.csv',
            'data/register_data.xml',
            'data/create_ordesr.xml',
            'views/website_homepage.xml',
    ],
    'application': 'true',
    'assets': {
        'web.assets_frontend': [
            # 'website_management/static/src/**/**/*',
            'website_management/static/src/css/style.css',
            'website_management/static/src/js/script.js',
            'website_management/static/src/js/sales_order.js',

        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',

}
