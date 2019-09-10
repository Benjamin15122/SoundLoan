import pickle
import pandas as pd
import datetime


class CreditModel(object):
    def __init__(self, path='credit_score_lgbm.txt'):
        self.path = path
        self.model = None
        with open(self.path, 'rb') as f:
            self.model = pickle.load(f)

    def predict(self, users):
        x = pd.DataFrame(users)
        x['borrowamount'] = x['repay_capital_amount'] + x['unrepay_capital_amount']
        x['notpaytotalamount'] = x['unrepay_capital_amount'] + x['unrepay_interest_amount']
        x['overduetotalamount'] = x['overdue_capital_amount'] + x['overdue_interest_amount']
        x['totalcount'] = x['apply_pass_time']
        x['hometown'] = x['residence_address']
        x['amount'] = x['borrowamount'] + x['repay_interest_amount'] + x['unrepay_interest_amount']
        x['house_property'] = x['house_property'].apply(lambda each: 2 if each > 0 else 1)
        x['vehicle_property'] = x['vehicle_property'].apply(lambda each: 2 if each > 0 else 1)
        year = datetime.datetime.now().year
        x['age'] = x['birth'].apply(lambda each: year - int(each.split('.')[0]))
        x.drop(['id', 'birth'], axis=1, inplace=True)
        return self.model.predict(x)


if __name__ == '__main__':
    model = CreditModel()
    print(model.model.feature_importance())
