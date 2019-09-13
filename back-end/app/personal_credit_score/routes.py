from flask_restful import Resource
from algorithm.personal_credit.credit_score_model import CreditModel, DefaultModel


class PersonalCreditModel(Resource):
    model = CreditModel()


class DefaultProbabilityModel(Resource):
    model = DefaultModel
