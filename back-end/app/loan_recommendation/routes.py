from flask_restful import Resource, Api
from flask import request, jsonify
import json
from algorithm.loan_recommendation.recommendation_userbased import *
from models.LoanProduct import LoanProduct
from models.IndividualUser import IndividualUser
from models.EnterpriseUser import EnterpriseUser


def init_model():
    records = LoanRecord.query.all()
    loans = [(each.DebtorId, each.ProductId) for each in records]
    new_model = UserItemRelationShip(loans)
    LoanRecommendation.recommend_model = new_model


class LoanRecommendation(Resource):
    recommend_model = None
    k_users, k_products = 5, 20

    def get(self):
        try:
            # user_data = json.loads(request.get_data(), strict=False)
            user_data = {
                'user_name': request.headers.get('user_name'),
                'num_max': int(request.headers.get('num_max'))
            }
            if LoanRecommendation.recommend_model is None:
                init_model()
            user = IndividualUser.query.filter(IndividualUser.Nickname == user_data['user_name']).first()
            user_data['user_id'] = user.Id
            products_id = LoanRecommendation.recommend_model.get_recommendation(
                user_data['user_id'],
                LoanRecommendation.k_users,
                LoanRecommendation.k_products
            )[:user_data['num_max']]
            # products = LoanProduct.query.filter(LoanProduct.Id in products_id).all()
            products = [LoanProduct.query.get(ID) for ID in products_id]
            enterprises = [EnterpriseUser.query.filter(EnterpriseUser.Name == each.Name).first()
                           for each in products]

            return jsonify({
                'success': True,
                'message': '',
                'content': [each.to_dict() for each in enterprises]
            })

        except Exception as e:
            return jsonify({
                'success': False,
                'message': str(e),
                'content': None
            })
