import pickle
import pandas as pd
import datetime
import math
from algorithm.automl_credit.automl import model


class CreditModel(object):
    def __init__(self, path='credit_score_lgbm.txt'):
        import os
        pwd = os.getcwd().split('back-end')[0]
        self.path = pwd + 'back-end/algorithm/personal_credit/' + path
        self.model = None
        with open(self.path, 'rb') as f:
            import os
            import sys
            sys.path.insert(0, os.getcwd().split('back-end')[0] + 'back-end/algorithm/personal_credit/automl')
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


class DefaultModel:
    def __init__(self, path='default_probability_lgbm.txt'):
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

    def predict(self, info):
        x = pd.DataFrame(info, index=[0])
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
        x['salary'] = x['salary'].apply(DefaultModel.salary_bucket)
        x.drop(['id', 'birth', 'live_address', 'job', 'apply_pass_time',
                'repay_capital_amount', 'unrepay_capital_amount', 'overdue_capital_amount',
                'repay_interest_amount', 'unrepay_interest_amount', 'overdue_interest_amount',
                'credit_score', 'lender_id', 'debtor_id', 'product_id', 'contract_id',
                'app_date_timestamp', 'due_date_timestamp', 'start_date_timestamp',
                'end_date_timestamp', 'repay_status', 'order_status',
                'default_prob', 'loan_money', 'rate'],
               axis=1, inplace=True)
        res = self.model.predict(x)
        res = 1 - 1 / (1 + math.exp(-res))
        print(res)
        return res


if __name__ == '__main__':
    model = CreditModel()
    print(model.model.feature_importance())
