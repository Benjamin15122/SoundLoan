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
        contract_data = json.loads(request.get_data(), strict=False)

        # 解析用户Id
        nickname = contract_data['nickname']
        user = IndividualUser.query.filter(IndividualUser.Nickname == nickname).first()
        user_id = user.Id

        # 解析请求中用户自己选择的字段
        loan_consistent_with_actual = contract_data['loan_consistent_with_actual']
        fake_advertising = contract_data['fake_advertising']

        if contract_data["type"] == 'text':
            return_obj = analyze(contract_data['text_data'],
                                 loan_consistent_with_actual,
                                 fake_advertising, 'text')

            new_contract = Contract(UserId=user_id, Text=contract_analyze['text_data'], Record=str(return_obj))
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
                                 fake_advertising, 'image')

            new_contract = Contract(UserId=user_id, Text=text, Record=str(return_obj))
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