from algorithm.contract_analyze.contract_analyze_rules import *
from utils.contract_analyze_utils import *
from flask import jsonify, request
from app import app, db
from models.IndividualUser import IndividualUser
from models.Contract import Contract
import json


@app.route("/contract/analyze", methods=["POST"])
def contract_analyze():
    try:
        contract_data = {
            'nickname': request.form.get('nickname'),
            'loan_consistent_with_actual': request.form.get('loan_consistent_with_actual'),
            'fake_advertising': request.form.get('fake_advertising'),
            'contract_id': request.form.get('contract_id')
        }

        # 解析请求中用户自己选择的字段
        loan_consistent_with_actual = contract_data['loan_consistent_with_actual']
        fake_advertising = contract_data['fake_advertising']

        contract_obj = Contract.query.get(contract_data['contract_id'])
        if contract_obj is None:
            return jsonify({
                'success': False,
                'message': '数据库中没有对应id的合同',
                'content': None
            })
        return_obj = analyze(contract_obj.Text, loan_consistent_with_actual, fake_advertising)
        contract_obj.Record = analyze_obj2str(return_obj)
        contract_obj.AnalyzeState = 'Yes'
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '',
            'content': return_obj
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/uploanAndAnalyze', methods=['POST'])
def contract_upload_analyze():
    try:
        contract_data = {
            'nickname': request.form.get('nickname'),
            'loan_consistent_with_actual': request.form.get('loan_consistent_with_actual'),
            'fake_advertising': request.form.get('fake_advertising'),
            'individual_name': request.form.get('individual_name'),
            'enterprise_name': request.form.get('enterprise_name'),
            'contract_image': request.form.get('contract_image'),
            'contract_text': request.form.get('contract_text'),
            'type': request.form.get('contract_type'),
            'title': request.form.get('contract_title')
        }
        nickname = contract_data['nickname']
        # user = IndividualUser.query.filter(IndividualUser.Nickname == nickname).first()
        # user_id = user.Id

        # 解析请求中用户自己选择的字段
        loan_consistent_with_actual = contract_data['loan_consistent_with_actual']
        fake_advertising = contract_data['fake_advertising']

        if contract_data["type"] == 'text':
            return_obj = analyze(contract_data['text_data'],
                                 loan_consistent_with_actual,
                                 fake_advertising)

            new_contract = Contract(IndividualName=contract_data['individual_name'],
                                    EnterpriseName=contract_data['enterprise_name'],
                                    Text=contract_data['contract_text'],
                                    Record=str(return_obj),
                                    AnalyzeState='Yes',
                                    SignState='NoSign',
                                    Title=contract_data['title'])
            db.session.add(new_contract)
            db.session.commit()

            return jsonify({
                'success': True,
                'message': '',
                'content': return_obj
            })

        elif contract_data["type"] == 'image':
            text = image_to_text(contract_data['image_base64_data'])
            return_obj = analyze(text,
                                 loan_consistent_with_actual,
                                 fake_advertising)

            new_contract = Contract(IndividualName=contract_data['individual_name'],
                                    EnterpriseName=contract_data['enterprise_name'],
                                    Text=text,
                                    Record=str(return_obj),
                                    AnalyzeState='Yes',
                                    SignState='NoSign',
                                    Title=contract_data['title'])
            db.session.add(new_contract)
            db.session.commit()

            return jsonify({
                    'success': True,
                    'message': '',
                    'content': return_obj
            })

        else:
            return jsonify({
                'success': False,
                'message': 'Unknown contract type: should be either Text or Image',
                'content': None
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })

# def contract_analyze():
#     try:
#         contract_data = json.loads(request.get_data(), strict=False)
#         # contract_data = request.form.to_dict()
#
#         # 解析用户Id
#         nickname = contract_data['nickname']
#         # user = IndividualUser.query.filter(IndividualUser.Nickname == nickname).first()
#         # user_id = user.Id
#
#         # 解析请求中用户自己选择的字段
#         loan_consistent_with_actual = contract_data['loan_consistent_with_actual']
#         fake_advertising = contract_data['fake_advertising']
#
#         if contract_data["type"] == 'text':
#             return_obj = analyze(contract_data['text_data'],
#                                  loan_consistent_with_actual,
#                                  fake_advertising, 'text')
#
#             new_contract = Contract(IndividualName=nickname, Text=contract_analyze['text_data'], Record=str(return_obj), AnalyzeState='Yes')
#             db.session.add(new_contract)
#             db.session.commit()
#
#             return jsonify({
#                 'success': True,
#                 'message': '',
#                 'content': return_obj
#             })
#
#         elif contract_data["type"] == 'image':
#             text = image_to_text(contract_data['image_base64_data'])
#             return_obj = analyze(text,
#                                  loan_consistent_with_actual,
#                                  fake_advertising, 'image')
#
#             new_contract = Contract(IndividualName=nickname, Text=text, Record=str(return_obj), AnalyzeState='Yes')
#             db.session.add(new_contract)
#             db.session.commit()
#
#             return jsonify({
#                     'success': True,
#                     'message': '',
#                     'content': return_obj
#             })
#
#         else:
#             return jsonify({
#                 'success': False,
#                 'message': 'Unknown contract type: should be either Text or Image',
#                 'content': None
#             })
#
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'message': str(e),
#             'content': None
#         })
