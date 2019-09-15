from utils.citi_api_utils import *
from flask import jsonify, request
from config import *
from app import app, db
from models.EnterpriseUser import EnterpriseUser


@app.route("/citi/moneymovement", methods=['POST'])
def citi_moneymovement():
    try:
        access_token, _ = get_access_refresh_tokens(request.form.get('auth_code'))
        transfer_msg = create_money_transfer(access_token,
                                             int(request.form.get('amount')),
                                             request.form.get('source_id'),
                                             request.form.get('payee_id'))
        return jsonify({
            'success': True,
            'message': 'Transfer money successfully. ',
            'content': transfer_msg
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/enterprise/feeToPay', methods=['GET'])
def get_fee_to_pay():
    try:
        company_id = request.args.get('company_id')
        company = EnterpriseUser.query.get(company_id)
        return jsonify({
            'success': True,
            'message': '',
            'content': company.FeeToPay
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/enterprise/minusFee', methods=['POST'])
def minus_fee():
    try:
        company_id = request.form.get('company_id')
        amount = int(request.form.get('amount'))
        company = EnterpriseUser.query.get(company_id)
        company.FeeToPay -= amount
        rtn_fee = company.FeeToPay
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '',
            'content': rtn_fee
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })
