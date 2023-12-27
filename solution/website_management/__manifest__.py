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
            'views/website_homepage.xml',
    ],
    'application': 'true',
    'assets': {
        'web.assets_frontend': [
            'website_management/static/src/**/**/*',

        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
    'license': 'LGPL-3',

}
