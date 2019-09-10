import pickle
import pandas as pd
import datetime


class CreditModel(object):
    def __init__(self, path='credit_score_lgbm.txt'):
        import os
        pwd = os.getcwd().split('back-end')[0]
        self.path = pwd + 'back-end/algorithm/personal_credit/' + path
        self.model = None
        with open(self.path, 'rb') as f:
            self.model = pickle.load(f)

    @staticmethod
    def salary_bucket(salary):
        if salary < 1000:
            bucket = "1000元以下"
        elif 1000 <= salary < 2000:
            bucket = "10012000元"
        elif 2000 <= salary < 5000:
            bucket = "20005000元"
        elif 5000 <= salary < 10000:
            bucket = "500010000元"
        elif 10000 <= salary < 20000:
            bucket = "1000020000元"
        elif 20000 <= salary < 50000:
            bucket = "2000050000元"
        else:
            bucket = "50000元以上"
        return bucket

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
        x['salary'] = x['salary'].apply(CreditModel.salary_bucket)
        x.drop(['id', 'birth', 'live_address', 'job', 'apply_pass_time',
                'repay_capital_amount', 'unrepay_capital_amount', 'overdue_capital_amount',
                'repay_interest_amount', 'unrepay_interest_amount', 'overdue_interest_amount',
                'credit_score'],
               axis=1, inplace=True)
        return self.model.predict(x)


if __name__ == '__main__':
    model = CreditModel()
    print(model.model.feature_importance())
