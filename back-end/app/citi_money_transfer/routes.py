from utils.citi_api_utils import *
from flask import jsonify, request
from config import *
from app import app


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
