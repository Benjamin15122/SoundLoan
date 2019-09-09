from flask_restful import Resource
from algorithm.personal_credit_score import credit_socre_model

class PersonalCreditModel(Resource):
    model = credit_socre_model.CreditModel()
