from app.manage.manage_utils import update_ind_user_credit_all, update_ind_user_credit_score, all_individual_users
from app.personal_credit_score.routes import PersonalCreditModel


def update_credit_scores():
    update_ind_user_credit_all()
    users = all_individual_users()
    print(f'{users[:2]}')
    model = PersonalCreditModel.model
    credit_scores = model.predict(users)
    for user, credit_score in zip(users, credit_scores):
        update_ind_user_credit_score(user['id'], credit_score)


if __name__ == '__main__':
    update_credit_scores()
