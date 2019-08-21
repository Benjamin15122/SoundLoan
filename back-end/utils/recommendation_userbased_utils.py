from flask_apscheduler import APScheduler
from models.LoanRecord import LoanRecord
from app.loan_recommendation.routes import *
from models.LoanRecord import LoanRecord


def update_model():
    records = LoanRecord.query.filter().all()
    loans = [(each.DebtorId, each.ProductId) for each in records]
    new_model = UserItemRelationShip(loans)
    LoanRecommendation.recommend_model = new_model


def sort_by_value(d):
    items = d.items()
    backitems = [[v[1], v[0]] for v in items]
    backitems.sort(reverse=True)
    return [backitems[i][1] for i in range(0, len(backitems))]
