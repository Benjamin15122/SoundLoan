import lightgbm as lgb


class CreditModel(object):
    def __init__(self, path='credit_score_lgbm.txt'):
        self.path = path
        self.model = lgb.Booster(model_file=self.path)

    def predict(self, users):
        # TODO: 适配数据格式
        return self.model.predict(users)


if __name__ == '__main__':
    model = CreditModel()
    print(model.model.feature_importance())
