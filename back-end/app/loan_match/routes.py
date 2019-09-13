import json
from flask import jsonify, request
from app import app
from models.IndividualUser import IndividualUser
from models.LoanProduct import LoanProduct
from models.EnterpriseUser import EnterpriseUser
from utils.loan_match_utils import *
from config import Config
from utils.common_utils import *


@app.route("/enterprise/match", methods=["POST"])
def demand_loan_match():
    try:
        # demand = json.loads(request.get_data(), strict=False)
        demand = {
            'user_name': request.form.get('user_name'),
            'amount_expect': int(request.form.get('amount_expect')),
            'duration_expect': int(request.form.get('duration_expect')),
            'rate_expect': float(request.form.get('rate_expect')),
            'num_max': int(request.form.get('num_max'))
        }
        amount = int(demand['amount_expect'])
        loan_products = LoanProduct.query.filter(LoanProduct.AmountMin <= amount*(1+Config.LINEAR_LAXITY),
                                                 LoanProduct.AmountMax >= amount*(1-Config.LINEAR_LAXITY)).all()
        if len(loan_products) == 0:
            return jsonify({
                'success': False,
                'message': u"贷款额度过高或过低，没有满足需求的产品",
                'content': None
            })

        products = match_products(demand, loan_products)
        enterprises = [EnterpriseUser.query.filter(EnterpriseUser.Name == each['enterprise_name']).first()
                       for each in products]
        return jsonify({
            'success': True,
            'message': u"为您找到了如下的贷款公司，按照匹配度排序",
            'content': [each.to_dict() for each in enterprises]
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })


@app.route('/loan/calculate', methods=['POST'])
def loan_calculate():
    try:
        amount = request.form.get('amount')
        rate = request.form.get('rate')
        duration = request.form.get('duration')
        loan_type = request.form.get('type')
        total, interest_total, monthly_pay = calc_interest(amount, rate, duration, loan_type)
        content = {
            'total_amount': total,
            'total_interest': interest_total,
            'monthly_payment': monthly_pay
        }
        return jsonify({
            'success': True,
            'message': '',
            'content': content
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })
