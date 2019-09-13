from app.manage.manage_utils import update_ind_user_credit_all, update_ind_user_credit_score, all_individual_users
from app.personal_credit_score.routes import PersonalCreditModel, DefaultProbabilityModel


def update_credit_scores():
    update_ind_user_credit_all()
    users = all_individual_users()
    print(f'{users[:2]}')
    model = PersonalCreditModel.model
    credit_scores = model.predict(users)
    for user, credit_score in zip(users, credit_scores):
        update_ind_user_credit_score(user['id'], credit_score)


def compute_default_prob(info):
    x = info['user'].update(info['loan_record'])
    return DefaultProbabilityModel.model.predict(x)


if __name__ == '__main__':
    user1 = {
        'id': 1,
        'nickname': 'Lucy',
        'name': 'Lucy',
        'sex':  'female',
        'birth': '1900.01.01',
        'residence_address': '重庆:重庆市',

        'school': 'NJU',
        'work_address': 'NJU',
        'live_address': 'NJU',
        'marriage': 'married',
        'salary': 100000000,
        'vehicle_property': 300000,
        'house_property': 5000000,
        'vehicle_loan': 0,
        'house_loan': 0,
        'work_year': 3,

        'job': 'whiteCollar',

        'apply_pass_time': 1,
        'pay_time': 1,
        'overdue_time': 100,
        'repay_capital_amount': 0,
        'unrepay_capital_amount': 0,
        'overdue_capital_amount': 0,
        'repay_interest_amount': 0,
        'unrepay_interest_amount': 100,
        'overdue_interest_amount': 0,
        'credit_score': -1
    }
    users = [user1]
    from algorithm.personal_credit.credit_score_model import CreditModel
    model = CreditModel(path='/Users/xuzhuoer/Project/SoundLoan/back-end/algorithm/personal_credit/credit_score_lgbm.txt')
    credit_scores = model.predict(users)
    for user, credit_score in zip(users, credit_scores):
        print(user['name'], credit_score)
