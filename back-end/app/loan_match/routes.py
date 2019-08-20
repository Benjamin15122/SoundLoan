import json
from flask import jsonify, request
from app import app
from models.IndividualUser import IndividualUser
from models.LoanProduct import LoanProduct
from utils.loan_match_utils import *

# Parameters for loan matching
SIGMOID_RATIO = 0.9
LINEAR_LAXITY = 0.3


@app.route("/loanMatch", methods=["POST"])
def demand_loan_match():
    try:
        demand = json.loads(request.get_data(), strict=False)
        amount = demand['amount_expect']
        loan_products = LoanProduct.query.filter(LoanProduct.AmountMin <= amount*(1+LINEAR_LAXITY),
                                                 LoanProduct.AmountMax >= amount*(1-LINEAR_LAXITY)).all()
        if len(loan_products) == 0:
            return jsonify({
                'success': False,
                'message': u"贷款额度过高或过低，没有满足需求的产品",
                'content': None
            })

        recommends = recommend_products(demand, loan_products)
        return jsonify({
            'success': True,
            'message': u"为您找到了如下的贷款产品，按照匹配度排序",
            'content': recommends
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e),
            'content': None
        })
