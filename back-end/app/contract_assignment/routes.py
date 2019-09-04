from flask import jsonify, request
from app import app, db
from models.Contract import Contract
from config import Config
from utils.contract_assignment_utils import *


@app.route("/contract/getAll", methods=["POST"])
def get_user_contracts():
    try:
        user_name = request.form.get('user_name')
        user_type = request.form.get('user_type')
        if user_type == 'individual':
            contracts_item = Contract.query.filter(Contract.IndividualName == user_name).all()
        else:
            contracts_item = Contract.query.filter(Contract.EnterpriseName == user_name).all()
        contracts = [each.to_dict() for each in contracts_item]
        return jsonify({
            'success': True,
            'message': '',
            'content': contracts
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/getAnalyze', methods=['GET'])
def get_contract_analysis():
    try:
        contract_id = int(request.headers.get('contract_id'))
        contract = Contract.query.get(contract_id)
        if contract.AnalyzeState=='No':
            return jsonify({
                'success': False,
                'message': 'This contract haven\'t been analyzed yet. ',
                'content': None
            })
        else:
            return jsonify({
                'success': True,
                'message': '',
                'content': contract.Record
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/getContent', methods=['GET'])
def get_contract_content():
    try:
        contract_id = int(request.headers.get('contract_id'))
        contract = Contract.query.get(contract_id)
        return jsonify({
            'success': True,
            'message': '',
            'content': contract.Text
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/contract/sign')
def sign_contract():
    try:
        user_name = request.form.get('user_name')
        user_type = request.form.get('user_type')
        contract_id = int(request.form.get('contract_id'))
        contract = Contract.query.get(contract_id)
        signature = get_signature(user_name, contract.Text)
        if user_type == 'individual':
            contract.BorrowerSign = signature
            if contract.SignState == 'NoSign':
                contract.SignState = 'Individual'
            else:
                contract.SignState = 'Both'
        else:
            contract.LenderSign = signature
            if contract.SignState == 'NoSign':
                contract.SignState = 'Enterprise'
            else:
                contract.SignState = 'Both'
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '',
            'content': contract.to_dict()
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })

