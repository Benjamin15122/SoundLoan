from flask_restful import Resource, Api
from flask import request, jsonify
import json
from algorithm.loan_recommendation.recommendation_userbased import *
from models.LoanProduct import LoanProduct


def init_model():
    records = LoanRecord.query.all()
    loans = [(each.DebtorId, each.ProductId) for each in records]
    new_model = UserItemRelationShip(loans)
    LoanRecommendation.recommend_model = new_model


class LoanRecommendation(Resource):
    recommend_model = None
    k_users, k_products = 5, 20

    def get(self):
        return "get"

    def post(self):
        try:
            loan_data = json.loads(request.get_data(), strict=False)
            if LoanRecommendation.recommend_model is None:
                init_model()
            products_id = LoanRecommendation.recommend_model.get_recommendation(
                loan_data['user_id'],
                LoanRecommendation.k_users,
                LoanRecommendation.k_products
            )
            # products = LoanProduct.query.filter(LoanProduct.Id in products_id).all()
            products = [LoanProduct.query.get(ID) for ID in products_id]
            return jsonify({
                'success': True,
                'message': '',
                'content': [each.to_dict() for each in products]
            })

        except Exception as e:
            return jsonify({
                'success': False,
                'message': str(e),
                'content': None
            })
