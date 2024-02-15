# main.py
from flask import Flask, request, jsonify, render_template
from db import DatabaseManager
from celery_task import process_pending_tasks
import jwt
from datetime import datetime
import os
from config import JWT_SECRET_KEY, DATABASE
import logging
import json

_logger = logging.getLogger(__name__)


class FlybarAutomation:
    def __init__(self):
        self.app = Flask(__name__)
        self.app.logger.setLevel(logging.INFO)
        self.app.config['SECRET_KEY'] = JWT_SECRET_KEY
        self.app.config['DATABASE'] = DATABASE
        auth_token = jwt.encode({'sub': 'user123'}, JWT_SECRET_KEY, algorithm='HS256')
        self.app.logger.info(f"AUTH TOKEN: {auth_token}")
        self.db_manager = DatabaseManager(self.app)
        self.register_routes()
        self.app.logger.info("FLASK INITIALIZED")

    def register_routes(self):
        self.app.route('/')(self.home)
        self.app.route('/flybar/test', methods=['GET'])(self.test_route)
        self.app.route('/flybar/post/packaging_data', methods=['POST'])(self.post_resource)
        self.app.route('/flybar/display/logs')(self.display_logs)

    def display_logs(self):
        line_dict_1 = {
            'individual_separate_multi_box': [
                {
                    'package_name': 'PKG1',
                    'box_type': 'BT1',
                    'product_lines': [
                        {'product_name': 'AP21450BL', 'quantity': 10},
                    ]

                },
                {
                    'package_name': 'PKG2',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP21450BL', 'quantity': 10},
                    ]

                },
                {
                    'package_name': 'PKG3',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': '123123', 'quantity': 15},
                    ]

                },
                {
                    'package_name': 'PKG4',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP61310MC', 'quantity': 6},
                    ]

                },
                {
                    'package_name': 'PKG5',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP61310MC', 'quantity': 6},
                    ]

                },
                {
                    'package_name': 'PKG6',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP61310MC', 'quantity': 6},
                    ]

                },
                {
                    'package_name': 'PKG7',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'FP21514RT', 'quantity': 14},
                    ]

                },
                {
                    'package_name': 'PKG8',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'FP21514RT', 'quantity': 14},
                    ]

                },

            ]
        }

        line_dict_2 = {
            'individual_item_same_box': [
                {
                    'package_name': 'PKG1',
                    'box_type': 'BT1',
                    'product_lines': [
                        {'product_name': 'AP21450BL', 'quantity': 10},
                        {'product_name': 'FP21514RT', 'quantity': 14},
                        {'product_name': 'AP61310MC', 'quantity': 6},
                    ],
                    'weight': 5,
                    'lenght': 5,
                    'width': 5,
                    'height': 5,

                },
                {
                    'package_name': 'PKG2',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP21450BL', 'quantity': 10},
                        {'product_name': 'FP21514RT', 'quantity': 14},
                    ]
                },
                {
                    'package_name': 'PKG3',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': '123123', 'quantity': 15},
                        {'product_name': 'AP61310MC', 'quantity': 12},
                    ]
                },
            ],
        }

        line_dict_3 = {
            'split_multi_box': [
                {'product_name': 'AP21450BL', 'quantity': 10, 'box_type': 'BT1', 'package_name': 'PKG1', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': 'AP21450BL', 'quantity': 10, 'box_type': 'BT1', 'package_name': 'PKG2', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': '123123', 'quantity': 5, 'box_type': 'BT2', 'package_name': 'PKG3', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': '123123', 'quantity': 5, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': '123123', 'quantity': 5, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': 'AP61310MC', 'quantity': 9, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': 'AP61310MC', 'quantity': 9, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': 'FP21514RT', 'quantity': 14, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
                {'product_name': 'FP21514RT', 'quantity': 14, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5,
                 'width': 5,
                 'height': 5, },
            ]
        }

        line_dict_4 = {
            'individual_separate_multi_box': [
                {
                    'package_name': 'PKG2',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP21450BL', 'quantity': 10},
                    ]

                },
                {
                    'package_name': 'PKG3',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': '123123', 'quantity': 15},
                    ]

                },
                {
                    'package_name': 'PKG6',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP61310MC', 'quantity': 6},
                    ]

                },
            ],
            'individual_item_same_box': [
                {
                    'package_name': 'PKG1',
                    'box_type': 'BT1',
                    'product_lines': [
                        {'product_name': 'AP21450BL', 'quantity': 4},
                        {'product_name': 'FP21514RT', 'quantity': 14},
                        {'product_name': 'AP61310MC', 'quantity': 6},
                    ],
                    'weight': 5,
                    'lenght': 5,
                    'width': 5,
                    'height': 5,
                },
                {
                    'package_name': 'PKG2',
                    'box_type': 'BT2',
                    'product_lines': [
                        {'product_name': 'AP61310MC', 'quantity': 6},
                        {'product_name': 'FP21514RT', 'quantity': 4},
                    ]
                },
            ],
            'split_multi_box': [
                {'product_name': 'AP21450BL', 'quantity': 3, 'box_type': 'BT1', 'package_name': 'PKG1', 'weight': 5,
                 'length': 5, 'width': 5, 'height': 5, },
                {'product_name': 'AP21450BL', 'quantity': 3, 'box_type': 'BT1', 'package_name': 'PKG2', 'weight': 5,
                 'length': 5, 'width': 5, 'height': 5, },
                {'product_name': 'FP21514RT', 'quantity': 5, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5, 'width': 5, 'height': 5, },
                {'product_name': 'FP21514RT', 'quantity': 5, 'box_type': 'BT2', 'package_name': 'PKG4', 'weight': 5,
                 'length': 5, 'width': 5, 'height': 5, },
            ]
        }

        order_list = [
            {'order_name': '1244', 'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0, 'date': '6/02/2024',
             'picking': 30751,
             'main_operation_type': 'all', 'line_json_data': line_dict_4},
            {'order_name': '1245', 'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0, 'date': '5/02/2024',
             'picking': 30751,
             'main_operation_type': 'is_separate_box', 'line_json_data': line_dict_4},
            {'order_name': '1246', 'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0, 'date': '6/02/2024',
             'picking': 30751,
             'main_operation_type': 'individual_separate_multi_box', 'line_json_data': line_dict_1},
            {'order_name': '1247', 'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0, 'date': '7/02/2024',
             'picking': 30751,
             'main_operation_type': 'individual_item_same_box', 'line_json_data': line_dict_2},
            {'order_name': '1248', 'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0, 'date': '5/02/2024',
             'picking': 30751,
             'main_operation_type': 'split_multi_box', 'line_json_data': line_dict_3},
            {'order_name': '1249', 'weight': 0.0, 'length': 0.0, 'width': 0.0, 'height': 0.0, 'date': '7/02/2024',
             'picking': 30751,
             'main_operation_type': 'mixed', 'line_json_data': line_dict_4}
        ]

        return render_template('index.html', data=order_list )
        # return jsonify(order_list=order_list)


    def run(self):
        self.app.run(host='0.0.0.0', port=5000)

    def home(self):
        return 'Welcome to the FLYBAR SERVER ...!'

    def test_route(self):
        received_token = request.headers.get('Authorization')
        status = self.check_access(received_token)
        self.app.logger.info("FLASK TEST")
        if status.status == '200 OK':
            return jsonify({'message': 'Authorized'}), 200
        else:
            return jsonify({'message': 'Unauthorized'}), 200

    def post_resource(self):
        try:
            received_token = request.headers.get('Authorization')
            response = self.check_access(received_token)
            if response['status'] == 200:
                self.db_manager.init_db()
                data = json.loads(request.json)
                order_name = data.get('order_name')
                weight = data.get('weight')
                length = data.get('length')
                width = data.get('width')
                height = data.get('height')
                picking = data.get('picking')
                main_operation_type = data.get('main_operation_type')
                line_json_data = json.dumps(data.get('line_json_data'))

                db = self.db_manager.get_db()
                cursor = db.cursor()

                cursor.execute(
                    'INSERT INTO packaging_order (order_name, weight, length, width, height, status, create_date, picking, main_operation_type, line_json_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    (order_name, weight, length, width, height, 'pending', datetime.now(), picking, main_operation_type,
                     line_json_data))
                new_row_id = cursor.lastrowid
                db.commit()

                cursor.execute('SELECT * FROM status_boolean_table WHERE ID = ?', (1,))
                existing_row = cursor.fetchone()

                if not existing_row:
                    cursor.execute('INSERT INTO status_boolean_table (ID, status) VALUES (?, ?)', (1, False))
                    db.commit()

                cursor.execute('SELECT * FROM status_boolean_table WHERE ID = ?', (1,))
                existing_row = cursor.fetchone()

                if not existing_row[1]:
                    cursor.execute('UPDATE status_boolean_table SET status = ? WHERE ID = ?', (True, 1))
                    db.commit()
                    process_pending_tasks.delay()

                result = {'message': f'Order: {order_name} Added to Queue',
                          "Ref": f'{new_row_id}'}
                logging.info(f'Order: {order_name} added to the queue with ref {new_row_id}')
                return jsonify(result), 200
            else:
                return jsonify(message=str(response['message']), status=401), 401
        except Exception as e:
            logging.error(f'An error occurred: {e}', exc_info=True)
            return jsonify(message=str(e), status=401), 401

    def check_access(self, received_token):
        try:
            decoded_token = jwt.decode(received_token, self.app.config['SECRET_KEY'], algorithms=['HS256'])
            if decoded_token:
                return {'status': 200, 'message': "Authorization successful"}
        except jwt.ExpiredSignatureError:
            return {'status': 401, 'message': "Token has expired"}
        except jwt.InvalidTokenError:
            return {'status': 401, 'message': "Unauthorized"}
        except Exception as e:
            return {'status': 401, 'message': str(e)}


if __name__ == '__main__':
    my_app = FlybarAutomation()
    my_app.run()
